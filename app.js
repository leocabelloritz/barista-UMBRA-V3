const METODOS = {
  v60: {
    id:'v60', nombre:'V60', tipo:'FILTRADO / LIMPIO', descripcion:'Una taza limpia y aromática. UMBRA te guía en los vertidos para que no tengas que pensar en técnica.', ratioBase:16, temperatura:92, molienda:'MEDIA',
    necesitas:['V60 + filtro','Café','Agua caliente','Taza o jarra'],
    ayudas:{
      molienda:{titulo:'¿No sabes qué es molienda media?',copy:'No necesitas memorizar categorías. Busca una textura parecida al azúcar granulada.',equiv:'Referencia visual: más gruesa que harina, más fina que sal gruesa.'},
      vertido:'Vierte lento desde poca altura. No necesitas un hervidor cuello de ganso.'
    },
    pasos:[
      {nombre:'Prepara el filtro',tipo:'SIN TIEMPO',segundos:0,objetivo:'Filtro listo',instruccion:'Pon el filtro en el V60. Si quieres, mójalo con agua caliente y bota esa agua.'},
      {nombre:'Moja el café',tipo:'TEMPORIZADO',segundos:45,agua:'bloom',objetivo:'3× el café',instruccion:'Agrega un poco de agua hasta mojar todo el café. No hace falta que quede perfecto.'},
      {nombre:'Sigue vertiendo',tipo:'VERTIDO',segundos:40,agua:'60%',objetivo:'60% del agua',instruccion:'Vierte lentamente, en círculos suaves, hasta llegar aproximadamente a este nivel.'},
      {nombre:'Completa el agua',tipo:'VERTIDO',segundos:45,agua:'100%',objetivo:'Toda el agua',instruccion:'Sigue vertiendo lento hasta usar toda el agua. Desde poca altura está bien.'},
      {nombre:'Deja terminar',tipo:'ESPERA',segundos:45,objetivo:'Que deje de gotear',instruccion:'Deja que el agua termine de pasar. Cuando el goteo sea lento, retira el V60.'}
    ]
  },
  francesa: {
    id:'francesa', nombre:'Prensa Francesa', tipo:'INMERSIÓN / SIMPLE', descripcion:'Cuerpo, dulzor y cero apuro. Mezclas café y agua, esperas y presionas.', ratioBase:15, temperatura:94, molienda:'GRUESA',
    necesitas:['Prensa francesa','Café','Agua caliente','Cuchara'],
    ayudas:{molienda:{titulo:'¿Qué tan gruesa?',copy:'Busca granos visibles, parecidos a sal gruesa. No tiene que ser exacto.',equiv:'Si compras café molido, pide “para prensa francesa”.'}},
    pasos:[
      {nombre:'Agrega el café',tipo:'SIN TIEMPO',segundos:0,objetivo:'Todo el café',instruccion:'Pon el café molido dentro de la prensa.'},
      {nombre:'Agrega el agua',tipo:'VERTIDO',segundos:20,agua:'100%',objetivo:'Toda el agua',instruccion:'Agrega toda el agua caliente. No necesitas hacerlo de una forma especial.'},
      {nombre:'Mezcla una vez',tipo:'SIN TIEMPO',segundos:0,objetivo:'Suave',instruccion:'Da una mezcla suave para asegurarte de que todo el café esté mojado.'},
      {nombre:'Déjalo tranquilo',tipo:'TEMPORIZADO',segundos:240,objetivo:'4 minutos',instruccion:'Pon la tapa sin bajar el émbolo y deja que el café haga lo suyo.'},
      {nombre:'Presiona y sirve',tipo:'FINAL',segundos:20,objetivo:'Lento y parejo',instruccion:'Baja el émbolo con calma y sirve el café de inmediato.'}
    ]
  },
  aeropress: {
    id:'aeropress', nombre:'AeroPress', tipo:'PRESIÓN / RÁPIDO', descripcion:'Una taza intensa y fácil de repetir. Ideal cuando quieres café rápido sin demasiada ceremonia.', ratioBase:14, temperatura:90, molienda:'MEDIA-FINA',
    necesitas:['AeroPress + filtro','Café','Agua caliente','Taza firme'],
    ayudas:{molienda:{titulo:'¿Media-fina?',copy:'Piensa en azúcar un poco más fina de lo normal. Evita que parezca polvo.',equiv:'Si dudas, usa molienda media: seguirá funcionando.'}},
    pasos:[
      {nombre:'Monta la AeroPress',tipo:'SIN TIEMPO',segundos:0,objetivo:'Sobre la taza',instruccion:'Pon el filtro y monta la AeroPress sobre una taza firme.'},
      {nombre:'Café y agua',tipo:'VERTIDO',segundos:25,agua:'100%',objetivo:'Toda el agua',instruccion:'Agrega el café y luego toda el agua caliente.'},
      {nombre:'Mezcla',tipo:'TEMPORIZADO',segundos:10,objetivo:'Suave',instruccion:'Mezcla suavemente durante unos segundos.'},
      {nombre:'Espera',tipo:'TEMPORIZADO',segundos:60,objetivo:'1 minuto',instruccion:'Coloca el émbolo apenas para sellar y espera.'},
      {nombre:'Presiona',tipo:'FINAL',segundos:30,objetivo:'Despacio',instruccion:'Presiona de forma constante. Cuando escuches aire, termina.'}
    ]
  },
  moka: {
    id:'moka', nombre:'Moka', tipo:'FOGÓN / INTENSO', descripcion:'Café intenso con un método de toda la vida. UMBRA se preocupa de que no termine quemado.', ratioBase:10, temperatura:90, molienda:'MEDIA-FINA',
    necesitas:['Moka','Café','Agua caliente','Cocina'],
    ayudas:{molienda:{titulo:'¿Qué molienda uso?',copy:'Más fina que V60, pero no tan fina como espresso. Parecida a azúcar fina.',equiv:'Si compras molido, pide “para moka”.'}},
    pasos:[
      {nombre:'Agrega el agua',tipo:'SIN TIEMPO',segundos:0,objetivo:'Bajo la válvula',instruccion:'Llena la base con agua caliente hasta justo debajo de la válvula.'},
      {nombre:'Llena el filtro',tipo:'SIN TIEMPO',segundos:0,objetivo:'Sin prensar',instruccion:'Llena el canastillo con café y nivélalo. No lo presiones.'},
      {nombre:'Fuego medio-bajo',tipo:'ESPERA',segundos:120,objetivo:'Sin apurar',instruccion:'Cierra la moka y ponla a fuego medio-bajo con la tapa abierta.'},
      {nombre:'Mira el flujo',tipo:'ESPERA',segundos:60,objetivo:'Flujo suave',instruccion:'Cuando salga café, busca un flujo continuo y suave. Si salpica, baja el fuego.'},
      {nombre:'Retira a tiempo',tipo:'FINAL',segundos:0,objetivo:'Antes del burbujeo fuerte',instruccion:'Cuando el café se aclare y empiece a sonar, retira la moka del fuego.'}
    ]
  }
};

