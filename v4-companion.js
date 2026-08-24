// UMBRA V4 / Voz, equipo disponible y repetición rápida
(() => {
  const STORE_EQUIPO = 'umbra_equipo_v4';

  const VOZ = {
    v60: {
      descripcion: {
        guiame: 'Limpio, aromático y más fácil de lo que parece. Tú vierte el agua; UMBRA se encarga de marcarte el ritmo.',
        directo: 'Filtrado limpio y definido. Receta base 1:16, 92 °C y molienda media como punto de partida; desde ahí puedes afinar flujo, molienda y temperatura.'
      },
      pasos: {
        guiame: [
          ['Deja todo listo', 'Pon el filtro en el V60. Si puedes, mójalo con agua caliente y bota esa agua. Listo, seguimos.'],
          ['Moja todo el café', 'Agrega un poco de agua hasta dejar todo el café húmedo. No persigas la perfección; solo evita que queden partes secas.'],
          ['Ahora sí, sigue con el agua', 'Vierte lento y dando vueltas sobre el café. Sin apuro y sin tirar toda el agua de golpe.'],
          ['Termina la taza', 'Sigue con calma hasta llegar al total. Desde poca altura funciona perfecto, aunque tu hervidor sea el de todos los días.'],
          ['Déjalo hacer lo suyo', 'Espera a que termine de gotear. Cuando el flujo ya sea lento, retira el V60 y listo.']
        ],
        directo: [
          ['Enjuaga el filtro', 'Coloca el filtro, enjuágalo con agua caliente y descarta esa agua. Precalientas el equipo y eliminas posibles notas a papel.'],
          ['Preinfusión / 45 s', 'Vierte cerca de 3× el peso del café y satura todo el lecho. Si quedan zonas secas, una agitación suave está bien.'],
          ['Primer vertido / 60%', 'Mantén un flujo estable y circular, del centro hacia afuera. Evita castigar las paredes y llega al 60% del agua total.'],
          ['Vertido final / 100%', 'Completa el agua con un flujo parejo. Busca mantener una altura de cama razonablemente estable, no una geometría perfecta.'],
          ['Drenaje', 'Deja drenar. Si termina demasiado rápido y queda débil, prueba más fino; si se alarga y seca la taza, prueba más grueso.']
        ]
      }
    },
    francesa: {
      descripcion: {
        guiame: 'Cuerpo, dulzor y cero apuro. Café, agua, unos minutos y una presión tranquila. Difícil hacerlo más simple.',
        directo: 'Inmersión completa, mucha textura y una receta fácil de repetir. Parte en 1:15, molienda gruesa y 94 °C; ajusta principalmente molienda y tiempo.'
      },
      pasos: {
        guiame: [
          ['Café adentro', 'Pon todo el café molido en la prensa. Nada más por ahora.'],
          ['Agua, toda de una', 'Agrega toda el agua caliente. Aquí no necesitas controlar el vertido ni dibujar círculos raros.'],
          ['Una mezcla y basta', 'Revuelve una vez, suave, solo para asegurarte de que todo el café quede mojado.'],
          ['Ahora déjalo tranquilo', 'Pon la tapa sin bajar el émbolo y espera. La prensa se encarga del resto por unos minutos.'],
          ['Presiona y sirve', 'Baja el émbolo con calma. Si se pone demasiado duro, no pelees con él: sube un poco y vuelve a bajar. Sirve de inmediato.']
        ],
        directo: [
          ['Carga el café', 'Añade el café con molienda gruesa y distribúyelo de forma uniforme en el fondo de la prensa.'],
          ['Agua / 100%', 'Vierte toda el agua de forma continua. La inmersión hace el trabajo; no necesitas un patrón de vertido específico.'],
          ['Rompe zonas secas', 'Da una agitación breve y suave para asegurar saturación completa. Evita mezclar de más.'],
          ['Inmersión / 4:00', 'Coloca la tapa sin presionar y deja infusionar. Si buscas más extracción, trabaja primero con molienda antes que alargando demasiado el tiempo.'],
          ['Presiona / sirve', 'Presiona lento y parejo. Sirve apenas termines para evitar que el café siga extrayéndose dentro de la prensa.']
        ]
      }
    },
    aeropress: {
      descripcion: {
        guiame: 'Rápida, compacta y muy difícil de odiar. Mezclas, esperas un poco y presionas. Café serio sin ceremonia de más.',
        directo: 'Presión suave e inmersión corta. Parte en 1:14, 90 °C y molienda media-fina; pequeños cambios de molienda y tiempo se sienten bastante.'
      },
      pasos: {
        guiame: [
          ['Móntala sobre una taza', 'Pon el filtro y deja la AeroPress sobre una taza firme. Mejor firme de verdad: después vamos a presionar.'],
          ['Café y agua', 'Agrega el café y luego toda el agua caliente. No necesitas hacer un vertido perfecto.'],
          ['Revuelve un momento', 'Mezcla suave durante unos segundos. Con eso basta.'],
          ['Espera un poco', 'Pon el émbolo apenas para cerrar y déjala tranquila.'],
          ['Presiona sin apuro', 'Empuja de forma constante. Cuando escuches aire, para. Ya está.']
        ],
        directo: [
          ['Monta y enjuaga', 'Coloca el filtro y monta la AeroPress sobre una taza firme. Si usas filtro de papel, puedes enjuagarlo antes.'],
          ['Carga / 100%', 'Añade café y agua completa. Trabaja con un vertido continuo y procura saturar rápido para controlar el tiempo total de contacto.'],
          ['Agitación / 10 s', 'Mezcla de forma breve y consistente. La agitación aumenta extracción, así que intenta repetirla de taza en taza.'],
          ['Inmersión / 1:00', 'Sella con el émbolo para reducir goteo y deja infusionar. Ajusta molienda antes de hacer grandes cambios de tiempo.'],
          ['Presión / 30 s', 'Presiona de manera constante durante unos 30 segundos. Detente al escuchar aire para evitar exprimir de más el lecho.']
        ]
      }
    },
    moka: {
      descripcion: {
        guiame: 'Intensa, clásica y sin vueltas. El secreto no es hacer más: es no apurarla ni dejar que se queme.',
        directo: 'Extracción intensa por presión de vapor. Parte con molienda media-fina, agua caliente y fuego medio-bajo; el control real está en el flujo y en retirar a tiempo.'
      },
      pasos: {
        guiame: [
          ['Agua hasta la válvula', 'Llena la base con agua caliente, justo por debajo de la válvula. No hace falta medirla al milímetro.'],
          ['Café, pero sin apretar', 'Llena el filtro y nivélalo. No lo prensamos: esto no es espresso.'],
          ['Al fuego, sin apurar', 'Cierra la moka y ponla a fuego medio-bajo. Tapa abierta para que puedas mirar qué está pasando.'],
          ['Mira el café', 'Cuando empiece a salir, busca un flujo suave. Si escupe o sale con demasiada fuerza, baja el fuego.'],
          ['Sácala antes del drama', 'Cuando el café se vea más claro y empiece el burbujeo fuerte, retírala. Ese último hervor no nos aporta nada bueno.']
        ],
        directo: [
          ['Agua / bajo la válvula', 'Carga agua caliente hasta justo debajo de la válvula de seguridad. Partir con agua caliente reduce el tiempo que el café pasa recibiendo calor.'],
          ['Canastillo / sin compactar', 'Llena y nivela el café sin prensar. Una cama compactada aumenta resistencia y vuelve el flujo menos predecible.'],
          ['Fuego medio-bajo', 'Monta la moka y trabaja con potencia moderada. El objetivo es generar presión progresivamente, no llevarla a ebullición violenta.'],
          ['Controla el flujo', 'Busca una salida continua y estable. Si el flujo acelera o salpica, reduce potencia para evitar sobrecalentamiento.'],
          ['Corta la extracción', 'Retira del fuego cuando el flujo aclare y antes del burbujeo agresivo. Si quieres detenerla rápido, enfría la base por fuera con cuidado.']
        ]
      }
    }
  };

  const AYUDAS_DIRECTO = {
    cafe: {
      kicker: 'DOSIS / PRECISIÓN',
      titulo: 'Peso de café',
      copy: () => `Estás trabajando con ${gramosCafe} g. Mantener la dosis estable hace que los cambios de molienda, ratio o temperatura sean mucho más fáciles de comparar.`,
      equiv: () => `Receta actual: ${gramosCafe} g de café / ${aguaTotal()} ml de agua / 1:${ratioActual}.`
    },
    agua: {
      kicker: 'RATIO / CONTROL',
      titulo: 'Agua total',
      copy: () => `El agua está calculada desde tu ratio actual. Si mantienes la dosis y subes el agua, la taza tiende a sentirse más ligera; si bajas el agua, más concentrada.`,
      equiv: () => `${gramosCafe} g × ${ratioActual} = ${aguaTotal()} ml. Cambia una variable por vez si quieres entender qué mejoró.`
    },
    temperatura: {
      kicker: 'TEMPERATURA / AJUSTE',
      titulo: 'Punto de partida, no ley',
      copy: () => `${metodoActual?.temperatura || 92} °C es la referencia base de UMBRA para esta receta. No necesitas tratarla como un número sagrado.`,
      equiv: () => 'Si la taza queda seca o demasiado amarga, prueba bajar 2–3 °C. Si queda plana o poco desarrollada, prueba subir 2–3 °C.'
    },
    molienda: {
      kicker: 'MOLIENDA / AJUSTE',
      titulo: 'Aquí suele estar el cambio grande',
      copy: () => `Parte en ${metodoActual?.molienda || 'MEDIA'}. Mantén el resto estable y deja que el sabor y el tiempo de preparación te indiquen hacia dónde moverla.`,
      equiv: () => metodoActual?.id === 'v60'
        ? 'Drenaje muy rápido + taza débil: más fino. Drenaje muy lento + taza seca: más grueso.'
        : metodoActual?.id === 'francesa'
          ? 'Taza áspera o con demasiado sedimento: más grueso. Taza vacía o poco expresiva: un poco más fino.'
          : metodoActual?.id === 'aeropress'
            ? 'Taza débil: un poco más fino o más contacto. Taza seca: un poco más grueso antes de tocar todo lo demás.'
            : 'Flujo demasiado rápido y taza débil: un poco más fino. Flujo trabado o agresivo: más grueso.'
    }
  };

  function leerEquipo() {
    try {
      return {balanza:false, molino:false, termometro:false, hervidor:false, ...JSON.parse(localStorage.getItem(STORE_EQUIPO) || '{}')};
    } catch {
      return {balanza:false, molino:false, termometro:false, hervidor:false};
    }
  }

  function guardarEquipo(equipo) {
    localStorage.setItem(STORE_EQUIPO, JSON.stringify(equipo));
  }

  function inyectarEquipo() {
    if (document.getElementById('equipo-panel')) return;
    const modeSwitch = document.querySelector('.mode-switch');
    if (!modeSwitch) return;
    modeSwitch.insertAdjacentHTML('afterend', `
      <section id="equipo-panel" class="equipment-panel">
        <div class="equipment-head">
          <div>
            <span class="micro-label">¿QUÉ TIENES A MANO?</span>
            <p>Marca lo que tienes. Si falta algo, te doy el atajo.</p>
          </div>
          <span class="equipment-optional">OPCIONAL</span>
        </div>
        <div class="equipment-grid">
          <button type="button" data-equipo="balanza"><span>±</span><strong>BALANZA</strong></button>
          <button type="button" data-equipo="molino"><span>⁙</span><strong>MOLINO</strong></button>
          <button type="button" data-equipo="termometro"><span>°</span><strong>TERMÓMETRO</strong></button>
          <button type="button" data-equipo="hervidor"><span>⌁</span><strong>HERVIDOR FINO</strong></button>
        </div>
        <p id="equipment-note" class="equipment-note"></p>
      </section>`);

    document.querySelectorAll('[data-equipo]').forEach(btn => {
      btn.addEventListener('click', () => {
        const equipo = leerEquipo();
        equipo[btn.dataset.equipo] = !equipo[btn.dataset.equipo];
        guardarEquipo(equipo);
        renderEquipo();
      });
    });
    renderEquipo();
  }

  function renderEquipo() {
    const panel = document.getElementById('equipo-panel');
    if (!panel) return;
    panel.classList.toggle('oculto', modo !== 'guiame');
    const equipo = leerEquipo();
    document.querySelectorAll('[data-equipo]').forEach(btn => btn.classList.toggle('activo', !!equipo[btn.dataset.equipo]));
    const faltan = Object.entries(equipo).filter(([,v]) => !v).map(([k]) => k);
    const note = document.getElementById('equipment-note');
    if (note) {
      note.textContent = faltan.length
        ? 'Perfecto. Para lo que no tengas, UMBRA te dará una alternativa simple cuando la necesites.'
        : 'Vienes equipado. Igual mantendremos las ayudas a un toque por si quieres revisar algo.';
    }
  }

  function inyectarRepetir() {
    if (document.getElementById('btn-repetir-ultimo')) return;
    const mainButton = document.getElementById('btn-iniciar-ritual');
    if (!mainButton) return;
    mainButton.insertAdjacentHTML('afterend', `
      <button id="btn-repetir-ultimo" class="repeat-last oculto" type="button">
        <span class="repeat-last-copy"><small>TU ÚLTIMO RITUAL</small><strong id="repeat-last-name">—</strong><em id="repeat-last-meta">—</em></span>
        <span class="repeat-last-arrow">↗</span>
      </button>`);
    document.getElementById('btn-repetir-ultimo').addEventListener('click', repetirUltimo);
    renderUltimo();
  }

  function renderUltimo() {
    const btn = document.getElementById('btn-repetir-ultimo');
    if (!btn) return;
    const ultimo = leerRituales?.()[0];
    btn.classList.toggle('oculto', !ultimo);
    if (!ultimo) return;
    document.getElementById('repeat-last-name').textContent = `REPETIR ${ultimo.nombre.toUpperCase()}`;
    document.getElementById('repeat-last-meta').textContent = `${ultimo.cafe} g / ${ultimo.agua} ml / 1:${ultimo.ratio}`;
  }

  function repetirUltimo() {
    const ultimo = leerRituales?.()[0];
    if (!ultimo || !METODOS[ultimo.metodo]) return;
    metodoActual = METODOS[ultimo.metodo];
    gramosCafe = ultimo.cafe;
    ratioActual = ultimo.ratio;
    pasoActual = 0;
    resultadoFinal = '';
    cambiosFinal = [];
    actualizarDetalle();
    mostrarVista('detalle');
  }

  function aplicarVozPantalla() {
    const lead = document.querySelector('#vista-metodos .page-heading .lead');
    const message = document.getElementById('mensaje-modo');
    if (modo === 'guiame') {
      if (lead) lead.textContent = 'Vamos fácil. Elige un método y yo te voy diciendo qué hacer.';
      if (message) message.textContent = 'No necesitas saber de ratios ni extracción. Si algo te falta, buscamos otra forma.';
    } else {
      if (lead) lead.textContent = 'Tú mandas. Te doy receta, parámetros y puntos de ajuste.';
      if (message) message.textContent = 'Precisión completa, sin voz de manual. Cambia una variable por vez y deja que la taza te diga qué mover.';
    }
    renderEquipo();
  }

  function vozPaso(p) {
    const id = metodoActual?.id;
    const idx = metodoActual?.pasos?.indexOf(p) ?? -1;
    const entrada = VOZ[id]?.pasos?.[modo]?.[idx];
    return entrada || [p.nombre, p.instruccion];
  }

  function ayudaGuiada(tipo) {
    const equipo = leerEquipo();
    const t = metodoActual?.temperatura || 92;
    if (tipo === 'cafe') {
      return equipo.balanza
        ? {kicker:'CON BALANZA', titulo:'¿Cuánto café pongo?', copy:'Perfecto, tienes balanza. Pesa la dosis y olvídate del resto por ahora.', equiv:`Usa ${gramosCafe} g. Si después quieres cambiar la taza, movemos una cosa a la vez.`}
        : {kicker:'SIN BALANZA', titulo:'¿No tienes balanza?', copy:'No pasa nada. Una cucharada sopera de café suele rondar entre 8 y 10 g según la molienda.', equiv:`Para ${gramosCafe} g, parte con unas ${Math.max(1,Math.round(gramosCafe/9))} cucharadas rasas. No será laboratorio. Será café. Y funciona.`};
    }
    if (tipo === 'agua') {
      return {kicker:'SIN MEDIDOR', titulo:'¿No puedes medir el agua?', copy:'Usa una taza o vaso cuyo tamaño conozcas. No necesitamos acertar hasta el último mililitro.', equiv:`Buscamos cerca de ${aguaTotal()} ml. Eso equivale a ${(aguaTotal()/250).toFixed(1).replace('.0','')} tazas de 250 ml.`};
    }
    if (tipo === 'temperatura') {
      if (equipo.termometro) return {kicker:'CON TERMÓMETRO', titulo:'¿A qué temperatura?', copy:`Apunta a ${t} °C como referencia. Un par de grados arriba o abajo no arruinan tu café.`, equiv:'La idea es repetir algo que te guste, no aprobar un examen.'};
      const espera = t>=94?'30–45 segundos':t>=92?'45–60 segundos':t>=90?'60–90 segundos':'90 segundos';
      return {kicker:'SIN TERMÓMETRO', titulo:'¿Sin termómetro?', copy:'Fácil. Hierve el agua como siempre, apaga el hervidor y espera un poco antes de usarla.', equiv:`Para quedar cerca de ${t} °C, espera ${espera}. Suficientemente cerca es suficiente.`};
    }
    if (tipo === 'molienda') {
      if (!equipo.molino) return {kicker:'SIN MOLINO', titulo:'¿Compraste el café molido?', copy:'Perfecto. No necesitas comprar un molino para empezar.', equiv:metodoActual?.ayudas?.molienda?.equiv || 'Si puedes elegir, pide una molienda acorde a tu método.'};
      return {kicker:'CON MOLINO', titulo:metodoActual?.ayudas?.molienda?.titulo || '¿Qué tan fino?', copy:metodoActual?.ayudas?.molienda?.copy || 'Parte por una molienda media y ajusta después.', equiv:'Si queda un poco más fino o grueso, tampoco se acaba el mundo. Primero prueba la taza.'};
    }
  }

  const originalSetModo = setModo;
  setModo = function(nuevo) {
    originalSetModo(nuevo);
    aplicarVozPantalla();
    if (metodoActual) actualizarDetalle();
  };

  const originalActualizarDetalle = actualizarDetalle;
  actualizarDetalle = function() {
    originalActualizarDetalle();
    if (!metodoActual) return;
    const desc = VOZ[metodoActual.id]?.descripcion?.[modo];
    if (desc) document.getElementById('detalle-descripcion').textContent = desc;
    const hint = document.querySelector('.tap-hint');
    if (hint) hint.textContent = modo === 'guiame'
      ? 'Toca un dato y te doy una alternativa con lo que tengas en casa.'
      : 'Toca un dato para ver cómo ajustarlo sin perder el resto de la receta.';
    const start = document.querySelector('#btn-iniciar-guia span:first-child');
    if (start) start.textContent = modo === 'guiame' ? 'VAMOS CON EL CAFÉ' : 'INICIAR PREPARACIÓN';
  };

  nombrePaso = function(p) {
    return vozPaso(p)[0];
  };

  textoPaso = function(p) {
    return vozPaso(p)[1];
  };

  abrirAyuda = function(tipo) {
    let h;
    if (modo === 'directo') {
      const d = AYUDAS_DIRECTO[tipo];
      if (!d) return;
      h = {
        kicker:d.kicker,
        titulo:d.titulo,
        copy:typeof d.copy === 'function' ? d.copy() : d.copy,
        equiv:typeof d.equiv === 'function' ? d.equiv() : d.equiv
      };
    } else {
      h = ayudaGuiada(tipo);
    }
    if (!h) return;
    document.getElementById('help-kicker').textContent = h.kicker;
    document.getElementById('help-title').textContent = h.titulo;
    document.getElementById('help-copy').textContent = h.copy;
    document.getElementById('help-equivalent').textContent = h.equiv;
    const reassurance = document.querySelector('.help-reassurance');
    if (reassurance) reassurance.textContent = modo === 'guiame' ? 'Con eso basta. Sigue con tu café.' : 'Úsalo como punto de partida y ajusta desde la taza.';
    document.getElementById('help-overlay').classList.add('abierto');
    document.getElementById('help-overlay').setAttribute('aria-hidden','false');
  };

  const originalGuardarRitual = guardarRitual;
  guardarRitual = function() {
    originalGuardarRitual();
    renderUltimo();
  };

  const originalMostrarVista = mostrarVista;
  mostrarVista = function(nombre) {
    originalMostrarVista(nombre);
    if (nombre === 'portada') renderUltimo();
    if (nombre === 'metodos') aplicarVozPantalla();
  };

  function bootCompanion() {
    inyectarEquipo();
    inyectarRepetir();
    aplicarVozPantalla();
    if (metodoActual) actualizarDetalle();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootCompanion);
  else bootCompanion();
})();
