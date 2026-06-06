/* Плавное появление при скролле. Изолировано в пределах .custom-vocal-homepage.
   Если JS отключён или IntersectionObserver недоступен — весь контент остаётся
   полностью видимым (см. fallback .no-js в styles.css). */
(function(){
  var root = document.querySelector('.custom-vocal-homepage');
  if(!root) return;
  var items = root.querySelectorAll('.cvh-reveal, .cvh-x');
  if(!('IntersectionObserver' in window) || !items.length){
    items.forEach(function(el){ el.classList.add('cvh-in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('cvh-in'); io.unobserve(e.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
  items.forEach(function(el){ io.observe(el); });
})();

/* Мобильное меню: бургер ↔ X, открытие/закрытие полноэкранного меню */
(function(){
  var root = document.querySelector('.custom-vocal-homepage');
  var burger = document.getElementById('cvhBurger');
  var menu = document.getElementById('cvhMenu');
  if(!root || !burger || !menu) return;

  function setOpen(open){
    burger.classList.toggle('is-open', open);
    menu.classList.toggle('is-open', open);
    root.classList.toggle('cvh-menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  burger.addEventListener('click', function(){
    setOpen(!menu.classList.contains('is-open'));
  });

  // клик по пункту — закрываем меню
  menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ setOpen(false); });
  });

  // Esc закрывает
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
  });
})();
