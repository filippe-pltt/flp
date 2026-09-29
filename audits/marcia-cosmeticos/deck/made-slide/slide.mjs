/** A camada de navegação do chassi de slide.
 *  O que muda em relação ao chassi de rolagem: o IntersectionObserver deixa de
 *  observar a seção entrando na viewport e passa a observar a slide ficar .active.
 *  As animações (.rv/d1/d2) e os gráficos SVG continuam exatamente como estão. */
export function navegacaoJS() {
  return `
(function(){
  var slides = [].slice.call(document.querySelectorAll('.slide'));
  var rotulo = document.querySelector('.bottom .label');
  var barra  = document.querySelector('.progress span');
  var atual  = 0;

  // As animações continuam sendo disparadas por observer — muda só o que ele observa.
  var obs = new IntersectionObserver(function(ents){
    ents.forEach(function(e){ if (e.isIntersecting) e.target.classList.add('visivel'); });
  }, { threshold: .15 });

  function animar(slide){
    slide.querySelectorAll('.rv').forEach(function(el){ obs.observe(el); });
  }

  function ir(i, semHash){
    if (!slides.length) return;
    i = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach(function(s, n){ s.classList.toggle('active', n === i); });
    atual = i;
    animar(slides[i]);
    if (rotulo) rotulo.textContent = slides[i].dataset.rotulo || '';
    if (barra)  barra.style.width = ((i + 1) / slides.length * 100) + '%';
    if (!semHash) location.hash = slides[i].id || ('s' + (i + 1));
  }

  document.addEventListener('keydown', function(e){
    if (e.key === 'ArrowRight' || e.key === 'PageDown') ir(atual + 1);
    if (e.key === 'ArrowLeft'  || e.key === 'PageUp')   ir(atual - 1);
    if (e.key === 'Home') ir(0);
    if (e.key === 'End')  ir(slides.length - 1);
  });

  document.querySelectorAll('[data-ir]').forEach(function(b){
    b.addEventListener('click', function(){ ir(+b.dataset.ir); fecharSumario(); });
  });

  var sumario = document.getElementById('sumario');
  function fecharSumario(){ if (sumario && sumario.open) sumario.close(); }
  var abrir = document.querySelector('[data-sumario]');
  if (abrir && sumario) abrir.addEventListener('click', function(){ sumario.showModal(); });

  // O sumário nasce das próprias slides — uma entrada por slide, na mesma
  // ordem em que a navegação (setas, teclado, hash) já as enumera.
  var sumarioItens = document.getElementById('sumario-itens');
  if (sumarioItens) {
    slides.forEach(function(s, i){
      var item = document.createElement('button');
      item.type = 'button';
      item.textContent = (i + 1) + '. ' + (s.dataset.rotulo || '');
      item.addEventListener('click', function(){ ir(i); fecharSumario(); });
      sumarioItens.appendChild(item);
    });
  }

  window.addEventListener('hashchange', function(){ porHash(true); });
  function porHash(semHash){
    var alvo = slides.findIndex(function(s){ return '#' + s.id === location.hash; });
    ir(alvo >= 0 ? alvo : 0, semHash);
  }
  porHash(true);
})();`;
}
