// UMBRA V4 / Marca visual + favicon
(() => {
  const MARK = 'umbra-mark.svg?v=1';

  function installFavicon(){
    let icon = document.querySelector('link[rel="icon"]');
    if(!icon){
      icon = document.createElement('link');
      icon.rel = 'icon';
      document.head.appendChild(icon);
    }
    icon.type = 'image/svg+xml';
    icon.href = MARK;

    let shortcut = document.querySelector('link[rel="shortcut icon"]');
    if(!shortcut){
      shortcut = document.createElement('link');
      shortcut.rel = 'shortcut icon';
      document.head.appendChild(shortcut);
    }
    shortcut.href = MARK;
  }

  function applyBrandMark(){
    const hero = document.querySelector('.brand-lockup--hero');
    if(hero){
      const oldMark = hero.querySelector('.eclipse-mark');
      if(oldMark) oldMark.outerHTML = `<img class="umbra-brand-mark" src="${MARK}" alt="">`;
    }

    const header = document.querySelector('.brand-button');
    if(header){
      const oldMark = header.querySelector('.eclipse-mark');
      if(oldMark) oldMark.outerHTML = `<img class="umbra-brand-mark" src="${MARK}" alt="">`;
    }
  }

  function boot(){
    installFavicon();
    applyBrandMark();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
