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
 let ok=0;answers.forEach((a,i)=>{const e=document.getElementById(id+i);if(e&&e.value===a)ok++});
 const f=document.getElementById(id+'Feedback');f.textContent=ok===answers.length?'✓ Excellent! All answers are correct.':`${ok}/${answers.length} correct. Try again.`;
 f.className='feedback '+(ok===answers.length?'success':'retry');
}
function saveScore(n,score){localStorage.setItem('lesson'+n+'Score',String(score))}
