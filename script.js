(function () {
  const tabs  = document.querySelectorAll('.tab');
  const pages = document.querySelectorAll('.page');

  function go(id) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === id));
    pages.forEach(p => p.classList.toggle('active', p.id === id));
  }

  tabs.forEach(tab => tab.addEventListener('click', () => go(tab.dataset.tab)));

  document.querySelectorAll('[data-go]').forEach(el => {
    el.addEventListener('click', () => go(el.dataset.go));
  });

  /* ============ DESTELLOS DORADOS ============ */
  const layer = document.querySelector('.sparkles');
  if (layer) {
    const COUNT = 28;
    const rand = (a, b) => a + Math.random() * (b - a);

    for (let i = 0; i < COUNT; i++) {
      const s = document.createElement('span');
      const isStar = Math.random() < 0.35;
      s.className = 'sparkle' + (isStar ? ' s-star' : '');
      s.style.left = rand(0, 100) + 'vw';
      s.style.top  = rand(0, 100) + 'vh';
      s.style.setProperty('--dur',   rand(3.5, 7).toFixed(2) + 's');
      s.style.setProperty('--delay', rand(0, 6).toFixed(2) + 's');
      const scale = rand(0.6, 1.8).toFixed(2);
      s.style.transform = `scale(${scale})`;
      layer.appendChild(s);
    }

    // Reposicionar destellos cada cierto tiempo para que la magia siga viva
    setInterval(() => {
      const all = layer.querySelectorAll('.sparkle');
      all.forEach((sp, idx) => {
        if (Math.random() < 0.25) {
          sp.style.left = rand(0, 100) + 'vw';
          sp.style.top  = rand(0, 100) + 'vh';
        }
      });
    }, 4000);
  }

  /* ============ DESTELLO QUE CRUZA EL LOGO ============ */
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const shine = document.createElement('div');
    shine.className = 'hero-shine';
    heroContent.appendChild(shine);
  }
})();
