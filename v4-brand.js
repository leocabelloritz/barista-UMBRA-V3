// UMBRA V4 / Sistema de marca web
(() => {
  const MARK = 'umbra-mark.svg?v=3';
  const VERTICAL = 'umbra-logo-vertical.svg?v=1';
  const HORIZONTAL = 'umbra-logo-horizontal.svg?v=1';

  function installFavicon(){
    let icon = document.querySelector('link[rel="icon"]');
    if(!icon){ icon = document.createElement('link'); icon.rel = 'icon'; document.head.appendChild(icon); }
    icon.type = 'image/svg+xml';
    icon.href = MARK;

    let shortcut = document.querySelector('link[rel="shortcut icon"]');
    if(!shortcut){ shortcut = document.createElement('link'); shortcut.rel = 'shortcut icon'; document.head.appendChild(shortcut); }
    shortcut.href = MARK;
  }

  function applyBrand(){
    const hero = document.querySelector('.brand-lockup--hero');
    if(hero){
      hero.innerHTML = `<img class="umbra-logo umbra-logo--hero" src="${VERTICAL}" alt="UMBRA — Café de verdad, en casa">`;
    }

    const header = document.querySelector('.brand-button');
    if(header){
      header.innerHTML = `<img class="umbra-logo umbra-logo--header" src="${HORIZONTAL}" alt="UMBRA">`;
    }
  }

  function boot(){ installFavicon(); applyBrand(); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
