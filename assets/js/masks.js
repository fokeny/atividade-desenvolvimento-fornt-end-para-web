
/* masks.js — aplica máscaras de CPF, telefone e CEP
   - Não impede a validação nativa: usamos 'pattern', 'required', 'type', etc.
   - Apenas formata enquanto digita para experiência melhor.
*/
(function(){
  function onlyDigits(v){ return v.replace(/\D+/g,''); }

  function maskCPF(v){
    v = onlyDigits(v).slice(0,11);
    const p1 = v.slice(0,3);
    const p2 = v.slice(3,6);
    const p3 = v.slice(6,9);
    const p4 = v.slice(9,11);
    let out = p1;
    if(p2) out += '.'+p2;
    if(p3) out += '.'+p3;
    if(p4) out += '-'+p4;
    return out;
  }
  function maskPhone(v){
    v = onlyDigits(v).slice(0,11);
    const ddd = v.slice(0,2);
    const p1 = v.length > 10 ? v.slice(2,7) : v.slice(2,6);
    const p2 = v.length > 10 ? v.slice(7,11) : v.slice(6,10);
    let out = '';
    if(ddd) out += '('+ddd+') ';
    if(p1) out += p1;
    if(p2) out += '-'+p2;
    return out;
  }
  function maskCEP(v){
    v = onlyDigits(v).slice(0,8);
    const p1 = v.slice(0,5);
    const p2 = v.slice(5,8);
    return p2 ? (p1 + '-' + p2) : p1;
  }

  const handlers = {
    cpf: maskCPF,
    telefone: maskPhone,
    cep: maskCEP
  };

  document.addEventListener('input', function(e){
    const el = e.target;
    const kind = el.getAttribute('data-mask');
    if(!kind || !handlers[kind]) return;
    const cur = el.value;
    const next = handlers[kind](cur);
    if(cur !== next){
      const start = el.selectionStart;
      el.value = next;
      try { el.setSelectionRange(next.length, next.length); } catch(_){}
    }
  }, true);
})();
