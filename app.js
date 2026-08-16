let metodoActual = null;

let gramosCafe = 20;
let ratioActual = 16;

let pasoActual = 0;

let temporizador = null;
let temporizadorCorriendo = false;

let segundosRestantes = 0;
let segundosInicialesPaso = 0;

let wakeLock = null;

let preparacionGuardadaActual = false;

let registroActualId = null;
let resultadoActual = "";

let filtroJournalActual = "todas";


const STORAGE_JOURNAL =
    "umbra_journal_v1";


// =====================================================
// DOM
// =====================================================

const vistaMetodos =
    document.getElementById("vista-metodos");

const vistaDetalle =
    document.getElementById("vista-detalle");

const vistaGuia =
    document.getElementById("vista-guia");

const vistaFinal =
    document.getElementById("vista-final");

const vistaJournal =
    document.getElementById("vista-journal");

const vistaRegistro =
    document.getElementById("vista-registro");


const listaMetodos =
    document.getElementById("lista-metodos");

const detalleTipo =
    document.getElementById("detalle-tipo");

const detalleNombre =
    document.getElementById("detalle-nombre");

const detalleDescripcion =
    document.getElementById("detalle-descripcion");

const detalleCafe =
    document.getElementById("detalle-cafe");

const detalleAgua =
    document.getElementById("detalle-agua");

const detalleRatio =
    document.getElementById("detalle-ratio");

const detalleTemperatura =
    document.getElementById("detalle-temperatura");

const detalleMolienda =
    document.getElementById("detalle-molienda");

const cantidadCafe =
    document.getElementById("cantidad-cafe");

const opcionesIntensidad =
    document.getElementById("opciones-intensidad");

const listaPasosPreview =
    document.getElementById("lista-pasos-preview");


const guiaMetodo =
    document.getElementById("guia-metodo");

const guideSummaryMain =
    document.getElementById("guide-summary-main");

const guideSummaryRatio =
    document.getElementById("guide-summary-ratio");

const pasoIndicador =
    document.getElementById("paso-indicador");

const pasoPorcentaje =
    document.getElementById("paso-porcentaje");

const barraProgresoActiva =
    document.getElementById("barra-progreso-activa");

const pasoNombre =
    document.getElementById("paso-nombre");

const pasoTipo =
    document.getElementById("paso-tipo");

const pasoInstruccion =
    document.getElementById("paso-instruccion");

const objetivoPaso =
    document.getElementById("objetivo-paso");

const objetivoPasoValor =
    document.getElementById("objetivo-paso-valor");

const objetivoPasoEtiqueta =
    document.getElementById("objetivo-paso-etiqueta");


const timerCircleControl =
    document.getElementById("timer-circle-control");

const timerGuiado =
    document.getElementById("timer-guiado");

const timerStatus =
    document.getElementById("timer-status");

const timerDisplay =
    document.getElementById("timer-display");

const timerAction =
    document.getElementById("timer-action");

const timerActionLabel =
    document.getElementById("timer-action-label");

const timerRingProgress =
    document.getElementById("timer-ring-progress");


const resumenMetodo =
    document.getElementById("resumen-metodo");

const resumenCafe =
    document.getElementById("resumen-cafe");

const resumenAgua =
    document.getElementById("resumen-agua");

const resumenRatio =
    document.getElementById("resumen-ratio");

const btnGuardarPreparacion =
    document.getElementById("btn-guardar-preparacion");

const guardadoFeedback =
    document.getElementById("guardado-feedback");


const journalEmpty =
    document.getElementById("journal-empty");

const journalFilterEmpty =
    document.getElementById("journal-filter-empty");

const journalList =
    document.getElementById("journal-list");

const journalCount =
    document.getElementById("journal-count");

const journalFilterCount =
    document.getElementById("journal-filter-count");

const journalStatTotal =
    document.getElementById("journal-stat-total");

const journalStatMetodo =
    document.getElementById("journal-stat-metodo");

const journalStatRatio =
    document.getElementById("journal-stat-ratio");

const journalStatUltima =
    document.getElementById("journal-stat-ultima");

const journalFilters =
    document.querySelectorAll(".journal-filter");


const registroFecha =
    document.getElementById("registro-fecha");

const registroMetodo =
    document.getElementById("registro-metodo");

const registroReceta =
    document.getElementById("registro-receta");

const registroTemperatura =
    document.getElementById("registro-temperatura");

const registroMolienda =
    document.getElementById("registro-molienda");

const registroCafeNombre =
    document.getElementById("registro-cafe-nombre");

const registroNota =
    document.getElementById("registro-nota");

const registroFeedback =
    document.getElementById("registro-feedback");

const resultadoOptions =
    document.querySelectorAll(".resultado-option");


const navMetodos =
    document.getElementById("nav-metodos");