const ICONOS = {
  v60:`<svg class="method-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M13 15h38L39 43H25L13 15Z"/><path d="M25 43v6h14v-6"/><path d="M20 22h24"/><path d="M28 49h8"/></svg>`,
  francesa:`<svg class="method-icon" viewBox="0 0 64 64" aria-hidden="true"><rect x="18" y="18" width="28" height="33" rx="2"/><path d="M15 15h34M32 9v34M27 9h10M46 26h5v17h-5M23 44h18"/></svg>`,
  aeropress:`<svg class="method-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M24 11h16M27 11v11M37 11v11"/><rect x="22" y="22" width="20" height="27" rx="2"/><path d="M18 49h28M25 54h14M32 22v-7"/></svg>`,
  moka:`<svg class="method-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M22 12h20l3 8-5 8 5 20H19l5-20-5-8 3-8Z"/><path d="M24 28h16M20 20h24M45 24h7l4 5-7 8h-6M26 8h12"/></svg>`
};

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let metodoActual=null, gramosCafe=20, ratioActual=16, pasoActual=0, modo='guiame';
let temporizador=null, segundosRestantes=0, segundosIniciales=0, timerCorriendo=false, tiempoTotal=0, inicioRitual=null;
let resultadoFinal='', cambiosFinal=[];
const STORE_RITUALES='umbra_rituales_v4', STORE_MODO='umbra_modo_v4';

