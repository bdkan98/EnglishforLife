(function(){
'use strict';
if(window.__kanddSidebarLoaded)return;window.__kanddSidebarLoaded=true;
const script=document.currentScript;
const root=new URL('./',script.src);
function injectStyle(file){if(document.querySelector('[data-kandd-style="'+file+'"]'))return;const el=document.createElement('link');el.rel='stylesheet';el.href=new URL(file,root).href;el.dataset.kanddStyle=file;document.head.appendChild(el)}
function injectScript(file){if(document.querySelector('[data-kandd-script="'+file+'"]'))return;const el=document.createElement('script');el.src=new URL(file,root).href;el.defer=true;el.dataset.kanddScript=file;document.head.appendChild(el)}
injectStyle('kandd-floating-tools.css');
injectStyle('kandd-sidebar-behavior.css');
injectScript('kandd-floating-tools.js');
if(!document.querySelector('script[src*="pronunciation-helper"]'))injectScript('pronunciation-helper.js');
const url=(p)=>new URL(p,root).href;
const current=new URL(location.href);
const home=current.pathname.replace(/\/+$/,'/').endsWith('/index.html')||current.pathname===root.pathname||current.pathname===root.pathname.replace(/\/$/,'');
if(home)document.documentElement.classList.add('kandd-home');
const svg={home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',lessons:'<path d="M4 5c3-1 5-1 8 1 3-2 5-2 8-1v14c-3-1-5-1-8 1-3-2-5-2-8-1zM12 6v14"/>',pronunciation:'<path d="M5 9v6h4l5 4V5L9 9H5z"/><path d="M17 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>',translator:'<path d="M4 5h12M10 3v2M6 9c2 5 5 8 10 10M15 9c-2 5-5 8-10 10"/><path d="M14 14h7M17.5 11l3.5 9M17.5 11L14 20"/>',learning:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',applyTeach:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h3M14 15v5M11.5 17.5h5"/>',teacher:'<path d="M3 8 12 3l9 5-9 5zM7 11v5c3 3 7 3 10 0v-5M21 8v8"/>',contact:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',admin:'<path d="m12 2 8 4v6c0 5-3 8-8 10-5-2-8-5-8-10V6zM9 12l2 2 4-4"/>',account:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',out:'<path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>'};
const icon=(n)=>'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+svg[n]+'</svg>';
const nav=document.createElement('aside');nav.id='kandd-sidebar';nav.className=home?'kandd-expanded':'kandd-collapsed';nav.setAttribute('aria-label','Kandd Learning site navigation');
const links=[['lessons','Explore Lessons','level1.html']];
const header=document.createElement('div');header.className='kandd-side-head';header.innerHTML='<a class="kandd-brand-home" href="'+url('index.html')+'" title="Go to Kandd Learning homepage" aria-label="Kandd Learning homepage"><span class="kandd-side-logo">K</span><span class="kandd-side-name">Kandd Learning</span></a>';
const toggle=document.createElement('button');toggle.type='button';toggle.className='kandd-side-toggle';toggle.setAttribute('aria-label',home?'Collapse navigation':'Expand navigation');toggle.title='Expand or collapse menu';toggle.innerHTML=icon('menu');header.appendChild(toggle);nav.appendChild(header);
const list=document.createElement('nav');list.setAttribute('aria-label','Main links');nav.appendChild(list);
function add(key,label,path){const a=document.createElement('a');a.href=url(path);a.className='kandd-side-link';a.title=label;a.dataset.hoverLabel=label;a.innerHTML=icon(key)+'<span class="kandd-side-label"></span>';a.querySelector('span').textContent=label;if(new URL(a.href).pathname===current.pathname)a.setAttribute('aria-current','page');list.appendChild(a);return a;}
links.forEach(x=>add(...x));
const teacherDash=add('teacher','Dashboard','teacher/dashboard.html');teacherDash.hidden=true;
const studentDash=add('learning','My Learning','dashboard.html');studentDash.hidden=true;
const applyTeach=add('applyTeach','Apply to Teach','teacher-apply.html');
const contact=add('contact','Contact Us','contact.html');
const pronunciation=add('pronunciation','Pronunciation Helper','pronunciation.html');
const translator=add('translator','Spanish ↔ English Translator','translator.html');
const myTeacher=add('teacher','My Teacher','student/my-teacher.html');myTeacher.hidden=true;
const account=add('account','Sign In','login.html');
const admin=add('admin','Administrator','admin.html');admin.hidden=true;
// Reorder links for the signed-in role without duplicating any item.
function orderLinks(isTeacher){
 const order=isTeacher?[teacherDash,pronunciation,translator,linksEl,contact,admin,account,logout]:[studentDash,pronunciation,translator,myTeacher,linksEl,applyTeach,contact,admin,account,logout];
 order.forEach(el=>list.appendChild(el));
}
const linksEl=list.querySelector('a[href="'+url('level1.html')+'"]');

const logout=document.createElement('button');logout.type='button';logout.className='kandd-side-link kandd-side-logout';logout.title='Sign Out';logout.innerHTML=icon('out')+'<span class="kandd-side-label">Sign Out</span>';logout.hidden=true;list.appendChild(logout);
// The hamburger is the ONLY way to expand the full navigation. Hover on a
// collapsed item shows its own label, without resizing or shifting the page.
const pinKey='kandd-sidebar-pinned-v1';
let pinned=false;
try{pinned=localStorage.getItem(pinKey)==='true'}catch(e){}
const mobileMenu=()=>window.matchMedia('(max-width: 767px), (hover: none)').matches;
function applyState(){
 const expanded=pinned;
 nav.classList.toggle('kandd-expanded',expanded);
 nav.classList.toggle('kandd-collapsed',!expanded);
 document.documentElement.classList.toggle('kandd-side-expanded',expanded);
 document.documentElement.classList.toggle('kandd-side-collapsed',!expanded);
 // Always overlay the page when expanded; never push its contents sideways.
 document.documentElement.classList.toggle('kandd-side-overlay',expanded);
 toggle.setAttribute('aria-expanded',String(expanded));
 toggle.setAttribute('aria-label',expanded?'Close navigation menu':'Open navigation menu');
 toggle.title=expanded?'Close menu':'Open full menu';
}
function closeMenu(){pinned=false;try{localStorage.setItem(pinKey,'false')}catch(e){}applyState()}
toggle.addEventListener('click',()=>{
 pinned=!pinned;
 try{localStorage.setItem(pinKey,String(pinned))}catch(e){}
 applyState();
});
// Explicit hamburger openings stay open on mobile until dismissed or navigated.
document.addEventListener('pointerdown',e=>{if(pinned&&!nav.contains(e.target))closeMenu()},true);
list.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&pinned){closeMenu();toggle.focus()}});
window.addEventListener('resize',applyState);
if(mobileMenu())pinned=false;
applyState();

