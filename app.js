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


// =====================================================
// STORAGE
// =====================================================

const STORAGE_JOURNAL =
    "umbra_journal_v1";


// =====================================================
// VISTAS
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


// =====================================================
// DETALLE
// =====================================================

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


// =====================================================
// GUÍA
// =====================================================

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


// =====================================================
// FINAL
// =====================================================

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

const btnIrJournal =
    document.getElementById("btn-ir-journal");

const guardadoFeedback =
    document.getElementById("guardado-feedback");


// =====================================================
// JOURNAL
// =====================================================

const journalEmpty =
    document.getElementById("journal-empty");

const journalList =
    document.getElementById("journal-list");

const journalCount =
    document.getElementById("journal-count");


// =====================================================
// REGISTRO
// =====================================================

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


// =====================================================
// NAV
// =====================================================

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

            elemento.classList.remove(
                "activa"
            );

        });


    vista.classList.add(
        "activa"
    );


    const esGuia =
        vista === vistaGuia;


    document.body.classList.toggle(
        "modo-guia",
        esGuia
    );


    if (
        vista === vistaJournal
    ) {

        cargarJournal();

    }


    window.scrollTo({

        top: 0,

        behavior:
            esGuia
                ? "auto"
                : "smooth"

    });

}


function actualizarNav(nombre) {

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove(
                "activo"
            );

        });


    if (
        nombre === "metodos"
    ) {

        navMetodos.classList.add(
            "activo"
        );

    }


    if (
        nombre === "guia"
    ) {

        navGuia.classList.add(
            "activo"
        );

    }


    if (
        nombre === "journal"
    ) {

        navJournal.classList.add(
            "activo"
        );

    }

}


// =====================================================
// MÉTODOS
// =====================================================

