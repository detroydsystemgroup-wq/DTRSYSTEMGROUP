// ══ SUPABASE ═════════════════════════════════════════════════
const SUPABASE_URL='https://jwqvlhmtjtpoxwncmpex.supabase.co';
const SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cXZsaG10anRwb3h3bmNtcGV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMDY0NTIsImV4cCI6MjA4OTc4MjQ1Mn0.uCSike4yk_tbNUxdMUTVGjHof8aV8QnEsSWyo8KR-8Y';
const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);

// ══ CONSTANTS ════════════════════════════════════════════════
const AVATARS=['🌀','💫','⚡','🔮','🌑','💎','🦋','🫡','🌊','🎯','🏔️','🦅','🐉','🌙','⭐','🔱','🫧','💠','🌐','🦾'];
let ALL_CATS=[
  {id:'read',   name:'Чтение',                icon:'📚',color:'#58a6ff',desc:'Книги, статьи, учебники',         members:0},
  {id:'lang',   name:'Изучение языков',        icon:'🌍',color:'#FBBF24',desc:'Английский, испанский, японский', members:0},
  {id:'code',   name:'Новая профессия',        icon:'🚀',color:'#bc8cff',desc:'Курсы, навыки, карьера',          members:0},
  {id:'trading', name:'Повышение квалификации',icon:'📈',color:'#f7931a',desc:'Профессиональный рост',           members:0},
  {id:'cooking', name:'Духовность',            icon:'🫀',color:'#ff6b6b',desc:'Осознанность, душа, внутренний рост', members:0},
  {id:'intellect', name:'Интеллект',             icon:'💡',color:'#60d9fa',desc:'Логика, мышление, саморазвитие',      members:0},
];
// Загружаем реальные счётчики из БД
async function loadMemberCounts(){
  const{data}=await sb.from('user_categories').select('category_id');
  if(!data)return;
  const counts={};
  data.forEach(r=>{counts[r.category_id]=(counts[r.category_id]||0)+1;});
  ALL_CATS=ALL_CATS.map(c=>({...c,members:counts[c.id]||0}));
}
const ACH_DEF=[
  // ── СТАРТ ──────────────────────────────────────────────────
  {id:'first',    cat:'start', icon:'🚀',name:'Первый шаг',     desc:'Заверши первую сессию.',                    t:'sessions',  th:1,    color:'#58a6ff'},
  {id:'sess5',    cat:'start', icon:'🎯',name:'5 сессий',        desc:'Заверши 5 сессий.',                         t:'sessions',  th:5,    color:'#58a6ff'},
  {id:'sess10',   cat:'start', icon:'📊',name:'10 сессий',       desc:'Заверши 10 сессий.',                        t:'sessions',  th:10,   color:'#58a6ff'},
  {id:'sess25',   cat:'start', icon:'📈',name:'25 сессий',       desc:'Заверши 25 сессий.',                        t:'sessions',  th:25,   color:'#58a6ff'},
  {id:'sess50',   cat:'start', icon:'💼',name:'50 сессий',       desc:'Заверши 50 сессий.',                        t:'sessions',  th:50,   color:'#58a6ff'},
  {id:'sess100',  cat:'start', icon:'🏭',name:'100 сессий',      desc:'Заверши 100 сессий.',                       t:'sessions',  th:100,  color:'#58a6ff'},

  // ── ЧАСЫ ───────────────────────────────────────────────────
  {id:'h1',       cat:'hours', icon:'⏱️',name:'Первый час',      desc:'Суммарно 1 час.',                           t:'total_h',   th:1,    color:'#3fb950'},
  {id:'h10',      cat:'hours', icon:'🌱',name:'10 часов',         desc:'Суммарно 10 часов.',                        t:'total_h',   th:10,   color:'#3fb950'},
  {id:'h50',      cat:'hours', icon:'⭐',name:'50 часов',         desc:'Суммарно 50 часов.',                        t:'total_h',   th:50,   color:'#3fb950'},
  {id:'h100',     cat:'hours', icon:'💯',name:'100 часов',        desc:'Суммарно 100 часов.',                       t:'total_h',   th:100,  color:'#3fb950'},
  {id:'h250',     cat:'hours', icon:'🏆',name:'250 часов',        desc:'Суммарно 250 часов.',                       t:'total_h',   th:250,  color:'#3fb950'},
  {id:'h500',     cat:'hours', icon:'💎',name:'500 часов',        desc:'Суммарно 500 часов.',                       t:'total_h',   th:500,  color:'#3fb950'},
  {id:'h1000',    cat:'hours', icon:'👑',name:'1000 часов',       desc:'Суммарно 1000 часов. Легенда.',             t:'total_h',   th:1000, color:'#d29922'},

  // ── СТРИКИ ─────────────────────────────────────────────────
  {id:'streak3',  cat:'streak',icon:'🔥',name:'3 дня дисциплины',    desc:'3 дня занятий подряд.',                     t:'streak',    th:3,    color:'#f85149'},
  {id:'streak7',  cat:'streak',icon:'🌟',name:'Неделя силы',     desc:'7 дней занятий подряд.',                    t:'streak',    th:7,    color:'#f85149'},
  {id:'streak14', cat:'streak',icon:'⚡',name:'Две недели',       desc:'14 дней занятий подряд.',                   t:'streak',    th:14,   color:'#f85149'},
  {id:'streak30', cat:'streak',icon:'🌙',name:'Месяц дисциплины',desc:'30 дней занятий подряд.',               t:'streak',    th:30,   color:'#f85149'},
  {id:'streak60', cat:'streak',icon:'🦁',name:'60 дней',          desc:'60 дней занятий подряд.',                   t:'streak',    th:60,   color:'#f85149'},
  {id:'streak100',cat:'streak',icon:'🏅',name:'100 дней',         desc:'100 дней занятий подряд.',                  t:'streak',    th:100,  color:'#d29922'},

  // ── СЕССИИ ─────────────────────────────────────────────────
  {id:'marathon', cat:'sess',  icon:'🏃',name:'Марафонец',        desc:'Сессия длиннее 2 часов.',                   t:'sess_dur',  th:7200,  color:'#bc8cff'},
  {id:'ultra',    cat:'sess',  icon:'🦅',name:'Ультра',           desc:'Сессия длиннее 4 часов.',                   t:'sess_dur',  th:14400, color:'#bc8cff'},
  {id:'early',    cat:'sess',  icon:'🌅',name:'Ранняя пташка',    desc:'Начни сессию до 8 утра.',                   t:'time_early',th:8,     color:'#bc8cff'},
  {id:'night',    cat:'sess',  icon:'🦉',name:'Ночная сова',      desc:'Начни сессию после 22:00.',                 t:'time_late', th:22,    color:'#bc8cff'},
  {id:'weekend',  cat:'sess',  icon:'🎉',name:'Выходной герой',   desc:'Сессия в субботу или воскресенье.',         t:'weekend',   th:1,     color:'#bc8cff'},
  {id:'daily2h',  cat:'sess',  icon:'⏰',name:'2 часа в день',    desc:'Набери 2+ часов за 1 день.',                t:'day_hrs',   th:2,     color:'#bc8cff'},

  // ── РАЗНООБРАЗИЕ ───────────────────────────────────────────
  {id:'multi2',   cat:'multi', icon:'🎭',name:'Два пути',         desc:'Веди 2 активные лиги.',                     t:'cat_cnt',   th:2,    color:'#d1a366'},
  {id:'multi3',   cat:'multi', icon:'🌐',name:'Три пути',         desc:'Веди 3 активные лиги.',                     t:'cat_cnt',   th:3,    color:'#d1a366'},
  {id:'multi',    cat:'multi', icon:'🌈',name:'Разносторонний',   desc:'Веди 4 и более активных лиги.',             t:'cat_cnt',   th:4,    color:'#d1a366'},
  {id:'allday',   cat:'multi', icon:'🗓️',name:'Каждый день',      desc:'7 активных дней за неделю.',                t:'week_days', th:7,    color:'#d1a366'},

  // ── АРЕНА / ЛИГИ ───────────────────────────────────────────
  {id:'top3',     cat:'arena', icon:'🥉',name:'Топ-3',            desc:'Войди в топ-3 любой лиги.',                 t:'top3',      th:1,    color:'#d29922'},
  {id:'top1',     cat:'arena', icon:'🥇',name:'Чемпион',          desc:'Займи 1-е место в любой лиге.',             t:'top1',      th:1,    color:'#d29922'},
  {id:'social',   cat:'arena', icon:'👥',name:'Не одинок',        desc:'Играй в лиге с 5+ реальными участниками.',  t:'league_size',th:5,   color:'#d29922'},

  // ── СЕКРЕТНЫЕ ──────────────────────────────────────────────
  {id:'grind',    cat:'secret',icon:'😤',name:'Гриндер',          desc:'???',                                       t:'sess_day',  th:3,    color:'#484f58', secret:true},
  {id:'comeback', cat:'secret',icon:'🦋',name:'Возвращение',      desc:'???',                                       t:'comeback',  th:1,    color:'#484f58', secret:true},
  {id:'nonstop',  cat:'secret',icon:'⚙️',name:'Нон-стоп',        desc:'???',                                       t:'streak',    th:365,  color:'#484f58', secret:true},
];
const ACH_CATS={
  start: {label:'Начало пути', icon:'🚀'},
  hours: {label:'Часы',        icon:'⏱️'},
  streak:{label:'Дисциплина',      icon:'🔥'},
  sess:  {label:'Сессии',      icon:'🏃'},
  multi: {label:'Разнообразие',icon:'🌈'},
  arena: {label:'Арена',       icon:'⚔️'},
  secret:{label:'Секретные',   icon:'🔮'},
};
const FNAMES={
  read:['BookWorm99','silent_page','reader_x','litclub','daily_read','nova_lit','pageturner','mindreads'],
  lang:['fluent_ru','lingopro','polyglot_x','wordsmith','speakup','babel_fish','langhero','verbmaster'],
  code:['career_pro','new_path','reskill_k','pivot_x','upskill99','growth_hub','pro_track','leveler'],
  trading:['expert_up','qual_pro','skill_max','advance_x','master_it','pro_level','top_grade','high_skill'],
  cooking:['spirit_k','soul_pro','heart_x','divine_m','inner_zen','sacred_m','peace_hub','aura_pro'],
  intellect:['logic_pro','think_x','mind_max','reason_k','smart_hub','iq_level','wise_pro','clarity_x'],
};
const FAVS=['🌀','💫','🦋','🌑','💎','🦅','🐉','🌊','⭐','🔱','🏔️','🦾','🔮','🌙','💠'];

// ══ SVG ICON SYSTEM ═══════════════════════════════════════
const ICONS = {
  read:     `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  lang:     `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  code:     `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z"/><polyline points="16 2 16 8 22 8"/></svg>`,
  trading:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  cooking:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  intellect:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><path d="M12 6a6 6 0 1 1 0 12"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>`,
  zap:      `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  flame:    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  trophy:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="14 9 15.5 4 22 6"/><polyline points="10 9 8.5 4 2 6"/><path d="M4.23 12C2.86 11 2 9.6 2 8c0-3.31 2.69-6 6-6h8c3.31 0 6 2.69 6 6 0 1.6-.86 3-2.23 4"/><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>`,
  timer:    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
};

function iconBox(id, color='var(--t2)', size=36, radius=10){
  const svg = ICONS[id] || ICONS.timer;
  // Use CSS class + inline only for color/size (unavoidable for dynamic values)
  const s = [
    `width:${size}px`,
    `height:${size}px`,
    `border-radius:${radius}px`,
    `color:${color}`,
    `background:${color}1a`,          // ~10% opacity tint
    `border:0.5px solid ${color}33`,  // ~20% opacity border
  ].join(';');
  return `<div class="icon-box-base" style="${s}">${svg}</div>`;
}

function catIconBox(catId, color, size=42){
  const map={read:'read',lang:'lang',code:'code',trading:'trading',cooking:'cooking',intellect:'intellect'};
  return iconBox(map[catId]||'timer', color, size, 12);
}

// ══ STATE ════════════════════════════════════════════════════
let P=null, SB_USER=null;
let selAv=AVATARS[0], editSelAv=AVATARS[0];
let regBuf=null, selCatIds=new Set();
let dashPeriod='week';
let lgCache={};
let lgCacheTime={}; // TTL: timestamp when each catId was cached
const LG_CACHE_TTL = 10 * 60 * 1000; // 10 минут — дольше кеш = меньше лишних запросов
let arenaMode='hours'; // 'hours'|'streak'|'week'|'month'|'session'

// ══ BANNER ═══════════════════════════════════════════════════
let bIdx=0,bTmr=null;
const B_CNT=4;
function initBanner(){
  document.getElementById('bdots').innerHTML=
    Array.from({length:B_CNT},(_,i)=>`<div class="bdot ${i===0?'active':''}" onclick="goBanner(${i})"></div>`).join('');
  bTmr=setInterval(()=>goBanner((bIdx+1)%B_CNT),4000);
}
function goBanner(idx){
  const slides=document.querySelectorAll('.bslide'),dots=document.querySelectorAll('.bdot');
  slides[bIdx].classList.remove('active');slides[bIdx].classList.add('exit');
  setTimeout(()=>slides[bIdx].classList.remove('exit'),500);
  bIdx=idx;slides[bIdx].classList.add('active');
  dots.forEach((d,i)=>d.classList.toggle('active',i===bIdx));
}

// ══ AUTH HELPERS ═════════════════════════════════════════════
function rpAv(id,sel,fn){
  document.getElementById(id).innerHTML=AVATARS.map(a=>
    `<div class="av-opt ${a===sel?'sel':''}" onclick="${fn}('${a}')">${a}</div>`).join('');
}
function selAvFn(a){selAv=a;rpAv('avPicker',a,'selAvFn');}
function editAvFn(a){editSelAv=a;rpAv('avEditPicker',a,'editAvFn');}
function switchATab(t){
  document.getElementById('tabL').classList.toggle('active',t==='l');
  document.getElementById('tabR').classList.toggle('active',t==='r');
  document.getElementById('lForm').style.display=t==='l'?'':'none';
  document.getElementById('rForm').style.display=t==='r'?'':'none';
  if(t==='r')rpAv('avPicker',selAv,'selAvFn');
}

// ══ LOGIN ════════════════════════════════════════════════════
async function doLogin(){
  const n=document.getElementById('lN').value.trim();
  const p=document.getElementById('lP').value;
  const err=document.getElementById('lErr');
  err.textContent='';
  if(!n){err.textContent='Введи никнейм';return;}
  if(!p){err.textContent='Введи пароль';return;}
  const btn=document.querySelector('#lForm .btn-auth');
  btn.textContent='Входим...';btn.disabled=true;
  const {data,error}=await sb.auth.signInWithPassword({
    email:n.toLowerCase()+'@lifetrack.app',password:p
  });
  btn.textContent='Войти';btn.disabled=false;
  if(error){
    console.error('Login error:', error);
    if(error.message?.includes('fetch')||error.message?.includes('network')||error.message?.includes('Failed')){
      err.textContent='Ошибка соединения с сервером. Проверь интернет.';
    } else if(error.message?.includes('Invalid')||error.message?.includes('credentials')){
      err.textContent='Неверный никнейм или пароль';
    } else {
      err.textContent='Ошибка: '+error.message;
    }
    return;
  }
  SB_USER=data.user;
  _loadUserRetryCount = 0;
  await loadUser(data.user.id);
}

// ══ REGISTER — STEP 1 ════════════════════════════════════════
async function goToCatSel(){
  const n=document.getElementById('rN').value.trim();
  const p=document.getElementById('rP').value;
  const err=document.getElementById('rErr');
  err.textContent='';
  if(!n||n.length<3){err.textContent='Никнейм минимум 3 символа';return;}
  if(n.length>20){err.textContent='Никнейм не длиннее 20 символов';return;}
  if(!/^[a-zA-Zа-яА-Я0-9_]+$/.test(n)){err.textContent='Только буквы, цифры и _';return;}
  if(!p||p.length<6){err.textContent='Пароль минимум 6 символов';return;}
  err.textContent='Проверяем никнейм...';
  const {data:ex}=await sb.from('users').select('id').eq('username',n).maybeSingle();
  if(ex){err.textContent='Этот никнейм занят';return;}
  err.textContent='';
  regBuf={name:n,pass:p,avatar:selAv};
  selCatIds=new Set();
  renderCatSelGrid();
  document.getElementById('onboard').style.display='none';
  document.getElementById('catSel').style.display='flex';
  clearInterval(bTmr);
}

// ══ REGISTER — CAT SELECT ════════════════════════════════════
function renderCatSelGrid(){
  document.getElementById('catSelGrid').innerHTML=ALL_CATS.map(c=>`
    <div class="csg-item ${selCatIds.has(c.id)?'sel':''}" onclick="toggleCS('${c.id}')"
      style="${selCatIds.has(c.id)?`border-color:${c.color}`:''}">
      <div class="csg-check" style="background:${c.color}22;color:${c.color}">✓</div>
      <div class="csg-emo">${c.icon}</div>
      <div class="csg-txt">
        <div class="csg-name" style="${selCatIds.has(c.id)?`color:${c.color}`:''}">${c.name}</div>
        <div class="csg-desc">${c.desc}</div>
        <div class="csg-members" style="color:${c.color}">${c.members.toLocaleString('ru')} участников</div>
      </div>
    </div>`).join('');
  document.getElementById('selCntDisp').textContent=selCatIds.size;
  document.getElementById('btnFinish').disabled=selCatIds.size===0;
}
function toggleCS(id){selCatIds.has(id)?selCatIds.delete(id):selCatIds.add(id);renderCatSelGrid();}

// ══ REGISTER — FINISH ════════════════════════════════════════
async function finishReg(){
  if(!regBuf||!selCatIds.size)return;
  const btn=document.getElementById('btnFinish');
  btn.textContent='Создаём...';btn.disabled=true;

  const {data:authData,error:authErr}=await sb.auth.signUp({
    email:regBuf.name.toLowerCase()+'@lifetrack.app',
    password:regBuf.pass,
    options:{data:{username:regBuf.name}}
  });

  if(authErr){
    btn.textContent='Начать';btn.disabled=false;
    alert('Ошибка регистрации: '+authErr.message);return;
  }

  // Email confirmation required — попытаемся войти немедленно через signInWithPassword
  // Это работает когда Confirm email ВЫКЛЮЧЕН в Supabase
  if(!authData.session){
    // Пытаемся сразу залогиниться (если подтверждение не нужно, сессия откроется)
    const {data:loginData, error:loginErr} = await sb.auth.signInWithPassword({
      email: regBuf.name.toLowerCase()+'@lifetrack.app',
      password: regBuf.pass
    });
    if(loginData?.session){
      // Успешно — продолжаем регистрацию как обычно
      authData.session = loginData.session;
      authData.user = loginData.user;
    } else {
      // Email confirmation всё ещё требуется — показываем инструкцию
      btn.textContent='Начать';btn.disabled=false;
      document.getElementById('catSel').innerHTML=`
        <div style="text-align:center;padding:40px 24px;max-width:460px;color:var(--t1)">
          <div style="font-size:56px;margin-bottom:16px">⚙️</div>
          <div style="font-family:'DM Sans',sans-serif;font-size:22px;font-weight:700;margin-bottom:12px">Нужна настройка</div>
          <div style="font-size:14px;color:var(--t2);line-height:1.8;text-align:left;background:var(--card);border-radius:12px;padding:16px 20px;border:0.5px solid var(--border)">
            Для работы регистрации нужно отключить email-подтверждение в Supabase:<br><br>
            <b style="color:var(--t1)">1.</b> Открой <b style="color:var(--gold)">Supabase Dashboard</b><br>
            <b style="color:var(--t1)">2.</b> Authentication → Providers → Email<br>
            <b style="color:var(--t1)">3.</b> Выключи <b style="color:var(--gold)">"Confirm email"</b><br>
            <b style="color:var(--t1)">4.</b> Нажми Save → вернись и попробуй снова
          </div>
          <div style="display:flex;gap:10px;margin-top:20px;justify-content:center">
            <button onclick="document.getElementById('catSel').style.display='none';document.getElementById('onboard').style.display='flex';initBanner();" style="padding:12px 24px;border-radius:10px;border:0.5px solid var(--border);background:var(--card);color:var(--t2);font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif">← Назад</button>
            <button onclick="location.reload()" style="padding:12px 24px;border-radius:10px;border:none;background:var(--gold);color:#0A0A0B;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif">Попробовать снова</button>
          </div>
        </div>`;
      return;
    }
  }

  const userId=authData.user.id;
  
  // Upsert users (ignore if already exists)
  const{error:uErr}=await sb.from('users').upsert({
    id:userId,username:regBuf.name,avatar:regBuf.avatar,
    streak:0,total_sessions:0,active_days:0
  },{onConflict:'id'});
  
  if(uErr){
    console.error('User insert error:',uErr);
    btn.textContent='Ошибка — попробуй снова';btn.disabled=false;
    showToast('Ошибка создания профиля: '+uErr.message,'⚠️');
    return;
  }
  
  const catRows=[...selCatIds].map(catId=>({user_id:userId,category_id:catId,hours:0}));
  const{error:cErr}=await sb.from('user_categories').upsert(catRows,{onConflict:'user_id,category_id'});
  if(cErr){console.error('Category insert error:',cErr);}

  SB_USER=authData.user;
  regBuf=null;
  document.getElementById('catSel').style.display='none';
  _loadUserRetryCount = 0;
  await loadUser(userId);
  applyTheme();applyLang();
}

// ══ LOGOUT ══════════════════════════════════════════════════
async function doLogout(){
  // FIX: properly clean up all background processes before logout
  if(_timerWorker){ _timerWorker.postMessage('stop'); _timerWorker.terminate(); _timerWorker=null; }
  if(timerRunning){ timerRunning=false; setTimerState(null); localStorage.removeItem(MODAL_TIMER_KEY); }
  if(presenceInterval){ clearInterval(presenceInterval); presenceInterval=null; }
  if(msgRealtimeChannel){ sb.removeChannel(msgRealtimeChannel); msgRealtimeChannel=null; }
  if(usersRealtimeChannel){ sb.removeChannel(usersRealtimeChannel); usersRealtimeChannel=null; }
  if(msgsPolling){ clearInterval(msgsPolling); msgsPolling=null; }
  await sb.auth.signOut();
  P=null;SB_USER=null;lgCache={};lgCacheTime={};activeConvUserId=null;
  document.getElementById('app').style.display='none';
  document.getElementById('onboard').style.display='flex';
  initBanner();rpAv('avPicker',selAv,'selAvFn');
}

// ══ DEMO ════════════════════════════════════════════════════
function doDemo(){
  SB_USER={id:'demo',isDemoUser:true};
  P={
    id:'demo',name:'Demo_Player',avatar:'🎯',
    joinedDate:'01.01.2025',
    activeCatIds:['code','read','lang'],
    categories:ALL_CATS.map(c=>({...c,hours:c.id==='code'?247:c.id==='read'?98:33})),
    sessions:[
      {cat:'code',name:'Программирование',icon:'💻',color:'#bc8cff',dur:9000,date:'сегодня',ts:Date.now()-3600000},
      {cat:'read',name:'Чтение',icon:'📚',color:'#58a6ff',dur:3600,date:'вчера',ts:Date.now()-90000000},
      {cat:'lang',name:'Языки',icon:'🌍',color:'#d1a366',dur:1800,date:'3 дня назад',ts:Date.now()-270000000},
    ],
    achievements:ACH_DEF.map((a,i)=>({id:a.id,unlocked:i<3,unlockedAt:i<3?'01.03.2025':null})),
    streak:5,lastActiveDate:new Date().toDateString(),totalSessions:4,totalActiveDays:12
  };
  document.getElementById('onboard').style.display='none';
  document.getElementById('app').style.display='';
  clearInterval(bTmr);
  renderAll();
initRipple();
initKpiGlow();
restoreTimer();
initPresence();
initRealtimeMessages();
showTab('dash');
  setTimeout(checkSundayBanner,1500);
}


// ══ STREAK CALCULATOR ════════════════════════════════════════
// Counts consecutive days with at least one session, going back from today
function computeStreakFromSessions(sessions){
  if(!sessions||!sessions.length) return 0;
  const daySet=new Set();
  sessions.forEach(s=>{
    // Поддерживаем оба формата: created_at (ISO строка) и ts (timestamp в мс)
    let ts = null;
    if(s.created_at) ts = new Date(s.created_at).getTime();
    else if(s.ts) ts = s.ts;
    if(ts && !isNaN(ts)){
      const d=new Date(ts);
      const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      daySet.add(key);
    }
  });
  if(!daySet.size) return 0;
  let streak=0;
  const today=new Date();
  for(let i=0;i<365;i++){
    const d=new Date(today);
    d.setDate(d.getDate()-i);
    const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if(daySet.has(key)) streak++;
    else if(i>0) break; // первый пропуск = конец стрика
  }
  return streak;
}

// ══ LOAD USER FROM DB ════════════════════════════════════════
let _loadUserRetryCount = 0;
const _LOAD_USER_MAX_RETRIES = 5;

async function loadUser(userId){
  const appEl = document.getElementById('app');
  const onboardEl = document.getElementById('onboard');

  try{
  // PERF FIX: двухфазная загрузка
  // Фаза 1 — только данные пользователя (быстро, 1 запрос)
  // Показываем app сразу, без ожидания сессий/достижений
  const r1 = await sb.from('users').select('*').eq('id',userId).single();
  const user = r1.data;

  // Если пользователя нет — обрабатываем сразу, не ждём остальное
  if(!user){
    if(_loadUserRetryCount >= _LOAD_USER_MAX_RETRIES){
      console.error('loadUser: user not found after', _LOAD_USER_MAX_RETRIES, 'retries. Giving up.');
      showToast('Не удалось загрузить профиль. Выйди и войди снова.', '⚠️');
      _loadUserRetryCount = 0;
      return;
    }
    let username = 'User_' + userId.slice(0, 6);
    try {
      const authResult = await sb.auth.getUser();
      const meta = authResult?.data?.user?.user_metadata;
      if(meta?.username) username = meta.username;
    } catch(authErr) { console.warn('auth.getUser failed:', authErr); }
    const {error: createErr} = await sb.from('users').upsert({
      id: userId, username, avatar: '🎯', streak: 0, total_sessions: 0, active_days: 0
    }, {onConflict: 'id'});
    if(createErr) console.error('Failed to create user row:', createErr);
    _loadUserRetryCount++;
    setTimeout(() => loadUser(userId), 1200);
    return;
  }

  _loadUserRetryCount = 0;

  // ФАЗА 1: показываем профиль МГНОВЕННО с базовыми данными
  // Счётчики сессий/часов появятся через ~100мс когда придут данные
  P = {
    id: userId, name: user.username, avatar: user.avatar||'🎯',
    joinedDate: new Date(user.created_at||Date.now()).toLocaleDateString('ru'),
    activeCatIds: [], categories: [], sessions: [], achievements: [],
    streak: user.streak||0, lastActiveDate: user.last_active_date,
    totalSessions: user.total_sessions||0,
    totalActiveDays: user.active_days||0,
    avatarUrl: user.avatar_url||null,
    _loading: true  // флаг: данные ещё грузятся
  };

  // Скрываем онбординг, показываем скелетон — данные придут в Фазе 2
  onboardEl.style.display='none';
  document.getElementById('catSel').style.display='none';
  appEl.style.display='';
  clearInterval(bTmr);
  applyTheme(); applyLang();

  // Фаза 1: только инфраструктура (без рендера цифр — они придут с данными)
  initPresence();
  initRealtimeMessages();
  initNotifications();
  if(!SB_USER.isDemoUser){
    sb.from('users').update({last_seen:new Date().toISOString()})
      .eq('id',SB_USER.id)
      .then(null, e => console.warn('last_seen update failed:', e));
  }

  // ФАЗА 2: грузим все данные параллельно (сессии, категории, достижения)
  const [r2, r3, r4] = await Promise.all([
    sb.from('user_categories').select('category_id,hours').eq('user_id',userId),
    sb.from('sessions').select('id,category_id,duration_seconds,created_at').eq('user_id',userId).order('created_at',{ascending:false}).limit(300),
    sb.from('user_achievements').select('achievement_id,unlocked,unlocked_at').eq('user_id',userId),
  ]);

  if(r2.error) console.warn('user_categories error:', r2.error);
  if(r3.error) console.warn('sessions error:', r3.error);
  if(r4.error) console.warn('user_achievements error:', r4.error);

  const userCats = r2.data || [];
  const sessions = r3.data || [];
  const userAchs = r4.data || [];

  // Phase 2 data ready — build full state
  const ucMap={};userCats.forEach(uc=>{ucMap[uc.category_id]=uc.hours||0;});
  const activeCatIds=Object.keys(ucMap);
  const categories=ALL_CATS.filter(c=>activeCatIds.includes(c.id)).map(c=>({...c,hours:ucMap[c.id]||0}));

  const achMap={};userAchs.forEach(ua=>{achMap[ua.achievement_id]={u:ua.unlocked,at:ua.unlocked_at};});
  const achievements=ACH_DEF.map(a=>({
    id:a.id,unlocked:achMap[a.id]?.u||false,
    unlockedAt:achMap[a.id]?.at?new Date(achMap[a.id].at).toLocaleDateString('ru'):null
  }));

  const catLookup={};ALL_CATS.forEach(c=>{catLookup[c.id]=c;});
  // ── Deduplicate sessions: remove near-duplicates (same cat+dur within 60s) ──
  // This fixes legacy duplicate sessions caused by the old double-save bug
  const _seenSessKey = new Set();
  const sessionsDeduped = sessions.filter(s => {
    const bucket = Math.floor(new Date(s.created_at).getTime() / 60000); // 1-min bucket
    const key = `${s.category_id}_${s.duration_seconds}_${bucket}`;
    if (_seenSessKey.has(key)) return false;
    _seenSessKey.add(key);
    return true;
  });

  const sessFmt=sessionsDeduped.map(s=>{
    const c=catLookup[s.category_id]||{name:s.category_id,icon:'⏱',color:'var(--t2)'};
    // Если created_at отсутствует — используем текущее время как запасной вариант
    const tsRaw = s.created_at ? new Date(s.created_at).getTime() : Date.now();
    const ts = isNaN(tsRaw) ? Date.now() : tsRaw;
    return{id:s.id,cat:s.category_id,name:c.name,icon:c.icon,color:c.color,
      dur:s.duration_seconds,
      date:relDate(s.created_at),
      isoDate:s.created_at,
      ts};
  });

  // ── totalSessions: prefer DB value (handles >300 sessions) ───
  const finalTotalSessions = Math.max(user.total_sessions||0, sessionsDeduped.length);

  // ── Streak: recompute from sessions (local timezone-safe) ─────
  const computedStreak = computeStreakFromSessions(sessionsDeduped);
  // FIX: use computed only — DB value may be inflated from old duplicate-session bug
  const finalStreak = computedStreak;

  // ── Активные дни: уникальные дни с сессиями за всё время ─────
  // ВАЖНО: это НЕ стрик — это общее число дней когда были занятия
  const computedActiveDays = new Set(
    sessionsDeduped.map(s=>{
      const d = new Date(s.created_at);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    })
  ).size;
  // Берём максимум: данные из БД (могут включать сессии старше 300) vs пересчёт
  const totalActiveDays = Math.max(user.active_days||0, computedActiveDays);

  // Update P with full data (replaces the skeleton P from Phase 1)
  P={
    id:userId, name:user.username, avatar:user.avatar||'🎯',
    joinedDate: new Date(user.created_at||Date.now()).toLocaleDateString('ru'),
    activeCatIds, categories, sessions:sessFmt, achievements,
    streak:finalStreak, lastActiveDate:user.last_active_date,
    totalSessions:finalTotalSessions,
    totalActiveDays,
    avatarUrl:user.avatar_url||null,
    _loading: false
  };
  // Invalidate league cache so arena shows the correct avatar immediately
  // Кэш лиг не сбрасываем здесь — сбросим в Phase 2 если категории изменились

  // ── RECONCILE hours: sessions are source of truth ─────────────
  // user_categories.hours can be 0 if previous saves failed.
  // Recompute from sessions and take the maximum.
  const sessHrsByCat={};
  sessFmt.forEach(s=>{
    sessHrsByCat[s.cat]=(sessHrsByCat[s.cat]||0)+s.dur/3600;
  });
  P.categories=P.categories.map(c=>({
    ...c,
    hours: Math.max(c.hours, Math.round((sessHrsByCat[c.id]||0)*100)/100)
  }));
  // Recover categories that appear in sessions but have no user_categories row
  // ВАЖНО: восстанавливаем только если у пользователя нет НИ ОДНОЙ лиги
  if(P.activeCatIds.length === 0){
    Object.entries(sessHrsByCat).forEach(([catId,hrs])=>{
      if(!P.categories.find(c=>c.id===catId)){
        const def=ALL_CATS.find(c=>c.id===catId);
        if(def){
          if(!P.activeCatIds.includes(catId)) P.activeCatIds.push(catId);
          P.categories.push({...def, hours:Math.round(hrs*100)/100});
        }
      }
    });
  } else {
    Object.entries(sessHrsByCat).forEach(([catId,hrs])=>{
      const cat=P.categories.find(c=>c.id===catId);
      if(cat){ cat.hours=Math.max(cat.hours, Math.round(hrs*100)/100); }
    });
  }

  // Background: heal stale 0-hour rows in DB (fire-and-forget)
  // Supabase v2 Thenable does NOT support .catch() — use async IIFE
  P.categories.forEach(c=>{
    const dbH=ucMap[c.id]||0;
    if(dbH===0 && c.hours>0){
      (async()=>{
        try{
          await sb.from('user_categories').upsert(
            {user_id:userId, category_id:c.id, hours:c.hours},
            {onConflict:'user_id,category_id'}
          );
        }catch(e){console.warn('hours bg-sync failed:',e);}
      })();
    }
  });

  // Background: sync streak if it diverged from stored value
  if(finalStreak !== (user.streak||0)){
    (async()=>{
      try{ await sb.from('users').update({streak:finalStreak}).eq('id',userId); }
      catch(e){ console.warn('streak sync failed:',e); }
    })();
  }

  // Background: sync active_days if it diverged from stored value
  if(totalActiveDays !== (user.active_days||0)){
    (async()=>{
      try{ await sb.from('users').update({active_days:totalActiveDays}).eq('id',userId); }
      catch(e){ console.warn('active_days sync failed:',e); }
    })();
  }

  // Phase 2 complete — первый и единственный рендер с реальными данными
  // Сбрасываем кэш лиг только если изменились категории пользователя
  {
    const _prevIds = Object.keys(lgCache).sort().join(',');
    const _newIds  = (P.activeCatIds||[]).slice().sort().join(',');
    if(_prevIds !== _newIds){ lgCache = {}; lgCacheTime = {}; }
  }
  if(typeof renderHeroZone === 'function') renderHeroZone();
  renderAll();
  showTab('dash');
  initRipple(); initKpiGlow();
  restoreTimer();
  if(typeof window._dtrDashEntered !== 'undefined') window._dtrDashEntered = false;
  setTimeout(()=>{ if(typeof DTROrchestrate === 'function') DTROrchestrate(); }, 200);
  setTimeout(checkSundayBanner, 1500);

  } catch(e){
    console.error('loadUser failed (attempt', _loadUserRetryCount+1, '):', e);
    _loadUserRetryCount++;

    if(_loadUserRetryCount >= _LOAD_USER_MAX_RETRIES){
      // Give up — show login screen with error
      _loadUserRetryCount = 0;
      P = null;
      const appEl2 = document.getElementById('app');
      const onboardEl2 = document.getElementById('onboard');
      if(appEl2) appEl2.style.display = 'none';
      if(onboardEl2) onboardEl2.style.display = 'flex';
      showToast('Не удалось загрузить профиль. Попробуй войти снова.', '⚠️');
      return;
    }

    // Retry with exponential backoff: 2s, 4s, 6s...
    const delay = _loadUserRetryCount * 2000;
    showToast(`Загрузка профиля... (попытка ${_loadUserRetryCount}/${_LOAD_USER_MAX_RETRIES})`, '🔄');
    setTimeout(()=>loadUser(userId), delay);
  }
}

// ══ SAVE SESSION ════════════════════════════════════════════
let _sessionSaving = false;
async function saveSession(catId,secs){
  if(secs<5)return;
  if(_sessionSaving){ console.warn('saveSession: skipped duplicate call'); return; }
  _sessionSaving = true;
  const cat=P.categories.find(c=>c.id===catId)||ALL_CATS.find(c=>c.id===catId);
  if(!cat){ _sessionSaving=false; return; }

  if(SB_USER?.isDemoUser){
    // Demo: local only
    const pc=P.categories.find(c=>c.id===catId);
    if(pc)pc.hours=Math.round((pc.hours+secs/3600)*10)/10;
    else P.categories.push({...cat,hours:Math.round(secs/3600*10)/10});
    const today=new Date().toDateString(),yest=new Date(Date.now()-86400000).toDateString();
    if(P.lastActiveDate!==today){
      P.streak=P.lastActiveDate===yest?(P.streak||0)+1:1;
      P.lastActiveDate=today;
      // Считаем активный день
      P.totalActiveDays=(P.totalActiveDays||0)+1;
    }
    const nowISO=new Date().toISOString();
    P.sessions.unshift({cat:catId,name:cat.name,icon:cat.icon,color:cat.color,dur:secs,date:'только что',ts:Date.now(),isoDate:nowISO});
    P.totalSessions=(P.totalSessions||0)+1;
    const newly=checkAchsLocal({dur:secs});
    renderAll();
    showToast(`${cat.icon} +${fmtD(secs)} в "${cat.name}"`, '✅');
    newly.forEach((a,i)=>setTimeout(()=>showToast(a.name,'🏆',true,'Новая награда разблокирована!'),(i+1)*900));
    _sessionSaving = false;
    return;
  }

  // Real Supabase save
  try {
  const {error}=await sb.from('sessions').insert({
    user_id:SB_USER.id,category_id:catId,duration_seconds:secs,content_type:'manual'
  });
  if(error){console.error(error);showToast('Ошибка сохранения','⚠️');_sessionSaving=false;return;}

  // Update hours
  const {data:uc}=await sb.from('user_categories').select('id,hours').eq('user_id',SB_USER.id).eq('category_id',catId).maybeSingle();
  if(uc){await sb.from('user_categories').update({hours:(uc.hours||0)+secs/3600}).eq('id',uc.id);}
  else{await sb.from('user_categories').insert({user_id:SB_USER.id,category_id:catId,hours:secs/3600});}

  // Update streak — recompute from sessions (local timezone, single source of truth)
  const _now=new Date();
  const todayISO=`${_now.getFullYear()}-${String(_now.getMonth()+1).padStart(2,'0')}-${String(_now.getDate()).padStart(2,'0')}`;
  // Include this new session in recompute
  const _prevSessions=P.sessions.map(s=>({created_at:s.isoDate||new Date(s.ts||Date.now()).toISOString()}));
  const _allSessions=[..._prevSessions,{created_at:new Date().toISOString()}];
  const newStreak=computeStreakFromSessions(_allSessions);
  P.lastActiveDate=todayISO;
  const newTotalSessions=(P.totalSessions||0)+1;
  // Считаем обновлённое число активных дней (локально)
  const _nowKey=`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
  const _existDayKeys=new Set(P.sessions.map(s=>{const d=new Date(sessTs(s)||0);return`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;}));
  const newActiveDays = (_existDayKeys.has(_nowKey)) ? (P.totalActiveDays||0) : (P.totalActiveDays||0)+1;
  await sb.from('users').update({
    streak:newStreak,
    last_active_date:todayISO,
    total_sessions:newTotalSessions,
    active_days:newActiveDays,
    last_seen:new Date().toISOString()
  }).eq('id',SB_USER.id);

  // Update local P
  const pc=P.categories.find(c=>c.id===catId);
  if(pc)pc.hours=Math.round((pc.hours+secs/3600)*10)/10;
  else P.categories.push({...cat,hours:Math.round(secs/3600*10)/10});
  if(!P.activeCatIds.includes(catId))P.activeCatIds.push(catId);
  P.streak=newStreak;
  P.lastActiveDate=todayISO;
  const nowISO=new Date().toISOString();
  P.sessions.unshift({cat:catId,name:cat.name,icon:cat.icon,color:cat.color,dur:secs,date:'только что',ts:Date.now(),isoDate:nowISO});
  // ВАЖНО: используем newTotalSessions из БД, а не P.sessions.length
  // P.sessions ограничен 300 записями, реальное значение может быть больше
  P.totalSessions=newTotalSessions;
  P.totalActiveDays=newActiveDays;

  const newly=await checkAchsSB(secs);

  // Инвалидируем кеш арены для этой категории
  // Так как теперь arena берёт часы из P.categories для текущего пользователя,
  // достаточно просто обновить P в кеше — но удаление кеша надёжнее
  delete lgCache[catId]; delete lgCacheTime[catId];

  renderAll();
  setTimeout(renderDailyProgress, 200);
  showToast(`${cat.icon} +${fmtD(secs)} в "${esc(cat.name)}"`, '✅');
  newly.forEach((a,i)=>setTimeout(()=>showToast(`🏆 ${esc(a.name)}`,a.icon,true),(i+1)*900));
  if(typeof renderHeroZone === 'function') renderHeroZone();
  // ── Social events ──
  if(typeof window.socOnSessionSaved === 'function') window.socOnSessionSaved(catId, secs);
  if(newly.length && typeof window.socOnAchievement === 'function') newly.forEach(a => setTimeout(()=>window.socOnAchievement(a), 500));
  // Check level up
  (function(){
    const thBefore = (P.categories.find(c=>c.id===catId)?.hours||0) - secs/3600;
    const thAfter  = P.categories.find(c=>c.id===catId)?.hours||0;
    if(typeof getLevelInfo==='function' && typeof window.socOnLevelUp==='function'){
      const lvlBefore = getLevelInfo(thBefore - secs/3600 < 0 ? 0 : thBefore).lvl;
      const lvlAfter  = getLevelInfo(P.sessions.reduce((a,s)=>a+s.dur/3600,0)).lvl;
      if(lvlAfter > lvlBefore){
        const info = getLevelInfo(P.sessions.reduce((a,s)=>a+s.dur/3600,0));
        setTimeout(()=>window.socOnLevelUp(info.lvl, info.name), 800);
      }
    }
  })();
  } catch(e) { console.error('saveSession DB error:',e); showToast('Ошибка сохранения сессии','⚠️'); }
  finally { _sessionSaving = false; }
}

// ══ ACHIEVEMENTS ════════════════════════════════════════════
// ── Achievement condition checker ─────────────────────────
function evalAch(def,sessSeconds=0){
  const totalH=P.sessions.reduce((a,s)=>a+s.dur/3600,0);
  const h=new Date().getHours();
  const dow=new Date().getDay(); // 0=Sun,6=Sat
  // best day this week
  const now=Date.now();
  const dayMap={};
  P.sessions.forEach(s=>{
    const _t=sessTs(s);if(!_t)return;
    const d=new Date(_t).toDateString();
    dayMap[d]=(dayMap[d]||0)+s.dur/3600;
  });
  const bestDay=Math.max(...Object.values(dayMap),0);
  const weekDays=new Set(P.sessions.filter(s=>sessTs(s)>now-7*86400000).map(s=>new Date(sessTs(s)).toDateString())).size;
  // sessions today
  const today=new Date().toDateString();
  const sessToday=P.sessions.filter(s=>new Date(sessTs(s)).toDateString()===today).length;

  switch(def.t){
    case 'sessions':    return P.totalSessions>=def.th;
    case 'total_h':     return totalH>=def.th;
    case 'streak':      return (P.streak||0)>=def.th;
    case 'sess_dur':    return sessSeconds>=def.th;
    case 'cat_cnt':     return P.activeCatIds.length>=def.th;
    case 'time_early':  return h<def.th;
    case 'time_late':   return h>=def.th;
    case 'weekend':     return dow===0||dow===6;
    case 'day_hrs':     return bestDay>=def.th;
    case 'week_days':   return weekDays>=def.th;
    case 'sess_day':    return sessToday>=def.th;
    case 'top3':        return false; // async, checked separately
    case 'top1':        return false; // async, checked separately
    case 'league_size': return false; // async
    case 'comeback':    return false; // special logic
    default:            return false;
  }
}

async function checkAchsSB(sessSeconds=0){
  const unlockedIds=new Set(P.achievements.filter(a=>a.unlocked).map(a=>a.id));
  const newly=[];
  for(const def of ACH_DEF){
    if(unlockedIds.has(def.id))continue;
    const earned=evalAch(def,sessSeconds);
    if(earned){
      if(!SB_USER?.isDemoUser){
        await sb.from('user_achievements').upsert({
          user_id:SB_USER.id,achievement_id:def.id,unlocked:true,unlocked_at:new Date().toISOString()
        });
      }
      const ach=P.achievements.find(a=>a.id===def.id);
      if(ach){ach.unlocked=true;ach.unlockedAt=new Date().toLocaleDateString('ru');}
      else P.achievements.push({id:def.id,unlocked:true,unlockedAt:new Date().toLocaleDateString('ru')});
      newly.push(def);
    }
  }
  if(newly.length>0){
    launchConfetti();
    newly.forEach(def=>showAchToast(def));
  }
  return newly;
}

function checkAchsLocal({dur=0}={}){
  const unlockedIds=new Set(P.achievements.filter(a=>a.unlocked).map(a=>a.id));
  const newly=[];
  for(const def of ACH_DEF){
    if(unlockedIds.has(def.id))continue;
    const earned=evalAch(def,dur);
    if(earned){
      const ach=P.achievements.find(a=>a.id===def.id);
      if(ach){ach.unlocked=true;ach.unlockedAt=new Date().toLocaleDateString('ru');}
      else P.achievements.push({id:def.id,unlocked:true,unlockedAt:new Date().toLocaleDateString('ru')});
      newly.push(def);
    }
  }
  return newly;
}

function showAchToast(def){
  // Show individual achievement unlock notification
  const el=document.createElement('div');
  el.style.cssText='position:fixed;bottom:80px;right:20px;background:var(--card);border:0.5px solid '+(def.color||'var(--blue)')+';border-radius:12px;padding:12px 16px;display:flex;align-items:center;gap:12px;z-index:9999;max-width:280px;box-shadow:0 4px 20px rgba(0,0,0,.4);animation:fadeSlide .4s ease';
  el.innerHTML=`<div style="font-size:28px;filter:drop-shadow(0 0 8px ${def.color||'#fff'})">${def.icon}</div><div><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:${def.color||'var(--blue)'}">Награда!</div><div style="font-size:13px;font-weight:600;color:var(--t1);margin-top:2px">${def.name}</div></div>`;
  document.body.appendChild(el);
  setTimeout(()=>el.style.opacity='0',3000);
  setTimeout(()=>el.remove(),3400);
}

// ── Ach progress helper ────────────────────────────────────
function achProgress(def){
  const totalH=P.sessions.reduce((a,s)=>a+s.dur/3600,0);
  const now=Date.now();
  const dayMap={};
  P.sessions.forEach(s=>{const d=new Date(sessTs(s)).toDateString();if(!d||d==='Invalid Date')return;dayMap[d]=(dayMap[d]||0)+s.dur/3600;});
  const bestDay=Math.max(...Object.values(dayMap),0);
  switch(def.t){
    case 'sessions': return {cur:P.totalSessions, max:def.th};
    case 'total_h':  return {cur:Math.round(totalH*10)/10, max:def.th};
    case 'streak':   return {cur:P.streak||0, max:def.th};
    case 'cat_cnt':  return {cur:P.activeCatIds.length, max:def.th};
    case 'day_hrs':  return {cur:Math.round(bestDay*10)/10, max:def.th};
    default:         return null;
  }
}

// ══ TOGGLE CATEGORY ═════════════════════════════════════════
function toggleCatEpic(id){
  // OPTIMISTIC: update UI instantly, sync DB in background
  const idx = P.activeCatIds.indexOf(id);
  if(idx > -1){
    if(P.activeCatIds.length <= 1){ showToast('Нужна хотя бы 1 категория','⚠️'); return; }
    P.activeCatIds.splice(idx, 1);
    if(!SB_USER?.isDemoUser){
      sb.from('user_categories').delete()
        .eq('user_id',SB_USER.id).eq('category_id',id)
        .then(({error}) => {
          if(error){
            P.activeCatIds.splice(idx, 0, id);
            renderAll();
            showToast('Ошибка удаления категории','⚠️');
            console.error('toggleCatEpic delete:', error);
          }
        }, e => {
          P.activeCatIds.splice(idx, 0, id);
          renderAll();
          showToast('Ошибка удаления категории','⚠️');
          console.error('toggleCatEpic delete (network):', e);
        });
    }
    showToast('Убрано из лиг','🗑️');
  } else {
    P.activeCatIds.push(id);
    if(!P.categories.find(c=>c.id===id)){
      const d=ALL_CATS.find(c=>c.id===id);
      if(d) P.categories.push({...d,hours:0});
    }
    if(!SB_USER?.isDemoUser){
      sb.from('user_categories')
        .upsert({user_id:SB_USER.id,category_id:id,hours:P.categories.find(c=>c.id===id)?.hours||0},
                {onConflict:'user_id,category_id'})
        .then(({error}) => {
          if(error){
            P.activeCatIds = P.activeCatIds.filter(x => x !== id);
            renderAll();
            showToast('Ошибка добавления категории','⚠️');
            console.error('toggleCatEpic upsert:', error);
          }
        }, e => {
          P.activeCatIds = P.activeCatIds.filter(x => x !== id);
          renderAll();
          showToast('Ошибка добавления категории','⚠️');
          console.error('toggleCatEpic upsert (network):', e);
        });
    }
    showToast(`${ALL_CATS.find(c=>c.id===id)?.icon} Добавлено в лигу!`,'✅');
  }
  // Инвалидируем только эту категорию, а не весь кеш
  delete lgCache[id]; delete lgCacheTime[id];
  renderManageGrid();
  renderQuickCats();
}

async function toggleCat(id){
  const idx=P.activeCatIds.indexOf(id);
  if(idx>-1){
    if(P.activeCatIds.length<=1){showToast('Нужна хотя бы 1 категория','⚠️');return;}
    P.activeCatIds.splice(idx,1);
    if(!SB_USER?.isDemoUser)await sb.from('user_categories').delete().eq('user_id',SB_USER.id).eq('category_id',id);
    showToast('Убрано из лиг','🗑️');
  } else {
    P.activeCatIds.push(id);
    if(!P.categories.find(c=>c.id===id)){const d=ALL_CATS.find(c=>c.id===id);if(d)P.categories.push({...d,hours:0});}
    if(!SB_USER?.isDemoUser){
      await sb.from('user_categories').upsert({user_id:SB_USER.id,category_id:id,hours:P.categories.find(c=>c.id===id)?.hours||0});
    }
    showToast(`${ALL_CATS.find(c=>c.id===id)?.icon} Добавлено в лигу!`,'✅');
  }
  // Инвалидируем только эту категорию
  delete lgCache[id]; delete lgCacheTime[id];
  renderAll();
}

// ══ HELPERS ═════════════════════════════════════════════════

// ── Security: escape HTML to prevent XSS ─────────────────
function esc(str){
  if(str==null)return'';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#x27;');
}
// Safe for use inside onclick="..." attributes (escapes single quotes)
function escAttr(str){
  if(str==null)return'';
  return String(str).replace(/'/g,"\\'").replace(/"/g,'&quot;');
}

function relDate(d){
  if(!d)return'—';
  const now=new Date();now.setHours(0,0,0,0);
  const t=new Date(d);t.setHours(0,0,0,0);
  const diff=Math.floor((now-t)/86400000);
  if(diff===0)return'сегодня';if(diff===1)return'вчера';
  if(diff<7)return diff+' дн. назад';
  return new Date(d).toLocaleDateString('ru',{day:'2-digit',month:'2-digit'});
}
const fmt=s=>[Math.floor(s/3600),Math.floor((s%3600)/60),s%60].map(x=>String(x).padStart(2,'0')).join(':');
const fmtD=s=>{const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),ss=s%60;if(h>0)return`${h}ч ${m}м`;if(m>0)return`${m}м ${ss}с`;return`${ss}с`;};
// totalHrs считает из P.sessions — все сессии включая убранные лиги
const totalHrs=()=>P.sessions.reduce((a,s)=>a+s.dur/3600,0);

// Безопасное получение timestamp из сессии: предпочитает ts, fallback на isoDate
// Устраняет баг когда created_at=null даёт ts=0 и сессия выпадает из всех фильтров
const sessTs=s=>{
  if(s.ts && s.ts > 0) return s.ts;
  if(s.isoDate){ const t=new Date(s.isoDate).getTime(); if(!isNaN(t)&&t>0) return t; }
  return 0;
};

// Начало текущей календарной недели (Понедельник 00:00:00)
// Неделя сбрасывается каждый Понедельник в 00:00, не "последние 7 дней"
const getWeekStart=()=>{
  const d=new Date();
  d.setHours(0,0,0,0);
  const day=d.getDay(); // 0=Вс, 1=Пн, ..., 6=Сб
  const diff=day===0?6:day-1; // сколько дней прошло с Понедельника
  d.setDate(d.getDate()-diff);
  return d.getTime();
};

// Часы за текущую календарную неделю (Пн 00:00 — Вс 23:59)
const weekHrs=()=>{
  const weekStart=getWeekStart();
  return P.sessions.filter(s=>sessTs(s)>=weekStart).reduce((a,s)=>a+s.dur/3600,0);
};
const activeCats=()=>ALL_CATS.filter(c=>P.activeCatIds.includes(c.id)).map(c=>({...c,hours:P.categories.find(x=>x.id===c.id)?.hours||0}));

// ══ RENDER ALL ═══════════════════════════════════════════════
// ── renderAll с дебаунсом: если вызывается несколько раз подряд —
// выполняется один раз через 16мс (один кадр), не накапливая перерисовки
let _renderAllTimer = null;
function renderAll(){
  if(!P) return;
  if(_renderAllTimer) { clearTimeout(_renderAllTimer); }
  _renderAllTimer = setTimeout(_doRenderAll, 16);
}
function _doRenderAll(){
  _renderAllTimer = null;
  if(!P) return;
  renderNav();renderHeader();renderCats();renderSessions();
  renderAchMini();
  // Полный список наград — только если вкладка активна
  if(document.getElementById('tab-achievements')?.classList.contains('active')) renderAchFull();
  renderQuickCats();renderTotals();
  // Manage grid — только если вкладка активна
  if(document.getElementById('tab-manage')?.classList.contains('active')) renderManageGrid();
  renderDash();
  setTimeout(renderDailyProgress, 100);
  renderLgMini();
  renderXP();renderHeatmap();renderRings();renderRecords();renderForecast();renderMotivation();
  if(typeof renderHeroZone === 'function') renderHeroZone();
  setTimeout(initSoundWidget, 200);
}

function renderNav(){
  const avEl=document.getElementById('navAv');
  if(P.avatarUrl){const cbUrl=P.avatarUrl.startsWith("data:")?P.avatarUrl:(P.avatarUrl);avEl.innerHTML=`<img src="${cbUrl}" style="width:100%;height:100%;border-radius:6px;object-fit:cover" onerror="this.parentNode.textContent='${P.avatar}'">`;}
  else{avEl.textContent=P.avatar;avEl.innerHTML=P.avatar;}
  document.getElementById('navUname').textContent=P.name;
}
function renderHeader(){
  const avEl=document.getElementById('profAv');
  if(P.avatarUrl){
    avEl.innerHTML=`<img src="${P.avatarUrl}" style="width:100%;height:100%;border-radius:10px;object-fit:cover" onerror="this.parentNode.textContent='${P.avatar}'">`;
  } else {
    avEl.textContent=P.avatar;
  }
  document.getElementById('profName').textContent=P.name;
  // Meta items now shown in stat bar — keep minimal join date only
  const mJoined=document.getElementById('mJoined');
  if(mJoined) mJoined.innerHTML=`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="opacity:.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> ${P.joinedDate}`;
  const mAch=document.getElementById('mAch'); if(mAch) mAch.style.display='none';
  const mSess=document.getElementById('mSess'); if(mSess) mSess.style.display='none';
  const mStreak=document.getElementById('mStreak'); if(mStreak) mStreak.style.display='none';
  // Apply level info
  const th=totalHrs();
  const info=getLevelInfo(th);
  const titleEl=document.getElementById('profTitle');
  if(titleEl){
    titleEl.textContent=`Ур. ${info.lvl} · ${info.name}`;
    const tc = info.color.includes('gradient') ? 'var(--gold)' : info.color;
    titleEl.style.color = tc;
    titleEl.style.borderColor = tc.replace(')',',0.5)').replace('var(--gold)','rgba(245,200,66,.5)');
    titleEl.style.background = 'transparent';
    titleEl.style.boxShadow = 'none';
  }
  // Update stat bar — set values immediately (no flicker) then animate
  const _thRaw = totalHrs();
  const _th = _thRaw < 10 ? _thRaw.toFixed(1) : Math.round(_thRaw).toString();
  const _ss = P.totalSessions || 0;
  const _ac = P.achievements ? P.achievements.filter(a=>a.unlocked).length : 0;
  const _st = P.streak || 0; // стрик — дни подряд без перерыва
  const statTH=document.getElementById('statTotalHrs');
  const statSS=document.getElementById('statSessions');
  const statAC=document.getElementById('statAchs');
  const statST=document.getElementById('statStreak');
  // Write immediately so user sees real values even if animation doesn't fire
  if(statTH) statTH.textContent = _th;
  if(statSS) statSS.textContent = _ss;
  if(statAC) statAC.textContent = _ac;
  if(statST) statST.textContent = _st;
  // Then animate with odometer
  setTimeout(()=>{ if(typeof animStatBar==='function') animStatBar(); }, 120);
  // Apply cover frame
  const cover=document.getElementById('phCover');
  if(cover&&info.frame){
    cover.style.background=info.frame;
    // Add shimmer overlay for high levels
    if(info.lvl>=10){
      cover.style.boxShadow=`inset 0 0 40px ${info.color.includes('gradient')?'rgba(245,200,66,.15)':info.color+'22'}`;
    }
  }
  // Level-based avatar border glow
  if(avEl&&info.lvl>=6){
    avEl.style.border=`2.5px solid ${info.color.includes('gradient')?'var(--gold)':info.color}`;
    avEl.style.boxShadow=`0 0 16px ${info.color.includes('gradient')?'rgba(245,200,66,.4)':info.color+'66'}`;
  }
}

// Анимация цифр в стат-баре профиля (запускается через 120мс после прямого присвоения)
function animStatBar(){
  const thRaw = totalHrs();
  const thTarget = thRaw < 10 ? parseFloat(thRaw.toFixed(1)) : Math.round(thRaw);
  const pairs=[
    {id:'statTotalHrs', val:thTarget, isFloat: thRaw < 10},
    {id:'statSessions',  val:P.totalSessions||0, isFloat:false},
    {id:'statAchs',      val:P.achievements ? P.achievements.filter(a=>a.unlocked).length : 0, isFloat:false},
    {id:'statStreak',    val:P.streak||0, isFloat:false},
  ];
  pairs.forEach(({id,val,isFloat})=>{
    const el=document.getElementById(id);
    if(!el) return;
    const from=parseFloat(el.textContent)||0;
    if(Math.abs(from-val)<0.05) return; // уже актуально — не мигаем
    const dur=600, start=performance.now();
    (function step(now){
      const p=Math.min((now-start)/dur,1);
      const ease=1-Math.pow(1-p,3);
      const cur=from+(val-from)*ease;
      el.textContent=isFloat ? cur.toFixed(1) : Math.round(cur);
      if(p<1) requestAnimationFrame(step);
      else el.textContent=isFloat ? val.toFixed(1) : val;
    })(performance.now());
  });
}

function renderTotals(){
  const totEl=document.getElementById('totDisp');
  const newVal=totalHrs();
  // Показываем 1 знак после запятой для < 10ч — иначе 0.8 → 1 (неправильно)
  const displayVal = newVal < 10 ? newVal : Math.round(newVal);
  if(totEl) totEl.textContent = newVal < 10 ? newVal.toFixed(1) : Math.round(newVal);
  if(totEl){
    animCount(totEl, displayVal, 1200);
    totEl.classList.remove('updated');
    void totEl.offsetWidth;
    totEl.classList.add('updated');
  }
  document.getElementById('streakDisp').textContent=`🔥 ${P.streak} дней подряд`;
  // Показываем общее число активных дней отдельно от дисциплины
  const activeDaysEl=document.getElementById('activeDaysDisp');
  if(activeDaysEl) activeDaysEl.innerHTML=`<span style="display:inline-flex;align-items:center;gap:4px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> ${P.totalActiveDays||0} активных дней всего</span>`;
  const _ws2=new Date(getWeekStart());
  const _we2=new Date(getWeekStart()+6*86400000);
  const _wLabel=`${_ws2.getDate()}–${_we2.getDate()} ${_we2.toLocaleDateString('ru',{month:'short'}).replace(' г.','')}`;
  document.getElementById('weekDisp').textContent=`↑ +${weekHrs().toFixed(1)} ч (${_wLabel})`;

  // ── Hero zone — те же данные, те же функции ──
  const todayStart = new Date(); todayStart.setHours(0,0,0,0);
  const todayH = P.sessions
    .filter(s => sessTs(s) >= todayStart.getTime())
    .reduce((a,s) => a + s.dur/3600, 0);
  const weekH  = weekHrs();
  const totalH = totalHrs();
  const MSGS = [
    [4,   'Невероятная продуктивность!', 'var(--gold)'],
    [2,   'Два часа — выше среднего.',   'var(--gold)'],
    [1,   'Уже час. Отличный ритм.',     'var(--green)'],
    [0.5, 'Хорошее начало!',             'var(--green)'],
    [0,   'Начни первую сессию дня',     'var(--t2)'],
  ];
  const [,msg,msgColor] = MSGS.find(([h]) => todayH >= h) || MSGS[MSGS.length-1];
  const hEl = document.getElementById('heroTodayHrs');
  const mEl = document.getElementById('heroTodayMsg');
  const sEl = document.getElementById('heroStreakVal');
  const wEl = document.getElementById('heroWeekHrs');
  const tEl = document.getElementById('heroTotalHrs');
  if(hEl){ hEl.textContent = todayH.toFixed(1); hEl.style.color = todayH>0?'var(--gold)':'var(--t1)'; }
  if(sEl)  sEl.textContent = P.streak || 0;
  if(wEl)  wEl.textContent = weekH.toFixed(1);
  if(tEl)  tEl.textContent = totalH < 10 ? totalH.toFixed(1) : Math.round(totalH).toString();
  if(mEl){ mEl.textContent = msg; mEl.style.color = msgColor; }
}

// ══ DASHBOARD ════════════════════════════════════════════════
function setPeriod(p){
  dashPeriod=p;
  document.querySelectorAll('.seg-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById(p==='week'?'dpW':'dpM').classList.add('active');
  // Update tumbler indicator
  const ctrl=document.getElementById('periodCtrl');
  if(ctrl) ctrl.setAttribute('data-p', p);
  renderDash();
}
function getDashData(){
  const isWeek=dashPeriod==='week';
  const now=Date.now();

  if(isWeek){
    // Календарная неделя: 7 бакетов = Пн Вт Ср Чт Пт Сб Вс
    const weekStart=getWeekStart(); // Пн 00:00
    const buckets=7;
    const data={};ALL_CATS.forEach(c=>{data[c.id]=Array(buckets).fill(0);});
    P.sessions.forEach(s=>{
      const t=sessTs(s);
      if(!t||isNaN(t)||t<weekStart) return; // только сессии этой недели
      const dayOfWeek=Math.floor((t-weekStart)/86400000); // 0=Пн, 1=Вт... 6=Вс
      if(dayOfWeek>=0&&dayOfWeek<7&&data[s.cat]!==undefined)
        data[s.cat][dayOfWeek]+=s.dur/3600;
    });
    return{data,buckets,isWeek,weekStart};
  } else {
    // Месяц: скользящие 30 дней (остаётся как было)
    const buckets=30;
    const data={};ALL_CATS.forEach(c=>{data[c.id]=Array(buckets).fill(0);});
    P.sessions.forEach(s=>{
      const t=sessTs(s);
      if(!t||isNaN(t)) return;
      const age=Math.floor((now-t)/86400000);
      if(age>=0&&age<buckets&&data[s.cat]!==undefined)data[s.cat][buckets-1-age]+=s.dur/3600;
    });
    return{data,buckets,isWeek};
  }
}
function renderDash(){
  try{
  const{data,buckets,isWeek,weekStart}=getDashData();
  renderCatFilter();
  const allCats=activeCats();
  const active=dashCatFilter?allCats.filter(c=>c.id===dashCatFilter):allCats;
  const catCount=active.length;
  const DAYS=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  const now=Date.now();
  // Для недели: фиксированные метки Пн-Вс (бакет 0=Пн, ..., 6=Вс)
  // Для месяца: даты скользящих 30 дней
  const labels=isWeek
    ? DAYS  // ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']
    : Array.from({length:buckets},(_,i)=>{
        const d=new Date(now-(buckets-1-i)*86400000);
        return i%5===0?`${d.getDate()}/${d.getMonth()+1}`:'';
      });
  const totals=Array(buckets).fill(0);
  // Для графика и KPI — все лиги включая убранные (или только выбранная если фильтр)
  const statsSource = dashCatFilter ? [dashCatFilter] : ALL_CATS.map(c=>c.id);
  statsSource.forEach(id=>{if(data[id])data[id].forEach((v,i)=>totals[i]+=v);});
  const maxVal=Math.max(...totals,0.1);
  const periodHrs=statsSource.reduce((a,id)=>a+(data[id]?data[id].reduce((x,v)=>x+v,0):0),0);
  const avgPerDay=isWeek?(periodHrs/7):(periodHrs/buckets);
  const bestDay=Math.max(...totals);
  const activeDays=totals.filter(v=>v>0).length;
  // Прошлый период — тоже все лиги
  const prevPeriodStart=isWeek?(getWeekStart()-7*86400000):(Date.now()-buckets*2*86400000);
  const prevPeriodEnd=isWeek?getWeekStart():(Date.now()-buckets*86400000);
  const prevPeriodHrs=P.sessions.filter(s=>{
    const t=sessTs(s);
    return t>=prevPeriodStart&&t<prevPeriodEnd&&(!dashCatFilter||s.cat===dashCatFilter);
  }).reduce((a,s)=>a+s.dur/3600,0);
  const deltaRaw=prevPeriodHrs>0?((periodHrs-prevPeriodHrs)/prevPeriodHrs*100):periodHrs>0?100:0;
  const delta=deltaRaw.toFixed(0);
  const totalAllTime=P.sessions.reduce((a,s)=>a+s.dur/3600,0);
  const goalPct=Math.min(100,Math.round((periodHrs/(isWeek?14:60))*100));

  const dashTitleEl=document.getElementById('dashTitle');
  if(dashTitleEl){
    let titleStr;
    if(isWeek){
      // Показываем диапазон: "Неделя · 24–30 мар"
      const ws=new Date(getWeekStart());
      const we=new Date(getWeekStart()+6*86400000);
      const fmtShort=d=>d.toLocaleDateString('ru',{day:'numeric',month:'short'}).replace(' г.','');
      titleStr=`Неделя · ${ws.getDate()}–${fmtShort(we)}`;
    } else {
      const d30=new Date(Date.now()-29*86400000);
      titleStr=`Месяц · ${d30.toLocaleDateString('ru',{day:'numeric',month:'short'}).replace(' г.','')}–сегодня`;
    }
    dashTitleEl.innerHTML=`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="opacity:.6"><rect x="2" y="2" width="9" height="9" rx="2"/><rect x="13" y="2" width="9" height="9" rx="2"/><rect x="2" y="13" width="9" height="9" rx="2"/><rect x="13" y="13" width="9" height="9" rx="2"/></svg>${titleStr}`;
  }
  const setSec=(id,lbl,svgIcon)=>{const el=document.getElementById(id);if(el)el.innerHTML=`<span style="display:inline-flex;align-items:center;color:var(--gold);opacity:.7">${svgIcon}</span>${lbl}`;};
  setSec('sec_by_cat','ПО КАТЕГОРИЯМ',`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`);
  setSec('sec_kpi','КЛЮЧЕВЫЕ ПОКАЗАТЕЛИ',`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`);
  setSec('sec_records','ЛИЧНЫЕ РЕКОРДЫ',`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`);

  // ── PREMIUM KPI ROW ──
  const kpiEl=document.getElementById('kpiRow');
  kpiEl.style.gridTemplateColumns='repeat(4,1fr)';

  const makeRing=(pct,color,size=56)=>""; // removed for performance

  const kpis=[
    {val:periodHrs.toFixed(1),unit:'ч',lbl:isWeek?'За неделю':'За месяц',
     sub:deltaRaw>=0?`↑ +${delta}% к прошлому`:`↓ ${Math.abs(delta)}% к прошлому`,
     subc:deltaRaw>=0?'var(--green)':'var(--red)',
     color:'var(--gold)',ring:Math.min(100,Math.round(periodHrs/(isWeek?14:60)*100))},
    {val:avgPerDay.toFixed(1),unit:'ч',lbl:'В день',
     sub:'Средний темп',subc:'var(--t3)',
     color:'var(--blue)',ring:Math.min(100,Math.round(avgPerDay/4*100))},
    {val:activeDays,unit:'',lbl:'Активных дней',
     sub:`из ${buckets} дней`,subc:activeDays>=Math.ceil(buckets*.7)?'var(--green)':'var(--orange)',
     color:'var(--green)',ring:Math.round(activeDays/buckets*100)},
    {val:bestDay.toFixed(1),unit:'ч',lbl:'Лучший день',
     sub:'Личный рекорд',subc:'var(--t3)',
     color:'var(--purple)',ring:Math.min(100,Math.round(bestDay/8*100))},
  ];
  // Sparkline: 7 баров = Пн Вт Ср Чт Пт Сб Вс текущей недели
  const _ws=getWeekStart();
  const spark7=Array.from({length:7},(_,i)=>{
    const dayStart=_ws+i*86400000;
    const dayEnd=dayStart+86400000;
    return P.sessions.filter(s=>{const t=sessTs(s);return t>=dayStart&&t<dayEnd;})
      .reduce((a,s)=>a+s.dur/3600,0);
  });
  const sparkMax=Math.max(...spark7,0.1);

  kpiEl.innerHTML = kpis.map((k, i) => {
    // Sparkline only for first card
    const sparkHtml = i === 0 ? `
      <div class="kpi-sparkline" style="margin-top:10px">
        ${spark7.map((v, j) => `
          <div class="kpi-spark-bar ${j === 6 ? 'today' : ''}"
            style="height:${Math.max(8, Math.round((v / sparkMax) * 100))}%;background:${k.color};opacity:${j === 6 ? 1 : 0.35 + j * 0.09}">
          </div>`).join('')}
      </div>` : '';

    return `
      <div class="kpi" style="--kpi-c:${k.color}">
        <div>
          <div style="
            font-size:9.5px;
            font-weight:700;
            letter-spacing:.09em;
            text-transform:uppercase;
            color:var(--t2);
            margin-bottom:9px;
            font-family:'DM Sans',sans-serif;
            display:flex;
            align-items:center;
            gap:6px">
            <div style="
              width:6px;height:6px;
              border-radius:50%;
              background:${k.color};
              opacity:.8;
              flex-shrink:0">
            </div>
            ${k.lbl}
          </div>
          <div style="
            display:flex;
            align-items:baseline;
            gap:3px;
            margin-bottom:6px">
            <span style="
              font-family:'DM Mono',monospace;
              font-size:28px;
              font-weight:400;
              line-height:1;
              letter-spacing:-.03em;
              color:var(--t1)">
              ${k.val}
            </span>
            <span style="
              font-family:'DM Mono',monospace;
              font-size:13px;
              font-weight:400;
              color:var(--t2);
              letter-spacing:-.01em">
              ${k.unit}
            </span>
          </div>
          <div style="
            font-size:11px;
            font-weight:500;
            letter-spacing:-.005em;
            color:${k.subc};
            font-family:'DM Sans',sans-serif">
            ${k.sub}
          </div>
        </div>
        ${sparkHtml}
      </div>`;
  }).join('');

  // ── CHART ──
  const legendCats = ALL_CATS.filter(c => data[c.id] && data[c.id].some(v=>v>0));
  const showEvery = isWeek ? 1 : Math.ceil(buckets / 10);
  document.getElementById('chartLegend').innerHTML = legendCats.map(c=>
    `<div class="cl-item" style="cursor:pointer;opacity:${(!dashCatFilter||dashCatFilter===c.id)?1:.35};transition:opacity .2s"
      onclick="dashCatFilter=dashCatFilter===\\'${c.id}\\'?null:\\'${c.id}\\';renderDash()">
      <div class="cl-dot" style="background:${c.color}"></div>${c.name}</div>`
  ).join('');

  // Build bar chart — stacked vertical bars per bucket
  const barEl = document.getElementById('barChart');
  const bW = barEl.clientWidth || 600;
  const svgH = 160, padT = 8, padB = 32, padL = 36, padR = 8;
  const plotW = bW - padL - padR, plotH = svgH - padT - padB;
  const barGap = isWeek ? 8 : 3;
  const barW = Math.max(4, plotW / buckets - barGap);

  // Cats to show in bars
  const barCats = dashCatFilter
    ? legendCats.filter(c => c.id === dashCatFilter)
    : legendCats;

  // Build stacked segments per bucket
  const segments = Array.from({length: buckets}, (_, i) => {
    let bottom = 0;
    return barCats.map(c => {
      const v = data[c.id] ? data[c.id][i] : 0;
      const seg = { cat: c.id, color: c.color, name: c.name, val: v, bottom, top: bottom + v };
      bottom += v;
      return seg;
    });
  });

  // Y grid values
  const yTicks = maxVal <= 0 ? [0] : [0.25, 0.5, 0.75, 1].map(t => +(maxVal * t).toFixed(2));

  function yPx(v) { return padT + plotH - (maxVal > 0 ? (v / maxVal) * plotH : 0); }
  function xPx(i) { return padL + i * (plotW / buckets) + (plotW / buckets - barW) / 2; }

  // Tooltip HTML (positioned absolutely over chart)
  const tooltipId = 'dChart_tip';

  let barsHTML = '';

  // Grid lines
  yTicks.forEach(v => {
    const y = yPx(v).toFixed(1);
    barsHTML += `<line x1="${padL}" y1="${y}" x2="${bW - padR}" y2="${y}"
      stroke="rgba(255,255,255,.06)" stroke-width=".8" stroke-dasharray="3 4"/>
      <text x="${(padL-5).toFixed(0)}" y="${(+y+3).toFixed(0)}" text-anchor="end"
        font-size="9" fill="rgba(255,255,255,.3)" font-family="DM Mono,monospace">${v < 1 ? v.toFixed(1) : v.toFixed(v < 5 ? 1 : 0)}</text>`;
  });

  // ── Human-readable hour formatter ──────────────────────────
  // 0.50 → "30 мин"   1.00 → "1 ч"   1.75 → "1 ч 45 мин"
  function fmtH(h) {
    const totalMin = Math.round(h * 60);
    const hrs = Math.floor(totalMin / 60);
    const min = totalMin % 60;
    if (hrs === 0) return `${min} мин`;
    if (min === 0) return `${hrs} ч`;
    return `${hrs} ч ${min} мин`;
  }

  // Bars
  segments.forEach((segs, i) => {
    const x = xPx(i).toFixed(1);
    const totalVal = segs.reduce((a, s) => a + s.val, 0);
    const tipData = barCats.map(c => {
      const v = data[c.id] ? data[c.id][i] : 0;
      return v > 0 ? `${c.name}: ${fmtH(v)}` : '';
    }).filter(Boolean).join('&#10;');
    const labelDay = labels[i] || '';

    // Draw each segment
    segs.forEach(seg => {
      if (seg.val <= 0) return;
      const y1 = yPx(seg.top).toFixed(1);
      const y2 = yPx(seg.bottom).toFixed(1);
      const h = Math.max(2, +y2 - +y1);
      const isTop = seg.top >= totalVal - 0.001;
      const rx = isTop ? Math.min(4, barW / 2) : 0;
      barsHTML += `<rect x="${x}" y="${y1}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}"
        fill="${seg.color}" opacity="0.85" rx="${rx}" ry="${rx}"/>`;
    });

    // Hover overlay — only show tooltip when there is actual data
    const hoverHandlers = totalVal > 0
      ? `onmouseenter="showDashTip(event,\`${tipData}\`,\`${fmtH(totalVal)}\`,\`${labelDay}\`)" onmouseleave="hideDashTip()" onclick="showDashTip(event,\`${tipData}\`,\`${fmtH(totalVal)}\`,\`${labelDay}\`)"`
      : `onmouseleave="hideDashTip()"`;
    barsHTML += `<rect x="${x}" y="${padT}" width="${barW.toFixed(1)}" height="${plotH}"
      fill="transparent" rx="3" style="cursor:${totalVal > 0 ? 'pointer' : 'default'}"
      ${hoverHandlers}/>`;


    // Highlight current day/bucket
    const isToday = isWeek && i === new Date().getDay() - 1;
    if (isToday) {
      barsHTML += `<rect x="${(+x - 2).toFixed(1)}" y="${padT}" width="${(barW + 4).toFixed(1)}" height="${plotH}"
        fill="rgba(255,255,255,.04)" rx="3" stroke="rgba(255,255,255,.08)" stroke-width=".8" pointer-events="none"/>`;
    }
  });

  // X-axis labels
  Array.from({length: buckets}, (_, i) => {
    if (i % showEvery !== 0) return;
    const x = (xPx(i) + barW / 2).toFixed(1);
    const isToday = isWeek && i === new Date().getDay() - 1;
    barsHTML += `<text x="${x}" y="${(svgH - 6).toFixed(0)}" text-anchor="middle"
      font-size="10" fill="${isToday ? 'rgba(245,200,66,.9)' : 'rgba(255,255,255,.4)'}"
      font-family="DM Sans,sans-serif" font-weight="${isToday ? 600 : 400}">${labels[i]}</text>`;
  });

  // X axis baseline
  barsHTML += `<line x1="${padL}" y1="${(padT + plotH).toFixed(1)}" x2="${bW - padR}" y2="${(padT + plotH).toFixed(1)}"
    stroke="rgba(255,255,255,.1)" stroke-width="1"/>`;

  const svgEl = `<div style="position:relative">
    <svg width="${bW}" height="${svgH}" xmlns="http://www.w3.org/2000/svg"
      style="display:block;width:100%;overflow:visible">
      ${barsHTML}
    </svg>
    <div id="${tooltipId}" style="display:none;position:absolute;pointer-events:none;z-index:99;
      background:rgba(15,15,18,.95);border:0.5px solid rgba(255,255,255,.15);border-radius:10px;
      padding:10px 13px;box-shadow:0 8px 32px rgba(0,0,0,.6);min-width:130px;max-width:200px;
      font-family:'DM Sans',sans-serif;transition:opacity .1s"></div>
  </div>`;

  barEl.style.display = 'block';
  barEl.innerHTML = svgEl;
  document.getElementById('barAxisL').textContent = '';
  document.getElementById('barAxisR').textContent = '';

  // Inject tooltip functions if not present
  if (!window.showDashTip) {
    window.showDashTip = function(e, lines, total, label) {
      const tip = document.getElementById(tooltipId);
      if (!tip) return;
      const rows = lines ? lines.split('\n').filter(Boolean) : [];
      tip.innerHTML = `
        ${label ? `<div style="font-size:11px;font-weight:700;color:rgba(255,255,255,.5);letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">${label}</div>` : ''}
        ${rows.map(r => {
          const [name, val] = r.split(': ');
          return `<div style="display:flex;justify-content:space-between;gap:16px;font-size:12px;padding:2px 0">
            <span style="color:rgba(255,255,255,.65)">${name}</span>
            <span style="font-family:'DM Mono',monospace;color:var(--t1);font-weight:500">${val}</span>
          </div>`;
        }).join('')}
        ${total ? `<div style="border-top:0.5px solid rgba(255,255,255,.1);margin-top:6px;padding-top:6px;
          display:flex;justify-content:space-between;gap:16px;font-size:12px">
          <span style="color:rgba(255,255,255,.5)">Итого</span>
          <span style="font-family:'DM Mono',monospace;color:var(--gold);font-weight:600">${total}</span>
        </div>` : ''}
      `;
      tip.style.display = 'block';
      const rect = e.currentTarget.closest('div').getBoundingClientRect();
      const svgRect = e.currentTarget.closest('svg').getBoundingClientRect();
      let left = e.clientX - svgRect.left + 12;
      const tipW = 160;
      if (left + tipW > svgRect.width) left = e.clientX - svgRect.left - tipW - 12;
      tip.style.left = left + 'px';
      tip.style.top = (e.clientY - svgRect.top - 10) + 'px';
    };
    window.hideDashTip = function() {
      const tip = document.getElementById(tooltipId);
      if (tip) tip.style.display = 'none';
    };
  }

  // ── CATEGORY BREAKDOWN with mini rings ──
  const maxCatH=Math.max(...active.map(c=>data[c.id].reduce((a,v)=>a+v,0)),0.1);
  let catCols=catCount<=1?1:catCount===2?2:catCount===3?3:catCount===4?4:catCount<=6?3:4;
  const catEl=document.getElementById('catBreakdown');
  catEl.style.display='grid';
  catEl.style.gridTemplateColumns=`repeat(${catCols},1fr)`;
  catEl.style.gap='8px';

  catEl.innerHTML=active.map((c,idx)=>{
    const catH=data[c.id].reduce((a,v)=>a+v,0);
    const pct=Math.min(100,Math.round((catH/maxCatH)*100));
    // Считаем сессии за выбранный период (для недели — с Пн 00:00, для месяца — скользящие 30 дней)
    const cut=isWeek ? getWeekStart() : Date.now()-30*86400000;
    const sessCount=P.sessions.filter(s=>{
      const t=sessTs(s);
      return s.cat===c.id && t>=cut;
    }).length;
    // Отображаем всего с 1 знаком после запятой — toFixed(0) округляет 0.5→"1" и 0.3→"0" (БАГИ)
    const totalHrsLabel = c.hours < 10 ? c.hours.toFixed(1) : Math.round(c.hours).toString();
    const periodLabel = isWeek ? 'за неделю' : 'за месяц';
    return `<div style="background:var(--card);border:0.5px solid rgba(255,255,255,.08);border-left:3px solid ${c.color};border-radius:14px;padding:16px;position:relative;overflow:hidden">
      <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${c.color}44,transparent)"></div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px">
        ${catIconBox(c.id, c.color, 42)}
        <div style="flex:1;min-width:0">
          <div style="font-size:10px;font-weight:800;color:${c.color};text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">${c.name}</div>
          <div style="font-family:'DM Mono',monospace;font-size:24px;font-weight:400;line-height:1;color:var(--t1)">${catH.toFixed(1)}<span style="font-size:12px;color:var(--t3);font-family:sans-serif;margin-left:2px"> ч</span></div>
          <div style="font-size:10px;color:var(--t3);margin-top:2px">${periodLabel}</div>
        </div>
      </div>
      <div style="height:2px;background:rgba(255,255,255,.05);border-radius:2px;overflow:hidden;margin-bottom:10px">
        <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,${c.color}88,${c.color});border-radius:2px;box-shadow:0 0 8px ${c.color};transition:width 1.2s cubic-bezier(.4,0,.2,1)"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:10px;color:var(--t3);display:flex;align-items:center;gap:4px"><span style="color:${c.color};font-weight:700">${sessCount}</span> сессий</span>
        <span style="font-size:10px;color:var(--t3)">всего <span style="color:var(--t2);font-weight:600">${totalHrsLabel} ч</span></span>
      </div>
    </div>`;
  }).join('');

  const catRemainder=catCount%catCols;
  if(catRemainder!==0){
    const needed=catCols-catRemainder;
    catEl.innerHTML+=Array(needed).fill('<div style="visibility:hidden;pointer-events:none"></div>').join('');
  }

  // ── INSIGHTS ──
  const bestCat=active.slice().sort((a,b)=>data[b.id].reduce((s,v)=>s+v,0)-data[a.id].reduce((s,v)=>s+v,0))[0];

  // ── Goal achievement ─────────────────────────────────────────
  const _goalH = dailyGoalHours;
  const _bucketMs = 86400000;
  const _periodStart = isWeek ? weekStart : (Date.now() - (buckets - 1) * _bucketMs);
  let _goalDays = 0, _goalSum = 0;
  for (let d = 0; d < buckets; d++) {
    const dayStart = _periodStart + d * _bucketMs;
    const dayEnd = dayStart + _bucketMs;
    const dayH = P.sessions.filter(s => { const t=sessTs(s); return t>=dayStart && t<dayEnd; })
      .reduce((a,s) => a + s.dur/3600, 0);
    if (dayH > 0) { _goalSum += Math.min(dayH / _goalH, 1); _goalDays++; }
  }
  const avgGoalPct = _goalDays > 0 ? Math.round(_goalSum / _goalDays * 100) : 0;
  const goalColor  = avgGoalPct >= 80 ? 'var(--green)' : avgGoalPct >= 50 ? 'var(--gold)' : 'var(--orange)';

  // ── Best category stats ──────────────────────────────────────
  const bestCatH   = bestCat ? data[bestCat.id].reduce((a,v) => a+v, 0) : 0;
  const bestCatPct = bestCat ? Math.min(100, Math.round(bestCatH / Math.max(bestCat.hours, 0.1) * 100)) : 0;
  // ── INSIGHT CARDS — unified Apple template ──────────────────
  const insightEl=document.getElementById('insightRow');

  // SVG icons for insights
  const svgTarget = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`;
  const svgBook   = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
  const svgFlame  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;

  // Card builder — all params explicit, no inline guesswork
  const insCard = ({color, rgb, icon, label, val, unit='', sub='', barPct=null}) => {
    const barHtml = barPct !== null ? `
      <div class="insight-bar-wrap">
        <div class="insight-bar-fill" style="width:${barPct}%"></div>
      </div>` : '';
    return `
      <div class="insight" style="--ins-c:${color};--ins-rgb:${rgb}">
        <div class="insight-head">
          <div class="insight-icon-box">${icon}</div>
          <div class="insight-lbl">${label}</div>
        </div>
        <div class="insight-val-row">
          <span class="insight-val">${val}</span>
          ${unit ? `<span class="insight-unit">${unit}</span>` : ''}
        </div>
        ${sub ? `<div class="insight-sub">${sub}</div>` : ''}
        ${barHtml}
      </div>`;
  };

  // Determine goal status text (no emoji)
  const goalStatusText = avgGoalPct >= 100 ? 'Цель выполнена' :
                         avgGoalPct >= 80  ? 'Близко к цели' :
                         avgGoalPct >= 50  ? 'В процессе'    : 'Нужно больше';
  const goalPlanText = `план ${_goalH>=1?_goalH+'ч':Math.round(_goalH*60)+'мин'}/день`;

  // Best cat SVG (use category icon if available, else fallback book)
  const bestCatSvg = bestCat ? (ICONS[bestCat.id] || svgBook) : svgBook;
  const bestCatColor = bestCat?.color || 'var(--green)';
  const bestCatRgb   = bestCat ? '34,197,94' : '34,197,94';

  insightEl.innerHTML =
    insCard({
      color: goalColor,
      rgb: avgGoalPct >= 80 ? '34,197,94' : avgGoalPct >= 50 ? '245,192,48' : '249,115,22',
      icon: svgTarget,
      label: 'Достижение цели',
      val: avgGoalPct,
      unit: '%',
      sub: `${goalStatusText} · ${goalPlanText}`,
      barPct: avgGoalPct,
    }) +
    insCard({
      color: bestCatColor,
      rgb: '34,197,94',
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${bestCat ? (bestCat.id==='read'?'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>':bestCat.id==='lang'?'<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>':bestCat.id==='code'?'<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>':bestCat.id==='trading'?'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>':'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>') : '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'}</svg>`,
      label: bestCat ? bestCat.name : 'Топ категория',
      val: bestCatH.toFixed(1),
      unit: 'ч',
      sub: isWeek ? 'За неделю' : 'За месяц',
      barPct: bestCatPct,
    }) +
    insCard({
      color: 'var(--orange)',
      rgb: '249,115,22',
      icon: svgFlame,
      label: 'Дисциплина',
      val: P.streak,
      unit: '',
      sub: P.streak === 1 ? '1 день подряд' :
           P.streak <= 4 ? `${P.streak} дня подряд` : `${P.streak} дней подряд`,
    });
  }catch(e){console.error('renderDash:',e);}
}


// ══ CATS ════════════════════════════════════════════════════
function renderCats(){
  const max=Math.max(...P.categories.map(c=>c.hours),1);
  const el=document.getElementById('catList');if(!el)return;
  el.innerHTML=P.categories.filter(c=>P.activeCatIds.includes(c.id)).map(c=>{
    const last=P.sessions.find(s=>s.cat===c.id);
    return `<div class="cat-item" onclick="selCat('${c.id}')">
      <div class="ci-box" style="background:${c.color}20">${c.icon}</div>
      <div class="ci-info">
        <div class="ci-name">${c.name}</div>
        <div class="ci-sub">Последний: ${last?last.date:'никогда'}</div>
        <div class="ci-bar-wr"><div class="ci-bar" style="width:${Math.min(100,(c.hours/max)*100)}%;background:${c.color}"></div></div>
      </div>
      <div class="ci-hrs" style="color:${c.color}">${c.hours.toLocaleString('ru',{maximumFractionDigits:1})}<small>ЧАСОВ</small></div>
    </div>`;
  }).join('');
}

// ══ SESSIONS ════════════════════════════════════════════════
let _sessFilter = 'today';

function setSessionFilter(filter, btn) {
  _sessFilter = filter;
  // Update buttons
  document.querySelectorAll('.sfb').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  // Update title
  const titles = { today:'Сегодня', yesterday:'Вчера', week:'Эта неделя', all:'Все сессии' };
  const titleEl = document.getElementById('sessFilterTitle');
  if (titleEl) titleEl.textContent = titles[filter] || 'Сессии';
  renderSessions(true);
}

function renderSessions(all=false){
  if(P&&P.sessions) P.sessions.forEach(s=>{if(s.isoDate) s.date=relDate(s.isoDate);});
  const el=document.getElementById(all?'allSessList':'sessList');
  if(!el)return;

  // ── SIDEBAR MINI LIST ──
  if(!all){
    const list=P.sessions.slice(0,5);
    el.innerHTML=list.length?list.map(s=>{
      const c=s.color||'var(--blue)';
      return `<div style="display:flex;align-items:center;gap:10px;padding:10px 13px;border-radius:13px;margin-bottom:4px;background:linear-gradient(90deg,${c}0d,var(--card));border:0.5px solid ${c}22;transition:transform .18s cubic-bezier(.34,1.4,.64,1),border-color .15s" onmouseover="this.style.transform='translateX(4px)';this.style.borderColor='${c}55'" onmouseout="this.style.transform='';this.style.borderColor='${c}22'">
        <div style="width:3px;height:38px;border-radius:2px;background:${c};box-shadow:0 0 8px ${c}88;flex-shrink:0"></div>
        ${catIconBox(s.cat||'read',c,36)}
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:700;color:var(--t1);line-height:1.35;word-break:break-word">${s.name}</div>
          <div style="font-size:10px;color:var(--t3);margin-top:2px">${s.date}</div>
        </div>
        <div style="font-family:'DM Mono',monospace;font-size:15px;font-weight:400;color:${c};flex-shrink:0;white-space:nowrap;padding-left:8px;letter-spacing:-.02em">${fmtD(s.dur)}</div>
      </div>`;
    }).join(''):`<div class="empty" style="padding:16px"><div style="font-size:24px;margin-bottom:6px">⏱</div>Нет сессий</div>`;
    return;
  }

  // ── ALL SESSIONS — filtered + grouped ─────────────────────────
  const now = new Date(); now.setHours(0,0,0,0);
  const todayMs = now.getTime();
  const weekStart = getWeekStart ? getWeekStart() : (todayMs - 6*86400000);

  function sessInFilter(s){
    const t = sessTs(s);
    if(!t) return false;
    const d = new Date(t); d.setHours(0,0,0,0);
    const dMs = d.getTime();
    if(_sessFilter === 'today')     return dMs === todayMs;
    if(_sessFilter === 'yesterday') return dMs === todayMs - 86400000;
    if(_sessFilter === 'week')      return t >= weekStart;
    return true; // 'all'
  }

  const list = P.sessions.filter(sessInFilter);
  const cnt = document.getElementById('allSessCnt');
  if(cnt) cnt.textContent = list.length + ' сессий';

  if(!list.length){
    const labels = {today:'сегодня',yesterday:'вчера',week:'на этой неделе',all:''};
    el.innerHTML=`<div style="padding:40px 20px;text-align:center;color:var(--t3)"><div style="font-size:32px;margin-bottom:12px">📭</div><div style="font-size:14px;font-weight:600;color:var(--t2);margin-bottom:4px">Нет сессий ${labels[_sessFilter]||''}</div><div style="font-size:12px">Начни первую сессию чтобы увидеть историю</div></div>`;
    return;
  }

  // Group by date label
  const groups=[];const groupMap={};
  list.forEach(s=>{
    const key=s.date||'—';
    if(!groupMap[key]){groupMap[key]={label:key,sessions:[],totalSec:0};groups.push(groupMap[key]);}
    groupMap[key].sessions.push(s);
    groupMap[key].totalSec+=s.dur||0;
  });

  function groupClass(label){
    if(label==='сегодня')return'sess-group-hd-today';
    if(label==='вчера')return'sess-group-hd-yesterday';
    return'';
  }

  el.innerHTML=groups.map((g,gi)=>{
    const rows=g.sessions.map((s,si)=>{
      const col=s.color||'#60A5FA';
      return `<div class="sess-row-all" style="animation:appleFadeUp .28s ${(gi*0.04+si*0.025).toFixed(2)}s both">
        <div class="sess-row-bar" style="background:${col};box-shadow:0 0 8px ${col}66"></div>
        ${catIconBox(s.cat||'read',col,38)}
        <div style="flex:1;min-width:0">
          <div class="sess-row-name">${s.name}</div>
        </div>
        <div class="sess-row-dur" style="color:${col}">${fmtD(s.dur)}</div>
      </div>`;
    }).join('');
    return `<div class="sess-group">
      <div class="sess-group-hd ${groupClass(g.label)}">
        <span class="sess-group-hd-lbl">${g.label==='сегодня'?'Сегодня':g.label==='вчера'?'Вчера':g.label}</span>
        <div class="sess-group-hd-line"></div>
        <span class="sess-group-hd-sum">${fmtD(g.totalSec)}</span>
      </div>
      <div class="sess-group-body">${rows}</div>
    </div>`;
  }).join('');
}

// ══ MANAGE ══════════════════════════════════════════════════
function renderManageGrid(){
  const el = document.getElementById('manageGrid'); if(!el) return;
  if(!P || !P.activeCatIds){ el.innerHTML = ''; return; }
  const isMobile = window.innerWidth <= 600;

  if(!document.getElementById('_mgAnimCSS')){
    const s = document.createElement('style');
    s.id = '_mgAnimCSS';
    s.textContent = `
      @keyframes mgCardIn {
        0%   { opacity:0; transform:translateY(20px) scale(.95); }
        65%  { opacity:1; transform:translateY(-3px) scale(1.008); }
        100% { opacity:1; transform:translateY(0) scale(1); }
      }
      @keyframes mgCheckIn {
        0%   { opacity:0; transform:scale(0) rotate(-30deg); }
        65%  { transform:scale(1.2) rotate(5deg); }
        100% { opacity:1; transform:scale(1) rotate(0); }
      }
      @keyframes mgStatIn {
        from { opacity:0; transform:translateY(6px); }
        to   { opacity:1; transform:translateY(0); }
      }
      .mg-card-new { animation: mgCardIn .4s cubic-bezier(.34,1.18,.64,1) both; }
      .mg-card-new:hover {
        transform: translateY(-3px) !important;
        transition: transform .2s cubic-bezier(.34,1.56,.64,1) !important;
      }
      .mg-check-anim { animation: mgCheckIn .32s cubic-bezier(.34,1.56,.64,1) both; }
      .mg-stat-chip  { animation: mgStatIn .3s cubic-bezier(.22,1,.36,1) both; }
    `;
    document.head.appendChild(s);
  }

  el.style.gridTemplateColumns = isMobile ? '1fr' : 'repeat(2,1fr)';
  el.style.gap = isMobile ? '10px' : '12px';

  el.innerHTML = ALL_CATS.map((c, i) => {
    const on  = P.activeCatIds.includes(c.id);
    const hrs = P.categories.find(x => x.id === c.id)?.hours || 0;
    const mc  = c.members || 0;
    const col = c.color;
    const iconKey = {read:'read',lang:'lang',code:'code',trading:'trading',cooking:'cooking',intellect:'intellect'}[c.id];
    const delay = i * 50;
    const hrsLabel = hrs > 0 ? (hrs >= 100 ? Math.round(hrs) : hrs.toFixed(1)) + ' ч' : '—';

    // ── Stat chips — only shown when active, clearly separated ──────
    const statsHTML = on ? `
      <div style="display:flex;gap:7px;margin-top:12px;padding-top:11px;
        border-top:0.5px solid ${col}22">
        <!-- My hours chip -->
        <div class="mg-stat-chip" style="
          display:flex;align-items:center;gap:6px;
          flex:1;padding:8px 11px;border-radius:10px;
          background:${col}12;border:0.5px solid ${col}28;
          animation-delay:${delay+120}ms">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${col}" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 7 12 12 15 14"/></svg>
          <div>
            <div style="font-family:'DM Mono',monospace;font-size:17px;font-weight:400;
              color:${col};line-height:1;letter-spacing:-.02em">${hrsLabel}</div>
            <div style="font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
              color:${col};opacity:.85;margin-top:2px">моих часов</div>
          </div>
        </div>
        <!-- League members chip -->
        <div class="mg-stat-chip" style="
          display:flex;align-items:center;gap:6px;
          flex:1;padding:8px 11px;border-radius:10px;
          background:rgba(255,255,255,.04);border:0.5px solid rgba(255,255,255,.08);
          animation-delay:${delay+160}ms">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--t2)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <div>
            <div style="font-family:'DM Mono',monospace;font-size:17px;font-weight:400;
              color:#4ADE80;line-height:1;letter-spacing:-.02em">${mc > 0 ? mc : '—'}</div>
            <div style="font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
              color:rgba(74,222,128,.65);margin-top:2px">участников</div>
          </div>
        </div>
      </div>` : mc > 0 ? `
      <div style="margin-top:8px;font-size:11px;color:var(--t3);display:flex;align-items:center;gap:4px">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
        ${mc} участников
      </div>` : `
      <div style="margin-top:8px;font-size:11px;color:var(--t3)">Войди первым в лигу</div>`;

    return `<div class="mg-card-new"
      onclick="toggleCatEpic('${c.id}')"
      style="
        position:relative;overflow:hidden;
        border-radius:16px;
        padding:18px;
        cursor:pointer;
        background:${on ? `var(--panel)` : 'var(--panel)'};
        border:${on ? `1.5px solid ${col}45` : '0.5px solid var(--border)'};
        box-shadow:${on ? `0 2px 12px rgba(0,0,0,.4),inset 0 1px 0 ${col}18` : '0 1px 3px rgba(0,0,0,.3)'};
        animation-delay:${delay}ms;
        transition:border-color .2s,box-shadow .2s">

      ${on ? `<div style="position:absolute;inset:0;
        background:linear-gradient(135deg,${col}0e 0%,transparent 55%);
        pointer-events:none"></div>` : ''}

      ${on ? `<div style="position:absolute;top:0;left:0;right:0;height:2px;
        background:linear-gradient(90deg,transparent,${col}99 40%,${col} 50%,${col}99 60%,transparent);
        border-radius:16px 16px 0 0"></div>` : ''}

      <!-- Top row: icon + name + state -->
      <div style="display:flex;align-items:center;gap:14px">

        <div style="
          width:48px;height:48px;border-radius:14px;flex-shrink:0;
          display:flex;align-items:center;justify-content:center;
          color:${col};
          background:${on ? `${col}18` : 'rgba(255,255,255,.04)'};
          border:0.5px solid ${on ? col+'30' : 'rgba(255,255,255,.07)'};
          transition:background .2s">
          ${(ICONS[iconKey]||'').replace('width="20" height="20"','width="22" height="22"')}
        </div>

        <div style="flex:1;min-width:0">
          <div style="font-size:15px;font-weight:700;letter-spacing:-.015em;
            color:${on ? col : 'var(--t1)'};line-height:1.2;margin-bottom:3px">
            ${c.name}
          </div>
          <div style="font-size:11px;color:var(--t3);
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
            ${c.desc || 'Направление развития'}
          </div>
        </div>

        <!-- State badge -->
        ${on
          ? `<div class="mg-check-anim" style="
              display:flex;flex-direction:column;align-items:center;gap:4px;flex-shrink:0">
              <div style="width:26px;height:26px;border-radius:50%;
                background:${col};display:flex;align-items:center;justify-content:center">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#09090B" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span style="font-size:8px;font-weight:700;letter-spacing:.06em;
                text-transform:uppercase;color:${col}">активна</span>
            </div>`
          : `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex-shrink:0">
              <div style="width:26px;height:26px;border-radius:50%;
                border:1.5px solid var(--border);
                display:flex;align-items:center;justify-content:center">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
              <span style="font-size:8px;font-weight:600;letter-spacing:.04em;
                text-transform:uppercase;color:var(--t3)">войти</span>
            </div>`}
      </div>

      <!-- Stats — separate section, clearly readable -->
      ${statsHTML}
    </div>`;
  }).join('');
}


// ══ ACHIEVEMENTS ════════════════════════════════════════════
function renderAchMini(){
  const el=document.getElementById('achMini');if(!el)return;
  // Show ALL achievements in blocks of 4
  const unlocked=P.achievements.filter(a=>a.unlocked);
  const unlockedIds=new Set(unlocked.map(a=>a.id));

  // Build blocks of 4 - first show unlocked, then locked
  const allDefs=[...ACH_DEF].sort((a,b)=>(unlockedIds.has(b.id)?1:0)-(unlockedIds.has(a.id)?1:0));
  const blocks=[];
  for(let i=0;i<allDefs.length;i+=4) blocks.push(allDefs.slice(i,i+4));

  // Hall of fame header with XP bar
  const pct = Math.round((unlocked.length/ACH_DEF.length)*100);
  const headerHTML = `
    <div style="margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
        <div style="display:flex;gap:4px;align-items:center">
          ${unlocked.length>0?'⭐'.repeat(Math.min(unlocked.length,3)):''}
          <span style="font-size:12px;font-weight:700;color:var(--gold)">${unlocked.length}</span>
          <span style="font-size:10px;color:var(--t3)">/ ${ACH_DEF.length} разблокировано</span>
        </div>
        <span style="font-size:11px;font-weight:700;color:${pct>=100?'#3fb950':pct>=50?'var(--gold)':'var(--t3)'}">${pct}%</span>
      </div>
      <div style="height:4px;background:rgba(0,0,0,.2);border-radius:2px;overflow:hidden">
        <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--gold-d),var(--gold));border-radius:2px;box-shadow:0 0 6px rgba(245,200,66,.4);transition:width 1.2s ease"></div>
      </div>
    </div>`;

  el.innerHTML = headerHTML + blocks.map((block,bi)=>`
    <div class="ach-block">
      ${block.map(def=>{
        const ua=P.achievements.find(a=>a.id===def.id)||{unlocked:false};
        const glow = ua.unlocked ? `box-shadow:0 0 8px ${def.color||'rgba(245,200,66,.3)'}44,inset 0 0 8px rgba(0,0,0,.1);border-color:${def.color||'rgba(245,200,66,.3)'}55;` : '';
        return `<div class="ai ${ua.unlocked?'':'locked'}" onclick="openAch('${def.id}')" title="${ua.unlocked?def.name+' — '+def.desc:'???'}" style="${glow}">
          <div class="ai-icon" style="${ua.unlocked?`filter:drop-shadow(0 0 6px ${def.color||'#f5c842'})`:''}">${ua.unlocked?def.icon:'🔒'}${ua.unlocked?'<div class="ai-dot"></div>':''}</div>
          <div class="ai-name" style="${ua.unlocked?`color:var(--t1)`:''}">${ua.unlocked?def.name.slice(0,8):'???'}</div>
        </div>`;
      }).join('')}
    </div>`).join('');
}

function renderAchFull(){
  const el=document.getElementById('achFull');if(!el)return;
  const unlocked=P.achievements.filter(a=>a.unlocked);
  const unl=unlocked.length;
  const total=ACH_DEF.length;
  const pct=Math.round((unl/total)*100);
  const cntEl=document.getElementById('achCnt');
  if(cntEl)cntEl.textContent=`${unl} / ${total}`;

  // Summary bar
  const summary=`<div class="ach-summary">
    <div style="text-align:center">
      <div class="ach-sum-big">${unl}</div>
      <div style="font-size:10px;color:var(--t3);text-transform:uppercase;letter-spacing:.5px">/ ${total}</div>
    </div>
    <div class="ach-sum-track">
      <div class="ach-sum-label">Прогресс разблокировки — <b>${pct}%</b></div>
      <div class="ach-sum-bar"><div class="ach-sum-fill" style="width:${pct}%"></div></div>
      <div style="font-size:11px;color:var(--t3);margin-top:6px">
        ${unl===0?'Начни свой путь 🚀':unl<10?'Хорошее начало! Продолжай.':unl<20?'Ты на полпути, жми дальше!':'Настоящий коллекционер 🏆'}
      </div>
    </div>
  </div>`;

  // Group by category
  const sections=Object.entries(ACH_CATS).map(([catKey,catMeta])=>{
    const defs=ACH_DEF.filter(d=>d.cat===catKey);
    const catUnl=defs.filter(d=>P.achievements.find(a=>a.id===d.id&&a.unlocked)).length;
    const cards=defs.map(def=>{
      const ua=P.achievements.find(a=>a.id===def.id)||{unlocked:false};
      const isSecret=def.secret&&!ua.unlocked;
      const prog=!ua.unlocked?achProgress(def):null;
      const progBar=prog?`<div class="ach2-prog"><div class="ach2-prog-fill" style="width:${Math.min(100,Math.round((prog.cur/prog.max)*100))}%;background:${def.color}"></div></div><div class="ach2-prog-lbl">${prog.cur} / ${prog.max}</div>`:'';
      return `<div class="ach2 ${ua.unlocked?'unlocked':'locked'}${def.secret?' secret':''}" style="--ach-color:${def.color}" onclick="openAch('${def.id}')">
        <div class="ach2-icon" style="width:48px;height:48px;border-radius:14px;background:rgba(255,255,255,.06);border:0.5px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:${def.color||'var(--gold)'}">${isSecret?'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>':(ICONS[{read:'read',lang:'lang',code:'code',trading:'trading',cooking:'cooking',intellect:'intellect',streak:'flame',sessions:'timer',hours:'zap',best:'trophy'}[def.id]||'trophy']||def.icon)}</div>
        <div class="ach2-body">
          <div class="ach2-name">${isSecret?'???':def.name}</div>
          <div class="ach2-desc">${isSecret?'Секретное достижение. Продолжай играть!':def.desc}</div>
          ${ua.unlocked?`<div class="ach2-date">✓ ${ua.unlockedAt||'Разблокировано'}</div>`:progBar}
        </div>
        ${ua.unlocked?`<div class="ach2-check">✓</div>`:`<div style="position:absolute;top:0;right:0;background:rgba(9,9,11,.85);border-radius:0 12px 0 8px;padding:4px 7px;font-size:12px;line-height:1">🔒</div>`}
      </div>`;
    }).join('');
    return `<div class="ach-section">
      <div class="ach-sec-hdr">
        ${catIconBox(catMeta?.id||"read", catMeta?.color||"var(--gold)", 28)}
        <span class="ach-sec-name">${catMeta.label}</span>
        <span class="ach-sec-cnt">${catUnl}/${defs.length}</span>
      </div>
      <div class="ach-grid2">${cards}</div>
    </div>`;
  }).join('');

  el.innerHTML=summary+sections;
}

function openAch(id){
  const def=ACH_DEF.find(a=>a.id===id);if(!def)return;
  const ua=P.achievements.find(a=>a.id===id)||{unlocked:false};
  const prog=achProgress(def);
  const cur=prog?.cur??0,max=prog?.max??def.th;
  const pct=ua.unlocked?100:Math.min(100,Math.round((cur/max)*100));
  document.getElementById('amIcon').textContent=(def.secret&&!ua.unlocked)?'🔮':def.icon;
  document.getElementById('amName').textContent=(def.secret&&!ua.unlocked)?'???':def.name;
  document.getElementById('amDesc').textContent=(def.secret&&!ua.unlocked)?'Секретное достижение. Продолжай играть!':def.desc;
  document.getElementById('amStat').textContent=ua.unlocked?`✅ Разблокировано ${ua.unlockedAt||''}`:cur+' / '+max;
  document.getElementById('amStat').style.color=ua.unlocked?def.color||'var(--green)':'var(--t2)';
  document.getElementById('amBar').style.background=def.color||'var(--blue)';
  document.getElementById('amBar').style.width=pct+'%';
  document.getElementById('achOv').classList.add('show');
}
function closeAch(){document.getElementById('achOv').classList.remove('show');}

// ══ LEAGUES (REAL DATA) ═══════════════════════════════════════
function genFakePlayers(catId,offset,count){
  const names=FNAMES[catId]||FNAMES.code;
  const seed=catId.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
  const r=(i,s)=>((seed*31+s*17+i*7)%97);
  return names.slice(offset,offset+count).map((n,i)=>({
    name:n,av:FAVS[(seed+(i+offset)*3)%FAVS.length],
    hrs:Math.round(40+r(i,1)*6+r(i,2)*4),streak:Math.floor(r(i,3)/8),
    fake:true,isMe:false
  }));
}

// ── Avatar helper — renders photo or emoji consistently ──────
function renderAvEl(av, avUrl, size=40, radius=10, border='0.5px solid var(--border)') {
  const sty = `width:${size}px;height:${size}px;border-radius:${radius}px;` +
    `background:var(--card);border:${border};` +
    `display:flex;align-items:center;justify-content:center;` +
    `font-size:${Math.round(size*0.44)}px;flex-shrink:0;overflow:hidden;`;
  if (avUrl) {
    return `<div style="${sty}"><img src="${avUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:${radius}px" onerror="this.parentNode.textContent='${av}'"></div>`;
  }
  return `<div style="${sty}">${av||'🎯'}</div>`;
}

// Хранит незавершённые запросы к арене — защищает от одновременных дублирующих фетчей
const _lgInFlight = {};

// Guard: true пока идёт сетевой запрос в renderLeagues.
// Цель: предотвратить два параллельных фетча (tab click + background refresh race).
// НЕ блокирует мгновенный ре-рендер из кеша (setArenaMode и т.д.).
let _lgFetching = false;

async function loadLeagueData(catId){
  if(lgCache[catId] && lgCacheTime[catId] && (Date.now()-lgCacheTime[catId]) < LG_CACHE_TTL) return lgCache[catId];
  // Если уже идёт запрос для этой категории — ждём его результат, не делаем новый
  if(_lgInFlight[catId]) return _lgInFlight[catId];
  _lgInFlight[catId] = _fetchLeagueData(catId);
  try {
    const result = await _lgInFlight[catId];
    return result;
  } finally {
    delete _lgInFlight[catId];
  }
}

async function _fetchLeagueData(catId){
  try{
  // Step 1: get user_categories for this league
  const{data:ucData}=await sb.from('user_categories')
    .select('user_id,hours')
    .eq('category_id',catId)
    .order('hours',{ascending:false})
    .limit(50);

  if(!ucData||!ucData.length){lgCache[catId]=[];return[];}

  // Step 2: get user profiles including avatar_url for arena display
  const userIds=ucData.map(u=>u.user_id);
  const{data:usersData}=await sb.from('users')
    .select('id,username,avatar,avatar_url,streak')
    .in('id',userIds);

  const userMap={};
  (usersData||[]).forEach(u=>{userMap[u.id]=u;});

  // Step 3: get session stats — неделя от Пн 00:00 (не скользящие 7 дней), месяц с запасом
  const wCut=new Date(getWeekStart()).toISOString(); // Пн 00:00 текущей недели
  const mCut=new Date(Date.now()-35*86400000).toISOString();
  const{data:sessData}=await sb.from('sessions')
    .select('user_id,duration_seconds,created_at')
    .in('user_id',userIds)
    .eq('category_id',catId)
    .gte('created_at',mCut);

  // Build stats map
  const statsMap={};
  (sessData||[]).forEach(s=>{
    if(!statsMap[s.user_id])statsMap[s.user_id]={weekHrs:0,monthHrs:0,bestSession:0};
    const h=s.duration_seconds/3600;
    statsMap[s.user_id].monthHrs+=h;
    if(s.created_at>=wCut)statsMap[s.user_id].weekHrs+=h;
    if(h>statsMap[s.user_id].bestSession)statsMap[s.user_id].bestSession=h;
  });

  const players=ucData.map(uc=>{
    const u=userMap[uc.user_id]||{};
    const st=statsMap[uc.user_id]||{weekHrs:0,monthHrs:0,bestSession:0};
    const isMe = uc.user_id===SB_USER?.id;

    // ── КЛЮЧЕВОЙ ФИЧ: для текущего пользователя берём часы из P.categories ──
    // P.categories — это reconciled значение (max из БД и вычисленного из сессий)
    // Это гарантирует что цифра в арене = цифре на дашборде
    // Для других игроков — берём uc.hours из БД (их P нам недоступен)
    let totalHrs;
    if(isMe && P && P.categories){
      const myCat = P.categories.find(c=>c.id===catId);
      totalHrs = myCat ? myCat.hours : (uc.hours||0);
    } else {
      totalHrs = uc.hours||0;
    }

    // Для текущего пользователя weekHrs тоже берём из реальных P.sessions
    const myWeekHrs = isMe && P
      ? P.sessions.filter(s=>s.cat===catId&&sessTs(s)>=getWeekStart()).reduce((a,s)=>a+s.dur/3600,0)
      : (st.weekHrs||0);

    return{
      name:isMe?(P?.name||u.username||'?'):(u.username||'?'),
      av:isMe?(P?.avatar||u.avatar||'🎯'):(u.avatar||'🎯'),
      avUrl:isMe?(P?.avatarUrl||u.avatar_url||null):(u.avatar_url||null),
      hrs:Math.round(totalHrs*10)/10,
      streak:isMe?(P?.streak||0):(u.streak||0),
      weekHrs:Math.round(myWeekHrs*10)/10,
      monthHrs:Math.round((st.monthHrs||0)*10)/10,
      bestSession:Math.round((st.bestSession||0)*10)/10,
      fake:false,
      isMe,
      userId:uc.user_id||null
    };
  });

  lgCache[catId]=players;
  lgCacheTime[catId]=Date.now();
  return players;
  }catch(e){console.error('_fetchLeagueData:',e);return[];}
}


// ══ ARENA MODE ═══════════════════════════════════════════════
function setArenaMode(mode, btn) {
  arenaMode = mode;
  // НЕ инвалидируем кэш — данные те же, меняется только сортировка
  // Это позволяет мгновенно переключаться между режимами без новых запросов к БД
  document.querySelectorAll('.arena-mode-btn').forEach(b => b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderLeagues();
}

function getArenaValue(player, mode) {
  switch(mode) {
    case 'hours':   return player.hrs || 0;
    case 'streak':  return player.streak || 0;
    case 'week':    return player.weekHrs || 0;
    case 'month':   return player.monthHrs || 0;
    case 'session': return player.bestSession || 0;
    default:        return player.hrs || 0;
  }
}

function formatArenaValue(val, mode) {
  switch(mode) {
    case 'hours':   return val.toFixed(1) + ' ч';
    case 'streak':  return val + ' дн';
    case 'week':    return val.toFixed(1) + ' ч';
    case 'month':   return val.toFixed(1) + ' ч';
    case 'session': return val.toFixed(1) + ' ч';
    default:        return val.toFixed(1) + ' ч';
  }
}

function arenaModeLabel(mode) {
  return {hours:'За всё время',streak:'Лучший стрик',week:'За неделю',month:'За месяц',session:'Лучшая сессия'}[mode]||'';
}

async function renderLeagues(){
  const el=document.getElementById('leaguesContent');if(!el)return;
  try{
  const cats=activeCats();
  if(!cats.length){el.innerHTML=`<div class="empty" style="padding:40px">Нет активных категорий</div>`;return;}

  // ── TRUE STALE-WHILE-REVALIDATE ───────────────────────────────
  // 1. Если кеш есть — рисуем МГНОВЕННО (0 мс задержки пользователю)
  // 2. Если данные протухли — обновляем тихо в фоне, без повторного skeleton
  // 3. _lgFetching guard исключает параллельный дублирующий фетч
  const cachedResults = cats.map(c => lgCache[c.id] || null);
  const allCached = cachedResults.every(r => r !== null);

  if(allCached){
    // Мгновенный рендер из кеша — пользователь не ждёт
    el.innerHTML = _buildArenaHTML(cats, cachedResults);

    // Если фетч уже летит (фоновый или другой вызов) — не дублируем
    if(_lgFetching) return;

    const hasStale = cats.some(c => !lgCacheTime[c.id] || (Date.now()-lgCacheTime[c.id]) >= LG_CACHE_TTL);
    if(!hasStale) return; // все свежие — ничего не делать

    // Фоновое обновление: только если данные реально изменились
    _lgFetching = true;
    const freshResults = await Promise.all(cats.map(c=>loadLeagueData(c.id)));
    const oldJSON = JSON.stringify(cachedResults.map(r=>(r||[]).map(p=>p.hrs||p.hours||0)));
    const newJSON = JSON.stringify(freshResults.map(r=>(r||[]).map(p=>p.hrs||p.hours||0)));
    if(oldJSON !== newJSON) el.innerHTML = _buildArenaHTML(cats, freshResults);

  } else {
    // Нет кеша совсем.
    // Если фетч уже идёт — не запускаем второй (это и есть источник "двойной загрузки")
    if(_lgFetching) return;
    _lgFetching = true;

    // Skeleton показываем ТОЛЬКО если контейнер реально пуст (первый визит).
    // Если там уже есть старый рендер — оставляем его, не мигаем.
    if(!el.children.length){
      el.innerHTML=`<div style="text-align:center;padding:32px;color:var(--t3)"><div style="font-size:36px;margin-bottom:8px;animation:floatUp 2s ease-in-out infinite">⚔️</div>Загрузка арены...</div>`;
    }
    const results=await Promise.all(cats.map(c=>loadLeagueData(c.id)));
    el.innerHTML = _buildArenaHTML(cats, results);
  }

  }catch(e){console.error('renderLeagues:',e);el.innerHTML='<div class="empty" style="padding:40px">Ошибка загрузки арены. Попробуй позже.</div>';}
  finally{ _lgFetching = false; }
}

// ── _buildArenaHTML — Apple Design Language ───────────────────────
function _buildArenaHTML(cats, results){
  const modeLbl = arenaModeLabel(arenaMode);
  const totalPlayers = new Set(results.flat().map(p=>p.userId||p.name)).size;

  // ── Keyframes + card animation CSS (injected once) ─────────────
  const animCSS = ``;

  // ── Compact header ─────────────────────────────────────────────
  const arenaHeader = animCSS + `
  <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:24px;padding:0 2px">
    <div style="display:flex;align-items:center;gap:10px">
      <div style="display:flex;align-items:center;gap:5px">
        <span style="width:6px;height:6px;border-radius:50%;background:#4ADE80;box-shadow:0 0 6px rgba(74,222,128,.7);animation:arenaGlowPulse 2s ease-in-out infinite"></span>
        <span style="font-size:12px;font-weight:600;color:var(--t2)">${totalPlayers} участников</span>
      </div>
      <span style="width:1px;height:12px;background:var(--border)"></span>
      <span style="font-size:12px;font-weight:600;color:var(--t2)">${cats.length} лиги</span>
    </div>
    <div style="font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;
      color:var(--gold);background:rgba(245,200,66,.08);border:0.5px solid rgba(245,200,66,.18);
      padding:4px 12px;border-radius:20px">${modeLbl}</div>
  </div>`;

  // ── League cards ───────────────────────────────────────────────
  const leagueCards = cats.map((cat, ci) => {
    const rawPlayers = results[ci] || [];
    const sorted = [...rawPlayers].sort((a,b)=>getArenaValue(b,arenaMode)-getArenaValue(a,arenaMode));
    const myIdx  = sorted.findIndex(p=>p.isMe);
    const top10  = sorted.slice(0, 10);
    const maxVal = Math.max(...top10.map(p=>getArenaValue(p,arenaMode)), 0.1);
    const myRank = myIdx >= 0 ? myIdx + 1 : null;
    const catKey = {read:'read',lang:'lang',code:'code',trading:'trading',cooking:'cooking',intellect:'intellect'}[cat.id];

    const podiumColors = [
      { txt:'#FFD60A', glow:'rgba(255,214,10,.5)',  ring:'rgba(255,214,10,.25)' },
      { txt:'#C8C8D4', glow:'rgba(200,200,212,.4)', ring:'rgba(200,200,212,.15)' },
      { txt:'#E8935A', glow:'rgba(232,147,90,.4)',  ring:'rgba(232,147,90,.15)' },
    ];

    // Card delay for stagger
    const cardDelay = ci * 90;

    const rows = top10.length === 0
      ? `<div style="padding:48px 24px;text-align:center;color:var(--t3)">
          <div style="font-size:36px;margin-bottom:10px;opacity:.4">🏁</div>
          <div style="font-size:13px">Первым войди в лигу</div>
        </div>`
      : top10.map((p, i) => {
          const isMe  = p.isMe;
          const val   = getArenaValue(p, arenaMode);
          const vStr  = formatArenaValue(val, arenaMode);
          const barW  = Math.round((val/maxVal)*100);
          const pc    = podiumColors[i] || null;
          const click = !isMe && !p.fake && p.userId;
          const rowDelay = cardDelay + 180 + i * 45;

          const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
          const nameColor = isMe ? cat.color
            : pc ? pc.txt : 'var(--t1)';

          // Avatar
          const av = isMe
            ? (P.avatarUrl ? `<img src="${P.avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:8px" onerror="this.parentNode.textContent='${P.avatar}'">` : `<span style="font-size:17px">${P.avatar}</span>`)
            : (p.avUrl    ? `<img src="${p.avUrl}"    style="width:100%;height:100%;object-fit:cover;border-radius:8px" onerror="this.parentNode.textContent='${p.av}'" >` : `<span style="font-size:17px">${p.av}</span>`);

          return `<div class="arena-row"
            style="
              display:flex;align-items:center;gap:13px;
              padding:${i<3?'14px':'11px'} 20px;
              border-bottom:0.5px solid rgba(255,255,255,.035);
              background:${isMe?`linear-gradient(90deg,${cat.color}14,transparent)`:i<3?`linear-gradient(90deg,${pc.ring},transparent)`:'transparent'};
              ${isMe?`border-left:2.5px solid ${cat.color};`:''}
              cursor:${click?'pointer':'default'};
              animation-delay:${rowDelay}ms;
              transition:background .14s"
            ${click?`onclick="openUserProfile('${esc(p.userId)}','${escAttr(p.name)}','${escAttr(p.av)}','${escAttr(p.avUrl||'')}')"`:''}>

            <!-- Rank / Medal -->
            <div style="width:28px;text-align:center;flex-shrink:0">
              ${medal
                ? `<span class="arena-medal" style="font-size:20px;display:block;animation-delay:${rowDelay+80}ms;filter:drop-shadow(0 0 6px ${pc.glow})">${medal}</span>`
                : `<span style="font-family:'DM Mono',monospace;font-size:13px;font-weight:400;color:var(--t3)">${i+1}</span>`}
            </div>

            <!-- Avatar -->
            <div style="width:36px;height:36px;border-radius:9px;flex-shrink:0;overflow:hidden;
              background:${isMe?cat.color+'18':'rgba(255,255,255,.04)'};
              border:${isMe?`1.5px solid ${cat.color}55`:`0.5px solid rgba(255,255,255,.07)`};
              display:flex;align-items:center;justify-content:center;
              box-shadow:${isMe?`0 0 14px ${cat.color}44`:i<3?`0 0 8px ${pc.glow}`:'none'}">
              ${av}
            </div>

            <!-- Name + bar -->
            <div style="flex:1;min-width:0">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px">
                <span style="font-size:13px;font-weight:${i<3||isMe?700:500};
                  color:${nameColor};
                  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:150px;
                  ${i<3?`text-shadow:0 0 12px ${pc.glow}`:''}">
                  ${isMe ? esc(P.name) : esc(p.name)}
                </span>
                ${isMe?`<span style="font-size:8.5px;font-weight:800;padding:2px 6px;border-radius:6px;
                  background:${cat.color}20;color:${cat.color};border:0.5px solid ${cat.color}40;
                  letter-spacing:.05em;text-transform:uppercase;flex-shrink:0">ты</span>`:''}
              </div>
              <!-- Progress bar -->
              <div style="height:2px;background:rgba(255,255,255,.06);border-radius:1px;overflow:hidden;max-width:180px">
                <div class="arena-bar" style="height:100%;width:${barW}%;border-radius:1px;
                  background:${isMe?cat.color:i<3?pc.txt:'rgba(255,255,255,.2)'};
                  box-shadow:${isMe?`0 0 6px ${cat.color}`:i<3?`0 0 4px ${pc.glow}`:'none'};
                  animation-delay:${rowDelay+120}ms"></div>
              </div>
            </div>

            <!-- Stat -->
            <div style="font-family:'DM Mono',monospace;font-size:${i<3?18:14}px;font-weight:400;
              color:${isMe?cat.color:pc?pc.txt:'var(--t2)'};
              ${i<3||isMe?`text-shadow:0 0 10px ${isMe?cat.color:pc.glow}`:''}">
              ${vStr}
            </div>
          </div>`;
        }).join('');

    // My position footer if outside top-10
    const myFooter = myRank && myIdx >= 10 ? `
      <div style="padding:11px 20px;border-top:0.5px solid rgba(255,255,255,.05);
        background:${cat.color}08;display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:11px;color:var(--t3)">Твоя позиция</span>
        <span style="font-family:'DM Mono',monospace;font-size:14px;color:${cat.color}">
          #${myRank}
        </span>
      </div>` : '';

    return `<div class="arena-card" style="
      margin-bottom:20px;
      border-radius:20px;overflow:hidden;
      background:var(--panel);
      border:0.5px solid ${cat.color}20;
      box-shadow:0 2px 8px rgba(0,0,0,.3),0 0 0 0.5px ${cat.color}0a;
      animation-delay:${cardDelay}ms">

      <!-- League header — minimal, information-first -->
      <div style="padding:18px 20px 16px;
        background:linear-gradient(135deg,${cat.color}12,${cat.color}04,transparent);
        border-bottom:0.5px solid ${cat.color}18;
        display:flex;align-items:center;justify-content:space-between;gap:12px">

        <div style="display:flex;align-items:center;gap:14px">
          <!-- Icon -->
          <div style="width:44px;height:44px;border-radius:13px;flex-shrink:0;
            background:${cat.color}16;border:0.5px solid ${cat.color}30;
            display:flex;align-items:center;justify-content:center;color:${cat.color}">
            ${(ICONS[catKey]||'').replace(/width="20" height="20"/g,'width="20" height="20"')}
          </div>
          <div>
            <div style="font-size:15px;font-weight:700;letter-spacing:-.01em;color:var(--t1);margin-bottom:2px">${cat.name}</div>
            <div style="font-size:11px;color:var(--t3)">${rawPlayers.length} участников</div>
          </div>
        </div>

        <!-- My rank badge or enter prompt -->
        ${myRank
          ? `<div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px">
              <div style="font-family:'DM Mono',monospace;font-size:22px;font-weight:400;
                color:${myRank<=3?'var(--gold)':cat.color};line-height:1">
                ${myRank<=3?['🥇','🥈','🥉'][myRank-1]:'#'+myRank}
              </div>
              <div style="font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--t3)">твой ранг</div>
            </div>`
          : `<div style="font-size:11px;font-weight:600;color:var(--t3)">не в лиге</div>`}
      </div>

      <!-- Players -->
      ${rows}
      ${myFooter}
    </div>`;
  }).join('');

  return arenaHeader + leagueCards;
}


async function renderLgMini(){
  const el=document.getElementById('lgMini');if(!el)return;
  try{
    const cats=activeCats();
    if(!cats.length){el.innerHTML='';return;}

    // Функция рендера мини-виджета из данных
    const _draw=(results)=>{
      el.innerHTML=cats.map((c,i)=>{
        const rank=results[i].findIndex(p=>p.isMe)+1||'?';
        return `<div style="display:flex;align-items:center;gap:10px;padding:7px 5px;border-radius:7px;cursor:pointer;transition:background .2s" onclick="showTab('leagues')" onmouseover="this.style.background='var(--hover)'" onmouseout="this.style.background=''">
          ${catIconBox(c.id, c.color, 32)}
          <div style="flex:1"><div style="font-size:12px;font-weight:600">${c.name}</div>
            <div style="font-size:10px;color:var(--t3)">${c.hours.toFixed(1)} часов</div></div>
          <div style="font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;color:${c.color}">#${rank}</div>
        </div>`;
      }).join('');
    };

    // Если кеш есть — рисуем мгновенно
    const hasCached = cats.every(c => lgCache[c.id]);
    if(hasCached){
      _draw(cats.map(c=>lgCache[c.id]||[]));
    }

    // Грузим/обновляем данные (из кеша или с сервера)
    const results=await Promise.all(cats.map(c=>loadLeagueData(c.id)));
    _draw(results);
  }catch(e){console.error('renderLgMini:',e);el.innerHTML='';}
}

// ══ LEAGUE HERO BANNER ═══════════════════════════════════════
// leagueHero removed — stubs to prevent errors
async function showLeagueHero(){ return; }
function _markHeroSeen(){}
function closeHero(){}
function closeHeroGoLeague(){}



// ══ SUNDAY TOP PLAYER BANNER ═══════════════════════════════
let sundayBannerUserId = null;

async function checkSundayBanner(){
  try{
    const today = new Date();
    const isSunday = today.getDay() === 0;
    const lastShown = localStorage.getItem('lt_sunday_shown');
    const todayKey = today.toISOString().slice(0,10);
    if(!isSunday || lastShown === todayKey) return;
    if(!P || !SB_USER) return;
    const cats = activeCats();
    if(!cats.length) return;

    const topPlayers = [];
    const catsToShow = cats.slice(0,3);
    await Promise.all(catsToShow.map(async cat => {
      const players = await loadLeagueData(cat.id);
      const real = players.filter(p => !p.fake && !p.isMe && p.hrs > 0);
      if(real[0]) topPlayers.push({ player:real[0], cat });
    }));

    if(!topPlayers.length) return;

    const wrap = document.getElementById('swPlayersWrap');
    if(wrap) {
      wrap.innerHTML = topPlayers.map(({player,cat}) => `
        <div class="sw-player-card" onclick="closeSundayBanner();${player.userId?`openUserProfile('${esc(player.userId)}','${escAttr(player.name)}','${escAttr(player.av)}')`:''}" style="cursor:${player.userId?'pointer':'default'}">
          <div class="sw-player-lbl">${cat.icon} ${cat.name}</div>
          <div class="sw-player-av">${player.av}</div>
          <div class="sw-player-name">${esc(player.name)}</div>
          <div class="sw-player-stat" style="color:${cat.color}">${player.hrs} ч</div>
          <div class="sw-player-streak">🔥 ${player.streak} дней</div>
        </div>`).join('');
    }

    document.getElementById('sundayBanner').style.display = 'flex';
  }catch(e){console.error('checkSundayBanner:',e);}
}

function closeSundayBanner(){
  document.getElementById('sundayBanner').style.display = 'none';
  localStorage.setItem('lt_sunday_shown', new Date().toISOString().slice(0,10));
}

// ══ LEAGUE ROW CLICK → USER PROFILE ════════════════════════
async function openUserProfile(userId, name, av, avUrl){
  if(!userId){ showToast('Демо-игрок — профиль недоступен','ℹ️'); return; }
  const ov = document.getElementById('userProfileOv');
  ov.classList.add('show');

  // Instant skeleton while loading — show photo immediately if available
  const upAvEl = document.getElementById('upAv');
  if (avUrl) {
    upAvEl.innerHTML = `<img src="${avUrl}" class="img-cover" style="border-radius:19px" onerror="this.parentNode.textContent='${av||'🎯'}'">`;
  } else {
    upAvEl.textContent = av || '🎯';
  }
  upAvEl.style.border = '3px solid rgba(245,200,66,.25)';
  upAvEl.style.boxShadow = '0 8px 32px rgba(0,0,0,.5)';
  document.getElementById('upName').textContent = name || '—';
  document.getElementById('upMeta').innerHTML = '<span style="color:var(--t3)">Загружаем...</span>';
  document.getElementById('upLeaguesList').innerHTML = '<div style="padding:32px;text-align:center;color:var(--t3)">⏳</div>';
  ov.dataset.userId = userId;
  ov.dataset.userName = name || '—';
  ov.dataset.userAv = av || '🎯';

  try {
    // All queries in parallel
    const [uRes, ucRes, achRes, likeRes] = await Promise.all([
      sb.from('users').select('id,username,avatar,avatar_url,streak,total_sessions,created_at').eq('id',userId).limit(1),
      sb.from('user_categories').select('category_id,hours').eq('user_id',userId).order('hours',{ascending:false}),
      sb.from('user_achievements').select('achievement_id').eq('user_id',userId).eq('unlocked',true).limit(30),
      sb.from('likes').select('id',{count:'exact',head:true}).eq('to_user_id',userId)
    ]);

    const u = uRes.data?.[0] ?? null;
    const uc = ucRes.data ?? [];
    const achs = achRes.data ?? [];
    const totalLikes = likeRes.count ?? 0;

    // ── Compute stats (works even if u is null) ──
    const totalH = parseFloat(uc.reduce((s,r)=>s+(r.hours||0),0).toFixed(1));
    const lvlInfo = getLevelInfo(totalH);
    const lvlColor = lvlInfo.color.includes('gradient') ? 'var(--gold)' : lvlInfo.color;
    const topCat = ALL_CATS.find(c=>c.id===uc[0]?.category_id);
    const streak = u?.streak || 0;
    const sessions = u?.total_sessions || 0;
    const username = u?.username || name || '—';
    const achCount = achs.length;

    // ── Cover ──
    const cover = document.getElementById('upCover');
    cover.style.background = topCat
      ? `linear-gradient(135deg,${topCat.color}55 0%,#060610 100%)`
      : `linear-gradient(135deg,${lvlColor}33 0%,#060610 100%)`;
    // Animated glow orb only — no level badge in cover
    cover.innerHTML =
      `<div style="position:absolute;top:-40px;left:-40px;width:220px;height:220px;border-radius:50%;background:${lvlColor}14;filter:blur(50px);pointer-events:none"></div>`+
      `<div style="position:absolute;top:-20px;right:-20px;width:140px;height:140px;border-radius:50%;background:${topCat?topCat.color+'0e':'rgba(168,85,247,.06)'};filter:blur(35px);pointer-events:none"></div>`+
      `<div style="position:absolute;bottom:-42px;left:24px;width:110px;height:110px;border-radius:22px;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:54px;border:3px solid ${lvlColor}55;box-shadow:0 8px 32px rgba(0,0,0,.6),0 0 0 1px ${lvlColor}18,0 0 24px ${lvlColor}22;overflow:hidden;z-index:2;transition:transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .22s" id="upAv">${av||'🎯'}</div>`+
      `<button class="up-close" onclick="closeUserProfile()" style="position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,.08);border:0.5px solid rgba(255,255,255,.12);color:var(--t2);font-size:14px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:3">✕</button>`;

    // ── Avatar with glow ──
    const newAvEl = document.getElementById('upAv');
    if(newAvEl){
      newAvEl.style.border = `3px solid ${lvlColor}66`;
      newAvEl.style.boxShadow = `0 8px 32px rgba(0,0,0,.6),0 0 0 1px ${lvlColor}18,0 0 28px ${lvlColor}44`;
      if(u?.avatar_url){
        newAvEl.innerHTML = `<img src="${u.avatar_url}" class="img-cover" style="border-radius:19px" onerror="this.parentNode.textContent='${u?.avatar||'🎯'}'">`;
      } else {
        newAvEl.textContent = u?.avatar || av || '🎯';
      }
    }

    // ── Name + meta ──
    document.getElementById('upName').textContent = username;
    document.getElementById('upMeta').innerHTML =
      `<span>📅 С ${new Date(u?.created_at||Date.now()).toLocaleDateString('ru',{month:'long',year:'numeric'})}</span>`+
      `<span style="color:var(--green)">❤️ ${totalLikes}</span>`;

    // Store for write message
    ov.dataset.userId = userId;
    ov.dataset.userName = username;
    ov.dataset.userAv = u?.avatar || av || '🎯';

    await refreshLikeBtn(userId);

    // ── Social buttons (friend / follow) ──
    (function injectSocialBtns(){
      try {
        const actionsEl = document.getElementById('upActions');
        if(!actionsEl || !window._SOC) return;
        // Remove old injected buttons if any
        actionsEl.querySelectorAll('.soc-injected-btn').forEach(b => b.remove());
        const isFriend = window._SOC.friends.some(f => f.id === userId);
        const isPendingOut = window._SOC.pendingOut.some(f => f.id === userId);
        const isFollowing = window._SOC.follows.includes(userId);

        let friendBtnHTML = '';
        if(isFriend){
          friendBtnHTML = `<button class="up-btn soc-injected-btn" style="background:rgba(34,197,94,.1);border:0.5px solid rgba(34,197,94,.3);color:var(--green)" onclick="socConfirmRemoveFriend('${userId}')">✓ Друг</button>`;
        } else if(isPendingOut){
          friendBtnHTML = `<button class="up-btn soc-injected-btn" style="opacity:.6;cursor:default" disabled>⏳ Запрос</button>`;
        } else {
          friendBtnHTML = `<button class="up-btn soc-injected-btn" style="background:rgba(245,200,66,.12);border:0.5px solid rgba(245,200,66,.3);color:var(--gold)" onclick="window.socSendFriendRequest('${userId}','${escAttr(username||'')}',this)">+ В друзья</button>`;
        }
        const followBtnHTML = `<button class="up-btn soc-injected-btn" id="socUpFollowBtn" style="background:rgba(255,255,255,.06);border:0.5px solid rgba(255,255,255,.12);color:var(--t2)" onclick="socToggleFollowInModal('${userId}',this)">${isFollowing ? '👁 Слежу' : '+ Следить'}</button>`;
        actionsEl.insertAdjacentHTML('beforeend', friendBtnHTML + followBtnHTML);
      } catch(e){ console.warn('injectSocialBtns:', e); }
    })();

    // ── KPI ──
    const SVG_ICONS_KPI=[`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="14 9 15.5 4 22 6"/><polyline points="10 9 8.5 4 2 6"/><path d="M4.23 12C2.86 11 2 9.6 2 8c0-3.31 2.69-6 6-6h8c3.31 0 6 2.69 6 6 0 1.6-.86 3-2.23 4"/><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>`];
    const kpis = [
      {v:(totalH<10?totalH.toFixed(1):Math.round(totalH)), l:'Часов',  c:'var(--gold)'},
      {v:streak,            l:'Дисциплина',  c:'#f85149'},
      {v:sessions,          l:'Сессий', c:'var(--blue)'},
      {v:achCount,          l:'Наград', c:'var(--orange)'},
    ];
    const kpiHTML =
      `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:18px">`+
      kpis.map((k,i)=>
        `<div style="background:var(--card);border:0.5px solid rgba(255,255,255,.07);border-left:3px solid ${k.c};border-radius:12px;padding:12px 8px;text-align:center">`+
          `<div style="width:32px;height:32px;border-radius:9px;background:rgba(255,255,255,.06);border:0.5px solid rgba(255,255,255,.09);display:flex;align-items:center;justify-content:center;margin:0 auto 6px;color:${k.c}">${SVG_ICONS_KPI[i]}</div>`+
          `<div style="font-family:'DM Mono',monospace;font-size:20px;font-weight:400;line-height:1;color:${k.c}">${k.v}</div>`+
          `<div style="font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:.5px;margin-top:2px">${k.l}</div>`+
        `</div>`
      ).join('')+`</div>`;

    // ── XP bar ──
    const xpHTML =
      `<div style="margin-bottom:18px;background:linear-gradient(135deg,${lvlColor}10,var(--card));border:0.5px solid ${lvlColor}30;border-radius:12px;padding:14px 16px">`+
        `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">`+
          `<span style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:700;color:${lvlColor}">УР.${lvlInfo.lvl} · ${lvlInfo.name}</span>`+
          `<span style="font-size:11px;color:var(--t3)">ещё ${lvlInfo.xpLeft} ч</span>`+
        `</div>`+
        `<div style="height:6px;background:var(--bg);border-radius:3px;overflow:hidden">`+
          `<div style="height:100%;width:${lvlInfo.pct}%;background:${lvlColor};border-radius:3px;box-shadow:0 0 8px ${lvlColor}88;transition:width 1.2s ease"></div>`+
        `</div>`+
        `<div style="display:flex;justify-content:space-between;margin-top:4px;font-size:10px;color:var(--t3)">`+
          `<span>${lvlInfo.curThresh}ч</span><span>${lvlInfo.pct}%</span><span>${lvlInfo.nextThresh}ч</span>`+
        `</div>`+
      `</div>`;

    // ── Section divider helper ──
    const sec = (ico, lbl) =>
      `<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;margin-top:4px">`+
        `<div style="height:1px;width:20px;background:var(--border-l)"></div>`+
        `<span style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px;color:var(--t3);white-space:nowrap">${ico} ${lbl}</span>`+
        `<div style="height:1px;flex:1;background:var(--border-l)"></div>`+
      `</div>`;

    // ── Leagues ──
    const maxHrs = Math.max(...uc.map(r=>r.hours), 0.1);
    const leagueHTML = uc.length === 0 ? '' :
      `<div style="margin-bottom:18px">${sec('⚔️','ЛИГИ')}`+
      uc.map(row=>{
        const cat = ALL_CATS.find(c=>c.id===row.category_id) || {name:row.category_id,icon:'📌',color:'#888'};
        const pct = Math.min(100,Math.round((row.hours/maxHrs)*100));
        return `<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;margin-bottom:6px;background:${cat.color}0d;border:0.5px solid ${cat.color}30;border-radius:10px">${catIconBox(cat.id,cat.color,28)}<div style="flex:1;min-width:0">`+
            `<div style="font-size:12px;font-weight:700;color:${cat.color}">${cat.name}</div>`+
            `<div style="height:3px;background:var(--bg);border-radius:2px;overflow:hidden;margin-top:5px">`+
              `<div style="height:100%;width:${pct}%;background:${cat.color};border-radius:2px"></div>`+
            `</div>`+
          `</div>`+
          `<div style="font-family:'DM Sans',sans-serif;font-size:18px;font-weight:700;color:${cat.color};flex-shrink:0">${row.hours.toFixed(1)}<span style="font-size:10px;color:var(--t3)"> ч</span></div>`+
        `</div>`;
      }).join('')+`</div>`;

    // ── Achievements ──
    const unlockedDefs = ACH_DEF.filter(d=>achs.find(a=>a.achievement_id===d.id));
    const achHTML = unlockedDefs.length === 0 ? '' :
      `<div style="margin-bottom:18px">${sec('🏅','ДОСТИЖЕНИЯ · '+unlockedDefs.length)}`+
      `<div style="display:flex;flex-wrap:wrap;gap:6px">`+
      unlockedDefs.slice(0,16).map(def=>
        `<div title="${def.name}" style="width:40px;height:40px;border-radius:10px;background:${def.color||'#555'}18;border:0.5px solid ${def.color||'#555'}44;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;transition:transform .15s" `+
        `onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform=''" `+
        `onclick="closeUserProfile();openAch('${def.id}')">${def.icon}</div>`
      ).join('')+
      (unlockedDefs.length>16?`<div style="width:40px;height:40px;border-radius:10px;background:var(--card);border:0.5px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--t3)">+${unlockedDefs.length-16}</div>`:'') +
      `</div></div>`;

    document.getElementById('upLeaguesList').innerHTML = kpiHTML + xpHTML + leagueHTML + achHTML;

  } catch(err){
    console.error('openUserProfile error:', err);
    document.getElementById('upMeta').innerHTML = '<span style="color:var(--red);font-size:12px">Ошибка загрузки</span>';
    document.getElementById('upLeaguesList').innerHTML = '<div style="padding:16px;color:var(--t3);font-size:13px">Не удалось загрузить данные профиля.</div>';
  }
}
function closeUserProfile(){
  document.getElementById('userProfileOv').classList.remove('show');
}

// ── Friend button helpers for profile modal ──────────────────
function _upRefreshFriendBtn(userId){
  const btn = document.getElementById('upFriendBtn');
  if(!btn) return;
  // Hide for own profile or demo
  if(!SB_USER || SB_USER.isDemoUser || SB_USER.id === userId){ btn.style.display='none'; return; }
  btn.style.display = 'inline-flex';
  btn.dataset.targetUser = userId;

  const S = window._SOC;
  if(!S){ return; } // social module not loaded yet

  const isFriend  = S.friends.some(f => f.id === userId);
  const isPendOut = S.pendingOut.some(f => f.id === userId);
  const isPendIn  = S.pendingIn.some(f => f.id === userId);

  if(isFriend){
    btn.style.cssText += ';background:rgba(34,197,94,.1)!important;border-color:rgba(34,197,94,.3)!important;color:var(--green)!important';
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>&nbsp;Уже друзья';
  } else if(isPendOut){
    btn.style.cssText += ';background:rgba(255,255,255,.05)!important;border-color:var(--border)!important;color:var(--t2)!important';
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>&nbsp;Запрос отправлен';
  } else if(isPendIn){
    btn.style.cssText += ';background:rgba(34,197,94,.12)!important;border-color:rgba(34,197,94,.3)!important;color:var(--green)!important';
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>&nbsp;Принять запрос';
  } else {
    btn.style.cssText += ';background:rgba(245,200,66,.12)!important;border-color:rgba(245,200,66,.3)!important;color:var(--gold)!important';
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>&nbsp;В друзья';
  }
}

async function upToggleFriend(){
  const btn = document.getElementById('upFriendBtn');
  if(!btn) return;
  const userId = btn.dataset.targetUser;
  if(!userId || !SB_USER || SB_USER.isDemoUser){ showToast('Недоступно в демо','⚠️'); return; }

  const S = window._SOC;
  if(!S){ showToast('Социальные функции загружаются...','⏳'); return; }

  const isFriend  = S.friends.some(f => f.id === userId);
  const isPendOut = S.pendingOut.some(f => f.id === userId);
  const isPendIn  = S.pendingIn.some(f => f.id === userId);
  const username  = document.getElementById('upName')?.textContent || '?';

  if(isFriend){
    const req = S.friends.find(f => f.id === userId);
    if(confirm('Удалить из друзей?')) await socRemoveFriend(req?.reqId || '', userId);
  } else if(isPendIn){
    const req = S.pendingIn.find(f => f.id === userId);
    if(req) await socAcceptFriend(req.reqId, userId);
  } else if(!isPendOut){
    btn.disabled = true;
    await socSendFriendRequest(userId, username, btn);
    btn.disabled = false;
  }
  _upRefreshFriendBtn(userId);
}

async function refreshLikeBtn(userId){
  const btn = document.getElementById('upLikeBtn');
  const countEl = document.getElementById('upLikeCount');
  if(!SB_USER || !userId){ btn.style.display='none'; return; }
  if(userId === SB_USER.id){ btn.style.display='none'; return; }
  btn.style.display='flex';

  // Get total likes for this user
  const {count} = await sb.from('likes').select('*',{count:'exact',head:true}).eq('to_user_id',userId);
  countEl.textContent = count || 0;

  // Check if current user already liked
  const {data:myLike} = await sb.from('likes')
    .select('id').eq('from_user_id',SB_USER.id).eq('to_user_id',userId).maybeSingle();
  btn.className = 'up-btn' + (myLike ? ' liked' : '');
  btn.innerHTML = (myLike ? '❤️ Нравится ' : '♡ Лайк ') + '<span id="upLikeCount">' + (count||0) + '</span>';
}

// ══ MESSAGES SYSTEM ════════════════════════════════════════
let activeConvUserId = null;
let msgsPolling = null;
let _convsLoading = false;
let _convsCache = null; // instant render cache

async function renderMsgTab(){
  // Show cached version instantly, then refresh in background
  if(_convsCache) _renderConvList(_convsCache);
  loadConversations();
}

function _renderConvList(convs){
  const el = document.getElementById('msgConvList');
  if(!el) return;
  if(!convs || convs.length === 0){
    el.innerHTML = `
      <div class="msg-empty">
        <div class="msg-empty-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
        <div style="font-size:15px;font-weight:700;color:var(--t1);margin-bottom:6px">Нет диалогов</div>
        <div style="font-size:12px;color:var(--t3);line-height:1.6">Открой профиль участника лиги<br>и начни общаться</div>
      </div>`;
    const badge = document.getElementById('msgTabBadge');
    if(badge) badge.style.display='none';
    return;
  }

  el.innerHTML = convs.map((cv,i) => {
    const avHtml = cv.avUrl
      ? `<img src="${cv.avUrl}" class="img-cover" style="border-radius:13px;width:100%;height:100%;object-fit:cover" onerror="this.parentElement.textContent='${escAttr(cv.av||'🎯')}'">` 
      : esc(cv.av || '🎯');
    const isUnread = cv.unread > 0;
    const isActive = cv.userId === activeConvUserId;
    return `
    <div class="msg-conv${isActive?' active':''}${isUnread?' has-unread':''}"
      onclick="openConv('${esc(cv.userId)}','${escAttr(cv.name)}','${escAttr(cv.av||'🎯')}','${escAttr(cv.avUrl||'')}')"
      data-conv-uid="${esc(cv.userId)}"
      style="animation:fadeUp .18s ${i*.03}s ease both">
      <div class="msg-conv-av">
        <div class="msg-conv-av-ring" data-uid="${esc(cv.userId)}">${avHtml}</div>
        ${isUnread ? '<div class="msg-conv-unread-pip"></div>' : ''}
      </div>
      <div class="msg-conv-info">
        <div class="msg-conv-name">${esc(cv.name)}</div>
        <div class="msg-conv-preview${isUnread?' unread-prev':''}">${esc((cv.lastMsg||'').slice(0,42))}${(cv.lastMsg||'').length>42?'…':''}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0">
        <div class="msg-conv-time">${fmtMsgTime(cv.lastTime)}</div>
        ${cv.unread>0?`<div class="msg-conv-badge">${cv.unread>9?'9+':cv.unread}</div>`:''}
      </div>
    </div>`;
  }).join('');

  const totalUnread = convs.reduce((s,c)=>s+c.unread,0);
  const badge = document.getElementById('msgTabBadge');
  if(badge){ badge.style.display=totalUnread>0?'inline':'none'; badge.textContent=totalUnread>9?'9+':totalUnread; }
}

async function loadConversations(){
  const el = document.getElementById('msgConvList');
  if(!el || !SB_USER || _convsLoading) return;
  _convsLoading = true;
  try {
    const {data} = await sb.from('messages')
      .select('id,from_user_id,to_user_id,content,created_at,read')
      .or(`from_user_id.eq.${SB_USER.id},to_user_id.eq.${SB_USER.id}`)
      .order('created_at',{ascending:false})
      .limit(500);

    const partnerIds = new Set();
    const convMap = {};
    (data||[]).forEach(msg => {
      const partnerId = msg.from_user_id === SB_USER.id ? msg.to_user_id : msg.from_user_id;
      partnerIds.add(partnerId);
      if(!convMap[partnerId]){
        convMap[partnerId] = { userId:partnerId, name:'?', av:'🎯', lastMsg:msg.content||'', lastTime:msg.created_at, unread:0 };
      }
      if(msg.to_user_id === SB_USER.id && !msg.read) convMap[partnerId].unread++;
    });

    if(partnerIds.size > 0){
      const ids = [...partnerIds];
      const {data:partnerUsers} = await sb.from('users').select('id,username,avatar,avatar_url').in('id',ids);
      (partnerUsers||[]).forEach(u=>{ if(convMap[u.id]){ convMap[u.id].name=u.username||'?'; convMap[u.id].av=u.avatar||'🎯'; convMap[u.id].avUrl=u.avatar_url||null; }});
    }

    const convs = Object.values(convMap);
    allConvsCache = convs;
    _convsCache = convs;
    _renderConvList(convs);
  } catch(e){ console.warn('loadConversations:', e); }
  finally { _convsLoading = false; }
}

async function openConv(userId, name, av, avUrl){
  try{
    if(window.innerWidth <= 600){
      const chat = document.getElementById('msgChatArea');
      if(chat){chat.style.display='flex';chat.classList.add('active');}
      const list = document.getElementById('msgList');
      if(list) list.style.display='none';
    }
    activeConvUserId = userId;

    // Highlight active in list
    document.querySelectorAll('[data-conv-uid]').forEach(el=>{
      el.classList.toggle('active', el.dataset.convUid===userId);
    });

    const area = document.getElementById('msgChatArea');
    if(!area) return;

    const avDisplay = avUrl
      ? `<img src="${avUrl}" class="img-cover" style="border-radius:11px;width:100%;height:100%;object-fit:cover" onerror="this.parentElement.textContent='${escAttr(av||'🎯')}'">` 
      : esc(av||'🎯');

    area.innerHTML = `
      <div class="msg-chat-head">
        <button class="msg-back-btn" onclick="showMsgListOnMobile()" aria-label="Назад" style="${window.innerWidth<=600?'display:flex':'display:none'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="msg-chat-av">${avDisplay}</div>
        <div class="msg-chat-info">
          <div class="msg-chat-name">${esc(name)}</div>
          <div class="msg-chat-sub" id="msgChatSub">Участник лиги</div>
        </div>
        <button class="msg-chat-btn" onclick="openUserProfile('${esc(userId)}','${escAttr(name)}','${escAttr(av||'')}','${escAttr(avUrl||'')}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Профиль
        </button>
      </div>
      <div class="msg-messages" id="msgMessages">
        <div style="flex:1;display:flex;align-items:center;justify-content:center">
          <div class="msg-typing-bubble" style="border-radius:16px">
            <div class="t-dot"></div><div class="t-dot"></div><div class="t-dot"></div>
          </div>
        </div>
      </div>
      <button class="msg-scroll-down" id="msgScrollDown" onclick="document.getElementById('msgMessages').scrollTo({top:99999,behavior:'smooth'})">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="msg-input-area">
        <div class="msg-input-wrap" id="msgInputWrap">
          <textarea class="msg-input" id="msgInput" placeholder="Сообщение..." rows="1" maxlength="1000"
            onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg('${esc(userId)}')}"
            oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,120)+'px'"
            onfocus="document.getElementById('msgInputWrap')?.classList.add('focused')"
            onblur="document.getElementById('msgInputWrap')?.classList.remove('focused')"
            aria-label="Написать сообщение"></textarea>
          <button class="msg-emoji-btn" onclick="_toggleMsgEmoji()" type="button" title="Emoji">😊</button>
        </div>
        <button class="msg-send" onclick="sendMsg('${esc(userId)}')" aria-label="Отправить" type="button">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>`;

    // Scroll-to-bottom button visibility
    const scrollEl = document.getElementById('msgMessages');
    if(scrollEl){
      scrollEl.addEventListener('scroll', ()=>{
        const btn = document.getElementById('msgScrollDown');
        if(!btn) return;
        const near = scrollEl.scrollHeight - scrollEl.scrollTop - scrollEl.clientHeight < 80;
        btn.classList.toggle('visible', !near);
      }, {passive:true});
    }

    requestAnimationFrame(()=>{
      loadMessages(userId);
      loadConversations();
    });
  }catch(e){
    console.error('openConv:',e);
    showToast('Не удалось открыть диалог','⚠️');
  }
}

async function loadMessages(partnerId){
  const el = document.getElementById('msgMessages');
  if(!el || !SB_USER) return;
  try{
    const [fetchResult] = await Promise.all([
      sb.from('messages')
        .select('id,from_user_id,content,created_at,content_type')
        .or(`and(from_user_id.eq.${SB_USER.id},to_user_id.eq.${partnerId}),and(from_user_id.eq.${partnerId},to_user_id.eq.${SB_USER.id})`)
        .order('created_at',{ascending:true})
        .limit(100),
      sb.from('messages').update({read:true})
        .eq('from_user_id',partnerId).eq('to_user_id',SB_USER.id).eq('read',false)
    ]);
    const data = fetchResult.data;

    [_convsCache, allConvsCache].forEach(cache => {
      if(!cache) return;
      const conv = cache.find(c => c.userId === partnerId);
      if(conv && conv.unread > 0){ conv.unread = 0; }
    });
    if(_convsCache || allConvsCache) _renderConvList(_convsCache || allConvsCache || []);

    const elNow = document.getElementById('msgMessages');
    if(!elNow || activeConvUserId !== partnerId) return;

    if(!data || data.length===0){
      elNow.innerHTML = `
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;text-align:center">
          <div style="font-size:36px;opacity:.3">✉️</div>
          <div style="font-size:14px;font-weight:700;color:var(--t2)">Начни разговор</div>
          <div style="font-size:12px;color:var(--t3)">Напиши первое сообщение!</div>
        </div>`;
      return;
    }

    // Build with grouping + date separators
    const chunks = [];
    let lastDate='', lastSender='', lastTs=0;
    const GAP = 4*60*1000;
    data.forEach((msg,i)=>{
      const mine = msg.from_user_id === SB_USER.id;
      const d = new Date(msg.created_at);
      const isToday = d.toDateString()===new Date().toDateString();
      const isYest  = d.toDateString()===new Date(Date.now()-86400000).toDateString();
      const dateStr = isToday?'Сегодня':isYest?'Вчера':d.toLocaleDateString('ru',{day:'numeric',month:'long'});
      if(dateStr!==lastDate){
        chunks.push(`<div class="msg-date-sep"><div class="msg-date-sep-line"></div><div class="msg-date-sep-label">${dateStr}</div><div class="msg-date-sep-line"></div></div>`);
        lastDate=dateStr; lastSender=''; lastTs=0;
      }
      const senderChg = lastSender!==msg.from_user_id;
      const timeGap   = d.getTime()-lastTs>GAP;
      const grouped   = !senderChg && !timeGap && i>0;
      lastSender=msg.from_user_id; lastTs=d.getTime();

      const ct = msg.content_type||'text', txt=msg.content||'';
      let body;
      if(ct==='image') body=`<img src="${txt}" style="max-width:220px;border-radius:10px;display:block;cursor:pointer" onclick="window.open('${txt}','_blank')">`;
      else if(ct==='voice') body=`<div style="display:flex;align-items:center;gap:8px"><span>🎤</span><audio controls style="max-width:180px;height:30px"><source src="${txt}"></audio></div>`;
      else body=`<span>${esc(txt).replace(/(https?:\/\/[^\s<]+)/g,'<a href="$1" target="_blank" rel="noopener" style="color:inherit;opacity:.8;text-decoration:underline">$1</a>')}</span>`;

      const timeStr=d.toLocaleTimeString('ru',{hour:'2-digit',minute:'2-digit'});
      const ticks=mine?`<span class="msg-ticks"><svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 5L4.5 8.5L9 3" stroke="rgba(9,9,11,0.45)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 5L10.5 8.5L15 3" stroke="rgba(9,9,11,0.45)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`:'';

      chunks.push(`
<div class="msg-row${mine?' mine':' theirs'}" style="margin-top:${grouped?'2px':'10px'}">
  ${!mine?`<div class="msg-av-micro${grouped?' ghost':''}"></div>`:''}
  <div class="msg-bubble${mine?' mine':' theirs'}" data-msg-id="${esc(msg.id)}"
    oncontextmenu="_showRxPopup(event,this)"
    ondblclick="_showRxPopup(event,this)">
    ${body}
    <div class="msg-bubble-time">${timeStr}${ticks}</div>
    <div class="reaction-popup" id="rp-${esc(msg.id)}">
      ${['❤️','🔥','👏','😂','🤔','👍'].map(e=>`<button class="r-pop-btn" onclick="_addRx('${esc(msg.id)}','${e}');event.stopPropagation()" type="button">${e}</button>`).join('')}
    </div>
  </div>
</div>`);
    });

    elNow.innerHTML = chunks.join('');
    elNow.scrollTo({ top: elNow.scrollHeight, behavior: 'smooth' });
  }catch(e){
    console.error('loadMessages:',e);
    const elNow=document.getElementById('msgMessages');
    if(elNow) elNow.innerHTML='<div style="flex:1;display:flex;align-items:center;justify-content:center;color:var(--t3);font-size:13px;padding:32px">Не удалось загрузить сообщения</div>';
  }
}

/* Reaction popup */
function _showRxPopup(e,bub){
  e.preventDefault();
  const id=bub.dataset.msgId; if(!id) return;
  document.querySelectorAll('.reaction-popup.open').forEach(p=>p.classList.remove('open'));
  const p=document.getElementById('rp-'+id); if(!p) return;
  p.classList.add('open');
  setTimeout(()=>document.addEventListener('click',()=>p.classList.remove('open'),{once:true}),20);
}
async function _addRx(msgId,emoji){
  document.querySelectorAll('.reaction-popup.open').forEach(p=>p.classList.remove('open'));
  if(!SB_USER) return;
  try{
    const {data:ex}=await sb.from('message_reactions').select('id').eq('message_id',msgId).eq('user_id',SB_USER.id).eq('emoji',emoji).maybeSingle();
    if(ex){ await sb.from('message_reactions').delete().eq('id',ex.id); showToast('Реакция убрана','👋'); }
    else { await sb.from('message_reactions').insert({message_id:msgId,user_id:SB_USER.id,emoji}); showToast(emoji,''); }
    _refreshRx(msgId);
  }catch(err){ /* table may not exist yet */ }
}
async function _refreshRx(msgId){
  try{
    const {data}=await sb.from('message_reactions').select('emoji,user_id').eq('message_id',msgId);
    const counts={};
    (data||[]).forEach(r=>{if(!counts[r.emoji])counts[r.emoji]={n:0,mine:false};counts[r.emoji].n++;if(r.user_id===SB_USER.id)counts[r.emoji].mine=true;});
    const bub=document.querySelector(`.msg-bubble[data-msg-id="${CSS.escape(msgId)}"]`);
    if(!bub) return;
    let rEl=bub.querySelector('.msg-bubble-reactions');
    if(!rEl){rEl=document.createElement('div');rEl.className='msg-bubble-reactions';bub.insertBefore(rEl,bub.querySelector('.reaction-popup'));}
    rEl.innerHTML=Object.keys(counts).length?Object.entries(counts).map(([e,{n,mine}])=>`<span class="r-pill${mine?' reacted':''}" onclick="_addRx('${msgId}','${e}')">${e}${n>1?`<span class="r-count">${n}</span>`:''}</span>`).join(''):'';
  }catch(e){}
}

/* Emoji mini-picker */
const _EMOJIS=['😊','😂','❤️','🔥','👍','🎉','😭','🙌','✨','💪','🏆','💯','😎','🤯','🫡','👀','🥳','😤','🤝','⚡'];
function _toggleMsgEmoji(){
  const ex=document.getElementById('_msgEmojiPop');
  if(ex){ex.remove();return;}
  const bar=document.querySelector('.msg-input-area');if(!bar)return;
  bar.style.position='relative';
  const pop=document.createElement('div');
  pop.id='_msgEmojiPop';pop.className='msg-emoji-popup';
  pop.innerHTML=_EMOJIS.map(e=>`<button style="font-size:22px;background:none;border:none;cursor:pointer;padding:4px;border-radius:8px;transition:transform .15s" onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform='scale(1)'" onclick="_insEmoji('${e}')">${e}</button>`).join('');
  bar.appendChild(pop);
  setTimeout(()=>document.addEventListener('click',()=>pop.remove(),{once:true}),20);
}
function _insEmoji(e){
  const inp=document.getElementById('msgInput');if(!inp)return;
  const p=inp.selectionStart??inp.value.length;
  inp.value=inp.value.slice(0,p)+e+inp.value.slice(p);
  inp.focus();inp.setSelectionRange(p+e.length,p+e.length);
  document.getElementById('_msgEmojiPop')?.remove();
}

/* Filter convs */
let _fDebounce=null;
function debouncedFilterConvs(q){
  clearTimeout(_fDebounce);
  _fDebounce=setTimeout(()=>{
    const cache=_convsCache||allConvsCache;if(!cache)return;
    const qt=(q||'').trim().toLowerCase();
    _renderConvList(qt?cache.filter(c=>(c.name||'').toLowerCase().includes(qt)):cache);
  },180);
}

function openChatWithUser(){
  const ov = document.getElementById('userProfileOv');
  const userId = ov.dataset.userId;
  const name = ov.dataset.userName;
  const av = ov.dataset.userAv;
  closeUserProfile();
  showTab('messages');
  setTimeout(()=>openConv(userId, name, av), 150);
}

function fmtMsgTime(iso){
  const d = new Date(iso);
  const now = new Date();
  const diff = now - d;
  if(diff < 86400000) return d.toLocaleTimeString('ru',{hour:'2-digit',minute:'2-digit'});
  if(diff < 604800000) return d.toLocaleDateString('ru',{weekday:'short'});
  return d.toLocaleDateString('ru',{day:'numeric',month:'short'});
}


// ══ QUICK TIMER ══════════════════════════════════════════════
// ══ POMODORO + DAILY GOAL ════════════════════════════════════
let pomMode = 0; // 0 = free, N = minutes
let pomEndTime = 0;
let dailyGoalHours = parseFloat(localStorage.getItem('dtr_daily_goal') || '2');

function setPomFromSel(sel) {
  const mins = parseInt(sel.value) || 0;
  if (timerRunning) { sel.value='0'; return; }
  const freeBtn = document.getElementById('pomFreeBtn');
  if (mins === 0) {
    // Reset to free
    if (freeBtn) { freeBtn.classList.add('active'); sel.style.borderColor='var(--border)'; sel.style.color='var(--t3)'; }
    setPomMode(0, freeBtn || sel);
  } else {
    if (freeBtn) freeBtn.classList.remove('active');
    sel.style.borderColor='var(--gold)'; sel.style.color='var(--gold)';
    pomMode = mins;
    const disp = document.getElementById('qDisp');
    const m2 = Math.floor(mins/60), s2 = mins%60;
    const lbl = s2>0?`${String(m2).padStart(2,'0')}:${String(s2).padStart(2,'0')}:00`:`${String(mins).padStart(2,'0')}:00:00`;
    if (disp) { disp.textContent=lbl; disp.style.color='var(--gold)'; disp.style.textShadow='0 0 32px rgba(245,200,66,.4)'; }
  }
}

function setPomMode(mins, btn) {
  if (timerRunning) return; // can't change mode while running
  pomMode = mins;
  document.querySelectorAll('.pom-btn,.timer-mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Reset dropdown
  const sel = document.getElementById('pomTimeSel');
  if (sel) { sel.value='0'; sel.style.borderColor='var(--border)'; sel.style.color='var(--t3)'; }
  const disp = document.getElementById('qDisp');
  if (mins === 0) {
    if (disp) { disp.textContent = '00:00:00'; disp.style.color = ''; disp.style.textShadow = ''; }
  } else {
    // Show countdown in same big display, gold + pom note
    const m = Math.floor(mins / 60), s = mins % 60;
    const label = s > 0 ? `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}:00` : `${String(mins).padStart(2,'0')}:00:00`;
    if (disp) { disp.textContent = label; disp.style.color = 'var(--gold)'; disp.style.textShadow = '0 0 32px rgba(245,200,66,.4)'; }
  }
}

function updatePomRing(remaining, total) {
  const circle = document.getElementById('pomCircle');
  const countdown = document.getElementById('pomCountdown');
  if (!circle) return;
  const circumference = 264;
  const filled = (remaining / total) * circumference;
  circle.style.strokeDashoffset = circumference - filled;
  if (countdown) {
    const m = Math.floor(remaining / 60), s = remaining % 60;
    countdown.textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  }
}

function setDailyGoal(val) {
  dailyGoalHours = parseFloat(val);
  localStorage.setItem('dtr_daily_goal', val);
  renderDailyProgress();
}

function renderDailyProgress() {
  if (!P) return;
  // Sum hours from today's sessions
  // FIX: use local timestamp range instead of UTC string (timezone-safe)
  const _todayStart=new Date();_todayStart.setHours(0,0,0,0);
  const todaySecs = P.sessions
    .filter(s => {
      const t = sessTs(s);
      return t >= _todayStart.getTime();
    })
    .reduce((sum, s) => sum + s.dur, 0);
  const todayH = Math.round(todaySecs / 3600 * 10) / 10;
  const goal = dailyGoalHours;
  const pct = Math.min(100, Math.round((todayH / goal) * 100));
  const circumference = 176;
  const fill = document.getElementById('dailyRingFill');
  if (fill) fill.style.strokeDashoffset = circumference - (circumference * pct / 100);
  const pctEl = document.getElementById('dailyRingPct');
  if (pctEl) pctEl.textContent = pct + '%';
  const doneEl = document.getElementById('dailyDoneLabel');
  if (doneEl) doneEl.textContent = todayH.toFixed(1) + ' ч';
  const goalEl = document.getElementById('dailyGoalLabel');
  if (goalEl) goalEl.textContent = 'из ' + goal + ' ч';
  const bar = document.getElementById('dailyProgressBar');
  if (bar) bar.style.width = pct + '%';
  const msg = document.getElementById('dailyProgressMsg');
  if (msg) {
    if (pct >= 100) msg.textContent = '🎉 Цель выполнена! Отличная работа!';
    else if (pct >= 75) msg.textContent = '💪 Почти готово! Ещё ' + (goal - todayH).toFixed(1) + ' ч';
    else if (pct >= 50) msg.textContent = '🔥 Половина пути! Ещё ' + (goal - todayH).toFixed(1) + ' ч';
    else if (pct > 0) msg.textContent = '⏳ В пути. Осталось ' + (goal - todayH).toFixed(1) + ' ч до цели';
    else msg.textContent = '🚀 Начни сессию чтобы двигаться к цели!';
  }
  // Colour ring red when behind schedule
  const hourOfDay = new Date().getHours();
  const expectedPct = Math.min(100, Math.round((hourOfDay / 24) * 100));
  if (fill) fill.style.stroke = pct < expectedPct * 0.5 ? 'var(--red)' : 'var(--gold)';
  // Set goal selector to current value
  const sel = document.getElementById('dailyGoalSel');
  if (sel) sel.value = String(goal);
}

// ══════════════════════════════════════════════════════════════
// BULLETPROOF TIMER — requestAnimationFrame + localStorage
// Survives: tab switching, device sleep, background throttling
// ══════════════════════════════════════════════════════════════
const TIMER_KEY = 'dtr_timer_v2';
let quickSel = null;
let timerRAF = null; // kept for compatibility
let timerRunning = false;
let timerPaused = false;
let _pausedElapsed = 0; // seconds accumulated before pause

// Timer — простой setInterval (Worker заблокирован CSP Vercel)
let _timerWorker = null;
let _timerInterval = null;
function _getTimerWorker() {
  // Возвращаем фейковый объект с тем же API что и Worker
  if (_timerWorker) return _timerWorker;
  _timerWorker = {
    postMessage(msg) {
      if (msg === 'start') {
        if (_timerInterval) clearInterval(_timerInterval);
        _timerInterval = setInterval(() => timerTick(), 1000);
      } else if (msg === 'stop') {
        if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }
      }
    },
    terminate() {
      if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }
      _timerWorker = null;
    }
  };
  return _timerWorker;
}

const defCat = () => P.activeCatIds[0] || P.categories[0]?.id;

function getTimerState() {
  try { return JSON.parse(localStorage.getItem(TIMER_KEY) || 'null'); }
  catch { return null; }
}
function setTimerState(state) {
  if (state) localStorage.setItem(TIMER_KEY, JSON.stringify(state));
  else localStorage.removeItem(TIMER_KEY);
}
function getElapsed() {
  if (timerPaused) return _pausedElapsed;
  const s = getTimerState();
  if (!s || !s.startTime) return _pausedElapsed;
  return _pausedElapsed + Math.floor((Date.now() - s.startTime) / 1000);
}

// NOTE: beforeunload save removed — caused duplicate sessions on reload.
// Timer state is preserved in localStorage; user stops it manually.

function renderQuickCats() {
  if (!quickSel) quickSel = defCat();
  document.getElementById('quickCats').innerHTML =
    ALL_CATS.filter(c => P.activeCatIds.includes(c.id)).map(c =>
      `<button class="tc-b ${c.id === quickSel ? 'sel' : ''}" onclick="selCat('${c.id}')" title="${c.name}"
        style="${c.id === quickSel ? `border-color:${c.color};background:${c.color}18;box-shadow:0 0 0 2px ${c.color}28` : ''}">
        <span style="display:flex;align-items:center;justify-content:center;width:20px;height:20px;color:${c.id===quickSel?c.color:'var(--t2)'}">
          ${(ICONS[c.id] || '').replace(/width="20" height="20"/, 'width="18" height="18"') || `<span style="font-size:16px">${c.icon}</span>`}
        </span>
        <span style="font-size:8.5px;font-weight:700;color:${c.id===quickSel?c.color:'var(--t3)'};letter-spacing:.3px;max-width:50px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:center">${c.name.slice(0,6)}</span>
      </button>`
    ).join('');
  // Populate league selector
  // Update league picker button label
  const tls = document.getElementById('timerLeagueSel');
  if(tls) {
    const selCat = quickSel ? ALL_CATS.find(c => c.id === quickSel) : null;
    const iconEl = document.getElementById('timerLeagueSelIcon');
    const lblEl  = document.getElementById('timerLeagueSelLabel');
    // Default SVG icon when nothing selected
    const _defaultSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="3" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21" y2="12"/></svg>';
    if(selCat) {
      // Use SVG from ICONS map, fallback to emoji
      const svgIcon = (typeof ICONS !== 'undefined' && ICONS[selCat.id])
        ? ICONS[selCat.id].replace(/width="20" height="20"/, 'width="18" height="18"')
        : `<span style="font-size:17px">${selCat.icon}</span>`;
      if(iconEl) iconEl.innerHTML = svgIcon;
      if(lblEl)  lblEl.textContent = selCat.name.toUpperCase();
      tls.style.borderColor = selCat.color || 'var(--gold)';
      tls.style.color       = selCat.color || 'var(--gold)';
      tls.style.background  = (selCat.color || '#F5C842') + '14';
    } else {
      if(iconEl) iconEl.innerHTML = _defaultSVG;
      if(lblEl)  lblEl.textContent = 'ВЫБРАТЬ ЛИГУ';
      tls.style.borderColor = 'rgba(245,200,66,.18)';
      tls.style.color       = 'var(--t1)';
      tls.style.background  = 'rgba(245,200,66,.05)';
    }
  }
}

// selCatFromTimer replaced by league picker button
function selCat(id) { if (timerRunning) return; quickSel = id; renderQuickCats(); }

function timerTick() {
  if (!timerRunning) return;
  const secs = getElapsed();
  updateNavTimerPill(); // keep pill in sync every tick
  if (pomMode === 0) {
    const disp = document.getElementById('qDisp');
    if (disp) disp.textContent = fmt(secs);
  } else {
    const remaining = Math.max(0, pomMode * 60 - secs);
    const disp2 = document.getElementById('qDisp');
    if (disp2) disp2.textContent = fmt(remaining);
    if (remaining === 0) {
      const catId = getTimerState()?.catId || quickSel;
      const _pomSecs = pomMode * 60; // capture before stopTimerPom resets state
      stopTimerPom(); // sets timerRunning=false AND stops interval
      saveSession(catId, _pomSecs);
      const _toastMsg = '🍅 Помодоро завершён! ' + pomMode + ' мин зачтено';
      showToast(_toastMsg, '🎉');
      // Browser Notification если вкладка не активна
      if(document.hidden && Notification.permission === 'granted'){
        new Notification('DTR — Помодоро завершён! 🍅', {
          body: pomMode + ' мин засчитано. Отличная работа!',
          icon: '/favicon.ico',
          tag: 'pom-done'
        });
      } else if(Notification.permission === 'default'){
        Notification.requestPermission().then(p => {
          if(p === 'granted'){
            new Notification('DTR — Помодоро завершён! 🍅', {
              body: pomMode + ' мин засчитано.',
              icon: '/favicon.ico',
              tag: 'pom-done'
            });
          }
        });
      }
      return;
    }
  }
}

function startTimerInterval() {
  timerTick(); // immediate tick
  _getTimerWorker().postMessage('start');
}
function stopTimerInterval() {
  if (_timerWorker) _timerWorker.postMessage('stop');
}

function _setTimerUI(state){ // state: 'idle' | 'running' | 'paused'
  const startBtn = document.getElementById('qBtn');
  const pauseBtn = document.getElementById('qPauseBtn');
  const stopBtn  = document.getElementById('qStopBtn');
  const pauseIco = document.getElementById('qPauseIcon');
  const disp     = document.getElementById('qDisp');
  const note     = document.getElementById('qNote');
  const fab      = document.querySelector('.timer-center-fab');

  if(state === 'idle'){
    if(startBtn){ startBtn.style.display='flex'; startBtn.querySelector('span').textContent='Старт';
      startBtn.querySelector('svg').innerHTML='<polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>';
      startBtn.style.background='';
      startBtn.style.animation='startBreath 2.8s ease-in-out infinite'; }
    if(pauseBtn) pauseBtn.style.display='none';
    if(stopBtn)  stopBtn.style.display='none';
    if(disp){ disp.classList.remove('run','paused'); disp.textContent='00:00:00'; }
    if(note) note.textContent='Выбери активность и нажми Старт';
    if(fab){ fab.classList.remove('running'); fab.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>'; }
    setTimeout(updateNavTimerPill, 80);
  }
  else if(state === 'running'){
    if(startBtn) startBtn.style.display='none';
    if(pauseBtn){ pauseBtn.style.display='flex'; pauseBtn.classList.remove('paused'); }
    if(stopBtn)  stopBtn.style.display='flex';
    if(pauseIco) pauseIco.innerHTML='<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
    const qPL=document.getElementById('qPauseLabel');if(qPL)qPL.textContent='Пауза';
    if(disp){ disp.classList.add('run'); disp.classList.remove('paused'); }
    if(note) note.textContent='Сессия идёт... · Нажми ⏸ чтобы сделать паузу';
    if(fab){ fab.classList.add('running'); fab.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>'; }
    setTimeout(updateNavTimerPill, 80);
  }
  else if(state === 'paused'){
    if(startBtn){ startBtn.style.display='flex'; startBtn.querySelector('span').textContent='Продолжить';
      startBtn.querySelector('svg').innerHTML='<polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>';
      startBtn.style.background='linear-gradient(135deg,#1a6e3a,#16a34a,#15803d)';
      startBtn.style.animation='startBreath 2.8s ease-in-out infinite'; }
    if(pauseBtn) pauseBtn.style.display='none';
    if(stopBtn)  stopBtn.style.display='flex';
    if(disp){ disp.classList.remove('run'); disp.classList.add('paused'); }
    if(note) note.textContent='Пауза · Нажми Продолжить';
    if(fab){ fab.classList.remove('running'); fab.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>'; }
  }
}

// ── Haptic feedback (mobile vibration, no-op on desktop) ──
function haptic(type) {
  if (!navigator.vibrate) return;
  switch(type) {
    case 'light':   navigator.vibrate(10); break;
    case 'medium':  navigator.vibrate(20); break;
    case 'heavy':   navigator.vibrate(40); break;
    case 'success': navigator.vibrate([15, 50, 15]); break;
    default:        navigator.vibrate(15);
  }
}

// ── Sync timer display every 500ms (mobile & tab) ──
let _mTimerSyncInterval = null;
function syncMobileTimerDisplay() {
  if (!timerRunning && !timerPaused) return;
  const disp = document.getElementById('qDisp');
  if (!disp) return;
  const secs = getElapsed();
  if (pomMode > 0) {
    const remaining = Math.max(0, pomMode * 60 - secs);
    disp.textContent = fmt(remaining);
  } else {
    disp.textContent = fmt(secs);
  }
  updateNavTimerPill();
}

// ── Update timer tab UI state after restore ──
function updateTimerTabState() {
  if (timerRunning) {
    _setTimerUI('running');
  } else if (timerPaused) {
    _setTimerUI('paused');
  } else {
    _setTimerUI('idle');
  }
}

// ── Open timer on mobile (scroll to timer panel) ──
function openMobileTimerSheet() {
  showTab('dash');
  setTimeout(() => {
    const el = document.querySelector('.timer-panel') || document.getElementById('qDisp');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 150);
}

// ── Command Palette ────────────────────────────────────────────
// ── COMMAND PALETTE — Apple Spotlight ──────────────────────────
// ── SVG icon set for command palette ──────────────────────────
const _CMD_ICONS = {
  dash:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`,
  leagues:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21H5a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2h-3"/><circle cx="12" cy="7" r="4"/><polyline points="8 21 12 17 16 21"/></svg>`,
  activity: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  achieve:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  manage:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  messages: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  social:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  knowledge:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  habits:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  learn:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  timer:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>`,
  pause:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`,
  stop:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>`,
  theme:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  settings: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  logout:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  profile:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  search:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  play:     `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  collab:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
};

const CMD_LIST = [
  // ── Навигация ──────────────────────────────────────────────────
  { cat:'Навигация', label:'Дашборд',              desc:'Статистика, прогресс, KPI',          icon:_CMD_ICONS.dash,      color:'c-blue',   shortcut:'1', action:()=>showTab('dash') },
  { cat:'Навигация', label:'Арена',                desc:'Лиги, рейтинги, соревнования',       icon:_CMD_ICONS.leagues,   color:'c-red',    shortcut:'2', action:()=>showTab('leagues') },
  { cat:'Навигация', label:'История сессий',       desc:'Все прошлые записи',                  icon:_CMD_ICONS.activity,  color:'c-purple', shortcut:'3', action:()=>showTab('activity') },
  { cat:'Навигация', label:'Награды',              desc:'Достижения и трофеи',                 icon:_CMD_ICONS.achieve,   color:'c-gold',   shortcut:'4', action:()=>showTab('achievements') },
  { cat:'Навигация', label:'Управление лигами',    desc:'Включить / выключить категории',      icon:_CMD_ICONS.manage,    color:'c-orange', shortcut:'5', action:()=>showTab('manage') },
  { cat:'Навигация', label:'Сообщения',            desc:'Чат с участниками клуба',             icon:_CMD_ICONS.messages,  color:'c-cyan',   shortcut:'6', action:()=>showTab('messages') },
  { cat:'Навигация', label:'Социальное',           desc:'Лента, друзья, подписки',             icon:_CMD_ICONS.social,    color:'c-green',  shortcut:'7', action:()=>showTab('social') },
  { cat:'Навигация', label:'База знаний',          desc:'Статьи, заметки, материалы клуба',    icon:_CMD_ICONS.knowledge, color:'c-blue',   shortcut:'8', action:()=>showTab('knowledge') },
  { cat:'Навигация', label:'Привычки',             desc:'Трекер ежедневных привычек',          icon:_CMD_ICONS.habits,    color:'c-green',  shortcut:'9', action:()=>showTab('habits') },
  { cat:'Навигация', label:'Обучающие материалы',  desc:'Видео, авторы, категории курсов',     icon:_CMD_ICONS.learn,     color:'c-purple', shortcut:'0', action:()=>showTab('learn') },
  // ── Таймер ────────────────────────────────────────────────────
  { cat:'Таймер', label:'Запустить сессию',        desc:'Старт таймера на дашборде',           icon:_CMD_ICONS.play,      color:'c-gold',   shortcut:'T', action:()=>{ showTab('dash'); setTimeout(toggleQuick,200); } },
  { cat:'Таймер', label:'Поставить на паузу',      desc:'Пауза текущего таймера',              icon:_CMD_ICONS.pause,     color:'c-orange', action:()=>{ if(typeof pauseTimer==='function') pauseTimer(); } },
  { cat:'Таймер', label:'Остановить таймер',       desc:'Завершить сессию и сохранить',        icon:_CMD_ICONS.stop,      color:'c-red',    action:()=>{ if(typeof stopTimer==='function') stopTimer(); } },

  // ── Аккаунт ───────────────────────────────────────────────────
  { cat:'Аккаунт', label:'Выйти из аккаунта',      desc:'Завершить сеанс',                     icon:_CMD_ICONS.logout,    color:'c-red',    action:()=>doLogout() },
];

let _cmdIdx = -1;
let _cmdCloseTimer = null;

function openCmdPalette() {
  const pal = document.getElementById('cmdPalette');
  if (!pal) return;
  clearTimeout(_cmdCloseTimer);
  pal.classList.remove('closing');
  pal.style.display = 'flex';
  _cmdIdx = -1;
  filterCmds('');
  // Trigger animation on next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      pal.classList.add('open');
      const inp = document.getElementById('cmdInput');
      if (inp) { inp.value = ''; inp.focus(); }
    });
  });
}

function closeCmdPalette() {
  const pal = document.getElementById('cmdPalette');
  if (!pal) return;
  pal.classList.remove('open');
  pal.classList.add('closing');
  _cmdIdx = -1;
  _cmdCloseTimer = setTimeout(() => {
    pal.style.display = 'none';
    pal.classList.remove('closing');
  }, 180);
}

function filterCmds(q) {
  const list = document.getElementById('cmdList');
  if (!list) return;
  const lower = (q || '').toLowerCase().trim();

  const filtered = lower
    ? CMD_LIST.filter(c =>
        c.label.toLowerCase().includes(lower) ||
        (c.desc || '').toLowerCase().includes(lower) ||
        c.cat.toLowerCase().includes(lower)
      )
    : CMD_LIST;

  _cmdIdx = -1;
  list._filtered = filtered;

  if (!filtered.length) {
    list.innerHTML = `
      <div class="cmd-empty">
        <div class="cmd-empty-icon">🔍</div>
        <div>Ничего не найдено по «${q}»</div>
      </div>`;
    return;
  }

  // Group by category
  const groups = {};
  filtered.forEach((c, i) => {
    if (!groups[c.cat]) groups[c.cat] = [];
    groups[c.cat].push({ ...c, _idx: i });
  });

  let html = '';
  let itemDelay = 0; // stagger delay counter
  const cats = Object.keys(groups);
  cats.forEach((cat, gi) => {
    html += `<div class="cmd-group-label" style="animation-delay:${itemDelay * 22}ms">${cat}</div>`;
    itemDelay++;
    groups[cat].forEach(c => {
      const shortcutHtml = c.shortcut
        ? `<span class="cmd-item-shortcut">${c.shortcut}</span>`
        : '';
      const descHtml = c.desc
        ? `<div class="cmd-item-desc">${c.desc}</div>`
        : '';
      // SVG icons render as HTML; emoji icons render as text
      const isHtml = c.icon && c.icon.trim().startsWith('<');
      const iconInner = isHtml ? c.icon : `<span style="font-size:16px;line-height:1">${c.icon}</span>`;
      html += `
        <div class="cmd-item" data-idx="${c._idx}"
          style="animation-delay:${itemDelay * 22}ms"
          onmouseenter="_cmdHover(this)"
          onmouseleave="_cmdUnhover(this)"
          onclick="_execCmd(${c._idx})">
          <div class="cmd-item-icon-box ${c.color}" style="display:flex;align-items:center;justify-content:center">${iconInner}</div>
          <div class="cmd-item-text">
            <div class="cmd-item-label">${c.label}</div>
            ${descHtml}
          </div>
          ${shortcutHtml}
        </div>`;
      itemDelay++;
    });
    if (gi < cats.length - 1) html += '<div class="cmd-divider"></div>';
  });

  list.innerHTML = html;
}

function _cmdHover(el) {
  document.querySelectorAll('#cmdList .cmd-item').forEach(x => x.classList.remove('selected'));
  el.classList.add('selected');
  const idx = parseInt(el.dataset.idx, 10);
  const list = document.getElementById('cmdList');
  const filtered = list?._filtered || [];
  _cmdIdx = filtered.findIndex(c => c._idx === idx);
}
function _cmdUnhover(el) { el.classList.remove('selected'); }

function _execCmd(idx) {
  const list = document.getElementById('cmdList');
  const filtered = list?._filtered || CMD_LIST;
  const item = filtered.find(c => c._idx === idx) || filtered[idx];
  if (item) { closeCmdPalette(); setTimeout(() => item.action(), 120); }
}

function cmdKeyNav(e) {
  const list = document.getElementById('cmdList');
  const filtered = list?._filtered || [];
  const items = list?.querySelectorAll('.cmd-item') || [];
  const len = items.length;

  if (e.key === 'Escape') { e.preventDefault(); closeCmdPalette(); return; }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    _cmdIdx = _cmdIdx < len - 1 ? _cmdIdx + 1 : 0;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    _cmdIdx = _cmdIdx > 0 ? _cmdIdx - 1 : len - 1;
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (_cmdIdx >= 0 && items[_cmdIdx]) {
      const idx = parseInt(items[_cmdIdx].dataset.idx, 10);
      _execCmd(idx);
    }
    return;
  } else { return; }

  items.forEach((el, i) => {
    el.classList.toggle('selected', i === _cmdIdx);
  });
  items[_cmdIdx]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

// Close palette on Escape globally
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCmdPalette();
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openCmdPalette(); }
});



// ══════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
// PREMIUM SOUND ENGINE v2
// ══════════════════════════════════════════════════════════════
let _audioCtx = null;
let _ambientNode = null;
let _ambientGain = null;
let _ambientType = 'white';
let _ambientOn = false;
let _rainAudio = null;
let _currentTrack = null;

function _getAudioCtx() {
  if (!_audioCtx || _audioCtx.state === 'closed')
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (_audioCtx.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}

// ── SVG icon library ─────────────────────────────────────────
const SVGI = {
  freq:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h3l3-8 4 16 3-8h3l2 0"/></svg>`,
  classic: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  nature:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="8" y1="13" x2="8" y2="15"/><line x1="16" y1="19" x2="16" y2="21"/><line x1="12" y1="15" x2="12" y2="17"/></svg>`,
  hz432:   `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/></svg>`,
  hz528:   `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="22"/><line x1="2" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="22" y2="12"/></svg>`,
  hz963:   `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z"/><circle cx="12" cy="12" r="2"/></svg>`,
  piano:   `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="7" y1="5" x2="7" y2="14"/><line x1="12" y1="5" x2="12" y2="14"/><line x1="17" y1="5" x2="17" y2="14"/></svg>`,
  strings: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  ambient: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 22V12M12 12C12 12 7 9 7 5a5 5 0 0 1 10 0c0 4-5 7-5 7z"/></svg>`,
  rain:    `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><line x1="8" y1="19" x2="8" y2="21"/><line x1="8" y1="13" x2="8" y2="15"/><line x1="16" y1="19" x2="16" y2="21"/><line x1="16" y1="13" x2="16" y2="15"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="12" y1="15" x2="12" y2="17"/></svg>`,
  forest:  `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 22v-7"/><path d="M12 15l-5-5h10l-5 5z"/><path d="M12 10l-4-5h8l-4 5z"/></svg>`,
  ocean:   `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M2 18c.6.5 1.2 1 2.5 1C7 19 7 17 9.5 17s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/></svg>`,
  play:    `<svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  pause:   `<svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`,
};

const SOUND_TRACKS = {
  freq: [
    { id:'hz432', label:'432 Гц', sub:'Гармония природы',  svgKey:'hz432' },
    { id:'hz528', label:'528 Гц', sub:'Трансформация',     svgKey:'hz528' },
    { id:'hz963', label:'963 Гц', sub:'Активация',         svgKey:'hz963' },
  ],
  classic: [
    { id:'piano',   label:'Фортепиано', sub:'Мягкие аккорды', svgKey:'piano'   },
    { id:'strings', label:'Струнные',   sub:'Виолончель',      svgKey:'strings' },
    { id:'ambient', label:'Ambient Pad',sub:'Медитативный',    svgKey:'ambient' },
  ],
  nature: [
    { id:'rain',   label:'Дождь', sub:'Осенний ливень', svgKey:'rain'   },
    { id:'forest', label:'Лес',   sub:'Птицы и ветер',  svgKey:'forest' },
    { id:'ocean',  label:'Океан', sub:'Морской прибой', svgKey:'ocean'  },
  ],
};

function _makeSound(id) {
  const ctx = _getAudioCtx();
  const sr = ctx.sampleRate, len = sr * 4;
  const mG = ctx.createGain(); mG.gain.value = 0; mG.connect(ctx.destination);
  const nodes = [];
  const wh = n => { const d=new Float32Array(n); for(let i=0;i<n;i++) d[i]=Math.random()*2-1; return d; };
  const br = n => { const d=new Float32Array(n); let l=0; for(let i=0;i<n;i++){const w=Math.random()*2-1;d[i]=(l+.02*w)/1.02;l=d[i];d[i]*=3.5;} return d; };
  const bS = (ch,n) => { const b=ctx.createBuffer(ch,ch===1?n:ch,sr); (Array.isArray(n)?n:[n]).forEach((d,i)=>b.getChannelData(i).set(d)); const s=ctx.createBufferSource(); s.buffer=b; s.loop=true; return s; };

  if (id==='hz432'||id==='hz528'||id==='hz963') {
    const hz={hz432:432,hz528:528,hz963:963}[id];
    const L=new Float32Array(len),R=new Float32Array(len);
    for(let i=0;i<len;i++){const t=i/sr;L[i]=Math.sin(2*Math.PI*hz*t)*.28+Math.sin(2*Math.PI*hz*2*t)*.06;R[i]=Math.sin(2*Math.PI*(hz+0.3)*t)*.28+Math.sin(2*Math.PI*(hz+0.3)*2*t)*.06;}
    const b=ctx.createBuffer(2,len,sr);b.getChannelData(0).set(L);b.getChannelData(1).set(R);
    const s=ctx.createBufferSource();s.buffer=b;s.loop=true;s.connect(mG);s.start();nodes.push(s);
  } else if (id==='piano') {
    [261.63,329.63,392,523.25].forEach((f,fi)=>{
      const d=new Float32Array(len);for(let i=0;i<len;i++){const t=i/sr;const dec=Math.exp(-t*.35);d[i]=Math.sin(2*Math.PI*f*t)*dec*.14+Math.sin(2*Math.PI*f*2*t)*dec*.05;}
      const b=ctx.createBuffer(1,len,sr);b.getChannelData(0).set(d);
      const s=ctx.createBufferSource();s.buffer=b;s.loop=true;
      const g=ctx.createGain();g.gain.value=.55;s.connect(g);g.connect(mG);
      setTimeout(()=>s.start(),fi*500);nodes.push(s,g);
    });
  } else if (id==='strings') {
    [130.81,196,261.63].forEach(f=>{
      const d=new Float32Array(len);for(let i=0;i<len;i++){const t=i/sr;const v=1+.003*Math.sin(2*Math.PI*5.5*t);d[i]=Math.sin(2*Math.PI*f*v*t)*.16+Math.sin(2*Math.PI*f*2*v*t)*.06+Math.sin(2*Math.PI*f*3*v*t)*.03;}
      const b=ctx.createBuffer(1,len,sr);b.getChannelData(0).set(d);
      const s=ctx.createBufferSource();s.buffer=b;s.loop=true;
      const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1000;
      const g=ctx.createGain();g.gain.value=.6;
      s.connect(lp);lp.connect(g);g.connect(mG);s.start();nodes.push(s,lp,g);
    });
  } else if (id==='ambient') {
    [220,277.18,329.63,440].forEach((f,fi)=>{
      const d=new Float32Array(len);for(let i=0;i<len;i++){const t=i/sr;const sw=.5+.5*Math.sin(2*Math.PI*.04*t+fi);d[i]=Math.sin(2*Math.PI*f*t)*sw*.1+Math.sin(2*Math.PI*f*2*t)*sw*.03;}
      const b=ctx.createBuffer(1,len,sr);b.getChannelData(0).set(d);
      const s=ctx.createBufferSource();s.buffer=b;s.loop=true;
      const g=ctx.createGain();g.gain.value=.5;s.connect(g);g.connect(mG);s.start();nodes.push(s,g);
    });
  } else if (id==='rain') {
    const d=new Float32Array(sr*3);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(.25+Math.random()*.12);
    const b=ctx.createBuffer(1,d.length,sr);b.getChannelData(0).set(d);
    const s=ctx.createBufferSource();s.buffer=b;s.loop=true;
    const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1000;
    s.connect(lp);lp.connect(mG);s.start();nodes.push(s,lp);
  } else if (id==='forest') {
    const d=br(len);const b=ctx.createBuffer(1,len,sr);b.getChannelData(0).set(d);
    const s=ctx.createBufferSource();s.buffer=b;s.loop=true;
    const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=600;bp.Q.value=.5;
    const g=ctx.createGain();g.gain.value=.38;s.connect(bp);bp.connect(g);g.connect(mG);s.start();nodes.push(s,bp,g);
    const ch=()=>{const o=ctx.createOscillator();const cg=ctx.createGain();o.frequency.value=2200+Math.random()*1200;cg.gain.setValueAtTime(0,ctx.currentTime);cg.gain.linearRampToValueAtTime(.055,ctx.currentTime+.04);cg.gain.linearRampToValueAtTime(0,ctx.currentTime+.18);o.connect(cg);cg.connect(mG);o.start();o.stop(ctx.currentTime+.2);setTimeout(ch,2500+Math.random()*7000);};
    setTimeout(ch,800);
  } else if (id==='ocean') {
    const d=br(len);const b=ctx.createBuffer(1,len,sr);b.getChannelData(0).set(d);
    const s=ctx.createBufferSource();s.buffer=b;s.loop=true;
    const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=450;
    const osc=ctx.createOscillator();osc.frequency.value=.07;
    const mod=ctx.createGain();mod.gain.value=.4;const amp=ctx.createGain();amp.gain.value=.5;
    osc.connect(mod);mod.connect(amp.gain);s.connect(lp);lp.connect(amp);amp.connect(mG);s.start();osc.start();nodes.push(s,lp,osc,mod,amp);
  }
  return { masterGain: mG, nodes };
}

let _trackHandle = null;
function stopTrack() {
  if (_trackHandle) {
    const { masterGain, nodes } = _trackHandle;
    const ctx = _getAudioCtx();
    try { masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime+.5); } catch{}
    setTimeout(()=>{ nodes.forEach(n=>{try{n.stop?.();}catch{}try{n.disconnect();}catch{}});try{masterGain.disconnect();}catch{};}, 600);
    _trackHandle = null;
  }
  _currentTrack = null; _ambientOn = false;
}
function playTrack(id) {
  stopTrack();
  const ctx = _getAudioCtx();
  const h = _makeSound(id);
  h.masterGain.gain.setValueAtTime(0, ctx.currentTime);
  h.masterGain.gain.linearRampToValueAtTime(.34, ctx.currentTime+1);
  _trackHandle = h; _currentTrack = id; _ambientOn = true;
}
function toggleTrack(id) {
  if (_currentTrack === id) { stopTrack(); } else { playTrack(id); }
  _renderSoundTracks(document.querySelector('.sound-cat.active')?.dataset.cat || 'freq');
}

let _soundCat = 'freq';
function setSoundCat(cat, btn) {
  _soundCat = cat;
  document.querySelectorAll('.sound-cat').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  _renderSoundTracks(cat);
}
function _renderSoundTracks(cat) {
  const el = document.getElementById('soundTracks'); if(!el) return;
  el.innerHTML = (SOUND_TRACKS[cat]||[]).map(t => {
    const on = _currentTrack === t.id;
    return `<button class="snd-row${on?' snd-on':''}" onclick="toggleTrack('${t.id}')"><span class="snd-ico">${SVGI[t.svgKey]||''}</span><span class="snd-info"><span class="snd-name">${t.label}</span><span class="snd-sub">${t.sub}</span></span><span class="snd-btn">${on?SVGI.pause:SVGI.play}</span></button>`;
  }).join('');
}
function initSoundWidget() { _renderSoundTracks('freq'); }
function toggleAmbient() { if(_currentTrack) toggleTrack(_currentTrack); else toggleTrack('rain'); }
function changeAmbient() {}
function stopAmbient() { stopTrack(); }
function startAmbient(type) { playTrack(type); }
function _updateAmbientBtn() {}


// ── League picker before timer start ──────────────────────────
function showLeaguePickerThenStart() {
  const cats = ALL_CATS.filter(c => P?.activeCatIds?.includes(c.id));
  if (cats.length === 1) {
    // Only one league — select it automatically, but don't start timer
    quickSel = cats[0].id;
    renderQuickCats();
    return;
  }
  // Build overlay
  const existingOv = document.getElementById('leaguePickerOv');
  if (existingOv) existingOv.remove();

  const ov = document.createElement('div');
  ov.id = 'leaguePickerOv';
  ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px)';
  ov.innerHTML = `
    <div style="background:var(--panel);border:0.5px solid var(--border);border-radius:20px;padding:24px;max-width:360px;width:100%;box-shadow:0 32px 80px rgba(0,0,0,.7)">
      <div style="font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--t2);margin-bottom:16px;text-align:center">Выбери лигу</div>
      <div id="leaguePickerGrid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
        ${cats.map(c => `
          <button onclick="pickLeagueAndStart('${c.id}')" style="
            display:flex;align-items:center;gap:10px;padding:12px 14px;
            background:var(--card);border:1.5px solid ${quickSel===c.id?c.color:'var(--border)'};
            border-radius:12px;cursor:pointer;font-family:'DM Sans',sans-serif;
            transition:background-color .18s,border-color .18s,color .18s,box-shadow .18s,opacity .18s;text-align:left;
          " onmouseover="this.style.borderColor='${c.color}'" onmouseout="this.style.borderColor='${quickSel===c.id?c.color:'var(--border)'}'">
            <span style="display:flex;align-items:center;justify-content:center;width:24px;height:24px;
              border-radius:7px;background:${c.color}18;color:${c.color};flex-shrink:0">
              ${(typeof ICONS !== 'undefined' && ICONS[c.id]) ? ICONS[c.id].replace(/width="20" height="20"/g,'width="15" height="15"') : c.icon}
            </span>
            <span style="font-size:12px;font-weight:700;color:var(--t1);line-height:1.3">${c.name}</span>
          </button>`).join('')}
      </div>
      <button onclick="document.getElementById('leaguePickerOv').remove()" style="
        width:100%;margin-top:14px;padding:10px;border-radius:10px;
        background:transparent;border:0.5px solid var(--border);color:var(--t2);
        font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer
      ">Отмена</button>
    </div>`;
  document.body.appendChild(ov);
  ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });
}

function pickLeagueAndStart(catId) {
  quickSel = catId;
  renderQuickCats(); // updates button label, no timer start
  const ov = document.getElementById('leaguePickerOv');
  if (ov) ov.remove();
  // Timer does NOT start — user must press Старт themselves
}

// ── Nav timer pill: показываем/скрываем и обновляем время ──
function updateNavTimerPill() {
  const pill = document.getElementById('navTimerPill');
  const pillTime = document.getElementById('navTimerPillTime');
  const pauseBtn = document.getElementById('navPauseBtn');
  const pauseIcon = document.getElementById('navPauseIcon');
  if (!pill) return;

  if (timerRunning || timerPaused) {
    const secs = getElapsed();
    // Форматируем MM:SS или HH:MM:SS
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const timeStr = h > 0
      ? `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
      : `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if (pillTime) pillTime.textContent = timeStr;

    // Paused state — другой цвет
    const dot = pill.querySelector('.nav-timer-dot');
    if (timerPaused) {
      pill.style.background = 'rgba(245,200,66,.1)';
      pill.style.borderColor = 'rgba(245,200,66,.22)';
      if (pillTime) pillTime.style.color = 'var(--gold)';
      if (dot) dot.style.background = 'var(--gold)';
      // Кнопка паузы — показать иконку "play" (возобновить)
      if (pauseBtn) pauseBtn.style.display = 'flex';
      if (pauseIcon) pauseIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3" fill="var(--gold)" stroke="none"/>';
      if (pauseIcon) pauseIcon.setAttribute('stroke','var(--gold)');
    } else {
      pill.style.background = 'rgba(34,197,94,.1)';
      pill.style.borderColor = 'rgba(34,197,94,.22)';
      if (pillTime) pillTime.style.color = '#22C55E';
      if (dot) dot.style.background = '#22C55E';
      // Кнопка паузы — показать иконку "pause"
      if (pauseBtn) pauseBtn.style.display = 'flex';
      if (pauseIcon) pauseIcon.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1" fill="#22C55E" stroke="none"/><rect x="14" y="4" width="4" height="16" rx="1" fill="#22C55E" stroke="none"/>';
    }
    pill.style.display = 'flex';
  } else {
    pill.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'none';
  }
}

function toggleQuick() {
  if (!quickSel) quickSel = defCat();

  if (!timerRunning && !timerPaused) {
    // Если категория не выбрана — показываем выбор лиги (только выбор, не запуск)
    if (!quickSel || !P?.activeCatIds?.includes(quickSel)) {
      showLeaguePickerThenStart();
      return;
    }
    // Лига выбрана — стартуем таймер
    // START (or resume from pause handled separately)
    _pausedElapsed = 0;
    setTimerState({ startTime: Date.now(), catId: quickSel, pomMode: pomMode });
    timerRunning = true; timerPaused = false;
    _setTimerUI('running');
    startTimerInterval();
    updateNavTimerPill(); // immediate — no setTimeout delay
    haptic('medium');
  } else if (timerPaused) {
    // RESUME
    setTimerState({ startTime: Date.now(), catId: quickSel, pomMode: pomMode });
    timerRunning = true; timerPaused = false;
    _setTimerUI('running');
    startTimerInterval();
    updateNavTimerPill(); // immediate
    haptic('light');
  }
}

function pauseTimer(){
  if(!timerRunning) return;
  _pausedElapsed = getElapsed();
  stopTimerInterval();
  timerRunning = false; timerPaused = true;
  // Сохраняем paused-состояние в localStorage — чтобы после перезагрузки таймер не обнулялся
  setTimerState({ paused: true, elapsed: _pausedElapsed, catId: quickSel, pomMode: pomMode || 0 });
  _setTimerUI('paused');
  haptic('light');
}

function stopTimer(){
  if(!timerRunning && !timerPaused) return;
  const secs = getElapsed();
  const state = getTimerState();
  const catId = state?.catId || quickSel;
  stopTimerInterval();
  timerRunning = false; timerPaused = false;
  _pausedElapsed = 0;
  setTimerState(null);
  if(pomMode > 0) updatePomRing(pomMode * 60, pomMode * 60);
  _setTimerUI('idle');
  if(secs > 5) saveSession(catId, secs);
  haptic('success');
}

function stopTimerPom(){
  cancelAnimationFrame(timerRAF);
  stopTimerInterval(); // FIX: also stop setInterval to prevent extra timerTick calls
  timerRunning = false; timerPaused = false; _pausedElapsed = 0;
  setTimerState(null);
  const disp = document.getElementById('qDisp');
  if(disp){disp.style.color='';disp.style.textShadow='';}
  const selR=document.getElementById('pomTimeSel');
  if(selR){selR.value='0';selR.style.borderColor='var(--border)';selR.style.color='var(--t3)';}
  const fBR=document.getElementById('pomFreeBtn');if(fBR)fBR.classList.add('active');
  _setTimerUI('idle');
}
// Restore timer across page reloads / tab switches
function restoreTimer() {
  const state = getTimerState();
  if (!state) return;

  // ── Восстановление ПАУЗЫ: таймер не обнуляется после перезагрузки ──
  if (state.paused) {
    _pausedElapsed  = state.elapsed || 0;
    timerRunning    = false;
    timerPaused     = true;
    quickSel        = state.catId || defCat();
    const savedPom  = state.pomMode || 0;
    if (savedPom > 0) {
      pomMode = savedPom;
      const sel = document.getElementById('pomTimeSel');
      if (sel) { sel.value = String(savedPom); sel.style.borderColor = 'var(--gold)'; sel.style.color = 'var(--gold)'; }
      const freeBtn = document.getElementById('pomFreeBtn');
      if (freeBtn) freeBtn.classList.remove('active');
    }
    _setTimerUI('paused');
    const disp = document.getElementById('qDisp');
    if (disp) disp.textContent = fmt(_pausedElapsed);
    clearInterval(_mTimerSyncInterval);
    _mTimerSyncInterval = setInterval(syncMobileTimerDisplay, 500);
    setTimeout(syncMobileTimerDisplay, 100);
    setTimeout(updateTimerTabState, 100);
    setTimeout(updateNavTimerPill, 100);
    return;
  }

  if (!state.startTime) return;

  timerRunning = true;
  timerPaused  = false;
  quickSel = state.catId || defCat();
  const savedPom = state.pomMode || 0;

  // Restore pomodoro selector if needed
  if (savedPom > 0) {
    pomMode = savedPom;
    const sel = document.getElementById('pomTimeSel');
    if (sel) { sel.value=String(savedPom); sel.style.borderColor='var(--gold)'; sel.style.color='var(--gold)'; }
    const freeBtn = document.getElementById('pomFreeBtn');
    if (freeBtn) freeBtn.classList.remove('active');
  }

  // Use _setTimerUI so ALL three buttons (Start/Pause/Stop) get correct state
  // This is the new multi-button UI — old single-btn approach was broken after reload
  _setTimerUI('running');

  // Set display to current elapsed time immediately
  const disp = document.getElementById('qDisp');
  if (disp) {
    if (savedPom > 0) {
      const remaining = Math.max(0, savedPom * 60 - getElapsed());
      disp.textContent = fmt(remaining);
      disp.style.color = 'var(--gold)';
      disp.style.textShadow = '0 0 32px rgba(245,200,66,.4)';
    } else {
      disp.textContent = fmt(getElapsed());
    }
  }

  startTimerInterval();
  // Restart mobile sync interval after reload
  clearInterval(_mTimerSyncInterval);
  _mTimerSyncInterval = setInterval(syncMobileTimerDisplay, 500);
  setTimeout(syncMobileTimerDisplay, 100);
  setTimeout(updateTimerTabState, 100);
  setTimeout(updateNavTimerPill, 100);
}

// Resync display when tab becomes visible again
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && timerRunning) {
    timerTick();
    if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; }
    _getTimerWorker().postMessage('start');
  }
});

// ══ SESSION MODAL — also uses localStorage timer ══════════════
const MODAL_TIMER_KEY = 'dtr_modal_timer_v2';
let mSel = null, mRun = false, mRAF = null;

function getModalElapsed() {
  try {
    const s = JSON.parse(localStorage.getItem(MODAL_TIMER_KEY) || 'null');
    if (!s || !s.startTime) return 0;
    return Math.floor((Date.now() - s.startTime) / 1000);
  } catch { return 0; }
}

function openSessModal() {
  // Sync with main timer — if main timer is running, reflect that state
  if (timerRunning || timerPaused) {
    const mainState = getTimerState();
    if (mainState?.catId) {
      mSel = mainState.catId;
      mRun = timerRunning;
    }
  } else {
    mSel = mSel || defCat();
  }

  document.getElementById('sessOv').classList.add('show');
  document.body.classList.add('modal-open');
  renderMCats();

  if (timerRunning) {
    document.getElementById('mStartBtn').innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><rect x="4" y="4" width="16" height="16" rx="2"/></svg> Завершить';
    document.getElementById('mStartBtn').className = 'btn btn-d';
    document.getElementById('mSub').textContent = 'Сессия активна...';
    _setModalPauseBtn('running');
    mRun = true;
    mRAF = requestAnimationFrame(modalTick);
  } else if (timerPaused) {
    document.getElementById('mStartBtn').innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><rect x="4" y="4" width="16" height="16" rx="2"/></svg> Завершить';
    document.getElementById('mStartBtn').className = 'btn btn-d';
    document.getElementById('mSub').textContent = 'Пауза...';
    _setModalPauseBtn('paused');
    // Show paused elapsed time
    const el = document.getElementById('mTimer');
    if (el) el.textContent = fmt(getElapsed());
  } else {
    // Restore if modal timer was running independently (legacy)
    try {
      const s = JSON.parse(localStorage.getItem(MODAL_TIMER_KEY) || 'null');
      if (s && s.startTime && !timerRunning) {
        mRun = true; mSel = s.catId || mSel;
        document.getElementById('mStartBtn').innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><rect x="4" y="4" width="16" height="16" rx="2"/></svg> Завершить';
        document.getElementById('mStartBtn').className = 'btn btn-d';
        document.getElementById('mSub').textContent = 'Сессия активна...';
        _setModalPauseBtn('running');
        mRAF = requestAnimationFrame(modalTick);
      }
    } catch {}
  }
}
function closeSessModal() {
  if (mRun) stopModal(false);
  document.getElementById('sessOv').classList.remove('show');
  document.body.classList.remove('modal-open');
  document.getElementById('mTimer').textContent = '00:00:00';
  document.getElementById('mStartBtn').innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><polygon points="5 3 19 12 5 21 5 3"/></svg> Старт';
  document.getElementById('mStartBtn').className = 'btn btn-p';
  _setModalPauseBtn('hidden');
}
function renderMCats() {
  document.getElementById('mCatGrid').innerHTML =
    ALL_CATS.filter(c => P.activeCatIds.includes(c.id)).map(c =>
      `<button class="mb ${c.id === mSel ? 'sel' : ''}" onclick="setMC('${c.id}')" style="${c.id === mSel ? `border-color:${c.color}` : ''}">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;color:${c.color}">${(ICONS[{read:"read",lang:"lang",code:"code",trading:"trading",cooking:"cooking",intellect:"intellect"}[c.id]]||"").replace('width="20" height="20"','width="16" height="16"')}</span>${c.name}</button>`
    ).join('');
}
function setMC(id) { if (!mRun) { mSel = id; renderMCats(); } }
function modalTick() {
  if (!mRun) return;
  // Use main timer if it's running (unified)
  const secs = timerRunning ? getElapsed() : getModalElapsed();
  const el = document.getElementById('mTimer');
  if (el) el.textContent = fmt(secs);
  mRAF = requestAnimationFrame(modalTick);
}
// Хелпер: обновляет кнопку паузы в модалке
function _setModalPauseBtn(state) {
  const btn = document.getElementById('mPauseBtn');
  const icon = document.getElementById('mPauseIcon');
  const lbl = document.getElementById('mPauseLabel');
  if (!btn) return;
  if (state === 'running') {
    btn.style.display = 'flex';
    btn.style.background = 'rgba(245,200,66,.12)';
    btn.style.borderColor = 'rgba(245,200,66,.3)';
    btn.style.color = 'var(--gold)';
    if (icon) icon.innerHTML = '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>';
    if (icon) { icon.setAttribute('stroke','var(--gold)'); icon.setAttribute('fill','none'); }
    if (lbl) lbl.textContent = 'Пауза';
  } else if (state === 'paused') {
    btn.style.display = 'flex';
    btn.style.background = 'rgba(34,197,94,.12)';
    btn.style.borderColor = 'rgba(34,197,94,.3)';
    btn.style.color = '#22C55E';
    if (icon) icon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    if (icon) { icon.setAttribute('stroke','none'); icon.setAttribute('fill','#22C55E'); }
    if (lbl) lbl.textContent = 'Продолжить';
  } else {
    btn.style.display = 'none';
  }
}

// Пауза/возобновление из модалки
function modalPauseToggle() {
  if (timerRunning) {
    pauseTimer(); // синхронизирует с боковым таймером
    _setModalPauseBtn('paused');
    document.getElementById('mSub').textContent = 'Пауза...';
    updateNavTimerPill();
  } else if (timerPaused) {
    toggleQuick(); // возобновляет — синхронизирует с боковым
    mRun = true;
    if (!mRAF) mRAF = requestAnimationFrame(modalTick);
    _setModalPauseBtn('running');
    document.getElementById('mSub').textContent = 'Сессия активна...';
    updateNavTimerPill();
  }
}

function modalToggle() {
  if (!mRun) {
    // Sync category with main timer
    quickSel = mSel;
    renderQuickCats();
    // If main timer already running — just close modal and show main timer
    if (timerRunning) {
      mRun = true;
      mRAF = requestAnimationFrame(modalTick);
      document.getElementById('mStartBtn').innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><rect x="4" y="4" width="16" height="16" rx="2"/></svg> Завершить';
      document.getElementById('mStartBtn').className = 'btn btn-d';
      document.getElementById('mSub').textContent = 'Сессия активна...';
      _setModalPauseBtn('running');
      return;
    }
    // Start main timer (single source of truth)
    mRun = true;
    localStorage.setItem(MODAL_TIMER_KEY, JSON.stringify({ startTime: Date.now(), catId: mSel }));
    document.getElementById('mStartBtn').innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><rect x="4" y="4" width="16" height="16" rx="2"/></svg> Завершить';
    document.getElementById('mStartBtn').className = 'btn btn-d';
    document.getElementById('mSub').textContent = 'Сессия активна...';
    _setModalPauseBtn('running');
    mRAF = requestAnimationFrame(modalTick);
  } else stopModal(true);
}
function stopModal(save) {
  // Use main timer elapsed if it was running (unified)
  const secs = timerRunning ? getElapsed() : getModalElapsed();
  const catId = (timerRunning ? getTimerState()?.catId : null) || mSel;
  cancelAnimationFrame(mRAF);
  mRun = false;
  localStorage.removeItem(MODAL_TIMER_KEY);
  // Stop main timer too
  if (timerRunning || timerPaused) {
    stopTimerInterval();
    timerRunning = false; timerPaused = false; _pausedElapsed = 0;
    setTimerState(null);
    _setTimerUI('idle');
    updateNavTimerPill();
  }
  _setModalPauseBtn('hidden');
  if (save && secs > 5) { saveSession(catId, secs); closeSessModal(); return; }
  document.getElementById('mStartBtn').innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><polygon points="5 3 19 12 5 21 5 3"/></svg> Старт';
  document.getElementById('mStartBtn').className = 'btn btn-p';
  document.getElementById('mSub').textContent = 'Выбери активность';
  document.getElementById('mTimer').textContent = '00:00:00';
}

// ══ PUBLIC PROFILE ═══════════════════════════════════════════
async function openPub(){
  const url=`${location.origin}${location.pathname}?u=${encodeURIComponent(P.name)}`;
  document.getElementById('pubUrl').value=url;
  const thPub=totalHrs(),unl=P.achievements.filter(a=>a.unlocked).length;
  const cats=activeCats();

  // Count likes — FIX: unified to 'likes' table (was 'profile_likes' here, 'likes' in toggleLikeUser)
  let likesCount=0,iLiked=false;
  if(!SB_USER?.isDemoUser){
    const{count}=await sb.from('likes').select('id',{count:'exact',head:true}).eq('to_user_id',P.id);
    likesCount=count||0;
    const{data:myLike}=await sb.from('likes').select('id').eq('from_user_id',SB_USER.id).eq('to_user_id',P.id).maybeSingle();
    iLiked=!!myLike;
  }

  const levelTitle = document.getElementById('profTitle')?.textContent || '';
  document.getElementById('pubPrev').innerHTML=`
    <div style="
      background:rgba(255,255,255,.025);
      border:0.5px solid rgba(255,255,255,.07);
      border-radius:16px;
      overflow:hidden;
    ">
      <!-- Cover strip -->
      <div style="height:60px;background:linear-gradient(135deg,rgba(245,200,66,.12) 0%,rgba(168,85,247,.08) 60%,transparent 100%);position:relative">
        <div style="position:absolute;bottom:0;left:0;right:0;height:30px;background:linear-gradient(to bottom,transparent,rgba(10,10,14,1))"></div>
      </div>
      <!-- Avatar + name row -->
      <div style="padding:0 18px 16px;margin-top:-28px;position:relative">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px">
          <div style="display:flex;align-items:flex-end;gap:12px">
            <div style="width:56px;height:56px;border-radius:14px;overflow:hidden;font-size:30px;display:flex;align-items:center;justify-content:center;background:#0E0E16;border:2px solid rgba(245,200,66,.3);flex-shrink:0;box-shadow:0 4px 16px rgba(0,0,0,.6)">
              ${P.avatarUrl?`<img src="${P.avatarUrl}" style="width:100%;height:100%;object-fit:cover">`:P.avatar}
            </div>
            <div style="padding-bottom:4px">
              <div style="font-family:'DM Sans',sans-serif;font-size:18px;font-weight:800;letter-spacing:-.03em;color:var(--t1);line-height:1">${P.name}</div>
              <div style="font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--gold);margin-top:4px;opacity:.8">${levelTitle}</div>
            </div>
          </div>
          <!-- Like button -->
          <button id="likeBtn" onclick="likeMyProfile()" style="
            display:inline-flex;align-items:center;gap:7px;
            padding:8px 14px;margin-bottom:4px;
            border-radius:10px;cursor:pointer;
            background:${iLiked?'rgba(239,68,68,.12)':'rgba(255,255,255,.06)'};
            border:0.5px solid ${iLiked?'rgba(239,68,68,.3)':'rgba(255,255,255,.12)'};
            transition:all .22s cubic-bezier(.34,1.56,.64,1);
            box-shadow:${iLiked?'0 2px 12px rgba(239,68,68,.2)':'none'};
          ">
            <svg width="15" height="15" viewBox="0 0 24 24"
              fill="${iLiked?'#ef4444':'none'}"
              stroke="${iLiked?'#ef4444':'rgba(255,255,255,.55)'}"
              stroke-width="2"
              style="${iLiked?'animation:heartPop .35s cubic-bezier(.34,1.56,.64,1) both':''}">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span id="likeCnt" style="
              font-family:'DM Mono',monospace;
              font-size:14px;font-weight:500;
              color:${iLiked?'#ef4444':'rgba(255,255,255,.85)'};
              min-width:16px;text-align:left;
            ">${likesCount}</span>
          </button>
        </div>

        <!-- Stats row -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:14px">
          ${[
            ['Часов', (thPub<10?thPub.toFixed(1):Math.round(thPub)), '#F5C842'],
            ['Наград', unl, '#F97316'],
            ['Дисциплина', P.streak, '#4ADE80']
          ].map(([l,v,c])=>`
            <div style="
              text-align:center;padding:12px 8px;
              background:rgba(255,255,255,.03);
              border:0.5px solid rgba(255,255,255,.06);
              border-radius:12px;
            ">
              <div style="font-family:'DM Mono',monospace;font-size:24px;font-weight:400;color:${c};line-height:1;margin-bottom:5px">${v}</div>
              <div style="font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.35)">${l}</div>
            </div>`).join('')}
        </div>

        <!-- Leagues -->
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:12px">
          <span style="font-size:10px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:rgba(255,255,255,.25)">Лиги</span>
          ${cats.map(c=>`
            <span style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;background:rgba(255,255,255,.04);border:0.5px solid rgba(255,255,255,.07);border-radius:6px;font-size:11px;font-weight:500;color:rgba(255,255,255,.5)">
              ${c.icon} ${c.name}
            </span>`).join('')}
        </div>

      </div>
    </div>`;
  document.getElementById('pubOv').classList.add('show');
}

async function likeMyProfile(){
  if(SB_USER?.isDemoUser)return;
  const btn=document.getElementById('likeBtn');
  const cnt=document.getElementById('likeCnt');
  const liked=btn.style.background.includes('248');
  // FIX: unified to 'likes' table
  if(liked){
    await sb.from('likes').delete().eq('from_user_id',SB_USER.id).eq('to_user_id',P.id);
    btn.innerHTML=`🤍 <span style="font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700" id="likeCnt">${parseInt(cnt.textContent)-1}</span>`;
    btn.style.background='var(--card)';
  } else {
    await sb.from('likes').insert({from_user_id:SB_USER.id,to_user_id:P.id});
    btn.style.background='rgba(239,68,68,.12)';
    btn.style.borderColor='rgba(239,68,68,.3)';
    btn.style.boxShadow='0 2px 12px rgba(239,68,68,.2)';
    btn.innerHTML=`
      <svg width="15" height="15" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="2" style="animation:heartPop .35s cubic-bezier(.34,1.56,.64,1) both">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
      <span id="likeCnt" style="font-family:'DM Mono',monospace;font-size:14px;font-weight:500;color:#ef4444;min-width:16px">${parseInt(cnt.textContent)+1}</span>`;
  }
}

function closePub(){document.getElementById('pubOv').classList.remove('show');}
async function copyUrl(){
  const url = document.getElementById('pubUrl').value;
  const b = document.getElementById('cpyBtn');
  let ok = false;
  try { await navigator.clipboard.writeText(url); ok = true; }
  catch(e) {
    try {
      const ta=document.createElement('textarea');
      ta.value=url; ta.style.cssText='position:fixed;top:-9999px;opacity:0';
      document.body.appendChild(ta); ta.focus(); ta.select();
      ok = document.execCommand('copy');
      document.body.removeChild(ta);
    } catch(e2){}
  }
  if(ok){
    b.textContent='✅ Скопировано!';
    setTimeout(()=>b.textContent='Копировать',2200);
    showToast('Ссылка скопирована!','🔗');
  } else {
    showToast('Не удалось скопировать','⚠️');
  }
}

// ══ AVATAR EDIT ══════════════════════════════════════════════
function openAvEdit(){editSelAv=P.avatar;rpAv('avEditPicker',editSelAv,'editAvFn');document.getElementById('avOv').classList.add('show');}
async function saveAv(){
  const saveBtn=document.querySelector('#avOv .btn-auth');
  // Close modal IMMEDIATELY - don't wait for upload
  document.getElementById('avOv').classList.remove('show');

  if(avPhotoFile){
    const localPreview=document.getElementById('avPhotoImg').src;
    // Show photo immediately from local blob while uploading
    P.avatarUrl=localPreview;
    renderNav();renderHeader();
    showToast('Загружаем фото...','⏳');

    if(SB_USER?.isDemoUser){
      avPhotoFile=null;
      showToast('Аватар обновлён!','🖼️');
    } else {
      // Store base64 directly in avatar_url column (works without Storage bucket)
      try{
        const b64=document.getElementById('avPhotoImg').src;
        // Limit to ~800KB to be safe with DB limits
        if(b64&&b64.length>800000){
          showToast('Фото слишком большое. Макс ~600KB','⚠️');
          P.avatarUrl=null; renderNav();renderHeader();
        } else {
          await sb.from('users').update({avatar_url:b64,avatar:P.avatar}).eq('id',SB_USER.id);
          P.avatarUrl=b64;
          lgCache = {}; lgCacheTime = {};
          avPhotoFile=null;
          renderNav();renderHeader();
          showToast('Аватар сохранён!','🖼️');
        }
      } catch(e){
        console.error('Upload error:',e);
        // Fallback: try Storage upload
        try{
          const url=await uploadAvatarPhoto();
          if(url){
            P.avatarUrl=url;
            lgCache = {}; lgCacheTime = {};
            await sb.from('users').update({avatar_url:url}).eq('id',SB_USER.id);
            avPhotoFile=null;
            renderNav();renderHeader();
            showToast('Аватар сохранён!','🖼️');
          } else {
            P.avatarUrl=null; renderNav();renderHeader();
            showToast('Ошибка загрузки. Попробуй ещё раз','⚠️');
          }
        } catch(e2){
          P.avatarUrl=null; renderNav();renderHeader();
          showToast('Ошибка загрузки','⚠️');
        }
      }
    }
  } else {
    P.avatar=editSelAv;
    P.avatarUrl=null;
    if(!SB_USER?.isDemoUser){
      try{
        await sb.from('users').update({avatar:editSelAv,avatar_url:null}).eq('id',SB_USER.id);
      } catch(e){console.error(e);}
    }
    renderNav();renderHeader();
    showToast('Аватар обновлён!','✅');
  }
}
// ══ TOAST ════════════════════════════════════════════════════
let toastTmr=null;
const TOAST_COLORS={
  '✅':'rgba(34,197,94,.12)','🔥':'rgba(249,115,22,.12)','🏆':'rgba(245,200,66,.12)',
  '⚡':'rgba(245,200,66,.12)','⚠️':'rgba(239,68,68,.12)','❌':'rgba(239,68,68,.12)',
  '📋':'rgba(26,159,255,.12)','🔗':'rgba(26,159,255,.12)','🖼️':'rgba(168,85,247,.12)',
};
function showToast(msg,icon='✅',isAch=false,sub=''){
  if(toastTmr)clearTimeout(toastTmr);
  const t=document.getElementById('toast');
  const tMsg=document.getElementById('tMsg');
  const tIcon=document.getElementById('tIcon');
  const tBox=document.getElementById('tAvatarBox');
  const tSub=document.getElementById('tSub');
  if(tMsg) tMsg.textContent=msg;
  if(tIcon) tIcon.textContent=icon;
  if(tBox) tBox.style.background=TOAST_COLORS[icon]||'rgba(245,200,66,.1)';
  if(tSub){ if(sub){tSub.textContent=sub;tSub.style.display='block';}else{tSub.style.display='none';} }
  t.className='toast show'+(isAch?' ach':'');
  toastTmr=setTimeout(()=>{
    t.style.animation='dtrToastOut .26s cubic-bezier(0.42,0,0.58,1) both';
    setTimeout(()=>{t.classList.remove('show');t.style.animation='';},260);
  },3100);
}

// ══ TABS ════════════════════════════════════════════════════
function showTab(name,el,skipHistory){
  document.querySelectorAll('.tc').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.stab').forEach(b=>b.classList.remove('active'));
  if(name==='knowledge'){
    const kbRoot=document.getElementById('kb-root');
    if(!_kbDBReady){
      if(kbRoot) kbRoot.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:200px;gap:12px;color:var(--t3);font-size:13px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0" stroke-opacity=".3"/><path d="M21 12a9 9 0 0 0-9-9"/></svg>Синхронизация...</div>';
      _kbLoadFromDB().then(()=>{ setTimeout(renderKnowledgeBase,40); });
    } else {
      setTimeout(renderKnowledgeBase,60);
    }
  }
  const pane=document.getElementById('tab-'+name);
  if(pane){
    pane.classList.add('active');
    void pane.offsetWidth;
    pane.style.animation='none';
    void pane.offsetWidth;
    pane.style.animation='dtrTabIn .28s cubic-bezier(.22,1,.36,1) both';
    setTimeout(()=>{if(pane)pane.style.animation='';},400);
  }
  if(el)el.classList.add('active');
  else{const s=document.querySelector('.stab[onclick*="\''+name+'\'"]');if(s)s.classList.add('active');}
  if(name==='dash'){
    renderDash();
    if(typeof renderHeroZone==='function'&&P&&!P._loading) renderHeroZone();
    setTimeout(()=>{
      // Motivational banner only — hero card stays stable (no opacity flash)
      const motEl = document.querySelector('.mot-banner');
      if(motEl){ motEl.style.animation='none'; void motEl.offsetHeight; motEl.style.animation='dtrHeroIn .3s cubic-bezier(.22,1,.36,1) both'; }
      // KPI cards — cascade fade+scale
      staggerList('.kpi', 55, 'card');
      // Session list — slide from left
      staggerList('.si', 30, 'row');
      // Section labels — fast left slide
      staggerList('[id^="sec_"]', 40, 'sec');
      // Numbers inside KPI — blur reveal
      animateNumbers('.kpi .kpi-val, .kpi [style*="font-family:\'DM Mono\'"], .tot-num', 100);
      // Progress bars
      animateBars('.ci-bar, .lr-bar, .xp-fill, .cbd-bar', 80);
      initKpiGlow();
      renderDailyProgress();
    }, 60);
  }
  if(name==='activity'){
    renderSessions(true);
    setTimeout(()=>{
      // Lightweight: opacity+translateX only, fast, capped at 20 items, no forced reflow loop
      const siEls = Array.from(document.querySelectorAll('.si')).slice(0, 20);
      siEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-8px)';
      });
      requestAnimationFrame(() => {
        siEls.forEach((el, i) => {
          el.style.transition = `opacity .2s ease ${i*18}ms, transform .22s cubic-bezier(.22,1,.36,1) ${i*18}ms`;
          el.style.opacity = '1';
          el.style.transform = 'translateX(0)';
        });
        setTimeout(() => siEls.forEach(el => { el.style.transition=''; el.style.transform=''; }), 600);
      });
    }, 40);
  }
  if(name==='achievements'){
    renderAchFull();
  }
  if(name==='leagues'){
    renderLeagues();
    setTimeout(()=>{
      // Section headers only — lg-row анимация уже запускается через
      // window.renderLeagues patch (staggerLeagueRows с data-staggered guard).
      // Дублировать staggerList('.lg-row') здесь = двойная анимация ("грузит дважды").
      staggerList('.lg-section', 60, 'sec');
      animateBars('.lr-bar', 150);
    }, 80);
  }
  if(name==='messages'){
    renderMsgTab();
    setTimeout(()=>{
      staggerList('.msg-conv', 30, 'row');
    }, 60);
  }
  if(name==='manage'){
    renderManageGrid();
    loadMemberCounts().then(()=>{
      renderManageGrid();
      setTimeout(()=> staggerList('.mg-item', 45, 'card'), 40);
    });
    setTimeout(()=> staggerList('.mg-item', 45, 'card'), 60);
  }
  if(name==='social'){
    setTimeout(()=>{
      staggerList('.soc-card', 40, 'card');
      staggerList('.soc-user-row,.soc-req-row', 35, 'row');
    }, 100);
  }
  if(name==='habits'){
    setTimeout(()=>{
      // Hero banner — drop in with spring
      document.querySelectorAll('.hab-hero,.hab-hero-top').forEach((el,i)=>{
        el.style.animation='none'; void el.offsetHeight;
        el.style.animation=`dtrHeroIn .38s ${i*60}ms cubic-bezier(.22,1,.36,1) both`;
      });
      // Add button
      const addBtn=document.querySelector('.hab-add-btn,.hab-add-row');
      if(addBtn){ addBtn.style.animation='none'; void addBtn.offsetHeight; addBtn.style.animation=`dtrFadeScale .32s .1s cubic-bezier(.34,1.18,.64,1) both`; }
      // Sort bar
      const sortBar=document.querySelector('.hab-sort-bar,.hab-sort');
      if(sortBar){ sortBar.style.animation='none'; void sortBar.offsetHeight; sortBar.style.animation=`dtrSlideInLeft .24s .05s cubic-bezier(.22,1,.36,1) both`; }
      // Matrix
      document.querySelectorAll('.hab-matrix').forEach((el,i)=>{
        el.style.animation='none'; void el.offsetHeight;
        el.style.animation=`dtrFadeScale .32s ${.12+i*.08}s cubic-bezier(.34,1.18,.64,1) both`;
      });
      // Rows with stagger
      staggerList('.hab-row', 28, 'row');
      // KPI analytics cards
      staggerList('.hab-kpi', 45, 'card');
      // Consistency rows
      staggerList('.hab-consist-row', 30, 'row');
      // Progress bars animate width
      setTimeout(()=>{
        animateBars('.hab-prog-fill', 0);
        // Counter animation for % numbers
        document.querySelectorAll('.hab-prog-pct[data-target]').forEach(el => {
          const target = parseInt(el.dataset.target) || 0;
          if (target === 0) { el.textContent = '0%'; return; }
          let start = null;
          const dur = 900;
          const step = ts => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3); // cubic ease-out
            el.textContent = Math.round(ease * target) + '%';
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      }, 200);
    }, 80);
  }
  if(name==='learn'){
    setTimeout(()=>{
      // Section headers
      document.querySelectorAll('.lrn-main-hdr,.lrn-section-hdr,.lrn-sec-ttl').forEach((el,i)=>{
        el.style.animation='none'; void el.offsetHeight;
        el.style.animation=`dtrSlideInLeft .28s ${i*60}ms cubic-bezier(.22,1,.36,1) both`;
      });
      // Cards with stagger
      staggerList('.lrn-card', 45, 'card');
      // List items
      staggerList('.lrn-item', 30, 'row');
      // Sidebar authors
      staggerList('.lrn-auth-row', 35, 'row');
    }, 80);
  }
  // Push to browser history so back button works
  if(!skipHistory && P){
    try{ history.pushState({tab:name},'',`#${name}`); }catch(e){}
  }
}
// Handle browser back/forward button
window.addEventListener('popstate', e=>{
  const tab = e.state?.tab || location.hash.replace('#','') || 'dash';
  const validTabs = ['dash','leagues','activity','achievements','manage','messages'];
  if(P && validTabs.includes(tab)) showTab(tab, null, true);
});

function closeAvEdit(){
  avPhotoFile=null;
  document.getElementById('avOv').classList.remove('show');
}
function olClick(e,id){
  if(e.target!==document.getElementById(id))return;
  const m={sessOv:closeSessModal,pubOv:closePub,achOv:closeAch,avOv:closeAvEdit};
  if(m[id])m[id]();
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeSessModal();closePub();closeAch();closeAvEdit();closeHero();closeUserProfile();closeSundayBanner();}});


// ══════════════════════════════════════════════════════════════
// ONLINE SYSTEM — Pure polling via last_seen (no Realtime Presence)
// Realtime Presence channels cause DataCloneError (Headers can't postMessage)
// ══════════════════════════════════════════════════════════════
let presenceInterval = null;
// FIX: 75 second window + 20s ping = accurate within 1-2 pings after leaving
const ONLINE_WINDOW_MS = 75 * 1000; // 75 секунд = онлайн

async function pingOnline(){
  if(!SB_USER || SB_USER.isDemoUser) return;
  try {
    await sb.from('users')
      .update({ last_seen: new Date().toISOString() })
      .eq('id', SB_USER.id);
  } catch(e){ /* silent */ }
}

function _applyOnlineCount(cnt){
  const el = document.getElementById('onlineCnt');
  if(el) el.textContent = cnt + ' онлайн';
}

// PERF: мгновенно показать кэшированное значение при загрузке
function showCachedOnlineCount(){
  try{
    const cached = localStorage.getItem('dtr_online_cnt');
    if(cached !== null) _applyOnlineCount(parseInt(cached)||0);
  }catch(e){}
}

async function updateOnlineCount(){
  if(!SB_USER) return;
  try {
    const cutoff = new Date(Date.now() - ONLINE_WINDOW_MS).toISOString();
    const { data, error } = await sb.from('users')
      .select('id')
      .gte('last_seen', cutoff)
      .limit(500);
    if(error) return;
    const cnt = (data||[]).length;
    const displayCnt = SB_USER.isDemoUser ? Math.max(cnt, 1) : cnt;
    // Кэш для мгновенного показа при следующей загрузке
    try{ localStorage.setItem('dtr_online_cnt', displayCnt); }catch(e){}
    _applyOnlineCount(displayCnt);
  } catch(e){ /* silent */ }
}

async function updateLeagueOnlineCounts(){
  if(!SB_USER || !P) return;
  try {
    const cats = activeCats();
    if(!cats.length) return;
    const catIds = cats.map(c=>c.id);
    const cutoff = new Date(Date.now() - ONLINE_WINDOW_MS).toISOString();

    // Step 1: get recently online users
    const { data: onlineData } = await sb.from('users')
      .select('id').gte('last_seen', cutoff).limit(500);
    if(!onlineData) return;
    const onlineSet = new Set(onlineData.map(u=>u.id));

    // Step 2: get user_categories for our leagues
    const { data: ucData } = await sb.from('user_categories')
      .select('user_id,category_id').in('category_id', catIds);
    if(!ucData) return;

    // Step 3: count per league
    const cntMap = {};
    ucData.forEach(uc => {
      if(onlineSet.has(uc.user_id)){
        cntMap[uc.category_id] = (cntMap[uc.category_id]||0)+1;
      }
    });

    document.querySelectorAll('[data-league-online]').forEach(el => {
      const catId = el.dataset.leagueOnline;
      const cnt = cntMap[catId] || 0;
      const span = el.querySelector('span');
      const txt = cnt + ' онлайн';
      if(span) span.textContent = txt;
      else el.innerHTML = '<div class="online-dot" style="width:6px;height:6px;flex-shrink:0"></div><span>' + txt + '</span>';
    });
  } catch(e){ /* silent */ }
}

function initPresence() {
  if(!SB_USER) return;
  if(presenceInterval){ clearInterval(presenceInterval); presenceInterval=null; }

  // PERF: мгновенно показать кэшированное значение, потом обновить с сервера
  showCachedOnlineCount();

  // Immediate first run
  pingOnline();
  updateOnlineCount();
  updateLeagueOnlineCounts();

  // Refresh every 20s (must be < ONLINE_WINDOW_MS/2 for accuracy)
  // Пинг онлайн реже — снижает фоновую нагрузку на сеть и CPU
  presenceInterval = setInterval(async () => {
    await pingOnline();
    await updateOnlineCount();
    await updateLeagueOnlineCounts();
  }, 45000);

  // Тихое фоновое обновление арены каждые 10 минут
  // Если арена открыта — обновляем данные без spinner
  setInterval(async () => {
    if(!P || P._loading || !SB_USER || SB_USER.isDemoUser) return;
    const cats = activeCats ? activeCats() : [];
    if(!cats.length) return;
    // Проверяем какие категории протухли
    const stale = cats.filter(c => !lgCacheTime[c.id] || (Date.now()-lgCacheTime[c.id]) >= LG_CACHE_TTL);
    if(!stale.length) return;
    // Инвалидируем только протухшие и грузим тихо в фоне
    stale.forEach(c => { delete lgCache[c.id]; delete lgCacheTime[c.id]; });
    try {
      await Promise.all(stale.map(c => loadLeagueData(c.id)));
      // Если вкладка арены активна — перерисовываем
      const leaguesTab = document.getElementById('tab-leagues');
      if(leaguesTab && leaguesTab.classList.contains('active')) {
        renderLeagues();
      }
      // Мини-виджет арены на дашборде тоже обновляем
      renderLgMini();
    } catch(e){ /* silent */ }
  }, LG_CACHE_TTL);
}

// FIX: Mark user offline immediately when tab is closed or hidden
// sendBeacon works in beforeunload/pagehide where async fetch doesn't
async function markOffline(){
  if(!SB_USER || SB_USER.isDemoUser) return;
  try {
    // Set last_seen to past (beyond the online window) so they drop off immediately
    const offlineTime = new Date(Date.now() - ONLINE_WINDOW_MS - 5000).toISOString();
    await sb.from('users').update({ last_seen: offlineTime }).eq('id', SB_USER.id);
  } catch(e){ /* silent */ }
}

document.addEventListener('visibilitychange', () => {
  if(document.visibilityState === 'hidden'){
    markOffline();
  } else if(document.visibilityState === 'visible' && SB_USER && !SB_USER.isDemoUser){
    // Re-ping immediately when tab becomes visible again
    pingOnline().then(() => updateOnlineCount());
    // Проверяем изменился ли день пока вкладка была скрыта
    // Если да — пересчитываем стрик и активные дни (без полной перезагрузки)
    _checkDayChangeOnResume();
  }
});

// Отслеживаем дату последнего рендера для обнаружения смены дня
let _lastRenderedDateStr = new Date().toDateString();

function _checkDayChangeOnResume() {
  const today = new Date().toDateString();
  if(today === _lastRenderedDateStr) return; // день не изменился
  _lastRenderedDateStr = today;
  // День изменился — пересчитываем стрик из локальных сессий
  if(P && P.sessions && !P._loading) {
    const rawSessions = P.sessions.map(s=>({created_at:s.isoDate||new Date(s.ts||0).toISOString()}));
    const newStreak = computeStreakFromSessions(rawSessions);
    if(newStreak !== P.streak) {
      P.streak = newStreak;
      // Синхронизируем в БД в фоне
      if(SB_USER && !SB_USER.isDemoUser) {
        sb.from('users').update({streak:newStreak}).eq('id',SB_USER.id)
          .then(null, e => console.error('streak sync failed:', e));
      }
    }
    renderAll();
  }
}

window.addEventListener('pagehide', () => {
  markOffline();
});

// ══════════════════════════════════════════════════════════════
// SUPABASE REALTIME — Messages (WebSocket, no polling)
// ══════════════════════════════════════════════════════════════
let msgRealtimeChannel = null;
let usersRealtimeChannel = null;
let realtimeMsgPartner = null;

function initRealtimeMessages() {
  if (!SB_USER) return;
  if (msgRealtimeChannel) { sb.removeChannel(msgRealtimeChannel); }

  msgRealtimeChannel = sb.channel('dtr-messages')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `to_user_id=eq.${SB_USER.id}`
    }, (payload) => {
      if (payload.new.from_user_id === activeConvUserId) {
        appendMessage(payload.new, false);
        // User is actively viewing — mark as read instantly, no badge update needed
        sb.from('messages').update({read:true}).eq('id', payload.new.id).then(() => {
          [_convsCache, allConvsCache].forEach(cache => {
            if(!cache) return;
            const conv = cache.find(c => c.userId === activeConvUserId);
            if(conv && conv.unread > 0) conv.unread = 0;
          });
          if(_convsCache || allConvsCache) _renderConvList(_convsCache || allConvsCache || []);
        });
        return;
      }
      loadConversations();
    })
    .subscribe();

  // ── Realtime: avatar updates from other users ──────────────
  if (usersRealtimeChannel) { sb.removeChannel(usersRealtimeChannel); }
  usersRealtimeChannel = sb.channel('dtr-users-avatar')
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'users'
    }, (payload) => {
      const updated = payload.new;
      if (!updated || !updated.id) return;
      // Update lgCache so next render uses fresh avatar
      Object.keys(lgCache).forEach(catId => {
        lgCache[catId] = lgCache[catId].map(p => {
          if (p.userId === updated.id) {
            return { ...p, av: updated.avatar || p.av, avUrl: updated.avatar_url || null };
          }
          return p;
        });
      });
      // Update all avatar elements live using data-uid
      document.querySelectorAll(`[data-uid="${updated.id}"]`).forEach(el => {
        if (updated.avatar_url) {
          el.innerHTML = `<img src="${updated.avatar_url}" class="img-cover" style="border-radius:8px" onerror="this.parentNode.textContent='${updated.avatar||'🎯'}'">`;
        } else {
          el.textContent = updated.avatar || '🎯';
        }
      });
    })
    .subscribe();
}

function msgContentHTML(msg) {
  const ct = msg.content_type || 'text';
  const txt = msg.content || '';
  if (ct === 'image') return `<img src="${txt}" style="max-width:220px;border-radius:8px;display:block;margin-bottom:2px" onclick="window.open('${txt}','_blank')">`;
  if (ct === 'video') return `<video controls style="max-width:220px;border-radius:8px"><source src="${txt}"></video>`;
  if (ct === 'voice') return `<div style="display:flex;align-items:center;gap:8px;padding:4px 0"><span>🎤</span><audio controls style="max-width:180px;height:32px"><source src="${txt}"></audio></div>`;
  if (ct === 'file') return `<div style="display:flex;align-items:center;gap:6px;padding:4px;background:rgba(0,0,0,.1);border-radius:6px;font-size:12px"><span>📄</span><span style="word-break:break-word">${txt}</span></div>`;
  // Default: text — linkify URLs
  return txt.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:inherit;text-decoration:underline">$1</a>');
}

function appendMessage(msg, isMine) {
  const el = document.getElementById('msgMessages');
  if (!el) return;
  const timeStr = new Date(msg.created_at).toLocaleTimeString('ru',{hour:'2-digit',minute:'2-digit'});
  const txt = msg.content || '';
  const msgId = msg.id || `opt-${Date.now()}`;
  const ticks = isMine ? `<span class="msg-ticks"><svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 5L4.5 8.5L9 3" stroke="rgba(9,9,11,0.45)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 5L10.5 8.5L15 3" stroke="rgba(9,9,11,0.45)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>` : '';

  const div = document.createElement('div');
  div.className = `msg-row${isMine?' mine':' theirs'}`;
  div.style.marginTop = '10px';
  div.dataset.msgId = msgId;
  div.innerHTML = `
    ${!isMine?'<div class="msg-av-micro ghost"></div>':''}
    <div class="msg-bubble${isMine?' mine':' theirs'}" data-msg-id="${esc(msgId)}"
      oncontextmenu="_showRxPopup(event,this)"
      ondblclick="_showRxPopup(event,this)">
      <span>${esc(txt)}</span>
      <div class="msg-bubble-time">${timeStr}${ticks}</div>
      <div class="reaction-popup" id="rp-${esc(msgId)}">
        ${['❤️','🔥','👏','😂','🤔','👍'].map(e=>`<button class="r-pop-btn" onclick="_addRx('${esc(msgId)}','${e}');event.stopPropagation()" type="button">${e}</button>`).join('')}
      </div>
    </div>`;

  el.appendChild(div);

  if(!isMine){
    const bub=div.querySelector('.msg-bubble');
    if(bub){bub.classList.add('new-msg');setTimeout(()=>bub.classList.remove('new-msg'),1200);}
  }

  const near = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
  if(near) el.scrollTo({top:el.scrollHeight,behavior:'smooth'});
  else if(!isMine) document.getElementById('msgScrollDown')?.classList.add('visible');
}

// ══════════════════════════════════════════════════════════════
// OPTIMISTIC UI — Likes with instant feedback + rollback
// ══════════════════════════════════════════════════════════════
async function toggleLikeUser() {
  const ov = document.getElementById('userProfileOv');
  const userId = ov.dataset.userId;
  if (!userId || !SB_USER) return;

  const btn = document.getElementById('upLikeBtn');
  const countEl = document.getElementById('upLikeCount');
  const wasLiked = btn.classList.contains('liked');
  const prevCount = parseInt(countEl?.textContent || '0');

  // OPTIMISTIC: instant UI update (0ms)
  const newCount = wasLiked ? Math.max(0, prevCount - 1) : prevCount + 1;
  btn.className = 'up-btn' + (wasLiked ? '' : ' liked');
  btn.innerHTML = (wasLiked ? '♡ Лайк ' : '❤️ Нравится ') +
    `<span id="upLikeCount">${newCount}</span>`;

  try {
    if (wasLiked) {
      const { error } = await sb.from('likes')
        .delete().eq('from_user_id', SB_USER.id).eq('to_user_id', userId);
      if (error) throw error;
      showToast('Лайк убран', '♡');
    } else {
      const { error } = await sb.from('likes')
        .insert({ from_user_id: SB_USER.id, to_user_id: userId });
      if (error) throw error;
      showToast('Лайк поставлен!', '❤️');
    }
  } catch (err) {
    // ROLLBACK on error
    btn.className = 'up-btn' + (wasLiked ? ' liked' : '');
    btn.innerHTML = (wasLiked ? '❤️ Нравится ' : '♡ Лайк ') +
      `<span id="upLikeCount">${prevCount}</span>`;
    showToast('Ошибка сети. Повтори.', '⚠️');
    console.error('Like error:', err);
  }
}

// ══════════════════════════════════════════════════════════════
// OPTIMISTIC UI — Send message (instant append + sync)
// ══════════════════════════════════════════════════════════════
async function sendMsg(toUserId) {
  const input = document.getElementById('msgInput');
  const text = input?.value?.trim();
  if (!text || !SB_USER) return;
  if (text.length > 1000) { showToast('Сообщение слишком длинное (макс. 1000 символов)', '⚠️'); return; }

  input.value = '';
  input.style.height = 'auto';

  const optId = `opt-${Date.now()}`;
  const optimisticMsg = { id: optId, content: text, created_at: new Date().toISOString(), from_user_id: SB_USER.id };
  appendMessage(optimisticMsg, true);

  try {
    const { data, error } = await sb.from('messages').insert({
      from_user_id: SB_USER.id,
      to_user_id: toUserId,
      content: text,
      content_type: 'text',
      read: false
    }).select('id').single();
    if (error) throw error;

    // Replace optimistic id with real id
    if(data?.id){
      const optRow=document.querySelector(`[data-msg-id="${optId}"]`);
      if(optRow){
        optRow.dataset.msgId=data.id;
        const optBub=optRow.querySelector('.msg-bubble');
        if(optBub){
          optBub.dataset.msgId=data.id;
          const rp=optBub.querySelector('.reaction-popup');
          if(rp) rp.id=`rp-${data.id}`;
        }
      }
    }
    await loadConversations();
  } catch (err) {
    const optRow=document.querySelector(`[data-msg-id="${optId}"]`);
    if(optRow){
      const bub=optRow.querySelector('.msg-bubble');
      if(bub){
        bub.style.opacity='.45';
        const errEl=document.createElement('div');
        errEl.style.cssText='font-size:10px;color:var(--red);margin-top:3px;cursor:pointer;';
        errEl.textContent='⚠️ Ошибка — нажми для повтора';
        errEl.onclick=()=>{bub.style.opacity='1';errEl.remove();sendMsg(toUserId);};
        bub.appendChild(errEl);
      }
    }
    showToast('Сообщение не доставлено', '⚠️');
  }
}

// ══ FILE / VOICE SENDING ══════════════════════════════════════
let allConvsCache = null;

// Mobile: show/hide msg list
function showMsgListOnMobile() {
  const list = document.getElementById('msgList');
  const chat = document.getElementById('msgChatArea');
  if (list) { list.style.display = 'flex'; list.classList.remove('hidden-mobile'); }
  if (chat) { chat.style.display = 'none'; chat.classList.remove('active'); }
  activeConvUserId = null;
}

// ══════════════════════════════════════════════════════════════
// ODOMETER — Number counter animation
// ══════════════════════════════════════════════════════════════
function animateOdometer(el, endVal, suffix = '') {
  if (!el) return;
  const startVal = 0;
  const duration = 900;
  const startTime = performance.now();
  const isFloat = String(endVal).includes('.');

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = startVal + (endVal - startVal) * ease;
    el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = (isFloat ? endVal.toFixed(1) : endVal) + suffix;
  }
  requestAnimationFrame(step);
}

function animateKpiValues() {
  document.querySelectorAll('.kpi-val[data-num]').forEach(el => {
    const val = parseFloat(el.dataset.num);
    animateOdometer(el, val);
  });
}

// ══ INIT ════════════════════════════════════════════════════

function initRipple(){
  document.querySelectorAll('.btn-p,.btn-cs,.btn-auth,.t-sbtn').forEach(btn=>{
    if(getComputedStyle(btn).position==='static') btn.style.position='relative';
    btn.style.overflow='hidden';
    btn.removeEventListener('click',_addRipple);
    btn.addEventListener('click',_addRipple);
  });
}
function _addRipple(e){
  const btn=e.currentTarget;
  const r=document.createElement('span');
  const rect=btn.getBoundingClientRect();
  const size=Math.max(rect.width,rect.height);
  r.style.cssText=`position:absolute;border-radius:50%;background:rgba(255,255,255,.22);pointer-events:none;width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;transform:scale(0);animation:ripple .48s ease;z-index:0;`;
  btn.appendChild(r);
  setTimeout(()=>r.remove(),520);
}

function initKpiGlow(){
  document.querySelectorAll('.kpi').forEach(kpi=>{
    kpi.addEventListener('mousemove',e=>{
      const r=kpi.getBoundingClientRect();
      kpi.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      kpi.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  });
}

// ── DTR Motion System — stagger helper ──────────────────────────
// animType: 'card' | 'row' | 'pop' | 'num' | 'sec' | 'slide-right'
function staggerList(selector, delay=40, animType='card'){
  const anims = {
    card:        (i) => `dtrFadeScale   .30s ${i*delay}ms cubic-bezier(.34,1.18,.64,1) both`,
    row:         (i) => `dtrSlideInLeft .26s ${i*delay}ms cubic-bezier(.22,1,.36,1) both`,
    pop:         (i) => `dtrPopIn       .34s ${i*delay}ms cubic-bezier(.34,1.18,.64,1) both`,
    num:         (i) => `dtrNumberReveal .28s ${i*delay}ms cubic-bezier(.4,0,.2,1) both`,
    sec:         (i) => `dtrSectionIn   .22s ${i*delay}ms cubic-bezier(.55,0,.1,1) both`,
    'slide-right':(i)=> `dtrSlideInRight .26s ${i*delay}ms cubic-bezier(.22,1,.36,1) both`,
  };
  const fn = anims[animType] || anims.card;
  document.querySelectorAll(selector).forEach((el,i)=>{
    el.style.animation='none';
    void el.offsetHeight; // force reflow
    el.style.animation = fn(i);
  });
}

// ── Animate progress bars (scaleX from 0 to actual width) ─────
function animateBars(selector, delay=0){
  document.querySelectorAll(selector).forEach((el,i)=>{
    const w = el.style.width || el.getAttribute('data-width') || '0%';
    el.style.width = '0%';
    el.style.transition = 'none';
    void el.offsetHeight;
    setTimeout(()=>{
      el.style.transition = `width .9s cubic-bezier(.34,1.18,.64,1) ${i*60}ms`;
      el.style.width = w;
    }, delay + i*40);
  });
}

// ── Animate numbers (count-up reveal) ─────────────────────────
function animateNumbers(selector, delay=0){
  document.querySelectorAll(selector).forEach((el,i)=>{
    el.style.animation='none';
    void el.offsetHeight;
    el.style.animation = `dtrNumberReveal .32s ${delay + i*35}ms cubic-bezier(.4,0,.2,1) both`;
  });
}

// ══ XP / LEVEL ═══════════════════════════════════════
// ── LEVEL SYSTEM (CoD-style) ──────────────────────────────
const LEVEL_THRESHOLDS=[0,5,15,30,50,75,100,150,200,300,500,750,1000,1500,2000,3000];
const LEVEL_NAMES=['Новичок','Ученик','Практик','Следопыт','Исследователь','Боец','Эксперт','Мастер','Ас','Легенда','Гроссмейстер','Элита','Чемпион','Властелин','Легенда+','DTR God'];
const LEVEL_COLORS=['#8b949e','#8b949e','#3fb950','#3fb950','#58a6ff','#58a6ff','#bc8cff','#bc8cff','#f7931a','#f7931a','#f5c842','#f5c842','#f85149','#f85149','linear-gradient(135deg,#f5c842,#f7931a)','linear-gradient(135deg,#f85149,#bc8cff,#58a6ff)'];
const LEVEL_FRAMES=[
  '','',
  'linear-gradient(135deg,#0e2318,#091510)',       // lv2 green
  'linear-gradient(135deg,#0e2318,#091510)',
  'linear-gradient(135deg,#0d1f35,#12082a)',       // lv4 blue
  'linear-gradient(135deg,#0d1f35,#12082a)',
  'linear-gradient(135deg,#1e1428,#120c1a)',       // lv6 purple
  'linear-gradient(135deg,#1e1428,#120c1a)',
  'linear-gradient(135deg,#1e1808,#100e00)',       // lv8 orange
  'linear-gradient(135deg,#1e1808,#100e00)',
  'linear-gradient(135deg,#1A1200,#2A1F00)',       // lv10 gold
  'linear-gradient(135deg,#1A1200,#2A1F00)',
  'linear-gradient(135deg,#200010,#100020,#200010)', // lv12 red-purple
  'linear-gradient(135deg,#200010,#100020,#200010)',
  'linear-gradient(135deg,#1A0A00,#200010,#001020)', // lv14 fire
  'linear-gradient(135deg,#0A0A1A,#1A0A1A,#0A1A1A)', // lv15 god
];
const LEVEL_BORDER_ANIM=[
  '','',
  '','',
  '','',
  '','',
  '','',
  'animation:goldPulse 2s ease infinite;', // lv10+
  'animation:goldPulse 2s ease infinite;',
  'animation:goldPulse 1.5s ease infinite;',
  'animation:goldPulse 1.5s ease infinite;',
  'animation:goldPulse 1s ease infinite;',
  'animation:gradFlow 2s linear infinite;background:linear-gradient(90deg,var(--gold),var(--red),var(--purple),var(--blue),var(--gold));background-size:300% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;',
];

function getLevelInfo(totalHours) {
  let lvl = 0;
  for(let i=LEVEL_THRESHOLDS.length-1;i>=0;i--){
    if(totalHours>=LEVEL_THRESHOLDS[i]){lvl=i;break;}
  }
  const name = LEVEL_NAMES[lvl]||'DTR God';
  const color = LEVEL_COLORS[lvl]||'var(--gold)';
  const frame = LEVEL_FRAMES[Math.min(lvl,LEVEL_FRAMES.length-1)];
  const anim = LEVEL_BORDER_ANIM[Math.min(lvl,LEVEL_BORDER_ANIM.length-1)]||'';
  const nextThresh = LEVEL_THRESHOLDS[lvl+1]||LEVEL_THRESHOLDS[lvl]+1000;
  const curThresh = LEVEL_THRESHOLDS[lvl];
  const pct = Math.min(100,Math.round(((totalHours-curThresh)/(nextThresh-curThresh))*100));
  const xpLeft = Math.max(0,(nextThresh-totalHours).toFixed(1));
  return {lvl:lvl+1, name, color, frame, anim, pct, xpLeft, curThresh, nextThresh};
}

function calcXP(totalHours){return Math.floor(totalHours*100);}
function calcLevel(xp){return Math.floor(Math.sqrt(xp/500))+1;}
function xpForLevel(lvl){return (lvl-1)*(lvl-1)*500;}

function renderXP(){
  const th=totalHrs();
  const info=getLevelInfo(th);
  const el2=document.getElementById('xpLevel');
  const pts=document.getElementById('xpPts');
  const fill=document.getElementById('xpFill');
  if(el2){
    el2.textContent=`Ур. ${info.lvl} · ${info.name}`;
    el2.style.color=info.color.includes('gradient')?'var(--gold)':info.color;
  }
  if(pts)pts.innerHTML=`Осталось <span style="color:#4ade80;font-weight:700">${info.xpLeft}</span> ч до следующего уровня`;
  if(fill)setTimeout(()=>fill.style.width=info.pct+'%',100);
  // Apply frame to profile cover
  applyLevelFrame(info);
}

function applyLevelFrame(info){
  const cover=document.getElementById('phCover');
  if(cover&&info.frame){cover.style.background=info.frame;}
  // Avatar border based on level
  const avEl=document.getElementById('profAv');
  if(avEl&&info.lvl>=10){
    avEl.style.borderColor=info.color.includes('gradient')?'var(--gold)':info.color;
    avEl.style.boxShadow=`0 0 18px ${info.color.includes('gradient')?'rgba(245,200,66,.5)':info.color+'88'}`;
  }
}

// ══ ANIMATED COUNTER ═════════════════════════════════
function animCount(el,end,dur=900){
  if(!el)return;
  const start=parseFloat(el.textContent)||0;
  // Не анимируем если значение не изменилось
  if(Math.abs(start - end) < 0.01) return;
  const isFloat=!Number.isInteger(end)&&String(end).includes('.');
  const t0=performance.now();
  function tick(now){
    const p=Math.min((now-t0)/dur,1);
    const ease=1-Math.pow(1-p,3);
    const v=start+(end-start)*ease;
    el.textContent=isFloat?v.toFixed(1):Math.floor(v).toLocaleString('ru');
    if(p<1)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ══ HEATMAP 365 ══════════════════════════════════════
let _heatmapCache = null;
let _heatmapSessionLen = -1;
function renderHeatmap(){
  const wrap=document.getElementById('tab-heatmap-placeholder');
  if(!wrap)return;
  // Не перестраиваем тепловую карту если данные не изменились
  const sessLen = P.sessions ? P.sessions.length : 0;
  if(_heatmapCache && _heatmapSessionLen === sessLen && wrap.children.length > 0) return;
  _heatmapSessionLen = sessLen;
  const now=Date.now();
  const actMap={};
  P.sessions.forEach(s=>{
    // Используем ts или isoDate — так же как в weekHrs/getDashData
    const t=sessTs(s);
    if(!t||isNaN(t))return;
    const d=new Date(t);
    const key=`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    actMap[key]=(actMap[key]||0)+s.dur/3600;
  });
  const maxH=Math.max(...Object.values(actMap),0.1);
  // Build 52 weeks x 7 days
  const TOTAL=364;
  const cols=[];
  for(let w=51;w>=0;w--){
    const col=[];
    for(let d=6;d>=0;d--){
      const dayAgo=w*7+d;
      const dt=new Date(now-dayAgo*86400000);
      const key=`${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`;
      const h=actMap[key]||0;
      const lv=h===0?0:h<maxH*.25?1:h<maxH*.5?2:h<maxH*.75?3:4;
      col.push({h,lv,date:dt.toLocaleDateString('ru',{day:'2-digit',month:'short'})});
    }
    cols.push(col);
  }
  const colors=['var(--card)','rgba(245,200,66,.15)','rgba(245,200,66,.35)','rgba(245,200,66,.6)','var(--gold)'];
  wrap.innerHTML=`<div class="card">
    <div class="ch"><span class="ct">${t("activity_year")}</span><span style="font-size:11px;color:var(--t3)">${Object.keys(actMap).length} ${t("active_days_cnt")}</span></div>
    <div class="cb">
      <div class="hm-grid">${cols.map(col=>`<div class="hm-col">${col.map(cell=>`<div class="hm-cell" style="background:${colors[cell.lv]}" title="${cell.date}: ${cell.h.toFixed(1)}ч"></div>`).join('')}</div>`).join('')}</div>
      <div class="hm-legend">Меньше ${[0,1,2,3,4].map(l=>`<div style="width:10px;height:10px;border-radius:2px;background:${colors[l]}"></div>`).join('')} Больше</div>
    </div>
  </div>`;
}

// ══ RINGS ════════════════════════════════════════════
let _ringsCache = -1;
function renderRings(){
  const sessLen = P.sessions ? P.sessions.length : 0;
  if(_ringsCache === sessLen) return;
  _ringsCache = sessLen;
  const el=document.getElementById('catRings');if(!el)return;
  const cats=activeCats();if(!cats.length){el.innerHTML='';return;}
  const milestones=[10,25,50,100,200,500];
  el.innerHTML=cats.map(c=>{
    const next=milestones.find(m=>m>c.hours)||milestones[milestones.length-1];
    const prev=milestones[milestones.indexOf(next)-1]||0;
    const pct=Math.min(100,((c.hours-prev)/(next-prev))*100);
    const r=34,circ=2*Math.PI*r;
    const dash=(pct/100)*circ;
    return `<div class="ring-item">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="${r}" fill="none" stroke="var(--bg)" stroke-width="7"/>
        <circle cx="40" cy="40" r="${r}" fill="none" stroke="${c.color}" stroke-width="7"
          stroke-dasharray="${dash} ${circ}" stroke-dashoffset="${circ/4}"
          stroke-linecap="round" style="transition:stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)"/>
        <text x="40" y="36" text-anchor="middle" fill="${c.color}" font-family="Rajdhani,sans-serif" font-size="15" font-weight="700">${c.hours < 10 ? c.hours.toFixed(1) : Math.round(c.hours)}</text>
        <text x="40" y="50" text-anchor="middle" fill="var(--t3)" font-family="Inter,sans-serif" font-size="8">/ ${next}ч</text>
      </svg>
      <div class="ring-name">${c.icon} ${c.name}</div>
      <div class="ring-hrs">${Math.round(pct)}% до ${next}ч</div>
    </div>`;
  }).join('');
}

// ══ PERSONAL RECORDS ════════════════════════════════
function renderRecords(){
  const el=document.getElementById('recGrid');if(!el)return;

  // ── Compute values ──────────────────────────────────────────
  const bestSess=P.sessions.reduce((a,s)=>s.dur>a?s.dur:a,0);
  const now=Date.now();
  let bestWeek=0;
  for(let i=0;i<52;i++){
    const wk=P.sessions.filter(s=>{
      const t=sessTs(s);
      return t>now-(i+1)*7*86400000 && t<=now-i*7*86400000;
    }).reduce((a,s)=>a+s.dur/3600,0);
    if(wk>bestWeek)bestWeek=wk;
  }
  const topCat=P.categories.slice().sort((a,b)=>b.hours-a.hours)[0];

  // ── Card builder ────────────────────────────────────────────
  // nc     = accent color hex/var
  // iconEl = result of iconBox(...)
  // label  = uppercase category label (e.g. "ЛУЧШАЯ СЕССИЯ")
  // val    = main large value string
  // sub    = secondary label (record type / avg / category name)
  const recCard = (nc, iconEl, label, val, sub) => `
    <div class="neon-rec" style="--nc:${nc}">
      ${iconEl}
      <div class="neon-rec-body">
        <div class="neon-rec-lbl">${label}</div>
        <div class="neon-rec-val">${val}</div>
        ${sub ? `<div class="neon-rec-sub">${sub}</div>` : ''}
      </div>
    </div>`;

  el.innerHTML =
    recCard(
      'var(--blue)',
      iconBox('zap','var(--blue)',44,12),
      'Лучшая сессия',
      bestSess > 0 ? fmtD(bestSess) : '—',
      bestSess > 0 ? 'Личный рекорд' : 'Нет данных'
    ) +
    recCard(
      'var(--orange)',
      iconBox('flame','var(--orange)',44,12),
      'Лучшая неделя',
      bestWeek > 0 ? bestWeek.toFixed(1) + ' ч' : '—',
      bestWeek > 0 ? `${(Math.round(bestWeek/7*10)/10).toFixed(1)} ч/день` : 'Нет данных'
    ) +
    recCard(
      topCat?.color || 'var(--purple)',
      topCat
        ? catIconBox(topCat.id, topCat.color, 44)
        : iconBox('trophy','var(--purple)',44,12),
      'Топ категория',
      topCat
        ? (topCat.hours < 10 ? topCat.hours.toFixed(1) : Math.round(topCat.hours)) + ' ч'
        : '—',
      topCat?.name || 'Нет данных'
    );
}

// ══ COMPARISON — REAL DATA ════════════════════════════
let cmpPeriodDays=7;
let _cmpLeagueCache={};

function setCmpPeriod(days){
  cmpPeriodDays=days;
  document.querySelectorAll('.cmp-period-btn').forEach(b=>b.classList.toggle('active',+b.dataset.d===days));
  renderForecast();
}

async function renderForecast(){
  const el=document.getElementById('forecastRow');if(!el)return;
  const now=Date.now(),dayMs=86400000;
  const periodStart=now-cmpPeriodDays*dayMs;
  const days=cmpPeriodDays;
  const cats=activeCats();

  // ── Bar helper ──
  const bar=(myNum,avgNum,myLbl,avgLbl,color='#4ade80')=>{
    const mx=Math.max(myNum,avgNum,0.1);
    const myW=Math.min(100,Math.round((myNum/mx)*100));
    const avgW=Math.min(100,Math.round((avgNum/mx)*100));
    const iWin=myNum>=avgNum;
    return `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:7px">
        <div style="width:54px;font-size:10px;font-weight:700;color:${color};flex-shrink:0">ТЫ</div>
        <div style="flex:1;height:10px;background:var(--bg);border-radius:5px;overflow:hidden">
          <div style="height:100%;width:${myW}%;background:${color};border-radius:5px;transition:width 1s cubic-bezier(.34,1.2,.64,1);${iWin?`box-shadow:0 0 8px ${color}88`:'opacity:.4'}"></div>
        </div>
        <div style="width:46px;text-align:right;font-size:11px;font-weight:700;color:${iWin?color:'rgba(255,255,255,.3)'}">${myLbl}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <div style="width:54px;font-size:9px;font-weight:700;color:#f85149;letter-spacing:.3px;flex-shrink:0">СРЕДНИЙ</div>
        <div style="flex:1;height:10px;background:var(--bg);border-radius:5px;overflow:hidden">
          <div style="height:100%;width:${avgW}%;background:#f85149;border-radius:5px;transition:width 1s cubic-bezier(.34,1.2,.64,1);${!iWin?'box-shadow:0 0 8px #f8514988':'opacity:.4'}"></div>
        </div>
        <div style="width:46px;text-align:right;font-size:10px;font-weight:700;color:${!iWin?'#f85149':'rgba(248,81,73,.3)'}">${avgLbl}</div>
      </div>`;
  };

  // Show loading state
  el.innerHTML=`<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px">
    ${[1,3,7,10,14,30].map(d=>`<button class="cmp-period-btn${cmpPeriodDays===d?' active':''}" data-d="${d}" onclick="setCmpPeriod(${d})">${d===1?'1 день':d<=4?d+' дня':d+' дней'}</button>`).join('')}
  </div><div style="color:var(--t3);font-size:12px;padding:12px 0">⏳ Загружаем данные лиги...</div>`;

  // ── Fetch REAL league data for comparison ──
  const cutISO=new Date(periodStart).toISOString();
  let leaguePlayers=[];
  const cacheKey=cats.map(c=>c.id).join(',')+'-'+days;
  if(_cmpLeagueCache[cacheKey]){
    leaguePlayers=_cmpLeagueCache[cacheKey];
  } else if(!SB_USER?.isDemoUser && cats.length){
    try{
      const userIds=new Set();
      for(const cat of cats){
        const{data:uc}=await sb.from('user_categories').select('user_id,hours').eq('category_id',cat.id).limit(50);
        (uc||[]).forEach(r=>r.user_id!==SB_USER.id&&userIds.add(r.user_id));
      }
      const ids=[...userIds].slice(0,30);
      if(ids.length){
        const{data:sessOthers}=await sb.from('sessions')
          .select('user_id,duration_seconds,created_at')
          .in('user_id',ids).gte('created_at',cutISO);
        const{data:usersOthers}=await sb.from('users').select('id,streak').in('id',ids);
        const streakMap={};(usersOthers||[]).forEach(u=>streakMap[u.id]=u.streak||0);
        // group by user
        const pMap={};
        (sessOthers||[]).forEach(s=>{
          if(!pMap[s.user_id])pMap[s.user_id]={hrs:0,days:new Set(),streak:streakMap[s.user_id]||0};
          pMap[s.user_id].hrs+=s.duration_seconds/3600;
          pMap[s.user_id].days.add(s.created_at.slice(0,10));
        });
        leaguePlayers=Object.values(pMap);
        _cmpLeagueCache[cacheKey]=leaguePlayers;
      }
    } catch(e){ console.warn('cmp fetch error',e); }
  }

  // ── Compute real averages ──
  const othersCount=leaguePlayers.length||1;
  const avgHrs=leaguePlayers.length
    ? parseFloat((leaguePlayers.reduce((s,p)=>s+p.hrs,0)/othersCount).toFixed(1))
    : 0;
  const avgStreakReal=leaguePlayers.length
    ? Math.round(leaguePlayers.reduce((s,p)=>s+p.streak,0)/othersCount)
    : 0;
  const avgActiveDays=leaguePlayers.length
    ? parseFloat((leaguePlayers.reduce((s,p)=>s+p.days.size,0)/othersCount).toFixed(1))
    : 0;

  // ── MY stats ──
  const mySessInPeriod=P.sessions.filter(s=>sessTs(s)>=periodStart);
  const myHrs=parseFloat(mySessInPeriod.reduce((s,x)=>s+x.dur/3600,0).toFixed(1));
  const myActiveDays=new Set(mySessInPeriod.map(s=>new Date(sessTs(s)).toISOString().slice(0,10))).size;
  const myStreak=P.streak||0;

  // ── Per category hours ──
  const catCards=cats.map(cat=>{
    const myCatHrs=parseFloat(mySessInPeriod.filter(s=>s.cat===cat.id).reduce((s,x)=>s+x.dur/3600,0).toFixed(1));
    const avgCatHrs=parseFloat((avgHrs/Math.max(cats.length,1)).toFixed(1));
    const diff=parseFloat((myCatHrs-avgCatHrs).toFixed(1));
    const cls=diff>0.1?'up':diff<-0.1?'dn':'eq';
    const diffLbl=diff>0?`+${diff}ч`:diff<0?`${diff}ч`:'±0ч';
    return `<div class="cmp-card" style="--cmp-c:${cat.color}">
      <div class="cmp-title" style="color:${cat.color};display:flex;align-items:center;gap:6px">
        <span style="display:flex;align-items:center;justify-content:center;width:14px;height:14px;color:${cat.color}">
          ${(typeof ICONS !== 'undefined' && ICONS[cat.id]) ? ICONS[cat.id].replace(/width="20" height="20"/g,'width="14" height="14"') : ''}
        </span>
        ${cat.name}
      </div>
      <div class="cmp-bars">${bar(myCatHrs,avgCatHrs,myCatHrs+'ч',avgCatHrs+'ч',cat.color)}</div>
      <div style="margin-top:5px;font-size:10px;color:var(--t3)">Среднее по лиге за ${days} дн.: ${avgCatHrs}ч · ${othersCount} игроков</div>
      <span class="cmp-diff ${cls}">${diffLbl} ${cls==='up'?'выше среднего':cls==='dn'?'ниже среднего':'на уровне'}</span>
    </div>`;
  }).join('');

  // ── Streak diff ──
  const streakDiff=myStreak-avgStreakReal;
  const streakCls=streakDiff>0?'up':streakDiff<0?'dn':'eq';

  // ── Active days diff ──
  const daysDiff=parseFloat((myActiveDays-avgActiveDays).toFixed(1));
  const daysCls=daysDiff>0?'up':daysDiff<0?'dn':'eq';

  el.innerHTML=`
    <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:12px">
      ${[1,3,7,10,14,30].map(d=>`<button class="cmp-period-btn${cmpPeriodDays===d?' active':''}" data-d="${d}" onclick="setCmpPeriod(${d})">${d===1?'1 день':d<=4?d+' дня':d+' дней'}</button>`).join('')}
    </div>
    <div style="font-size:12px;color:var(--t2);margin-bottom:10px;font-weight:700;letter-spacing:.6px;text-transform:uppercase">
      Сравнение с <span style="color:#4ade80">${othersCount}</span> ${othersCount===1?'участником':'участниками'} твоих лиг · за <span style="color:var(--gold)">${days} ${days===1?'день':days<=4?'дня':'дней'}</span>
    </div>

    <div class="cmp-card">
      <div class="cmp-title" style="color:var(--gold);display:flex;align-items:center;gap:6px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Общие часы за период</div>
      <div class="cmp-bars">${bar(myHrs,avgHrs,myHrs+'ч',avgHrs+'ч','var(--gold)')}</div>
      <div style="margin-top:5px;font-size:10px;color:var(--t3)">Среднее по лигам: ${avgHrs}ч</div>
      <span class="cmp-diff ${myHrs>=avgHrs?'up':'dn'}">${myHrs>=avgHrs?'+':''}${(myHrs-avgHrs).toFixed(1)}ч ${myHrs>=avgHrs?'выше среднего':'ниже среднего'}</span>
    </div>

    <div class="cmp-card">
      <div class="cmp-title" style="color:#f85149;display:flex;align-items:center;gap:6px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg> Дисциплина — последовательность</div>
      <div class="cmp-bars">${bar(myStreak,avgStreakReal,myStreak+' д',avgStreakReal+' д','#f85149')}</div>
      <div style="margin-top:5px;font-size:10px;color:var(--t3)">Средняя дисциплина в лиге: ${avgStreakReal} дней</div>
      <span class="cmp-diff ${streakCls}">${streakDiff>0?'+':''}${streakDiff} д ${streakCls==='up'?'выше среднего':streakCls==='dn'?'ниже среднего':'на уровне'}</span>
    </div>

    <div class="cmp-card">
      <div class="cmp-title" style="color:var(--blue);display:flex;align-items:center;gap:6px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Активных дней</div>
      <div class="cmp-bars">${bar(myActiveDays,avgActiveDays,myActiveDays+' д',avgActiveDays+' д','var(--blue)')}</div>
      <div style="margin-top:5px;font-size:10px;color:var(--t3)">Среднее по лиге: ${avgActiveDays} дней активности</div>
      <span class="cmp-diff ${daysCls}">${daysDiff>0?'+':''}${daysDiff} д ${daysCls==='up'?'выше среднего':daysCls==='dn'?'ниже среднего':'на уровне'}</span>
    </div>

    ${catCards}`;
}

// ══ CONFETTI ═════════════════════════════════════════
function launchConfetti(){
  const canvas=document.createElement('canvas');
  canvas.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.appendChild(canvas);
  canvas.width=window.innerWidth;canvas.height=window.innerHeight;
  const ctx=canvas.getContext('2d');
  const colors=['#1a9fff','#3fb950','#bc8cff','#f7931a','#ff6b6b','#ffd700'];
  const particles=Array.from({length:120},()=>({
    x:Math.random()*canvas.width,y:-20,r:Math.random()*5+2,
    color:colors[Math.floor(Math.random()*colors.length)],
    tilt:Math.random()*10-10,tiltAngle:0,
    tiltInc:Math.random()*.07+.05,speed:Math.random()*2+1.5
  }));
  let angle=0,frame;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    angle+=.01;
    particles.forEach(p=>{
      p.tiltAngle+=p.tiltInc;p.y+=p.speed*(Math.cos(angle+p.r/2)+1.5);
      p.x+=Math.sin(angle)*.8;p.tilt=Math.sin(p.tiltAngle)*12;
      ctx.beginPath();ctx.lineWidth=p.r;ctx.strokeStyle=p.color;
      ctx.moveTo(p.x+p.tilt+p.r/3,p.y);ctx.lineTo(p.x+p.tilt,p.y+p.tilt+p.r/3);ctx.stroke();
    });
    if(particles.some(p=>p.y<canvas.height))frame=requestAnimationFrame(draw);
    else canvas.remove();
  }
  draw();setTimeout(()=>{cancelAnimationFrame(frame);if(canvas.parentNode)canvas.remove();},4000);
}

// ══ MOTIVATION MESSAGE ══════════════════════════════
function getMotivation(){
  const h=totalHrs(),s=P.streak||0;
  if(s>=7)return{icon:'🔥',text:`<b>${s} ${t('mot_streak7')}`};
  if(s>=3)return{icon:'⚡',text:`<b>${s} ${t('mot_streak3')}`};
  if(h>=100)return{icon:'💎',text:`<b>${h.toFixed(0)} ${t('mot_hrs100')}`};
  if(h>=10)return{icon:'📈',text:`<b>${h.toFixed(0)} ${t('mot_hrs10')}`};
  if(P.totalSessions===0)return{icon:'🚀',text:t('mot_start')};
  return{icon:'🌱',text:t('mot_default')};
}
function renderMotivation(){
  const el=document.getElementById('motBanner');if(!el)return;
  const m=getMotivation();
  el.innerHTML=`<div class="mot-icon">${m.icon}</div><div class="mot-text">${m.text}</div>`;
}

// ══ AVATAR PHOTO UPLOAD ══════════════════════════════
let avPhotoFile=null;
function previewAvPhoto(input){
  const file=input.files[0];if(!file)return;
  if(file.size>2*1024*1024){showToast('Макс 2MB','⚠️');return;}
  avPhotoFile=file;
  const reader=new FileReader();
  reader.onload=e=>{
    document.getElementById('avPhotoImg').src=e.target.result;
    document.getElementById('avPhotoPrev').style.display='block';
    document.getElementById('avUploadHint').style.display='none';
  };
  reader.readAsDataURL(file);
}

async function uploadAvatarPhoto(){
  if(!avPhotoFile||SB_USER?.isDemoUser)return null;
  const ext=(avPhotoFile.name||'photo.jpg').split('.').pop().toLowerCase()||'jpg';
  const path=`${SB_USER.id}.${ext}`;
  const{error}=await sb.storage.from('avatars').upload(path,avPhotoFile,{upsert:true,contentType:avPhotoFile.type||'image/jpeg'});
  if(error){console.error('Storage upload error:',error);return null;}
  const{data}=sb.storage.from('avatars').getPublicUrl(path);
  // Return clean URL - add cache buster only for current session rendering
  const cleanUrl=data.publicUrl;
  return cleanUrl;
}

function getAvatarDisplay(size=48){
  if(P.avatarUrl){
    return `<img src="${P.avatarUrl}" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;border:2px solid var(--blue)" onerror="this.style.display='none'">`;
  }
  return null;
}


// ══ TRANSLATIONS ══════════════════════════════════════
const T = {
  arena:'⚔️ Арена', session:'▶ Сессия',
  tab_dash:'📊 Дашборд', tab_arena:'⚔️ Арена', tab_hist:'История',
  tab_ach:'Награды', tab_manage:'🎮 Лиги',
  dashboard:'Дашборд', week:'Неделя', month:'Месяц',
  hrs_week:'Часов за неделю', hrs_month:'Часов за месяц',
  hrs_day:'Часов в день', goal:'цель: 2 ч/день',
  active_days:'Активных дней', best_day:'Лучший день',
  hrs_per_day:'часов за 1 день', top_period:'Топ за период',
  goal_pct:'Выполнение цели', streak_cur:'Текущая дисциплина',
  cat_filter_all:'Все', by_cat:'По категориям',
  kpi_section:'Ключевые показатели', records:'Личные рекорды',
  forecast:'Прогноз', activity_year:'Активность — год',
  active_days_cnt:'активных дней', progress:'Прогресс по лигам',
  best_session:'Лучшая сессия', best_week:'Лучшая неделя', top_cat:'Топ категория',
  no_data:'Нет данных',
  days_to:'до', at_pace:'при текущем темпе',
  month_forecast:'прогноз на месяц', avg_day:'среднее в день',
  mot_streak7:'дней подряд! Ты в зоне. Это уже привычка.',
  mot_streak3:'дня дисциплина — продолжай, ещё немного до недели!',
  mot_hrs100:'часов — ты вкладываешь в себя по-настоящему.',
  mot_hrs10:'часов вложено. Каждый час делает тебя лучше.',
  mot_start:'Запусти первую сессию — твой путь начинается здесь.',
  mot_default:'Маленькие шаги каждый день создают большие результаты.',
  quick_start:'Быстрый старт', choose_act:'Выбери активность и нажми Старт',
  start:'▶ СТАРТ', stop:'⏹ СТОП', hrs_in_self:'Часов в себя',
  days_streak:'дней подряд', hrs_7days:'+0.0 ч эта неделя',
  arena_title:'Арена', participants:'участников', top3:'Топ-3 🔥',
  all_sessions:'Все сессии',
  achievements:'Награды', unlocked:'Получено',
  manage_title:'Управление ареной',
  manage_desc:'Выбери направления — ты попадёшь в арену с людьми у которых те же цели.',
  profile:'Профиль',
  login:'Войти', register:'Регистрация', username:'Никнейм',
  password:'Пароль', login_btn:'ВОЙТИ', register_btn:'СОЗДАТЬ ПРОФИЛЬ',
  demo:'▶ Демо-аккаунт', wrong_creds:'Неверный никнейм или пароль',
  theme:'Тема', dark:'Тёмная', light:'Светлая',
  step1:'Шаг 1 из 2', step2:'Шаг 2 из 2',
  choose_dir:'Выбери свои направления',
  dir_desc:'Ты попадёшь в лиги с людьми у которых те же цели. Потом можно изменить.',
  selected:'Выбрано:', creating:'СОЗДАЁМ...',
  toast_av:'Аватар обновлён!', toast_sess_saved:'Сессия сохранена',
  toast_ach:'Достижение разблокировано',
  level:'Уровень',
  no_sessions:'Нет сессий', days:'дн', hrs:'ч', min:'мин',
  vs_prev:'к прошлому', last_sess:'Последний', never:'никогда',
  ach_progress:'Прогресс разблокировки', hrs_max:'ч макс.',
  to_leader:'до лидера', your_pos:'Твоя позиция',
  days_streak_lbl:'дней дисциплина', loading_leagues:'Загрузка лиг...',
  no_active_cats:'Нет активных категорий', added_to_league:'Добавлено в лигу!',
  hrs_for_7:'ч эта неделя', hrs_cnt:'Часов', ach_cnt:'Наград', streak_cnt:'Дисциплина',
  active_cnt:'Активных дней',
  mot_better:'% лучше прошлого периода. Рост очевиден.',
  mot_stable:'— стабильный темп.',
  mot_zero_w:'На этой неделе сессий не было. Самое время начать!',
  mot_zero_m:'В этом месяце сессий не было. Самое время начать!',
  mot_invest:'часов вложено. Каждый час — инвестиция в себя.',
  mot_active:'Активен', mot_from:'из', mot_better_prefix:'На',
  my_report:'Мой отчёт за', report_hrs:'⏱ Часов', report_days:'📅 Активных дней',
  in_league:'в лиге', at_you:'у тебя', sessions_cnt:'сессий',
  no_sess_lbl:'Нет сессий',
};
const LANG = 'ru';
let THEME = localStorage.getItem('lt_theme')||'dark';

function t(key){ return T[key] || key; }

function applyLang(){
  // Keep UI labels in sync — always Russian
  const arenaBtn = document.querySelector('.nb[onclick*="leagues"]');
  if(arenaBtn) arenaBtn.textContent = t('arena');
  const sessBtn = document.querySelector('.nb.nb-p[onclick*="openSess"]');
  if(sessBtn) sessBtn.textContent = t('session');
  // Tab labels are hardcoded in Russian — no replacement needed
  const dpW = document.getElementById('dpW');
  const dpM = document.getElementById('dpM');
  if(dpW) dpW.textContent = t('week');
  if(dpM) dpM.textContent = t('month');
  const ltheme = document.getElementById('lbl_theme');
  if(ltheme) ltheme.textContent = t('theme');
  renderXP(); renderMotivation();
}

function applyTheme(){
  document.body.style.transition='background-color .3s,color .3s';
  setTimeout(()=>document.body.style.transition='',350);
  document.documentElement.setAttribute('data-theme', THEME==='light'?'light':'');
  const btn = document.getElementById('tglTheme');
  if(btn){ btn.classList.toggle('on', THEME==='light'); }
}

function toggleTheme(){
  THEME = THEME==='light'?'dark':'light';
  localStorage.setItem('lt_theme', THEME);
  applyTheme();
}

function toggleLang(){} // disabled — RU only

let settingsOpen = false;
function toggleSettings(e){
  if(e) e.stopPropagation();
  settingsOpen = !settingsOpen;
  const p = document.getElementById('settingsPanel');
  if(p) p.style.display = settingsOpen?'block':'none';
  if(settingsOpen){

    const tt = document.getElementById('tglTheme');
    if(tt) tt.classList.toggle('on', THEME==='light');
  }
}
// Close settings on outside click
document.addEventListener('click', e=>{
  if(!settingsOpen) return;
  if(e.target.closest('#settingsPanel') || e.target.closest('#settingsBtn')) return;
  settingsOpen=false;
  const p = document.getElementById('settingsPanel');
  if(p) p.style.display='none';
});

// ══ CATEGORY FILTER ═══════════════════════════════════
let dashCatFilter = null; // null = all

function setDashCatFromSel(sel) {
  dashCatFilter = sel.value || null;
  const m=document.getElementById('lgDropMenu');
  if(m)m.style.display='none';
  renderCatFilter();
  renderDash();
}

function toggleLeagueDrop(){
  const m=document.getElementById('lgDropMenu');
  if(!m)return;
  m.style.display=m.style.display==='none'?'block':'none';
}
document.addEventListener('click',e=>{
  const m=document.getElementById('lgDropMenu');
  if(!m||m.style.display==='none')return;
  if(!e.target.closest('#leagueSelWrap'))m.style.display='none';
});

function renderCatFilter(){
  const cats=activeCats();
  // Populate dropdown items
  const menu=document.getElementById('lgDropItems');
  const btn=document.getElementById('lgDropBtn');
  const lbl=document.getElementById('lgDropLabel');
  if(menu){
    const allActive=!dashCatFilter;
    menu.innerHTML=`<div onclick="setDashCatFromSel({value:''})" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;cursor:pointer;background:${allActive?'rgba(245,200,66,.1)':'transparent'};transition:background .14s">
      <div style="width:28px;height:28px;border-radius:8px;background:rgba(245,200,66,.15);border:0.5px solid rgba(245,200,66,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${allActive?'var(--gold)':'rgba(255,255,255,.5)'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
      </div>
      <div style="flex:1"><div style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:${allActive?'var(--gold)':'var(--t1)'}">Все лиги</div></div>
      ${allActive?`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`:''}
    </div>`+cats.map(c=>{
      const isActive=dashCatFilter===c.id;
      return `<div onclick="setDashCatFromSel({value:'${c.id}'})" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;cursor:pointer;background:${isActive?'rgba(245,200,66,.08)':'transparent'};transition:background .14s" onmouseover="this.style.background='rgba(255,255,255,.06)'" onmouseout="this.style.background='${isActive?'rgba(245,200,66,.08)':'transparent'}'">
        <div style="width:28px;height:28px;border-radius:8px;background:${c.color}18;border:0.5px solid ${c.color}30;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:${c.color}">${ICONS[{read:"read",lang:"lang",code:"code",trading:"trading",cooking:"cooking",intellect:"intellect"}[c.id]]||c.icon}</div>
        <div style="flex:1">
          <div style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:${isActive?'var(--gold)':c.color}">${c.name}</div>
        </div>
        ${isActive?`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`:''}
      </div>`;
    }).join('');
    // Update button label + color + icon
    if(lbl){
      const sel=cats.find(c=>c.id===dashCatFilter);
      lbl.textContent=sel?sel.name:' Все лиги';
    }
    if(btn){
      const sel=cats.find(c=>c.id===dashCatFilter);
      const wrap=btn.parentElement;
      if(sel){
        // League selected — use its color as bg
        const col=sel.color;
        // Luma check: light color → dark text, dark color → white text
        const hex=col.replace('#','');
        const r=parseInt(hex.substr(0,2),16),g=parseInt(hex.substr(2,2),16),b=parseInt(hex.substr(4,2),16);
        const luma=0.299*r+0.587*g+0.114*b;
        const textCol=luma>155?'rgba(0,0,0,.85)':'rgba(255,255,255,.95)';
        btn.style.color=textCol;
        if(wrap){
          wrap.style.background=col;
          wrap.style.boxShadow=`0 2px 12px ${col}66`;
          wrap.style.borderColor='transparent';
        }
        // Replace leading SVG with league's own SVG icon
        const firstSvg=btn.querySelector('svg');
        if(firstSvg && typeof ICONS!=='undefined' && ICONS[sel.id]){
          const tmp=document.createElement('div');
          tmp.innerHTML=ICONS[sel.id].replace(/width="20" height="20"/g,'width="13" height="13"');
          const newSvg=tmp.querySelector('svg');
          if(newSvg){
            newSvg.style.strokeWidth='2.5';
            firstSvg.replaceWith(newSvg);
          }
        }
        // Tint all svgs in btn to match textCol
        btn.querySelectorAll('svg').forEach(s=>{ s.style.color=textCol; });
      } else {
        // All leagues — neutral
        btn.style.color='rgba(255,255,255,.45)';
        if(wrap){
          wrap.style.background='rgba(255,255,255,.07)';
          wrap.style.boxShadow='none';
          wrap.style.borderColor='rgba(255,255,255,.08)';
        }
        // Restore trophy SVG
        const firstSvg=btn.querySelector('svg');
        if(firstSvg){
          const tmp=document.createElement('div');
          tmp.innerHTML=`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>`;
          const newSvg=tmp.querySelector('svg');
          if(newSvg)firstSvg.replaceWith(newSvg);
        }
        btn.querySelectorAll('svg').forEach(s=>{ s.style.color=''; });
      }
    }
  }

  const el=document.getElementById('dashCatFilter');
  if(!el)return;
  el.innerHTML=`<button class="cf-btn ${!dashCatFilter?'active':''}" onclick="setDashCat(null)">${t('cat_filter_all')}</button>`
    +cats.map(c=>`<button class="cf-btn ${dashCatFilter===c.id?'active':''}" onclick="setDashCat('${c.id}')" style="${dashCatFilter===c.id?`border-color:${c.color};background:${c.color}22;color:${c.color}`:''}">
      ${c.icon} ${c.name}</button>`).join('');
}

function setDashCat(id){
  dashCatFilter = id;
  renderCatFilter();
  renderDash();
}



// ══════════════════════════════════════════════════════════════
// 3. PWA MANIFEST — inject programmatically
// ══════════════════════════════════════════════════════════════
function injectPWAManifest(){
  const manifest = {
    name: 'DTR Progress Club',
    short_name: 'DTR',
    description: 'Геймифицированный трекер саморазвития с лигами и соревнованием',
    start_url: '/index.html',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#080808',
    theme_color: '#080808',
    icons: [],
    categories: ['productivity', 'lifestyle', 'health'],
    lang: 'ru',
  };
  const blob = new Blob([JSON.stringify(manifest)], {type:'application/manifest+json'});
  const url = URL.createObjectURL(blob);
  const link = document.getElementById('pwaManifest');
  if(link) link.href = url;
}

// ══════════════════════════════════════════════════════════════
// 4. SERVICE WORKER — offline support
// ══════════════════════════════════════════════════════════════
function registerServiceWorker(){
  /* SW requires a real file on same origin — skipped for single-file build */
}

// ══════════════════════════════════════════════════════════════
// 5. INIT ON APP LOAD
// ══════════════════════════════════════════════════════════════
window.addEventListener('load', ()=>{
  injectPWAManifest();
  registerServiceWorker();
});


// ══════════════════════════════════════════════════════════════
// GOOGLE ANALYTICS 4 — EVENT TRACKING
// Все события отправляются через gtag() без изменения логики
// ══════════════════════════════════════════════════════════════
(function(){
  if(typeof gtag !== 'function') return;

  // ── helpers ───────────────────────────────────────────────
  function track(event, params){
    try { gtag('event', event, params || {}); } catch(e){}
  }

  // ── 1. РЕГИСТРАЦИЯ ────────────────────────────────────────
  // finishReg — вызывается при успешном создании аккаунта
  const _origFinishReg = window.finishReg;
  window.finishReg = async function(){
    const result = _origFinishReg ? await _origFinishReg.apply(this, arguments) : undefined;
    // Tracking fires after Supabase signup — check user was created
    if(SB_USER || P){
      track('sign_up', { method: 'email' });
    }
    return result;
  };

  // ── 2. ВХОД ───────────────────────────────────────────────
  const _origDoLogin = window.doLogin;
  window.doLogin = async function(){
    await (_origDoLogin ? _origDoLogin.apply(this, arguments) : null);
    if(SB_USER){
      track('login', { method: 'email' });
    }
  };

  // ── 3. СЕССИЯ СОХРАНЕНА ───────────────────────────────────
  const _origSaveSessionGA = window.saveSession;
  window.saveSession = async function(catId, secs){
    const result = _origSaveSessionGA ? await _origSaveSessionGA.apply(this, arguments) : undefined;
    if(secs > 30){
      const cat = P?.categories?.find(c => c.id === catId);
      track('session_saved', {
        category_id:   catId,
        category_name: cat?.name || catId,
        duration_min:  Math.round(secs / 60),
        duration_sec:  secs,
      });
    }
    return result;
  };

  // ── 4. ВЫБОР / СНЯТИЕ КАТЕГОРИИ ───────────────────────────
  const _origToggleCatGA = window.toggleCatEpic;
  window.toggleCatEpic = function(id){
    const wasBefore = P?.activeCatIds?.includes(id);
    if(_origToggleCatGA) _origToggleCatGA.apply(this, arguments);
    const isNow = P?.activeCatIds?.includes(id);
    track(isNow ? 'category_selected' : 'category_removed', {
      category_id: id
    });
  };

  // ── 5. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ───────────────────────────────
  const _origShowTabGA = window.showTab;
  window.showTab = function(name, el, skipHistory){
    if(_origShowTabGA) _origShowTabGA.apply(this, arguments);
    track('tab_view', { tab_name: name });
    // Virtual page_view for SPA
    gtag('event', 'page_view', {
      page_title:    'DTR — ' + name,
      page_location: location.href,
      page_path:     '/' + name
    });
  };

  // ── 6. ДОСТИЖЕНИЕ ПРОСМОТРЕНО / РАЗБЛОКИРОВАНО ────────────
  const _origOpenAchGA = window.openAch;
  window.openAch = function(id){
    if(_origOpenAchGA) _origOpenAchGA.apply(this, arguments);
    const ua = P?.achievements?.find(a => a.id === id);
    track('achievement_viewed', {
      achievement_id: id,
      unlocked: ua?.unlocked ? 'yes' : 'no'
    });
  };

  // Разблокировка достижения — перехватываем showToast с isAch=true
  const _origShowToastGA = window.showToast;
  window.showToast = function(msg, icon, isAch, sub){
    if(_origShowToastGA) _origShowToastGA.apply(this, arguments);
    if(isAch){
      track('achievement_unlocked', { achievement_label: msg });
    }
  };

  // ── 7. ЭКСПОРТ ДАННЫХ ─────────────────────────────────────
  // ── 8. ШЕРИНГ ПРОФИЛЯ ────────────────────────────────────
  // ── 9. ТАЙМЕР — старт / стоп ─────────────────────────────
  const _origToggleQuickGA = window.toggleQuick;
  window.toggleQuick = function(){
    const wasBefore = window.timerRunning;
    if(_origToggleQuickGA) _origToggleQuickGA.apply(this, arguments);
    const isNow = window.timerRunning;
    if(!wasBefore && isNow){
      track('timer_start', { mode: 'free', category_id: window.quickSel || '' });
    }
  };


  // ── 11. ONBOARDING — просмотр слайдов ────────────────────
  // Patch slide auto-advance (nextBSlide called by interval)
  const _origNextBSlide = window.nextBSlide;
  let _obStep = 0;
  window.nextBSlide = function(){
    if(_origNextBSlide) _origNextBSlide.apply(this, arguments);
    _obStep++;
    track('onboarding_step', { step: _obStep });
  };

  // ── 12. ПРОФИЛЬ ОТКРЫТ ───────────────────────────────────
  const _origOpenPubGA = window.openPub;
  window.openPub = async function(){
    if(_origOpenPubGA) await _origOpenPubGA.apply(this, arguments);
    track('profile_view', { viewer: P?.name || 'unknown' });
  };

  // ── 13. ЛИГА — просмотр ──────────────────────────────────
  const _origOpenLeagueGA = window.openLeagueProfile;
  if(_origOpenLeagueGA){
    window.openLeagueProfile = function(){
      if(_origOpenLeagueGA) _origOpenLeagueGA.apply(this, arguments);
      track('league_profile_view', {});
    };
  }

  // ── 14. ОШИБКИ JS — глобальные ───────────────────────────
  window.addEventListener('error', function(e){
    track('js_error', {
      error_message: e.message?.slice(0,100),
      error_source:  e.filename?.replace(location.origin,'')?.slice(0,100),
      error_line:    e.lineno
    });
  });

})();





// ══════════════════════════════════════════════════════════════
// NOTIFICATION SYSTEM
// ══════════════════════════════════════════════════════════════

const NOTIF_STORAGE_KEY = 'dtr_notifications_v1';
const NOTIF_MELODIES = [
  { id: 'chime',   name: 'Колокольчик', desc: 'Нежный перезвон' },
  { id: 'gong',    name: 'Гонг',        desc: 'Глубокий удар' },
  { id: 'pulse',   name: 'Пульс',       desc: 'Ритмичный сигнал' },
];
const NOTIF_DAYS_RU = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
let _notifSchedules = [];
let _notifTimers = [];
let _notifSelMelody = 'chime';
let _notifSelDays = [0,1,2,3,4]; // Mon–Fri default

function _loadNotifSchedules() {
  try { _notifSchedules = JSON.parse(localStorage.getItem(NOTIF_STORAGE_KEY) || '[]'); } catch { _notifSchedules = []; }
}
function _saveNotifSchedules() {
  localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(_notifSchedules));
}

// ── Audio engine for melodies ──────────────────────────────────
function _playMelody(id) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const g = ctx.createGain();
  g.connect(ctx.destination);
  const now = ctx.currentTime;

  const seq = (freq, start, dur, vol=0.4) => {
    const o = ctx.createOscillator();
    const eg = ctx.createGain();
    o.connect(eg); eg.connect(g);
    o.frequency.value = freq;
    eg.gain.setValueAtTime(0, now+start);
    eg.gain.linearRampToValueAtTime(vol, now+start+0.01);
    eg.gain.exponentialRampToValueAtTime(0.001, now+start+dur);
    o.start(now+start); o.stop(now+start+dur+0.05);
  };

  if (id === 'chime') {
    o => void 0;
    seq(1047, 0,    0.4, 0.3);
    seq(1319, 0.15, 0.4, 0.25);
    seq(1568, 0.3,  0.5, 0.2);
    seq(2093, 0.5,  0.8, 0.15);
  } else if (id === 'pulse') {
    [0, 0.25, 0.5].forEach(t => seq(880, t, 0.15, 0.35));
  } else if (id === 'gong') {
    const o = ctx.createOscillator();
    const eg = ctx.createGain();
    o.type = 'sine'; o.frequency.value = 196;
    o.connect(eg); eg.connect(g);
    eg.gain.setValueAtTime(0.5, now);
    eg.gain.exponentialRampToValueAtTime(0.001, now+3);
    o.start(now); o.stop(now+3.1);
  } else if (id === 'digital') {
    seq(1760, 0, 0.08, 0.4); seq(2349, 0.1, 0.08, 0.4);
    seq(1760, 0.2, 0.08, 0.4); seq(2349, 0.3, 0.12, 0.4);
  } else {
    // default — simple beep
    seq(880, 0, 0.3, 0.4); seq(1047, 0.35, 0.4, 0.35);
  }
  setTimeout(() => { try { ctx.close(); } catch {} }, 4000);
}

// ── Open / close modal ─────────────────────────────────────────
function openNotifSettings() {
  _loadNotifSchedules();
  const ov = document.getElementById('notifSettingsOv');
  ov.style.display = 'flex';
  _renderNotifDayBtns();
  _renderNotifMelodies();
  _renderNotifScheduleList();
  _updateNotifPermUI();
  // Init drum pickers
  setTimeout(() => {
    _initDrumPicker('drumHour', 9);
    _initDrumPicker('drumMinute', 0, true); // minutes: 0→0min, 1→5min, etc.
  }, 100);
}

function closeNotifSettings() {
  document.getElementById('notifSettingsOv').style.display = 'none';
}

// ── Drum/scroll time picker ──────────────────────────────────
function _initDrumPicker(id, defaultVal, isMinute=false) {
  const el = document.getElementById(id);
  if (!el) return;
  const itemH = 44;
  const idx = isMinute ? Math.round(defaultVal / 5) : defaultVal;
  el.scrollTop = idx * itemH;
  _highlightDrum(el, isMinute);
}

function syncDrum(type, el) {
  const isMinute = type === 'minute';
  _highlightDrum(el, isMinute);
  // Update hidden select
  const itemH = 44;
  const idx = Math.round(el.scrollTop / itemH);
  const val = isMinute ? String(idx * 5).padStart(2,'0') : String(idx).padStart(2,'0');
  const sel = document.getElementById(isMinute ? 'notifMinute' : 'notifHour');
  if (sel) { sel.innerHTML = `<option value="${val}" selected>${val}</option>`; }
}

function _highlightDrum(el, isMinute) {
  const itemH = 44;
  const idx = Math.round(el.scrollTop / itemH);
  el.querySelectorAll('.drum-item').forEach((item, i) => {
    const dist = Math.abs(i - idx);
    if (dist === 0) {
      item.style.color = 'var(--t1)';
      item.style.fontSize = '26px';
      item.style.opacity = '1';
    } else if (dist === 1) {
      item.style.color = 'rgba(255,255,255,.3)';
      item.style.fontSize = '21px';
      item.style.opacity = '0.6';
    } else {
      item.style.color = 'rgba(255,255,255,.12)';
      item.style.fontSize = '17px';
      item.style.opacity = '0.3';
    }
  });
}

function _detectBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes('YaBrowser') || ua.includes('Yandex')) return 'yandex';
  if (ua.includes('OPR') || ua.includes('Opera')) return 'opera';
  if (ua.includes('Edg/')) return 'edge';
  if (ua.includes('Firefox')) return 'firefox';
  if (ua.includes('Chrome')) return 'chrome';
  if (ua.includes('Safari')) return 'safari';
  return 'chrome';
}

function _getBrowserUnblockSteps() {
  const br = _detectBrowser();
  const url = location.href.replace(location.hash,'');
  const steps = {
    chrome:  `1. Нажми на <b>🔒 замок</b> (или ⓘ) в адресной строке<br>2. Найди <b>«Уведомления»</b> → установи <b>«Разрешить»</b><br>3. Обнови страницу`,
    yandex:  `1. Нажми на <b>🔒 замок</b> в адресной строке слева<br>2. Найди <b>«Уведомления»</b> → поставь <b>«Разрешить»</b><br>3. Нажми <b>«Обновить»</b>`,
    edge:    `1. Нажми на <b>🔒 замок</b> в адресной строке<br>2. Перейди в <b>«Разрешения для этого сайта»</b><br>3. Найди <b>«Уведомления»</b> → выбери <b>«Разрешить»</b><br>4. Обнови страницу`,
    firefox: `1. Нажми на <b>🔒 замок</b> в адресной строке<br>2. Нажми стрелку <b>›</b> рядом с «Подключение защищено»<br>3. Нажми <b>«Дополнительные сведения»</b> → вкладка <b>«Разрешения»</b><br>4. Найди <b>«Отправлять уведомления»</b> → сними блокировку`,
    safari:  `1. Открой меню <b>Safari → Настройки → Веб-сайты</b><br>2. Выбери <b>«Уведомления»</b><br>3. Найди <b>${url}</b> → выбери <b>«Разрешить»</b>`,
    opera:   `1. Нажми на <b>🔒 замок</b> в адресной строке<br>2. Найди <b>«Уведомления»</b> → выбери <b>«Разрешить»</b><br>3. Обнови страницу`,
  };
  return steps[br] || steps.chrome;
}

function notifOpenBrowserSettings() {
  const br = _detectBrowser();

  // Internal browser URLs can't be opened by window.open — show a visual popup instead
  const overlayId = 'notifBrowserHelpOv';
  const existing = document.getElementById(overlayId);
  if (existing) { existing.remove(); return; }

  const steps = {
    chrome:  ['Нажми на <b>🔒 замок</b> (или ⓘ) слева от адреса', 'Выбери <b>«Разрешения для сайта»</b>', 'Найди строку <b>«Уведомления»</b>', 'Смени на <b>«Разрешить»</b>', 'Обнови страницу (F5)'],
    yandex:  ['Нажми на <b>🔒 замок</b> слева от адреса', 'Выбери <b>«Уведомления»</b> из списка', 'Смени на <b>«Разрешить»</b>', 'Нажми <b>«Обновить страницу»</b>'],
    edge:    ['Нажми на <b>🔒 замок</b> слева от адреса', 'Выбери <b>«Разрешения для этого сайта»</b>', 'Найди <b>«Уведомления»</b>', 'Смени на <b>«Разрешить»</b>', 'Обнови страницу (F5)'],
    firefox: ['Нажми на <b>🔒 замок</b> слева от адреса', 'Нажми <b>«›»</b> → «Дополнительные сведения»', 'Перейди на вкладку <b>«Разрешения»</b>', 'Найди <b>«Отправлять уведомления»</b>', 'Убери галочку «Блокировать»', 'Обнови страницу (F5)'],
    safari:  ['Открой меню <b>Safari → Настройки</b>', 'Перейди в раздел <b>«Веб-сайты»</b>', 'Выбери <b>«Уведомления»</b>', 'Найди этот сайт → выбери <b>«Разрешить»</b>'],
    opera:   ['Нажми на <b>🔒 замок</b> слева от адреса', 'Выбери <b>«Разрешения для сайта»</b>', 'Найди <b>«Уведомления»</b>', 'Смени на <b>«Разрешить»</b>', 'Обнови страницу (F5)'],
  };
  const brSteps = steps[br] || steps.chrome;
  const brNames = { chrome:'Google Chrome', yandex:'Яндекс Браузер', edge:'Microsoft Edge', firefox:'Firefox', safari:'Safari', opera:'Opera' };

  const ov = document.createElement('div');
  ov.id = overlayId;
  ov.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.8);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px';
  ov.innerHTML = `
    <div style="background:var(--panel);border:0.5px solid rgba(239,68,68,.3);border-radius:18px;padding:22px;max-width:380px;width:100%;box-shadow:0 32px 80px rgba(0,0,0,.7)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <div style="font-size:14px;font-weight:700;color:var(--t1)">Как разрешить в ${brNames[br]||'браузере'}</div>
        <button onclick="document.getElementById('${overlayId}').remove()" style="background:none;border:none;color:var(--t3);font-size:20px;cursor:pointer;padding:2px">&#x2715;</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:18px">
        ${brSteps.map((s,i) => `
          <div style="display:flex;align-items:flex-start;gap:10px">
            <div style="width:22px;height:22px;border-radius:50%;background:rgba(239,68,68,.15);border:0.5px solid rgba(239,68,68,.3);color:var(--red);font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">${i+1}</div>
            <div style="font-size:13px;color:var(--t2);line-height:1.5;padding-top:2px">${s}</div>
          </div>`).join('')}
      </div>
      <div style="background:rgba(245,200,66,.06);border:0.5px solid rgba(245,200,66,.2);border-radius:10px;padding:10px 14px;margin-bottom:14px;display:flex;align-items:center;gap:8px">
        <span style="font-size:14px">💡</span>
        <div style="font-size:11px;color:var(--t2);line-height:1.5">Значок замка находится <b>в адресной строке браузера</b> — вверху страницы, слева от адреса сайта</div>
      </div>
      <button onclick="document.getElementById('${overlayId}').remove()" style="width:100%;padding:11px;border-radius:10px;background:var(--card);border:0.5px solid var(--border);color:var(--t2);font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer">Понятно</button>
    </div>`;
  document.body.appendChild(ov);
  ov.addEventListener('click', e => { if (e.target === ov) ov.remove(); });
}

function _updateNotifPermUI() {
  const status     = document.getElementById('notifPermStatus');
  const block      = document.getElementById('notifPermBlock');
  const defaultMsg = document.getElementById('notifPermDefaultMsg');
  const deniedMsg  = document.getElementById('notifPermDeniedMsg');
  const stepsEl    = document.getElementById('notifPermSteps');

  if (!('Notification' in window)) {
    if (status) { status.textContent = 'Уведомления не поддерживаются браузером'; status.style.color = 'var(--red)'; }
    if (block) block.style.display = 'none';
    return;
  }
  const p = Notification.permission;
  if (p === 'granted') {
    if (status) { status.textContent = '✓ Разрешено'; status.style.color = 'var(--green)'; }
    if (block) block.style.display = 'none';
  } else if (p === 'denied') {
    if (status) { status.textContent = 'Заблокировано — разрешите в настройках браузера'; status.style.color = 'var(--red)'; }
    if (block) { block.style.display = 'block'; }
    if (defaultMsg) defaultMsg.style.display = 'none';
    if (deniedMsg)  deniedMsg.style.display  = 'block';
    if (stepsEl)    stepsEl.innerHTML = _getBrowserUnblockSteps();
  } else {
    if (status) { status.textContent = 'Нужно разрешение для уведомлений'; status.style.color = 'var(--gold)'; }
    if (block) { block.style.display = 'block'; }
    if (defaultMsg) defaultMsg.style.display = 'block';
    if (deniedMsg)  deniedMsg.style.display  = 'none';
  }
}

async function requestNotifPerm() {
  if (!('Notification' in window)) { showToast('Браузер не поддерживает уведомления', '⚠️'); return; }
  const result = await Notification.requestPermission();
  _updateNotifPermUI();
  if (result === 'granted') showToast('Уведомления разрешены!', '🔔');
  else showToast('Уведомления заблокированы', '⚠️');
}

// ── Day picker ─────────────────────────────────────────────────
function _renderNotifDayBtns() {
  const cont = document.getElementById('notifDayBtns');
  if (!cont) return;
  cont.innerHTML = NOTIF_DAYS_RU.map((d, i) => `
    <button class="notif-day-btn${_notifSelDays.includes(i)?' active':''}" data-day="${i}" onclick="toggleNotifDay(this)">${d}</button>`
  ).join('') + `
    <button class="notif-day-btn" onclick="notifSelectAllDays()" style="padding:0 14px;color:var(--t3)">Все</button>`;
}

function toggleNotifDay(btn) {
  const day = parseInt(btn.dataset.day);
  const idx = _notifSelDays.indexOf(day);
  if (idx > -1) _notifSelDays.splice(idx, 1);
  else _notifSelDays.push(day);
  _renderNotifDayBtns();
}

function notifSelectAllDays() {
  _notifSelDays = [0,1,2,3,4,5,6];
  _renderNotifDayBtns();
}

// ── Melody picker ──────────────────────────────────────────────
function _renderNotifMelodies() {
  const cont = document.getElementById('notifMelodyList');
  if (!cont) return;
  const noteIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
  const playIcon = `<svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
  cont.innerHTML = NOTIF_MELODIES.map(m => {
    const on = _notifSelMelody === m.id;
    return `<div class="notif-mel-row${on?' notif-mel-on':''}" onclick="selectNotifMelody('${m.id}')">
      <div class="notif-mel-ico">${noteIcon}</div>
      <div class="notif-mel-info">
        <div class="notif-mel-name">${m.name}</div>
        <div class="notif-mel-sub">${m.desc}</div>
      </div>
      <button class="notif-mel-play" onclick="event.stopPropagation();previewNotifMelody('${m.id}')">${playIcon}</button>
      <div class="notif-mel-dot${on?' on':''}"></div>
    </div>`;
  }).join('');
}

function selectNotifMelody(id) {
  _notifSelMelody = id;
  _renderNotifMelodies();
}

function previewNotifMelody(id) {
  _playMelody(id);
}

// ── Add / delete schedules ─────────────────────────────────────
function addNotifSchedule() {
  if (Notification.permission !== 'granted') {
    requestNotifPerm().then(() => {
      if (Notification.permission === 'granted') addNotifSchedule();
    });
    return;
  }
  const h = document.getElementById('notifHour')?.value || '09';
  const m = document.getElementById('notifMinute')?.value || '00';
  const time = h + ':' + m;
  const text = document.getElementById('notifText')?.value?.trim() || 'Время заниматься! 🚀';
  if (!time) { showToast('Укажи время','⚠️'); return; }
  if (_notifSelDays.length === 0) { showToast('Выбери хотя бы один день','⚠️'); return; }

  const id = 'n_' + Date.now();
  _notifSchedules.push({
    id,
    time,
    days: [..._notifSelDays].sort(),
    melody: _notifSelMelody,
    text,
    enabled: true,
  });
  _saveNotifSchedules();
  _scheduleAllNotifs();
  _renderNotifScheduleList();
  _updateNotifActiveDot();
  showToast('Уведомление добавлено!', '🔔');
}

function deleteNotifSchedule(id) {
  _notifSchedules = _notifSchedules.filter(n => n.id !== id);
  _saveNotifSchedules();
  _scheduleAllNotifs();
  _renderNotifScheduleList();
  _updateNotifActiveDot();
}

function toggleNotifSchedule(id) {
  const n = _notifSchedules.find(n => n.id === id);
  if (n) { n.enabled = !n.enabled; _saveNotifSchedules(); _scheduleAllNotifs(); _renderNotifScheduleList(); }
}

function _renderNotifScheduleList() {
  const cont = document.getElementById('notifScheduleList');
  if (!cont) return;
  if (_notifSchedules.length === 0) {
    cont.innerHTML = '<div style="font-size:11px;color:var(--t3);text-align:center;padding:6px 0 12px">Нет настроенных уведомлений</div>';
    return;
  }
  const bellSVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;
  cont.innerHTML = `<div style="height:0.5px;background:rgba(255,255,255,.05);margin-bottom:16px"></div>
    <div style="font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.25);margin-bottom:10px">Расписание</div>` +
    _notifSchedules.map(n => {
      const daysStr = n.days.length === 7 ? 'Каждый день' : n.days.map(d => NOTIF_DAYS_RU[d]).join(', ');
      const mel = NOTIF_MELODIES.find(m => m.id === n.melody)?.name || n.melody;
      return `<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:13px;background:rgba(255,255,255,.03);border:0.5px solid ${n.enabled?'rgba(245,200,66,.12)':'rgba(255,255,255,.06)'};margin-bottom:6px;transition:border-color .2s">
        <div style="color:${n.enabled?'var(--gold)':'var(--t3)'};display:flex;align-items:center;justify-content:center;flex-shrink:0">${bellSVG}</div>
        <div style="flex:1;min-width:0">
          <div style="font-family:'DM Mono',monospace;font-size:16px;font-weight:400;letter-spacing:-.02em;color:${n.enabled?'var(--t1)':'var(--t3)'};line-height:1">${n.time}</div>
          <div style="font-size:10px;color:var(--t3);margin-top:3px;letter-spacing:.02em">${daysStr} · ${mel}</div>
          <div style="font-size:10.5px;color:var(--t2);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:400">${esc(n.text)}</div>
        </div>
        <label style="position:relative;width:36px;height:20px;cursor:pointer;flex-shrink:0">
          <input type="checkbox" ${n.enabled?'checked':''} onchange="toggleNotifSchedule('${n.id}')" style="opacity:0;width:0;height:0;position:absolute">
          <span style="position:absolute;inset:0;border-radius:10px;transition:.25s;background:${n.enabled?'var(--green)':'rgba(255,255,255,.08)'}"></span>
          <span style="position:absolute;top:2px;left:${n.enabled?'18':'2'}px;width:16px;height:16px;border-radius:50%;background:#fff;transition:.25s;box-shadow:0 1px 4px rgba(0,0,0,.3)"></span>
        </label>
        <button onclick="deleteNotifSchedule('${n.id}')" style="width:28px;height:28px;border-radius:8px;background:rgba(239,68,68,.07);border:0.5px solid rgba(239,68,68,.18);color:var(--red);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .15s">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>`;
    }).join('');
}

function _updateNotifActiveDot() {
  const dot = document.getElementById('notifActiveDot');
  if (dot) dot.style.display = _notifSchedules.some(n => n.enabled) ? 'block' : 'none';
}

// ── Scheduler — precise setTimeout-based ──────────────────────
function _scheduleAllNotifs() {
  // Clear existing timers
  _notifTimers.forEach(t => clearTimeout(t));
  _notifTimers = [];

  _notifSchedules.filter(n => n.enabled).forEach(n => {
    _scheduleNext(n);
  });
}

function _scheduleNext(schedule) {
  const now = new Date();
  const [h, m] = schedule.time.split(':').map(Number);

  // Find next matching day+time
  for (let offset = 0; offset <= 7; offset++) {
    const candidate = new Date(now);
    candidate.setDate(candidate.getDate() + offset);
    candidate.setHours(h, m, 0, 0);

    // Day of week: JS 0=Sun,1=Mon...6=Sat → our 0=Mon...6=Sun
    const jsDay = candidate.getDay();
    const ourDay = jsDay === 0 ? 6 : jsDay - 1; // convert Sun=0 → 6, Mon=1 → 0

    if (!schedule.days.includes(ourDay)) continue;
    if (candidate <= now) continue; // skip if in the past

    const msUntil = candidate.getTime() - now.getTime();
    const t = setTimeout(() => {
      _fireNotification(schedule);
      // Schedule next occurrence
      setTimeout(() => _scheduleNext(schedule), 1000);
    }, msUntil);
    _notifTimers.push(t);
    return; // only schedule the nearest one
  }
}

function _fireNotification(schedule) {
  if (Notification.permission !== 'granted') return;
  _playMelody(schedule.melody);
  try {
    const notif = new Notification('DTR Progress Club', {
      body: schedule.text || 'Время заниматься! 🚀',
      icon: '/favicon.ico',
      tag: schedule.id,
      requireInteraction: false,
    });
    notif.onclick = () => { window.focus(); notif.close(); };
  } catch (e) {
    console.warn('Notification error:', e);
  }
}

// ── Init on app load ───────────────────────────────────────────
function initNotifications() {
  _loadNotifSchedules();
  _scheduleAllNotifs();
  _updateNotifActiveDot();
}




// ══════════════════════════════════════════════════════════════
// БАЗА ЗНАНИЙ v4 — Premium Knowledge Management System
// ══════════════════════════════════════════════════════════════

const KB_KEY = 'dtr_kb_v3';
let _kb3 = {};
let _kbS = {
  cat: null, folder: null, note: null,
  edit: false, search: '', collapsed: {}, sort: 'updated',
  viewMode: 'list', // 'list' | 'grid'
  focusMode: false,
  tocOpen: false,
  filterTag: null,
  font: 'inter', // текущий шрифт редактора
};
let _kbSaveTimer = null;

// ── Data helpers ──────────────────────────────────────────────
function _kbLoad3() {
  try { _kb3 = JSON.parse(localStorage.getItem(KB_KEY)||'{}'); } catch(e) { _kb3={}; }
  // Ensure all categories exist and have valid structure
  ALL_CATS.forEach(c=>{
    if(!_kb3[c.id]) _kb3[c.id]={folders:[]};
    if(!_kb3[c.id].folders) _kb3[c.id].folders=[];
    // Sanitize folders: ensure notes array and required fields exist
    _kb3[c.id].folders=_kb3[c.id].folders.filter(f=>f&&f.id&&f.title);
    _kb3[c.id].folders.forEach(f=>{
      if(!f.notes) f.notes=[];
      f.notes=f.notes.filter(n=>n&&n.id); // remove corrupted notes
    });
  });
}
function _kbSave3() {
  localStorage.setItem(KB_KEY, JSON.stringify(_kb3));
  _kbSaveToDB();
}

// ── Supabase sync ─────────────────────────────────────────────
let _kbDBSaveTimer = null;
let _kbDBReady = false; // true after first Supabase load completes

// Merge remote KB into local: note with higher updatedAt wins
function _kbMergeRemote(remote) {
  if (!remote || typeof remote !== 'object') return;
  ALL_CATS.forEach(c => {
    if (!remote[c.id]) return;
    if (!_kb3[c.id]) _kb3[c.id] = { folders: [] };
    (remote[c.id].folders || []).forEach(remF => {
      const locF = _kb3[c.id].folders.find(f => f.id === remF.id);
      if (!locF) {
        _kb3[c.id].folders.push(remF);
      } else {
        // Update folder title if remote is newer
        if((remF.updatedAt||0) > (locF.updatedAt||0)) {
          locF.title = remF.title || locF.title;
        }
        // Ensure notes array exists
        if(!locF.notes) locF.notes = [];
        // Merge notes
        (remF.notes || []).forEach(remN => {
          if(!remN || !remN.id) return; // skip corrupted entries
          const locN = locF.notes.find(n => n.id === remN.id);
          if (!locN) {
            locF.notes.push(remN);
          } else if ((remN.updatedAt||0) > (locN.updatedAt||0)) {
            Object.assign(locN, remN);
          }
        });
      }
    });
    // Ensure all existing folders have notes array
    (_kb3[c.id].folders||[]).forEach(f => { if(!f.notes) f.notes=[]; });
  });
}

async function _kbLoadFromDB() {
  if (!SB_USER || SB_USER.isDemoUser) { _kbDBReady = true; return; }
  try {
    const { data, error } = await sb.from('user_knowledge_base')
      .select('data').eq('user_id', SB_USER.id).maybeSingle();
    if (error) { console.warn('KB DB load error:', error); _kbDBReady = true; return; }
    if (data?.data) {
      const before = JSON.stringify(_kb3);
      _kbMergeRemote(data.data);
      const after = JSON.stringify(_kb3);
      localStorage.setItem(KB_KEY, after);
      // Only re-render if data actually changed
      if (before !== after) {
        const kbTab = document.getElementById('tab-knowledge');
        if (kbTab && kbTab.classList.contains('active')) _kbRS();
      }
    }
  } catch(e) { console.warn('KB load from DB failed:', e); }
  finally { _kbDBReady = true; }
}

function _kbSaveToDB() {
  if (!SB_USER || SB_USER.isDemoUser) return;
  clearTimeout(_kbDBSaveTimer);
  _kbDBSaveTimer = setTimeout(async () => {
    try {
      const { error } = await sb.from('user_knowledge_base').upsert(
        { user_id: SB_USER.id, data: _kb3, updated_at: new Date().toISOString() },
        { onConflict: 'user_id' }
      );
      if (error) console.warn('KB DB save error:', error);
    } catch(e) { console.warn('KB save to DB failed:', e); }
  }, 1500); // debounce 1.5s
}
function _kbCatD(id) { return _kb3[id]||{folders:[]}; }
function _kbGetFolder(cid,fid) { return _kbCatD(cid).folders.find(f=>f.id===fid); }
function _kbGetNote(cid,fid,nid) { return _kbGetFolder(cid,fid)?.notes.find(n=>n.id===nid); }
function _kbAllNotes() {
  const a=[];
  ALL_CATS.forEach(c=>_kbCatD(c.id).folders.forEach(f=>
    f.notes.forEach(n=>a.push({...n,catId:c.id,folderId:f.id,folderTitle:f.title,catColor:c.color,catIcon:c.icon,catName:c.name}))
  ));
  return a;
}
function _kbPinned() { return _kbAllNotes().filter(n=>n.pinned); }
function _kbRecent(lim=6) { return _kbAllNotes().sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0)).slice(0,lim); }
function _kbCatNC(cid) { return _kbCatD(cid).folders.reduce((a,f)=>a+f.notes.length,0); }
function _kbUID() { return '_'+Math.random().toString(36).substr(2,9); }
function _kbEsc2(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function _kbStrip(s) { return String(s||'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim(); }
function _kbWC(html) { 
  if(!html) return 0;
  const t=_kbStrip(html); 
  return t?t.split(/\s+/).filter(Boolean).length:0; 
}
function _kbTotalWords() { return _kbAllNotes().reduce((a,n)=>a+_kbWC(n.body||''),0); }
function _kbUpdatedToday() {
  const today=new Date(); today.setHours(0,0,0,0);
  return _kbAllNotes().filter(n=>n.updatedAt && new Date(n.updatedAt)>=today).length;
}
function _kbAllTags() {
  const tags=new Set();
  _kbAllNotes().forEach(n=>(n.tags||[]).forEach(t=>tags.add(t)));
  return [...tags];
}
function _kbD(ts) {
  if(!ts) return '';
  const diff=Date.now()-ts;
  if(diff<60000) return 'только что';
  if(diff<3600000) return Math.floor(diff/60000)+' мин';
  if(diff<86400000) return Math.floor(diff/3600000)+' ч';
  if(diff<604800000) return Math.floor(diff/86400000)+' дн';
  return new Date(ts).toLocaleDateString('ru',{day:'numeric',month:'short'});
}
function _kbSortNotes(notes) {
  return [...notes].sort((a,b)=>{
    if(_kbS.sort==='title') return (a.title||'').localeCompare(b.title||'','ru');
    if(_kbS.sort==='created') return (b.createdAt||0)-(a.createdAt||0);
    return (b.updatedAt||b.createdAt||0)-(a.updatedAt||a.createdAt||0);
  });
}
function _kbExtractTOC(html) {
  const div=document.createElement('div');
  div.innerHTML=html;
  const items=[];
  div.querySelectorAll('h1,h2,h3').forEach((el,i)=>{
    items.push({level:parseInt(el.tagName[1]),text:el.textContent.trim(),idx:i});
  });
  return items;
}
function _kbHighlight(text, q) {
  if(!q) return _kbEsc2(text);
  const safe=q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  return _kbEsc2(text).replace(new RegExp(safe,'gi'),m=>`<mark class="k3srch-hl">${m}</mark>`);
}

// ══════════════════════════════════════════════════════════════
// RENDER ENTRY POINT
// ══════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
// БАЗА ЗНАНИЙ v5 — Obsidian-style Knowledge Management
// Architecture: sidebar + adaptive main area
// State: _kbS → _kbRender() → DOM (one-way, synchronous)
// ══════════════════════════════════════════════════════════════

// ── Utility helpers ───────────────────────────────────────────
function _kbUID(){ return '_'+Math.random().toString(36).substr(2,9); }
function _kbEsc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function _kbStrip(s){ return String(s||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim(); }
function _kbWC(html){ return _kbStrip(html).split(/\s+/).filter(Boolean).length; }
function _kbTimeAgo(ts){
  if(!ts) return '';
  const d=Date.now()-ts, m=Math.floor(d/60000), h=Math.floor(d/3600000), dy=Math.floor(d/86400000);
  if(m<1) return 'только что';
  if(m<60) return m+' мин';
  if(h<24) return h+' ч';
  if(dy<7) return dy+' дн';
  return new Date(ts).toLocaleDateString('ru',{day:'numeric',month:'short'});
}
function _kbGetFolder(cid,fid){ return (_kb3[cid]?.folders||[]).find(f=>f.id===fid); }
function _kbGetNote(cid,fid,nid){ return _kbGetFolder(cid,fid)?.notes?.find(n=>n.id===nid); }
function _kbAllNotes(){
  const a=[];
  ALL_CATS.forEach(c=>(_kb3[c.id]?.folders||[]).forEach(f=>
    (f.notes||[]).forEach(n=>a.push({...n,catId:c.id,folderId:f.id,catColor:c.color,catIcon:c.icon,catName:c.name,folderTitle:f.title}))));
  return a;
}
function _kbCatCount(cid){ return (_kb3[cid]?.folders||[]).reduce((a,f)=>a+(f.notes?.length||0),0); }
function _kbTotalWords(){ return _kbAllNotes().reduce((a,n)=>a+_kbWC(n.body||''),0); }
function _kbSortNotes(notes){
  if(_kbS.sort==='title') return [...notes].sort((a,b)=>(a.title||'').localeCompare(b.title||'','ru'));
  if(_kbS.sort==='created') return [...notes].sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
  return [...notes].sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
}

// ── Saved selection (toolbar doesn't steal focus) ─────────────
let _kbSel=null;
function _kbSaveSel(){ const s=window.getSelection(); if(s&&s.rangeCount) _kbSel=s.getRangeAt(0).cloneRange(); }
function _kbRestSel(){ if(!_kbSel) return; try{ const s=window.getSelection(); s.removeAllRanges(); s.addRange(_kbSel); }catch(e){} }

// ══════════════════════════════════════════════════════════════
// MAIN RENDER — single entry point, always synchronous
// ══════════════════════════════════════════════════════════════
function renderKnowledgeBase(){
  _kbLoad3();
  const root=document.getElementById('kb-root');
  if(!root) return;

  // Inject CSS once
  if(!document.getElementById('kb5css')){
    const s=document.createElement('style');
    s.id='kb5css';
    s.textContent=`
/* ── Layout ── */
#kb5{display:flex;height:calc(100vh - 178px);min-height:500px;border-radius:16px;overflow:hidden;border:0.5px solid var(--border);background:var(--bg);font-family:'Inter','DM Sans',sans-serif;}
/* ── Sidebar ── */
#kb5sb{width:260px;flex-shrink:0;display:flex;flex-direction:column;border-right:0.5px solid var(--border);background:var(--panel);overflow:hidden;}
#kb5sbh{padding:12px 10px 8px;flex-shrink:0;display:flex;flex-direction:column;gap:6px;}
#kb5srchw{display:flex;align-items:center;gap:7px;padding:0 10px;height:34px;background:rgba(255,255,255,.05);border:0.5px solid var(--border);border-radius:10px;}
#kb5srch{flex:1;background:none;border:none;outline:none;font-size:12.5px;color:var(--t1);font-family:inherit;}
#kb5srch::placeholder{color:var(--t3);}
#kb5sbi{flex:1;overflow-y:auto;padding:2px 6px 16px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.08) transparent;}
#kb5sbi::-webkit-scrollbar{width:3px;}
#kb5sbi::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:2px;}
/* Sidebar items */
.kb5-cat-btn{display:flex;align-items:center;gap:7px;width:100%;padding:5px 8px;border-radius:8px;background:none;border:none;color:var(--t2);font-size:12.5px;font-weight:600;cursor:pointer;text-align:left;transition:background .12s,color .12s;font-family:inherit;}
.kb5-cat-btn:hover{background:rgba(255,255,255,.05);color:var(--t1);}
.kb5-cat-btn.active{background:rgba(255,255,255,.07);color:var(--t1);}
.kb5-cat-icon{width:18px;height:18px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.kb5-cat-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.kb5-cat-count{font-size:10px;font-family:'DM Mono',monospace;color:var(--t3);padding:1px 5px;border-radius:10px;background:rgba(255,255,255,.06);flex-shrink:0;}
.kb5-chev{transition:transform .18s;flex-shrink:0;color:var(--t3);}
.kb5-chev.open{transform:rotate(90deg);}
.kb5-folder-btn{display:flex;align-items:center;gap:6px;width:100%;padding:4px 8px 4px 28px;border-radius:7px;background:none;border:none;color:var(--t3);font-size:12px;font-weight:500;cursor:pointer;text-align:left;transition:background .12s,color .12s;font-family:inherit;}
.kb5-folder-btn:hover{background:rgba(255,255,255,.04);color:var(--t2);}
.kb5-folder-btn.active{background:rgba(245,200,66,.1);color:var(--gold);border-left:2px solid var(--gold);padding-left:26px;}
.kb5-folder-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.kb5-folder-count{font-size:10px;font-family:'DM Mono',monospace;color:var(--t3);}
.kb5-add-folder{display:flex;align-items:center;gap:5px;padding:3px 8px 3px 28px;color:var(--t3);font-size:11px;cursor:pointer;border-radius:6px;transition:color .12s,background .12s;width:100%;border:none;background:none;font-family:inherit;text-align:left;}
.kb5-add-folder:hover{color:var(--t2);background:rgba(255,255,255,.03);}
.kb5-divider{height:0.5px;background:var(--border);margin:6px 4px;}
.kb5-lbl{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--t3);padding:10px 8px 3px;}
.kb5-note-btn{display:flex;align-items:center;gap:6px;width:100%;padding:4px 8px 4px 10px;border-radius:7px;background:none;border:none;color:var(--t3);font-size:11.5px;cursor:pointer;text-align:left;transition:background .12s,color .12s;font-family:inherit;}
.kb5-note-btn:hover{background:rgba(255,255,255,.04);color:var(--t2);}
.kb5-note-btn.active{background:rgba(255,255,255,.06);color:var(--t1);}
/* ── Main area ── */
#kb5main{flex:1;display:flex;overflow:hidden;min-width:0;}
/* ── Note list panel ── */
#kb5nl{width:260px;flex-shrink:0;border-right:0.5px solid var(--border);display:flex;flex-direction:column;overflow:hidden;}
#kb5nlh{padding:12px 14px 8px;flex-shrink:0;border-bottom:0.5px solid var(--border);}
#kb5nlb{flex:1;overflow-y:auto;padding:4px 6px 16px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.08) transparent;}
#kb5nlb::-webkit-scrollbar{width:3px;}
#kb5nlb::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:2px;}
/* Note cards in list */
.kb5-nc{padding:9px 10px;border-radius:9px;cursor:pointer;transition:background .12s;margin-bottom:2px;}
.kb5-nc:hover{background:rgba(255,255,255,.05);}
.kb5-nc.active{background:rgba(255,255,255,.08);}
.kb5-nc-title{font-size:13px;font-weight:600;color:var(--t1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px;}
.kb5-nc-prev{font-size:11px;color:var(--t3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:3px;}
.kb5-nc-meta{display:flex;align-items:center;gap:6px;font-size:10px;color:var(--t3);}
/* ── Editor pane ── */
#kb5ed{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;}
#kb5tb{display:flex;flex-wrap:wrap;gap:2px;padding:6px 12px;background:rgba(16,16,20,.95);backdrop-filter:blur(20px);border-bottom:0.5px solid rgba(255,255,255,.06);flex-shrink:0;align-items:center;}
#kb5edh{padding:14px 26px 0;flex-shrink:0;}
#kb5title{width:100%;background:none;border:none;outline:none;font-size:22px;font-weight:800;color:var(--t1);font-family:inherit;letter-spacing:-.03em;padding:0;}
#kb5title::placeholder{color:var(--t3);}
#kb5edbc{flex:1;overflow-y:auto;overflow-x:hidden;padding:12px 26px 40px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.08) transparent;}
#kb5edbc::-webkit-scrollbar{width:4px;}
#kb5edbc::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px;}
#kb5area{outline:none;min-height:200px;font-size:15px;line-height:1.8;color:var(--t1);caret-color:var(--gold);}
#kb5area:empty::before{content:attr(data-ph);color:var(--t3);pointer-events:none;}
#kb5st{display:flex;align-items:center;gap:8px;padding:5px 20px;background:var(--panel);border-top:0.5px solid var(--border);font-size:10.5px;color:var(--t3);flex-shrink:0;}
/* Editor formatting */
#kb5area h1{font-size:26px;font-weight:800;margin:24px 0 10px;letter-spacing:-.04em;line-height:1.2;color:var(--t1);}
#kb5area h2{font-size:20px;font-weight:700;margin:20px 0 9px;letter-spacing:-.025em;line-height:1.3;color:var(--t1);}
#kb5area h3{font-size:16px;font-weight:650;margin:16px 0 8px;letter-spacing:-.015em;line-height:1.4;color:var(--t1);}
#kb5area p{margin:0 0 10px;}
#kb5area blockquote{border-left:3px solid var(--gold);padding:10px 18px;margin:14px 0;background:rgba(245,200,66,.04);border-radius:0 10px 10px 0;color:var(--t2);font-style:italic;font-size:14.5px;line-height:1.75;}
#kb5area pre{background:rgba(0,0,0,.25);border-radius:10px;padding:16px 18px;margin:14px 0;overflow-x:auto;font-family:'DM Mono',monospace;font-size:13px;}
#kb5area code{font-family:'DM Mono',monospace;font-size:.82em;background:rgba(128,128,128,.15);padding:2px 6px;border-radius:4px;}
#kb5area ul,#kb5area ol{margin:0 0 10px 22px;padding:0;}
#kb5area li{margin-bottom:3px;}
#kb5area a{color:var(--gold);text-decoration:underline;text-decoration-color:rgba(245,200,66,.35);}
#kb5area hr{border:none;border-top:0.5px solid var(--border);margin:20px 0;}
#kb5area table{border-collapse:collapse;margin:14px 0;width:100%;}
#kb5area td,#kb5area th{border:0.5px solid var(--border);padding:8px 12px;text-align:left;font-size:13.5px;}
#kb5area th{background:rgba(255,255,255,.04);font-weight:600;}
/* Todo */
.kb5-todo{display:flex;align-items:center;gap:9px;margin:3px 0;padding:4px 6px;border-radius:8px;transition:background .12s;user-select:text;}
.kb5-todo:hover{background:rgba(255,255,255,.03);}
.kb5-chk{width:18px;height:18px;min-width:18px;border-radius:5px;border:1.5px solid rgba(255,255,255,.22);background:transparent;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .18s;flex-shrink:0;}
.kb5-todo.done .kb5-chk{background:var(--gold);border-color:var(--gold);}
.kb5-todo.done .kb5-txt{opacity:.45;text-decoration:line-through;}
.kb5-txt{flex:1;outline:none;min-width:0;font-style:normal !important;}
/* Toolbar buttons */
.kb5-tb{height:28px;min-width:28px;padding:0 7px;border-radius:7px;background:none;border:none;color:var(--t2);font-size:12px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-family:inherit;transition:background .12s,color .12s;}
.kb5-tb:hover{background:rgba(255,255,255,.08);color:var(--t1);}
.kb5-tb.active{background:rgba(245,200,66,.12);color:var(--gold);}
.kb5-tbsep{width:0.5px;height:18px;background:rgba(255,255,255,.08);margin:0 2px;flex-shrink:0;}
/* Style dropdown */
.kb5-dd{position:relative;}
.kb5-ddbtn{height:28px;padding:0 10px;border-radius:7px;background:rgba(255,255,255,.05);border:0.5px solid rgba(255,255,255,.08);color:var(--t2);font-size:12px;cursor:pointer;display:inline-flex;align-items:center;gap:5px;font-family:inherit;transition:background .12s;}
.kb5-ddbtn:hover{background:rgba(255,255,255,.09);}
.kb5-ddlist{position:absolute;top:calc(100% + 6px);left:0;background:rgba(12,12,18,.92);border:0.5px solid rgba(255,255,255,.12);border-radius:14px;padding:6px;min-width:190px;z-index:9999;animation:kb5drop .15s cubic-bezier(.34,1.15,.64,1) both;backdrop-filter:blur(40px) saturate(180%);-webkit-backdrop-filter:blur(40px) saturate(180%);box-shadow:0 24px 64px rgba(0,0,0,.8),inset 0 1px 0 rgba(255,255,255,.08);}
@keyframes kb5drop{from{opacity:0;transform:translateY(-6px) scale(.97)}to{opacity:1;transform:none}}
.kb5-ddopt{display:flex;align-items:center;gap:9px;padding:8px 12px;border-radius:9px;cursor:pointer;color:var(--t1);font-size:13px;transition:background .1s;}
.kb5-ddopt:hover{background:rgba(255,255,255,.07);}
.kb5-ddopt-ico{width:20px;height:20px;display:flex;align-items:center;justify-content:center;border-radius:5px;background:rgba(255,255,255,.06);font-size:10px;font-weight:700;flex-shrink:0;}
.kb5-ddsep{height:0.5px;background:rgba(255,255,255,.06);margin:4px 6px;}
/* Home */
#kb5home{flex:1;overflow-y:auto;padding:24px 28px;}
.kb5-stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:22px;}
.kb5-stat{border-radius:12px;padding:14px;border:0.5px solid var(--border);background:rgba(255,255,255,.03);}
.kb5-stat-n{font-size:24px;font-weight:800;font-family:'DM Mono',monospace;letter-spacing:-.03em;}
.kb5-stat-l{font-size:10px;color:var(--t3);font-weight:600;text-transform:uppercase;letter-spacing:.05em;margin-top:2px;}
.kb5-cat-card{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:rgba(255,255,255,.03);border:0.5px solid var(--border);cursor:pointer;transition:all .18s;}
.kb5-cat-card:hover{background:rgba(255,255,255,.06);transform:translateY(-2px);}
.kb5-cat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:22px;}
.kb5-recent-row{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:9px;cursor:pointer;transition:background .12s;}
.kb5-recent-row:hover{background:rgba(255,255,255,.05);}
/* Modal */
#kb5ov{position:absolute;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center;z-index:9000;border-radius:16px;}
#kb5ov.on{display:flex;}
#kb5modal{background:var(--card);border:0.5px solid var(--border);border-radius:18px;padding:22px;min-width:320px;max-width:480px;width:90%;box-shadow:0 24px 64px rgba(0,0,0,.7);}
/* Empty states */
.kb5-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;color:var(--t3);text-align:center;gap:8px;}
.kb5-empty-ico{font-size:32px;margin-bottom:4px;}
.kb5-empty-ttl{font-size:15px;font-weight:700;color:var(--t2);}
/* Buttons */
.kb5-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:9px;font-size:12.5px;font-weight:600;cursor:pointer;border:none;font-family:inherit;transition:all .18s;}
.kb5-btn-gold{background:linear-gradient(90deg,var(--gold-d),var(--gold));color:#09090B;}
.kb5-btn-gold:hover{opacity:.9;transform:translateY(-1px);}
.kb5-btn-ghost{background:rgba(255,255,255,.06);border:0.5px solid var(--border);color:var(--t2);}
.kb5-btn-ghost:hover{background:rgba(255,255,255,.1);color:var(--t1);}
.kb5-btn-danger{background:rgba(239,68,68,.1);border:0.5px solid rgba(239,68,68,.2);color:var(--red);}
.kb5-btn-danger:hover{background:rgba(239,68,68,.18);}
/* Input */
.kb5-inp{width:100%;padding:9px 12px;border-radius:9px;background:var(--card);border:0.5px solid var(--border);color:var(--t1);font-size:13px;outline:none;font-family:inherit;box-sizing:border-box;}
.kb5-inp:focus{border-color:rgba(245,200,66,.4);}
/* Tag */
.kb5-tag{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:10px;font-size:10.5px;font-weight:600;}
/* Sort chips */
.kb5-chip{padding:4px 10px;border-radius:20px;border:0.5px solid var(--border);background:none;color:var(--t3);font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .12s;}
.kb5-chip.active{background:rgba(245,200,66,.1);border-color:rgba(245,200,66,.3);color:var(--gold);}
/* Animations */
@keyframes kb5in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.kb5-anim{animation:kb5in .2s ease both;}
/* Status bar */
.kb5-sv{font-size:11px;color:var(--t3);}
.kb5-sv.saving{color:var(--gold);}
.kb5-sv.saved{color:#22C55E;}
`;
    document.head.appendChild(s);
  }

  // Build shell (only once)
  if(!document.getElementById('kb5')){
    root.innerHTML=`
<div id="kb5" style="position:relative;">
  <!-- Sidebar -->
  <nav id="kb5sb">
    <div id="kb5sbh">
      <div id="kb5srchw">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--t3);flex-shrink:0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input id="kb5srch" type="text" placeholder="Поиск заметок..." autocomplete="off" oninput="_kbSearch(this.value)">
        <svg id="kb5srch-x" onclick="_kbSearchClear()" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--t3);cursor:pointer;display:none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </div>
      <button class="kb5-btn kb5-btn-gold" onclick="_kbNewNote()" style="width:100%;justify-content:center;padding:7px 12px;">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Новая заметка
      </button>
    </div>
    <div id="kb5sbi"></div>
  </nav>
  <!-- Main -->
  <div id="kb5main">
    <div id="kb5home" style="display:none"></div>
    <div id="kb5nl" style="display:none">
      <div id="kb5nlh"></div>
      <div id="kb5nlb"></div>
    </div>
    <div id="kb5ed" style="display:none">
      <div id="kb5tb"></div>
      <div id="kb5edh">
        <input id="kb5title" type="text" placeholder="Заголовок..." autocomplete="off">
      </div>
      <div id="kb5edbc">
        <div id="kb5area" contenteditable="true" data-ph="Начни писать... (Markdown поддерживается)"></div>
      </div>
      <div id="kb5st">
        <span id="kb5sv" class="kb5-sv"></span>
        <span style="flex:1"></span>
        <span id="kb5wc" style="font-family:'DM Mono',monospace;font-size:10px;color:var(--t3)"></span>
        <span style="color:var(--border)">·</span>
        <span id="kb5tags" style="display:flex;gap:4px;flex-wrap:wrap;align-items:center"></span>
        <button class="kb5-tb" onclick="_kbAddTagPrompt()" title="Добавить тег" style="height:20px;font-size:10px;padding:0 6px;color:var(--t3)">+ тег</button>
      </div>
    </div>
  </div>
  <!-- Modal overlay -->
  <div id="kb5ov" onclick="if(event.target===this)_kbCloseMod()">
    <div id="kb5modal"></div>
  </div>
</div>`;

    // Toolbar mousedown — prevent focus/selection steal
    document.addEventListener('mousedown', e=>{
      const tb=document.getElementById('kb5tb');
      if(tb&&tb.contains(e.target)){
        const t=e.target.tagName;
        if(t!=='INPUT'&&t!=='SELECT'&&t!=='TEXTAREA'){
          _kbSaveSel(); e.preventDefault();
        }
      }
    }, true);
  }

  _kbRenderSidebar();
  _kbRenderMain();
}

// ── Sidebar ───────────────────────────────────────────────────
function _kbRenderSidebar(){
  const sb=document.getElementById('kb5sbi'); if(!sb) return;
  const q=(_kbS.search||'').toLowerCase();

  // Search mode
  if(q){
    const results=_kbAllNotes().filter(n=>
      (n.title||'').toLowerCase().includes(q)||
      _kbStrip(n.body||'').toLowerCase().includes(q)||
      (n.tags||[]).some(t=>t.toLowerCase().includes(q))
    );
    let h=`<div class="kb5-lbl">Результаты (${results.length})</div>`;
    if(!results.length) h+=`<div style="padding:12px 8px;font-size:12px;color:var(--t3)">Ничего не найдено</div>`;
    results.forEach(n=>{
      h+=`<button class="kb5-note-btn${_kbS.note===n.id?' active':''}" onclick="_kbOpenNote('${n.catId}','${n.folderId}','${n.id}')">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;color:var(--t3)"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${_kbEsc(n.title||'Без названия')}</span>
        <span style="font-size:9px;color:var(--t3);flex-shrink:0">${n.catName}</span>
      </button>`;
    });
    sb.innerHTML=h; return;
  }

  let h='';
  h+=`<button class="kb5-cat-btn${!_kbS.cat?' active':''}" onclick="_kbGoHome()" style="margin-bottom:2px">
    <span class="kb5-cat-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
    <span class="kb5-cat-name">Обзор</span>
  </button>`;
  h+=`<div class="kb5-lbl">Категории</div>`;

  ALL_CATS.forEach(c=>{
    const d=_kb3[c.id]||{folders:[]};
    const folders=d.folders||[];
    const nc=_kbCatCount(c.id);
    const isOpen=!_kbS.collapsed[c.id];
    const isCatActive=_kbS.cat===c.id;
    const catIcon=(typeof ICONS!=='undefined'&&ICONS[c.id])?ICONS[c.id].replace(/width="\d+" height="\d+"/g,'width="14" height="14"'):'';

    h+=`<div>
      <button class="kb5-cat-btn${isCatActive?' active':''}" onclick="_kbTogCat('${c.id}')" style="${isCatActive?`border-left:2px solid ${c.color};padding-left:6px;`:''}" >
        <span class="kb5-cat-icon" style="color:${c.color}">${catIcon}</span>
        <span class="kb5-cat-name">${_kbEsc(c.name)}</span>
        ${nc?`<span class="kb5-cat-count">${nc}</span>`:''}
        <svg class="kb5-chev${isOpen?' open':''}" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      ${isOpen?`<div>
        ${folders.map(f=>{
          const isFActive=_kbS.folder===f.id&&_kbS.cat===c.id;
          return `<button class="kb5-folder-btn${isFActive?' active':''}" onclick="_kbOpenFolder('${c.id}','${f.id}')">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="${isFActive?'var(--gold)':'currentColor'}" stroke-width="2" style="flex-shrink:0"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            <span class="kb5-folder-name">${_kbEsc(f.title)}</span>
            <span class="kb5-folder-count">${(f.notes||[]).length}</span>
          </button>`;
        }).join('')}
        <button class="kb5-add-folder" onclick="_kbNewFolder('${c.id}')">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Новая папка
        </button>
      </div>`:``}
    </div>`;
  });

  // Pinned notes
  const pins=_kbAllNotes().filter(n=>n.pinned);
  if(pins.length){
    h+=`<div class="kb5-divider"></div><div class="kb5-lbl">📌 Закреплённые</div>`;
    pins.slice(0,6).forEach(n=>{
      h+=`<button class="kb5-note-btn${_kbS.note===n.id?' active':''}" onclick="_kbOpenNote('${n.catId}','${n.folderId}','${n.id}')">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="${n.catColor}" stroke="${n.catColor}" stroke-width="1" style="flex-shrink:0"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17z"/></svg>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${_kbEsc(n.title||'Без названия')}</span>
      </button>`;
    });
  }

  sb.innerHTML=h;
}

// ── Main area dispatcher ──────────────────────────────────────
function _kbRenderMain(){
  const home=document.getElementById('kb5home');
  const nl=document.getElementById('kb5nl');
  const ed=document.getElementById('kb5ed');
  if(!home||!nl||!ed) return;

  // Determine view
  if(!_kbS.cat){
    home.style.display='block'; nl.style.display='none'; ed.style.display='none';
    _kbRenderHome(home); return;
  }
  if(_kbS.cat&&!_kbS.folder){
    home.style.display='block'; nl.style.display='none'; ed.style.display='none';
    _kbRenderCatHome(home); return;
  }
  // Folder selected
  home.style.display='none'; nl.style.display='flex'; nl.style.flexDirection='column';
  if(_kbS.note){
    ed.style.display='flex'; ed.style.flexDirection='column';
    _kbRenderNoteList();
    _kbRenderEditor();
  } else {
    ed.style.display='none';
    _kbRenderNoteList();
  }
}

// ── Home dashboard ────────────────────────────────────────────
function _kbRenderHome(cont){
  const allN=_kbAllNotes();
  const tw=_kbTotalWords();
  const td=new Date().toISOString().slice(0,10);
  const todayN=allN.filter(n=>n.updatedAt&&new Date(n.updatedAt).toISOString().slice(0,10)===td).length;
  const allF=ALL_CATS.reduce((a,c)=>a+(_kb3[c.id]?.folders||[]).length,0);
  const recent=_kbSortNotes(allN).slice(0,8);
  const pins=allN.filter(n=>n.pinned).slice(0,4);

  cont.innerHTML=`<div class="kb5-anim">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
      <div>
        <div style="font-size:22px;font-weight:800;letter-spacing:-.04em;color:var(--t1)">База знаний</div>
        <div style="font-size:12px;color:var(--t3);margin-top:2px">Твоё персональное хранилище знаний</div>
      </div>
      <button class="kb5-btn kb5-btn-gold" onclick="_kbNewNote()">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Новая заметка
      </button>
    </div>
    <div class="kb5-stat-grid">
      <div class="kb5-stat"><div class="kb5-stat-n" style="color:var(--gold)">${allN.length}</div><div class="kb5-stat-l">Заметок</div></div>
      <div class="kb5-stat"><div class="kb5-stat-n" style="color:var(--blue)">${allF}</div><div class="kb5-stat-l">Папок</div></div>
      <div class="kb5-stat"><div class="kb5-stat-n" style="color:var(--purple)">${tw>999?Math.round(tw/1000)+'к':tw}</div><div class="kb5-stat-l">Слов</div></div>
      <div class="kb5-stat"><div class="kb5-stat-n" style="color:var(--green)">${todayN}</div><div class="kb5-stat-l">Сегодня</div></div>
    </div>
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--t3);margin-bottom:10px">Категории</div>
    <div class="kb5-cat-grid" style="margin-bottom:22px">
      ${ALL_CATS.map(c=>{
        const nc=_kbCatCount(c.id);
        const nf=(_kb3[c.id]?.folders||[]).length;
        const ico=(typeof ICONS!=='undefined'&&ICONS[c.id])?ICONS[c.id].replace(/width="\d+" height="\d+"/g,'width="18" height="18"'):'';
        return `<div class="kb5-cat-card" onclick="_kbTogCat('${c.id}')" style="border-color:${c.color}20">
          <div style="width:36px;height:36px;border-radius:10px;background:${c.color}18;display:flex;align-items:center;justify-content:center;color:${c.color};flex-shrink:0">${ico}</div>
          <div style="min-width:0">
            <div style="font-size:13px;font-weight:700;color:var(--t1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${_kbEsc(c.name)}</div>
            <div style="font-size:10.5px;color:var(--t3)">${nc} зам · ${nf} пап</div>
          </div>
        </div>`;
      }).join('')}
    </div>
    ${pins.length?`<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--t3);margin-bottom:8px">📌 Закреплённые</div>
    <div style="margin-bottom:20px">
      ${pins.map(n=>`<div class="kb5-recent-row" onclick="_kbOpenNote('${n.catId}','${n.folderId}','${n.id}')">
        <div style="width:8px;height:8px;border-radius:50%;background:${n.catColor};flex-shrink:0"></div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:var(--t1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${_kbEsc(n.title||'Без названия')}</div>
          <div style="font-size:10.5px;color:var(--t3)">${n.catName} · ${n.folderTitle}</div>
        </div>
        <div style="font-size:10px;color:var(--t3);flex-shrink:0">${_kbTimeAgo(n.updatedAt)}</div>
      </div>`).join('')}
    </div>`:''}
    ${recent.length?`<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--t3);margin-bottom:8px">Последние заметки</div>
    ${recent.map(n=>`<div class="kb5-recent-row" onclick="_kbOpenNote('${n.catId}','${n.folderId}','${n.id}')">
      <div style="width:8px;height:8px;border-radius:50%;background:${n.catColor};flex-shrink:0"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600;color:var(--t1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${_kbEsc(n.title||'Без названия')}</div>
        <div style="font-size:10.5px;color:var(--t3)">${n.catName} · ${n.folderTitle} · ${_kbWC(n.body||'')} сл</div>
      </div>
      <div style="font-size:10px;color:var(--t3);flex-shrink:0">${_kbTimeAgo(n.updatedAt)}</div>
    </div>`).join('')}`:''}
  </div>`;
}

// ── Category home ─────────────────────────────────────────────
function _kbRenderCatHome(cont){
  const c=ALL_CATS.find(x=>x.id===_kbS.cat); if(!c){_kbGoHome();return;}
  const d=_kb3[c.id]||{folders:[]};
  const folders=d.folders||[];
  const allN=folders.flatMap(f=>(f.notes||[]).map(n=>({...n,catId:c.id,folderId:f.id,folderTitle:f.title,catColor:c.color})));
  const recent=_kbSortNotes(allN).slice(0,6);
  const ico=(typeof ICONS!=='undefined'&&ICONS[c.id])?ICONS[c.id].replace(/width="\d+" height="\d+"/g,'width="22" height="22"'):'';

  cont.innerHTML=`<div class="kb5-anim">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:18px;flex-wrap:wrap">
      <button onclick="_kbGoHome()" style="background:none;border:none;color:var(--t3);font-size:12px;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:4px;">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        База знаний
      </button>
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      <span style="font-size:12px;font-weight:600;color:var(--t2)">${_kbEsc(c.name)}</span>
    </div>
    <div style="display:flex;align-items:center;gap:14px;padding:20px;border-radius:16px;background:linear-gradient(135deg,${c.color}14,transparent);border:0.5px solid ${c.color}22;margin-bottom:20px">
      <div style="width:48px;height:48px;border-radius:14px;background:${c.color}20;display:flex;align-items:center;justify-content:center;color:${c.color}">${ico}</div>
      <div>
        <div style="font-size:20px;font-weight:800;letter-spacing:-.03em;color:var(--t1)">${_kbEsc(c.name)}</div>
        <div style="font-size:12px;color:var(--t3);margin-top:2px">${allN.length} заметок · ${folders.length} папок</div>
      </div>
      <div style="margin-left:auto;display:flex;gap:8px">
        <button class="kb5-btn kb5-btn-ghost" onclick="_kbNewFolder('${c.id}')">+ Папка</button>
        <button class="kb5-btn kb5-btn-gold" onclick="_kbNewNote()">+ Заметка</button>
      </div>
    </div>
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--t3);margin-bottom:10px">Папки</div>
    ${folders.length?`<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:20px">
      ${folders.map(f=>`<div onclick="_kbOpenFolder('${c.id}','${f.id}')" style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:12px;background:rgba(255,255,255,.03);border:0.5px solid var(--border);cursor:pointer;transition:all .15s" onmouseover="this.style.background='rgba(255,255,255,.06)'" onmouseout="this.style.background='rgba(255,255,255,.03)'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${c.color}" stroke-width="2" style="flex-shrink:0"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        <div style="min-width:0">
          <div style="font-size:13px;font-weight:600;color:var(--t1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${_kbEsc(f.title)}</div>
          <div style="font-size:10.5px;color:var(--t3)">${(f.notes||[]).length} заметок</div>
        </div>
      </div>`).join('')}
    </div>`:`<div class="kb5-empty"><div class="kb5-empty-ico">📁</div><div class="kb5-empty-ttl">Нет папок</div><button class="kb5-btn kb5-btn-ghost" style="margin-top:8px" onclick="_kbNewFolder('${c.id}')">Создать папку</button></div>`}
    ${recent.length?`<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--t3);margin-bottom:8px">Последние</div>
    ${recent.map(n=>`<div class="kb5-recent-row" onclick="_kbOpenNote('${n.catId}','${n.folderId}','${n.id}')">
      <div style="width:6px;height:6px;border-radius:50%;background:${c.color};flex-shrink:0"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600;color:var(--t1);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${_kbEsc(n.title||'Без названия')}</div>
        <div style="font-size:10.5px;color:var(--t3)">${n.folderTitle}</div>
      </div>
      <div style="font-size:10px;color:var(--t3)">${_kbTimeAgo(n.updatedAt)}</div>
    </div>`).join('')}`:''}
  </div>`;
}

// ── Note list ─────────────────────────────────────────────────
function _kbRenderNoteList(){
  const hdr=document.getElementById('kb5nlh');
  const body=document.getElementById('kb5nlb');
  if(!hdr||!body) return;
  const c=ALL_CATS.find(x=>x.id===_kbS.cat);
  const f=_kbGetFolder(_kbS.cat,_kbS.folder);
  if(!c||!f){_kbGoHome();return;}
  const notes=_kbSortNotes((f.notes||[]).map(n=>({...n,catId:_kbS.cat,folderId:_kbS.folder,catColor:c.color,catIcon:c.icon,catName:c.name})));

  hdr.innerHTML=`
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;flex-wrap:wrap">
      <button onclick="_kbGoHome()" style="background:none;border:none;color:var(--t3);font-size:11px;cursor:pointer;font-family:inherit">Обзор</button>
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      <button onclick="_kbTogCat('${c.id}')" style="background:none;border:none;color:var(--t3);font-size:11px;cursor:pointer;font-family:inherit;color:${c.color}">${_kbEsc(c.name)}</button>
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      <span style="font-size:11px;font-weight:600;color:var(--t2)">${_kbEsc(f.title)}</span>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:6px">
      <span style="font-size:10.5px;color:var(--t3)">${notes.length} заметок</span>
      <div style="display:flex;gap:3px">
        <button class="kb5-chip${_kbS.sort==='updated'?' active':''}" onclick="_kbSetSort('updated')">Дате</button>
        <button class="kb5-chip${_kbS.sort==='title'?' active':''}" onclick="_kbSetSort('title')">А–Я</button>
      </div>
    </div>
    <button class="kb5-btn kb5-btn-gold" onclick="_kbNewNote()" style="width:100%;justify-content:center;margin-top:8px;padding:6px 10px;font-size:12px">
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      Новая заметка
    </button>`;

  if(!notes.length){
    body.innerHTML=`<div class="kb5-empty"><div class="kb5-empty-ico">✍️</div><div class="kb5-empty-ttl">Папка пуста</div><div style="font-size:12px;color:var(--t3)">Создай первую заметку</div></div>`;
    return;
  }

  body.innerHTML=notes.map(n=>{
    const prev=_kbStrip(n.body||'').slice(0,80);
    const isActive=_kbS.note===n.id;
    return `<div class="kb5-nc${isActive?' active':''}" onclick="_kbOpenNote('${n.catId}','${n.folderId}','${n.id}')">
      <div class="kb5-nc-title">${n.pinned?'📌 ':''}<span style="border-bottom:1.5px solid ${isActive?c.color:'transparent'}">${_kbEsc(n.title||'Без названия')}</span></div>
      ${prev?`<div class="kb5-nc-prev">${_kbEsc(prev)}${prev.length>=80?'…':''}</div>`:''}
      <div class="kb5-nc-meta">
        <span>${_kbTimeAgo(n.updatedAt||n.createdAt)}</span>
        ${(n.tags||[]).slice(0,2).map(t=>`<span class="kb5-tag" style="background:${c.color}18;color:${c.color}">#${_kbEsc(t)}</span>`).join('')}
        <span style="margin-left:auto">${_kbWC(n.body||'')} сл</span>
      </div>
    </div>`;
  }).join('');
}

// ── Editor ────────────────────────────────────────────────────
function _kbRenderEditor(){
  const tb=document.getElementById('kb5tb');
  const title=document.getElementById('kb5title');
  const area=document.getElementById('kb5area');
  const wc=document.getElementById('kb5wc');
  const tags=document.getElementById('kb5tags');
  if(!tb||!title||!area) return;

  const c=ALL_CATS.find(x=>x.id===_kbS.cat);
  const n=_kbGetNote(_kbS.cat,_kbS.folder,_kbS.note);
  if(!n){ _kbS.note=null; _kbRenderMain(); return; }

  // Only rebuild toolbar once
  if(!tb.dataset.built){
    tb.dataset.built='1';
    tb.innerHTML=`
      <div class="kb5-dd" id="kb5styledd">
        <button class="kb5-ddbtn" onclick="_kbTogDD('kb5styleList')" id="kb5styleBtn">
          <span id="kb5styleLbl">Стиль</span>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="kb5-ddlist" id="kb5styleList" style="display:none">
          <div class="kb5-ddopt" onclick="_kbFmtBlock('p','Абзац')"><div class="kb5-ddopt-ico" style="font-size:11px;color:var(--t2)">¶</div><span>Абзац</span></div>
          <div class="kb5-ddsep"></div>
          <div class="kb5-ddopt" onclick="_kbFmtBlock('h1','H1')"><div class="kb5-ddopt-ico" style="font-weight:800;font-size:12px">H1</div><span style="font-size:17px;font-weight:800;letter-spacing:-.03em">Заголовок 1</span></div>
          <div class="kb5-ddopt" onclick="_kbFmtBlock('h2','H2')"><div class="kb5-ddopt-ico" style="font-weight:700;font-size:11px">H2</div><span style="font-size:15px;font-weight:700">Заголовок 2</span></div>
          <div class="kb5-ddopt" onclick="_kbFmtBlock('h3','H3')"><div class="kb5-ddopt-ico" style="font-weight:700;font-size:10px;color:var(--t2)">H3</div><span style="font-size:13.5px;font-weight:650">Заголовок 3</span></div>
          <div class="kb5-ddsep"></div>
          <div class="kb5-ddopt" onclick="_kbFmtBlock('blockquote','Цитата')"><div class="kb5-ddopt-ico" style="color:var(--gold);font-size:14px">"</div><span style="font-style:italic;color:var(--t2)">Цитата</span></div>
          <div class="kb5-ddopt" onclick="_kbFmtBlock('pre','Код')"><div class="kb5-ddopt-ico" style="font-family:monospace;font-size:8px;color:var(--gold-l)">&lt;/&gt;</div><span style="font-family:monospace;font-size:12px">Код-блок</span></div>
        </div>
      </div>
      <div class="kb5-tbsep"></div>
      <button class="kb5-tb" onclick="_kbFmt('bold')" title="Жирный Ctrl+B"><b>B</b></button>
      <button class="kb5-tb" onclick="_kbFmt('italic')" title="Курсив Ctrl+I"><i style="font-style:italic">I</i></button>
      <button class="kb5-tb" onclick="_kbFmt('underline')" title="Подчёркн. Ctrl+U"><u>U</u></button>
      <button class="kb5-tb" onclick="_kbFmt('strikeThrough')" title="Зачёркн."><s style="font-size:11px">S</s></button>
      <div class="kb5-tbsep"></div>
      <button class="kb5-tb" onclick="_kbFmt('insertUnorderedList')" title="Маркированный список">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/></svg>
      </button>
      <button class="kb5-tb" onclick="_kbFmt('insertOrderedList')" title="Нумерованный список">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/></svg>
      </button>
      <button class="kb5-tb" onclick="_kbInsTodo()" title="Чеклист">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="4" height="4" rx="1"/><rect x="3" y="14" width="4" height="4" rx="1" fill="currentColor" stroke="none"/><line x1="10" y1="7" x2="21" y2="7"/><line x1="10" y1="16" x2="21" y2="16"/></svg>
      </button>
      <div class="kb5-tbsep"></div>
      <button class="kb5-tb" onclick="_kbFmt('undo')" title="Отменить Ctrl+Z">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>
      </button>
      <button class="kb5-tb" onclick="_kbFmt('redo')" title="Повторить Ctrl+Y">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/></svg>
      </button>
      <button class="kb5-tb" onclick="_kbFmt('removeFormat')" style="font-size:10px;color:var(--t3);padding:0 7px;width:auto" title="Убрать форматирование">✕ Формат</button>
      <div class="kb5-tbsep"></div>
      <button class="kb5-tb" onclick="_kbTogPin()" id="kb5pinBtn" title="Закрепить">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="${n.pinned?'var(--gold)':'none'}" stroke="${n.pinned?'var(--gold)':'currentColor'}" stroke-width="2"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17z"/></svg>
      </button>
      <button class="kb5-tb" onclick="_kbNoteMenu()" title="Действия с заметкой">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
      </button>`;
  }

  // Update pin button without rebuilding toolbar
  const pinBtn=document.getElementById('kb5pinBtn');
  if(pinBtn){ const svg=pinBtn.querySelector('svg'); if(svg){ svg.setAttribute('fill',n.pinned?'var(--gold)':'none'); svg.setAttribute('stroke',n.pinned?'var(--gold)':'currentColor'); } }

  // Populate title
  if(document.activeElement!==title) title.value=n.title||'';

  // Populate editor body only if not focused (avoid cursor jump)
  if(document.activeElement!==area){
    area.innerHTML=n.body||'';
    // Restore todo checkboxes state
    area.querySelectorAll('.kb5-todo').forEach(lbl=>{
      if(lbl.classList.contains('done')){
        const cb=lbl.querySelector('input[type=checkbox]');
        if(cb) cb.checked=true;
      }
    });
  }

  // Status bar
  if(wc) wc.textContent=`${_kbWC(n.body||'')} слов · ~${Math.max(1,Math.ceil(_kbWC(n.body||'')/200))} мин`;
  if(tags){
    const col=c?c.color:'var(--gold)';
    tags.innerHTML=(n.tags||[]).map(t=>`<span class="kb5-tag" style="background:${col}18;color:${col}">#${_kbEsc(t)}<span onclick="_kbRemTag('${_kbEsc(t)}')" style="cursor:pointer;opacity:.5;margin-left:2px">×</span></span>`).join('');
  }

  // Attach editor events (once)
  if(!area.dataset.evts){
    area.dataset.evts='1';
    area.addEventListener('input', _kbEdInput);
    area.addEventListener('keydown', _kbEdKey);
    area.addEventListener('mouseup', _kbSaveSel);
    area.addEventListener('keyup', _kbSaveSel);
    title.addEventListener('input', _kbTitleInput);
  }
}

// ══════════════════════════════════════════════════════════════
// NAVIGATION ACTIONS
// ══════════════════════════════════════════════════════════════
function _kbGoHome(){
  _kbAutoSave();
  _kbS.cat=null; _kbS.folder=null; _kbS.note=null;
  _kbS.search='';
  const si=document.getElementById('kb5srch'); if(si) si.value='';
  const sx=document.getElementById('kb5srch-x'); if(sx) sx.style.display='none';
  renderKnowledgeBase();
}
function _kbTogCat(cid){
  _kbAutoSave();
  if(_kbS.cat===cid){
    _kbS.collapsed[cid]=!_kbS.collapsed[cid];
  } else {
    _kbS.cat=cid; _kbS.collapsed[cid]=false;
    _kbS.folder=null; _kbS.note=null;
  }
  _kbLoad3();
  renderKnowledgeBase();
}
function _kbOpenFolder(cid,fid){
  _kbAutoSave();
  _kbS.cat=cid; _kbS.folder=fid; _kbS.note=null;
  _kbS.collapsed[cid]=false;
  _kbLoad3();
  // Reset toolbar built flag so it rebuilds for new note
  const tb=document.getElementById('kb5tb'); if(tb) delete tb.dataset.built;
  const area=document.getElementById('kb5area'); if(area) delete area.dataset.evts;
  renderKnowledgeBase();
}
function _kbOpenNote(cid,fid,nid){
  _kbAutoSave();
  _kbS.cat=cid; _kbS.folder=fid; _kbS.note=nid;
  _kbS.collapsed[cid]=false;
  _kbLoad3();
  // Force editor refresh
  const area=document.getElementById('kb5area'); if(area) { area.innerHTML=''; delete area.dataset.evts; }
  const tb=document.getElementById('kb5tb'); if(tb) delete tb.dataset.built;
  renderKnowledgeBase();
  setTimeout(()=>{ document.getElementById('kb5area')?.focus(); }, 50);
}
function _kbSetSort(s){ _kbS.sort=s; _kbRenderNoteList(); }
function _kbSearch(v){
  _kbS.search=v.trim();
  const sx=document.getElementById('kb5srch-x');
  if(sx) sx.style.display=v?'block':'none';
  _kbRenderSidebar();
}
function _kbSearchClear(){
  _kbS.search='';
  const si=document.getElementById('kb5srch'); if(si) si.value='';
  const sx=document.getElementById('kb5srch-x'); if(sx) sx.style.display='none';
  _kbRenderSidebar();
}

// ══════════════════════════════════════════════════════════════
// EDITOR ACTIONS
// ══════════════════════════════════════════════════════════════
let _kbAutoSaveT=null;
function _kbAutoSave(){
  clearTimeout(_kbAutoSaveT);
  const area=document.getElementById('kb5area');
  const title=document.getElementById('kb5title');
  const n=_kbGetNote(_kbS.cat,_kbS.folder,_kbS.note);
  if(!n) return;
  if(area) n.body=area.innerHTML;
  if(title) n.title=title.value.trim()||'Без названия';
  n.updatedAt=Date.now();
  _kbSave3();
}
function _kbEdInput(){
  const n=_kbGetNote(_kbS.cat,_kbS.folder,_kbS.note); if(!n) return;
  const area=document.getElementById('kb5area');
  _kbSSV5('saving');
  clearTimeout(_kbAutoSaveT);
  _kbAutoSaveT=setTimeout(()=>{
    if(area) n.body=area.innerHTML;
    n.updatedAt=Date.now(); _kbSave3();
    const wc=document.getElementById('kb5wc');
    if(wc) wc.textContent=`${_kbWC(area?area.innerHTML:'')} слов · ~${Math.max(1,Math.ceil(_kbWC(area?area.innerHTML:'')/200))} мин`;
    // Update note list silently (just re-render note list cards)
    _kbRenderNoteList();
    // Update sidebar recent
    _kbRenderSidebar();
    _kbSSV5('saved');
  }, 800);
}
function _kbTitleInput(){
  const n=_kbGetNote(_kbS.cat,_kbS.folder,_kbS.note); if(!n) return;
  const ti=document.getElementById('kb5title');
  clearTimeout(_kbAutoSaveT);
  _kbAutoSaveT=setTimeout(()=>{
    if(ti) n.title=ti.value.trim()||'Без названия';
    n.updatedAt=Date.now(); _kbSave3();
    _kbRenderNoteList(); _kbRenderSidebar(); _kbSSV5('saved');
  },600);
}
function _kbSSV5(s){
  const el=document.getElementById('kb5sv'); if(!el) return;
  if(s==='saving'){ el.textContent='● Сохранение…'; el.className='kb5-sv saving'; }
  else if(s==='saved'){ el.textContent='✓ Сохранено'; el.className='kb5-sv saved'; setTimeout(()=>{ if(el.className==='kb5-sv saved'){ el.textContent=''; el.className='kb5-sv'; } },2000); }
  else { el.textContent=''; el.className='kb5-sv'; }
}

// ── Toolbar commands ──────────────────────────────────────────
function _kbFmt(cmd,val){
  const ea=document.getElementById('kb5area'); if(!ea) return;
  if(document.activeElement!==ea){ ea.focus(); _kbRestSel(); }
  document.execCommand(cmd,false,val||null);
  _kbSel=null;
}
function _kbFmtBlock(tag,label){
  _kbRestSel();
  const ea=document.getElementById('kb5area'); if(!ea) return;
  ea.focus();
  document.execCommand('formatBlock',false,tag);
  const lbl=document.getElementById('kb5styleLbl'); if(lbl) lbl.textContent=label;
  _kbCloseDD('kb5styleList'); _kbSel=null;
}
function _kbTogDD(id){
  _kbSaveSel();
  document.querySelectorAll('.kb5-ddlist').forEach(d=>{ if(d.id!==id) d.style.display='none'; });
  const el=document.getElementById(id); if(!el) return;
  el.style.display=el.style.display==='none'?'block':'none';
}
function _kbCloseDD(id){ const el=document.getElementById(id); if(el) el.style.display='none'; }
document.addEventListener('click',e=>{
  if(!e.target.closest('.kb5-dd')){
    document.querySelectorAll('.kb5-ddlist').forEach(d=>d.style.display='none');
  }
});

// ── Insert todo ───────────────────────────────────────────────
function _kbInsTodo(){
  const ea=document.getElementById('kb5area'); if(!ea) return;
  ea.focus();
  const id='t'+Date.now();
  document.execCommand('insertHTML',false,
    `<div class="kb5-todo" contenteditable="false"><span class="kb5-chk" onclick="window._kbChk(this)"></span><span class="kb5-txt" id="${id}" contenteditable="true"> </span></div>`);
  setTimeout(()=>{ const sp=document.getElementById(id); if(sp){ sp.focus(); placeCursorEnd(sp); } },20);
  _kbEdInput();
}
window._kbChk=function(chk){
  const todo=chk.closest('.kb5-todo'); if(!todo) return;
  todo.classList.toggle('done');
  const n=_kbGetNote(_kbS.cat,_kbS.folder,_kbS.note);
  if(n){ const ea=document.getElementById('kb5area'); if(ea){ n.body=ea.innerHTML; n.updatedAt=Date.now(); _kbSave3(); } }
};
function placeCursorEnd(el){ const r=document.createRange(); r.selectNodeContents(el); r.collapse(false); const s=window.getSelection(); s.removeAllRanges(); s.addRange(r); }

// ── Keyboard handler ──────────────────────────────────────────
function _kbEdKey(e){
  const cm=e.ctrlKey||e.metaKey;
  if(cm&&e.key==='s'){ e.preventDefault(); _kbAutoSave(); _kbSSV5('saved'); return; }
  if(cm&&e.key==='b'){ e.preventDefault(); _kbFmt('bold'); return; }
  if(cm&&e.key==='i'){ e.preventDefault(); _kbFmt('italic'); return; }
  if(cm&&e.key==='u'){ e.preventDefault(); _kbFmt('underline'); return; }
  if(cm&&e.key==='a'){ e.preventDefault(); const ea=document.getElementById('kb5area'); if(ea){ const r=document.createRange(); r.selectNodeContents(ea); const s=window.getSelection(); s.removeAllRanges(); s.addRange(r); } return; }
  if(e.key==='Tab'){ e.preventDefault(); document.execCommand('insertText',false,'    '); return; }

  if(e.key==='Enter'){
    const sel=window.getSelection();
    if(!sel||!sel.rangeCount) return;
    const rng=sel.getRangeAt(0);
    const node=rng.startContainer;
    const el=node.nodeType===3?node.parentElement:node;

    // Exit todo on Enter in empty todo span
    const todoSpan=el&&typeof el.closest==='function'?el.closest('.kb5-txt'):null;
    if(todoSpan){
      e.preventDefault();
      const todo=todoSpan.closest('.kb5-todo');
      if(!todoSpan.textContent.trim()&&todo){
        todo.remove();
      } else {
        // New todo below
        const id='t'+Date.now();
        const newTodo=document.createElement('div');
        newTodo.className='kb5-todo'; newTodo.contentEditable='false';
        newTodo.innerHTML=`<span class="kb5-chk" onclick="window._kbChk(this)"></span><span class="kb5-txt" id="${id}" contenteditable="true"> </span>`;
        if(todo&&todo.nextSibling) todo.parentNode.insertBefore(newTodo,todo.nextSibling);
        else document.getElementById('kb5area')?.appendChild(newTodo);
        setTimeout(()=>{ const sp=document.getElementById(id); if(sp){ sp.focus(); placeCursorEnd(sp); } },10);
      }
      _kbEdInput(); return;
    }

    // Exit blockquote / list on empty line
    const bq=el&&typeof el.closest==='function'?el.closest('blockquote'):null;
    const li=el&&typeof el.closest==='function'?el.closest('li'):null;

    if(bq&&(node.textContent||'').trim()===''){
      e.preventDefault();
      const last=bq.lastChild;
      if(last&&(last.nodeName==='BR'||(last.nodeType===3&&!last.textContent.trim()))) bq.removeChild(last);
      const p=document.createElement('p'); p.innerHTML='<br>';
      if(bq.nextSibling) bq.parentNode.insertBefore(p,bq.nextSibling); else bq.parentNode.appendChild(p);
      const r=document.createRange(); r.setStart(p,0); r.collapse(true);
      sel.removeAllRanges(); sel.addRange(r);
      _kbEdInput(); return;
    }
    if(li&&!(li.textContent||'').trim()){
      e.preventDefault();
      const lst=li.closest('ul')||li.closest('ol');
      li.remove();
      if(lst&&!lst.querySelector('li')) lst.remove();
      document.execCommand('insertHTML',false,'<p><br></p>');
      _kbEdInput(); return;
    }
  }

  if(e.key==='Backspace'){
    const sel=window.getSelection();
    if(sel&&sel.rangeCount){
      const rng=sel.getRangeAt(0);
      const el=(rng.startContainer.nodeType===3?rng.startContainer.parentElement:rng.startContainer);
      const todoSpan=el&&typeof el.closest==='function'?el.closest('.kb5-txt'):null;
      if(todoSpan&&rng.startOffset<=1&&todoSpan.textContent.trim()===''){
        e.preventDefault();
        todoSpan.closest('.kb5-todo')?.remove();
        _kbEdInput(); return;
      }
    }
  }
}

// ── Note operations ───────────────────────────────────────────
function _kbNewNote(){
  if(!_kbS.cat){
    // Ask which cat/folder
    _kbSM(`<div style="font-size:15px;font-weight:800;color:var(--t1);margin-bottom:14px">Новая заметка</div>
      <div style="font-size:12px;color:var(--t3);margin-bottom:10px">Выбери категорию и папку</div>
      <select id="kb5nc-cat" class="kb5-inp" style="margin-bottom:8px" onchange="_kbNewNoteCatChange(this.value)">
        ${ALL_CATS.map(c=>`<option value="${c.id}">${c.icon} ${_kbEsc(c.name)}</option>`).join('')}
      </select>
      <select id="kb5nc-fold" class="kb5-inp" style="margin-bottom:14px"></select>
      <div style="display:flex;gap:8px">
        <button class="kb5-btn kb5-btn-ghost" style="flex:1;justify-content:center" onclick="_kbCloseMod()">Отмена</button>
        <button class="kb5-btn kb5-btn-gold" style="flex:1;justify-content:center" onclick="_kbNewNoteConfirm()">Создать</button>
      </div>`);
    _kbNewNoteCatChange(ALL_CATS[0]?.id);
    return;
  }
  if(!_kbS.folder){
    const folders=(_kb3[_kbS.cat]?.folders)||[];
    if(!folders.length){ _kbNewFolder(_kbS.cat,true); return; }
    _kbS.folder=folders[0].id;
  }
  _kbCreateNote(_kbS.cat,_kbS.folder);
}
function _kbNewNoteCatChange(cid){
  const sel=document.getElementById('kb5nc-fold'); if(!sel) return;
  const folders=(_kb3[cid]?.folders)||[];
  sel.innerHTML=folders.length
    ?folders.map(f=>`<option value="${f.id}">${_kbEsc(f.title)}</option>`).join('')
    :`<option value="">Нет папок — создай папку сначала</option>`;
}
function _kbNewNoteConfirm(){
  const cat=document.getElementById('kb5nc-cat')?.value;
  const fid=document.getElementById('kb5nc-fold')?.value;
  if(!cat||!fid){ _kbCloseMod(); return; }
  _kbCloseMod(); _kbCreateNote(cat,fid);
}
function _kbCreateNote(cid,fid){
  _kbLoad3();
  const f=_kbGetFolder(cid,fid); if(!f) return;
  const id=_kbUID();
  const n={id,title:'Новая заметка',body:'',tags:[],pinned:false,createdAt:Date.now(),updatedAt:Date.now()};
  if(!f.notes) f.notes=[];
  f.notes.unshift(n);
  _kbS.cat=cid; _kbS.folder=fid; _kbS.note=id;
  _kbS.collapsed[cid]=false;
  _kbSave3();
  const area=document.getElementById('kb5area'); if(area){ area.innerHTML=''; delete area.dataset.evts; }
  const tb=document.getElementById('kb5tb'); if(tb) delete tb.dataset.built;
  renderKnowledgeBase();
  setTimeout(()=>{ const ti=document.getElementById('kb5title'); if(ti){ ti.focus(); ti.select(); } },60);
}
function _kbNewFolder(cid,thenNote=false){
  _kbSM(`<div style="font-size:15px;font-weight:800;color:var(--t1);margin-bottom:14px">Новая папка</div>
    <input class="kb5-inp" id="kb5nf-inp" placeholder="Название папки" maxlength="60" autocomplete="off">
    <div style="display:flex;gap:8px;margin-top:12px">
      <button class="kb5-btn kb5-btn-ghost" style="flex:1;justify-content:center" onclick="_kbCloseMod()">Отмена</button>
      <button class="kb5-btn kb5-btn-gold" style="flex:1;justify-content:center" onclick="_kbCreateFolder('${cid}',${thenNote})">Создать</button>
    </div>`);
  setTimeout(()=>{ const inp=document.getElementById('kb5nf-inp'); if(inp){ inp.focus(); inp.addEventListener('keydown',e=>{ if(e.key==='Enter') _kbCreateFolder(cid,thenNote); }); } },50);
}
function _kbCreateFolder(cid,thenNote){
  const t=(document.getElementById('kb5nf-inp')?.value||'').trim();
  if(!t){ return; }
  _kbLoad3();
  if(!_kb3[cid]) _kb3[cid]={folders:[]};
  const id=_kbUID();
  _kb3[cid].folders.push({id,title:t,notes:[]});
  _kbS.cat=cid; _kbS.folder=id; _kbS.collapsed[cid]=false;
  _kbSave3(); _kbCloseMod();
  if(thenNote){ _kbCreateNote(cid,id); } else { renderKnowledgeBase(); }
}
function _kbTogPin(){
  const n=_kbGetNote(_kbS.cat,_kbS.folder,_kbS.note); if(!n) return;
  n.pinned=!n.pinned; n.updatedAt=Date.now(); _kbSave3();
  _kbRenderNoteList(); _kbRenderSidebar();
  // Update pin button
  const pb=document.getElementById('kb5pinBtn'); if(pb){ const svg=pb.querySelector('svg'); if(svg){ svg.setAttribute('fill',n.pinned?'var(--gold)':'none'); svg.setAttribute('stroke',n.pinned?'var(--gold)':'currentColor'); } }
}
function _kbNoteMenu(){
  const n=_kbGetNote(_kbS.cat,_kbS.folder,_kbS.note); if(!n) return;
  _kbSM(`<div style="font-size:14px;font-weight:800;color:var(--t1);margin-bottom:14px">«${_kbEsc(n.title||'Без названия')}»</div>
    <div style="display:flex;flex-direction:column;gap:6px">
      <button class="kb5-btn kb5-btn-ghost" style="justify-content:flex-start;gap:10px" onclick="_kbRenameNote()">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        Переименовать
      </button>
      <button class="kb5-btn kb5-btn-ghost" style="justify-content:flex-start;gap:10px" onclick="_kbDupNote()">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        Дублировать
      </button>
      <button class="kb5-btn kb5-btn-ghost" style="justify-content:flex-start;gap:10px" onclick="_kbExportNote()">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Экспорт .txt
      </button>
      <button class="kb5-btn kb5-btn-danger" style="justify-content:flex-start;gap:10px" onclick="_kbDelNote()">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>
        Удалить заметку
      </button>
    </div>
    <button class="kb5-btn kb5-btn-ghost" style="width:100%;justify-content:center;margin-top:10px" onclick="_kbCloseMod()">Закрыть</button>`);
}
function _kbRenameNote(){
  const n=_kbGetNote(_kbS.cat,_kbS.folder,_kbS.note); if(!n) return;
  _kbSM(`<div style="font-size:15px;font-weight:800;color:var(--t1);margin-bottom:12px">Переименовать</div>
    <input class="kb5-inp" id="kb5rn-inp" value="${_kbEsc(n.title||'')}" maxlength="100" autocomplete="off">
    <div style="display:flex;gap:8px;margin-top:12px">
      <button class="kb5-btn kb5-btn-ghost" style="flex:1;justify-content:center" onclick="_kbCloseMod()">Отмена</button>
      <button class="kb5-btn kb5-btn-gold" style="flex:1;justify-content:center" onclick="_kbDoRename()">Сохранить</button>
    </div>`);
  setTimeout(()=>{ const inp=document.getElementById('kb5rn-inp'); if(inp){ inp.focus(); inp.select(); inp.addEventListener('keydown',e=>{ if(e.key==='Enter') _kbDoRename(); }); } },50);
}
function _kbDoRename(){
  const t=(document.getElementById('kb5rn-inp')?.value||'').trim()||'Без названия';
  const n=_kbGetNote(_kbS.cat,_kbS.folder,_kbS.note); if(!n) return;
  n.title=t; n.updatedAt=Date.now(); _kbSave3(); _kbCloseMod();
  const ti=document.getElementById('kb5title'); if(ti) ti.value=t;
  _kbRenderNoteList(); _kbRenderSidebar();
}
function _kbDupNote(){
  const n=_kbGetNote(_kbS.cat,_kbS.folder,_kbS.note);
  const f=_kbGetFolder(_kbS.cat,_kbS.folder);
  if(!n||!f) return;
  const id=_kbUID();
  const dup={...JSON.parse(JSON.stringify(n)),id,title:(n.title||'')+'  (копия)',createdAt:Date.now(),updatedAt:Date.now(),pinned:false};
  const idx=f.notes.findIndex(x=>x.id===n.id);
  f.notes.splice(idx+1,0,dup);
  _kbSave3(); _kbCloseMod();
  _kbOpenNote(_kbS.cat,_kbS.folder,id);
}
function _kbDelNote(){
  const n=_kbGetNote(_kbS.cat,_kbS.folder,_kbS.note);
  const f=_kbGetFolder(_kbS.cat,_kbS.folder);
  if(!n||!f) return;
  if(!confirm(`Удалить «${n.title||'Без названия'}»?`)) return;
  f.notes=f.notes.filter(x=>x.id!==n.id);
  _kbS.note=null; _kbSave3(); _kbCloseMod();
  const area=document.getElementById('kb5area'); if(area){ area.innerHTML=''; delete area.dataset.evts; }
  const tb=document.getElementById('kb5tb'); if(tb) delete tb.dataset.built;
  renderKnowledgeBase();
}
function _kbExportNote(){
  const n=_kbGetNote(_kbS.cat,_kbS.folder,_kbS.note); if(!n) return;
  const md=`# ${n.title||'Без названия'}\n\n${_kbStrip(n.body||'')}`;
  const blob=new Blob([md],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url; a.download=`${(n.title||'note').replace(/[^a-zA-Zа-яА-Я0-9 ]/g,'_')}.txt`;
  a.click(); URL.revokeObjectURL(url); _kbCloseMod();
}

// ── Tags ──────────────────────────────────────────────────────
function _kbAddTagPrompt(){
  const n=_kbGetNote(_kbS.cat,_kbS.folder,_kbS.note); if(!n) return;
  const t=prompt('Введи тег (без #):','');
  if(!t||!t.trim()) return;
  const tag=t.trim().toLowerCase().replace(/\s+/g,'-');
  if(!(n.tags||[]).includes(tag)){ if(!n.tags) n.tags=[]; n.tags.push(tag); n.updatedAt=Date.now(); _kbSave3(); }
  const tags=document.getElementById('kb5tags');
  const c=ALL_CATS.find(x=>x.id===_kbS.cat);
  if(tags&&c) tags.innerHTML=(n.tags||[]).map(t=>`<span class="kb5-tag" style="background:${c.color}18;color:${c.color}">#${_kbEsc(t)}<span onclick="_kbRemTag('${_kbEsc(t)}')" style="cursor:pointer;opacity:.5;margin-left:2px">×</span></span>`).join('');
}
function _kbRemTag(t){
  const n=_kbGetNote(_kbS.cat,_kbS.folder,_kbS.note); if(!n) return;
  n.tags=(n.tags||[]).filter(x=>x!==t); n.updatedAt=Date.now(); _kbSave3();
  const tags=document.getElementById('kb5tags');
  const c=ALL_CATS.find(x=>x.id===_kbS.cat);
  if(tags&&c) tags.innerHTML=(n.tags||[]).map(t=>`<span class="kb5-tag" style="background:${c.color}18;color:${c.color}">#${_kbEsc(t)}<span onclick="_kbRemTag('${_kbEsc(t)}')" style="cursor:pointer;opacity:.5;margin-left:2px">×</span></span>`).join('');
}

// ── Modal ──────────────────────────────────────────────────────
function _kbSM(html){ const ov=document.getElementById('kb5ov'),mc=document.getElementById('kb5modal'); if(!ov||!mc) return; mc.innerHTML=html; ov.classList.add('on'); }
function _kbCloseMod(){ document.getElementById('kb5ov')?.classList.remove('on'); }
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){ _kbCloseMod(); }
  if(e.key==='Escape'&&_kbS.note){ const area=document.getElementById('kb5area'); if(document.activeElement===area){ _kbAutoSave(); area.blur(); } }
});

// ── Compat aliases (called from showTab and other places) ─────
function _kbRS(){ try{ _kbRenderSidebar(); }catch(e){} }
function _kbRED(){ try{ _kbRenderMain(); }catch(e){} }
function _kbRNL(){ try{ _kbRenderNoteList(); }catch(e){} }
function _kbFlush3(){ _kbAutoSave(); }
function _kbSSV(){ _kbSSV5('saved'); }
function _kbCM(){ _kbCloseMod(); }
function _kbON(cid,fid,nid){ _kbOpenNote(cid,fid,nid); }
function _kbSF(cid,fid){ _kbOpenFolder(cid,fid); }
function _kbGoAll(){ _kbGoHome(); }
function _kbTogTOC(){}
function _kbTogFocus(){}
function _kbShortcuts(){}
function _kbNewNoteQuick(){ _kbNewNote(); }
function _kbNF(cid){ _kbNewFolder(cid); }
function _kbNN(){ _kbNewNote(); }

// ── showTab compatibility ─────────────────────────────────────
/* ══ HABIT TRACKER ENGINE v3 ══ */

(function HabTracker(){
'use strict';

// ── Constants ───────────────────────────────────────────────
const HK='dtr_h3', LK='dtr_l3';
const EMOJIS=['📚','🏃','🧘','💪','🍎','💧','🎯','✍️','🎨','🎸','🧠','😴','🌿','🚴','🏊','🤸','🧹','💊','☀️','🌙','📝','🎓','🔥','⚡','🌸','🎮','🍵','🌊','🏋️','🚶','🧩','💡','🎵','🥗','🫀','📿','🦷','💻','🧪','🪴'];
const COLORS=['#F5C842','#22C55E','#3B82F6','#EF4444','#A855F7','#F97316','#06B6D4','#EC4899','#8B5CF6','#14B8A6','#84CC16','#F59E0B'];
const DLBL=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
const MLBL=['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const QUOTES=['Маленькие привычки — большие результаты.','Дисциплина — это свобода.','Побеждает тот, кто не останавливается.','Каждый день — это новый шанс.','Прогресс важнее совершенства.'];
const TEMPLATES=[
  {name:'Читать 30 мин',icon:'📚',color:'#3B82F6',freq:'daily',tod:'evening'},
  {name:'Спорт',icon:'🏃',color:'#22C55E',freq:'daily',tod:'morning'},
  {name:'Медитация',icon:'🧘',color:'#A855F7',freq:'daily',tod:'morning'},
  {name:'Пить воду',icon:'💧',color:'#06B6D4',freq:'daily',tod:'any'},
  {name:'Без соцсетей',icon:'🎯',color:'#F97316',freq:'weekdays',tod:'any'},
  {name:'Ранний подъём',icon:'☀️',color:'#F5C842',freq:'daily',tod:'morning'},
];

let _emoji=EMOJIS[0],_color=COLORS[0],_freq='daily',_tod='any',_sort='order',_mOff=0,_editId=null;

// ── Storage ──────────────────────────────────────────────────
const hLoad=()=>{try{return JSON.parse(localStorage.getItem(HK)||'[]');}catch{return[];}};
const lLoad=()=>{try{return JSON.parse(localStorage.getItem(LK)||'{}');}catch{return{};}};
const hSave=d=>localStorage.setItem(HK,JSON.stringify(d));
const lSave=d=>localStorage.setItem(LK,JSON.stringify(d));

// ── Date utils ───────────────────────────────────────────────
const pad=n=>String(n).padStart(2,'0');
const dk=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const today=()=>dk(new Date());
function weekDates(){
  const d=new Date(),dow=d.getDay()||7;
  d.setDate(d.getDate()-dow+1);d.setHours(0,0,0,0);
  return Array.from({length:7},(_,i)=>{const x=new Date(d);x.setDate(x.getDate()+i);return x;});
}
function isActive(freq,d){
  const w=d.getDay();
  if(freq==='daily')return true;
  if(freq==='weekdays')return w>=1&&w<=5;
  if(freq==='weekend')return w===0||w===6;
  return true;
}
const isDone=(hid,key)=>{const l=lLoad();return !!(l[hid]&&l[hid][key]);};

// ── Streak ───────────────────────────────────────────────────
function calcStreak(hid,freq){
  const l=lLoad()[hid]||{};let s=0;
  const d=new Date();d.setHours(12,0,0,0);
  // If today is an active day but not yet done — start from yesterday
  // so the streak doesn't break just because today hasn't been logged yet
  const todayKey=dk(d);
  if(isActive(freq,d)&&!l[todayKey]){
    d.setDate(d.getDate()-1);
  }
  for(let i=0;i<400;i++){
    if(!isActive(freq,d)){d.setDate(d.getDate()-1);continue;}
    if(l[dk(d)])s++;else break;
    d.setDate(d.getDate()-1);
  }
  return s;
}
function bestStreak(hid,freq){
  const l=lLoad()[hid]||{};const keys=Object.keys(l).sort();
  if(!keys.length)return 0;
  let best=0,cur=0;
  const s=new Date(keys[0]);s.setHours(12,0,0,0);
  const e=new Date();e.setHours(12,0,0,0);
  const x=new Date(s);
  while(x<=e){if(isActive(freq,x)){if(l[dk(x)]){cur++;best=Math.max(best,cur);}else cur=0;}x.setDate(x.getDate()+1);}
  return best;
}

// ── Consistency % (last 30 days) ─────────────────────────────
function consist30(hid,freq){
  const l=lLoad()[hid]||{};let done=0,poss=0;
  const d=new Date();d.setHours(12,0,0,0);
  for(let i=0;i<30;i++){if(isActive(freq,d)){poss++;if(l[dk(d)])done++;}d.setDate(d.getDate()-1);}
  return poss?Math.round(done/poss*100):0;
}

// ── Ring SVG ─────────────────────────────────────────────────
function mkRing(pct,color,size=34){
  const r=12,c=2*Math.PI*r,dash=c*pct/100;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="2.5"/>
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="2.5"
      stroke-dasharray="${dash.toFixed(1)} ${(c-dash).toFixed(1)}" stroke-linecap="round"
      style="transform:rotate(-90deg);transform-origin:50% 50%;transition:stroke-dasharray .8s cubic-bezier(.4,0,.2,1)"/>
  </svg>`;
}

// ── Arc SVG (hero score) ─────────────────────────────────────
function mkArc(pct,size=90){
  const r=36,cx=size/2,cy=size/2;
  const startAngle=-200,sweepAngle=220;
  function polarToCartesian(angle){
    const rad=angle*Math.PI/180;
    return{x:cx+r*Math.cos(rad),y:cy+r*Math.sin(rad)};
  }
  const s=polarToCartesian(startAngle),e=polarToCartesian(startAngle+sweepAngle);
  const bg=`M ${s.x} ${s.y} A ${r} ${r} 0 1 1 ${e.x} ${e.y}`;
  const prog=polarToCartesian(startAngle+sweepAngle*(pct/100));
  const largeArc=sweepAngle*(pct/100)>180?1:0;
  const fg=`M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${prog.x} ${prog.y}`;
  const color=pct===100?'#22C55E':pct>=70?'#F5C842':pct>=40?'#F97316':'#EF4444';
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <path d="${bg}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="5" stroke-linecap="round"/>
    <path d="${fg}" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"
      style="transition:stroke-dashoffset 1s ease;filter:drop-shadow(0 0 6px ${color}88)"/>
  </svg>`;
}

// ── Escape ────────────────────────────────────────────────────
const esc=s=>{const d=document.createElement('div');d.textContent=s;return d.innerHTML;};

// ── Sort habits ───────────────────────────────────────────────
function sorted(habits){
  const h=[...habits];
  if(_sort==='streak') return h.sort((a,b)=>calcStreak(b.id,b.freq)-calcStreak(a.id,a.freq));
  if(_sort==='consist') return h.sort((a,b)=>consist30(b.id,b.freq)-consist30(a.id,a.freq));
  if(_sort==='alpha') return h.sort((a,b)=>a.name.localeCompare(b.name,'ru'));
  return h; // 'order' = creation order
}

// ══ MAIN RENDER ══════════════════════════════════════════════
function render(){
  const root=document.getElementById('hab-root');if(!root)return;
  const habits=hLoad();const days=weekDates();const td=today();const now=new Date();

  // Compute today stats
  let doneToday=0,totalToday=0;
  habits.forEach(h=>{if(isActive(h.freq,now)){totalToday++;if(isDone(h.id,td))doneToday++;}});
  const todayPct=totalToday?Math.round(doneToday/totalToday*100):0;

  // Compute global streak = best individual habit streak (matches what user sees on rows)
  const log=lLoad();
  const globalStreak = habits.length
    ? Math.max(...habits.map(h => calcStreak(h.id, h.freq)))
    : 0;

  // Total completions ever
  let totalEver=0;
  Object.values(log).forEach(h=>totalEver+=Object.keys(h).length);

  const heroColor=todayPct===100?'var(--green)':todayPct>=70?'var(--gold)':todayPct>=40?'var(--orange)':'var(--red)';
  const todLabel=totalToday?`${doneToday} из ${totalToday}`:'Нет задач';

  // ── at-risk banners — не показываем уже скрытые ──
  const atRisk=habits.filter(h=>{
    if(!isActive(h.freq,now))return false;
    if(isDone(h.id,td))return false;
    if(window._dismissedRiskIds&&window._dismissedRiskIds.has(h.id+td))return false;
    return calcStreak(h.id,h.freq)>=3;
  });

  const perfectAll=totalToday>0&&doneToday===totalToday;

  // ── sort bar (standalone, outside matrix) ──
  const sortBar=`<div style="display:flex;align-items:center;gap:6px;padding:0 2px;margin-bottom:12px">
    <span style="font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--t3);margin-right:4px">Сортировка:</span>
    <button class="hab-sort-btn${_sort==='order'?' a':''}"   onclick="_hSort('order',this)">По порядку</button>
    <button class="hab-sort-btn${_sort==='streak'?' a':''}"  onclick="_hSort('streak',this)">🔥 Дисциплина</button>
    <button class="hab-sort-btn${_sort==='consist'?' a':''}" onclick="_hSort('consist',this)">% Успеха</button>
    <button class="hab-sort-btn${_sort==='alpha'?' a':''}"   onclick="_hSort('alpha',this)">А—Я</button>
  </div>`;

  // ── grid columns: name | 7 cells | progress bar | del ──
  const NCOL='200px';
  const colsDesktop=`${NCOL} repeat(7,44px) minmax(130px,170px) 32px`;

  // ── column day headers ──
  const colHead=days.map((d,i)=>{
    const isToday=dk(d)===td;const isPast=d<now&&!isToday;
    return `<div style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:4px">
      <div style="font-size:9px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:${isToday?'var(--gold)':'var(--t3)'}">${DLBL[i]}</div>
      <div style="width:32px;height:32px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;
        background:${isToday?'rgba(245,200,66,.15)':'transparent'};
        color:${isToday?'var(--gold)':isPast?'var(--t1)':'var(--t3)'};
        ${isToday?'outline:2px solid rgba(245,200,66,.45);outline-offset:1px':''}">${d.getDate()}</div>
    </div>`;
  }).join('');

  // ── habit rows ──
  const habList=sorted(habits).map(h=>{
    const s=calcStreak(h.id,h.freq);const color=h.color||'#F5C842';
    // ИСПРАВЛЕНИЕ: считаем только прошедшие активные дни (не будущие)
    let wDone=0,wActive=0;
    const cells=days.map((d,i)=>{
      const key=dk(d);const isToday=key===td;const active=isActive(h.freq,d);
      const done=isDone(h.id,key);const future=d>now&&!isToday;
      // Считаем только прошедшие дни (не будущие) в статистику
      if(active&&!future){ wActive++; if(done) wDone++; }
      let cls='hab-cell';
      if(done)cls+=' cell-done';
      if(isToday)cls+=' cell-today';
      if(future)cls+=' cell-future';
      if(!active)cls+=' cell-off';
      return `<div class="${cls}" style="${done?`background:${color};border-color:${color};box-shadow:0 3px 12px ${color}55`:''}"
        onclick="habToggle('${h.id}','${key}')" title="${d.toLocaleDateString('ru',{day:'numeric',month:'short'})}">
        ${done
          ?`<div class="cell-check"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.95)" stroke-width="2.8" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg></div>`
          :active&&!future
            ?`<div style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.09);box-shadow:0 0 0 2px rgba(255,255,255,.06)"></div>`
            :`<div style="width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.03)"></div>`
        }
      </div>`;
    }).join('');
    const weekPct=wActive?Math.round(wDone/wActive*100):0;
    const atRiskRow=s>=3&&isActive(h.freq,now)&&!isDone(h.id,td);
    const perfectRow=wActive>0&&wDone===wActive;
    const rowAccent=atRiskRow?'border-left:3px solid rgba(249,115,22,.6);background:rgba(249,115,22,.025)':
                   perfectRow?'border-left:3px solid rgba(245,200,66,.5);background:rgba(245,200,66,.025)':'';
    const todLabel={any:'',morning:'🌅',evening:'🌙'}[h.tod||'any']||'';
    return `<div class="hab-row" style="grid-template-columns:${colsDesktop};${rowAccent}">
      <div class="hab-row-name">
        <div class="hab-row-icon" style="background:${color}15;border:0.5px solid ${color}30">${h.icon||'🎯'}</div>
        <div class="hab-row-label" style="min-width:0">
          <div class="hab-row-title" style="font-size:14px">${esc(h.name)}</div>
          <div class="hab-row-sub">
            ${s>0
              ?`<span style="color:var(--orange);font-weight:700;font-size:11px">🔥 ${s} дн.</span>`
              :'<span style="color:var(--t3);font-size:11px">— дисциплина</span>'
            }
            ${todLabel?`<span style="font-size:11px">${todLabel}</span>`:''}
          </div>
        </div>
      </div>
      ${cells}
      <div class="hab-prog-wrap">
        <div class="hab-prog-head">
          <span class="hab-prog-lbl">Неделя</span>
          <span class="hab-prog-pct" data-target="${weekPct}" style="color:${weekPct===100?color:weekPct>=50?color:'var(--t3)'}">0%</span>
        </div>
        <div class="hab-prog-bar">
          <div class="hab-prog-fill" style="width:${weekPct}%;background:${weekPct===100?`linear-gradient(90deg,${color}cc,${color})`:`linear-gradient(90deg,${color}66,${color}99)`};box-shadow:${weekPct>20?`0 0 10px ${color}44`:'none'}"></div>
        </div>
        <div class="hab-prog-sub">
          <span>${wDone}/${wActive} дн.</span>
          ${weekPct===100?`<span style="color:${color};font-size:11px">✦ Идеально</span>`:''}
        </div>
      </div>
      <button class="hab-del-btn" onclick="habDel('${h.id}')" title="Удалить">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      </button>
    </div>`;
  }).join('');

  // ── Mode bar always rendered as first child — never lost on re-render ──
  const _chabMode = localStorage.getItem('dtr_chab_mode') || 'personal';
  const _modeBarHtml = `
  <div class="hab-mode-bar" id="habModeBar">
    <button class="hab-mode-btn ${_chabMode==='personal'?'active':''}" data-mode="personal" onclick="chabSetMode('personal')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      Мой трекер
    </button>
    <button class="hab-mode-btn ${_chabMode==='collab'?'active collab':''}" data-mode="collab" onclick="chabSetMode('collab')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      Совместный
      <span class="hab-mode-badge">NEW</span>
    </button>
  </div>`;

  root.innerHTML=_modeBarHtml+`
  <!-- ═══ HERO BANNER — Apple redesign ═══ -->
  <!-- ═══ HERO BANNER v3 — full Apple redesign ═══ -->
  <div style="display:grid;grid-template-columns:1fr 88px;gap:14px;margin-bottom:22px;align-items:stretch">

    <!-- ── Main card ── -->
    <div style="
      background:var(--card);
      border:0.5px solid rgba(255,255,255,.07);
      border-radius:22px;
      padding:0;
      overflow:hidden;
      box-shadow:0 8px 32px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.06);
      display:flex;flex-direction:column;">

      <!-- Top strip: title + progress bar -->
      <div style="
        padding:20px 24px 18px;
        background:linear-gradient(135deg,${heroColor}0d 0%,transparent 60%);
        border-bottom:0.5px solid rgba(255,255,255,.05);
        display:flex;align-items:center;gap:22px;">

        <!-- Arc -->
        <div style="position:relative;flex-shrink:0">
          ${mkArc(todayPct,80)}
          <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px">
            <div style="font-family:'DM Mono',monospace;font-size:17px;font-weight:400;line-height:1;color:${heroColor};letter-spacing:-.04em">${todayPct}%</div>
            <div style="font-size:7.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t3)">Сегодня</div>
          </div>
        </div>

        <!-- Title block -->
        <div style="flex:1;min-width:0">
          <div style="font-size:20px;font-weight:800;color:var(--t1);letter-spacing:-.04em;line-height:1.1;margin-bottom:5px">${
            todayPct===100?'🏆 Идеальный день!':
            todayPct>=70?'💪 Отличный прогресс':
            todayPct>=40?'⚡ Продолжай!':
            totalToday>0?'🎯 Начни сейчас':'Добавь привычки'
          }</div>
          <div style="font-size:13px;color:var(--t2);letter-spacing:-.005em">${doneToday} из ${totalToday} привычек выполнено</div>

          <!-- Horizontal progress bar -->
          <div style="margin-top:12px;height:5px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden">
            <div style="height:100%;width:${todayPct}%;background:linear-gradient(90deg,${heroColor}88,${heroColor});border-radius:3px;transition:width 1.2s cubic-bezier(.4,0,.2,1);box-shadow:0 0 10px ${heroColor}55"></div>
          </div>
        </div>

      </div>

      <!-- Bottom strip: KPI 3-grid — симметрично, без иконки огня -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);flex:1">

        <div style="padding:16px 8px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border-right:0.5px solid rgba(255,255,255,.05)">
          <div style="font-family:'DM Mono',monospace;font-size:28px;font-weight:300;line-height:1;color:var(--orange);letter-spacing:-.04em">${globalStreak||'—'}</div>
          <div style="font-size:9px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--t3)">Дисциплина</div>
        </div>

        <div style="padding:16px 8px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border-right:0.5px solid rgba(255,255,255,.05)">
          <div style="font-family:'DM Mono',monospace;font-size:28px;font-weight:300;line-height:1;color:#58a6ff;letter-spacing:-.04em">${habits.length}</div>
          <div style="font-size:9px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--t3)">Привычек</div>
        </div>

        <div style="padding:16px 8px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px">
          <div style="font-family:'DM Mono',monospace;font-size:28px;font-weight:300;line-height:1;color:#30d158;letter-spacing:-.04em">${totalEver}</div>
          <div style="font-size:9px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--t3)">Выполнено</div>
        </div>

      </div>
    </div>

    <!-- ── Add button ── -->
    <button onclick="_hOpenModal()"
      style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;
        background:rgba(245,200,66,.07);
        border:0.5px solid rgba(245,200,66,.2);
        border-radius:22px;cursor:pointer;
        transition:background-color .2s,border-color .2s,color .2s,box-shadow .2s,opacity .2s cubic-bezier(.34,1.56,.64,1);
        font-family:'DM Sans',sans-serif;
        box-shadow:0 4px 16px rgba(0,0,0,.2);"
      onmouseover="this.style.background='rgba(245,200,66,.14)';this.style.transform='scale(1.04)';this.style.boxShadow='0 8px 24px rgba(245,200,66,.22)'"
      onmouseout="this.style.background='rgba(245,200,66,.07)';this.style.transform='';this.style.boxShadow='0 4px 16px rgba(0,0,0,.2)'">
      <div style="width:42px;height:42px;border-radius:13px;background:linear-gradient(145deg,#D4960A,#F5C842);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(245,200,66,.4),inset 0 1px 0 rgba(255,255,255,.3)">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0A0A0B" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </div>
      <span style="font-size:11px;font-weight:700;color:var(--gold);letter-spacing:.01em">Привычка</span>
    </button>

  </div>

  <!-- ═══ ALERTS ═══ -->
  ${perfectAll&&!atRisk.length?`<div style="display:flex;align-items:center;gap:12px;padding:12px 18px;background:rgba(245,200,66,.06);border:0.5px solid rgba(245,200,66,.18);border-radius:12px;margin-bottom:12px;animation:fadeUp .3s ease both">
    <span style="font-size:18px">🏆</span>
    <div>
      <div style="font-size:13px;font-weight:700;color:var(--gold)">Идеальный день!</div>
      <div style="font-size:11px;color:var(--t2);margin-top:1px">Все привычки выполнены — ты в ударе!</div>
    </div>
  </div>`:''}
  ${atRisk.map((h,i)=>`<div id="atRiskBanner_${h.id}" style="display:flex;align-items:center;gap:12px;padding:11px 16px;background:rgba(249,115,22,.06);border:0.5px solid rgba(249,115,22,.2);border-radius:12px;margin-bottom:8px;animation:fadeUp .3s ease both;transition:opacity .5s,transform .5s">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" stroke-width="2" style="flex-shrink:0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    <div style="flex:1;min-width:0"><span style="font-size:12px;font-weight:700;color:var(--orange)">Дисциплина под угрозой! </span><span style="font-size:12px;color:var(--t2)">«${esc(h.name)}» · 🔥 ${calcStreak(h.id,h.freq)} дней</span></div>
    <button onclick="habToggle('${h.id}','${today()}')" style="flex-shrink:0;padding:6px 14px;border-radius:8px;background:rgba(249,115,22,.15);border:0.5px solid rgba(249,115,22,.35);color:var(--orange);font-size:11px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap;transition:background-color .15s,border-color .15s,color .15s,opacity .15s" onmouseover="this.style.background='rgba(249,115,22,.28)'" onmouseout="this.style.background='rgba(249,115,22,.15)'">Отметить ✓</button>
    <button onclick="_dismissAtRisk('${h.id}')" style="flex-shrink:0;width:24px;height:24px;border-radius:6px;background:transparent;border:none;color:rgba(255,255,255,.25);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;padding:0;transition:color .15s" onmouseover="this.style.color='var(--t1)'" onmouseout="this.style.color='rgba(255,255,255,.25)'">✕</button>
  </div>`).join('')}

  <!-- ═══ HABIT MATRIX ═══ -->
  ${habits.length?`
  ${sortBar}
  <div class="hab-matrix">
    <!-- Column headers -->
    <div style="display:grid;grid-template-columns:${colsDesktop};align-items:center;gap:4px;padding:10px 16px 8px;border-bottom:0.5px solid rgba(255,255,255,.05)">
      <div style="font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t3)">ПРИВЫЧКА</div>
      ${colHead}
      <div style="font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t3);padding:0 4px">ПРОГРЕСС</div>
      <div></div>
    </div>
    <!-- Rows -->
    ${habList}
    <!-- Add row -->
    <div class="hab-add-row" onclick="_hOpenModal()">
      <div class="hab-add-circle">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </div>
      <span style="font-size:13px;font-weight:500">Добавить привычку</span>
    </div>
  </div>`:`
  <div class="hab-matrix">
    <div class="hab-empty-state">
      <div class="hab-es-icon">✅</div>
      <div class="hab-es-title">Начни прямо сейчас</div>
      <div class="hab-es-sub">Выбери из шаблонов или создай свою привычку</div>
      <div class="hab-template-row">${TEMPLATES.map(t=>`<div class="hab-tpl" onclick="_hFromTpl(${JSON.stringify(t).replace(/"/g,'&quot;')})">${t.icon} ${t.name}</div>`).join('')}</div>
      <button onclick="_hOpenModal()" style="margin-top:12px;padding:12px 28px;background:linear-gradient(135deg,var(--gold-d),var(--gold));color:#0A0A0B;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;transition:transform .18s,box-shadow .18s" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 24px rgba(245,200,66,.4)'" onmouseout="this.style.transform='';this.style.boxShadow=''">+ Создать привычку</button>
    </div>
  </div>`}

  <!-- ═══ REPORTS ═══ -->
  <div class="card" style="margin-bottom:0;margin-top:16px">
    <div class="ch">
      <span class="ct" style="display:inline-flex;align-items:center;gap:7px">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="opacity:.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        Аналитика
      </span>
      <div class="hab-rep-tabs">
        <button class="hab-rt a" id="habRtW" onclick="_hRepTab('W',this)">Неделя</button>
        <button class="hab-rt"   id="habRtM" onclick="_hRepTab('M',this)">Месяц</button>
      </div>
    </div>
    <div class="cb">
      <div class="hab-rp a" id="habRpW"></div>
      <div class="hab-rp"   id="habRpM"></div>
    </div>
  </div>`;

  renderWeekRep();

  // Авто-скрытие «Стрик под угрозой» через 30 секунд (не повторяется при ре-рендере)
  if(atRisk.length){
    if(!window._dismissedRiskIds) window._dismissedRiskIds = new Set();
    clearTimeout(window._riskTimer);
    window._riskTimer = setTimeout(function(){
      atRisk.forEach(function(h){
        window._dismissedRiskIds.add(h.id+td);
        window._dismissAtRisk(h.id);
      });
    }, 30000);
  }
}

// ══ TOGGLE ═══════════════════════════════════════════════════
// ── At-risk banner helpers ──
window._dismissAtRisk = function(hid){
  if(!window._dismissedRiskIds) window._dismissedRiskIds = new Set();
  const td = today();
  window._dismissedRiskIds.add(hid+td);
  var el = document.getElementById('atRiskBanner_'+hid);
  if(!el) return;
  el.style.opacity='0'; el.style.transform='translateY(-8px) scale(.97)';
  setTimeout(function(){ if(el.parentNode) el.remove(); }, 450);
};

window.habToggle=function(hid,key){
  const l=lLoad();if(!l[hid])l[hid]={};
  const wasDone=!!l[hid][key];
  if(wasDone)delete l[hid][key];else l[hid][key]=1;
  lSave(l);render();
  if(!wasDone&&key===today()){
    try{window.showToast&&showToast('Выполнено!','✅');}catch{}
    // Check perfect day
    const habits=hLoad();const now=new Date();
    let d=0,t=0;
    habits.forEach(h=>{if(isActive(h.freq,now)){t++;if(isDone(h.id,today()))d++;}});
    if(d===t&&t>0)try{window.triggerConfetti&&triggerConfetti();}catch{}
  }
};

// ══ DELETE ════════════════════════════════════════════════════
window.habDel=function(hid){
  const h=hLoad();const name=h.find(x=>x.id===hid)?.name||'привычку';
  if(!confirm(`Удалить «${name}»?\nВся история будет потеряна.`))return;
  hSave(h.filter(x=>x.id!==hid));
  const l=lLoad();delete l[hid];lSave(l);
  render();try{window.showToast&&showToast('Удалено','🗑️');}catch{}
};

// ══ SORT ═════════════════════════════════════════════════════
window._hSort=function(s,btn){
  _sort=s;
  document.querySelectorAll('.hab-sort-btn').forEach(b=>b.classList.remove('a'));
  btn.classList.add('a');
  render();
};

// ══ MODAL ════════════════════════════════════════════════════
function buildPickers(){
  const ep=document.getElementById('habEmojiPicker');
  const cp=document.getElementById('habColorPicker');
  if(ep)ep.innerHTML=EMOJIS.map(e=>`<button class="hab-ep${e===_emoji?' s':''}" onclick="_hEmoji('${e}',this)">${e}</button>`).join('');
  if(cp)cp.innerHTML=COLORS.map(c=>`<div class="hab-cp${c===_color?' s':''}" style="background:${c}" onclick="_hColor('${c}',this)"></div>`).join('');
  document.querySelectorAll('.hab-seg-btn').forEach(b=>b.classList.toggle('s',b.dataset.v===_freq));
  document.querySelectorAll('.hab-tod-btn').forEach(b=>b.classList.toggle('s',b.dataset.v===_tod));
}
window._hOpenModal=function(id){
  _editId=id||null;_emoji=EMOJIS[0];_color=COLORS[0];_freq='daily';_tod='any';
  if(id){const h=hLoad().find(x=>x.id===id);if(h){_emoji=h.icon;_color=h.color;_freq=h.freq;_tod=h.tod||'any';document.getElementById('habNameIn').value=h.name;}document.getElementById('habMTitle').textContent='Редактировать';}
  else{document.getElementById('habNameIn').value='';document.getElementById('habMTitle').textContent='Новая привычка';}
  buildPickers();
  const ov=document.getElementById('habAddOv');ov.classList.add('open');ov.style.display='flex';
  setTimeout(()=>document.getElementById('habNameIn').focus(),100);
};
window._hClose=function(){const ov=document.getElementById('habAddOv');ov.classList.remove('open');ov.style.display='none';};
window._hEmoji=function(e,btn){_emoji=e;document.querySelectorAll('.hab-ep').forEach(b=>b.classList.remove('s'));btn.classList.add('s');};
window._hColor=function(c,dot){_color=c;document.querySelectorAll('.hab-cp').forEach(d=>d.classList.remove('s'));dot.classList.add('s');};
window._hFreq=function(btn){_freq=btn.dataset.v;document.querySelectorAll('.hab-seg-btn').forEach(b=>b.classList.toggle('s',b.dataset.v===_freq));};
window._hTod=function(btn){_tod=btn.dataset.v;document.querySelectorAll('.hab-tod-btn').forEach(b=>b.classList.toggle('s',b.dataset.v===_tod));};
window._hFromTpl=function(tpl){
  _emoji=tpl.icon;_color=tpl.color;_freq=tpl.freq;_tod=tpl.tod;
  const h=hLoad();h.push({id:'h'+Date.now(),name:tpl.name,icon:_emoji,color:_color,freq:_freq,tod:_tod,created:Date.now()});
  hSave(h);render();try{window.showToast&&showToast('Добавлено: '+tpl.name,tpl.icon);}catch{}
};
window._hSave=function(){
  const name=document.getElementById('habNameIn').value.trim();
  if(!name){const inp=document.getElementById('habNameIn');inp.style.borderColor='rgba(239,68,68,.5)';inp.focus();setTimeout(()=>inp.style.borderColor='',1500);return;}
  const h=hLoad();
  if(_editId){const i=h.findIndex(x=>x.id===_editId);if(i>=0){h[i]={...h[i],name,icon:_emoji,color:_color,freq:_freq,tod:_tod};}}
  else h.push({id:'h'+Date.now(),name,icon:_emoji,color:_color,freq:_freq,tod:_tod,created:Date.now()});
  hSave(h);_hClose();render();try{window.showToast&&showToast(_editId?'Обновлено':'Добавлено',_emoji);}catch{}
};

// ══ REPORT TABS ═══════════════════════════════════════════════
window._hRepTab=function(t,btn){
  document.querySelectorAll('.hab-rt').forEach(b=>b.classList.remove('a'));btn.classList.add('a');
  ['W','M'].forEach(x=>{const el=document.getElementById('habRp'+x);if(el)el.classList.toggle('a',x===t);});
  if(t==='M')renderMonthRep();
};

// ══ WEEKLY REPORT ════════════════════════════════════════════
function renderWeekRep(){
  const el=document.getElementById('habRpW');if(!el)return;
  const habits=hLoad();const days=weekDates();const td=today();const now=new Date();const l=lLoad();
  if(!habits.length){el.innerHTML='<div class="empty" style="text-align:center;padding:32px;color:var(--t3)">Добавь привычки чтобы видеть статистику</div>';return;}

  let totalDone=0,totalPoss=0;
  const dayData=days.map(d=>{
    let done=0,poss=0;
    habits.forEach(h=>{if(isActive(h.freq,d)){poss++;if(l[h.id]&&l[h.id][dk(d)])done++;}});
    totalDone+=done;totalPoss+=poss;
    return{done,poss,d};
  });
  const maxP=Math.max(...dayData.map(x=>x.poss),1);
  const rate=totalPoss?Math.round(totalDone/totalPoss*100):0;
  const bst=habits.reduce((b,h)=>Math.max(b,bestStreak(h.id,h.freq)),0);
  const avgConsist=habits.length?Math.round(habits.reduce((s,h)=>s+consist30(h.id,h.freq),0)/habits.length):0;

  // bar chart with per-habit stacked bars
  const bars=dayData.map((x,i)=>{
    const h=maxP?Math.max(Math.round(x.done/maxP*90),x.done>0?5:2):2;
    const isToday=dk(x.d)===td;
    const pct=x.poss?Math.round(x.done/x.poss*100):0;
    const barColor=isToday?'linear-gradient(180deg,var(--gold),var(--gold-d))':'rgba(245,200,66,.35)';
    const best=x.done===x.poss&&x.poss>0;
    return `<div class="hab-bc-col">
      <div class="hab-bc-bars">
        <div class="hab-bc-bar${isToday?' td':''}" style="height:${h}px;background:${barColor};${best?'box-shadow:0 -3px 10px rgba(245,200,66,.5)':''}"></div>
      </div>
      <div class="hab-bc-lbl" style="color:${isToday?'var(--gold)':'var(--t3)'}">${DLBL[i]}</div>
      <div class="hab-bc-val">${x.done}${x.poss?`/<span style="opacity:.5">${x.poss}</span>`:''}</div>
    </div>`;
  }).join('');

  // Consistency table
  const bestDay=dayData.reduce((b,x)=>x.done>b.done?x:b,dayData[0]);
  const consistRows=[...habits].sort((a,b)=>consist30(b.id,b.freq)-consist30(a.id,a.freq)).map(h=>{
    const c=consist30(h.id,h.freq);const s=calcStreak(h.id,h.freq);const bs=bestStreak(h.id,h.freq);
    const color=h.color||'var(--gold)';
    return `<div class="hab-consist-row">
      <div class="hab-consist-icon">${h.icon}</div>
      <div class="hab-consist-info">
        <div class="hab-consist-name">${esc(h.name)}</div>
        <div class="hab-consist-bar-wr" style="max-width:180px"><div class="hab-consist-bar" style="width:${c}%;background:${color}"></div></div>
      </div>
      <div class="hab-consist-right">
        <div class="hab-consist-pct" style="color:${color}">${c}%</div>
        <div class="hab-consist-sub">🔥${s} · рек.${bs}дн</div>
      </div>
    </div>`;
  }).join('');

  el.innerHTML=`
    <div class="hab-kpi-strip">
      <div class="hab-kpi"><div class="hab-kpi-v">${totalDone}</div><div class="hab-kpi-l">Выполнено</div></div>
      <div class="hab-kpi"><div class="hab-kpi-v" style="color:var(--green)">${rate}%</div><div class="hab-kpi-l">Успех недели</div></div>
      <div class="hab-kpi"><div class="hab-kpi-v" style="color:var(--orange)">🔥${bst}</div><div class="hab-kpi-l">Лучшая дисциплина</div></div>
      <div class="hab-kpi"><div class="hab-kpi-v" style="color:var(--blue)">${avgConsist}%</div><div class="hab-kpi-l">Постоянство</div></div>
    </div>
    <div class="hab-sec-lbl">Выполнение по дням</div>
    <div class="hab-barchart">${bars}</div>
    ${bestDay.poss>0?`<div style="margin-bottom:18px;padding:10px 14px;background:rgba(245,200,66,.04);border:0.5px solid rgba(245,200,66,.12);border-radius:10px;font-size:12px;color:var(--t2)">
      🏅 Лучший день недели: <span style="color:var(--gold);font-weight:700">${bestDay.d.toLocaleDateString('ru',{weekday:'long'})}</span> — ${bestDay.done} привычек
    </div>`:''}
    <div class="hab-sec-lbl">Постоянство за 30 дней</div>
    ${consistRows}
    <div class="hab-quote" style="margin-top:16px">"${QUOTES[new Date().getDay()%QUOTES.length]}"</div>
  `;
}

// ══ MONTHLY REPORT ════════════════════════════════════════════
window.habMonthNav=function(d){_mOff+=d;renderMonthRep();};
function renderMonthRep(){
  const el=document.getElementById('habRpM');if(!el)return;
  const now=new Date();
  const ref=new Date(now.getFullYear(),now.getMonth()+_mOff,1);
  const yr=ref.getFullYear(),mo=ref.getMonth();
  const dim=new Date(yr,mo+1,0).getDate();
  const fdow=(new Date(yr,mo,1).getDay()||7)-1;
  const habits=hLoad();const l=lLoad();const td=today();
  if(!habits.length){el.innerHTML='<div style="text-align:center;padding:32px;color:var(--t3)">Добавь привычки</div>';return;}

  // build day data
  let totalDone=0,totalPoss=0;
  const dDone=[],dPoss=[];
  for(let d=1;d<=dim;d++){
    const dt=new Date(yr,mo,d,12);const key=dk(dt);
    let dn=0,ps=0;
    habits.forEach(h=>{if(isActive(h.freq,dt)){ps++;if(l[h.id]&&l[h.id][key])dn++;}});
    dDone.push(dn);dPoss.push(ps);totalDone+=dn;totalPoss+=ps;
  }
  const bestDay=Math.max(...dDone,0);
  const rate=totalPoss?Math.round(totalDone/totalPoss*100):0;
  const activeDays=dDone.filter(x=>x>0).length;

  // ── COMPACT DOT CALENDAR ──────────────────────────────────
  // Fixed 30px cells, centered, not 1fr
  const dayLblRow=DLBL.map(d=>`<div style="width:30px;height:20px;display:flex;align-items:center;justify-content:center;font-size:8.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--t3)">${d}</div>`).join('');
  let calCells='';
  for(let i=0;i<fdow;i++) calCells+=`<div style="width:30px;height:30px"></div>`;
  for(let d=1;d<=dim;d++){
    const dn=dDone[d-1],ps=dPoss[d-1];
    const key=`${yr}-${pad(mo+1)}-${pad(d)}`;
    const isToday=key===td;
    const ratio=ps>0?dn/ps:0;
    // Color & style by intensity
    let bg,color,border='transparent',shadow='';
    if(ps===0){
      bg='rgba(255,255,255,.03)';color='rgba(255,255,255,.15)';
    } else if(ratio===0){
      bg='rgba(255,255,255,.04)';color='rgba(255,255,255,.2)';
    } else if(ratio<0.34){
      bg='rgba(245,200,66,.12)';color='rgba(245,200,66,.6)';
    } else if(ratio<0.67){
      bg='rgba(245,200,66,.28)';color='rgba(245,200,66,.85)';
    } else if(ratio<1){
      bg='rgba(245,200,66,.52)';color='#F5C842';
    } else {
      bg='linear-gradient(135deg,#C89F28,#F5C842)';color='#0A0A0B';shadow='0 2px 8px rgba(245,200,66,.35)';
    }
    const todayStyle=isToday?`outline:2px solid rgba(245,200,66,.7);outline-offset:1px;`:'';
    calCells+=`<div title="${d} ${MLBL[mo]}: ${dn}/${ps}" style="width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;background:${bg};color:${color};box-shadow:${shadow};${todayStyle}cursor:default;transition:transform .12s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform=''">${d}</div>`;
  }

  // ── WEEK BARS ──────────────────────────────────────────────
  // Group days into weeks (Mon–Sun)
  const weeks=[];let week=[];
  const totalCells=fdow+dim;
  for(let i=0;i<totalCells;i++){
    const day=i-fdow+1;
    week.push(day>0&&day<=dim?day:null);
    if(week.length===7||(i===totalCells-1&&week.length)){
      if(week.length<7) while(week.length<7) week.push(null);
      weeks.push(week);week=[];
    }
  }
  const weekBars=weeks.map((wk,wi)=>{
    const validDays=wk.filter(d=>d!==null);
    if(!validDays.length) return '';
    const first=validDays[0],last=validDays[validDays.length-1];
    let wDone=0,wPoss=0;
    validDays.forEach(d=>{wDone+=dDone[d-1]||0;wPoss+=dPoss[d-1]||0;});
    const wPct=wPoss?Math.round(wDone/wPoss*100):0;
    const wColor=wPct===100?'var(--green)':wPct>=70?'var(--gold)':wPct>=40?'var(--orange)':'rgba(255,255,255,.15)';
    const isCurrentWeek=validDays.some(d=>`${yr}-${pad(mo+1)}-${pad(d)}`===td);
    return `<div style="display:flex;align-items:center;gap:10px;padding:7px 0;${isCurrentWeek?'':''}">
      <div style="font-size:10px;font-weight:700;color:var(--t3);width:42px;flex-shrink:0;font-family:'DM Mono',monospace">${pad(first)}.${pad(mo+1)}</div>
      <div style="flex:1;height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden">
        <div style="height:100%;width:${wPct}%;background:${wColor};border-radius:3px;transition:width .8s cubic-bezier(.4,0,.2,1);box-shadow:${wPct>0?`0 0 8px ${wColor}55`:'none'}"></div>
      </div>
      <div style="font-size:11px;font-weight:700;color:${wColor};width:36px;text-align:right;flex-shrink:0;font-family:'DM Mono',monospace">${wPct}%</div>
      <div style="font-size:10px;color:var(--t3);width:28px;text-align:right;flex-shrink:0">${wDone}/${wPoss}</div>
    </div>`;
  }).join('');

  // Legend
  const legend=[
    {bg:'rgba(255,255,255,.04)',label:'0%'},
    {bg:'rgba(245,200,66,.12)',label:'<34%'},
    {bg:'rgba(245,200,66,.28)',label:'<67%'},
    {bg:'rgba(245,200,66,.52)',label:'<100%'},
    {bg:'linear-gradient(135deg,#C89F28,#F5C842)',label:'100%'},
  ];

  // per-habit month breakdown
  const prevRef=new Date(yr,mo-1,1);const pyr=prevRef.getFullYear(),pmo=prevRef.getMonth();
  const pdim=new Date(pyr,pmo+1,0).getDate();
  const breakdown=habits.map(h=>{
    let hd=0,hp=0,pd=0,pp=0;
    for(let d=1;d<=dim;d++){const dt=new Date(yr,mo,d,12);if(isActive(h.freq,dt)){hp++;if(l[h.id]&&l[h.id][dk(dt)])hd++;}}
    for(let d=1;d<=pdim;d++){const dt=new Date(pyr,pmo,d,12);if(isActive(h.freq,dt)){pp++;if(l[h.id]&&l[h.id][dk(dt)])pd++;}}
    const p=hp?Math.round(hd/hp*100):0;const pp2=pp?Math.round(pd/pp*100):0;
    const diff=p-pp2;const color=h.color||'var(--gold)';
    const trendCls=diff>0?'up':diff<0?'dn':'eq';
    const trendLbl=diff>0?`+${diff}%`:diff<0?`${diff}%`:'=';
    return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:0.5px solid rgba(255,255,255,.04)">
      <div style="font-size:18px;flex-shrink:0">${h.icon}</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px;gap:6px">
          <span style="font-size:13px;font-weight:600;color:var(--t1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(h.name)}</span>
          <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
            <span class="hab-trend ${trendCls}">${trendLbl}</span>
            <span style="font-family:'DM Mono',monospace;font-size:11px;color:${color}">${hd}/${hp}</span>
          </div>
        </div>
        <div style="height:4px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden">
          <div style="height:100%;width:${p}%;background:${color};border-radius:2px;transition:width .8s ease;box-shadow:0 0 6px ${color}44"></div>
        </div>
      </div>
      <div style="font-size:13px;font-weight:700;color:${color};flex-shrink:0;min-width:34px;text-align:right">${p}%</div>
    </div>`;
  }).join('');

  el.innerHTML=`
    <!-- Month nav -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <button class="hab-mnav-btn" onclick="habMonthNav(-1)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg></button>
      <div style="text-align:center">
        <div style="font-size:16px;font-weight:800;color:var(--t1);letter-spacing:-.02em">${MLBL[mo]} ${yr}</div>
        <div style="font-size:11px;color:var(--t3);margin-top:2px">${activeDays} активных дней · ${rate}% успех</div>
      </div>
      <button class="hab-mnav-btn" onclick="habMonthNav(1)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></button>
    </div>

    <!-- KPI strip -->
    <div class="hab-kpi-strip" style="margin-bottom:20px">
      <div class="hab-kpi"><div class="hab-kpi-v">${totalDone}</div><div class="hab-kpi-l">Выполнено</div></div>
      <div class="hab-kpi"><div class="hab-kpi-v" style="color:var(--green)">${rate}%</div><div class="hab-kpi-l">Успех</div></div>
      <div class="hab-kpi"><div class="hab-kpi-v" style="color:var(--orange)">${activeDays}</div><div class="hab-kpi-l">Активных дней</div></div>
      <div class="hab-kpi"><div class="hab-kpi-v" style="color:var(--gold)">${bestDay}</div><div class="hab-kpi-l">Лучший день</div></div>
    </div>

    <!-- Calendar + Week bars side by side -->
    <div style="display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap;margin-bottom:22px">

      <!-- Compact dot calendar -->
      <div style="flex-shrink:0">
        <div style="font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t3);margin-bottom:10px;display:flex;align-items:center;gap:6px">
          <span style="display:inline-block;width:3px;height:11px;border-radius:2px;background:var(--gold);opacity:.6"></span>
          Календарь
        </div>
        <!-- Day labels -->
        <div style="display:flex;gap:4px;margin-bottom:4px">${dayLblRow}</div>
        <!-- Cells -->
        <div style="display:flex;flex-wrap:wrap;gap:4px;width:${7*30+6*4}px">
          ${calCells}
        </div>
        <!-- Legend -->
        <div style="display:flex;align-items:center;gap:5px;margin-top:10px">
          <span style="font-size:9px;color:var(--t3);margin-right:2px">меньше</span>
          ${legend.map(x=>`<div style="width:12px;height:12px;border-radius:3px;background:${x.bg};flex-shrink:0" title="${x.label}"></div>`).join('')}
          <span style="font-size:9px;color:var(--t3);margin-left:2px">больше</span>
        </div>
      </div>

      <!-- Week summary bars -->
      <div style="flex:1;min-width:200px">
        <div style="font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t3);margin-bottom:10px;display:flex;align-items:center;gap:6px">
          <span style="display:inline-block;width:3px;height:11px;border-radius:2px;background:var(--gold);opacity:.6"></span>
          По неделям
        </div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;font-size:9px;color:var(--t3)">
          <div style="width:42px;flex-shrink:0">Начало</div>
          <div style="flex:1">Прогресс</div>
          <div style="width:36px;text-align:right">%</div>
          <div style="width:28px;text-align:right">✓/∑</div>
        </div>
        ${weekBars}
      </div>

    </div>

    <!-- Per-habit breakdown -->
    <div style="font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t3);margin-bottom:10px;display:flex;align-items:center;gap:6px">
      <span style="display:inline-block;width:3px;height:11px;border-radius:2px;background:var(--gold);opacity:.6"></span>
      По привычкам
      <span style="font-size:9px;color:var(--t3);font-weight:400;letter-spacing:0;text-transform:none;margin-left:2px">↑↓ vs прошлый месяц</span>
    </div>
    ${breakdown}
  `;
}

// ══ HOOK showTab ═════════════════════════════════════════════
// Export render so collab engine can call it
window._habPersonalRender = render;

const _st=window.showTab;
window.showTab=function(t,btn){
  if(_st)_st.call(this,t,btn);
  if(t==='habits'){
    // Only auto-render personal if not in collab mode
    setTimeout(function(){
      var mode = localStorage.getItem('dtr_chab_mode') || 'personal';
      if(mode !== 'collab') {
        render();
        // Re-attach mode bar if collab engine added it before render wiped it
        var root = document.getElementById('hab-root');
        var bar  = document.getElementById('habModeBar');
        if(root && bar && bar.parentNode !== root) root.insertBefore(bar, root.firstChild);
      }
    }, 60);
  }
};

})();



(function(){
'use strict';

const LRN_KEY  = 'dtr_learn_v1';
const AUTH_KEY = 'dtr_authors_v1';
let _lrn  = { categories: [] };
let _auth = { authors: [] };
let _lrnDBReady = false;
let _lrnDBTimer = null;
let _authDBTimer = null;
const LRN_COLORS = ['#58a6ff','#FBBF24','#A855F7','#22C55E','#F97316','#06B6D4','#EF4444','#EC4899','#8B5CF6','#14B8A6'];

// ── Storage ───────────────────────────────────────────────────
function _lrnUID(){ return Math.random().toString(36).slice(2,10); }
function _lrnLoad(){ try{ _lrn=JSON.parse(localStorage.getItem(LRN_KEY)||'{"categories":[]}'); }catch(e){ _lrn={categories:[]}; } if(!_lrn.categories)_lrn.categories=[]; }
function _authLoad(){ try{ _auth=JSON.parse(localStorage.getItem(AUTH_KEY)||'{"authors":[]}'); }catch(e){ _auth={authors:[]}; } if(!_auth.authors)_auth.authors=[]; }
function _lrnSave(){ localStorage.setItem(LRN_KEY,JSON.stringify(_lrn)); _lrnSaveToDB(); }
function _authSave(){
  // Strip runtime-only fields before persisting
  // FIX: also persist avatarFailed so we don't retry on every page load
  const clean = { authors: _auth.authors.map(a => ({
    id: a.id, name: a.name, url: a.url, color: a.color,
    avatarUrl: a.avatarUrl || null,
    avatarFailed: a.avatarFailed || false   // remember failed fetches — stop retrying
  }))};
  localStorage.setItem(AUTH_KEY, JSON.stringify(clean));
  _authSaveToDB();
}

function _lrnSaveToDB(){
  if(!SB_USER||SB_USER.isDemoUser) return;
  clearTimeout(_lrnDBTimer);
  _lrnDBTimer=setTimeout(async()=>{
    try{ await sb.from('user_learn_links').upsert({user_id:SB_USER.id,data:{..._lrn,authors:_auth.authors},updated_at:new Date().toISOString()},{onConflict:'user_id'}); }
    catch(e){ console.warn('Learn save:',e); }
  },1500);
}
function _authSaveToDB(){ _lrnSaveToDB(); }

async function _lrnLoadFromDB(){
  if(!SB_USER||SB_USER.isDemoUser){ _lrnDBReady=true; return; }
  try{
    const {data,error}=await sb.from('user_learn_links').select('data').eq('user_id',SB_USER.id).maybeSingle();
    if(!error&&data?.data){
      const r=data.data;
      if(r.categories) r.categories.forEach(rc=>{ const lc=_lrn.categories.find(c=>c.id===rc.id); if(!lc){ _lrn.categories.push(rc); }else{ (rc.links||[]).forEach(rl=>{ if(!lc.links.find(l=>l.id===rl.id)) lc.links.push(rl); }); } });
      if(r.authors) (r.authors||[]).forEach(ra=>{ if(!_auth.authors.find(a=>a.id===ra.id)) _auth.authors.push(ra); });
      localStorage.setItem(LRN_KEY,JSON.stringify(_lrn));
      localStorage.setItem(AUTH_KEY,JSON.stringify(_auth));
    }
  }catch(e){ console.warn('Learn load:',e); }
  finally{ _lrnDBReady=true; }
}

// ── YouTube helpers ───────────────────────────────────────────
function _lrnIsYT(url){ return /youtube\.com|youtu\.be/.test(url||''); }
function _lrnYTThumb(url){ const vm=(url||'').match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/); return vm?`https://img.youtube.com/vi/${vm[1]}/mqdefault.jpg`:null; }
function _lrnDomain(url){ try{ return new URL(url).hostname.replace('www.',''); }catch{ return url; } }
function _lrnFavicon(url){ try{ return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32`; }catch{ return ''; } }
function _lrnInitial(name){ return (name||'?')[0].toUpperCase(); }

// ── CSS for card (injected once) ──────────────────────────────
function _lrnInjectCSS(){
  if(document.getElementById('lrn-css')) return;
  const s=document.createElement('style');
  s.id='lrn-css';
  s.textContent=`

/* ══ LEARN TAB — Apple Design ══════════════════════════════ */

/* Layout */
#lrn-wrap{
  display:flex;
  gap:0;
  min-height:calc(100vh - 160px);
}

/* ── Sidebar ─────────────────────────────────────────────── */
#lrn-sidebar{
  width:232px;
  min-width:232px;
  flex-shrink:0;
  padding:0 0 32px;
  border-right:0.5px solid var(--border);
  display:flex;
  flex-direction:column;
  overflow-y:auto;
  scrollbar-width:none;
}
#lrn-sidebar::-webkit-scrollbar{display:none;}

/* Summary card at top */
.lrn-sb-summary{
  padding:16px 16px 14px;
  margin:14px 12px 4px;
  background:rgba(239,192,48,.06);
  border:0.5px solid rgba(239,192,48,.18);
  border-radius:14px;
  display:flex;
  flex-direction:column;
  gap:10px;
}
.lrn-sb-summary-row{
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.lrn-sb-summary-title{
  font-size:10px;
  font-weight:700;
  letter-spacing:.09em;
  text-transform:uppercase;
  color:var(--t3);
}
.lrn-sb-summary-stats{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px;
}
.lrn-sb-stat{
  background:rgba(255,255,255,.04);
  border:0.5px solid rgba(255,255,255,.06);
  border-radius:9px;
  padding:9px 10px;
}
.lrn-sb-stat-val{
  font-family:'DM Mono',monospace;
  font-size:18px;
  font-weight:400;
  color:var(--t1);
  letter-spacing:-.02em;
  line-height:1;
  margin-bottom:3px;
}
.lrn-sb-stat-lbl{
  font-size:9px;
  font-weight:700;
  letter-spacing:.07em;
  text-transform:uppercase;
  color:var(--t3);
}

/* Section title */
.lrn-sb-section{
  padding:16px 12px 6px;
}
.lrn-sb-ttl{
  font-size:9.5px;
  font-weight:700;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:var(--t3);
  padding:0 4px;
  margin-bottom:8px;
}
.lrn-sb-divider{
  height:0.5px;
  background:var(--border);
  margin:6px 12px 0;
}

/* Author rows */
.lrn-auth-row{
  display:flex;
  align-items:center;
  gap:10px;
  padding:7px 8px;
  border-radius:10px;
  cursor:pointer;
  text-decoration:none;
  transition:all .2s cubic-bezier(.34,1.15,.64,1);
  border:0.5px solid transparent;
  position:relative;
}
.lrn-auth-row:hover{ background:rgba(255,255,255,.06); transform:translateX(4px); border-color:rgba(255,255,255,.07); }
.lrn-auth-av{
  width:32px;
  height:32px;
  border-radius:9px;
  flex-shrink:0;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:13px;
  font-weight:700;
  color:#fff;
  box-shadow:0 2px 8px rgba(0,0,0,.3);
  position:relative;
  overflow:hidden;
}
/* Spinner shown while avatar loading */
.lrn-auth-av-spinner{
  width:14px;
  height:14px;
  border:2px solid rgba(255,255,255,.15);
  border-top-color:rgba(255,255,255,.7);
  border-radius:50%;
  animation:spin .7s linear infinite;
  flex-shrink:0;
}
.lrn-auth-info{ flex:1; min-width:0; }
.lrn-auth-name{
  font-size:13px;
  font-weight:600;
  color:var(--t1);
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  letter-spacing:-.01em;
  line-height:1.2;
}
.lrn-auth-sub{
  font-size:10px;
  color:var(--t3);
  letter-spacing:-.005em;
  margin-top:1px;
}
.lrn-auth-del{
  width:20px;
  height:20px;
  border-radius:6px;
  border:none;
  background:transparent;
  color:var(--t3);
  cursor:pointer;
  display:none;
  align-items:center;
  justify-content:center;
  transition:all .12s;
  flex-shrink:0;
}
.lrn-auth-row:hover .lrn-auth-del{ display:flex; }
.lrn-auth-del:hover{ color:var(--red); background:rgba(255,69,58,.1); }

/* Add button */
.lrn-sb-addbtn{
  display:flex;
  align-items:center;
  gap:7px;
  padding:6px 8px;
  border-radius:9px;
  border:none;
  background:transparent;
  color:var(--t3);
  font-size:11.5px;
  font-weight:500;
  cursor:pointer;
  font-family:'DM Sans',sans-serif;
  width:100%;
  text-align:left;
  transition:all .13s;
  margin-top:2px;
  letter-spacing:-.005em;
}
.lrn-sb-addbtn:hover{ background:rgba(255,255,255,.05); color:var(--t2); }

/* Category list items */
.lrn-sb-cat{
  display:flex;
  align-items:center;
  gap:10px;
  padding:8px 10px;
  border-radius:10px;
  cursor:pointer;
  transition:background .13s;
  position:relative;
}
.lrn-sb-cat:hover{ background:rgba(255,255,255,.05); }
/* Active indicator on left edge */
.lrn-sb-cat::before{
  content:'';
  position:absolute;
  left:0; top:6px; bottom:6px;
  width:2.5px;
  border-radius:2px;
  background:var(--cat-c, transparent);
  opacity:0;
  transition:opacity .15s;
}
.lrn-sb-cat:hover::before{ opacity:.7; }
.lrn-sb-cat-icon{
  width:28px;
  height:28px;
  border-radius:8px;
  flex-shrink:0;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:13px;
  transition:transform .18s;
}
.lrn-sb-cat:hover .lrn-sb-cat-icon{ transform:scale(1.05); }
.lrn-sb-cat-dot{
  width:7px;
  height:7px;
  border-radius:50%;
  flex-shrink:0;
}
.lrn-sb-cat-name{
  font-size:12.5px;
  font-weight:600;
  color:var(--t2);
  flex:1;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  letter-spacing:-.01em;
  transition:color .13s;
}
.lrn-sb-cat:hover .lrn-sb-cat-name{ color:var(--t1); }
.lrn-sb-cat-cnt{
  font-size:10px;
  color:var(--t3);
  font-family:'DM Mono',monospace;
  background:rgba(255,255,255,.06);
  border:0.5px solid rgba(255,255,255,.07);
  border-radius:6px;
  padding:1px 7px;
  min-width:22px;
  text-align:center;
  transition:all .13s;
}
.lrn-sb-cat:hover .lrn-sb-cat-cnt{
  background:rgba(255,255,255,.1);
  color:var(--t2);
}

/* ── Main area ───────────────────────────────────────────── */
#lrn-main{
  flex:1;
  padding:24px 40px 32px 28px;
  min-width:0;
  overflow-x:hidden;
  overflow-y:visible;
}

/* Header */
.lrn-main-hdr{
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:24px;
  padding-top:20px;
  flex-wrap:wrap;
  gap:10px;
}
.lrn-page-ttl{
  font-size:22px;
  font-weight:800;
  color:var(--t1);
  letter-spacing:-.04em;
}

/* New category button */
.lrn-new-cat-btn{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:7px 14px;
  border-radius:9px;
  border:0.5px solid rgba(239,192,48,.35);
  background:rgba(239,192,48,.08);
  color:var(--gold);
  font-size:12.5px;
  font-weight:700;
  cursor:pointer;
  transition:background-color .15s,border-color .15s,color .15s,opacity .15s;
  font-family:'DM Sans',sans-serif;
  letter-spacing:-.01em;
}
.lrn-new-cat-btn:hover{
  background:rgba(239,192,48,.14);
  border-color:rgba(239,192,48,.5);
  transform:translateY(-1px);
}
.lrn-new-cat-btn:active{ transform:scale(.97); }

/* ── Section (category card — Arena style) ───────────────── */
.lrn-sec{
  margin-bottom:16px;
  border-radius:16px;
  border:0.5px solid var(--border);
  background:var(--card);
  transition:box-shadow .2s;
}
.lrn-sec:hover{
  box-shadow:0 4px 24px rgba(0,0,0,.35);
}

/* Colored left accent bar */
.lrn-sec::before{
  content:'';
  position:absolute;
  left:0; top:0; bottom:0;
  width:3px;
  background:var(--sec-c, var(--gold));
  border-radius:0;
}
/* Make sec position:relative for ::before */
.lrn-sec{ position:relative; }

/* Category header inside card */
.lrn-sec-hdr{
  display:flex;
  align-items:center;
  gap:12px;
  padding:14px 18px;
  border-bottom:0.5px solid rgba(255,255,255,.05);
  background:rgba(255,255,255,.015);
  position:relative;
}

/* Category icon box */
.lrn-sec-icon{
  width:36px;
  height:36px;
  border-radius:10px;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-shrink:0;
}

.lrn-sec-info{ flex:1; min-width:0; }
.lrn-sec-name{
  font-size:13.5px;
  font-weight:700;
  color:var(--t1);
  letter-spacing:-.02em;
  line-height:1.2;
}
.lrn-sec-sub{
  font-size:10px;
  color:var(--t3);
  letter-spacing:.01em;
  margin-top:2px;
}

.lrn-sec-cnt{
  font-size:10px;
  color:var(--t3);
  font-family:'DM Mono',monospace;
  background:rgba(255,255,255,.06);
  border:0.5px solid rgba(255,255,255,.08);
  border-radius:6px;
  padding:2px 8px;
}

.lrn-sec-acts{
  display:flex;
  gap:3px;
  opacity:0;
  transition:opacity .15s;
}
.lrn-sec:hover .lrn-sec-acts{ opacity:1; }
.lrn-sec-btn{
  width:28px;
  height:28px;
  border-radius:8px;
  border:0.5px solid rgba(255,255,255,.08);
  background:transparent;
  color:var(--t3);
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  transition:all .12s;
}
.lrn-sec-btn:hover{ background:rgba(255,255,255,.08); color:var(--t2); }
.lrn-sec-btn.del:hover{
  background:rgba(255,69,58,.1);
  color:var(--red);
  border-color:rgba(255,69,58,.2);
}

/* Card grid — horizontal scroll, 4 visible at once */
.lrn-row-wrap{
  padding:16px 18px 20px;
}
.lrn-row{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  grid-auto-rows:auto;
  gap:14px;
}
/* Cards fill their grid cell, same size as each other */
.lrn-row .lrn-card,
.lrn-row .lrn-add-card{
  width:100%;
  min-width:0;
}
@media(max-width:1100px){
  .lrn-row{ grid-template-columns:repeat(3,1fr); }
}
@media(max-width:700px){
  .lrn-row{ grid-template-columns:repeat(2,1fr); gap:10px; }
  .lrn-row-wrap{ padding:12px; }
}
@media(max-width:480px){
  .lrn-row{ grid-template-columns:1fr; }
  .lrn-card-acts{ opacity:1 !important; transform:none !important; }
}

/* ── Card ────────────────────────────────────────────────── */
.lrn-card{
  cursor:pointer;
  border-radius:14px;
  background:var(--card);
  border:0.5px solid rgba(255,255,255,.06);
  overflow:hidden;
  transition:transform .25s cubic-bezier(.34,1.15,.64,1),
             box-shadow .25s,
             border-color .25s;
  position:relative;
}
.lrn-card::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,255,255,.025),transparent 60%);
  pointer-events:none;opacity:0;
  transition:opacity .25s;
}
.lrn-card:hover{
  transform:translateY(-6px) scale(1.01);
  box-shadow:0 16px 40px rgba(0,0,0,.5);
  border-color:rgba(255,255,255,.12);
}
.lrn-card:hover::before{ opacity:1; }

/* Thumbnail */
.lrn-thumb{
  aspect-ratio:16/9;
  border-radius:0;
  overflow:hidden;
  background:rgba(255,255,255,.05);
  position:relative;
}
.lrn-thumb img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
  transition:transform .4s cubic-bezier(.34,1.15,.64,1), filter .4s ease;
}
.lrn-card:hover .lrn-thumb img{ transform:scale(1.08); filter:brightness(1.05); }
.lrn-thumb-ico{
  position:absolute;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:28px;
  opacity:.3;
}

/* YouTube play overlay on hover */
.lrn-thumb-play{
  position:absolute;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  background:rgba(0,0,0,.3);
  opacity:0;
  transition:opacity .2s;
}
.lrn-card:hover .lrn-thumb-play{ opacity:1; }
.lrn-thumb-play-btn{
  width:40px;
  height:40px;
  border-radius:50%;
  background:rgba(255,255,255,.92);
  display:flex;
  align-items:center;
  justify-content:center;
  transform:scale(.85);
  transition:transform .2s var(--ease-bounce,cubic-bezier(.34,1.15,.64,1));
}
.lrn-card:hover .lrn-thumb-play-btn{ transform:scale(1); }

/* Source badge */
.lrn-yt-badge{
  position:absolute;
  top:7px;
  left:7px;
  background:rgba(0,0,0,.75);
  backdrop-filter:blur(8px);
  color:rgba(255,255,255,.85);
  font-size:8px;
  font-weight:700;
  padding:2px 6px;
  border-radius:4px;
  letter-spacing:.04em;
  text-transform:uppercase;
}

/* Card body */
.lrn-card-body{
  padding:10px 12px 11px;
}
.lrn-card-ttl{
  font-size:12.5px;
  font-weight:700;
  color:var(--t1);
  line-height:1.4;
  display:-webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
  margin-bottom:5px;
  letter-spacing:-.01em;
}
.lrn-card-meta{
  display:flex;
  align-items:center;
  gap:5px;
  font-size:10px;
  color:var(--t3);
  margin-bottom:8px;
}
.lrn-card-meta img{
  width:12px;
  height:12px;
  border-radius:2px;
  flex-shrink:0;
}

/* Action buttons row — hidden, shown on card hover */
.lrn-card-acts{
  display:flex;
  gap:5px;
  opacity:0;
  transform:translateY(4px);
  transition:opacity .18s,transform .18s;
}
.lrn-card:hover .lrn-card-acts{
  opacity:1;
  transform:translateY(0);
}
.lrn-card-act{
  flex:1;
  padding:5px 0;
  border-radius:7px;
  border:0.5px solid rgba(255,255,255,.09);
  background:rgba(255,255,255,.05);
  color:var(--t2);
  font-size:10px;
  font-weight:600;
  cursor:pointer;
  font-family:'DM Sans',sans-serif;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:4px;
  transition:all .12s;
  letter-spacing:.01em;
}
.lrn-card-act:hover{ background:rgba(255,255,255,.1); color:var(--t1); }
.lrn-card-act.del:hover{
  background:rgba(255,69,58,.1);
  color:var(--red);
  border-color:rgba(255,69,58,.2);
}

/* ── Add card ─────────────────────────────────────────────── */
.lrn-add-card{
  border:0.5px solid rgba(255,255,255,.07);
  border-radius:12px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:8px;
  cursor:pointer;
  color:var(--t3);
  font-size:12px;
  font-weight:500;
  transition:background-color .18s,border-color .18s,color .18s,box-shadow .18s,opacity .18s;
  background:rgba(255,255,255,.02);
  font-family:'DM Sans',sans-serif;
  aspect-ratio:unset;
  min-height:140px;
  letter-spacing:-.005em;
}
.lrn-add-card:hover{
  border-color:rgba(239,192,48,.3);
  color:var(--gold);
  background:rgba(239,192,48,.05);
  transform:translateY(-2px);
}
.lrn-add-card-icon{
  width:36px;
  height:36px;
  border-radius:10px;
  background:rgba(255,255,255,.05);
  display:flex;
  align-items:center;
  justify-content:center;
  transition:background .18s;
}
.lrn-add-card:hover .lrn-add-card-icon{
  background:rgba(239,192,48,.1);
}

/* ── Empty state ─────────────────────────────────────────── */
.lrn-empty{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  padding:80px 32px;
  text-align:center;
}
.lrn-empty-icon{
  width:64px;
  height:64px;
  border-radius:18px;
  background:rgba(255,255,255,.04);
  border:0.5px solid rgba(255,255,255,.07);
  display:flex;
  align-items:center;
  justify-content:center;
  margin-bottom:18px;
  color:var(--t3);
}
.lrn-empty-ttl{
  font-size:16px;
  font-weight:700;
  color:var(--t1);
  letter-spacing:-.02em;
  margin-bottom:7px;
}
.lrn-empty-sub{
  font-size:13px;
  color:var(--t2);
  line-height:1.6;
  margin-bottom:20px;
  max-width:280px;
  letter-spacing:-.005em;
}

/* ── Modal ───────────────────────────────────────────────── */
.lrn-ov{
  position:fixed;
  inset:0;
  z-index:9800;
  background:rgba(0,0,0,.72);
  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px;
  animation:fadeIn .18s ease;
}
.lrn-modal{
  background:rgba(18,18,24,.98);
  border:0.5px solid rgba(255,255,255,.1);
  border-radius:20px;
  padding:24px;
  width:100%;
  max-width:380px;
  box-shadow:0 32px 80px rgba(0,0,0,.7),
             inset 0 0.5px 0 rgba(255,255,255,.08);
  animation:appleSpringIn .26s cubic-bezier(.34,1.15,.64,1) both;
}
.lrn-modal-ttl{
  font-size:16px;
  font-weight:800;
  color:var(--t1);
  margin-bottom:18px;
  letter-spacing:-.03em;
}
.lrn-field{
  width:100%;
  padding:11px 13px;
  border-radius:10px;
  border:0.5px solid rgba(255,255,255,.1);
  background:rgba(255,255,255,.05);
  color:var(--t1);
  font-size:14px;
  font-family:'DM Sans',sans-serif;
  outline:none;
  box-sizing:border-box;
  margin-bottom:10px;
  transition:border-color .15s,box-shadow .15s;
  letter-spacing:-.01em;
}
.lrn-field:focus{
  border-color:rgba(239,192,48,.55);
  box-shadow:0 0 0 3px rgba(239,192,48,.08);
  background:rgba(239,192,48,.025);
}
.lrn-field::placeholder{ color:var(--t3); }
.lrn-modal-acts{
  display:flex;
  gap:8px;
  margin-top:4px;
}
.lrn-ok{
  flex:1;
  padding:11px;
  border-radius:10px;
  border:none;
  background:var(--gold);
  color:#07070B;
  font-size:14px;
  font-weight:700;
  cursor:pointer;
  font-family:'DM Sans',sans-serif;
  letter-spacing:-.01em;
  transition:all .14s;
}
.lrn-ok:hover{ opacity:.88; transform:translateY(-1px); }
.lrn-ok:active{ transform:scale(.97); }
.lrn-cancel{
  padding:11px 16px;
  border-radius:10px;
  border:0.5px solid rgba(255,255,255,.1);
  background:transparent;
  color:var(--t2);
  font-size:13px;
  font-weight:600;
  cursor:pointer;
  font-family:'DM Sans',sans-serif;
  transition:all .14s;
}
.lrn-cancel:hover{ background:rgba(255,255,255,.06); color:var(--t1); }

/* Mobile */
@media(max-width:900px){
  /* horizontal scroll preserved on all sizes */
}
@media(max-width:600px){
  #lrn-sidebar{ display:none; }
  #lrn-main{ padding:16px 0 24px; }
  .lrn-card-acts{ opacity:1 !important; transform:none !important; }
}
  `;
  document.head.appendChild(s);
}

// ── Render sidebar only ───────────────────────────────────────
function _lrnRenderSidebar(){
  const sb_el=document.getElementById('lrn-sidebar');
  if(!sb_el) return;

  const totalLinks = _lrn.categories.reduce((a,c)=>a+(c.links||[]).length, 0);
  const totalCats  = _lrn.categories.length;
  const totalAuth  = _auth.authors.length;

  const svgPlus = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
  const svgClose = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
  const svgLink  = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;

  sb_el.innerHTML=`

    <!-- ── Summary card ── -->
    <div class="lrn-sb-summary" style="margin-top:20px">
      <div class="lrn-sb-summary-row">
        <span class="lrn-sb-summary-title">Библиотека</span>
        <span style="color:var(--gold);opacity:.6">${svgLink}</span>
      </div>
      <div class="lrn-sb-summary-stats">
        <div class="lrn-sb-stat">
          <div class="lrn-sb-stat-val">${totalLinks}</div>
          <div class="lrn-sb-stat-lbl">Материалов</div>
        </div>
        <div class="lrn-sb-stat">
          <div class="lrn-sb-stat-val">${totalCats}</div>
          <div class="lrn-sb-stat-lbl">Категорий</div>
        </div>
      </div>
    </div>

    <!-- ── Authors ── -->
    <div class="lrn-sb-section">
      <div class="lrn-sb-ttl">Авторы</div>
      ${totalAuth === 0
        ? `<div style="font-size:11.5px;color:var(--t3);line-height:1.65;padding:0 4px 8px;letter-spacing:-.005em">Добавляй авторов — клик откроет их канал</div>`
        : _auth.authors.map(a => {
            // Avatar: photo if loaded, spinner if loading, letter if no avatar
            let avInner;
            if(a.avatarLoading){
              avInner = `<div class="lrn-auth-av-spinner"></div>`;
            } else if(a.avatarUrl){
              avInner = `<img src="${a.avatarUrl}" alt="${a.name}" style="width:100%;height:100%;object-fit:cover;border-radius:9px" onerror="this.parentNode.innerHTML='${_lrnInitial(a.name)}';this.parentNode.style.background='${a.color}'">`;
            } else {
              avInner = _lrnInitial(a.name);
            }
            return `
            <a class="lrn-auth-row" href="${a.url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">
              <div class="lrn-auth-av" style="background:${a.avatarUrl?'transparent':a.color};overflow:hidden">
                ${avInner}
              </div>
              <div class="lrn-auth-info">
                <div class="lrn-auth-name">${a.name}</div>
                <div class="lrn-auth-sub">${a.avatarLoading ? 'Загружаем аватар...' : 'Автор · ' + (_auth.authors.indexOf(a)+1)}</div>
                ${a.avatarFailed && !a.avatarLoading ? `<div style="font-size:9.5px;color:var(--t3);margin-top:1px">аватар недоступен</div>` : ''}
              </div>
              <button class="lrn-auth-del" onclick="event.preventDefault();event.stopPropagation();lrnDelAuthor('${a.id}')">${svgClose}</button>
            </a>`;
          }).join('')}
      <button class="lrn-sb-addbtn" onclick="lrnAddAuthor()">
        ${svgPlus}
        Добавить автора
      </button>
    </div>

    <div class="lrn-sb-divider"></div>

    <!-- ── Categories ── -->
    <div class="lrn-sb-section">
      <div class="lrn-sb-ttl">Категории</div>
      ${totalCats === 0
        ? `<div style="font-size:11.5px;color:var(--t3);padding:0 4px 4px;letter-spacing:-.005em">Категории появятся здесь</div>`
        : _lrn.categories.map(c=>{
            const count = (c.links||[]).length;
            return `
              <div class="lrn-sb-cat" style="--cat-c:${c.color}"
                onclick="document.getElementById('lrn-s-${c.id}')?.scrollIntoView({behavior:'smooth',block:'start'})">
                <div class="lrn-sb-cat-icon"
                  style="background:${c.color}18;border:0.5px solid ${c.color}30">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${c.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </div>
                <span class="lrn-sb-cat-name">${c.name}</span>
                <span class="lrn-sb-cat-cnt">${count}</span>
              </div>`;
          }).join('')}
      <button class="lrn-sb-addbtn" onclick="lrnAddCat()">
        ${svgPlus}
        Новая категория
      </button>
    </div>

  `;
}

// ── Render main content only ──────────────────────────────────
function _lrnRenderMain(){
  const main=document.getElementById('lrn-main');
  if(!main) return;

  const svgPlus=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
  const svgPlay=`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#07070B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3" fill="#07070B"/></svg>`;
  const svgLink=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
  const svgEdit=`<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
  const svgTrash=`<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>`;
  const svgRename=`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
  const svgDelete=`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>`;
  const svgGrad=`<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`;

  main.innerHTML=`
    <div class="lrn-main-hdr">
      <div class="lrn-page-ttl">Обучающие материалы</div>
      <button class="lrn-new-cat-btn" onclick="lrnAddCat()">
        ${svgPlus}
        Новая категория
      </button>
    </div>

    ${_lrn.categories.length===0 ? `
      <div class="lrn-empty">
        <div class="lrn-empty-icon">${svgGrad}</div>
        <div class="lrn-empty-ttl">Создай первую категорию</div>
        <div class="lrn-empty-sub">Например: <b style="color:var(--t1)">Английский</b>, <b style="color:var(--t1)">Программирование</b>, <b style="color:var(--t1)">Таргет</b></div>
        <button class="lrn-new-cat-btn" onclick="lrnAddCat()">${svgPlus} Создать категорию</button>
      </div>
    ` : _lrn.categories.map(cat=>{
      const count = (cat.links||[]).length;
      const catIconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${cat.color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
      return `
      <div class="lrn-sec" id="lrn-s-${cat.id}" style="--sec-c:${cat.color}">

        <div class="lrn-sec-hdr">
          <div class="lrn-sec-icon" style="background:${cat.color}18;border:0.5px solid ${cat.color}35">
            ${catIconSvg}
          </div>
          <div class="lrn-sec-info">
            <div class="lrn-sec-name">${cat.name}</div>
            <div class="lrn-sec-sub">${count} ${count===1?'материал':count<=4?'материала':'материалов'}</div>
          </div>
          <div class="lrn-sec-cnt">${count}</div>
          <div class="lrn-sec-acts">
            <button class="lrn-sec-btn" title="Переименовать" onclick="lrnRenameCat('${cat.id}')">${svgRename}</button>
            <button class="lrn-sec-btn del" title="Удалить" onclick="lrnDeleteCat('${cat.id}')">${svgDelete}</button>
          </div>
        </div>

        <div class="lrn-row-wrap">
          <div class="lrn-row">

            ${(cat.links||[]).map(link=>{
              const isYT = _lrnIsYT(link.url);
              const thumb = isYT ? _lrnYTThumb(link.url) : null;
              const domain = _lrnDomain(link.url);
              const favicon = _lrnFavicon(link.url);

              return `
                <div class="lrn-card" onclick="lrnOpenLink('${link.id}','${cat.id}')">
                  <div class="lrn-thumb">
                    ${thumb ? `<img src="${thumb}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ``}
                    <div class="lrn-thumb-ico" style="${thumb?'display:none':'display:flex'}">${isYT ? svgPlay : svgLink}</div>
                    ${isYT ? `<div class="lrn-thumb-play"><div class="lrn-thumb-play-btn">${svgPlay}</div></div>` : ``}
                    <div class="lrn-yt-badge">${domain}</div>
                  </div>
                  <div class="lrn-card-body">
                    <div class="lrn-card-ttl">${link.name}</div>
                    <div class="lrn-card-meta">
                      <img src="${favicon}" alt="" onerror="this.style.display='none'" loading="lazy">
                      <span>${domain}</span>
                    </div>
                    <div class="lrn-card-acts">
                      <button class="lrn-card-act" onclick="event.stopPropagation();lrnEditLink('${cat.id}','${link.id}')">${svgEdit} Изменить</button>
                      <button class="lrn-card-act del" onclick="event.stopPropagation();lrnDeleteLink('${cat.id}','${link.id}')">${svgTrash}</button>
                    </div>
                  </div>
                </div>`;
            }).join('')}

            <!-- Add button inside grid — same size cell as a video card -->
            <button class="lrn-add-card" onclick="lrnAddLink('${cat.id}')">
              <div class="lrn-add-card-icon">${svgPlus}</div>
              <span>Добавить</span>
            </button>

          </div>
        </div>
      </div>`;
    }).join('')}
  `;
}

// ── Size cards: handled by CSS grid (repeat(4,1fr)) — no JS needed ──
function _lrnSizeCards(){ /* no-op: CSS grid handles layout */ }


// ── Full page init (runs once) ────────────────────────────────
function renderLearnTab(){
  _lrnLoad(); _authLoad();
  _lrnInjectCSS();
  const root=document.getElementById('learn-root');
  if(!root) return;

  // Build skeleton only once
  if(!document.getElementById('lrn-wrap')){
    root.innerHTML=`<div id="lrn-wrap"><div id="lrn-sidebar"></div><div id="lrn-main"></div></div>`;
  }

  _lrnRenderSidebar();
  _lrnRenderMain();
  setTimeout(_lrnSizeCards, 30);

  if(!_lrnDBReady){
    _lrnLoadFromDB().then(()=>{ _lrnLoad(); _authLoad(); _lrnRenderSidebar(); _lrnRenderMain(); setTimeout(_lrnSizeCards, 30); setTimeout(_lrnRefreshMissingAvatars, 500); });
  } else {
    setTimeout(_lrnRefreshMissingAvatars, 300);
  }
}

// ── Actions ───────────────────────────────────────────────────
window.lrnAddAuthor=function(){
  _lrnModal(
    'Добавить автора',
    [
      {id:'an', placeholder:'Имя автора', type:'text'},
      {id:'au', placeholder:'https://youtube.com/@channel', type:'url'}
    ],
    async (v) => {
      const name = v.an.trim(), url = v.au.trim();
      if(!name || !url) return;

      const fullUrl = url.startsWith('http') ? url : 'https://' + url;
      const newAuthor = {
        id: _lrnUID(),
        name,
        url: fullUrl,
        color: LRN_COLORS[_auth.authors.length % LRN_COLORS.length],
        avatarUrl: null,
        avatarLoading: true,
      };
      _auth.authors.push(newAuthor);
      _authSave();              // saved WITHOUT avatarLoading
      _lrnRenderSidebar();      // shows spinner

      try {
        const avatarUrl = await _lrnFetchChannelAvatar(fullUrl);
        const found = _auth.authors.find(a => a.id === newAuthor.id);
        if(found){
          found.avatarUrl = avatarUrl || null;
          if(!avatarUrl) found.avatarFailed = true; // all proxies failed
        }
      } catch(e) {
        const found = _auth.authors.find(a => a.id === newAuthor.id);
        if(found) found.avatarFailed = true;
      } finally {
        const found = _auth.authors.find(a => a.id === newAuthor.id);
        if(found) found.avatarLoading = false;
        _authSave();
        _lrnRenderSidebar();
      }
    }
  );
};

// ── Fetch YouTube channel avatar ────────────────────────────────
async function _lrnFetchChannelAvatar(channelUrl){
  if(!channelUrl) return null;

  const fetchWithTimeout = (url, ms=8000) => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), ms);
    return fetch(url, { signal: ctrl.signal }).finally(() => clearTimeout(t));
  };

  // FIX: expanded patterns for current YouTube HTML (2025)
  const parseAvatar = (html) => {
    if(!html || typeof html !== 'string') return null;
    const unescape = s => s.replace(/\\u003d/g,'=').replace(/\\\//g,'/').replace(/\\u0026/g,'&');
    const patterns = [
      /property="og:image"\s+content="(https:[^"]+)"/i,
      /content="(https:[^"]+)"\s+property="og:image"/i,
      /property='og:image'\s+content='(https:[^']+)'/i,
      /"width":\d+,"height":\d+,"url":"(https:\\\/\\\/yt3\.googleusercontent[^"]+)"/i,
      /"channelAvatarUrl":"(https:\\\/\\\/yt3[^"]+)"/i,
      /"(https:\\\/\\\/yt3\.googleusercontent\.com\\\/ytc\\\/[^"]{20,})"/,
      /(https:\/\/yt3\.googleusercontent\.com\/ytc\/[A-Za-z0-9_\-]{20,})/,
    ];
    for(const p of patterns){
      const m = html.match(p);
      const raw = m && (m[1] || m[0]);
      if(raw && raw.startsWith('http')){
        const cleaned = unescape(raw);
        return cleaned.replace(/=s\d+(-[a-z]+-[a-z0-9]+-no)?/i, '=s240-c-k-c0x00ffffff-no-rj');
      }
    }
    return null;
  };

  // Proxy list — try in order, first success wins
  const proxies = [
    () => fetchWithTimeout(`https://corsproxy.io/?${encodeURIComponent(channelUrl)}`)
            .then(r => r.ok ? r.text() : Promise.reject('corsproxy ' + r.status)),
    () => fetchWithTimeout(`https://api.allorigins.win/get?url=${encodeURIComponent(channelUrl)}`)
            .then(r => r.ok ? r.json() : Promise.reject())
            .then(d => d.contents || ''),
    () => fetchWithTimeout(`https://api.allorigins.win/raw?url=${encodeURIComponent(channelUrl)}`)
            .then(r => r.ok ? r.text() : Promise.reject()),
    () => fetchWithTimeout(`https://thingproxy.freeboard.io/fetch/${channelUrl}`)
            .then(r => r.ok ? r.text() : Promise.reject()),
  ];

  for(const getHtml of proxies){
    try {
      const html = await getHtml();
      const img = parseAvatar(html);
      if(img) return img;
    } catch(e){ /* try next proxy */ }
  }
  return null;
}
window.lrnDelAuthor=function(id){ _auth.authors=_auth.authors.filter(a=>a.id!==id); _authSave(); _lrnRenderSidebar(); };

// ── On load: fetch missing avatars for existing authors ──────────
// FIX: skip authors marked avatarFailed (saves them from retrying every load)
// FIX: mark avatarFailed=true when all proxies return null, so we stop retrying
async function _lrnRefreshMissingAvatars(){
  const toFetch = _auth.authors.filter(a => !a.avatarUrl && !a.avatarFailed && a.url);
  if(!toFetch.length) return;

  for(const a of toFetch){ a.avatarLoading = true; }
  _lrnRenderSidebar();

  for(const a of toFetch){
    try {
      const url = await _lrnFetchChannelAvatar(a.url);
      const found = _auth.authors.find(x => x.id === a.id);
      if(found){
        found.avatarUrl = url || null;
        // If all proxies returned null — mark as failed so we stop retrying
        if(!url) found.avatarFailed = true;
      }
    } catch(e){
      const found = _auth.authors.find(x => x.id === a.id);
      if(found) found.avatarFailed = true;
    } finally {
      const found = _auth.authors.find(x => x.id === a.id);
      if(found) found.avatarLoading = false;
    }
  }
  _authSave();
  _lrnRenderSidebar();
}

window.lrnAddCat=function(){
  _lrnModal('Новая категория',[{id:'cn',placeholder:'Английский, Программирование...',type:'text'}],(v)=>{
    const name=v.cn.trim(); if(!name) return;
    _lrn.categories.push({id:_lrnUID(),name,color:LRN_COLORS[_lrn.categories.length%LRN_COLORS.length],links:[]});
    _lrnSave(); _lrnRenderSidebar(); _lrnRenderMain(); setTimeout(_lrnSizeCards,30);
  });
};
window.lrnRenameCat=function(id){
  const cat=_lrn.categories.find(c=>c.id===id); if(!cat) return;
  _lrnModal('Переименовать',[{id:'cn',placeholder:'Название',type:'text',value:cat.name}],(v)=>{ const n=v.cn.trim(); if(!n)return; cat.name=n; _lrnSave(); _lrnRenderSidebar(); _lrnRenderMain(); setTimeout(_lrnSizeCards,30); });
};
window.lrnDeleteCat=function(id){
  const cat=_lrn.categories.find(c=>c.id===id); if(!cat)return;
  if(!confirm(`Удалить «${cat.name}» и ${cat.links.length} ссылок?`))return;
  _lrn.categories=_lrn.categories.filter(c=>c.id!==id); _lrnSave(); _lrnRenderSidebar(); _lrnRenderMain(); setTimeout(_lrnSizeCards,30);
};
window.lrnOpenLink=function(lid,cid){ const l=_lrn.categories.find(c=>c.id===cid)?.links.find(l=>l.id===lid); if(l) window.open(l.url,'_blank','noopener'); };
window.lrnAddLink=function(cid){
  _lrnModal('Добавить ссылку',[{id:'ln',placeholder:'Название',type:'text'},{id:'lu',placeholder:'https://youtube.com/...',type:'url'}],(v)=>{
    const name=v.ln.trim(); let url=v.lu.trim(); if(!name||!url)return;
    if(!/^https?:/i.test(url)) url='https://'+url;
    const cat=_lrn.categories.find(c=>c.id===cid); if(!cat)return;
    cat.links.push({id:_lrnUID(),name,url,createdAt:Date.now()});
    _lrnSave(); _lrnRenderMain(); _lrnRenderSidebar(); setTimeout(_lrnSizeCards, 30);
  });
};
window.lrnEditLink=function(cid,lid){
  const cat=_lrn.categories.find(c=>c.id===cid); const link=cat?.links.find(l=>l.id===lid); if(!link)return;
  _lrnModal('Редактировать',[{id:'ln',placeholder:'Название',type:'text',value:link.name},{id:'lu',placeholder:'https://...',type:'url',value:link.url}],(v)=>{
    const name=v.ln.trim(); let url=v.lu.trim(); if(!name||!url)return;
    if(!/^https?:/i.test(url)) url='https://'+url;
    link.name=name; link.url=url; _lrnSave(); _lrnRenderMain(); setTimeout(_lrnSizeCards,30);
  });
};
window.lrnDeleteLink=function(cid,lid){
  const cat=_lrn.categories.find(c=>c.id===cid); if(!cat)return;
  cat.links=cat.links.filter(l=>l.id!==lid); _lrnSave(); _lrnRenderMain(); _lrnRenderSidebar();
  setTimeout(_lrnSizeCards, 30);
};

// ── Modal ─────────────────────────────────────────────────────
function _lrnModal(title,fields,onOk){
  document.getElementById('lrn-ov')?.remove();
  const ov=document.createElement('div'); ov.id='lrn-ov'; ov.className='lrn-ov';
  ov.onclick=e=>{ if(e.target===ov) ov.remove(); };
  ov.innerHTML=`<div class="lrn-modal"><div class="lrn-modal-ttl">${title}</div>${fields.map(f=>`<input id="lrn-f-${f.id}" class="lrn-field" type="${f.type||'text'}" placeholder="${f.placeholder}" value="${f.value||''}" autocomplete="off">`).join('')}<div class="lrn-modal-acts"><button class="lrn-cancel" onclick="document.getElementById('lrn-ov').remove()">Отмена</button><button class="lrn-ok" id="lrn-ok">Сохранить</button></div></div>`;
  document.body.appendChild(ov);
  setTimeout(()=>document.getElementById(`lrn-f-${fields[0].id}`)?.focus(),80);
  document.getElementById('lrn-ok').onclick=()=>{ const vals={}; fields.forEach(f=>vals[f.id]=document.getElementById(`lrn-f-${f.id}`)?.value||''); onOk(vals); ov.remove(); };
  ov.addEventListener('keydown',e=>{ if(e.key==='Enter') document.getElementById('lrn-ok')?.click(); if(e.key==='Escape') ov.remove(); });
}

// ── showTab hook ──────────────────────────────────────────────
const _origST=window.showTab;
window.showTab=function(name,el,skip){ if(_origST) _origST.call(this,name,el,skip); if(name==='learn') setTimeout(renderLearnTab,60); };

// ── Pre-load ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{ setTimeout(()=>{ if(SB_USER&&!SB_USER.isDemoUser) _lrnLoadFromDB(); },3000); });

})();



// ══════════════════════════════════════════════════════════════
// SOCIAL MODULE — State & Helpers
// ══════════════════════════════════════════════════════════════
(function(){

const SOC = {
  activeSubTab: 'feed',     // 'feed' | 'friends'
  feedPage: 0,
  feedItems: [],
  friends: [],
  pendingIn: [],   // incoming requests
  pendingOut: [],  // outgoing requests
  follows: [],     // who current user follows
  searchTimer: null,
  initialized: false,
};
window._SOC = SOC; // expose for external functions
window.SOC_STATE = SOC; // Expose for openUserProfile


// ─── Utility ──────────────────────────────────────────────────
function socRelTime(iso){
  if(!iso) return '';
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if(diff < 60) return 'только что';
  if(diff < 3600) return Math.floor(diff/60) + ' мин назад';
  if(diff < 86400) return Math.floor(diff/3600) + ' ч назад';
  if(diff < 86400*7) return Math.floor(diff/86400) + ' дн назад';
  return new Date(iso).toLocaleDateString('ru',{day:'2-digit',month:'short'});
}

function socAvHtml(av, avUrl, size=38, radius=10){
  const s = `width:${size}px;height:${size}px;border-radius:${radius}px;background:var(--card);border:0.5px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:${Math.round(size*.52)}px;flex-shrink:0;overflow:hidden`;
  if(avUrl){
    return `<div style="${s}"><img src="${avUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:${radius}px" onerror="this.parentNode.textContent='${(av||'🎯').replace(/'/g,'')}'"></div>`;
  }
  return `<div style="${s}">${av||'🎯'}</div>`;
}

function socIsDemo(){ return !!(SB_USER && SB_USER.isDemoUser); }

// ─── POST EVENT to feed ───────────────────────────────────────
window.socPostEvent = async function(type, data){
  if(socIsDemo() || !SB_USER || !sb) return;
  try {
    await sb.from('social_events').insert({
      user_id: SB_USER.id,
      type,
      data: data || {}
    });
  } catch(e){ console.warn('socPostEvent:', e); }
};

// ─── RENDER MAIN TAB ──────────────────────────────────────────
window.renderSocialTab = function(){
  const root = document.getElementById('social-root');
  if(!root) return;
  root.innerHTML = `
    <div style="background:var(--panel);border:0.5px solid var(--border);border-radius:16px;overflow:hidden;margin-bottom:20px">
      <div class="soc-subtabs">
        <button class="soc-stab ${SOC.activeSubTab==='feed'?'active':''}" onclick="socShowSubTab('feed')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          Лента
        </button>
        <button class="soc-stab ${SOC.activeSubTab==='friends'?'active':''}" onclick="socShowSubTab('friends')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Друзья
          <span id="soc-req-count"></span>
        </button>
      </div>
      <div id="soc-subcontent" style="min-height:200px"></div>
    </div>`;

  // Show skeleton immediately while data loads (avoids flash of "Лента пуста")
  if(!SOC.initialized && !socIsDemo()){
    // First visit: show loading state right away
    const el = document.getElementById('soc-subcontent');
    if(el) el.innerHTML = '<div style="display:flex;flex-direction:column;gap:10px;padding:16px">' +
      '<div style="height:72px;background:rgba(255,255,255,.04);border-radius:12px;animation:skeletonShimmer 1.4s ease infinite"></div>' +
      '<div style="height:72px;background:rgba(255,255,255,.04);border-radius:12px;animation:skeletonShimmer 1.4s ease infinite"></div>' +
      '<div style="height:72px;background:rgba(255,255,255,.04);border-radius:12px;animation:skeletonShimmer 1.4s ease infinite"></div>' +
      '</div>';
    SOC.initialized = true;
    socLoadAll();
  } else {
    // Repeated visit: render cached data immediately, refresh feed in background
    socRenderSubTab();
    if(!socIsDemo()) socLoadAll();
  }
};

window.socShowSubTab = function(tab){
  SOC.activeSubTab = tab;
  document.querySelectorAll('.soc-stab').forEach(b => b.classList.toggle('active', b.textContent.trim().startsWith(tab==='feed'?'Лента':'Друзья')));
  socRenderSubTab();
};

function socRenderSubTab(){
  if(SOC.activeSubTab === 'feed') socRenderFeed();
  else socRenderFriends();
}

// ─── LOAD ALL DATA ────────────────────────────────────────────
async function socLoadAll(){
  if(socIsDemo()) return;
  // FIX: socLoadFeed reads SOC.friends + SOC.follows — load them first
  await Promise.all([
    socLoadFriends(),
    socLoadFollows(),
  ]);
  await socLoadFeed();
  socUpdateBadge();
}

// ─── FEED ─────────────────────────────────────────────────────
async function socLoadFeed(){
  if(socIsDemo()){ SOC.feedItems = []; return; }
  try {
    // Get IDs of friends + follows
    const friendIds = SOC.friends.map(f => f.id);
    const followIds = SOC.follows;
    const ids = [...new Set([...friendIds, ...followIds])];
    if(!ids.length){ SOC.feedItems = []; return; }

    const {data} = await sb.from('social_events')
      .select('id,user_id,type,data,created_at,users(id,username,avatar,avatar_url)')
      .in('user_id', ids)
      .order('created_at', {ascending: false})
      .limit(60);

    SOC.feedItems = (data || []).map(e => ({
      ...e,
      username: e.users?.username || '?',
      avatar: e.users?.avatar || '🎯',
      avatarUrl: e.users?.avatar_url || null,
    }));
  } catch(e){ console.warn('socLoadFeed:', e); SOC.feedItems = []; }
  // Рендерим ленту только если активен таб «Лента»
  // Если пользователь уже на «Друзья» — не перебиваем его вид
  if(SOC.activeSubTab === 'feed') socRenderFeed();
}

function socRenderFeed(){
  const el = document.getElementById('soc-subcontent');
  if(!el) return;

  if(socIsDemo()){
    el.innerHTML = `<div class="soc-empty">
      <div class="soc-empty-icon">🌐</div>
      <div class="soc-empty-title">Демо-режим</div>
      <div class="soc-empty-sub">Лента доступна после регистрации. Добавь друзей — и здесь появятся их успехи.</div>
    </div>`;
    return;
  }

  if(!SOC.feedItems.length && (SOC.friends.length + SOC.follows.length === 0)){
    el.innerHTML = `<div class="soc-empty">
      <div class="soc-empty-icon">👥</div>
      <div class="soc-empty-title">Лента пуста</div>
      <div class="soc-empty-sub">Добавь друзей во вкладке «Друзья» — и здесь появятся их достижения, сессии и дисциплину.</div>
      <button class="soc-btn soc-btn-gold" onclick="socShowSubTab('friends')" style="margin-top:8px">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Найти друзей
      </button>
    </div>`;
    return;
  }

  if(!SOC.feedItems.length){
    el.innerHTML = `<div class="soc-empty">
      <div class="soc-empty-icon">📭</div>
      <div class="soc-empty-title">Ничего нового</div>
      <div class="soc-empty-sub">Твои друзья пока не делали записей. Заходи позже!</div>
    </div>`;
    return;
  }

  let html = '<div class="soc-feed">';
  let lastDate = '';
  SOC.feedItems.forEach(ev => {
    const evDate = new Date(ev.created_at).toLocaleDateString('ru',{day:'2-digit',month:'long'});
    if(evDate !== lastDate){
      html += `<div class="soc-date-sep">${evDate}</div>`;
      lastDate = evDate;
    }
    html += socEventHTML(ev);
  });
  html += '</div>';
  el.innerHTML = html;
}

function socEventHTML(ev){
  const time = socRelTime(ev.created_at);
  const uid = ev.user_id;

  // ── Avatar HTML ──
  const avInner = ev.avatarUrl
    ? `<img src="${ev.avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:8px" onerror="this.parentNode.textContent='${(ev.avatar||'🎯').replace(/'/g,'')}'"> `
    : esc(ev.avatar||'🎯');
  const avHTML = `<div class="soc-card-av" onclick="socOpenUserProfile('${uid}')">${avInner}</div>`;

  // ── Reactions ──
  const reactKey = 'soc_react_' + ev.id;
  const reacted = localStorage.getItem(reactKey) === '1';
  const reactions = [
    { emoji:'👏', key:'clap' },
    { emoji:'🔥', key:'fire' },
    { emoji:'💪', key:'strong' },
  ];
  const reactBtns = reactions.map(r => {
    const rKey = 'soc_react_' + ev.id + '_' + r.key;
    const isR = localStorage.getItem(rKey) === '1';
    const cnt = parseInt(localStorage.getItem(rKey + '_cnt') || '0');
    return `<button class="soc-react-btn${isR?' reacted':''}" onclick="socReact(this,'${ev.id}','${r.key}')" data-key="${rKey}">
      ${r.emoji} ${cnt > 0 ? `<span class="soc-react-count">${cnt}</span>` : ''}
    </button>`;
  }).join('');
  const reactionBar = `<div class="soc-reactions">${reactBtns}<span class="soc-react-sep">${time}</span></div>`;

  // ── Card head ──
  function cardHead(actionText){
    return `<div class="soc-card-head">
      ${avHTML}
      <div class="soc-card-who">
        <div class="soc-card-name" onclick="socOpenUserProfile('${uid}')">${esc(ev.username)}</div>
        <div class="soc-card-action">${actionText}</div>
      </div>
    </div>`;
  }

  switch(ev.type){

    case 'session': {
      const dur = ev.data.dur || 0;
      const h = Math.floor(dur/3600), m = Math.floor((dur%3600)/60);
      const durStr = h > 0 ? `${h}<small style="font-size:16px;opacity:.7">ч</small> ${m}<small style="font-size:16px;opacity:.7">м</small>` : `${m}<small style="font-size:16px;opacity:.7">м</small>`;
      const cat = (ALL_CATS||[]).find(c=>c.id===ev.data.cat);
      const color = cat?.color || '#F5C842';
      return `<div class="soc-card soc-card-session" style="border-color:${color}22">
        ${cardHead('завершил сессию')}
        <div class="soc-card-body">
          <div class="soc-session-hero" style="background:${color}10;border:0.5px solid ${color}22;color:${color}">
            <div class="soc-session-icon" style="background:${color}18;border:0.5px solid ${color}30">${ev.data.catIcon||'⏱'}</div>
            <div>
              <div class="soc-session-dur" style="color:${color}">${durStr}</div>
              <div class="soc-session-cat" style="color:${color}">${esc(ev.data.catName||'?')}</div>
            </div>
          </div>
        </div>
        ${reactionBar}
      </div>`;
    }

    case 'achievement': {
      const achDef = (typeof ACH_DEF !== 'undefined' ? ACH_DEF : []).find(a=>a.id===ev.data.id);
      const desc = achDef?.desc || '';
      return `<div class="soc-card soc-card-achievement">
        ${cardHead('получил достижение')}
        <div class="soc-card-body">
          <div class="soc-ach-hero">
            <div class="soc-ach-icon">${ev.data.icon||'🏆'}</div>
            <div>
              <div class="soc-ach-name">${esc(ev.data.name||'?')}</div>
              ${desc ? `<div class="soc-ach-desc">${esc(desc)}</div>` : ''}
            </div>
          </div>
        </div>
        ${reactionBar}
      </div>`;
    }

    case 'level_up': {
      return `<div class="soc-card soc-card-levelup">
        ${cardHead('повысил уровень')}
        <div class="soc-card-body">
          <div class="soc-lvl-hero">
            <div class="soc-lvl-num">${ev.data.level||'?'}</div>
            <div>
              <div class="soc-lvl-label">${esc(ev.data.name||'Новый уровень')}</div>
              <div class="soc-lvl-sub">Уровень достигнут ⚡</div>
            </div>
          </div>
        </div>
        ${reactionBar}
      </div>`;
    }

    case 'streak': {
      const days = ev.data.days || 0;
      const streakMsg = days >= 100 ? 'Легендарная серия!' : days >= 30 ? 'Месяц без пропусков!' : days >= 14 ? 'Две недели подряд!' : `${days} дней подряд`;
      return `<div class="soc-card soc-card-streak">
        ${cardHead('поддерживает дисциплину')}
        <div class="soc-card-body">
          <div class="soc-streak-hero">
            <div class="soc-streak-fire">🔥</div>
            <div class="soc-streak-num">${days}</div>
            <div>
              <div class="soc-streak-label">${streakMsg}</div>
              <div class="soc-streak-sub">дней без пропуска</div>
            </div>
          </div>
        </div>
        ${reactionBar}
      </div>`;
    }

    case 'record': {
      const recType = ev.data.recType === 'session' ? 'Лучшая сессия' : ev.data.recType === 'week' ? 'Лучшая неделя' : 'Личный рекорд';
      const val = ev.data.value || '';
      return `<div class="soc-card soc-card-record">
        ${cardHead('побил личный рекорд')}
        <div class="soc-card-body">
          <div class="soc-rec-hero">
            <div style="font-size:28px;flex-shrink:0">🎯</div>
            <div>
              <div class="soc-rec-label">${recType}</div>
              <div class="soc-rec-num">${esc(String(val))}</div>
            </div>
          </div>
        </div>
        ${reactionBar}
      </div>`;
    }

    default:
      return `<div class="soc-card soc-card-session">
        ${cardHead('был активен')}
        ${reactionBar}
      </div>`;
  }
}

// ── Reactions handler ──────────────────────────────────────────
window.socReact = function(btn, evId, reactionKey){
  const key = 'soc_react_' + evId + '_' + reactionKey;
  const isReacted = localStorage.getItem(key) === '1';
  const cnt = parseInt(localStorage.getItem(key + '_cnt') || '0');
  if(isReacted){
    localStorage.removeItem(key);
    localStorage.setItem(key + '_cnt', Math.max(0, cnt - 1));
    btn.classList.remove('reacted');
  } else {
    localStorage.setItem(key, '1');
    localStorage.setItem(key + '_cnt', cnt + 1);
    btn.classList.add('reacted');
    // Mini bounce animation
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => btn.style.transform = '', 200);
  }
  // Update count display
  const newCnt = parseInt(localStorage.getItem(key + '_cnt') || '0');
  const countEl = btn.querySelector('.soc-react-count');
  if(newCnt > 0){
    if(countEl) countEl.textContent = newCnt;
    else btn.insertAdjacentHTML('beforeend', `<span class="soc-react-count">${newCnt}</span>`);
  } else if(countEl){
    countEl.remove();
  }
};

// ─── FRIENDS ──────────────────────────────────────────────────
async function socLoadFriends(){
  if(socIsDemo()) return;
  try {
    // Accepted requests where user is from_user or to_user
    const {data} = await sb.from('friend_requests')
      .select('id,from_user,to_user,status,created_at')
      .or(`from_user.eq.${SB_USER.id},to_user.eq.${SB_USER.id}`)
      .order('created_at', {ascending: false});

    SOC.pendingIn = [];
    SOC.pendingOut = [];
    const friendIds = [];

    const allRequests = data || [];
    const partnerIds = new Set(allRequests.map(r =>
      r.from_user === SB_USER.id ? r.to_user : r.from_user
    ));

    // Fetch user info for all partners at once
    let userMap = {};
    if(partnerIds.size){
      const {data: users} = await sb.from('users')
        .select('id,username,avatar,avatar_url')
        .in('id', [...partnerIds]);
      (users||[]).forEach(u => userMap[u.id] = u);
    }

    allRequests.forEach(r => {
      const partnerId = r.from_user === SB_USER.id ? r.to_user : r.from_user;
      const u = userMap[partnerId] || {id: partnerId, username: '?', avatar: '🎯'};
      const entry = { reqId: r.id, id: partnerId, name: u.username, avatar: u.avatar, avatarUrl: u.avatar_url||null, status: r.status };

      if(r.status === 'accepted'){
        friendIds.push(entry);
      } else if(r.status === 'pending'){
        if(r.to_user === SB_USER.id) SOC.pendingIn.push(entry);
        else SOC.pendingOut.push(entry);
      }
    });

    SOC.friends = friendIds;
  } catch(e){ console.warn('socLoadFriends:', e); }
}

async function socLoadFollows(){
  if(socIsDemo()) return;
  try {
    const {data} = await sb.from('follows')
      .select('following_id')
      .eq('follower_id', SB_USER.id);
    SOC.follows = (data||[]).map(r => r.following_id);
  } catch(e){ console.warn('socLoadFollows:', e); }
}

function socUpdateBadge(){
  const cnt = SOC.pendingIn.length;
  // Tab badge
  const badge = document.getElementById('socialTabBadge');
  if(badge){ badge.style.display = cnt > 0 ? 'inline' : 'none'; badge.textContent = cnt > 9 ? '9+' : cnt; }
  // Sub-tab badge
  const reqCnt = document.getElementById('soc-req-count');
  if(reqCnt){ reqCnt.style.display = cnt > 0 ? 'inline-block' : 'none'; reqCnt.textContent = cnt > 9 ? '9+' : cnt; }
}

function socRenderFriends(){
  const el = document.getElementById('soc-subcontent');
  if(!el) return;

  let html = `<div class="soc-friends-wrap">
    <!-- Search -->
    <div class="soc-sec-lbl">Найти пользователя</div>
    <div class="soc-search-bar">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input class="soc-search-input" id="socSearchInput" placeholder="Введи никнейм..." oninput="socSearchDebounce(this.value)" autocomplete="off">
    </div>
    <div id="socSearchResults" class="soc-search-results"></div>`;

  // Incoming requests
  if(SOC.pendingIn.length){
    html += `<div class="soc-sec-lbl">Входящие запросы <span id="soc-req-count" style="background:var(--gold);color:#0A0A0B;font-size:10px;font-weight:800;padding:2px 7px;border-radius:8px">${SOC.pendingIn.length}</span></div>`;
    SOC.pendingIn.forEach(u => {
      html += `<div class="soc-req-row">
        <div class="soc-user-av" onclick="socOpenUserProfile('${u.id}')">${u.avatarUrl ? `<img src="${u.avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:9px">` : esc(u.avatar)}</div>
        <div class="soc-user-info">
          <div class="soc-user-name" onclick="socOpenUserProfile('${u.id}')">${esc(u.name)}</div>
          <div class="soc-user-sub">Хочет добавить тебя в друзья</div>
        </div>
        <div class="soc-user-acts">
          <button class="soc-btn soc-btn-green soc-btn-sm" onclick="socAcceptFriend('${u.reqId}','${u.id}')">✓ Принять</button>
          <button class="soc-btn soc-btn-red soc-btn-sm" onclick="socRejectFriend('${u.reqId}')">✕</button>
        </div>
      </div>`;
    });
  }

  // Friends list
  html += `<div class="soc-sec-lbl">Друзья ${SOC.friends.length ? `<span style="color:var(--t3);font-weight:600;font-size:11px">${SOC.friends.length}</span>` : ''}</div>`;
  if(SOC.friends.length){
    SOC.friends.forEach(u => {
      const isFollowing = SOC.follows.includes(u.id);
      html += `<div class="soc-user-row">
        <div class="soc-user-av" onclick="socOpenUserProfile('${u.id}')">${u.avatarUrl ? `<img src="${u.avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:9px">` : esc(u.avatar)}</div>
        <div class="soc-user-info">
          <div class="soc-user-name" onclick="socOpenUserProfile('${u.id}')">${esc(u.name)}</div>
          <div class="soc-user-sub">В друзьях</div>
        </div>
        <div class="soc-user-acts">
          <button class="soc-btn ${isFollowing?'soc-btn-outline':'soc-btn-outline'} soc-btn-sm" onclick="socToggleFollow('${u.id}',this)" data-following="${isFollowing}">
            ${isFollowing ? '👁 Слежу' : '+ Следить'}
          </button>
          <button class="soc-btn soc-btn-outline soc-btn-sm" onclick="socOpenUserProfile('${u.id}')">Профиль</button>
          <button class="soc-btn soc-btn-red soc-btn-sm" onclick="socRemoveFriend('${u.reqId}','${u.id}')" title="Удалить из друзей">✕</button>
        </div>
      </div>`;
    });
  } else {
    html += `<div class="soc-empty" style="padding:28px 0">
      <div class="soc-empty-icon">👥</div>
      <div class="soc-empty-title" style="font-size:15px">Пока нет друзей</div>
      <div class="soc-empty-sub">Найди участников лиги и добавляй их в друзья — их прогресс появится в ленте.</div>
    </div>`;
  }

  // Outgoing requests
  if(SOC.pendingOut.length){
    html += `<div class="soc-sec-lbl">Исходящие запросы</div>`;
    SOC.pendingOut.forEach(u => {
      html += `<div class="soc-user-row">
        <div class="soc-user-av">${u.avatarUrl ? `<img src="${u.avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:9px">` : esc(u.avatar)}</div>
        <div class="soc-user-info">
          <div class="soc-user-name">${esc(u.name)}</div>
          <div class="soc-user-sub" style="color:var(--gold)">Запрос отправлен · ожидает ответа</div>
        </div>
        <div class="soc-user-acts">
          <button class="soc-btn soc-btn-red soc-btn-sm" onclick="socCancelRequest('${u.reqId}')">Отменить</button>
        </div>
      </div>`;
    });
  }

  html += `</div>`;
  el.innerHTML = html;
  socUpdateBadge();
}

// ─── SEARCH ───────────────────────────────────────────────────
window.socSearchDebounce = function(val){
  clearTimeout(SOC.searchTimer);
  const res = document.getElementById('socSearchResults');
  if(!val.trim()){ if(res){ res.classList.remove('visible'); res.innerHTML=''; } return; }
  SOC.searchTimer = setTimeout(() => socSearchUsers(val.trim()), 350);
};

async function socSearchUsers(query){
  if(socIsDemo()) return;
  const res = document.getElementById('socSearchResults');
  if(!res) return;
  res.classList.add('visible');
  res.innerHTML = '<div style="padding:14px 16px;font-size:13px;color:var(--t3)">Поиск...</div>';

  try {
    // Strategy 1: ilike partial match
    let result = await sb.from('users')
      .select('id,username,avatar,avatar_url')
      .ilike('username', '%' + query + '%')
      .neq('id', SB_USER.id)
      .limit(8);

    let users = result.data || [];

    // Strategy 2: if ilike fails or returns nothing, try exact eq (case-insensitive via lower)
    if(result.error || !users.length){
      const result2 = await sb.from('users')
        .select('id,username,avatar,avatar_url')
        .ilike('username', query + '%')   // starts-with
        .neq('id', SB_USER.id)
        .limit(8);
      users = result2.data || [];
    }

    // Strategy 3: still nothing — try exact match
    if(!users.length){
      const result3 = await sb.from('users')
        .select('id,username,avatar,avatar_url')
        .eq('username', query)
        .limit(1);
      users = result3.data || [];
    }

    if(!users.length){
      res.innerHTML = '<div style="padding:14px 16px;font-size:13px;color:var(--t3)">Никого не найдено по «' + esc(query) + '»</div>';
      // Show debug hint if first query had an error
      if(result.error){
        res.innerHTML += '<div style="padding:0 16px 14px;font-size:11px;color:var(--red);opacity:.7">Ошибка: ' + esc(result.error.message || String(result.error)) + '</div>';
      }
      return;
    }

    const S = window._SOC || { friends:[], pendingIn:[], pendingOut:[], follows:[] };

    res.innerHTML = users.map(u => {
      const isFriend   = S.friends.some(f => f.id === u.id);
      const isPendOut  = S.pendingOut.some(f => f.id === u.id);
      const isPendIn   = S.pendingIn.some(f => f.id === u.id);
      const isFollowing = S.follows.includes(u.id);

      let actionBtn = '';
      if(isFriend){
        actionBtn = `<span class="soc-btn soc-btn-outline soc-btn-sm" style="cursor:default;opacity:.7">✓ Друг</span>`;
      } else if(isPendOut){
        actionBtn = `<span class="soc-btn soc-btn-outline soc-btn-sm" style="cursor:default;opacity:.7">Запрос отправлен</span>`;
      } else if(isPendIn){
        const req = S.pendingIn.find(f => f.id === u.id);
        actionBtn = `<button class="soc-btn soc-btn-green soc-btn-sm" onclick="socAcceptFriend('${req.reqId}','${u.id}')">✓ Принять</button>`;
      } else {
        actionBtn = `<button class="soc-btn soc-btn-gold soc-btn-sm" onclick="socSendFriendRequest('${u.id}','${esc(u.username).replace(/'/g,"\\'")}',this)">+ Добавить</button>`;
      }

      const avHtml = u.avatar_url
        ? `<img src="${u.avatar_url}" style="width:100%;height:100%;object-fit:cover;border-radius:9px" onerror="this.parentNode.textContent='${(u.avatar||'🎯').replace(/'/g,'')}'">`
        : esc(u.avatar||'🎯');

      return `<div class="soc-user-row" style="border-radius:0;border-left:none;border-right:none;border-top:none;border-bottom:0.5px solid var(--border);margin-bottom:0">
        <div class="soc-user-av" onclick="socOpenUserProfile('${u.id}')" style="cursor:pointer">${avHtml}</div>
        <div class="soc-user-info">
          <div class="soc-user-name" onclick="socOpenUserProfile('${u.id}')">${esc(u.username)}</div>
          <div class="soc-user-sub">${isFollowing ? '👁 Ты следишь' : 'Участник клуба'}</div>
        </div>
        <div class="soc-user-acts">${actionBtn}</div>
      </div>`;
    }).join('');

  } catch(e){
    console.error('socSearchUsers error:', e);
    res.innerHTML = `<div style="padding:14px 16px;font-size:13px;color:var(--red)">
      Ошибка поиска: ${esc(e?.message || String(e))}
    </div>`;
  }
}

// ─── FRIEND ACTIONS ───────────────────────────────────────────
window.socSendFriendRequest = async function(toUserId, toName, btn){
  if(socIsDemo()){ showToast('Недоступно в демо','⚠️'); return; }
  if(btn){ btn.disabled=true; btn.textContent='Отправка...'; }
  try {
    const {error} = await sb.from('friend_requests').insert({
      from_user: SB_USER.id,
      to_user: toUserId,
      status: 'pending'
    });
    if(error){ throw error; }
    SOC.pendingOut.push({ id: toUserId, name: toName, reqId: 'pending', avatar:'🎯', avatarUrl:null });
    showToast(`Запрос отправлен ${esc(toName)}`, '👥');
    if(btn){ btn.textContent='✓ Отправлено'; btn.className='soc-btn soc-btn-outline soc-btn-sm'; btn.disabled=true; }
  } catch(e){
    console.warn('socSendFriendRequest:', e);
    if(btn){ btn.disabled=false; btn.textContent='+ Добавить'; }
    showToast('Ошибка отправки запроса','⚠️');
  }
};

window.socAcceptFriend = async function(reqId, fromUserId){
  if(socIsDemo()) return;
  try {
    await sb.from('friend_requests')
      .update({status:'accepted'})
      .eq('id', reqId);
    // Move from pendingIn to friends
    const req = SOC.pendingIn.find(r => r.reqId === reqId);
    if(req){ SOC.friends.push(req); SOC.pendingIn = SOC.pendingIn.filter(r => r.reqId !== reqId); }
    showToast('Теперь вы друзья! 🎉','✅');
    socUpdateBadge();
    socRenderFriends();
  } catch(e){ console.warn('socAcceptFriend:', e); showToast('Ошибка','⚠️'); }
};

window.socRejectFriend = async function(reqId){
  if(socIsDemo()) return;
  try {
    await sb.from('friend_requests')
      .update({status:'rejected'})
      .eq('id', reqId);
    SOC.pendingIn = SOC.pendingIn.filter(r => r.reqId !== reqId);
    socUpdateBadge();
    socRenderFriends();
  } catch(e){ console.warn('socRejectFriend:', e); showToast('Ошибка','⚠️'); }
};

window.socCancelRequest = async function(reqId){
  if(socIsDemo()) return;
  try {
    await sb.from('friend_requests').delete().eq('id', reqId);
    SOC.pendingOut = SOC.pendingOut.filter(r => r.reqId !== reqId);
    socRenderFriends();
  } catch(e){ console.warn('socCancelRequest:', e); showToast('Ошибка','⚠️'); }
};

window.socRemoveFriend = async function(reqId, userId){
  if(socIsDemo()) return;
  if(!confirm('Удалить из друзей?')) return;
  try {
    // Delete both directions to be safe
    await sb.from('friend_requests')
      .delete()
      .or(`and(from_user.eq.${SB_USER.id},to_user.eq.${userId}),and(from_user.eq.${userId},to_user.eq.${SB_USER.id})`);
    SOC.friends = SOC.friends.filter(f => f.id !== userId);
    showToast('Удалено из друзей','🗑️');
    socRenderFriends();
  } catch(e){ console.warn('socRemoveFriend:', e); showToast('Ошибка','⚠️'); }
};

// ─── FOLLOW ACTIONS ───────────────────────────────────────────
window.socToggleFollow = async function(userId, btn){
  if(socIsDemo()){ showToast('Недоступно в демо','⚠️'); return; }
  const isFollowing = SOC.follows.includes(userId);
  try {
    if(isFollowing){
      await sb.from('follows')
        .delete()
        .eq('follower_id', SB_USER.id)
        .eq('following_id', userId);
      SOC.follows = SOC.follows.filter(id => id !== userId);
      if(btn){ btn.textContent='+ Следить'; btn.dataset.following='false'; }
      showToast('Отписался','👋');
    } else {
      await sb.from('follows').insert({
        follower_id: SB_USER.id,
        following_id: userId
      });
      SOC.follows.push(userId);
      if(btn){ btn.textContent='👁 Слежу'; btn.dataset.following='true'; }
      showToast('Подписался! Его активность появится в ленте','👁');
    }
    // Refresh feed in background
    setTimeout(socLoadFeed, 300);
  } catch(e){ console.warn('socToggleFollow:', e); showToast('Ошибка','⚠️'); }
};

// ─── PUBLIC PROFILE MODAL — PATCH ────────────────────────────
// Extends the existing openUserProfile function with social buttons
window.socOpenUserProfile = function(userId){
  if(!userId || userId === SB_USER?.id) return;
  // Try to load user data and open their profile
  if(socIsDemo()){
    showToast('Профили доступны после регистрации','ℹ️');
    return;
  }
  // Re-use existing openUserProfile if available, extended with social actions
  sb.from('users')
    .select('id,username,avatar,avatar_url,streak,total_sessions,active_days')
    .eq('id', userId).single()
    .then(({data: u}) => {
      if(!u) return;
      _socShowPublicProfile(u);
    });
};

function _socShowPublicProfile(u){
  const isFriend = SOC.friends.some(f => f.id === u.id);
  const isPendingOut = SOC.pendingOut.some(f => f.id === u.id);
  const isFollowing = SOC.follows.includes(u.id);

  let friendBtn = '';
  if(isFriend){
    friendBtn = `<button class="soc-btn soc-btn-outline" onclick="this.textContent='Удалить?';this.onclick=()=>socRemoveFriend('${SOC.friends.find(f=>f.id===u.id)?.reqId||''}','${u.id}')">✓ Друг</button>`;
  } else if(isPendingOut){
    friendBtn = `<button class="soc-btn soc-btn-outline" disabled style="opacity:.6">Запрос отправлен</button>`;
  } else {
    friendBtn = `<button class="soc-btn soc-btn-gold" onclick="socSendFriendRequest('${u.id}','${esc(u.username)}',this)">+ В друзья</button>`;
  }

  const followBtn = `<button class="soc-btn soc-btn-outline" id="socFollowBtn_${u.id}" onclick="socToggleFollow('${u.id}',this)" data-following="${isFollowing}">
    ${isFollowing ? '👁 Слежу' : '+ Следить'}
  </button>`;

  const avHtml = u.avatar_url
    ? `<img src="${u.avatar_url}" style="width:100%;height:100%;object-fit:cover;border-radius:14px" onerror="this.parentNode.textContent='${(u.avatar||'🎯').replace(/'/g,'')}'">` 
    : esc(u.avatar||'🎯');

  // Inject into existing up-modal or create one
  const existingModal = document.getElementById('upModal');
  if(existingModal){
    // Patch the existing profile modal by calling openUserProfile and then injecting
    if(typeof window.openUserProfile === 'function'){
      window.openUserProfile(u.id, u.username, u.avatar||'🎯', u.avatar_url||'');
      // Add social buttons after a tick
      setTimeout(() => {
        const actRow = existingModal.querySelector('.up-btn-row') || existingModal.querySelector('[style*="display:flex"]');
        const socRow = existingModal.querySelector('#socBtnsInjected');
        if(!socRow && actRow){
          const div = document.createElement('div');
          div.id = 'socBtnsInjected';
          div.style.cssText = 'display:flex;gap:8px;margin-top:8px;padding:0 0 4px';
          div.innerHTML = friendBtn + followBtn;
          actRow.parentNode.insertBefore(div, actRow.nextSibling);
        }
      }, 60);
      return;
    }
  }

  // Fallback: create a simple standalone modal
  const ovId = 'socProfileOv';
  document.getElementById(ovId)?.remove();
  const ov = document.createElement('div');
  ov.id = ovId;
  ov.style.cssText = 'position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,.72);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px';
  ov.onclick = e => { if(e.target === ov) ov.remove(); };
  ov.innerHTML = `
    <div style="background:var(--panel);border:0.5px solid var(--border);border-radius:20px;padding:28px;width:90%;max-width:400px;box-shadow:0 32px 80px rgba(0,0,0,.6)">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
        <div style="width:64px;height:64px;border-radius:14px;background:var(--card);border:0.5px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:32px;overflow:hidden;flex-shrink:0">${avHtml}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:20px;font-weight:800;letter-spacing:-.03em;color:var(--t1);margin-bottom:4px">${esc(u.username)}</div>
          <div style="display:flex;gap:12px;font-size:12px;color:var(--t3)">
            <span>🔥 ${u.streak||0} дней</span>
            <span>⏱ ${u.total_sessions||0} сессий</span>
          </div>
        </div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:16px">
        ${friendBtn}
        ${followBtn}
        <button class="soc-btn soc-btn-outline" onclick="openConv && typeof openConv === 'function' ? (document.getElementById('${ovId}').remove(), showTab('messages'), setTimeout(()=>openConv('${u.id}','${esc(u.username)}','${esc(u.avatar||'🎯')}','${esc(u.avatar_url||'')}'),300)) : null()">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Написать
        </button>
      </div>
      <button onclick="document.getElementById('${ovId}').remove()" style="width:100%;padding:10px;border-radius:10px;background:var(--card);border:0.5px solid var(--border);color:var(--t2);font-size:13px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif">Закрыть</button>
    </div>`;
  document.body.appendChild(ov);
}

// ─── PROFILE MODAL HELPER ACTIONS ─────────────────────────────
window.socConfirmRemoveFriend = async function(userId){
  const req = SOC.friends.find(f => f.id === userId);
  if(confirm('Удалить из друзей?')) await window.socRemoveFriend(req?.reqId || '', userId);
};

window.socToggleFollowInModal = async function(userId, btn){
  await window.socToggleFollow(userId, null);
  const isNowFollowing = SOC.follows.includes(userId);
  if(btn) btn.textContent = isNowFollowing ? '👁 Слежу' : '+ Следить';
};

// ─── SHOW TAB HOOK ─────────────────────────────────────────────

// Hook called after a session is actually saved to DB
window.socOnSessionSaved = function(catId, durSecs){
  if(durSecs < 300) return; // Only post sessions >= 5 minutes
  const cat = (ALL_CATS||[]).find(c => c.id === catId);
  if(!cat) return;
  window.socPostEvent('session', {
    cat: catId,
    dur: durSecs,
    catName: cat.name,
    catIcon: cat.icon,
    catColor: cat.color,
  });
  // Check streak milestones
  const streak = P?.streak || 0;
  if([7,14,21,30,50,100].includes(streak)){
    window.socPostEvent('streak', { days: streak });
  }
  // Personal record — new best single session (> 1h)
  if(durSecs > 3600 && P?.sessions){
    const prevBest = P.sessions
      .filter(s => s.cat === catId && s.dur < durSecs)
      .reduce((a,s) => Math.max(a, s.dur||0), 0);
    if(durSecs > prevBest){
      const h = Math.floor(durSecs/3600), m = Math.floor((durSecs%3600)/60);
      window.socPostEvent('record', {
        recType: 'session', cat: catId, catName: cat.name,
        value: h > 0 ? `${h}ч ${m}м` : `${m}м`,
      });
    }
  }
};

// Hook level up
window.socOnLevelUp = function(level, name){
  window.socPostEvent('level_up', { level, name });
};

// Hook achievement
window.socOnAchievement = function(achDef){
  window.socPostEvent('achievement', { id: achDef.id, name: achDef.name, icon: achDef.icon });
};

// ─── SHOW TAB HOOK ─────────────────────────────────────────────
const _socOrigST = window.showTab;
window.showTab = function(name, el, skip){
  if(_socOrigST) _socOrigST.call(this, name, el, skip);
  if(name === 'social'){
    setTimeout(() => {
      window.renderSocialTab();
    }, 60);
  }
};

// ─── LOAD ON INIT ──────────────────────────────────────────────
// Pre-load friend requests badge count when user logs in
document.addEventListener('DOMContentLoaded', () => {
  // Poll for SB_USER being set
  const checkInterval = setInterval(() => {
    if(SB_USER && !SB_USER.isDemoUser && sb){
      clearInterval(checkInterval);
      // Load just friend requests for badge (lightweight)
      setTimeout(async () => {
        try {
          const {data} = await sb.from('friend_requests')
            .select('id')
            .eq('to_user', SB_USER.id)
            .eq('status', 'pending');
          const cnt = (data||[]).length;
          if(cnt > 0){
            const badge = document.getElementById('socialTabBadge');
            if(badge){ badge.style.display='inline'; badge.textContent = cnt > 9 ? '9+' : cnt; }
          }
        } catch(e){}
      }, 4000);
    }
  }, 2000);
});

// ─── MODAL FRIEND/FOLLOW HELPERS ────────────────────────────
window.socConfirmRemoveFriend = function(userId){
  const btn = event.currentTarget;
  if(btn.dataset.confirm === '1'){
    // Find reqId
    const f = SOC.friends.find(x => x.id === userId);
    if(f) window.socRemoveFriend(f.reqId || '', userId);
    else window.socRemoveFriend('', userId);
  } else {
    btn.dataset.confirm = '1';
    btn.textContent = 'Удалить?';
    btn.style.background = 'rgba(239,68,68,.15)';
    btn.style.borderColor = 'rgba(239,68,68,.3)';
    btn.style.color = 'var(--red)';
    setTimeout(() => {
      if(btn.dataset.confirm) {
        btn.dataset.confirm = '';
        btn.textContent = '✓ Друг';
        btn.style.background = 'rgba(34,197,94,.1)';
        btn.style.borderColor = 'rgba(34,197,94,.3)';
        btn.style.color = 'var(--green)';
      }
    }, 2500);
  }
};

window.socToggleFollowInModal = async function(userId, btn){
  await window.socToggleFollow(userId, btn);
  // Update friend/follow buttons in modal
  const isFol = SOC.follows.includes(userId);
  if(btn){ btn.textContent = isFol ? '👁 Слежу' : '+ Следить'; }
};

})(); // end IIFE



/* ══ COLLABORATIVE HABITS ENGINE ════════════════════════════ */
(function CollabHabits(){
'use strict';

const CHAB_MODE_KEY = 'dtr_chab_mode';
let _chabMode = localStorage.getItem(CHAB_MODE_KEY) || 'personal';
let _chabSub  = null;

/* getSB — sb is const in main script scope, not on window */
function getSB(){ try{ return sb; }catch(e){ return null; } }
/* getUser — SB_USER is let in main script scope, not on window */
function getUser(){ try{ return typeof SB_USER !== "undefined" ? SB_USER : null; }catch(e){ return null; } }
function mkCode(){ return Math.random().toString(36).slice(2,8).toUpperCase(); }

window.chabSetMode = function(mode){
  _chabMode = mode;
  localStorage.setItem(CHAB_MODE_KEY, mode);
  document.querySelectorAll('.hab-mode-btn').forEach(function(b){
    b.classList.toggle('active', b.dataset.mode === mode);
    b.classList.toggle('collab', b.dataset.mode === 'collab' && mode === 'collab');
  });

  if(mode === 'collab'){
    renderCollabView();
  } else {
    // Personal: use HabTracker's own render (exported as _habPersonalRender)
    if(typeof window._habPersonalRender === 'function'){
      window._habPersonalRender();
    }
    // render() wipes root.innerHTML — re-attach mode bar afterward
    setTimeout(function(){
      var r   = document.getElementById('hab-root');
      var bar = document.getElementById('habModeBar');
      if(r && bar && bar.parentNode !== r) r.insertBefore(bar, r.firstChild);
      if(r && !bar) renderModeBar(r);
      // Re-sync button states
      document.querySelectorAll('.hab-mode-btn').forEach(function(b){
        b.classList.toggle('active', b.dataset.mode === 'personal');
        b.classList.toggle('collab', false);
      });
    }, 15);
  }
};

function renderModeBar(container){
  if(document.getElementById('habModeBar')) return;
  const bar = document.createElement('div');
  bar.className = 'hab-mode-bar';
  bar.id = 'habModeBar';
  bar.innerHTML = `
    <button class="hab-mode-btn ${_chabMode==='personal'?'active':''}" data-mode="personal" onclick="chabSetMode('personal')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      Мой трекер
    </button>
    <button class="hab-mode-btn ${_chabMode==='collab'?'active collab':''}" data-mode="collab" onclick="chabSetMode('collab')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      Совместный
      <span class="hab-mode-badge">NEW</span>
    </button>`;
  container.prepend(bar);
}

async function renderCollabView(){
  const root = document.getElementById('hab-root');
  if(!root) return;
  const sb = getSB(), user = getUser();
  const bar = document.getElementById('habModeBar');
  root.innerHTML = '';
  if(bar) root.appendChild(bar);

  // Retry if user not ready
  if(!user || user.isDemoUser){
    var _retries = (renderCollabView._retries || 0) + 1;
    renderCollabView._retries = _retries;
    if(_retries <= 5){ setTimeout(renderCollabView, 600); return; }
    renderCollabView._retries = 0;
    root.insertAdjacentHTML('beforeend',`<div class="chab-empty"><div class="chab-empty-icon">🤝</div><div style="font-size:17px;font-weight:800;color:var(--t1);letter-spacing:-.03em;margin-bottom:8px">Совместные привычки</div><div style="font-size:13px;color:var(--t2);line-height:1.6;max-width:280px">Войди в аккаунт чтобы создавать совместные трекеры с друзьями</div></div>`);
    return;
  }
  renderCollabView._retries = 0;

  // ── Скелетон мгновенно ──
  const skeletonCard = `<div style="background:linear-gradient(135deg,rgba(168,85,247,.05),rgba(139,92,246,.02));border:0.5px solid rgba(168,85,247,.15);border-radius:18px;padding:20px;margin-bottom:14px">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div class="skel" style="width:44px;height:44px;border-radius:12px"></div>
      <div style="flex:1"><div class="skel skel-line" style="width:38%;margin-bottom:7px"></div><div class="skel skel-line" style="width:22%"></div></div>
    </div>
    <div class="skel" style="height:80px;border-radius:14px;margin-bottom:14px"></div>
    ${[1,2].map(()=>`<div class="skel" style="height:52px;border-radius:10px;margin-bottom:8px"></div>`).join('')}
  </div>`;
  root.insertAdjacentHTML('beforeend',`<div id="chabContent">${skeletonCard}</div>`);

  try {
    // ── Memberships и rooms параллельно ──
    const [membershipsRes, allRoomsRes] = await Promise.all([
      sb.from('collab_habit_members').select('room_id,role').eq('user_id', user.id),
      // prefetch rooms where user is member (subquery via RPC not available — fetch after)
      Promise.resolve(null)
    ]);
    const memberships = membershipsRes.data || [];
    const roomIds = memberships.map(m=>m.room_id);

    let rooms = [];
    if(roomIds.length){
      const {data} = await sb.from('collab_habit_rooms').select('*').in('id', roomIds);
      rooms = data||[];
    }
    await renderChabContent(rooms, memberships);
  } catch(e){ console.error('CollabHabits:',e); await renderChabContent([],[]); }
}

async function renderChabContent(rooms, memberships){
  const el = document.getElementById('chabContent');
  if(!el) return;
  const user = getUser();

  if(!rooms.length){
    el.innerHTML = `<div class="chab-empty">
      <div class="chab-empty-icon">🤝</div>
      <div style="font-size:17px;font-weight:800;color:var(--t1);letter-spacing:-.03em;margin-bottom:8px">Нет совместных трекеров</div>
      <div style="font-size:13px;color:var(--t2);line-height:1.6;margin-bottom:24px;max-width:300px">Создай трекер и пригласи друзей — соревнуйтесь, мотивируйте друг друга</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">
        <button class="chab-btn-purple" onclick="chabCreateRoom()">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Создать трекер
        </button>
        <button class="chab-btn-outline" onclick="chabJoinRoom()">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          Войти по коду
        </button>
      </div>
    </div>`;
    return;
  }

  let html = `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px">
    <div style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--t2);display:flex;align-items:center;gap:8px">
      <span class="chab-live-dot"></span>Совместные трекеры · ${rooms.length}
    </div>
    <div style="display:flex;gap:8px">
      <button class="chab-btn-purple" style="padding:7px 14px;font-size:12px" onclick="chabCreateRoom()">+ Создать</button>
      <button class="chab-btn-outline" style="padding:7px 14px;font-size:12px" onclick="chabJoinRoom()">Войти по коду</button>
    </div>
  </div>`;

  // ── Все карточки параллельно ──
  const cards = await Promise.all(
    rooms.map(room => {
      const myRole = (memberships.find(m=>m.room_id===room.id)||{role:'member'}).role;
      return buildRoomCard(room, myRole, user);
    })
  );
  el.innerHTML = html + cards.join('');
  subscribeRealtime(rooms.map(r=>r.id));
}

async function buildRoomCard(room, myRole, user){
  const sb = getSB();
  let members=[],habits=[],logs={};
  try {
    // ── Все запросы параллельно ──
    const d30ago = new Date(); d30ago.setDate(d30ago.getDate()-30);
    const d30str = d30ago.toISOString().slice(0,10);

    const [memsRes, habsRes] = await Promise.all([
      sb.from('collab_habit_members').select('user_id,role').eq('room_id',room.id),
      sb.from('collab_habits').select('*').eq('room_id',room.id).neq('active',false)
    ]);

    const rawMembers = memsRes.data||[];
    habits = habsRes.data||[];
    const memberIds = rawMembers.map(m=>m.user_id);

    // Профили и логи — тоже параллельно
    const [profilesRes, logsRes] = await Promise.all([
      memberIds.length ? sb.from('users').select('id,username,avatar,avatar_url').in('id',memberIds) : Promise.resolve({data:[]}),
      habits.length && memberIds.length ? sb.from('collab_habit_logs').select('habit_id,user_id,date').eq('room_id',room.id).gte('date',d30str) : Promise.resolve({data:[]})
    ]);

    const profileMap = {};
    (profilesRes.data||[]).forEach(p=>{ profileMap[p.id]=p; });
    members = rawMembers.map(m=>({
      ...m, users: profileMap[m.user_id] || { username:'?', avatar:'👤', avatar_url:null }
    }));
    (logsRes.data||[]).forEach(e=>{
      if(!logs[e.user_id]) logs[e.user_id]={};
      if(!logs[e.user_id][e.habit_id]) logs[e.user_id][e.habit_id]={};
      logs[e.user_id][e.habit_id][e.date]=true;
    });
  } catch(e){ console.error('buildRoomCard:', e); }

  // ── Helpers ──────────────────────────────────────────────────
  // ВАЖНО: используем локальное время везде — чтобы совпадало с _todayStr() и данными в БД
  function dateStr(d){
    return d.getFullYear() + '-' +
      String(d.getMonth()+1).padStart(2,'0') + '-' +
      String(d.getDate()).padStart(2,'0');
  }

  const today = _todayStr(); // локальная дата сегодня
  const now = new Date();

  // Пн–Вс текущей недели (локальное время)
  function chabWeekDates(){
    const d=new Date();
    const dow = d.getDay() || 7; // 1=Пн..7=Вс
    d.setDate(d.getDate()-dow+1);
    d.setHours(0,0,0,0);
    return Array.from({length:7},(_,i)=>{
      const x=new Date(d); x.setDate(x.getDate()+i); return x;
    });
  }
  const weekDates = chabWeekDates();
  const DLBL=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  function chabStreak(habitId, userId){
    const userHabLog = (logs[userId]||{})[habitId]||{};
    let s=0;
    const d=new Date(); d.setHours(12,0,0,0);
    // If today not done yet — start from yesterday
    if(!userHabLog[dateStr(d)]) d.setDate(d.getDate()-1);
    for(let i=0;i<60;i++){
      if(userHabLog[dateStr(d)]) s++; else break;
      d.setDate(d.getDate()-1);
    }
    return s;
  }

  // My logs shortcut
  const myId = user?.id;
  const myLog = logs[myId]||{};

  // ── Прошедшие дни недели (нужны раньше для my stats) ──
  const weekDayStrs = weekDates.map(d=>dateStr(d));
  const passedDayStrs = weekDayStrs.filter(d => d <= today);
  const possibleDays = Math.max(passedDayStrs.length, 1);

  // ── My stats today ──
  let myDoneToday=0;
  habits.forEach(h=>{ if((myLog[h.id]||{})[today]) myDoneToday++; });
  const myTodayPct = habits.length ? Math.round(myDoneToday/habits.length*100) : 0;

  // ── Мои "идеальные дни" за неделю ──
  const myPerfectDays = passedDayStrs.filter(d =>
    habits.length > 0 && habits.every(h => (myLog[h.id]||{})[d])
  ).length;

  // ── My global streak — consecutive days THIS WEEK (max = possibleDays ≤ 7) ──
  let myGlobalStreak = 0;
  // Iterate passedDayStrs backwards from today
  for(let i = passedDayStrs.length - 1; i >= 0; i--){
    const dayStr = passedDayStrs[i];
    const anyDone = habits.some(h => (myLog[h.id]||{})[dayStr]);
    if(anyDone) myGlobalStreak++;
    else break;
  }

  // ── Group leaderboard scores ──

  const scores = members.map(m=>{
    // done = сколько раз выполнено за прошедшие дни недели
    let done=0;
    habits.forEach(h=>passedDayStrs.forEach(d=>{
      if((logs[m.user_id]||{})[h.id]?.[d]) done++;
    }));
    const possible = habits.length * possibleDays;
    const pct = possible>0 ? Math.round(done/possible*100) : 0;
    const todayDone = habits.filter(h=>((logs[m.user_id]||{})[h.id]||{})[today]).length;
    // Персональный стрик участника — только за эту неделю (max 7)
    let streak=0;
    for(let i = passedDayStrs.length - 1; i >= 0; i--){
      const k = passedDayStrs[i];
      const anyD = habits.some(h=>(logs[m.user_id]||{})[h.id]?.[k]);
      if(anyD) streak++; else break;
    }
    const perfectDays = passedDayStrs.filter(d =>
      habits.length > 0 && habits.every(h => (logs[m.user_id]||{})[h.id]?.[d])
    ).length;
    // pct = % идеальных дней из прошедших дней недели
    const weekPct = possibleDays > 0 ? Math.round(perfectDays / possibleDays * 100) : 0;
    return{...m, done, pct: pct, todayDone, streak, perfectDays};
  }).sort((a,b)=>b.pct-a.pct || b.streak-a.streak);
  const maxPct = Math.max(...scores.map(s=>s.pct), 1);
  const isOwner = myRole==='owner';
  const code = room.invite_code||'——';

  // ── Hero color & message ──
  const heroColor = myTodayPct===100?'#22C55E':myTodayPct>=70?'#F5C842':myTodayPct>=40?'#F97316':'#a855f7';
  const heroMsg = myTodayPct===100?'🏆 Идеальный день!':myTodayPct>=70?'💪 Отличный прогресс!':myTodayPct>=1?'⚡ Продолжай!':'🎯 Начни сейчас';

  // ── Hero arc SVG ──
  function chabArc(pct, size=72){
    const r=28,cx=size/2,cy=size/2;
    const startAngle=-200, sweepAngle=220;
    function pt(angle){ const rad=angle*Math.PI/180; return {x:cx+r*Math.cos(rad),y:cy+r*Math.sin(rad)}; }
    const s=pt(startAngle),e=pt(startAngle+sweepAngle);
    const p=pt(startAngle+sweepAngle*(pct/100));
    const la=sweepAngle*(pct/100)>180?1:0;
    const col=pct===100?'#22C55E':pct>=70?'#F5C842':pct>=40?'#F97316':'#a855f7';
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <path d="M ${s.x} ${s.y} A ${r} ${r} 0 1 1 ${e.x} ${e.y}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="4" stroke-linecap="round"/>
      <path d="M ${s.x} ${s.y} A ${r} ${r} 0 ${la} 1 ${p.x} ${p.y}" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" style="filter:drop-shadow(0 0 5px ${col}88)"/>
    </svg>`;
  }

  // ── Mini ring SVG ──
  function chabRing(pct,color,size=32){
    const r=10,c=2*Math.PI*r,dash=c*pct/100;
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="2.5"/>
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="2.5"
        stroke-dasharray="${dash.toFixed(1)} ${(c-dash).toFixed(1)}" stroke-linecap="round"
        style="transform:rotate(-90deg);transform-origin:50% 50%"/>
    </svg>`;
  }

  // ── Column headers (Mon–Sun with dates) ──
  const NCOL='minmax(180px,1fr)';
  const gridCols=`${NCOL} repeat(7,46px) 52px${isOwner?' 28px':''}`;

  const colHead = weekDates.map((d,i)=>{
    const isToday = dateStr(d)===today;
    const isPast = d < now && !isToday;
    return `<div class="chab-col-head">
      <div class="chab-col-day-lbl" style="color:${isToday?'#c084fc':'var(--t3)'}">${DLBL[i]}</div>
      <div class="chab-col-date-num${isToday?' is-today':''}" style="${!isToday?`color:${isPast?'var(--t1)':'var(--t3)'}`:''}">${d.getDate()}</div>
    </div>`;
  }).join('');

  // ── Habit rows with full 7-day matrix ──
  const habRows = habits.map(h=>{
    const color = h.color||'#a855f7';
    const myStreak = chabStreak(h.id, myId);
    const myHabLog = myLog[h.id]||{};

    let wDone=0, wPassed=0;
    const cells = weekDates.map((d,i)=>{
      const key = dateStr(d);
      const isToday = key===today;
      const future = d>now && !isToday;
      const done = !!(myHabLog[key]);
      // Считаем только прошедшие дни (не будущие)
      if(!future){ wPassed++; if(done) wDone++; }

      // Member pips for this day (other members)
      const otherMembers = members.filter(m=>m.user_id!==myId);
      const pips = otherMembers.map(m=>{
        const memberDone = !!((logs[m.user_id]||{})[h.id]||{})[key];
        const u = m.users||{};
        return `<div class="chab-mem-pip" title="${u.username||'?'}: ${memberDone?'✓':'—'}"
          style="background:${memberDone?color+'99':'rgba(255,255,255,.1)'}"></div>`;
      }).join('');

      const clickFn = future ? '' : `chabToggleCell('${room.id}','${h.id}','${key}',this)`;
      let cls = 'chab-cell mine';
      if(done) cls+=' done';
      if(future) cls+=' future';
      // today box-shadow uses habit color (inline, not CSS class)
      const todayStyle = isToday ? `box-shadow:0 0 0 2.5px ${color}88,0 3px 12px ${color}22;` : '';
      const hoverStyle = !done && !future ? `--chab-hover-bg:${color}1a;--chab-hover-border:${color}55;` : '';

      return `<div class="${cls}"
        style="${done?`background:${color};border-color:${color};box-shadow:0 3px 14px ${color}55`:todayStyle}"
        ${clickFn ? `onclick="${clickFn}"` : ''}
        ${!done&&!future?`onmouseover="this.style.background='${color}18';this.style.borderColor='${color}55'" onmouseout="this.style.background='';this.style.borderColor=''"`:''}>
        ${done
          ?`<span class="chab-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.95)" stroke-width="2.8" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg></span>`
          :future
            ?`<div style="width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.05)"></div>`
            :`<div style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.08);box-shadow:0 0 0 2px rgba(255,255,255,.05)"></div>`
        }
        ${pips&&!future?`<div style="position:absolute;bottom:3px;left:0;right:0;display:flex;justify-content:center;gap:2px">${pips}</div>`:''}
      </div>`;
    }).join('');

    const weekPct = wPassed > 0 ? Math.round(wDone/wPassed*100) : 0;
    const doneToday = !!(myHabLog[today]);
    const atRiskRow = myStreak>=3 && !doneToday;
    const perfectRow = wPassed>0 && wDone===wPassed;
    let rowClass = 'chab-hab-row';
    if(atRiskRow) rowClass+=' at-risk';
    else if(perfectRow) rowClass+=' perfect';

    // Today's status for all members
    const todayMems = members.map(m=>{
      const u=m.users||{};
      const mDone=!!((logs[m.user_id]||{})[h.id]||{})[today];
      const av = u.avatar_url
        ? `<img src="${u.avatar_url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
        : `<span style="font-size:9px">${u.avatar||'👤'}</span>`;
      return `<div title="${u.username||'?'}: ${mDone?'✓ выполнено':'не выполнено'}"
        style="width:18px;height:18px;border-radius:50%;background:${mDone?color+'33':'rgba(255,255,255,.07)'};border:1.5px solid ${mDone?color:'rgba(255,255,255,.1)'};display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;transition:transform .15s"
        onmouseover="this.style.transform='scale(1.3)'" onmouseout="this.style.transform=''">${av}</div>`;
    }).join('');

    return `<div class="${rowClass}" style="grid-template-columns:${gridCols}">
      <div class="chab-hab-row-name">
        <div class="chab-hab-icon" style="background:${color}15;border:0.5px solid ${color}30">${h.icon||'🎯'}</div>
        <div style="flex:1;min-width:0">
          <div class="chab-hab-title">${h.name}</div>
          <div class="chab-hab-streak">
            ${myStreak>0?`<span style="color:var(--orange);font-weight:700">🔥 ${myStreak}</span>`:'<span>— дисциплина</span>'}
          </div>
        </div>
      </div>
      ${cells}
      <div class="chab-prog-col" style="width:52px">
        <div class="chab-prog-pct" style="color:${weekPct===100?color:weekPct>0?color:'var(--t3)'}">${weekPct}%</div>
        <div class="chab-prog-track">
          <div class="chab-prog-fill" style="width:${weekPct}%;background:${weekPct===100?`linear-gradient(90deg,${color}cc,${color})`:`${color}99`};box-shadow:${weekPct>0?`0 0 8px ${color}44`:'none'}"></div>
        </div>
      </div>
      ${isOwner?`<button onclick="chabDeleteHabit('${room.id}','${h.id}')"
        style="width:26px;height:26px;border-radius:7px;background:transparent;border:none;color:rgba(255,255,255,.18);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background-color .15s,border-color .15s,color .15s,opacity .15s;padding:0"
        onmouseover="this.style.background='rgba(239,68,68,.12)';this.style.color='var(--red)'"
        onmouseout="this.style.background='transparent';this.style.color='rgba(255,255,255,.18)'"
        title="Удалить привычку">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>
      </button>`:''}
    </div>`;
  }).join('');

  // ── Leaderboard ──
  const medals=['🥇','🥈','🥉'];
  const lbRows = scores.map((s,i)=>{
    const u=s.users||{};
    const isMe=s.user_id===myId;
    const av=u.avatar_url?`<img src="${u.avatar_url}" style="width:100%;height:100%;object-fit:cover;border-radius:8px">`:`<span style="font-size:18px">${u.avatar||'👤'}</span>`;
    const streakTxt = s.streak > 0 ? `🔥 ${s.streak} дисциплина` : '— дисциплина';
    const doneTxt = `✓ ${s.todayDone}/${habits.length} сегодня`;
    const weekTxt = `${s.perfectDays} из ${possibleDays} идеальных дней`;
    return `<div class="chab-lb-row${isMe?' me':''}">
      <div class="chab-lb-rank">${medals[i]||i+1}</div>
      <div class="chab-lb-av">${av}</div>
      <div class="chab-lb-info">
        <div class="chab-lb-name">${u.username||'?'}${isMe?'<span class="chab-you-tag">ТЫ</span>':''}</div>
        <div class="chab-lb-sub">${doneTxt} · ${streakTxt}</div>
        <div style="font-size:10px;color:var(--t3);margin-top:1px">${weekTxt}</div>
      </div>
      <div class="chab-lb-bar-wr"><div class="chab-lb-bar" style="width:${Math.round(s.pct/maxPct*100)}%"></div></div>
      <div class="chab-lb-score">${s.pct}%</div>
    </div>`;
  }).join('');

  // ── Member avatars header ──
  const avHtml = scores.map(s=>{
    const u=s.users||{};
    const av=u.avatar_url?`<img src="${u.avatar_url}" style="width:100%;height:100%;object-fit:cover;border-radius:6px">`:`<span style="font-size:13px">${u.avatar||'👤'}</span>`;
    return `<div class="chab-av" style="background:rgba(168,85,247,.12)" title="${u.username||'?'}">${av}</div>`;
  }).join('');

  const svgDel=`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>`;

  return `<div class="chab-room" id="chab-room-${room.id}">

    <!-- ── HEADER ── -->
    <div class="chab-room-head">
      <div class="chab-room-icon">${room.icon||'🤝'}</div>
      <div style="flex:1;min-width:0">
        <div class="chab-room-title">${room.name||'Совместный трекер'}</div>
        <div class="chab-room-meta">${members.length} участников · ${habits.length} привычек</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <div class="chab-members">${avHtml}</div>
        <div class="chab-room-acts">
          <button class="chab-btn-outline" style="padding:5px 10px;font-size:11px" onclick="chabShowCode('${code}')">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Пригласить
          </button>
          ${isOwner?`<button class="chab-btn-outline" style="padding:5px 10px;font-size:11px;color:var(--red);border-color:rgba(255,69,58,.2)" onclick="chabDeleteRoom('${room.id}')">${svgDel}</button>`:''}
        </div>
      </div>
    </div>

    <!-- ── HERO v2 ── -->
    <div class="chab-hero-bar" style="background:linear-gradient(135deg,${heroColor}08 0%,transparent 60%)">

      <!-- top strip: score pill + text -->
      <div class="chab-hero-top">

        <!-- Score pill -->
        <div class="chab-score-pill">
          <div class="chab-score-fill" style="height:${myTodayPct}%;background:linear-gradient(180deg,${heroColor}77,${heroColor})"></div>
          <div class="chab-score-shine"></div>
          <div class="chab-score-text">
            <div class="chab-score-num" style="color:${myTodayPct>10?'#fff':heroColor}">${myTodayPct}%</div>
            <div class="chab-score-lbl">Мой день</div>
          </div>
        </div>

        <!-- Right text -->
        <div class="chab-hero-main">
          <div class="chab-hero-title">${heroMsg}</div>
          <div class="chab-hero-sub">${myDoneToday} из ${habits.length} привычек выполнено</div>
          <div class="chab-hero-pbar">
            <div style="height:100%;width:${myTodayPct}%;background:linear-gradient(90deg,${heroColor}77,${heroColor});border-radius:3px;transition:width 1.2s cubic-bezier(.4,0,.2,1);box-shadow:0 0 10px ${heroColor}55"></div>
          </div>
        </div>

      </div>

      <!-- bottom KPI grid -->
      <div class="chab-hero-kpis">
        <div class="chab-hero-kpi">
          <div class="chab-hero-kpi-val" style="color:var(--orange)">${myGlobalStreak>0?myGlobalStreak:'—'}</div>
          <div style="display:flex;align-items:center;gap:3px">
            ${myGlobalStreak>0?'<span style="font-size:12px">🔥</span>':''}
            <div class="chab-hero-kpi-lbl">Дисциплина</div>
          </div>
        </div>
        <div class="chab-hero-kpi">
          <div class="chab-hero-kpi-val" style="color:#c084fc">${habits.length}</div>
          <div class="chab-hero-kpi-lbl">Привычек</div>
        </div>
        <div class="chab-hero-kpi">
          <div class="chab-hero-kpi-val" style="color:#30d158">${myPerfectDays}/${possibleDays}</div>
          <div class="chab-hero-kpi-lbl">Идеал. дней</div>
        </div>
      </div>

    </div>

    <!-- ── LEADERBOARD ── -->
    ${lbRows?`<div class="chab-lb">${lbRows}</div>`:''}

    <!-- ── 7-DAY MATRIX ── -->
    ${habits.length ? `
    <div class="chab-matrix-label">Привычки · неделя</div>
    <div class="chab-matrix">
      <div class="chab-matrix-inner">
        <div class="chab-matrix-head" style="grid-template-columns:${gridCols}">
          <div style="font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--t3)">Привычка</div>
          ${colHead}
          <div style="font-size:9px;text-align:center;color:var(--t3)">%</div>
        </div>
        ${habRows}
      </div>
    </div>
    ` : ''}

    <!-- ── ACTIONS ── -->
    <div class="chab-actions-row">
      ${isOwner?`<button class="chab-btn-purple" style="padding:7px 14px;font-size:12px" onclick="chabAddHabit('${room.id}')">+ Привычка</button>`:''}
      <button class="chab-btn-outline" style="padding:7px 12px;font-size:11px;margin-left:auto" onclick="chabSetMode('personal')">← Мой трекер</button>
    </div>

  </div>`;
}

window.chabToggleCell = async function(roomId, habitId, date, cellEl){
  const sb=getSB(), user=getUser(); if(!sb||!user) return;
  try {
    const isDone = cellEl.classList.contains('done');
    // Optimistic UI
    if(isDone){
      cellEl.classList.remove('done');
      cellEl.style.background=''; cellEl.style.borderColor='';
      cellEl.innerHTML=`<div style="width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.1)"></div>`;
    } else {
      cellEl.classList.add('done');
      cellEl.style.background='rgba(168,85,247,.2)'; cellEl.style.borderColor='rgba(168,85,247,.5)';
      cellEl.innerHTML=`<span class="chab-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>`;
    }
    const {data:ex}=await sb.from('collab_habit_logs').select('id')
      .eq('room_id',roomId).eq('habit_id',habitId).eq('user_id',user.id).eq('date',date).limit(1);
    if(ex&&ex.length) await sb.from('collab_habit_logs').delete().eq('id',ex[0].id);
    else await sb.from('collab_habit_logs').insert({room_id:roomId,habit_id:habitId,user_id:user.id,date});
    try{showToast(isDone?'Отменено':'✅ Выполнено!',isDone?'↩️':'🎯');}catch{}
    setTimeout(()=>renderCollabView(), 1200);
  } catch(e){ console.error('chabToggleCell:',e); }
};

window.chabToggle=async function(roomId,habitId,date){
  const sb=getSB(),user=getUser(); if(!sb||!user)return;
  try {
    const {data:ex}=await sb.from('collab_habit_logs').select('id').eq('room_id',roomId).eq('habit_id',habitId).eq('user_id',user.id).eq('date',date).limit(1).then(function(r){return {data:(r.data&&r.data.length?r.data[0]:null),error:r.error};});
    if(ex) await sb.from('collab_habit_logs').delete().eq('id',ex.id);
    else await sb.from('collab_habit_logs').insert({room_id:roomId,habit_id:habitId,user_id:user.id,date});
    setTimeout(renderCollabView,400);
    try{window.showToast&&showToast(ex?'Отменено':'Выполнено!',ex?'↩️':'✅');}catch{}
  }catch(e){console.error(e);}
};

window.chabShowCode=function(code){
  showChabModal(`<div class="chab-modal-title">Пригласить в трекер</div>
    <div class="chab-modal-sub">Поделись кодом — участник вводит его и сразу попадает в трекер</div>
    <div style="text-align:center;margin-bottom:20px">
      <div class="chab-code" onclick="navigator.clipboard.writeText('${code}').then(()=>{try{showToast('Скопировано','📋')}catch{}})">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".6"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        ${code}
      </div>
      <div style="font-size:11px;color:var(--t3);margin-top:8px">Нажми чтобы скопировать</div>
    </div>
    <div style="display:flex;justify-content:center"><button class="chab-btn-outline" onclick="hideChabModal()">Закрыть</button></div>`);
};

window.chabCreateRoom=function(){
  window._chabRoomIcon='🤝';
  showChabModal(`<div class="chab-modal-title">Новый совместный трекер</div>
    <div class="chab-modal-sub">Создай трекер, добавь привычки и пригласи друзей соревноваться</div>
    <input id="chabRoomName" placeholder="Название трекера" style="width:100%;padding:11px 13px;border-radius:10px;border:0.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:var(--t1);font-size:14px;font-family:'DM Sans',sans-serif;outline:none;box-sizing:border-box;margin-bottom:12px;transition:border-color .15s" onfocus="this.style.borderColor='rgba(168,85,247,.55)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'" onkeydown="if(event.key==='Enter')chabDoCreate()">
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px">${['🤝','🏃','🧘','📚','💪','🔥','⚡','🌱','🎯','🧠'].map(e=>`<button onclick="this.parentNode.querySelectorAll('button').forEach(b=>b.style.outline='');this.style.outline='2px solid #a855f7';window._chabRoomIcon='${e}'" style="width:36px;height:36px;border-radius:9px;border:0.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);font-size:18px;cursor:pointer">${e}</button>`).join('')}</div>
    <div style="display:flex;gap:8px;justify-content:flex-end"><button class="chab-btn-outline" onclick="hideChabModal()">Отмена</button><button class="chab-btn-purple" onclick="chabDoCreate()">Создать</button></div>`);
  setTimeout(function(){ var _el=document.getElementById('chabRoomName'); if(_el)_el.focus(); },100);
};

window.chabDoCreate=async function(){
  var _inp1=document.getElementById('chabRoomName');
  var name=_inp1?_inp1.value.trim():'';
  if(!name){ if(_inp1){_inp1.style.borderColor='rgba(255,69,58,.5)';_inp1.focus();} return; }

  var sb=getSB(), user=getUser();
  if(!sb){ showToast('Ошибка: нет подключения к базе','❌'); return; }
  if(!user){ showToast('Ошибка: войдите в аккаунт','❌'); return; }

  // Show loading state on button
  var btn=document.querySelector('#chabModal .chab-btn-purple');
  if(btn){ btn.textContent='Создаём...'; btn.disabled=true; }

  try {
    var code=mkCode();
    var res1=await sb.from('collab_habit_rooms').insert({
      name:name,
      icon:window._chabRoomIcon||'🤝',
      owner_id:user.id,
      invite_code:code
    }).select();

    if(res1.error) throw res1.error;
    var room=res1.data&&res1.data[0];
    if(!room) throw new Error('Комната не создана');

    var res2=await sb.from('collab_habit_members').insert({
      room_id:room.id,
      user_id:user.id,
      role:'owner'
    });
    if(res2.error) throw res2.error;

    hideChabModal();
    showToast('Трекер создан!','🤝');
    setTimeout(function(){
      renderCollabView();
      setTimeout(function(){ chabShowCode(code); }, 600);
    }, 300);

  } catch(e){
    console.error('chabDoCreate error:', e);
    var msg=e&&e.message?e.message:'Неизвестная ошибка';
    showToast('Ошибка: '+msg,'❌');
    if(btn){ btn.textContent='Создать'; btn.disabled=false; }
  }
};

window.chabJoinRoom=function(){
  showChabModal(`<div class="chab-modal-title">Войти по коду</div>
    <div class="chab-modal-sub">Введи код приглашения от участника трекера</div>
    <input id="chabJoinCode" placeholder="XXXXXX" maxlength="6" style="width:100%;padding:14px 13px;border-radius:10px;border:0.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:#c084fc;font-size:22px;font-family:'DM Mono',monospace;outline:none;box-sizing:border-box;letter-spacing:.2em;text-align:center;text-transform:uppercase;margin-bottom:18px;transition:border-color .15s" onfocus="this.style.borderColor='rgba(168,85,247,.55)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'" oninput="this.value=this.value.toUpperCase()" onkeydown="if(event.key==='Enter')chabDoJoin()">
    <div style="display:flex;gap:8px;justify-content:flex-end"><button class="chab-btn-outline" onclick="hideChabModal()">Отмена</button><button class="chab-btn-purple" onclick="chabDoJoin()">Войти</button></div>`);
  setTimeout(function(){ var _el=document.getElementById('chabJoinCode'); if(_el)_el.focus(); },100);
};

window.chabDoJoin=async function(){
  var inp=document.getElementById('chabJoinCode');
  var code=inp?inp.value.trim().toUpperCase():'';
  if(code.length<4){ if(inp){inp.style.borderColor='rgba(255,69,58,.5)';inp.focus();} return; }

  var sb=getSB(), user=getUser();
  if(!sb||!user){ try{showToast('Войди в аккаунт','❌');}catch{} return; }

  var btn=document.querySelector('#chabModal .chab-btn-purple');
  if(btn){ btn.textContent='Входим...'; btn.disabled=true; }

  try {
    // Try exact match first, then case-insensitive
    var res1 = await sb.from('collab_habit_rooms')
      .select('id,name,invite_code')
      .eq('invite_code', code)
      .maybeSingle();

    var room = res1.data;

    // Fallback: ilike (case-insensitive) if not found
    if(!room && !res1.error){
      var res1b = await sb.from('collab_habit_rooms')
        .select('id,name,invite_code')
        .ilike('invite_code', code)
        .maybeSingle();
      room = res1b.data;
    }

    if(!room){
      var errDetail = res1.error ? ' ('+res1.error.message+')' : '';
      try{showToast('Код не найден. Проверь и попробуй снова'+errDetail,'❌');}catch{}
      if(inp){ inp.style.borderColor='rgba(255,69,58,.5)'; }
      if(btn){ btn.textContent='Войти'; btn.disabled=false; }
      return;
    }

    // Check if already member
    var res2 = await sb.from('collab_habit_members')
      .select('id').eq('room_id',room.id).eq('user_id',user.id).maybeSingle();
    if(res2.error) throw res2.error;

    if(!res2.data){
      var res3 = await sb.from('collab_habit_members')
        .insert({room_id:room.id, user_id:user.id, role:'member'});
      if(res3.error) throw res3.error;
    }

    hideChabModal();
    try{showToast('Вступил в «'+room.name+'»! 🎉','🤝');}catch{}
    setTimeout(renderCollabView, 400);

  } catch(e){
    console.error('chabDoJoin error:', e);
    var msg = e&&e.message ? e.message : 'Неизвестная ошибка';
    try{showToast('Ошибка: '+msg,'❌');}catch{}
    if(btn){ btn.textContent='Войти'; btn.disabled=false; }
  }
};

window.chabAddHabit=function(roomId){
  window._chabHabIcon = '📚';
  window._chabHabColor = '#a855f7';
  window._chabHabFreq = 'daily';
  window._chabRoomId = roomId;

  window._chabPickEmoji = function(el, icon){
    window._chabHabIcon = icon;
    document.querySelectorAll('.chab-ep').forEach(function(b){ b.classList.remove('sel'); });
    el.classList.add('sel');
  };
  window._chabPickColor = function(el, color){
    window._chabHabColor = color;
    document.querySelectorAll('.chab-cp').forEach(function(d){ d.classList.remove('sel'); });
    el.classList.add('sel');
  };
  window._chabPickFreq = function(el, freq){
    window._chabHabFreq = freq;
    document.querySelectorAll('.chab-freq-btn').forEach(function(b){ b.classList.remove('sel'); });
    el.classList.add('sel');
  };

  const EMOJIS = ['📚','🏃','🧘','💪','💧','🎯','✍️','☀️','🧠','🔥','🎨','🎸','🥗','😴','🌿','🚴','🏊','💊','🧹','🌙','💻','📝','🧪','🎵','🦷','🏋️','🚶','🍵','⚡','🌸','🎮','🥤'];
  const COLORS = ['#a855f7','#F5C842','#22C55E','#3B82F6','#EF4444','#F97316','#06B6D4','#EC4899','#8B5CF6','#14B8A6','#84CC16','#F59E0B'];

  const emojiBtns = EMOJIS.map(function(e,idx){
    return '<button class="chab-ep'+(idx===0?' sel':'')+'" onclick="_chabPickEmoji(this,\''+e+'\')">'+e+'</button>';
  }).join('');

  const colorDots = COLORS.map(function(c,idx){
    return '<div class="chab-cp'+(idx===0?' sel':'')+'" onclick="_chabPickColor(this,\''+c+'\')" style="background:'+c+'"></div>';
  }).join('');

  const freqBtns = [
    {v:'daily',l:'Каждый день'},
    {v:'weekdays',l:'Будни'},
    {v:'weekend',l:'Выходные'},
  ].map(function(f){
    return '<button class="chab-freq-btn'+(f.v==='daily'?' sel':'')+'" onclick="_chabPickFreq(this,\''+f.v+'\')">'+f.l+'</button>';
  }).join('');

  showChabModal(
    '<div class="chab-modal-header">' +
      '<div class="chab-modal-title">Новая привычка</div>' +
      '<div class="chab-modal-sub" style="margin-top:4px;margin-bottom:18px">Общая для всех участников трекера</div>' +
    '</div>' +
    '<div class="chab-modal-body">' +
      '<div class="chab-field">' +
        '<label class="chab-field-lbl">Название</label>' +
        '<input id="chabHabName" placeholder="Читать 30 мин, Спорт, Медитация..." autocomplete="off" ' +
        'style="width:100%;padding:13px 15px;border-radius:12px;border:1.5px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);color:var(--t1);font-size:15px;font-family:\'DM Sans\',sans-serif;outline:none;box-sizing:border-box;transition:border-color .18s,background .18s" ' +
        'onfocus="this.style.borderColor=\'rgba(168,85,247,.6)\';this.style.background=\'rgba(168,85,247,.06)\'" ' +
        'onblur="this.style.borderColor=\'rgba(255,255,255,.08)\';this.style.background=\'rgba(255,255,255,.04)\'" ' +
        'onkeydown="if(event.key===\'Enter\')chabDoAddHabit(window._chabRoomId)">' +
      '</div>' +
      '<div class="chab-field">' +
        '<label class="chab-field-lbl">Иконка</label>' +
        '<div class="chab-emoji-grid">' + emojiBtns + '</div>' +
      '</div>' +
      '<div class="chab-field">' +
        '<label class="chab-field-lbl">Цвет</label>' +
        '<div class="chab-color-row">' + colorDots + '</div>' +
      '</div>' +
      '<div class="chab-field" style="margin-bottom:0">' +
        '<label class="chab-field-lbl">Частота</label>' +
        '<div class="chab-freq-row">' + freqBtns + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="chab-modal-footer">' +
      '<button class="chab-btn-outline" onclick="hideChabModal()" style="padding:11px 20px;border-radius:12px;font-size:14px">Отмена</button>' +
      '<button class="chab-btn-purple" onclick="chabDoAddHabit(window._chabRoomId)">Добавить</button>' +
    '</div>'
  );

  setTimeout(function(){
    var el = document.getElementById('chabHabName');
    if(el) el.focus();
  }, 80);
};

window.chabDoAddHabit=async function(roomId){
  var inp = document.getElementById('chabHabName');
  var name = inp ? inp.value.trim() : '';
  if(!name){ if(inp){ inp.style.borderColor='rgba(255,69,58,.5)'; inp.focus(); } return; }

  var sb = getSB();
  if(!sb){ try{showToast('Ошибка подключения','❌');}catch{} return; }

  var btn = document.querySelector('#chabModal .chab-btn-purple');
  if(btn){ btn.textContent='Добавляем...'; btn.disabled=true; }

  try {
    // Сначала пробуем с freq (если колонка есть в таблице)
    var res = await sb.from('collab_habits').insert({
      room_id: roomId,
      name: name,
      icon: window._chabHabIcon||'📚',
      color: window._chabHabColor||'#a855f7',
      freq: window._chabHabFreq||'daily',
      active: true
    });

    // Если 400 — скорее всего нет колонки freq, пробуем без неё
    if(res.error){
      var errMsg = (res.error.message||'')+(res.error.details||'');
      var needsFreqCol = errMsg.includes('freq') || errMsg.includes('column') || res.error.code==='42703';
      if(needsFreqCol || res.error.code==='PGRST204' || !errMsg){
        var res2 = await sb.from('collab_habits').insert({
          room_id: roomId,
          name: name,
          icon: window._chabHabIcon||'📚',
          color: window._chabHabColor||'#a855f7',
          active: true
        });
        if(res2.error) throw res2.error;
      } else {
        throw res.error;
      }
    }

    hideChabModal();
    try{showToast('Привычка добавлена', window._chabHabIcon||'📚');}catch{}
    setTimeout(renderCollabView, 300);
  } catch(e){
    console.error('chabDoAddHabit error:', e);
    var msg = e&&e.message ? e.message : (e&&e.details ? e.details : 'Ошибка сохранения');
    try{showToast('Ошибка: '+msg,'❌');}catch{}
    if(btn){ btn.textContent='Добавить'; btn.disabled=false; }
  }
};

window.chabDeleteHabit=async function(roomId, habitId){
  if(!confirm('Удалить эту привычку?\nВся история выполнения будет потеряна.')) return;
  var sb=getSB(), user=getUser(); if(!sb||!user) return;
  try {
    // Сначала пробуем soft-delete (UPDATE active=false)
    var res = await sb.from('collab_habits')
      .update({active:false})
      .eq('id', habitId)
      .eq('room_id', roomId);

    // Если RLS блокирует UPDATE — пробуем жёсткое удаление
    if(res.error){
      var res2 = await sb.from('collab_habits')
        .delete()
        .eq('id', habitId)
        .eq('room_id', roomId);
      if(res2.error) throw res2.error;
    }

    try{showToast('Привычка удалена','🗑️');}catch{}
    setTimeout(renderCollabView, 300);
  } catch(e){
    console.error('chabDeleteHabit:', e);
    var msg = e&&e.message ? e.message : 'Ошибка удаления';
    try{showToast('Ошибка: '+msg,'❌');}catch{}
  }
};

window.chabDeleteRoom=async function(roomId){
  if(!confirm('Удалить этот совместный трекер? Все данные будут потеряны.'))return;
  const sb=getSB(),user=getUser();
  try { await sb.from('collab_habit_rooms').delete().eq('id',roomId).eq('owner_id',user.id); try{showToast('Трекер удалён','🗑️');}catch{} setTimeout(renderCollabView,300); }catch(e){console.error(e);}
};

function subscribeRealtime(roomIds){
  if(!roomIds.length)return;
  const sb=getSB();if(!sb)return;
  if(_chabSub){try{sb.removeChannel(_chabSub);}catch{}}
  _chabSub=sb.channel('collab_habits_rt').on('postgres_changes',{event:'*',schema:'public',table:'collab_habit_logs'},()=>{ if(_chabMode==='collab')renderCollabView(); }).subscribe();
}

function showChabModal(html){
  const ov=document.getElementById('chabModalOv'),box=document.getElementById('chabModal');
  if(!ov||!box)return;
  box.innerHTML=html;
  ov.style.display='flex';
}
window.hideChabModal=function(){
  const ov=document.getElementById('chabModalOv');
  if(ov)ov.style.display='none';
};
document.addEventListener('click',e=>{ if(e.target.id==='chabModalOv')window.hideChabModal(); });

function _todayStr(){ const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function _getWeekStart(){ const d=new Date(),dow=d.getDay()||7;d.setDate(d.getDate()-dow+1);d.setHours(0,0,0,0);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function _getWeekDays(){ const d=new Date(),dow=d.getDay()||7;d.setDate(d.getDate()-dow+1);d.setHours(0,0,0,0);return Array.from({length:7},(_,i)=>{const x=new Date(d);x.setDate(x.getDate()+i);return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`;}); }

// Hook showTab
const _origST=window.showTab;
window.showTab=function(t,btn,skip){
  if(_origST)_origST.call(this,t,btn,skip);
  if(t==='habits'){
    // FIX: always open personal tracker first on every visit
    if(_chabMode !== 'personal'){
      _chabMode = 'personal';
      localStorage.setItem(CHAB_MODE_KEY, 'personal');
    }
    // Run at 120ms — after HabTracker's 60ms render completes
    setTimeout(function(){
      var root=document.getElementById('hab-root');
      if(!root) return;

      // Personal: HabTracker already rendered. Just ensure mode bar is present.
      var bar=document.getElementById('habModeBar');
      if(!bar){ renderModeBar(root); }
      else if(bar.parentNode!==root){ root.insertBefore(bar, root.firstChild); }
      // Sync button states
      root.querySelectorAll('.hab-mode-btn').forEach(function(b){
        b.classList.toggle('active', b.dataset.mode==='personal');
        b.classList.toggle('collab', false);
      });
    }, 120);
  }
};

window.renderCollabView=renderCollabView;
})();



/* ═══════════════════════════════════════════════════════════════
   DTR ANIMATION ORCHESTRATOR v4.0 — Apple-grade motion engine
   Принципы: RAF-based, GPU-only (transform+opacity), purposeful
   stagger cascade, zero layout thrash, spring physics everywhere
═══════════════════════════════════════════════════════════════ */
(function DTRMotion() {
  'use strict';

  const raf = (fn) => requestAnimationFrame(fn);
  const EASE = {
    spring:  'cubic-bezier(0.34, 1.56, 0.64, 1)',
    expo:    'cubic-bezier(0.16, 1, 0.3, 1)',
    quart:   'cubic-bezier(0.25, 1, 0.5, 1)',
    smooth:  'cubic-bezier(0.42, 0, 0.58, 1)',
  };

  /* ════════════════════════════════════════════
     1. BUTTON RIPPLE — Global pointer handler
  ════════════════════════════════════════════ */
  document.addEventListener('pointerdown', (e) => {
    const btn = e.target.closest(
      '.btn-auth,.btn-cs,.lh-btn-go,.nb-p,.seg-btn,.btn-ol,.btn-demo,.t-sbtn,.arena-mode-btn'
    );
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;
    const r = document.createElement('span');
    r.className = 'dtr-ripple';
    Object.assign(r.style, {
      width: size + 'px', height: size + 'px',
      left: x + 'px',    top:  y + 'px',
    });
    btn.style.overflow = 'hidden';
    btn.style.position = btn.style.position || 'relative';
    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
  }, { passive: true });

  /* ════════════════════════════════════════════
     2. KPI CARD 3D TILT — Perspective physics
  ════════════════════════════════════════════ */
  function initKpiTilt(root) {
    const target = root || document;
    target.querySelectorAll('.kpi').forEach(card => {
      if (card._tiltInit) return;
      card._tiltInit = true;
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
        const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
        card.style.transition = 'none';
        card.style.transform =
          `perspective(700px) rotateX(${-dy * 7}deg) rotateY(${dx * 7}deg) translateY(-3px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = `transform .45s ${EASE.spring}`;
        card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* ════════════════════════════════════════════
     3. NUMBER COUNTER — Eased count-up
  ════════════════════════════════════════════ */
  function countUp(el, from, to, ms, decimals) {
    if (!el || isNaN(to) || to === 0) return;
    const start = performance.now();
    const diff  = to - from;
    const dec   = decimals ?? (to % 1 !== 0 ? 1 : 0);
    function tick(now) {
      const p = Math.min((now - start) / ms, 1);
      const eased = 1 - Math.pow(2, -10 * p);           // ease-out-expo
      el.textContent = (from + diff * eased).toFixed(dec);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* Patch renderHeroZone — animate ONLY the numbers after values are set */
  function watchHeroStats() {
    // Replaced by renderHeroZone patch below — this is a no-op
  }

  const _origRHZ = window.renderHeroZone;
  window.renderHeroZone = function() {
    if (_origRHZ) _origRHZ.apply(this, arguments);
    // Numbers: animate in after the original function sets real values
    const statIds   = ['heroTodayHrs','heroStreakVal','heroWeekHrs','heroTotalHrs'];
    const msgIds    = ['heroTodayMsg'];
    statIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      // Force reflow then play animation
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = `dtrStatReveal .55s cubic-bezier(0.16,1,0.3,1) ${i * 65}ms both`;
      // Clean animation property after it finishes so CSS doesn't lock the element
      setTimeout(() => { if(el) el.style.animation = ''; }, 600 + i * 65);
    });
    // Message text: simple fade
    msgIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = 'dtrStatReveal .4s cubic-bezier(0.16,1,0.3,1) 200ms both';
      setTimeout(() => { if(el) el.style.animation = ''; }, 700);
    });
  };

  /* ════════════════════════════════════════════
     4. STAGGER CASCADE — core utility
  ════════════════════════════════════════════ */
  function stagger(selector, { baseDelay = 0, step = 55, duration = 380,
    fromX = 0, fromY = 16, scale = 0.95, root = document } = {}) {
    const els = root.querySelectorAll(selector);
    if (!els.length) return;
    els.forEach((el, i) => {
      const delay = baseDelay + i * step;
      el.style.opacity = '0';
      el.style.transform = `translate(${fromX}px, ${fromY}px) scale(${scale})`;
      setTimeout(() => {
        el.style.transition =
          `opacity ${duration}ms ${EASE.expo}, transform ${duration}ms ${EASE.spring}`;
        el.style.opacity = '1';
        el.style.transform = 'translate(0,0) scale(1)';
        setTimeout(() => {
          el.style.transition = '';
          el.style.transform  = '';
        }, duration + delay + 50);
      }, delay);
    });
  }

  /* ════════════════════════════════════════════
     5. DASHBOARD ENTRANCE ORCHESTRATOR
  ════════════════════════════════════════════ */
  let _dashEntered = false;

  function orchestrateDashboard() {
    if (_dashEntered) return;
    _dashEntered = true;

    const hero    = document.getElementById('dashHeroZone');
    const kpiRow  = document.getElementById('kpiRow');
    const chart   = document.querySelector('.bar-chart');
    const cats    = document.getElementById('catBreakdown');
    const insight = document.getElementById('insightRow');
    const recs    = document.getElementById('recGrid');
    const forecast= document.getElementById('forecastRow');
    const mot     = document.getElementById('motBanner');
    const lgMini  = document.getElementById('lgMini');
    const achMini = document.getElementById('achMini');
    const sessList= document.getElementById('sessList');
    const dailyCard = document.querySelector('#dailyProgressBar')?.closest('.card');

    // Phase 1: hero zone — always visible, no jump (was hiding then showing which caused flash)
    if (hero) {
      // Ensure it's never hidden from a previous stagger call
      hero.style.opacity = '';
      hero.style.transform = '';
      hero.style.filter = '';
      hero.style.transition = '';
    }

    // Phase 2: KPI row (stagger cascade, 280ms start)
    setTimeout(() => {
      stagger('.kpi', { baseDelay: 0, step: 65, duration: 400, fromY: 18, scale: 0.93 });
      setTimeout(initKpiTilt, 600);
    }, 280);

    // Phase 3: chart + cat (450ms)
    setTimeout(() => {
      const chartWrap = chart ? chart.parentElement : null;
      if (chartWrap) {
        chartWrap.style.opacity = '0';
        chartWrap.style.transform = 'translateY(14px)';
        chartWrap.style.transition = `opacity .5s ${EASE.expo}, transform .5s ${EASE.spring}`;
        raf(() => {
          chartWrap.style.opacity = '1';
          chartWrap.style.transform = 'translateY(0)';
        });
      }
      stagger('.cat-item', { baseDelay: 60, step: 50, duration: 360, fromX: -12, fromY: 0, scale: 1 });
    }, 450);

    // Phase 4: insights + recs (620ms)
    setTimeout(() => {
      stagger('.insight-card, .ins-card, .kpi.insight', { baseDelay: 0, step: 60, duration: 360, fromY: 14, scale: 0.95 });
      stagger('.rec-card, .rec-item', { baseDelay: 80, step: 50, duration: 340, fromY: 12, scale: 0.96 });
    }, 620);

    // Phase 5: sidebar cards — appear instantly, no stagger (no jump on refresh)
    // achMini (Зал Славы) stays static — no animation per user request

    // Section headers
    setTimeout(() => {
      document.querySelectorAll('[id^="sec_"]').forEach((el, i) => {
        el.style.animationDelay = (i * 60) + 'ms';
        el.classList.add('dtr-anim-sec');
      });
    }, 380);

    // Animate progress bars after a beat
    setTimeout(animateBars, 900);
  }

  // Expose globally so external code can reset + re-trigger
  window.DTROrchestrate = orchestrateDashboard;
  Object.defineProperty(window, '_dtrDashEntered', {
    get: () => _dashEntered,
    set: (v) => { _dashEntered = v; },
    configurable: true,
  });

  /* ════════════════════════════════════════════
     6. AMBIENT PARTICLES — hero zone
  ════════════════════════════════════════════ */
  function spawnParticles(container, count) {
    if (!container || container._particlesInit) return;
    container._particlesInit = true;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'dtr-particle';
      const left   = 15 + Math.random() * 70;
      const delay  = Math.random() * 5;
      const dur    = 3.5 + Math.random() * 5;
      const drift  = (Math.random() - 0.5) * 70;
      const size   = 1.5 + Math.random() * 2;
      Object.assign(p.style, {
        left:             left + '%',
        bottom:           (5 + Math.random() * 20) + '%',
        '--drift':        drift + 'px',
        animationDelay:   delay + 's',
        animationDuration: dur + 's',
        width:  size + 'px',
        height: size + 'px',
        opacity: '0',
      });
      container.style.position = 'relative';
      container.appendChild(p);
    }
  }

  /* ════════════════════════════════════════════
     7. PROGRESS BAR ANIMATOR
  ════════════════════════════════════════════ */
  function animateBars() {
    document.querySelectorAll('.ci-bar, .lr-bar, .cbd-bar').forEach((bar, i) => {
      const target = bar.style.width || '0%';
      if (!bar._animated) {
        bar._animated = true;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.transition = `width .7s ${EASE.expo}`;
          bar.style.width = target;
        }, i * 60);
      }
    });
    // Chart bars scaleY
    document.querySelectorAll('.bc-bar').forEach((bar, i) => {
      if (!bar._animated) {
        bar._animated = true;
        const origH = bar.style.height;
        bar.style.transformOrigin = 'bottom';
        bar.style.transform = 'scaleY(0)';
        setTimeout(() => {
          bar.style.transition = `transform .55s ${EASE.spring}`;
          bar.style.transform = 'scaleY(1)';
        }, i * 45);
      }
    });
  }

  /* ════════════════════════════════════════════
     8. LEAGUE ROWS STAGGER
  ════════════════════════════════════════════ */
  function staggerLeagueRows(root) {
    const r = root || document;
    const rows = r.querySelectorAll('.lg-row:not([data-staggered])');
    rows.forEach((row, i) => {
      row.setAttribute('data-staggered', '1');
      row.style.opacity = '0';
      row.style.transform = 'translateX(-14px)';
      setTimeout(() => {
        row.style.transition = `opacity .35s ${EASE.expo}, transform .35s ${EASE.spring}`;
        row.style.opacity = '1';
        row.style.transform = 'translateX(0)';
      }, 40 + i * 42);
    });
  }

  /* ════════════════════════════════════════════
     9. TOAST ENHANCEMENT — Progress bar + spring
  ════════════════════════════════════════════ */
  const _origShowToast = window.showToast;
  window.showToast = function(msg, icon, isAch, sub) {
    if (_origShowToast) _origShowToast.call(this, msg, icon, isAch, sub);
    // Add progress bar to toast after it shows
    const toast = document.getElementById('toast');
    if (!toast) return;
    // Remove old progress bar if exists
    const old = toast.querySelector('.dtr-toast-progress');
    if (old) old.remove();
    const bar = document.createElement('div');
    bar.className = 'dtr-toast-progress';
    toast.style.position = 'relative';
    toast.appendChild(bar);
  };

  /* ════════════════════════════════════════════
     10. TAB TRANSITION ENHANCER
  ════════════════════════════════════════════ */
  const _origShowTab = window.showTab;
  window.showTab = function(name, el, skip) {
    if (_origShowTab) _origShowTab.call(this, name, el, skip);

    // Re-init tilt + run stagger for the activated tab
    setTimeout(() => {
      const pane = document.getElementById('tab-' + name);
      if (!pane) return;
      initKpiTilt(pane);
      // staggerLeagueRows защищён data-staggered — безопасно вызывать для всех табов.
      // Дублировать внутри if(name==='leagues') не нужно — строка выше уже покрывает это.
      staggerLeagueRows(pane);

      if (name === 'dash') {
        _dashEntered = false;
        orchestrateDashboard();
      }
    }, 80);
  };

  /* ════════════════════════════════════════════
     11. MutationObserver — Watch rendered content
  ════════════════════════════════════════════ */
  const _contentObserver = new MutationObserver((mutations) => {
    let hasKpi = false, hasLg = false, hasBars = false;
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (!node.querySelector) return;
        if (node.querySelector('.kpi') || node.classList?.contains('kpi')) hasKpi = true;
        if (node.querySelector('.lg-row') || node.classList?.contains('lg-row')) hasLg = true;
        if (node.querySelector('.ci-bar, .lr-bar, .bc-bar')) hasBars = true;
        if (node.querySelector('.msg-bubble')) {
          node.querySelectorAll('.msg-bubble').forEach((b, i) => {
            b.style.animationDelay = (i * 40) + 'ms';
          });
        }
      });
    });
    if (hasKpi) setTimeout(() => { stagger('.kpi:not([data-staggered])', { baseDelay:0, step:60, fromY:16, scale:0.94 }); setTimeout(initKpiTilt, 400); }, 30);
    if (hasLg)  setTimeout(() => staggerLeagueRows(), 30);
    if (hasBars) setTimeout(animateBars, 80);
  });

  /* ════════════════════════════════════════════
     12. ONBOARDING — orchestrated entrance
  ════════════════════════════════════════════ */
  function initOnboarding() {
    const onboard = document.getElementById('onboard');
    if (!onboard || onboard._animated) return;
    onboard._animated = true;
    const bannerWrap = onboard.querySelector('.banner-wrap');
    const authWrap   = onboard.querySelector('.auth-wrap');
    if (bannerWrap) bannerWrap.classList.add('dtr-banner-enter');
    if (authWrap)   authWrap.classList.add('dtr-auth-enter');
  }

  /* ════════════════════════════════════════════
     13. TIMER PANEL — visual state enhancement
  ════════════════════════════════════════════ */
  function watchTimer() {
    const panel  = document.querySelector('.timer-panel');
    const display = document.getElementById('qDisp');
    if (!display) return;

    let last = '';
    let isRunning = false;

    const runObs = new MutationObserver(() => {
      const nowRunning = display.classList.contains('run');
      if (nowRunning !== isRunning) {
        isRunning = nowRunning;
        if (panel) panel.classList.toggle('running', isRunning);
      }
      // Digit tick on second change
      const cur = display.textContent;
      if (cur !== last) {
        last = cur;
        if (isRunning) {
          display.style.transition = 'transform .08s ease';
          display.style.transform  = 'scale(1.025)';
          setTimeout(() => {
            display.style.transform  = 'scale(1)';
          }, 100);
        }
      }
    });
    runObs.observe(display, { childList: true, characterData: true, subtree: true, attributes: true });
  }

  /* ════════════════════════════════════════════
     14. SCROLL REVEAL
  ════════════════════════════════════════════ */
  function initScrollReveal() {
    if (!window.IntersectionObserver) return;
    const selectors = '.mg-item,.cat-item,.insight-card,.rec-card,.rec-item,.csg-item'; // .ach2/.ai removed — staggerList handles them
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (!el._revealed) {
            el._revealed = true;
            el.classList.add('dtr-will-reveal');
            setTimeout(() => el.classList.add('dtr-revealed'), 40);
          }
          io.unobserve(el);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll(selectors).forEach(el => {
      if (!el._ioInit) { el._ioInit = true; io.observe(el); }
    });
  }

  /* ════════════════════════════════════════════
     15. PATCH: renderDash — trigger animations
  ════════════════════════════════════════════ */
  const _origRenderDash = window.renderDash;
  window.renderDash = function() {
    const result = _origRenderDash ? _origRenderDash.apply(this, arguments) : undefined;
    setTimeout(() => {
      initKpiTilt();
      animateBars();
      stagger('.cat-item', { baseDelay: 100, step: 45, fromX: -10, fromY: 0, scale: 1, duration: 350 });
    }, 120);
    return result;
  };

  /* ════════════════════════════════════════════
     16. PATCH: renderLeagues — stagger rows
  ════════════════════════════════════════════ */
  const _origRenderLeagues = window.renderLeagues;
  window.renderLeagues = function() {
    const result = _origRenderLeagues ? _origRenderLeagues.apply(this, arguments) : undefined;
    setTimeout(staggerLeagueRows, 100);
    return result;
  };

  /* ════════════════════════════════════════════
     17. AVATAR SELECT — spring pop
  ════════════════════════════════════════════ */
  document.addEventListener('click', (e) => {
    const avOpt = e.target.closest('.av-opt');
    if (!avOpt) return;
    avOpt.style.transform = 'scale(0.82)';
    avOpt.style.transition = `transform .35s ${EASE.spring}`;
    setTimeout(() => { avOpt.style.transform = 'scale(1.08)'; }, 40);
    setTimeout(() => { avOpt.style.transform = 'scale(1)'; }, 180);
  }, { passive: true });

  /* ════════════════════════════════════════════
     18. CHART HEADER (seg-btn) — pill transition
  ════════════════════════════════════════════ */
  document.addEventListener('click', (e) => {
    const segBtn = e.target.closest('.seg-btn');
    if (!segBtn) return;
    // Quick ripple-feedback on period toggle
    segBtn.style.transform = 'scale(0.94)';
    segBtn.style.transition = `transform .2s ${EASE.spring}`;
    setTimeout(() => { segBtn.style.transform = ''; }, 200);
  }, { passive: true });

  /* ════════════════════════════════════════════
     INIT
  ════════════════════════════════════════════ */
  function init() {
    // Observe main content areas
    const areas = [
      document.querySelector('.main'),
      document.getElementById('tab-dash'),
      document.getElementById('tab-leagues'),
      document.getElementById('leaguesContent'),
      document.getElementById('achFull'),
      document.getElementById('achMini'),
      document.getElementById('lgMini'),
    ].filter(Boolean);
    areas.forEach(a => _contentObserver.observe(a, { childList: true, subtree: true }));

    // Onboarding
    initOnboarding();

    // Hero stat watchers
    // watchHeroStats replaced by renderHeroZone patch

    // Timer watcher
    watchTimer();

    // Dashboard entrance (if already active)
    const dash = document.getElementById('tab-dash');
    if (dash && dash.classList.contains('active')) {
      setTimeout(orchestrateDashboard, 600);
    }

    // Scroll reveal
    setTimeout(initScrollReveal, 1200);

    // KPI tilt — initial run
    setTimeout(initKpiTilt, 800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 0);
  }

})();