logout.addEventListener('click',async()=>{try{localStorage.removeItem('kandd-last-activity-v1');}catch(e){}try{if(window.kanddDb)await window.kanddDb.auth.signOut();else if(window.supabase){const client=window.supabase.createClient('https://hfqallzmxsmkiqmolzui.supabase.co','sb_publishable_O7ZvBkAu8JH939O0ylNOkA_Y7aYEnQr');await client.auth.signOut();}location.href=url('index.html')}catch(e){alert('Could not sign out. Please try again.')}});
// Five-minute INACTIVITY sign-out; warning at four minutes with a live countdown.
// Navigation, including the Kandd logo, never signs a user out.
const idleLimit=5*60*1000, warningAt=4*60*1000;
const activityKey='kandd-last-activity-v1';
let idleTimer=null, warningTimer=null, idleActive=false, signingOut=false, lastActivity=Date.now(), warningLatched=false;
const warning=document.createElement('div');warning.id='kandd-idle-warning';warning.hidden=true;
warning.setAttribute('role','alertdialog');warning.setAttribute('aria-modal','true');warning.setAttribute('aria-labelledby','kandd-idle-title');
warning.innerHTML='<div class="kandd-idle-panel"><h2 id="kandd-idle-title">Still there?</h2><p>For your security, you will be signed out after five minutes of inactivity.</p><p class="kandd-idle-countdown"><span id="kandd-idle-seconds">60</span> seconds remaining</p><button type="button" id="kandd-idle-stay">Stay Signed In</button></div>';
function getLastActivity(){try{const t=Number(localStorage.getItem(activityKey));return t>0?t:lastActivity;}catch(e){return lastActivity;}}
function hideWarning(){warning.hidden=true;warningLatched=false;}
function recordActivity(force=false){
 if(!idleActive||signingOut)return;
 // Once the four-minute warning begins, only an explicit button click may renew the session.
 if(!force && (warningLatched || !warning.hidden || Date.now()-getLastActivity()>=warningAt)){checkIdle();return;}
 lastActivity=Date.now();
 try{localStorage.setItem(activityKey,String(lastActivity));}catch(e){}
 hideWarning();
}
async function doIdleSignOut(){if(signingOut)return;signingOut=true;hideWarning();
 try{const db=window.kanddDb||(window.supabase&&window.supabase.createClient('https://hfqallzmxsmkiqmolzui.supabase.co','sb_publishable_O7ZvBkAu8JH939O0ylNOkA_Y7aYEnQr'));if(db)await db.auth.signOut();
  try{sessionStorage.setItem('kandd-idle-signed-out','1');}catch(e){}
  location.replace(url('account.html'));
 }catch(e){signingOut=false;alert('Your session has expired. Please use Sign Out to end your session.');}}