const navGuia =
    document.getElementById("nav-guia");

const navJournal =
    document.getElementById("nav-journal");


// =====================================================
// NAVEGACIÓN
// =====================================================

function mostrarVista(vista) {

    document
        .querySelectorAll(".vista")
        .forEach(elemento => {

            elemento.classList.remove("activa");

        });


    vista.classList.add("activa");


    document.body.classList.toggle(

        "modo-guia",

        vista === vistaGuia

    );


    if (vista === vistaJournal) {

        cargarJournal();

    }


    window.scrollTo({

        top: 0,

        behavior:
            vista === vistaGuia
                ? "auto"
                : "smooth"

    });

}


function actualizarNav(nombre) {

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("activo");

        });


    if (nombre === "metodos") {
        navMetodos.classList.add("activo");
    }

    if (nombre === "guia") {
        navGuia.classList.add("activo");
    }

    if (nombre === "journal") {
        navJournal.classList.add("activo");
    }

}


// =====================================================
// ICONOS DE MÉTODO
// =====================================================

function obtenerIconoMetodo(idMetodo, clase = "") {

    const claseExtra = clase
        ? ` ${clase}`
        : "";

    const iconos = {

        v60: `
            <svg class="method-icon${claseExtra}" viewBox="0 0 64 64" aria-hidden="true">
                <path d="M13 15h38L39 43H25L13 15Z"></path>
                <path d="M25 43v6h14v-6"></path>
                <path d="M20 22h24"></path>
                <path d="M28 49h8"></path>
            </svg>
        `,

        francesa: `
            <svg class="method-icon${claseExtra}" viewBox="0 0 64 64" aria-hidden="true">
                <rect x="18" y="18" width="28" height="33" rx="2"></rect>
                <path d="M15 15h34"></path>
                <path d="M32 9v34"></path>
                <path d="M27 9h10"></path>
                <path d="M46 26h5v17h-5"></path>
                <path d="M23 44h18"></path>
            </svg>
        `,

        aeropress: `
            <svg class="method-icon${claseExtra}" viewBox="0 0 64 64" aria-hidden="true">
                <path d="M24 11h16"></path>
                <path d="M27 11v11"></path>
                <path d="M37 11v11"></path>
                <rect x="22" y="22" width="20" height="27" rx="2"></rect>
                <path d="M18 49h28"></path>
                <path d="M25 54h14"></path>
                <path d="M32 22v-7"></path>
            </svg>
        `,

        moka: `
            <svg class="method-icon${claseExtra}" viewBox="0 0 64 64" aria-hidden="true">
                <path d="M22 12h20l3 8-5 8 5 20H19l5-20-5-8 3-8Z"></path>
                <path d="M24 28h16"></path>
                <path d="M20 20h24"></path>
                <path d="M45 24h7l4 5-7 8h-6"></path>
                <path d="M26 8h12"></path>
            </svg>
        `

    };

    return iconos[idMetodo] || iconos.francesa;

}


function actualizarIconografiaMetodo() {

    if (!metodoActual) {
        return;
    }

    const ilustracionDetalle =
        document.querySelector(".method-illustration");

    if (ilustracionDetalle) {
        ilustracionDetalle.innerHTML =
            obtenerIconoMetodo(
                metodoActual.id,
                "method-icon--hero"
            );
    }

}


function actualizarIconoFinal() {

    if (!metodoActual) {
        return;
    }

    const finalPage =
        document.querySelector(".final-page");

    if (!finalPage) {
        return;
    }

    let contenedor =
        finalPage.querySelector(".final-method-icon");

    if (!contenedor) {
        contenedor =
            document.createElement("div");

        contenedor.className =
            "final-method-icon";

        const finalSummary =
            finalPage.querySelector(".final-summary");

        finalPage.insertBefore(
            contenedor,
            finalSummary
        );
    }

    contenedor.innerHTML =
        obtenerIconoMetodo(
            metodoActual.id,
            "method-icon--final"
        );

}


// =====================================================
// MÉTODOS
// =====================================================

function cargarMetodos() {

    listaMetodos.innerHTML = "";


    Object
        .values(METODOS)
        .forEach(metodo => {


            const agua =
                Math.round(
                    metodo.cafeDefault *
                    metodo.ratioDefault
                );


            const boton =
                document.createElement("button");


            boton.type =
                "button";


            boton.className =
                "tarjeta-metodo";


            boton.innerHTML = `

                <div class="metodo-grafico">
                    ${obtenerIconoMetodo(metodo.id, "method-icon--card")}
                </div>


                <div class="metodo-info">

                    <span class="metodo-meta">
                        ${metodo.subtitulo} /
                    </span>

                    <strong>
                        ${metodo.nombre}
                    </strong>

                    <p>
                        ${metodo.descripcion}
                    </p>

                    <small>
                        1:${metodo.ratioDefault}
                        /
                        ${metodo.cafeDefault} g
                        /
                        ${agua} ml
                    </small>

                </div>


                <span class="metodo-flecha">
                    →
                </span>

            `;


            boton.addEventListener(

                "click",

                () => abrirMetodo(
                    metodo.id
                )

            );


            listaMetodos.appendChild(
                boton
            );

        });

}