const vistas=['portada','metodos','detalle','guia','final','journal'];
function mostrarVista(nombre){
  vistas.forEach(v=>$('#vista-'+v)?.classList.toggle('activa',v===nombre));
  if(nombre!=='portada') $('#app-principal').classList.remove('oculto');
  $('#bottom-nav')?.classList.toggle('oculto',['guia','final','detalle'].includes(nombre));
  $('#nav-metodos')?.classList.toggle('activo',['metodos','detalle','guia','final'].includes(nombre));
  $('#nav-journal')?.classList.toggle('activo',nombre==='journal');
  window.scrollTo({top:0,behavior:'smooth'});
}

function renderMetodos(){
  $('#lista-metodos').innerHTML=Object.values(METODOS).map(m=>`<button class="method-card" type="button" data-method="${m.id}">${ICONOS[m.id]}<strong>${m.nombre.toUpperCase()}</strong><small>${modo==='guiame'?m.tipo.split(' / ')[0]:`1:${m.ratioBase} · ${m.temperatura} °C`}</small></button>`).join('');
  $$('.method-card').forEach(b=>b.addEventListener('click',()=>seleccionarMetodo(b.dataset.method)));
}
function setModo(nuevo){
  modo=nuevo;localStorage.setItem(STORE_MODO,modo);
  $('#modo-guiame').classList.toggle('activo',modo==='guiame');$('#modo-directo').classList.toggle('activo',modo==='directo');
  $('#mensaje-modo').textContent=modo==='guiame'?'Te diremos solo lo necesario. Si te falta algo, UMBRA se adapta.':'Verás medidas y parámetros de inmediato. Las ayudas siguen disponibles cuando quieras.';
  renderMetodos();
}
function seleccionarMetodo(id){
  metodoActual=METODOS[id];gramosCafe=20;ratioActual=metodoActual.ratioBase;pasoActual=0;resultadoFinal='';cambiosFinal=[];
  actualizarDetalle();mostrarVista('detalle');
}
function aguaTotal(){return Math.round(gramosCafe*ratioActual)}
function actualizarDetalle(){
  const m=metodoActual, agua=aguaTotal();
  $('#detalle-tipo').textContent=m.tipo;$('#detalle-nombre').textContent=m.nombre;$('#detalle-descripcion').textContent=m.descripcion;$('#detalle-icono').innerHTML=ICONOS[m.id];
  $('#detalle-cafe').textContent=`${gramosCafe} g`;$('#detalle-agua').textContent=`${agua} ml`;$('#detalle-ratio').textContent=`1:${ratioActual}`;$('#detalle-temperatura').textContent=`${m.temperatura} °C`;$('#detalle-molienda').textContent=m.molienda;$('#cantidad-cafe').textContent=gramosCafe;
  $('#lista-necesitas').innerHTML=m.necesitas.map(x=>`<span class="need-item">${x}</span>`).join('');
  $('#bloque-necesitas').classList.toggle('oculto',modo==='directo');
  $('#opciones-intensidad').innerHTML=[{l:'SUAVE',r:m.ratioBase+1},{l:'BASE',r:m.ratioBase},{l:'INTENSO',r:m.ratioBase-1}].map(x=>`<button type="button" data-ratio="${x.r}" class="${ratioActual===x.r?'activo':''}">${x.l}<br>1:${x.r}</button>`).join('');
  $$('#opciones-intensidad button').forEach(b=>b.addEventListener('click',()=>{ratioActual=+b.dataset.ratio;actualizarDetalle()}));
  $('#preview-count').textContent=`${m.pasos.length} PASOS`;
  $('#lista-pasos-preview').innerHTML=m.pasos.map((p,i)=>`<div class="preview-step"><span class="num">${String(i+1).padStart(2,'0')}</span><div><strong>${nombrePaso(p)}</strong><p>${modo==='guiame'?textoPaso(p):p.instruccion}</p></div><span>${p.segundos?formato(p.segundos):'—'}</span></div>`).join('');
}
function nombrePaso(p){
  if(modo==='directo') return p.nombre;
  const mapa={'Moja el café':'Moja el café','Sigue vertiendo':'Sigue vertiendo','Completa el agua':'Completa el agua','Déjalo tranquilo':'Espera','Fuego medio-bajo':'Al fuego','Mira el flujo':'Mira el café'};return mapa[p.nombre]||p.nombre;
}
function textoPaso(p){return p.instruccion.replace(/aproximadamente /gi,'').replace(/de forma especial/gi,'especialmente')}
function formato(s){const m=Math.floor(s/60),r=s%60;return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`}

function iniciarGuia(){
  pasoActual=0;inicioRitual=Date.now();tiempoTotal=0;detenerTimer();
  const m=metodoActual;$('#guia-metodo').textContent=m.nombre.toUpperCase();$('#guia-icono').innerHTML=ICONOS[m.id];
  $('#guia-cafe').textContent=`${gramosCafe} g`;$('#guia-agua').textContent=`${aguaTotal()} ml`;$('#guia-temp').textContent=`${m.temperatura} °C`;$('#guia-molienda').textContent=m.molienda;
  renderPaso();mostrarVista('guia');solicitarWakeLock();
}
function renderPaso(){
  detenerTimer();const p=metodoActual.pasos[pasoActual], total=metodoActual.pasos.length, pct=Math.round((pasoActual+1)/total*100);
  $('#paso-indicador').textContent=`PASO ${String(pasoActual+1).padStart(2,'0')} / ${String(total).padStart(2,'0')}`;$('#paso-tipo').textContent=p.tipo;$('#paso-nombre').textContent=nombrePaso(p);$('#paso-instruccion').textContent=modo==='guiame'?textoPaso(p):p.instruccion;
  $('#paso-porcentaje').textContent=`${pct}%`;$('#barra-progreso-activa').style.width=`${pct}%`;
  const obj=objetivoPaso(p);$('#objetivo-paso-valor').textContent=obj.valor;$('#objetivo-paso-etiqueta').textContent=obj.etiqueta;
  segundosIniciales=p.segundos||0;segundosRestantes=segundosIniciales;$('#timer-guiado').textContent=formato(segundosRestantes);$('#timer-status').textContent=segundosIniciales?'TOCA PARA INICIAR':'SIN TEMPORIZADOR';actualizarRing();
  $('#next-label').textContent=pasoActual===total-1?'TERMINAR RITUAL':'SIGUIENTE PASO';
}
function objetivoPaso(p){
  const total=aguaTotal();
  if(p.agua==='bloom'){const ml=Math.min(total,gramosCafe*3);return{valor:`${ml} ml`,etiqueta:modo==='guiame'?'Solo moja todo el café':'Bloom / 3× café'}}
  if(p.agua==='60%')return{valor:`${Math.round(total*.6)} ml`,etiqueta:'Acumulados'};
  if(p.agua==='100%')return{valor:`${total} ml`,etiqueta:'Total'};
  return{valor:p.objetivo||'—',etiqueta:'Objetivo'};
}
function toggleTimer(){
  if(!segundosIniciales)return;
  if(timerCorriendo){clearInterval(temporizador);timerCorriendo=false;$('#timer-status').textContent='PAUSADO';return}
  if(segundosRestantes<=0){segundosRestantes=segundosIniciales}
  timerCorriendo=true;$('#timer-status').textContent='EN CURSO';
  temporizador=setInterval(()=>{segundosRestantes--;tiempoTotal++;$('#timer-guiado').textContent=formato(Math.max(0,segundosRestantes));actualizarRing();if(segundosRestantes<=0){detenerTimer(false);$('#timer-status').textContent='LISTO · CONTINÚA';navigator.vibrate?.(80)}},1000);
}
function detenerTimer(reset=false){if(temporizador)clearInterval(temporizador);temporizador=null;timerCorriendo=false;if(reset){segundosRestantes=segundosIniciales}}
function actualizarRing(){const circ=2*Math.PI*101, progreso=segundosIniciales?1-(segundosRestantes/segundosIniciales):0;$('#timer-ring-progress').style.strokeDasharray=circ;$('#timer-ring-progress').style.strokeDashoffset=circ*(1-progreso)}
function siguientePaso(){if(pasoActual<metodoActual.pasos.length-1){pasoActual++;renderPaso();window.scrollTo({top:0,behavior:'smooth'})}else{finalizarRitual()}}
function finalizarRitual(){detenerTimer();liberarWakeLock();if(inicioRitual)tiempoTotal=Math.max(tiempoTotal,Math.round((Date.now()-inicioRitual)/1000));const m=metodoActual;$('#resumen-metodo').textContent=m.nombre;$('#resumen-cafe').textContent=`${gramosCafe} g`;$('#resumen-agua').textContent=`${aguaTotal()} ml`;$('#resumen-tiempo').textContent=formato(tiempoTotal);$('#final-icono').innerHTML=ICONOS[m.id];$('.repeat-choice.activo')?.classList.remove('activo');$('#ajustes-final').classList.add('oculto');$('#nota-final').value='';$('#guardado-feedback').textContent='';mostrarVista('final')}

const HELP_BASE={
 cafe:{kicker:'SIN BALANZA',titulo:'¿No tienes balanza?',copy:'No pasa nada. Para empezar, una cucharada sopera de café suele rondar entre 8 y 10 g según la molienda.',equiv:()=>`${gramosCafe} g ≈ ${Math.max(1,Math.round(gramosCafe/9))} cucharadas soperas rasas. No necesitas clavar el número.`},
 agua:{kicker:'SIN MEDIDOR',titulo:'¿No puedes medir el agua?',copy:'Puedes usar una taza o vaso que ya conozcas. Muchos mugs domésticos tienen entre 250 y 350 ml.',equiv:()=>`${aguaTotal()} ml ≈ ${(aguaTotal()/250).toFixed(1).replace('.0','')} tazas de 250 ml.`},
 temperatura:{kicker:'SIN TERMÓMETRO',titulo:'¿No tienes termómetro?',copy:'Hierve el agua en tu hervidor de uso diario y déjala reposar antes de usarla.',equiv:()=>{const t=metodoActual?.temperatura||92;const espera=t>=94?'30–45 segundos':t>=92?'45–60 segundos':t>=90?'60–90 segundos':'90 segundos';return `Para acercarte a ${t} °C: hierve el agua, apaga el hervidor y espera ${espera}.`}},
 molienda:{kicker:'SIN TECNICISMOS',titulo:'¿Qué significa esta molienda?',copy:'No necesitas aprender una escala. Usa una referencia visual sencilla.',equiv:()=>metodoActual?.ayudas?.molienda?.equiv||'Si dudas, usa una molienda media.'}
};
function abrirAyuda(tipo){const h=HELP_BASE[tipo];if(!h)return;$('#help-kicker').textContent=h.kicker;$('#help-title').textContent=tipo==='molienda'?(metodoActual?.ayudas?.molienda?.titulo||h.titulo):h.titulo;$('#help-copy').textContent=tipo==='molienda'?(metodoActual?.ayudas?.molienda?.copy||h.copy):h.copy;$('#help-equivalent').textContent=typeof h.equiv==='function'?h.equiv():h.equiv;$('#help-overlay').classList.add('abierto');$('#help-overlay').setAttribute('aria-hidden','false')}
function cerrarAyuda(){$('#help-overlay').classList.remove('abierto');$('#help-overlay').setAttribute('aria-hidden','true')}

function guardarRitual(){
  if(!resultadoFinal){$('#guardado-feedback').textContent='Antes dime si la repetirías tal cual o cambiarías algo.';return}
  const items=leerRituales();const item={id:Date.now(),fecha:new Date().toISOString(),metodo:metodoActual.id,nombre:metodoActual.nombre,cafe:gramosCafe,agua:aguaTotal(),ratio:ratioActual,temp:metodoActual.temperatura,molienda:metodoActual.molienda,tiempo:tiempoTotal,resultado:resultadoFinal,cambios:[...cambiosFinal],nota:$('#nota-final').value.trim()};items.unshift(item);localStorage.setItem(STORE_RITUALES,JSON.stringify(items.slice(0,60)));$('#guardado-feedback').textContent='Ritual guardado. Ya puedes volver a esta taza cuando quieras.';renderJournal();
}
function leerRituales(){try{return JSON.parse(localStorage.getItem(STORE_RITUALES)||'[]')}catch{return[]}}
function renderJournal(){const items=leerRituales();$('#journal-empty').classList.toggle('oculto',items.length>0);$('#btn-borrar-journal').classList.toggle('oculto',items.length===0);$('#journal-list').innerHTML=items.map(r=>{const fecha=new Date(r.fecha).toLocaleDateString('es-CL',{day:'2-digit',month:'short'}).replace('.','').toUpperCase();return `<article class="ritual-card"><div class="ritual-card-icon">${ICONOS[r.metodo]||ICONOS.v60}</div><div><h3>${r.nombre.toUpperCase()} / ${r.resultado==='tal-cual'?'TAL CUAL':'AJUSTAR'}</h3><p>${r.cafe} g / ${r.agua} ml / 1:${r.ratio} / ${formato(r.tiempo||0)}</p><small>${r.nota||r.cambios?.join(' · ')||fecha}</small></div><button class="ritual-delete" type="button" data-delete="${r.id}" aria-label="Eliminar">×</button></article>`}).join('');$$('[data-delete]').forEach(b=>b.addEventListener('click',()=>{localStorage.setItem(STORE_RITUALES,JSON.stringify(items.filter(x=>String(x.id)!==b.dataset.delete)));renderJournal()}))}

async function solicitarWakeLock(){try{if('wakeLock'in navigator)window._umbraWake=await navigator.wakeLock.request('screen')}catch{}}
async function liberarWakeLock(){try{await window._umbraWake?.release();window._umbraWake=null}catch{}}

function bind(){
  $('#btn-iniciar-ritual').addEventListener('click',()=>{localStorage.setItem('umbra_visited','1');mostrarVista('metodos')});
  $('#btn-home').addEventListener('click',()=>mostrarVista('metodos'));$('#btn-menu').addEventListener('click',()=>{renderJournal();mostrarVista('journal')});
  $('#modo-guiame').addEventListener('click',()=>setModo('guiame'));$('#modo-directo').addEventListener('click',()=>setModo('directo'));
  $('#btn-volver-metodos').addEventListener('click',()=>mostrarVista('metodos'));$('#btn-menos').addEventListener('click',()=>{gramosCafe=Math.max(8,gramosCafe-1);actualizarDetalle()});$('#btn-mas').addEventListener('click',()=>{gramosCafe=Math.min(60,gramosCafe+1);actualizarDetalle()});
  $('#btn-iniciar-guia').addEventListener('click',iniciarGuia);$('#btn-salir-guia').addEventListener('click',()=>{detenerTimer();liberarWakeLock();mostrarVista('detalle')});$('#timer-circle-control').addEventListener('click',toggleTimer);$('#btn-siguiente-paso').addEventListener('click',siguientePaso);
  $$('.help-trigger').forEach(b=>b.addEventListener('click',()=>abrirAyuda(b.dataset.help)));['help-backdrop','help-close','help-ok'].forEach(id=>$('#'+id).addEventListener('click',cerrarAyuda));
  $$('.repeat-choice').forEach(b=>b.addEventListener('click',()=>{resultadoFinal=b.dataset.result;$$('.repeat-choice').forEach(x=>x.classList.toggle('activo',x===b));$('#ajustes-final').classList.toggle('oculto',resultadoFinal!=='cambiaria')}));
  $$('.change-chips button').forEach(b=>b.addEventListener('click',()=>{b.classList.toggle('activo');cambiosFinal=$$('.change-chips button.activo').map(x=>x.dataset.change)}));
  $('#btn-guardar-ritual').addEventListener('click',guardarRitual);$('#btn-nuevo-ritual').addEventListener('click',()=>mostrarVista('metodos'));$('#btn-cerrar-journal').addEventListener('click',()=>mostrarVista('metodos'));$('#nav-metodos').addEventListener('click',()=>mostrarVista('metodos'));$('#nav-journal').addEventListener('click',()=>{renderJournal();mostrarVista('journal')});
  $('#btn-borrar-journal').addEventListener('click',()=>{if(confirm('¿Borrar todos tus rituales guardados?')){localStorage.removeItem(STORE_RITUALES);renderJournal()}});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&$('#vista-guia').classList.contains('activa'))solicitarWakeLock()});
}

function init(){bind();setModo(localStorage.getItem(STORE_MODO)||'guiame');renderJournal();mostrarVista('portada')}
document.addEventListener('DOMContentLoaded',init);
