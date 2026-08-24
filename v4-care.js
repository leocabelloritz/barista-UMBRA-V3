// UMBRA V4 / Cuidado de instrumentos
(() => {
  function careMarkup() {
    return `
      <section id="vista-cuidados" class="vista">
        <div class="page care-page">
          <header class="page-heading care-heading">
            <p class="eyebrow">UMBRA / CUIDADO</p>
            <h1>Cuida tus instrumentos.</h1>
            <p class="lead">No necesitas tratarlos como piezas de museo. Límpialos bien, sécalos y déjalos listos para el próximo ritual.</p>
          </header>

          <section class="care-principles">
            <article><span>01</span><strong>NO DEJES EL CAFÉ AHÍ</strong><p>Retira los restos cuando termines. Los aceites viejos son lo que más rápido arruina el sabor.</p></article>
            <article><span>02</span><strong>AGUA + SECADO</strong><p>Para el día a día, agua tibia suele bastar. Después deja cada pieza completamente seca.</p></article>
            <article><span>03</span><strong>SIN CASTIGAR EL MATERIAL</strong><p>Evita esponjas abrasivas y químicos fuertes. Si el fabricante dice algo distinto, manda el fabricante.</p></article>
          </section>

          <div class="section-line care-section-line"><span>POR INSTRUMENTO</span><span>GUÍA RÁPIDA</span></div>

          <div class="care-grid">
            <article class="care-card" data-care-icon="v60">
              <div class="care-card-top"><div class="care-method-icon"></div><span>V60</span></div>
              <h2>Enjuaga y deja respirar.</h2>
              <p>Retira el filtro y los restos apenas termines. Lava el dripper con agua tibia y detergente suave cuando haga falta.</p>
              <div class="care-detail"><strong>DE VEZ EN CUANDO</strong><span>Revisa ranuras y base; los aceites pueden acumularse ahí.</span></div>
            </article>

            <article class="care-card" data-care-icon="francesa">
              <div class="care-card-top"><div class="care-method-icon"></div><span>PRENSA</span></div>
              <h2>El filtro merece atención.</h2>
              <p>Vacía los posos, enjuaga la jarra y separa el émbolo si quedan partículas atrapadas en la malla.</p>
              <div class="care-detail"><strong>DE VEZ EN CUANDO</strong><span>Desarma el conjunto del filtro y lava cada disco por separado.</span></div>
            </article>

            <article class="care-card" data-care-icon="aeropress">
              <div class="care-card-top"><div class="care-method-icon"></div><span>AEROPRESS</span></div>
              <h2>Expulsa, enjuaga, listo.</h2>
              <p>Saca el puck al terminar y enjuaga cámara, tapa y sello. No necesitas frotar fuerte para dejarla limpia.</p>
              <div class="care-detail"><strong>SELLO</strong><span>Déjalo limpio y seco; evita objetos filosos o abrasivos sobre la goma.</span></div>
            </article>

            <article class="care-card" data-care-icon="moka">
              <div class="care-card-top"><div class="care-method-icon"></div><span>MOKA</span></div>
              <h2>Primero deja que enfríe.</h2>
              <p>Desarma, retira el café y enjuaga bien todas las piezas. Seca por completo antes de volver a montar.</p>
              <div class="care-detail"><strong>IMPORTANTE</strong><span>Si es de aluminio, evita lavavajillas o detergentes agresivos salvo que el fabricante indique lo contrario.</span></div>
            </article>

            <article class="care-card care-card--utility">
              <div class="care-card-top"><div class="care-utility-icon">✣</div><span>MOLINO</span></div>
              <h2>Seco es mejor.</h2>
              <p>Retira polvo y café con brocha o cepillo. No mojes las muelas ni el mecanismo salvo que el fabricante permita desmontarlos y lavarlos.</p>
              <div class="care-detail"><strong>SEÑAL DE LIMPIEZA</strong><span>Olor a café rancio, exceso de polvo o molienda menos uniforme.</span></div>
            </article>

            <article class="care-card care-card--utility">
              <div class="care-card-top"><div class="care-utility-icon">⌁</div><span>HERVIDOR</span></div>
              <h2>El sarro también se nota.</h2>
              <p>Vacía el agua sobrante y deja secar. Si aparece una película blanca, toca descalcificar según las instrucciones del hervidor.</p>
              <div class="care-detail"><strong>AGUA</strong><span>Una limpieza periódica ayuda al sabor y a que el hervidor siga calentando bien.</span></div>
            </article>
          </div>

          <aside class="care-note">
            <span>UMBRA / REGLA SIMPLE</span>
            <p>Si huele a café viejo, tiene residuos visibles o cambia el sabor de tu taza, es momento de limpiar. No hace falta un calendario perfecto.</p>
          </aside>
        </div>
      </section>`;
  }

  function insertCareView() {
    const journal = document.getElementById('vista-journal');
    if (!journal || document.getElementById('vista-cuidados')) return;
    journal.insertAdjacentHTML('beforebegin', careMarkup());

    const nav = document.getElementById('bottom-nav');
    const journalButton = document.getElementById('nav-journal');
    if (nav && journalButton && !document.getElementById('nav-cuidados')) {
      journalButton.insertAdjacentHTML('beforebegin', '<button id="nav-cuidados" class="nav-item" type="button"><span>◇</span><small>CUIDADOS</small></button>');
    }

    document.querySelectorAll('[data-care-icon]').forEach(card => {
      const target = card.querySelector('.care-method-icon');
      const key = card.dataset.careIcon;
      if (target && typeof ICONOS !== 'undefined' && ICONOS[key]) target.innerHTML = ICONOS[key];
    });
  }

  function installNavigation() {
    const originalMostrarVista = mostrarVista;
    mostrarVista = function(nombre) {
      const care = document.getElementById('vista-cuidados');
      if (nombre === 'cuidados') {
        document.querySelectorAll('.vista').forEach(v => v.classList.remove('activa'));
        care?.classList.add('activa');
        document.getElementById('app-principal')?.classList.remove('oculto');
        document.getElementById('bottom-nav')?.classList.remove('oculto');
        document.getElementById('nav-metodos')?.classList.remove('activo');
        document.getElementById('nav-journal')?.classList.remove('activo');
        document.getElementById('nav-cuidados')?.classList.add('activo');
        window.scrollTo({top:0, behavior:'smooth'});
        return;
      }
      care?.classList.remove('activa');
      originalMostrarVista(nombre);
      document.getElementById('nav-cuidados')?.classList.remove('activo');
    };

    document.getElementById('nav-cuidados')?.addEventListener('click', () => mostrarVista('cuidados'));
  }

  function bootCare() {
    insertCareView();
    installNavigation();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootCare);
  else bootCare();
})();