function abrirMetodo(idMetodo) {

    metodoActual =
        METODOS[idMetodo];


    gramosCafe =
        metodoActual.cafeDefault;


    ratioActual =
        metodoActual.ratioDefault;


    actualizarDetalle();

    cargarRatios();

    cargarPreviewPasos();


    mostrarVista(
        vistaDetalle
    );


    actualizarNav(
        "metodos"
    );

}


// =====================================================
// DETALLE
// =====================================================

function actualizarDetalle() {

    if (!metodoActual) {
        return;
    }


    detalleTipo.textContent =
        `${metodoActual.subtitulo.toUpperCase()} / MÉTODO`;


    detalleNombre.textContent =
        metodoActual.nombre;


    detalleDescripcion.textContent =
        metodoActual.descripcion;


    detalleCafe.textContent =
        `${gramosCafe} g`;


    detalleAgua.textContent =
        `${obtenerAguaTotal()} ml`;


    detalleRatio.textContent =
        `1:${ratioActual}`;


    detalleTemperatura.textContent =
        metodoActual.temperatura;


    detalleMolienda.textContent =
        metodoActual.molienda;


    cantidadCafe.textContent =
        gramosCafe;


    actualizarIconografiaMetodo();

}


// =====================================================
// RATIOS
// =====================================================

function cargarRatios() {

    opcionesIntensidad.innerHTML = "";


    metodoActual.ratios.forEach(opcion => {


        const boton =
            document.createElement("button");


        boton.type =
            "button";


        boton.className =
            "boton-ratio";


        boton.innerHTML = `

            <strong>
                ${opcion.nombre}
            </strong>

            <span>
                1:${opcion.ratio}
            </span>

        `;


        if (
            opcion.ratio === ratioActual
        ) {

            boton.classList.add("activo");

        }


        boton.addEventListener(

            "click",

            () => {

                ratioActual =
                    opcion.ratio;


                cargarRatios();

                actualizarDetalle();

                cargarPreviewPasos();

            }

        );


        opcionesIntensidad.appendChild(
            boton
        );

    });

}


// =====================================================
// CAFÉ
// =====================================================

function cambiarCafe(cantidad) {

    gramosCafe += cantidad;


    gramosCafe =
        Math.max(
            5,
            Math.min(
                gramosCafe,
                100
            )
        );


    actualizarDetalle();

    cargarPreviewPasos();

}


// =====================================================
// CÁLCULOS
// =====================================================

function obtenerAguaTotal() {

    return Math.round(
        gramosCafe *
        ratioActual
    );

}


function obtenerAguaBloom() {

    const multiplicador =
        metodoActual
            ?.parametros
            ?.bloomMultiplicador
        ?? 3;


    return Math.min(

        Math.round(
            gramosCafe *
            multiplicador
        ),

        obtenerAguaTotal()

    );

}


function obtenerObjetivoAcumulado(
    porcentaje
) {

    return Math.round(
        obtenerAguaTotal() *
        porcentaje
    );

}


function obtenerAguaAnterior(
    indicePaso
) {

    let aguaAnterior = 0;


    for (
        let i = 0;
        i < indicePaso;
        i++
    ) {

        const paso =
            metodoActual.pasos[i];


        if (paso.agua === "bloom") {

            aguaAnterior =
                obtenerAguaBloom();

        }


        if (paso.agua === "acumulado") {

            aguaAnterior =
                obtenerObjetivoAcumulado(
                    paso.porcentaje
                );

        }


        if (
            paso.agua === "restante" ||
            paso.agua === "total"
        ) {

            aguaAnterior =
                obtenerAguaTotal();

        }

    }


    return aguaAnterior;

}


// =====================================================
// PASOS
// =====================================================

