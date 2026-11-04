(function(){'use strict';
function addToggles(){document.querySelectorAll('input[type="password"]').forEach(function(input){
 if(input.dataset.kanddPasswordToggle)return;
 input.dataset.kanddPasswordToggle='1';
 const wrapper=document.createElement('span');wrapper.className='kandd-password-field';
 input.parentNode.insertBefore(wrapper,input);wrapper.appendChild(input);
 const btn=document.createElement('button');btn.type='button';btn.className='kandd-password-toggle';btn.textContent='Show';btn.setAttribute('aria-label','Show password');btn.setAttribute('aria-pressed','false');
 btn.addEventListener('click',function(){const visible=input.type==='text';input.type=visible?'password':'text';btn.textContent=visible?'Show':'Hide';btn.setAttribute('aria-label',visible?'Show password':'Hide password');btn.setAttribute('aria-pressed',String(!visible));input.focus();});
 wrapper.appendChild(btn);
 });}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addToggles,{once:true});else addToggles();
})();