function checkIdle(){if(!idleActive||signingOut)return;
 const elapsed=Date.now()-(warningLatched?lastActivity:getLastActivity());
 if(elapsed>=idleLimit){doIdleSignOut();return;}
 if(elapsed>=warningAt){if(!warningLatched)lastActivity=getLastActivity();warningLatched=true;warning.hidden=false;const left=Math.max(1,Math.ceil((idleLimit-elapsed)/1000));warning.querySelector('#kandd-idle-seconds').textContent=String(left);}
 else if(!warningLatched)hideWarning();
}
function startIdle(){if(idleActive)return;idleActive=true;
 // Each authenticated page load starts a fresh idle window. Never inherit a stale
 // timestamp from a previous signed-out session (which caused instant logout).
 lastActivity=Date.now();
 try{localStorage.setItem(activityKey,String(lastActivity));}catch(e){}
 warningLatched=false;warning.hidden=true;
 if(!idleTimer)idleTimer=setInterval(checkIdle,1000);checkIdle();}
function stopIdle(){idleActive=false;hideWarning();if(idleTimer){clearInterval(idleTimer);idleTimer=null;}}
// Throttle mouse movement writes to avoid excessive localStorage activity.
let lastMotion=0;
for(const eventName of ['pointerdown','keydown','touchstart','scroll'])document.addEventListener(eventName,recordActivity,{passive:true});
document.addEventListener('pointermove',()=>{if(Date.now()-lastMotion>15000){lastMotion=Date.now();recordActivity();}},{passive:true});
window.addEventListener('storage',e=>{if(e.key===activityKey)checkIdle();});
window.addEventListener('pageshow',checkIdle);
warning.querySelector('#kandd-idle-stay').addEventListener('click',e=>{e.stopPropagation();recordActivity(true);});
const profile=document.createElement('div');profile.id='kandd-account-header';profile.setAttribute('aria-label','Account profile');
profile.innerHTML='<a class="kandd-profile-link" href="'+url('account.html')+'"><span class="kandd-avatar" aria-hidden="true">?</span><span class="kandd-profile-details"><strong class="kandd-profile-name">Account</strong><small class="kandd-profile-email">Sign in or create an account</small></span></a><button class="kandd-profile-signout" type="button" hidden>Sign Out</button>';
profile.querySelector('button').addEventListener('click',()=>logout.click());
function init(){orderLinks(false);document.body.prepend(nav);document.body.appendChild(warning);const top=document.querySelector('header.top');if(top){top.appendChild(profile);top.classList.add('kandd-profile-header');}else{const bar=document.createElement('header');bar.className='kandd-global-account-bar';bar.appendChild(profile);document.body.insertBefore(bar,nav.nextSibling);}applyState();updateAccount()}
function setProfile(user,firstName){
 const name=profile.querySelector('.kandd-profile-name'),email=profile.querySelector('.kandd-profile-email'),avatar=profile.querySelector('.kandd-avatar'),link=profile.querySelector('.kandd-profile-link'),out=profile.querySelector('.kandd-profile-signout');
 if(user){startIdle();const display=firstName||user.user_metadata?.full_name||user.user_metadata?.first_name||user.email?.split('@')[0]||'My Account';name.textContent=display;email.textContent=user.email||'My Learning';avatar.textContent=display.charAt(0).toUpperCase();link.href=url('dashboard.html');out.hidden=false;document.documentElement.classList.add('kandd-authenticated');}
 else{stopIdle();name.textContent='My Account';email.textContent='Sign In / Create Account';avatar.textContent='?';link.href=url('account.html');out.hidden=true;document.documentElement.classList.remove('kandd-authenticated');}
}