function obtenerDatosPaso(
    paso,
    indice
) {

    if (paso.agua === "bloom") {

        const cantidad =
            obtenerAguaBloom();


        return {

            valor:
                `${cantidad} ml`,

            etiqueta:
                "Agua para este paso",

            instruccion:
                `Agrega ${cantidad} ml de agua y humedece todo el café de forma uniforme.`

        };

    }


    if (paso.agua === "restante") {

        const anterior =
            obtenerAguaAnterior(
                indice
            );


        const cantidad =
            Math.max(
                obtenerAguaTotal() -
                anterior,
                0
            );


        return {

            valor:
                `${cantidad} ml`,

            etiqueta:
                "Agua restante",

            instruccion:
                `Agrega lentamente los ${cantidad} ml restantes.`

        };

    }


    if (paso.agua === "acumulado") {

        const objetivo =
            obtenerObjetivoAcumulado(
                paso.porcentaje
            );


        const anterior =
            obtenerAguaAnterior(
                indice
            );


        const cantidad =
            Math.max(
                objetivo -
                anterior,
                0
            );


        return {

            valor:
                `${objetivo} ml`,

            etiqueta:
                "Objetivo en balanza",

            instruccion:
                `Agrega ${cantidad} ml lentamente hasta llegar a ${objetivo} ml.`

        };

    }


    if (paso.agua === "total") {

        const total =
            obtenerAguaTotal();


        return {

            valor:
                `${total} ml`,

            etiqueta:
                "Agua total",

            instruccion:
                `Agrega ${total} ml de agua.`

        };

    }


    return {

        valor:
            null,

        etiqueta:
            null,

        instruccion:
            paso.instruccion || ""

    };

}


function cargarPreviewPasos() {

    listaPasosPreview.innerHTML = "";


    metodoActual.pasos.forEach(
        (paso, indice) => {


            const datos =
                obtenerDatosPaso(
                    paso,
                    indice
                );


            const item =
                document.createElement("div");


            item.className =
                "paso-preview";


            let meta = "";


            if (paso.tipo === "timer") {

                meta =
                    formatearTiempo(
                        paso.tiempo
                    );

            }


            if (datos.valor) {

                meta +=
                    meta
                        ? ` / ${datos.valor}`
                        : datos.valor;

            }


            item.innerHTML = `

                <span class="paso-numero">

                    ${String(indice + 1).padStart(2,"0")}

                </span>


                <div>

                    <strong>
                        ${paso.nombre}
                    </strong>

                    <p>
                        ${datos.instruccion}
                    </p>

                    <small>
                        ${meta}
                    </small>

                </div>

            `;


            listaPasosPreview.appendChild(
                item
            );

        }
    );

}


// =====================================================
// GUÍA
// =====================================================

function iniciarGuia() {

    if (!metodoActual) {
        return;
    }


    pasoActual = 0;


    guiaMetodo.innerHTML =
        `${obtenerIconoMetodo(metodoActual.id, "method-icon--guide")}<span>${metodoActual.nombre.toUpperCase()} / ${metodoActual.subtitulo.toUpperCase()}</span>`;


    guideSummaryMain.textContent =
        `${gramosCafe} g / ${obtenerAguaTotal()} ml`;


    guideSummaryRatio.textContent =
        `1:${ratioActual}`;


    mostrarVista(
        vistaGuia
    );


    cargarPaso();

    solicitarWakeLock();

}


function cargarPaso() {

    detenerTemporizador();


    const paso =
        metodoActual.pasos[
            pasoActual
        ];


    const total =
        metodoActual.pasos.length;


    pasoIndicador.textContent =
        `PASO ${String(pasoActual + 1).padStart(2,"0")} / ${String(total).padStart(2,"0")}`;


    const porcentaje =
        Math.round(
            (
                (pasoActual + 1) /
                total
            ) *
            100
        );


    pasoPorcentaje.textContent =
        `${porcentaje}%`;


    barraProgresoActiva.style.width =
        `${porcentaje}%`;


    pasoNombre.textContent =
        paso.nombre;


    pasoTipo.textContent =
        paso.tipo === "timer"
            ? "TEMPORIZADO"
            : "ACCIÓN";


    const datos =
        obtenerDatosPaso(
            paso,
            pasoActual
        );


    pasoInstruccion.textContent =
        datos.instruccion;


    if (datos.valor) {

        objetivoPaso.style.display =
            "flex";


        objetivoPasoValor.textContent =
            datos.valor;


        objetivoPasoEtiqueta.textContent =
            datos.etiqueta;

    }

    else {

        objetivoPaso.style.display =
            "none";

    }


    if (paso.tipo === "timer") {

        prepararPasoTemporizado(
            paso
        );

    }

    else {

        prepararPasoAccion();

    }

}


// =====================================================
// TIMER
// =====================================================

function prepararPasoTemporizado(
    paso
) {

    segundosRestantes =
        Number(
            paso.tiempo
        ) || 0;


    segundosInicialesPaso =
        segundosRestantes;


    actualizarDisplayTimer();

    resetearCirculoTimer();

    mostrarAccionCentral("INICIAR");

}


function prepararPasoAccion() {

    segundosRestantes = 0;

    segundosInicialesPaso = 0;


    resetearCirculoTimer();


    mostrarAccionCentral(

        pasoActual ===
        metodoActual.pasos.length - 1
            ? "TERMINAR"
            : "CONTINUAR"

    );

}


