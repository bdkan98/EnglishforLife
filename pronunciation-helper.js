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
    from:['fram','de / desde'], live:['liv','vivir'], city:['SÍ-ti','ciudad'], country:['KÁN-tri','país'],
    name:['néim','nombre'], friend:['frend','amigo/a'], today:['tu-DÉI','hoy'],
    tomorrow:['tu-MÓ-rou','mañana'], price:['prais','precio'], right:['rait','derecha / correcto'],
    left:['left','izquierda'], help:['jelp','ayuda / ayudar'], learn:['lern','aprender']
  };
    if (!words["mother"]) words["mother"] = ["MÁ-der", "madre"];
    if (!words["father"]) words["father"] = ["FÁ-der", "padre"];
    if (!words["husband"]) words["husband"] = ["JÁS-band", "esposo"];
    if (!words["wife"]) words["wife"] = ["uáif", "esposa"];
    if (!words["son"]) words["son"] = ["san", "hijo"];
    if (!words["sister"]) words["sister"] = ["SÍS-ter", "hermana"];
    if (!words["zero"]) words["zero"] = ["ZÍ-rou", "cero"];
    if (!words["one"]) words["one"] = ["uan", "uno"];
    if (!words["two"]) words["two"] = ["tú", "dos"];
    if (!words["three"]) words["three"] = ["zrí", "tres"];
    if (!words["thirteen"]) words["thirteen"] = ["zer-TÍIN", "trece"];
    if (!words["thirty"]) words["thirty"] = ["ZÉR-ti", "treinta"];
    if (!words["fourteen"]) words["fourteen"] = ["for-TÍIN", "catorce"];
    if (!words["forty"]) words["forty"] = ["FÓR-ti", "cuarenta"];
    if (!words["fifteen"]) words["fifteen"] = ["fif-TÍIN", "quince"];
    if (!words["fifty"]) words["fifty"] = ["FÍF-ti", "cincuenta"];
    if (!words["wake up"]) words["wake up"] = ["uéik ap", "despertarse"];
    if (!words["get ready"]) words["get ready"] = ["guet RÉ-di", "prepararse"];
    if (!words["breakfast"]) words["breakfast"] = ["BRÉK-fast", "desayuno"];
    if (!words["lunch"]) words["lunch"] = ["lanch", "almuerzo"];
    if (!words["dinner"]) words["dinner"] = ["DÍ-ner", "cena"];
    if (!words["go to work"]) words["go to work"] = ["góu tu uérk", "ir al trabajo"];
    if (!words["go home"]) words["go home"] = ["góu jóum", "ir a casa"];
    if (!words["go to bed"]) words["go to bed"] = ["góu tu bed", "acostarse"];
    if (!words["afternoon"]) words["afternoon"] = ["af-ter-NÚUN", "tarde"];
    if (!words["evening"]) words["evening"] = ["ÍV-ning", "tarde/noche"];
    if (!words["night"]) words["night"] = ["náit", "noche"];
    if (!words["early"]) words["early"] = ["ÉR-li", "temprano"];
    if (!words["late"]) words["late"] = ["léit", "tarde"];
    if (!words["before"]) words["before"] = ["bi-FÓR", "antes de"];
    if (!words["after"]) words["after"] = ["ÁF-ter", "después de"];
    if (!words["cash"]) words["cash"] = ["kash", "efectivo"];
    if (!words["card"]) words["card"] = ["kard", "tarjeta"];
    if (!words["receipt"]) words["receipt"] = ["ri-SÍIT", "recibo"];
    if (!words["bag"]) words["bag"] = ["bag", "bolsa"];
    if (!words["pound"]) words["pound"] = ["páund", "libra"];
    if (!words["each"]) words["each"] = ["ích", "cada uno"];
    if (!words["total"]) words["total"] = ["TÓU-tal", "total"];
    if (!words["straight"]) words["straight"] = ["stréit", "derecho"];
    if (!words["next to"]) words["next to"] = ["nékst tu", "al lado de"];
    if (!words["across from"]) words["across from"] = ["a-KRÓS fram", "enfrente de"];
    if (!words["between"]) words["between"] = ["bi-TUÍIN", "entre"];
    if (!words["drive / car"]) words["drive / car"] = ["dráiv / kar", "manejar / carro"];
    if (!words["train"]) words["train"] = ["tréin", "tren"];
    if (!words["bike"]) words["bike"] = ["báik", "bicicleta"];
    if (!words["walk"]) words["walk"] = ["uók", "caminar"];
    if (!words["bus stop"]) words["bus stop"] = ["bas stop", "parada de autobús"];
    if (!words["available"]) words["available"] = ["a-VÉI-la-bol", "disponible"];
    if (!words["reschedule"]) words["reschedule"] = ["ri-SKÉ-dyul", "cambiar la cita"];
    if (!words["cancel"]) words["cancel"] = ["KÁN-sel", "cancelar"];
    if (!words["confirm"]) words["confirm"] = ["kon-FÉRM", "confirmar"];
    if (!words["job"]) words["job"] = ["yob", "trabajo"];
    if (!words["manager"]) words["manager"] = ["MÁ-na-yer", "gerente"];
    if (!words["customer"]) words["customer"] = ["KÁS-ta-mer", "cliente"];
    if (!words["coworker"]) words["coworker"] = ["KÓU-uér-ker", "compañero de trabajo"];
    if (!words["shift"]) words["shift"] = ["shift", "turno"];
    if (!words["responsible for"]) words["responsible for"] = ["ri-SPÓN-sa-bol for", "responsable de"];
    if (!words["workplace"]) words["workplace"] = ["UÉRK-pléis", "lugar de trabajo"];
    if (!words["show"]) words["show"] = ["shóu", "mostrar"];
    if (!words["explain"]) words["explain"] = ["eks-PLÉIN", "explicar"];
    if (!words["finished"]) words["finished"] = ["FÍ-nisht", "terminado"];
    if (!words["next"]) words["next"] = ["nekst", "siguiente"];
    if (!words["problem"]) words["problem"] = ["PRÓB-lem", "problema"];
    if (!words["careful"]) words["careful"] = ["KÉR-fol", "cuidadoso"];
    if (!words["together"]) words["together"] = ["tu-GÉ-der", "juntos"];
    if (!words["repeat"]) words["repeat"] = ["ri-PÍIT", "repetir"];
    if (!words["understand"]) words["understand"] = ["an-der-STÁND", "entender"];
    if (!words["mean"]) words["mean"] = ["mín", "significar"];
    if (!words["question"]) words["question"] = ["KUÉS-chon", "pregunta"];
    if (!words["answer"]) words["answer"] = ["ÁN-ser", "respuesta"];
    if (!words["conversation"]) words["conversation"] = ["kon-ver-SÉI-shon", "conversación"];
    if (!words["confidence"]) words["confidence"] = ["KÓN-fi-dens", "confianza"];
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
    // Public interface for clickable lesson vocabulary. Does not affect account or progress.
    window.kanddOpenPronunciation = function (word, translation) {
      const value=String(word||'').trim().slice(0,160);
      if(!value)return;
      input.value=value;
      show(true);
      update();
      if(translation && !words[value.toLowerCase()]) {
        const meaning=document.createElement('div');
        meaning.textContent='Meaning: '+String(translation);
        result.append(meaning);
      }
    };
    input.addEventListener('input',update);
    input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();play(false)}});
    function play(slow){
      const text=input.value.trim();
      if(!text){result.textContent='Enter a word or select text first.';input.focus();return;}
      update();
      if(!('speechSynthesis' in window)){result.append(document.createTextNode(' Audio is unavailable in this browser.'));return;}
      speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(text);
      u.lang='en-US';u.rate=slow ? 0.45 : 0.9;u.pitch=1;
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