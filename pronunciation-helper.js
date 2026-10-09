/* Kandd Learning pronunciation helper. No account data is collected. */
(function () {
  'use strict';
  if (window.__kanddPronunciationHelper) return;
  window.__kanddPronunciationHelper = true;
  const words = {
    hello:['jel-ÓU','hola'], morning:['MÓR-ning','mañana'], beautiful:['BIÚ-ti-fol','hermoso/a'],
    work:['uérk','trabajo / trabajar'], school:['skúl','escuela'], family:['FÁ-mi-li','familia'],
    daughter:['DÓ-ter','hija'], brother:['BRÁ-der','hermano'], water:['UÓ-ter','agua'],
    thank:['zank','agradecer'], please:['plíiz','por favor'], appointment:['a-PÓINT-ment','cita'],
    pharmacy:['FÁR-ma-si','farmacia'], bus:['bas','autobús'], shopping:['SHÓ-ping','compras'],
    schedule:['SKÉ-dyul','horario'], directions:['di-RÉK-shons','direcciones'],
    transportation:['trans-por-TÉI-shon','transporte'], english:['ÍNG-glish','inglés'],
    name:['néim','nombre'], friend:['frend','amigo/a'], today:['tu-DÉI','hoy'],
    tomorrow:['tu-MÓ-rou','mañana'], price:['prais','precio'], right:['rait','derecha / correcto'],
    left:['left','izquierda'], help:['jelp','ayuda / ayudar'], learn:['lern','aprender']
  };
  const mount = () => {
    if (document.getElementById('kandd-pronounce-launcher')) return;
    const launcher=document.createElement('button');
    launcher.id='kandd-pronounce-launcher';
    launcher.className='kandd-pronounce-launcher';
    launcher.type='button';
    launcher.setAttribute('aria-label','Open Kandd Pronunciation Helper');
    launcher.setAttribute('aria-expanded','false');
    launcher.textContent='🔊 Pronunciation';
    const panel=document.createElement('section');
    panel.id='kandd-pronounce-panel';
    panel.className='kandd-pronounce-panel';
    panel.setAttribute('aria-label','Kandd Pronunciation Helper');
    panel.hidden=true;
    panel.innerHTML=`
      <div class="kandd-pronounce-heading"><strong>🔊 Kandd Pronunciation Helper</strong>
      <button type="button" class="kandd-pronounce-close" aria-label="Close pronunciation helper">×</button></div>
      <p>Type an English word or highlight text on the page, then choose “Use selected text.”</p>
      <label for="kandd-pronounce-input">English word or short phrase</label>
      <div class="kandd-pronounce-search"><input id="kandd-pronounce-input" type="text" maxlength="160" placeholder="e.g., Good morning" autocomplete="off">
      <button type="button" id="kandd-pronounce-selected">Use selected text</button></div>
      <div class="kandd-pronounce-actions"><button type="button" id="kandd-pronounce-normal">▶ Normal</button>
      <button type="button" id="kandd-pronounce-slow">🐢 Slow</button>
      <button type="button" id="kandd-pronounce-stop">■ Stop</button></div>
      <div id="kandd-pronounce-result" role="status" aria-live="polite">Enter a word to begin.</div>
      <small>Spanish-friendly spelling is an approximation. Available for selected vocabulary; audio supports other English words too.</small>`;
    document.body.append(launcher,panel);
    const input=panel.querySelector('#kandd-pronounce-input');
    const result=panel.querySelector('#kandd-pronounce-result');
    let selectedText='';
    document.addEventListener('selectionchange',()=>{
      const text=(window.getSelection()?.toString()||'').trim();
      if(text && !panel.contains(window.getSelection()?.anchorNode)) selectedText=text.slice(0,160);
    });
    function show(open){
      panel.hidden=!open;
      launcher.setAttribute('aria-expanded',String(open));
      if(open){input.focus(); update();}
    }
    launcher.addEventListener('click',()=>show(panel.hidden));
    panel.querySelector('.kandd-pronounce-close').addEventListener('click',()=>show(false));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)show(false)});
    panel.querySelector('#kandd-pronounce-selected').addEventListener('click',()=>{
      const text=(window.getSelection()?.toString()||selectedText).trim();
      if(!text){result.textContent='Highlight a word on the page first.';return;}
      input.value=text.slice(0,160);update();input.focus();
    });
    function update(){
      const value=input.value.trim(), key=value.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g,'');
      if(!value){result.textContent='Enter a word to begin.';return;}
      result.replaceChildren();
      const heading=document.createElement('strong');heading.textContent=value;result.append(heading);
      if(words[key]){
        const hint=document.createElement('div');hint.textContent='Spanish-friendly pronunciation: '+words[key][0];
        const meaning=document.createElement('div');meaning.textContent='Meaning: '+words[key][1];
        result.append(hint,meaning);
      }else{
        const note=document.createElement('div');
        note.textContent='Audio is available. A Spanish-friendly spelling and translation are not yet in our vocabulary library.';
        result.append(note);
      }
    }
    input.addEventListener('input',update);
    input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();play(false)}});
    function play(slow){
      const text=input.value.trim();
      if(!text){result.textContent='Enter a word or select text first.';input.focus();return;}
      update();
      if(!('speechSynthesis' in window)){result.append(document.createTextNode(' Audio is unavailable in this browser.'));return;}
      speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(text);
      u.lang='en-US';u.rate=slow?.65:.9;u.pitch=1;
      const voices=speechSynthesis.getVoices().filter(v=>/^en[-_]/i.test(v.lang));
      if(voices.length)u.voice=voices.find(v=>v.lang==='en-US')||voices[0];
      speechSynthesis.speak(u);
    }
    panel.querySelector('#kandd-pronounce-normal').addEventListener('click',()=>play(false));
    panel.querySelector('#kandd-pronounce-slow').addEventListener('click',()=>play(true));
    panel.querySelector('#kandd-pronounce-stop').addEventListener('click',()=>{if('speechSynthesis' in window)speechSynthesis.cancel()});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);
  else mount();
})();