function manejarControlCircular() {

    const paso =
        metodoActual.pasos[
            pasoActual
        ];


    if (paso.tipo !== "timer") {

        avanzarPaso();

        return;

    }


    if (segundosRestantes <= 0) {

        avanzarPaso();

        return;

    }


    if (temporizadorCorriendo) {

        pausarTemporizador();

        return;

    }


    iniciarTimerPaso();

}


function iniciarTimerPaso() {

    if (
        segundosRestantes <= 0 ||
        temporizadorCorriendo
    ) {

        return;

    }


    temporizadorCorriendo = true;


    mostrarTiempo();


    timerStatus.textContent =
        "TOCA PARA PAUSAR";


    temporizador =
        setInterval(

            () => {


                segundosRestantes--;


                segundosRestantes =
                    Math.max(
                        0,
                        segundosRestantes
                    );


                actualizarDisplayTimer();

                actualizarCirculoTimer();


                if (
                    segundosRestantes <= 0
                ) {

                    finalizarPasoTimer();

                }

            },

            1000

        );

}


function pausarTemporizador() {

    detenerTemporizador();

    mostrarAccionCentral(
        "REANUDAR"
    );

}


function detenerTemporizador() {

    if (temporizador) {

        clearInterval(
            temporizador
        );

        temporizador = null;

    }


    temporizadorCorriendo =
        false;

}


function finalizarPasoTimer() {

    detenerTemporizador();


    segundosRestantes = 0;


    actualizarDisplayTimer();

    completarCirculoTimer();


    if ("vibrate" in navigator) {

        navigator.vibrate(
            [300,150,300]
        );

    }


    mostrarAccionCentral(

        pasoActual ===
        metodoActual.pasos.length - 1
            ? "TERMINAR"
            : "CONTINUAR"

    );

}


function mostrarTiempo() {

    timerAction.style.display =
        "none";

    timerDisplay.style.display =
        "flex";

}


function mostrarAccionCentral(
    texto
) {

    timerDisplay.style.display =
        "none";

    timerAction.style.display =
        "flex";

    timerActionLabel.textContent =
        texto;

}


function actualizarDisplayTimer() {

    timerGuiado.textContent =
        formatearTiempo(
            segundosRestantes
        );

}


function formatearTiempo(
    totalSegundos
) {

    const total =
        Math.max(
            0,
            Math.round(
                Number(totalSegundos) || 0
            )
        );


    const minutos =
        Math.floor(total / 60);


    const segundos =
        total % 60;


    return `${String(minutos).padStart(2,"0")}:${String(segundos).padStart(2,"0")}`;

}


function actualizarCirculoTimer() {

    if (
        segundosInicialesPaso <= 0
    ) {

        return;

    }


    const longitud = 578;


    const progreso =
        1 -
        segundosRestantes /
        segundosInicialesPaso;


    timerRingProgress
        .style
        .strokeDashoffset =
            longitud -
            longitud *
            progreso;

}


function resetearCirculoTimer() {

    timerRingProgress
        .style
        .strokeDashoffset =
            578;

}


function completarCirculoTimer() {

    timerRingProgress
        .style
        .strokeDashoffset =
            0;

}


function avanzarPaso() {

    detenerTemporizador();


    if (
        pasoActual <
        metodoActual.pasos.length - 1
    ) {

        pasoActual++;

        cargarPaso();

    }

    else {

        finalizarPreparacion();

    }

}


// =====================================================
// FINAL
// =====================================================

function finalizarPreparacion() {

    detenerTemporizador();

    liberarWakeLock();


    preparacionGuardadaActual =
        false;


    guardadoFeedback.hidden =
        true;


    btnGuardarPreparacion.disabled =
        false;


    btnGuardarPreparacion.style.opacity =
        "1";


    resumenMetodo.textContent =
        metodoActual.nombre;


    resumenCafe.textContent =
        `${gramosCafe} g`;


    resumenAgua.textContent =
        `${obtenerAguaTotal()} ml`;


    resumenRatio.textContent =
        `1:${ratioActual}`;


    actualizarIconoFinal();


    mostrarVista(
        vistaFinal
    );

}


// =====================================================
// STORAGE
// =====================================================

function obtenerRegistrosJournal() {

    try {

        const datos =
            localStorage.getItem(
                STORAGE_JOURNAL
            );


        return datos
            ? JSON.parse(datos)
            : [];

    }

    catch {

        return [];

    }

}


function escribirRegistrosJournal(
    registros
) {

    localStorage.setItem(

        STORAGE_JOURNAL,

        JSON.stringify(
            registros
        )

    );

}


// =====================================================
// GUARDAR PREPARACIÓN
// =====================================================

