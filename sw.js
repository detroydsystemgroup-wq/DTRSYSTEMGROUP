// ══ DTR PROGRESS CLUB — SERVICE WORKER v2 ═══════════════════
// Стратегии кэширования:
//   • Статика (JS/CSS/шрифты/CDN) → Cache-First (мгновенно)
//   • Supabase API  → Network-Only  (данные всегда свежие)
//   • HTML страница → Stale-While-Revalidate (показываем кэш,
//     обновляем в фоне, при следующем открытии будет новая версия)
// ═════════════════════════════════════════════════════════════

const CACHE_NAME = 'dtr-v4';
const CACHE_STATIC = 'dtr-static-v4';

// Статические ресурсы — кэшируем при установке SW
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
];

// Домены CDN — кэшируем при первом запросе (Cache-First)
const CDN_PATTERNS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdn.jsdelivr.net',      // Supabase JS SDK
  'mc.yandex.ru',
];

// Домены API — НИКОГДА не кэшируем (всегда свежие данные)
const API_PATTERNS = [
  'supabase.co',
  'googletagmanager.com',
];

// ── INSTALL: прекэшируем статику ─────────────────────────────
self.addEventListener('install', event => {
  self.skipWaiting(); // активируемся немедленно, не ждём закрытия вкладок
  event.waitUntil(
    caches.open(CACHE_STATIC).then(cache => {
      return cache.addAll(PRECACHE_URLS).catch(e => {
        // В dev-окружении URL могут не резолвиться — не ломаем установку
        console.warn('[DTR SW] precache partial fail:', e);
      });
    })
  );
});

// ── ACTIVATE: удаляем старые кэши ───────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CACHE_STATIC)
          .map(k => { console.log('[DTR SW] Deleting old cache:', k); return caches.delete(k); })
      )
    ).then(() => self.clients.claim()) // берём контроль над всеми вкладками сразу
  );
});

// ── FETCH: роутинг запросов ──────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Supabase / GA — только сеть, без кэша
  if(API_PATTERNS.some(p => url.hostname.includes(p))){
    return; // браузер обрабатывает сам
  }

  // 2. Не-GET запросы — без кэша
  if(request.method !== 'GET') return;

  // 3. Шрифты и CDN — Cache-First (очень стабильные ресурсы)
  if(CDN_PATTERNS.some(p => url.hostname.includes(p))){
    event.respondWith(cacheFirst(request));
    return;
  }

  // 4. Наши JS / CSS / static — Cache-First
  if(
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico')
  ){
    event.respondWith(cacheFirst(request));
    return;
  }

  // 5. HTML навигация — Stale-While-Revalidate
  if(request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')){
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // 6. Всё остальное — сеть с fallback на кэш
  event.respondWith(networkWithCacheFallback(request));
});

// ── СТРАТЕГИИ ────────────────────────────────────────────────

// Cache-First: кэш → сеть → сохранить в кэш
async function cacheFirst(request){
  const cached = await caches.match(request);
  if(cached) return cached;
  try{
    const response = await fetch(request);
    if(response.ok){
      const cache = await caches.open(CACHE_STATIC);
      cache.put(request, response.clone());
    }
    return response;
  } catch(e){
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

// Stale-While-Revalidate: показываем кэш МГНОВЕННО, обновляем в фоне
async function staleWhileRevalidate(request){
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  // Запрос в сеть — всегда, параллельно
  const fetchPromise = fetch(request).then(response => {
    if(response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);

  // Если есть кэш — отдаём сразу (страница откроется мгновенно)
  return cached || fetchPromise;
}

// Network with Cache Fallback
async function networkWithCacheFallback(request){
  try{
    const response = await fetch(request);
    if(response.ok){
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch(e){
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}