async function ensureAuthSdk(){
 if(window.kanddDb || window.supabase)return true;
 return new Promise(resolve=>{
  const existing=document.querySelector('script[data-kandd-auth-sdk]');
  if(existing){existing.addEventListener('load',()=>resolve(!!window.supabase),{once:true});existing.addEventListener('error',()=>resolve(false),{once:true});return;}
  const script=document.createElement('script');
  script.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  script.dataset.kanddAuthSdk='1';
  script.onload=()=>resolve(!!window.supabase);
  script.onerror=()=>resolve(false);
  document.head.appendChild(script);
 });
}
async function updateAccount(){try{
 await ensureAuthSdk();
 let db=window.kanddDb;
 if(!db && window.supabase)db=window.supabase.createClient('https://hfqallzmxsmkiqmolzui.supabase.co','sb_publishable_O7ZvBkAu8JH939O0ylNOkA_Y7aYEnQr');
 if(!db){setProfile(null);return;}
 const {data:{user},error}=await db.auth.getUser();if(error||!user){setProfile(null);return;}
 let firstName='';try{const {data:p}=await db.from('profiles').select('first_name').eq('user_id',user.id).maybeSingle();firstName=p?.first_name||'';}catch(e){}
 setProfile(user,firstName);
 // Homepage has a static Student Sign In link; reflect active sessions instead.
 if(home){document.querySelectorAll('header.top a[href$="login.html"]').forEach(a=>{
   if(/sign in|log in|student account/i.test(a.textContent.trim())){
     a.textContent='My Dashboard';
     a.href=url('dashboard.html');
     a.dataset.kanddDashboardLink='1';
   }
 });}
 account.hidden=true;logout.hidden=false;
 const [a,t]=await Promise.all([db.from('kandd_admins').select('user_id').eq('user_id',user.id).maybeSingle(),db.from('kandd_teacher_applications').select('status').eq('user_id',user.id).eq('status','approved').maybeSingle()]);
 admin.hidden=!a.data;
 const isTeacher=!!t.data;
 teacherDash.hidden=!isTeacher;
 studentDash.hidden=isTeacher;
 applyTeach.hidden=isTeacher;
 myTeacher.hidden=isTeacher;
 orderLinks(isTeacher);
 if(home)document.querySelectorAll('[data-kandd-dashboard-link]').forEach(a=>{
   a.href=url(isTeacher?'teacher/dashboard.html':'dashboard.html');
   a.textContent=isTeacher?'Dashboard':'My Learning';
 });
 // The profile header should lead to the correct dashboard for each account.
 profile.querySelector('.kandd-profile-link').href=url(isTeacher?'teacher/dashboard.html':'dashboard.html');
 const note=document.querySelector('body:has(#secureTeacherForm) .k-note');if(note)note.hidden=true;
 }catch(e){console.warn('Kandd profile: account status unavailable',e)} }
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();