function guardarPreparacion() {

    if (
        !metodoActual ||
        preparacionGuardadaActual
    ) {

        return;

    }


    const registro = {

        id:
            `${Date.now()}-${Math.random().toString(16).slice(2)}`,

        timestamp:
            new Date().toISOString(),

        metodoId:
            metodoActual.id,

        metodo:
            metodoActual.nombre,

        subtitulo:
            metodoActual.subtitulo,

        cafe:
            gramosCafe,

        agua:
            obtenerAguaTotal(),

        ratio:
            ratioActual,

        temperatura:
            metodoActual.temperatura,

        molienda:
            metodoActual.molienda,

        cafeNombre:
            "",

        resultado:
            "",

        nota:
            ""

    };


    const registros =
        obtenerRegistrosJournal();


    registros.unshift(
        registro
    );


    escribirRegistrosJournal(
        registros
    );


    preparacionGuardadaActual =
        true;


    guardadoFeedback.hidden =
        false;


    btnGuardarPreparacion.disabled =
        true;


    btnGuardarPreparacion.style.opacity =
        "0.35";

}


// =====================================================
// JOURNAL STATS
// =====================================================

function calcularEstadisticas(
    registros
) {

    if (
        registros.length === 0
    ) {

        return {

            total:
                0,

            metodo:
                "—",

            ratio:
                "—",

            ultima:
                "—"

        };

    }


    const metodos =
        {};


    const ratios =
        {};


    registros.forEach(
        registro => {


            const metodo =
                registro.metodo || "—";


            metodos[metodo] =
                (metodos[metodo] || 0) + 1;


            const ratio =
                registro.ratio;


            if (ratio) {

                ratios[ratio] =
                    (ratios[ratio] || 0) + 1;

            }

        }
    );


    const metodoMasUsado =
        Object
            .entries(metodos)
            .sort(
                (a,b) =>
                    b[1] - a[1]
            )[0]?.[0]
        || "—";


    const ratioMasUsado =
        Object
            .entries(ratios)
            .sort(
                (a,b) =>
                    b[1] - a[1]
            )[0]?.[0];


    const ultima =
        registros[0];


    const ultimaTexto =
        ultima.cafeNombre
            ? ultima.cafeNombre
            : ultima.metodo;


    return {

        total:
            registros.length,

        metodo:
            metodoMasUsado,

        ratio:
            ratioMasUsado
                ? `1:${ratioMasUsado}`
                : "—",

        ultima:
            ultimaTexto || "—"

    };

}


// =====================================================
// JOURNAL
// =====================================================

function cargarJournal() {

    const registros =
        obtenerRegistrosJournal();


    const estadisticas =
        calcularEstadisticas(
            registros
        );


    journalStatTotal.textContent =
        estadisticas.total;


    journalStatMetodo.textContent =
        estadisticas.metodo;


    journalStatRatio.textContent =
        estadisticas.ratio;


    journalStatUltima.textContent =
        estadisticas.ultima;


    journalCount.textContent =
        String(
            registros.length
        ).padStart(
            2,
            "0"
        );


    if (
        registros.length === 0
    ) {

        journalEmpty.style.display =
            "flex";


        journalFilterEmpty.hidden =
            true;


        journalList.innerHTML =
            "";


        journalFilterCount.textContent =
            "0 REGISTROS";


        return;

    }


    journalEmpty.style.display =
        "none";


    let filtrados =
        registros;


    if (
        filtroJournalActual !==
        "todas"
    ) {

        filtrados =
            registros.filter(

                registro =>

                    registro.metodoId ===
                    filtroJournalActual

            );

    }


    journalFilterCount.textContent =
        `${filtrados.length} ${
            filtrados.length === 1
                ? "REGISTRO"
                : "REGISTROS"
        }`;


    journalList.innerHTML =
        "";


    if (
        filtrados.length === 0
    ) {

        journalFilterEmpty.hidden =
            false;

        return;

    }


    journalFilterEmpty.hidden =
        true;


    filtrados.forEach(
        registro => {


            const tarjeta =
                document.createElement(
                    "button"
                );


            tarjeta.type =
                "button";


            tarjeta.className =
                "journal-card";


            const resultado =
                registro.resultado
                    ? registro.resultado.toUpperCase()
                    : "";


            tarjeta.innerHTML = `

                <div class="journal-card-date">

                    ${formatearFechaRegistro(
                        registro.timestamp
                    )}

                </div>


                <div class="journal-card-main">

                    <div>

                        <h2 class="journal-card-title">

                            ${escapeHTML(
                                registro.metodo
                            )}

                        </h2>


                        ${
                            registro.cafeNombre

                                ? `
                                    <div class="journal-card-coffee">

                                        ${escapeHTML(
                                            registro.cafeNombre
                                        )}

                                    </div>
                                `

                                : ""
                        }


                        <div class="journal-card-recipe">

                            ${registro.cafe} g
                            /
                            ${registro.agua} ml

                        </div>

                    </div>


                    <span class="journal-arrow">
                        →
                    </span>

                </div>


                <div class="journal-card-data">

                    <div class="journal-data-item">

                        <span>
                            RATIO /
                        </span>

                        <strong>
                            1:${registro.ratio}
                        </strong>

                    </div>


                    <div class="journal-data-item">

                        <span>
                            TEMP /
                        </span>

                        <strong>

                            ${escapeHTML(
                                registro.temperatura || "—"
                            )}

                        </strong>

                    </div>


                    <div class="journal-data-item">

                        <span>
                            MOLIENDA /
                        </span>

                        <strong>

                            ${escapeHTML(
                                registro.molienda || "—"
                            )}

                        </strong>

                    </div>

                </div>


                ${
                    resultado

                        ? `
                            <div class="journal-result">

                                RESULTADO / ${resultado}

                            </div>
                        `

                        : ""
                }

            `;


            tarjeta.addEventListener(

                "click",

                () => abrirRegistro(
                    registro.id
                )

            );


            journalList.appendChild(
                tarjeta
            );

        }
    );

}


