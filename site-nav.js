(function(){
'use strict';
if(window.__kanddSidebarLoaded)return;window.__kanddSidebarLoaded=true;
const script=document.currentScript;
const root=new URL('./',script.src);
const url=(p)=>new URL(p,root).href;
const current=new URL(location.href);
const home=current.pathname.replace(/\/+$/,'/').endsWith('/index.html')||current.pathname===root.pathname||current.pathname===root.pathname.replace(/\/$/,'');
const svg={home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',lessons:'<path d="M4 5c3-1 5-1 8 1 3-2 5-2 8-1v14c-3-1-5-1-8 1-3-2-5-2-8-1zM12 6v14"/>',learning:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',teacher:'<path d="M3 8 12 3l9 5-9 5zM7 11v5c3 3 7 3 10 0v-5M21 8v8"/>',contact:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',admin:'<path d="m12 2 8 4v6c0 5-3 8-8 10-5-2-8-5-8-10V6zM9 12l2 2 4-4"/>',account:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',out:'<path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>'};
const icon=(n)=>'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+svg[n]+'</svg>';
const nav=document.createElement('aside');nav.id='kandd-sidebar';nav.className=home?'kandd-expanded':'kandd-collapsed';nav.setAttribute('aria-label','Kandd Learning site navigation');
const links=[['home','Homepage','index.html'],['lessons','Explore Lessons','level1.html'],['learning','My Learning','dashboard.html'],['teacher','Apply to Teach','teacher-apply.html'],['contact','Contact Us','contact.html']];
const header=document.createElement('div');header.className='kandd-side-head';header.innerHTML='<span class="kandd-side-logo">K</span><span class="kandd-side-name">Kandd Learning</span>';
const toggle=document.createElement('button');toggle.type='button';toggle.className='kandd-side-toggle';toggle.setAttribute('aria-label',home?'Collapse navigation':'Expand navigation');toggle.title='Expand or collapse menu';toggle.innerHTML=icon('menu');header.appendChild(toggle);nav.appendChild(header);
const list=document.createElement('nav');list.setAttribute('aria-label','Main links');nav.appendChild(list);
function add(key,label,path){const a=document.createElement('a');a.href=url(path);a.className='kandd-side-link';a.title=label;a.innerHTML=icon(key)+'<span class="kandd-side-label"></span>';a.querySelector('span').textContent=label;if(new URL(a.href).pathname===current.pathname)a.setAttribute('aria-current','page');list.appendChild(a);return a;}
links.forEach(x=>add(...x));
const account=add('account','Sign In / Account','account.html');
const admin=add('admin','Administrator','admin.html');admin.hidden=true;
const teacherDash=add('teacher','Teacher Dashboard','teacher/dashboard.html');teacherDash.hidden=true;
const logout=document.createElement('button');logout.type='button';logout.className='kandd-side-link kandd-side-logout';logout.title='Sign Out';logout.innerHTML=icon('out')+'<span class="kandd-side-label">Sign Out</span>';logout.hidden=true;list.appendChild(logout);
// Hover opens the menu temporarily; the menu button pins it open.
// Pin preference is remembered across pages on this browser.
const pinKey='kandd-sidebar-pinned-v1';
let pinned=false;
try{pinned=localStorage.getItem(pinKey)==='true';}catch(e){}
let hovering=false;
function applyState(){
 const expanded=home||pinned||hovering;
 nav.classList.toggle('kandd-expanded',expanded);
 nav.classList.toggle('kandd-collapsed',!expanded);
 const doc=document.documentElement;
 doc.classList.toggle('kandd-side-expanded',expanded);
 doc.classList.toggle('kandd-side-collapsed',!expanded);
 // A temporary hover floats above the page; pinning reserves full width.
 doc.classList.toggle('kandd-side-overlay',expanded&&!home&&!pinned);
 toggle.setAttribute('aria-pressed',String(pinned));
 toggle.setAttribute('aria-label',pinned?'Unpin navigation menu':'Pin navigation menu open');
 toggle.title=pinned?'Unpin menu (auto-collapse when pointer leaves)':'Pin menu open';
}
toggle.addEventListener('click',()=>{
 pinned=!pinned;
 try{localStorage.setItem(pinKey,String(pinned));}catch(e){}
 applyState();
});
nav.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'||e.pointerType==='pen'){hovering=true;applyState();}});
nav.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'||e.pointerType==='pen'){hovering=false;applyState();}});
// Keyboard users can explore the expanded menu with Tab.
nav.addEventListener('focusin',()=>{hovering=true;applyState();});
nav.addEventListener('focusout',e=>{if(!nav.contains(e.relatedTarget)){hovering=false;applyState();}});
logout.addEventListener('click',async()=>{try{if(window.kanddDb)await window.kanddDb.auth.signOut();else if(window.supabase){const client=window.supabase.createClient('https://hfqallzmxsmkiqmolzui.supabase.co','sb_publishable_O7ZvBkAu8JH939O0ylNOkA_Y7aYEnQr');await client.auth.signOut();}location.href=url('index.html')}catch(e){alert('Could not sign out. Please try again.')}});
const profile=document.createElement('div');profile.id='kandd-account-header';profile.setAttribute('aria-label','Account profile');
profile.innerHTML='<a class="kandd-profile-link" href="'+url('account.html')+'"><span class="kandd-avatar" aria-hidden="true">?</span><span class="kandd-profile-details"><strong class="kandd-profile-name">Account</strong><small class="kandd-profile-email">Sign in or create an account</small></span></a><button class="kandd-profile-signout" type="button" hidden>Sign Out</button>';
profile.querySelector('button').addEventListener('click',()=>logout.click());
function init(){document.body.prepend(nav);const top=document.querySelector('header.top');if(top){top.appendChild(profile);top.classList.add('kandd-profile-header');}else{const bar=document.createElement('header');bar.className='kandd-global-account-bar';bar.appendChild(profile);document.body.insertBefore(bar,nav.nextSibling);}applyState();updateAccount()}
function setProfile(user,firstName){
 const name=profile.querySelector('.kandd-profile-name'),email=profile.querySelector('.kandd-profile-email'),avatar=profile.querySelector('.kandd-avatar'),link=profile.querySelector('.kandd-profile-link'),out=profile.querySelector('.kandd-profile-signout');
 if(user){const display=firstName||user.user_metadata?.full_name||user.user_metadata?.first_name||user.email?.split('@')[0]||'My Account';name.textContent=display;email.textContent=user.email||'My Learning';avatar.textContent=display.charAt(0).toUpperCase();link.href=url('dashboard.html');out.hidden=false;document.documentElement.classList.add('kandd-authenticated');}
 else{name.textContent='My Account';email.textContent='Sign In / Create Account';avatar.textContent='?';link.href=url('account.html');out.hidden=true;document.documentElement.classList.remove('kandd-authenticated');}
}

async function updateAccount(){try{
 let db=window.kanddDb;
 if(!db && window.supabase)db=window.supabase.createClient('https://hfqallzmxsmkiqmolzui.supabase.co','sb_publishable_O7ZvBkAu8JH939O0ylNOkA_Y7aYEnQr');
 if(!db){setProfile(null);return;}
 const {data:{user},error}=await db.auth.getUser();if(error||!user){setProfile(null);return;}
 let firstName='';try{const {data:p}=await db.from('profiles').select('first_name').eq('id',user.id).maybeSingle();firstName=p?.first_name||'';}catch(e){}
 setProfile(user,firstName);
 account.querySelector('span').textContent='My Learning';account.title='My Learning';account.href=url('dashboard.html');logout.hidden=false;
 const [a,t]=await Promise.all([db.from('kandd_admins').select('user_id').eq('user_id',user.id).maybeSingle(),db.from('kandd_teacher_applications').select('status').eq('user_id',user.id).eq('status','approved').maybeSingle()]);
 admin.hidden=!a.data;teacherDash.hidden=!t.data;
 const note=document.querySelector('body:has(#secureTeacherForm) .k-note');if(note)note.hidden=true;
 }catch(e){console.warn('Kandd profile: account status unavailable',e)} }
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();