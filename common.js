function showTab(id){
  document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x.dataset.target===id));
  const panel=document.getElementById(id);
  if(panel) panel.classList.add('active');
  window.scrollTo({top:170,behavior:'smooth'});
}
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>showTab(b.dataset.target));

let activeSpeakButton=null;
let englishVoice=null;

function loadEnglishVoice(){
  if(!('speechSynthesis' in window)) return;
  const voices=window.speechSynthesis.getVoices();
  englishVoice =
    voices.find(v=>v.lang && v.lang.toLowerCase()==='en-us') ||
    voices.find(v=>v.lang && v.lang.toLowerCase().startsWith('en')) ||
    null;
}
if('speechSynthesis' in window){
  loadEnglishVoice();
  window.speechSynthesis.onvoiceschanged=loadEnglishVoice;
}

function resetSpeakButton(){
  if(activeSpeakButton){
    activeSpeakButton.textContent='🔊';
    activeSpeakButton.classList.remove('playing');
    activeSpeakButton.setAttribute('aria-label','Hear pronunciation');
    activeSpeakButton=null;
  }
}

function speakText(text,button){
  if(!('speechSynthesis' in window)){
    alert('Pronunciation audio is not supported in this browser.');
    return;
  }

  // Chrome can occasionally pause the speech engine; canceling and resuming
  // before a new utterance makes playback more reliable.
  window.speechSynthesis.cancel();
  window.speechSynthesis.resume();
  resetSpeakButton();

  const utterance=new SpeechSynthesisUtterance(text);
  utterance.lang='en-US';
  utterance.rate=0.78;
  utterance.pitch=1;
  utterance.volume=1;
  if(englishVoice) utterance.voice=englishVoice;

  if(button){
    activeSpeakButton=button;
    button.textContent='🔉';
    button.classList.add('playing');
    button.setAttribute('aria-label','Playing pronunciation');
  }

  utterance.onend=resetSpeakButton;
  utterance.onerror=function(event){
    resetSpeakButton();
    console.error('Speech error:',event.error);
  };

  // Small delay after cancel() avoids a Chrome race condition.
  setTimeout(()=>window.speechSynthesis.speak(utterance),80);
}

function checkMatching(id,answers){
  let ok=0;
  answers.forEach((a,i)=>{
    const e=document.getElementById(id+i);
    if(e&&e.value===a) ok++;
  });
  const f=document.getElementById(id+'Feedback');
  f.textContent=ok===answers.length
    ? '✓ Excellent! All answers are correct.'
    : `${ok}/${answers.length} correct. Try the ones you missed.`;
  f.className='feedback '+(ok===answers.length?'success':'retry');
}