// =====================================================
// FILTROS
// =====================================================

function seleccionarFiltroJournal(
    filtro
) {

    filtroJournalActual =
        filtro;


    journalFilters.forEach(
        boton => {


            boton.classList.toggle(

                "activo",

                boton.dataset.filter ===
                    filtro

            );

        }
    );


    cargarJournal();

}


// =====================================================
// REGISTRO
// =====================================================

function abrirRegistro(
    id
) {

    const registro =
        obtenerRegistrosJournal()
            .find(
                item =>
                    item.id === id
            );


    if (!registro) {
        return;
    }


    registroActualId =
        id;


    resultadoActual =
        registro.resultado || "";


    registroFecha.textContent =
        formatearFechaRegistro(
            registro.timestamp
        );


    registroMetodo.textContent =
        registro.metodo;


    registroReceta.textContent =
        `${registro.cafe} g / ${registro.agua} ml / 1:${registro.ratio}`;


    registroTemperatura.textContent =
        registro.temperatura || "—";


    registroMolienda.textContent =
        registro.molienda || "—";


    registroCafeNombre.value =
        registro.cafeNombre || "";


    registroNota.value =
        registro.nota || "";


    actualizarResultadoUI();


    registroFeedback.hidden =
        true;


    mostrarVista(
        vistaRegistro
    );


    actualizarNav(
        "journal"
    );

}


function seleccionarResultado(
    valor
) {

    resultadoActual =
        resultadoActual === valor
            ? ""
            : valor;


    actualizarResultadoUI();

}


function actualizarResultadoUI() {

    resultadoOptions.forEach(
        boton => {


            boton.classList.toggle(

                "activo",

                boton.dataset.resultado ===
                    resultadoActual

            );

        }
    );

}


function guardarCambiosRegistro() {

    const registros =
        obtenerRegistrosJournal();


    const indice =
        registros.findIndex(
            registro =>
                registro.id ===
                registroActualId
        );


    if (
        indice === -1
    ) {

        return;

    }


    registros[indice] = {

        ...registros[indice],

        cafeNombre:
            registroCafeNombre
                .value
                .trim(),

        resultado:
            resultadoActual,

        nota:
            registroNota
                .value
                .trim()

    };


    escribirRegistrosJournal(
        registros
    );


    registroFeedback.hidden =
        false;


    setTimeout(

        () => {

            registroFeedback.hidden =
                true;

        },

        1700

    );

}


// =====================================================
// REPETIR
// =====================================================

function repetirReceta() {

    const registro =
        obtenerRegistrosJournal()
            .find(
                item =>
                    item.id ===
                    registroActualId
            );


    if (!registro) {
        return;
    }


    const metodo =
        METODOS[
            registro.metodoId
        ];


    if (!metodo) {
        return;
    }


    metodoActual =
        metodo;


    gramosCafe =
        Number(
            registro.cafe
        ) ||
        metodo.cafeDefault;


    ratioActual =
        Number(
            registro.ratio
        ) ||
        metodo.ratioDefault;


    actualizarDetalle();

    cargarRatios();

    cargarPreviewPasos();


    mostrarVista(
        vistaDetalle
    );


    actualizarNav(
        "metodos"
    );

}


// =====================================================
// UTILIDADES
// =====================================================

function formatearFechaRegistro(
    timestamp
) {

    const fecha =
        new Date(
            timestamp
        );


    if (
        Number.isNaN(
            fecha.getTime()
        )
    ) {

        return "—";

    }


    const fechaTexto =
        new Intl.DateTimeFormat(

            "es-CL",

            {
                day:
                    "2-digit",

                month:
                    "short"
            }

        )
        .format(fecha)
        .replace(".","")
        .toUpperCase();


    const hora =
        new Intl.DateTimeFormat(

            "es-CL",

            {
                hour:
                    "2-digit",

                minute:
                    "2-digit",

                hour12:
                    false
            }

        )
        .format(fecha);


    return `${fechaTexto} / ${hora}`;

}