function cargarMetodos() {

    listaMetodos.innerHTML =
        "";


    Object
        .values(METODOS)
        .forEach(metodo => {


            const agua =
                Math.round(

                    metodo.cafeDefault *
                    metodo.ratioDefault

                );


            const boton =
                document.createElement(
                    "button"
                );


            boton.type =
                "button";


            boton.className =
                "tarjeta-metodo";


            boton.innerHTML = `

                <div class="metodo-grafico">

                    <span>

                        ${
                            metodo.id === "v60"
                                ? "▽"
                                : metodo.id === "francesa"
                                ? "▥"
                                : metodo.id === "aeropress"
                                ? "┃"
                                : "◉"
                        }

                    </span>

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


// =====================================================
// ABRIR MÉTODO
// =====================================================

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

    if (
        !metodoActual
    ) {

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

}


// =====================================================
// RATIOS
// =====================================================

function cargarRatios() {

    opcionesIntensidad.innerHTML =
        "";


    metodoActual.ratios.forEach(
        opcion => {


            const boton =
                document.createElement(
                    "button"
                );


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
                opcion.ratio ===
                ratioActual
            ) {

                boton.classList.add(
                    "activo"
                );

            }


            boton.addEventListener(

                "click",

                () => {


                    ratioActual =
                        opcion.ratio;


                    document
                        .querySelectorAll(
                            ".boton-ratio"
                        )
                        .forEach(btn => {

                            btn.classList.remove(
                                "activo"
                            );

                        });


                    boton.classList.add(
                        "activo"
                    );


                    actualizarDetalle();

                    cargarPreviewPasos();

                }

            );


            opcionesIntensidad.appendChild(
                boton
            );

        }
    );

}


// =====================================================
// CAFÉ
// =====================================================

function cambiarCafe(cantidad) {

    gramosCafe +=
        cantidad;


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

    let aguaAnterior =
        0;


    for (
        let i = 0;
        i < indicePaso;
        i++
    ) {

        const paso =
            metodoActual.pasos[i];


        if (
            paso.agua === "bloom"
        ) {

            aguaAnterior =
                obtenerAguaBloom();

        }


        if (
            paso.agua === "acumulado"
        ) {

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
// DATOS PASO
// =====================================================

function obtenerDatosPaso(
    paso,
    indice
) {

    if (
        paso.agua === "bloom"
    ) {

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


    if (
        paso.agua === "restante"
    ) {

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


    if (
        paso.agua === "acumulado"
    ) {

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


    if (
        paso.agua === "total"
    ) {

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


// =====================================================
// PREVIEW PASOS
// =====================================================

function cargarPreviewPasos() {

    listaPasosPreview.innerHTML =
        "";


    metodoActual.pasos.forEach(
        (paso, indice) => {


            const datos =
                obtenerDatosPaso(
                    paso,
                    indice
                );


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "paso-preview";


            const numero =
                String(
                    indice + 1
                ).padStart(
                    2,
                    "0"
                );


            let meta =
                "";


            if (
                paso.tipo === "timer"
            ) {

                meta =
                    formatearTiempo(
                        paso.tiempo
                    );

            }


            if (
                datos.valor
            ) {

                meta +=
                    meta
                        ? ` / ${datos.valor}`
                        : datos.valor;

            }


            item.innerHTML = `

                <span class="paso-numero">
                    ${numero}
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
// INICIAR GUÍA
// =====================================================

function iniciarGuia() {

    if (
        !metodoActual
    ) {

        return;

    }


    detenerTemporizador();


    pasoActual =
        0;


    guiaMetodo.textContent =
        `${metodoActual.nombre.toUpperCase()} / ${metodoActual.subtitulo.toUpperCase()}`;


    guideSummaryMain.textContent =
        `${gramosCafe} g / ${obtenerAguaTotal()} ml`;


    guideSummaryRatio.textContent =
        `1:${ratioActual}`;


    mostrarVista(
        vistaGuia
    );


    actualizarNav(
        "guia"
    );


    cargarPaso();


    solicitarWakeLock();

}


// =====================================================
// CARGAR PASO
// =====================================================

function cargarPaso() {

    detenerTemporizador();


    const pasos =
        metodoActual.pasos;


    const paso =
        pasos[pasoActual];


    const numero =
        String(
            pasoActual + 1
        ).padStart(
            2,
            "0"
        );


    const total =
        String(
            pasos.length
        ).padStart(
            2,
            "0"
        );


    pasoIndicador.textContent =
        `PASO ${numero} / ${total}`;


    const porcentaje =
        Math.round(

            (
                (pasoActual + 1) /
                pasos.length
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


    if (
        datos.valor
    ) {

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


    if (
        paso.tipo === "timer"
    ) {

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

    detenerTemporizador();


    segundosRestantes =
        Number(
            paso.tiempo
        ) || 0;


    segundosInicialesPaso =
        segundosRestantes;


    timerStatus.textContent =
        "TIEMPO";


    actualizarDisplayTimer();

    resetearCirculoTimer();


    mostrarAccionCentral(
        "INICIAR"
    );

}


function prepararPasoAccion() {

    detenerTemporizador();


    segundosRestantes =
        0;


    segundosInicialesPaso =
        0;


    resetearCirculoTimer();


    const ultimoPaso =
        pasoActual ===
        metodoActual.pasos.length - 1;


    mostrarAccionCentral(

        ultimoPaso
            ? "TERMINAR"
            : "CONTINUAR"

    );

}


function manejarControlCircular() {

    const paso =
        metodoActual.pasos[
            pasoActual
        ];


    if (
        paso.tipo !== "timer"
    ) {

        avanzarPaso();

        return;

    }


    if (
        segundosRestantes <= 0
    ) {

        avanzarPaso();

        return;

    }


    if (
        temporizadorCorriendo
    ) {

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


    temporizadorCorriendo =
        true;


    mostrarTiempo();


    timerStatus.textContent =
        "TOCA PARA PAUSAR";


    temporizador =
        setInterval(

            () => {


                segundosRestantes--;


                segundosRestantes =
                    Math.max(
                        segundosRestantes,
                        0
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

    if (
        temporizador
    ) {

        clearInterval(
            temporizador
        );


        temporizador =
            null;

    }


    temporizadorCorriendo =
        false;

}


function finalizarPasoTimer() {

    detenerTemporizador();


    segundosRestantes =
        0;


    actualizarDisplayTimer();

    completarCirculoTimer();


    if (
        "vibrate" in navigator
    ) {

        navigator.vibrate(
            [
                300,
                150,
                300
            ]
        );

    }


    const ultimoPaso =
        pasoActual ===
        metodoActual.pasos.length - 1;


    mostrarAccionCentral(

        ultimoPaso
            ? "TERMINAR"
            : "CONTINUAR"

    );

}


// =====================================================
// TIMER UI
// =====================================================

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
        Math.floor(
            total / 60
        );


    const segundos =
        total % 60;


    return (
        `${String(minutos).padStart(2,"0")}:${String(segundos).padStart(2,"0")}`
    );

}


function actualizarCirculoTimer() {

    if (
        segundosInicialesPaso <= 0
    ) {

        return;

    }


    const longitud =
        578;


    const progreso =
        1 -
        (
            segundosRestantes /
            segundosInicialesPaso
        );


    const offset =
        longitud -
        (
            longitud *
            progreso
        );


    timerRingProgress
        .style
        .strokeDashoffset =
            offset;

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


// =====================================================
// SIGUIENTE
// =====================================================

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
// FINALIZAR
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


    mostrarVista(
        vistaFinal
    );


    actualizarNav(
        "guia"
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


        if (
            !datos
        ) {

            return [];

        }


        const registros =
            JSON.parse(
                datos
            );


        return Array.isArray(
            registros
        )
            ? registros
            : [];

    }

    catch (error) {

        console.log(
            "Error leyendo Journal:",
            error
        );


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


    const ahora =
        new Date();


    const registro = {

        id:
            `${Date.now()}-${Math.random().toString(16).slice(2)}`,

        timestamp:
            ahora.toISOString(),

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


    cargarJournal();

}


// =====================================================
// JOURNAL
// =====================================================

function cargarJournal() {

    const registros =
        obtenerRegistrosJournal();


    journalList.innerHTML =
        "";


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


        return;

    }


    journalEmpty.style.display =
        "none";


    registros.forEach(
        registro => {


            const tarjeta =
                document.createElement(
                    "button"
                );


            tarjeta.type =
                "button";


            tarjeta.className =
                "journal-card";


            const fecha =
                formatearFechaRegistro(
                    registro.timestamp
                );


            const nombreCafe =
                registro.cafeNombre
                    ? escapeHTML(
                        registro.cafeNombre
                    )
                    : "";


            const resultado =
                registro.resultado
                    ? registro.resultado.toUpperCase()
                    : "";


            tarjeta.innerHTML = `

                <div class="journal-card-date">

                    ${fecha}

                </div>


                <div class="journal-card-main">

                    <div>

                        <h2 class="journal-card-title">

                            ${escapeHTML(registro.metodo)}

                        </h2>


                        ${
                            nombreCafe
                                ? `
                                    <div class="journal-card-coffee">
                                        ${nombreCafe}
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
                            ${escapeHTML(registro.temperatura || "—")}
                        </strong>

                    </div>


                    <div class="journal-data-item">

                        <span>
                            MOLIENDA /
                        </span>

                        <strong>
                            ${escapeHTML(registro.molienda || "—")}
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
// ABRIR REGISTRO
// =====================================================

function abrirRegistro(
    id
) {

    const registros =
        obtenerRegistrosJournal();


    const registro =
        registros.find(
            item =>
                item.id === id
        );


    if (
        !registro
    ) {

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
        registro.metodo || "—";


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


    registroFeedback.hidden =
        true;


    actualizarResultadoUI();


    mostrarVista(
        vistaRegistro
    );


    actualizarNav(
        "journal"
    );

}


// =====================================================
// RESULTADO
// =====================================================

function seleccionarResultado(
    valor
) {

    if (
        resultadoActual === valor
    ) {

        resultadoActual =
            "";

    }

    else {

        resultadoActual =
            valor;

    }


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


// =====================================================
// GUARDAR CAMBIOS REGISTRO
// =====================================================

function guardarCambiosRegistro() {

    if (
        !registroActualId
    ) {

        return;

    }


    const registros =
        obtenerRegistrosJournal();


    const indice =
        registros.findIndex(
            item =>
                item.id ===
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


    cargarJournal();


    setTimeout(

        () => {

            registroFeedback.hidden =
                true;

        },

        1800

    );

}


// =====================================================
// REPETIR RECETA
// =====================================================

function repetirReceta() {

    if (
        !registroActualId
    ) {

        return;

    }


    const registros =
        obtenerRegistrosJournal();


    const registro =
        registros.find(
            item =>
                item.id ===
                registroActualId
        );


    if (
        !registro
    ) {

        return;

    }


    const metodo =
        METODOS[
            registro.metodoId
        ];


    if (
        !metodo
    ) {

        return;

    }


    metodoActual =
        metodo;


    gramosCafe =
        Number(
            registro.cafe
        ) || metodo.cafeDefault;


    ratioActual =
        Number(
            registro.ratio
        ) || metodo.ratioDefault;


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
// FECHA
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

        return "FECHA / —";

    }


    const fechaTexto =
        new Intl
            .DateTimeFormat(
                "es-CL",
                {
                    day:
                        "2-digit",

                    month:
                        "short"
                }
            )
            .format(
                fecha
            )
            .replace(
                ".",
                ""
            )
            .toUpperCase();


    const horaTexto =
        new Intl
            .DateTimeFormat(
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
            .format(
                fecha
            );


    return (
        `${fechaTexto} / ${horaTexto}`
    );

}


// =====================================================
// SEGURIDAD TEXTO
// =====================================================

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

    catch (error) {

        console.log(
            "Wake Lock no disponible:",
            error
        );

    }

}


async function liberarWakeLock() {

    try {

        if (
            wakeLock
        ) {

            await wakeLock.release();


            wakeLock =
                null;

        }

    }

    catch (error) {

        console.log(
            error
        );

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

        () => cambiarCafe(
            -1
        )

    );


document
    .getElementById(
        "btn-mas"
    )
    .addEventListener(

        "click",

        () => cambiarCafe(
            1
        )

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


            actualizarNav(
                "metodos"
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


btnIrJournal
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


// =====================================================
// REGISTRO
// =====================================================

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


// =====================================================
// NAV
// =====================================================

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


        if (
            metodoActual
        ) {

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


            actualizarNav(
                "metodos"
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


// =====================================================
// VISIBILIDAD
// =====================================================

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
