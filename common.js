function showTab(id){
 document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));
 document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.target===id));
 const p=document.getElementById(id); if(p)p.classList.add('active');
 window.scrollTo({top:170,behavior:'smooth'});
}
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>showTab(b.dataset.target));

let activeSpeakButton=null, englishVoices=[];
function loadEnglishVoices(){
 if(!('speechSynthesis' in window))return;
 const all=speechSynthesis.getVoices();
 englishVoices=all.filter(v=>/^en(-|_)/i.test(v.lang||''));
 // Prefer commonly more natural local Windows/macOS voices when available.
 const preferred=['Microsoft Aria','Microsoft Jenny','Microsoft Guy','Samantha','Ava','Google US English'];
 englishVoices.sort((a,b)=>{
   const ai=preferred.findIndex(x=>(a.name||'').includes(x));
   const bi=preferred.findIndex(x=>(b.name||'').includes(x));
   return (ai<0?99:ai)-(bi<0?99:bi);
 });
}
if('speechSynthesis' in window){loadEnglishVoices();speechSynthesis.onvoiceschanged=loadEnglishVoices}
function resetSpeakButton(){if(activeSpeakButton){activeSpeakButton.classList.remove('playing');activeSpeakButton=null}}
function speakText(text,button,mode='normal'){
 if(!('speechSynthesis' in window)){alert('Pronunciation audio is not supported in this browser.');return}
 speechSynthesis.cancel();speechSynthesis.resume();resetSpeakButton();
 const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=mode==='slow'?.68:.9;u.pitch=1;u.volume=1;
 if(englishVoices.length)u.voice=englishVoices[0];
 if(button){activeSpeakButton=button;button.classList.add('playing')}
 u.onend=resetSpeakButton;u.onerror=resetSpeakButton;
 setTimeout(()=>speechSynthesis.speak(u),80);
}
function checkMatching(id,answers){
 let ok=0;
 answers.forEach((answer,i)=>{
  const select=document.getElementById(id+i);
  if(!select)return;
  const correct=select.value===answer;
  const chosen=!!select.value;
  if(correct)ok++;
  select.classList.toggle('kandd-match-correct',correct);
  select.classList.toggle('kandd-match-incorrect',chosen&&!correct);
  select.setAttribute('aria-invalid',chosen&&!correct?'true':'false');
  let note=document.getElementById(id+i+'-match-result');
  if(!note){
   note=document.createElement('span');
   note.id=id+i+'-match-result';
   note.className='kandd-match-result';
   note.setAttribute('role','status');
   select.insertAdjacentElement('afterend',note);
  }
  note.className='kandd-match-result '+(correct?'is-correct':'is-incorrect');
  note.textContent=correct?'✓ Correct / Correcto':(chosen?'✕ Try again / Inténtalo de nuevo':'Choose an answer / Elige una respuesta');
 });
 const feedback=document.getElementById(id+'Feedback');
 if(feedback){
  feedback.textContent=ok===answers.length?'✓ Excellent! All answers are correct. / ¡Excelente! Todas son correctas.':ok+'/'+answers.length+' correct. Review the marked matches and try again. / Revisa las respuestas marcadas.';
  feedback.className='feedback '+(ok===answers.length?'success':'retry');
  feedback.setAttribute('role','status');
 }
}
function saveScore(n,score){
 localStorage.setItem('lesson'+n+'Score',String(score));
 if(typeof window.kanddSaveProgress==='function'){
  Promise.resolve(window.kanddSaveProgress('lesson',String(n),score>=4,score,{source:'lesson-quiz'})).catch(console.error);
 }else if(typeof kanddSaveProgress==='function'){
  Promise.resolve(kanddSaveProgress('lesson',String(n),score>=4,score,{source:'lesson-quiz'})).catch(console.error);
 }
}

// Load the helper relative to common.js, including from /lessons/ pages.
(function(){
 const here=document.currentScript;
 if(!here)return;
 const s=document.createElement('script');
 s.src=new URL('pronunciation-helper.js',here.src).href;
 s.defer=true;
 document.head.appendChild(s);
})();


/* Randomize Match It translations, avoiding answer-by-position shortcuts. */
(function(){
 function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
 function prepare(){
  const rows=[...document.querySelectorAll('#practice .activity-row')].filter(r=>r.querySelector('select[id^="m"]'));
  if(!rows.length)return;
  const selects=rows.map(r=>r.querySelector('select[id^="m"]'));
  const source=[...selects[0].options].filter(o=>o.value).map(o=>({value:o.value,text:o.textContent}));
  if(source.length<2)return;
  const original=source.map(o=>o.value);
  // All Match It dropdowns use the same shuffled set, so there are no positional hints.
  // A non-zero rotation guarantees no item remains in its original position.
  const shift=1+Math.floor(Math.random()*(source.length-1));
  const rotated=source.map((_,i)=>source[(i+shift)%source.length]);
  selects.forEach(select=>{
   const placeholder=[...select.options].find(o=>!o.value);
   select.replaceChildren();
   if(placeholder)select.appendChild(placeholder.cloneNode(true));
   rotated.forEach(item=>{const opt=document.createElement('option');opt.value=item.value;opt.textContent=item.text;select.appendChild(opt)});
  });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',prepare,{once:true});else prepare();
})();