function escapeHTML(
    valor
) {

    return String(
        valor ?? ""
    )

    .replaceAll(
        "&",
        "&amp;"
    )

    .replaceAll(
        "<",
        "&lt;"
    )

    .replaceAll(
        ">",
        "&gt;"
    )

    .replaceAll(
        '"',
        "&quot;"
    )

    .replaceAll(
        "'",
        "&#039;"
    );

}


// =====================================================
// WAKE LOCK
// =====================================================

async function solicitarWakeLock() {

    try {

        if (
            "wakeLock" in navigator &&
            !wakeLock
        ) {

            wakeLock =
                await navigator
                    .wakeLock
                    .request(
                        "screen"
                    );

        }

    }

    catch(error) {

        console.log(
            "Wake Lock:",
            error
        );

    }

}


async function liberarWakeLock() {

    try {

        if (wakeLock) {

            await wakeLock.release();

            wakeLock = null;

        }

    }

    catch(error) {

        console.log(error);

    }

}


// =====================================================
// EVENTOS
// =====================================================

document
    .getElementById(
        "btn-volver-metodos"
    )
    .addEventListener(

        "click",

        () => {

            mostrarVista(
                vistaMetodos
            );

            actualizarNav(
                "metodos"
            );

        }

    );


document
    .getElementById(
        "btn-menos"
    )
    .addEventListener(

        "click",

        () => cambiarCafe(-1)

    );


document
    .getElementById(
        "btn-mas"
    )
    .addEventListener(

        "click",

        () => cambiarCafe(1)

    );


document
    .getElementById(
        "btn-iniciar-guia"
    )
    .addEventListener(

        "click",

        iniciarGuia

    );


document
    .getElementById(
        "btn-salir-guia"
    )
    .addEventListener(

        "click",

        () => {

            detenerTemporizador();

            liberarWakeLock();

            mostrarVista(
                vistaDetalle
            );

        }

    );


timerCircleControl
    .addEventListener(

        "click",

        manejarControlCircular

    );


btnGuardarPreparacion
    .addEventListener(

        "click",

        guardarPreparacion

    );


document
    .getElementById(
        "btn-ir-journal"
    )
    .addEventListener(

        "click",

        () => {

            mostrarVista(
                vistaJournal
            );

            actualizarNav(
                "journal"
            );

        }

    );


document
    .getElementById(
        "btn-volver-inicio"
    )
    .addEventListener(

        "click",

        () => {

            mostrarVista(
                vistaMetodos
            );

            actualizarNav(
                "metodos"
            );

        }

    );


document
    .getElementById(
        "btn-volver-journal"
    )
    .addEventListener(

        "click",

        () => {

            mostrarVista(
                vistaJournal
            );

            actualizarNav(
                "journal"
            );

        }

    );


document
    .getElementById(
        "btn-guardar-registro"
    )
    .addEventListener(

        "click",

        guardarCambiosRegistro

    );


document
    .getElementById(
        "btn-repetir-receta"
    )
    .addEventListener(

        "click",

        repetirReceta

    );


resultadoOptions.forEach(
    boton => {

        boton.addEventListener(

            "click",

            () => seleccionarResultado(
                boton.dataset.resultado
            )

        );

    }
);


journalFilters.forEach(
    boton => {

        boton.addEventListener(

            "click",

            () => seleccionarFiltroJournal(
                boton.dataset.filter
            )

        );

    }
);


// NAV

navMetodos.addEventListener(

    "click",

    () => {

        detenerTemporizador();

        liberarWakeLock();

        mostrarVista(
            vistaMetodos
        );

        actualizarNav(
            "metodos"
        );

    }

);


navGuia.addEventListener(

    "click",

    () => {

        detenerTemporizador();

        liberarWakeLock();


        if (metodoActual) {

            mostrarVista(
                vistaDetalle
            );

            actualizarNav(
                "guia"
            );

        }

        else {

            mostrarVista(
                vistaMetodos
            );

        }

    }

);


navJournal.addEventListener(

    "click",

    () => {

        detenerTemporizador();

        liberarWakeLock();

        mostrarVista(
            vistaJournal
        );

        actualizarNav(
            "journal"
        );

    }

);


// VISIBILITY

document.addEventListener(

    "visibilitychange",

    async () => {

        if (
            document.visibilityState === "visible" &&
            vistaGuia.classList.contains(
                "activa"
            )
        ) {

            await solicitarWakeLock();

        }

    }

);


// =====================================================
// INICIO
// =====================================================

cargarMetodos();

cargarJournal();

mostrarVista(
    vistaMetodos
);

actualizarNav(
    "metodos"
);
