const methods = {
  prensa: {
    index: "01",
    code: "PF-01",
    name: "PRENSA FRANCESA",
    cups: [1, 2, 3],
    volumes: [250, 500, 750],
    ratio: 15,
    maxCoffee: 80,
    temperature: 94,
    grind: "MEDIA GRUESA",
    grindHint: "/ SAL GRUESA",
    note: "Una preparación tranquila, con cuerpo y sin técnica complicada.",
    summary: "Pesamos, vertemos y esperamos. Sin vueltas.",
    steps: (water) => [
      { title: "VIERTE", seconds: 30, instruction: `Agrega ${water} ml de agua y moja todo el café.` },
      { title: "REPOSA", seconds: 210, instruction: "Déjala quieta. El café y el agua hacen el trabajo." },
      { title: "PRESIONA", seconds: 15, instruction: "Baja el émbolo lentamente, sin hacer fuerza." }
    ]
  },
  v60: {
    index: "02",
    code: "PV-02",
    name: "V60 / POUR OVER",
    cups: [1, 2, 3],
    volumes: [250, 450, 600],
    ratio: 16,
    maxCoffee: 60,
    temperature: 92,
    grind: "MEDIA",
    grindHint: "/ AZÚCAR",
    note: "Más limpio y aromático. Solo vierte despacio y en círculos.",
    summary: "Tres vertidos simples. No necesitas perseguir la perfección.",
    steps: (water, coffee) => {
      const bloom = Math.round(coffee * 2.5);
      const second = Math.round(water * 0.6);
      return [
        { title: "BLOOM", seconds: 30, instruction: `Vierte ${bloom} ml y asegúrate de mojar todo el café.` },
        { title: "VIERTE 01", seconds: 45, instruction: `Continúa lentamente hasta llegar a ${second} ml.` },
        { title: "VIERTE 02", seconds: 45, instruction: `Completa los ${water} ml con movimientos circulares.` },
        { title: "DRENA", seconds: water <= 250 ? 60 : water <= 450 ? 90 : 120, instruction: "Deja que termine de gotear. Retira el filtro y sirve." }
      ];
    }
  },
  moka: {
    index: "03",
    code: "MK-03",
    name: "MOKA ITALIANA",
    cups: [3, 6, 9],
    volumes: [130, 270, 420],
    coffeeDoses: [15, 28, 42],
    ratio: 10,
    maxCoffee: 45,
    temperature: 90,
    grind: "MEDIA FINA",
    grindHint: "/ ARENA",
    note: "En moka manda el tamaño del equipo: agua bajo la válvula y canasto lleno, sin prensar.",
    summary: "El flujo manda; el tiempo es solo una guía. Retira antes del gorgoteo fuerte.",
    steps: (water) => [
      { title: "CARGA", seconds: 20, instruction: `Agua hasta la válvula —aprox. ${water} ml— y canasto lleno sin compactar.` },
      { title: "CALIENTA", seconds: 240, instruction: "Fuego medio-bajo y tapa abierta. Avanza en cuanto aparezca el flujo; el tiempo es orientativo." },
      { title: "RETIRA", seconds: 30, instruction: "Cuando el flujo aclare, retira del fuego y enfría la base con agua." }
    ]
  },
  aeropress: {
    index: "04",
    code: "AP-04",
    name: "AEROPRESS",
    cups: [1, 2],
    volumes: [220, 440],
    coffeeDoses: [16, 32],
    ratio: 14,
    maxCoffee: 32,
    temperature: 85,
    grind: "MEDIA FINA",
    grindHint: "/ ARENA",
    groundGrind: "MEDIA",
    groundGrindHint: "/ AZÚCAR",
    note: "Rápida, consistente y fácil de ajustar a tu gusto.",
    summary: "Mezcla, espera y presiona. Una taza lista en dos minutos.",
    steps: (water, _coffee, mode) => {
      const brewWater = Math.min(water, 220);
      const restSeconds = mode === "ground" ? 60 : 30;
      const steps = [
        { title: "VIERTE", seconds: 30, instruction: `Agrega ${brewWater} ml de agua y mezcla durante unos segundos.` },
        { title: "REPOSA", seconds: restSeconds, instruction: `Coloca el émbolo y deja reposar ${restSeconds} segundos sin presionar.` },
        { title: "PRESIONA", seconds: 30, instruction: "Presiona suave y constantemente hasta escuchar aire." }
      ];
      if (water > brewWater) steps.push({ title: "DILUYE", seconds: 20, instruction: `Agrega ${water - brewWater} ml de agua caliente hasta completar ${water} ml.` });
      return steps;
    }
  }
};

const grindGuides = {
  prensa: {
    electric: { position: "POSICIÓN / 7–8 DE 10", note: "Parte en la zona media-gruesa. Ajusta un punto más fino si el café queda débil o demasiado rápido de filtrar." },
    manual: { position: "RECORRIDO / 7–8 DE 10", note: "Abre hacia la zona gruesa, sin llegar al extremo. Los clics cambian según el modelo, así que prioriza una textura uniforme." },
    ground: { position: "BUSCA / PRENSA O MEDIA GRUESA", note: "Deben verse partículas definidas, parecidas a sal gruesa. Evita tanto el polvo de espresso como trozos excesivamente grandes." }
  },
  v60: {
    electric: { position: "POSICIÓN / 5–6 DE 10", note: "Parte apenas hacia el lado grueso del centro. Si el agua pasa demasiado rápido, baja un punto." },
    manual: { position: "RECORRIDO / 5–6 DE 10", note: "Comienza en la zona media. En muchos molinos ronda 1–1½ vueltas desde cero; úsalo solo como referencia." },
    ground: { position: "BUSCA / FILTRO O MEDIA", note: "Textura similar al azúcar granulada. La molienda universal para filtro suele ser un buen comienzo." }
  },
  moka: {
    electric: { position: "POSICIÓN / 3–4 DE 10", note: "Busca una molienda fina, pero no al extremo del dial. Si se atasca o amarga, sube un punto." },
    manual: { position: "RECORRIDO / 3–4 DE 10", note: "Cierra hacia la zona fina. Suele rondar ¾–1 vuelta desde cero, dependiendo del molino." },
    ground: { position: "BUSCA / MOKA O MEDIA FINA", note: "Debe parecer arena fina. Evita la molienda de espresso si se siente como polvo." }
  },
  aeropress: {
    electric: { position: "POSICIÓN / 4–5 DE 10", note: "Empieza justo bajo la zona media. Si cuesta demasiado presionar, sube un punto." },
    manual: { position: "RECORRIDO / 4–5 DE 10", note: "Parte entre fino y medio. En muchos molinos ronda ¾–1¼ vueltas desde cero." },
    ground: { position: "BUSCA / MEDIA", note: "En café ya molido, busca una textura cercana al azúcar. UMBRA compensa esta molienda con un reposo algo más largo." }
  }
};

const grindModeNames = {
  electric: "ELÉCTRICO",
  manual: "MANUAL",
  ground: "YA MOLIDO"
};

const STORAGE_KEY = "umbra:last-ritual";
const INSTALL_PROMPT_KEY = "umbra:install-prompt";
const INSTALL_REMINDER_DELAY = 7 * 24 * 60 * 60 * 1000;
const SPLASH_SESSION_KEY = "umbra:splash-seen";
const SPLASH_DURATION = 820;

const helpContent = {
  scale: {
    id: "AYUDA / PESO",
    title: "SIN BALANZA",
    copy: "Como referencia rápida, una cucharada sopera rasa de café molido suele rondar los 8–10 g. No será exacto, pero es suficiente para comenzar y ajustar la próxima taza."
  },
  temperature: {
    id: "AYUDA / AGUA",
    title: "SIN TERMÓMETRO",
    copy: "Hierve el agua y apaga el hervidor. Para 92–94 °C, espera unos 45 segundos antes de verter. Para AeroPress a 85 °C, espera cerca de 90 segundos."
  }
};

let selectedMethod = "prensa";
let volumeIndex = 0;
let doseMode = "preset";
let customCoffee = 20;
let currentSetupStep = 0;
let methodSelected = false;
let volumeSelected = false;
let grindMode = null;
let grinderSelected = false;
let preferredGrindMode = null;
let lastRecipe = null;
let currentSteps = [];
let currentStep = 0;
let remaining = 0;
let stepDuration = 1;
let timerId = null;
let isRunning = false;
let ritualReady = false;
let isCountingDown = false;
let wakeLock = null;
let deferredInstallPrompt = null;
let splashWasShown = false;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function shouldShowAppSplash() {
  if (isStandaloneApp()) return true;
  try {
    if (sessionStorage.getItem(SPLASH_SESSION_KEY)) return false;
    sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
  } catch (_) { /* Si la sesión no está disponible, mostramos el arranque igualmente. */ }
  return true;
}

function startAppSplash() {
  const splash = $("#app-splash");
  if (!shouldShowAppSplash()) {
    splash.hidden = true;
    return;
  }

  splashWasShown = true;
  splash.hidden = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const closeSplash = () => {
    window.setTimeout(() => {
      splash.classList.add("is-leaving");
      window.setTimeout(() => { splash.hidden = true; }, reducedMotion ? 20 : 270);
    }, reducedMotion ? 120 : SPLASH_DURATION);
  };

  if (document.readyState === "complete") closeSplash();
  else window.addEventListener("load", closeSplash, { once: true });
}

function isStandaloneApp() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function isMobileDevice() {
  const mobileAgent = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const touchIPad = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return mobileAgent || touchIPad;
}

function readInstallPromptState() {
  try { return JSON.parse(localStorage.getItem(INSTALL_PROMPT_KEY)) || {}; }
  catch (_) { return {}; }
}

function saveInstallPromptState(state) {
  try { localStorage.setItem(INSTALL_PROMPT_KEY, JSON.stringify(state)); }
  catch (_) { /* La guía sigue funcionando aunque el navegador bloquee el almacenamiento. */ }
}

function hideInstallPrompt() {
  $("#install-prompt").hidden = true;
}

function rememberInstallPrompt() {
  saveInstallPromptState({ completed: true });
  hideInstallPrompt();
}

function postponeInstallPrompt() {
  saveInstallPromptState({ completed: false, nextReminderAt: Date.now() + INSTALL_REMINDER_DELAY });
  hideInstallPrompt();
}

function updateInstallPromptCopy() {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const copy = $("#install-prompt-copy");
  const action = $("#install-prompt-action");

  if (deferredInstallPrompt) {
    copy.textContent = "Instala UMBRA para abrirla a pantalla completa y sin las barras del navegador.";
    action.textContent = "[ INSTALAR UMBRA ]";
  } else if (isIOS) {
    copy.textContent = "En Safari toca Compartir y luego “Agregar a inicio”. Ábrela desde el nuevo ícono.";
    action.textContent = "[ YA LA AGREGUÉ ]";
  } else {
    copy.textContent = "En Chrome abre el menú ⋮ y toca “Agregar a pantalla principal” o “Instalar app”.";
    action.textContent = "[ YA LA AGREGUÉ ]";
  }
}

function scheduleInstallPrompt() {
  if (!isMobileDevice()) return;
  if (isStandaloneApp()) {
    rememberInstallPrompt();
    return;
  }
  const state = readInstallPromptState();
  if (state.completed || (state.nextReminderAt && Date.now() < state.nextReminderAt)) return;
  updateInstallPromptCopy();
  window.setTimeout(() => { $("#install-prompt").hidden = false; }, splashWasShown ? 1450 : 900);
}

async function handleInstallPromptAction() {
  if (!deferredInstallPrompt) {
    rememberInstallPrompt();
    return;
  }
  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  if (choice.outcome === "accepted") rememberInstallPrompt();
  else postponeInstallPrompt();
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function readSavedRecipe() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !methods[saved.method] || !grindModeNames[saved.grindMode]) return null;
    const mode = saved.doseMode === "custom" ? "custom" : "preset";
    if (mode === "preset" && (!Number.isInteger(saved.volumeIndex) || !methods[saved.method].volumes[saved.volumeIndex])) return null;
    if (mode === "custom" && (!Number.isFinite(saved.customCoffee) || saved.customCoffee < 5 || saved.customCoffee > methods[saved.method].maxCoffee)) return null;
    return { ...saved, doseMode: mode };
  } catch (_) {
    return null;
  }
}

function cupsText(methodKey, index) {
  const cups = methods[methodKey].cups[index];
  const moka = methodKey === "moka";
  if (cups === 1) return moka ? "1 TAZA MOKA" : "1 TAZA";
  return `${cups} ${moka ? "TAZAS MOKA" : "TAZAS"}`;
}

function updateRepeatCard() {
  const button = $("#repeat-button");
  if (!lastRecipe) {
    button.hidden = true;
    return;
  }
  const method = methods[lastRecipe.method];
  button.hidden = false;
  const custom = lastRecipe.doseMode === "custom";
  const water = custom ? Math.round(lastRecipe.customCoffee * method.ratio) : method.volumes[lastRecipe.volumeIndex];
  $("#repeat-title").textContent = `${method.name} · ${custom ? `${lastRecipe.customCoffee} G` : cupsText(lastRecipe.method, lastRecipe.volumeIndex)}`;
  $("#repeat-detail").textContent = `${grindModeNames[lastRecipe.grindMode]} · ${water} ML`;
}

function saveCurrentRecipe() {
  if (!methodSelected || !volumeSelected || !grinderSelected) return;
  lastRecipe = { method: selectedMethod, doseMode, volumeIndex, customCoffee, grindMode };
  preferredGrindMode = grindMode;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lastRecipe)); } catch (_) { /* Preferencia solo local. */ }
  updateRepeatCard();
}

function syncGrindButtons() {
  $$(".grind-mode-card").forEach((button) => {
    const active = button.dataset.grindMode === grindMode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function getCurrentRecipe() {
  const method = methods[selectedMethod];
  const coffee = doseMode === "custom"
    ? customCoffee
    : method.coffeeDoses?.[volumeIndex] ?? Math.round(method.volumes[volumeIndex] / method.ratio);
  const water = doseMode === "custom" ? Math.round(coffee * method.ratio) : method.volumes[volumeIndex];
  const steps = method.steps(water, coffee, grindMode);
  return { method, water, coffee, steps, totalSeconds: steps.reduce((total, step) => total + step.seconds, 0) };
}

function getWaterPlan(water, coffee) {
  if (selectedMethod === "v60") return `${Math.round(coffee * 2.5)} ML BLOOM → HASTA ${Math.round(water * 0.6)} ML → HASTA ${water} ML`;
  if (selectedMethod === "aeropress") {
    const brewWater = Math.min(water, 220);
    return water > brewWater ? `${brewWater} ML EN CÁMARA + ${water - brewWater} ML PARA DILUIR` : `${brewWater} ML EN CÁMARA`;
  }
  if (selectedMethod === "moka") return `REFERENCIA / ${water} ML · MANDA EL NIVEL BAJO LA VÁLVULA`;
  return `VERTIDO ÚNICO / ${water} ML`;
}

function renderRecipe() {
  const { method, water, coffee, totalSeconds } = getCurrentRecipe();
  const grindGuide = grindGuides[selectedMethod][grindMode];

  $$(".method-card").forEach((button) => {
    const active = button.dataset.method === selectedMethod;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  $("#method-note").textContent = method.note;
  $("#recipe-code").textContent = `RITUAL / ${method.code}`;
  $("#recipe-index").textContent = `${method.index} /`;
  $("#recipe-title").textContent = method.name;
  $("#coffee-value").textContent = coffee;
  $("#water-value").textContent = water;
  $("#water-label").textContent = doseMode === "custom"
    ? selectedMethod === "moka" ? "AGUA / REFERENCIA" : "AGUA / DOSIS PERSONAL"
    : `AGUA / ${cupsText(selectedMethod, volumeIndex)}`;
  $("#water-plan").textContent = getWaterPlan(water, coffee);
  $("#temperature-value").textContent = method.temperature;
  $("#total-time").textContent = formatTime(totalSeconds);
  const preGroundProfile = grindMode === "ground" && method.groundGrind;
  $("#grind-value").textContent = preGroundProfile ? method.groundGrind : method.grind;
  $("#grind-hint").textContent = preGroundProfile ? method.groundGrindHint : method.grindHint;
  $("#grind-mode-label").textContent = `MOLIENDA / ${grindModeNames[grindMode]}`;
  $("#grind-position-label").textContent = grindGuide.position;
  $("#recipe-summary").textContent = method.summary;
  $("#footer-ratio").textContent = `${selectedMethod === "moka" ? "REFERENCIA" : "RATIO"} / 1:${method.ratio}`;
}

function selectMethod(methodKey) {
  selectedMethod = methodKey;
  volumeIndex = 0;
  doseMode = "preset";
  methodSelected = true;
  volumeSelected = false;
  grinderSelected = Boolean(preferredGrindMode);
  grindMode = preferredGrindMode;
  const method = methods[selectedMethod];

  $$(".method-card").forEach((button) => {
    const active = button.dataset.method === selectedMethod;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  $("#method-selection").textContent = method.name;
  $("#volume-selection").textContent = "POR ELEGIR";
  $("#grind-selection").textContent = grinderSelected ? grindModeNames[grindMode] : "POR ELEGIR";
  syncGrindButtons();
  $("#selected-method-code").textContent = `${method.code.replace("-", " / ")}`;
  $("#selected-method-name").textContent = method.name;
  $("#method-note").textContent = method.note;
  renderVolumeOptions();
  setDoseMode("preset");
  showSetupStep(1);
}

function setDoseMode(mode) {
  doseMode = mode;
  const custom = mode === "custom";
  $("#preset-dose-panel").hidden = custom;
  $("#custom-dose-panel").hidden = !custom;
  $$("[data-dose-mode]").forEach((button) => {
    const active = button.dataset.doseMode === mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (custom) {
    updateCustomDose();
    $("#custom-coffee-input").focus();
  }
}

function updateCustomDose() {
  const method = methods[selectedMethod];
  const input = $("#custom-coffee-input");
  input.max = method.maxCoffee;
  const parsed = Number(input.value);
  const valid = Number.isFinite(parsed) && parsed >= 5 && parsed <= method.maxCoffee;
  if (valid) customCoffee = Math.round(parsed * 10) / 10;
  input.setAttribute("aria-invalid", String(!valid));
  $("#custom-dose-range").textContent = `ENTRE 5 Y ${method.maxCoffee} G PARA ESTE MÉTODO`;
  $("#custom-water-value").textContent = valid ? Math.round(customCoffee * method.ratio) : "—";
  $("#custom-calculation-label").textContent = selectedMethod === "moka" ? "UMBRA ESTIMA" : "UMBRA CALCULA";
  $("#custom-ratio-label").textContent = selectedMethod === "moka"
    ? "REFERENCIA · NO SUPERES LA VÁLVULA"
    : `AGUA TOTAL · RATIO 1:${method.ratio}`;
  $("#custom-dose-confirm").disabled = !valid;
}

function confirmCustomDose() {
  updateCustomDose();
  if ($("#custom-dose-confirm").disabled) return;
  doseMode = "custom";
  volumeSelected = true;
  grinderSelected = Boolean(preferredGrindMode);
  grindMode = preferredGrindMode;
  $("#volume-selection").textContent = `${customCoffee} G`;
  $("#grind-selection").textContent = grinderSelected ? grindModeNames[grindMode] : "POR ELEGIR";
  if (grinderSelected) {
    renderRecipe();
    saveCurrentRecipe();
    showSetupStep(3);
  } else showSetupStep(2);
}

function renderVolumeOptions() {
  const method = methods[selectedMethod];
  $("#volume-grid").innerHTML = method.volumes.map((volume, index) => `
    <button class="volume-card${volumeSelected && index === volumeIndex ? " is-active" : ""}" type="button" data-volume-index="${index}" aria-pressed="${volumeSelected && index === volumeIndex}">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${method.cups[index]}</strong>
      <small>${selectedMethod === "moka" ? (method.cups[index] === 1 ? "TAZA MOKA" : "TAZAS MOKA") : (method.cups[index] === 1 ? "TAZA" : "TAZAS")}</small>
      <em>${method.coffeeDoses?.[index] ?? Math.round(volume / method.ratio)} G CAFÉ · ${selectedMethod === "moka" ? "~" : ""}${volume} ML AGUA</em>
    </button>
  `).join("");

  $$("[data-volume-index]").forEach((button) => {
    button.addEventListener("click", () => selectVolume(Number(button.dataset.volumeIndex)));
  });
}

function selectVolume(index) {
  volumeIndex = index;
  doseMode = "preset";
  volumeSelected = true;
  grinderSelected = Boolean(preferredGrindMode);
  grindMode = preferredGrindMode;
  $("#volume-selection").textContent = cupsText(selectedMethod, index);
  $("#grind-selection").textContent = grinderSelected ? grindModeNames[grindMode] : "POR ELEGIR";
  renderVolumeOptions();
  if (grinderSelected) {
    renderRecipe();
    saveCurrentRecipe();
    showSetupStep(3);
  } else {
    showSetupStep(2);
  }
}

function selectGrindMode(mode) {
  grindMode = mode;
  grinderSelected = true;
  syncGrindButtons();
  $("#grind-selection").textContent = grindModeNames[grindMode];
  renderRecipe();
  saveCurrentRecipe();
  showSetupStep(3);
}

function repeatLastRitual() {
  if (!lastRecipe) return;
  selectedMethod = lastRecipe.method;
  volumeIndex = lastRecipe.volumeIndex;
  doseMode = lastRecipe.doseMode || "preset";
  customCoffee = lastRecipe.customCoffee || 20;
  grindMode = lastRecipe.grindMode;
  preferredGrindMode = grindMode;
  methodSelected = true;
  volumeSelected = true;
  grinderSelected = true;

  const method = methods[selectedMethod];
  $("#method-selection").textContent = method.name;
  $("#volume-selection").textContent = doseMode === "custom" ? `${customCoffee} G` : cupsText(selectedMethod, volumeIndex);
  $("#grind-selection").textContent = grindModeNames[grindMode];
  $("#selected-method-code").textContent = method.code.replace("-", " / ");
  $("#selected-method-name").textContent = method.name;
  $("#method-note").textContent = method.note;
  syncGrindButtons();
  renderVolumeOptions();
  $("#custom-coffee-input").value = customCoffee;
  setDoseMode(doseMode);
  renderRecipe();
  showSetupStep(3);
}

function resetSetup() {
  methodSelected = false;
  volumeSelected = false;
  grinderSelected = false;
  grindMode = null;
  doseMode = "preset";
  $("#method-selection").textContent = "POR ELEGIR";
  $("#volume-selection").textContent = "POR ELEGIR";
  $("#grind-selection").textContent = preferredGrindMode ? grindModeNames[preferredGrindMode] : "POR ELEGIR";
  $$(".method-card, .grind-mode-card").forEach((button) => {
    button.classList.remove("is-active");
    button.setAttribute("aria-pressed", "false");
  });
  showSetupStep(0);
}

let setupTransitionTimer = null;

function finishSetupTransition() {
  if (setupTransitionTimer) clearTimeout(setupTransitionTimer);
  setupTransitionTimer = null;
  $$(".setup-step").forEach((panel) => {
    const visible = Number(panel.dataset.step) === currentSetupStep;
    panel.classList.remove("slide-forward", "slide-back", "slide-forward-out", "slide-back-out", "is-leaving");
    panel.hidden = !visible;
    panel.classList.toggle("is-visible", visible);
  });
}

function showSetupStep(index) {
  if (index === 1 && !methodSelected) return;
  if (index === 2 && !volumeSelected) return;
  if (index === 3 && !grinderSelected) return;
  finishSetupTransition();
  const previousStep = currentSetupStep;
  const direction = index > previousStep ? "forward" : index < previousStep ? "back" : null;
  const previousPanel = $(`.setup-step[data-step="${previousStep}"]`);
  const nextPanel = $(`.setup-step[data-step="${index}"]`);
  currentSetupStep = index;

  $$(".setup-step").forEach((panel) => {
    const visible = Number(panel.dataset.step) === index;
    panel.classList.remove("slide-forward", "slide-back");
    panel.hidden = !visible && panel !== previousPanel;
    panel.classList.toggle("is-visible", visible);
  });

  if (direction && previousPanel !== nextPanel) {
    previousPanel.classList.add("is-leaving", direction === "forward" ? "slide-forward-out" : "slide-back-out");
    void nextPanel.offsetWidth;
    nextPanel.classList.add(direction === "forward" ? "slide-forward" : "slide-back");
    setupTransitionTimer = window.setTimeout(finishSetupTransition, 270);
  } else {
    finishSetupTransition();
  }

  $$(".flow-step").forEach((button, buttonIndex) => {
    button.classList.toggle("is-current", buttonIndex === index);
    button.classList.toggle("is-done", buttonIndex < index);
    button.disabled = buttonIndex === 1 ? !methodSelected : buttonIndex === 2 ? !volumeSelected : buttonIndex === 3 ? !grinderSelected : false;
  });

  $("#flow-current").textContent = String(index + 1).padStart(2, "0");
  $("#flow-progress-bar").style.width = `${((index + 1) / 4) * 100}%`;
  const heading = $(".setup-step.is-visible h1, .setup-step.is-visible h2");
  if (heading) heading.setAttribute("tabindex", "-1");
}

function showHelp(type) {
  const content = type === "grind"
    ? { id: `MOLIENDA / ${grindModeNames[grindMode]}`, title: grindGuides[selectedMethod][grindMode].position, copy: grindGuides[selectedMethod][grindMode].note }
    : helpContent[type];
  $("#dialog-id").textContent = content.id;
  $("#dialog-title").textContent = content.title;
  $("#dialog-copy").textContent = content.copy;
  $("#help-dialog").showModal();
}

async function requestWakeLock() {
  if (!("wakeLock" in navigator)) return;
  try { wakeLock = await navigator.wakeLock.request("screen"); } catch (_) { wakeLock = null; }
}

async function releaseWakeLock() {
  if (!wakeLock) return;
  await wakeLock.release();
  wakeLock = null;
}

function renderStep() {
  const method = methods[selectedMethod];
  const total = currentSteps.length;
  const step = currentSteps[currentStep];

  $("#step-counter").textContent = `PASO ${String(currentStep + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  $("#step-code").textContent = `${method.code} / ${String(currentStep + 1).padStart(2, "0")}`;
  $("#step-title").textContent = step.title;
  $("#step-instruction").textContent = step.instruction;
  $("#timer-value").textContent = formatTime(remaining);
  $("#pause-button").hidden = false;
  $("#next-button").hidden = false;
  $("#next-button").disabled = false;
  $("#pause-button").textContent = isRunning ? "[ PAUSAR ]" : "[ CONTINUAR ]";
  $("#next-button").textContent = remaining === 0 ? "[ SIGUIENTE ] →" : "[ SALTAR PASO ] →";
  $("#timer-state").textContent = remaining === 0 ? "PASO LISTO" : isRunning ? "EN CURSO" : "EN PAUSA";

  const progress = Math.max(0, Math.min(100, (remaining / stepDuration) * 100));
  $("#timer-ring").style.setProperty("--progress", `${progress}%`);

  $("#step-dots").innerHTML = currentSteps.map((_, index) => {
    const state = index < currentStep ? "is-done" : index === currentStep ? "is-current" : "";
    return `<span class="step-dot ${state}" aria-label="Paso ${index + 1}${index === currentStep ? ", actual" : ""}"></span>`;
  }).join("");
}

function renderReady() {
  const { method, water, coffee } = getCurrentRecipe();
  ritualReady = true;
  currentStep = 0;
  remaining = 0;
  $("#step-counter").textContent = "RITUAL / PREPARADO";
  $("#step-code").textContent = method.code;
  $("#step-title").textContent = "TODO LISTO";
  $("#step-instruction").textContent = `Ten a mano ${coffee} g de café y ${water} ml de agua. El tiempo comenzará después de la cuenta regresiva.`;
  $("#timer-value").textContent = "00:03";
  $("#timer-state").textContent = "ESPERANDO";
  $("#timer-ring").style.setProperty("--progress", "100%");
  $("#pause-button").hidden = true;
  $("#next-button").hidden = false;
  $("#next-button").disabled = false;
  $("#next-button").textContent = "[ COMENZAR ] →";
  $("#step-dots").innerHTML = currentSteps.map((_, index) => `<span class="step-dot" aria-label="Paso ${index + 1}"></span>`).join("");
}

function beginCountdown() {
  ritualReady = false;
  isCountingDown = true;
  let count = 3;
  $("#step-title").textContent = "PREPÁRATE";
  $("#step-instruction").textContent = "Toma la tetera. Comenzamos en tres segundos.";
  $("#timer-value").textContent = `00:0${count}`;
  $("#timer-state").textContent = "COMENZAMOS EN";
  $("#pause-button").hidden = true;
  $("#next-button").hidden = true;
  timerId = window.setInterval(() => {
    count -= 1;
    $("#timer-ring").style.setProperty("--progress", `${(count / 3) * 100}%`);
    if (count <= 0) {
      window.clearInterval(timerId);
      timerId = null;
      isCountingDown = false;
      loadStep(0);
      return;
    }
    $("#timer-value").textContent = `00:0${count}`;
  }, 1000);
}

function stopTimer() {
  window.clearInterval(timerId);
  timerId = null;
  isRunning = false;
}

function runTimer() {
  stopTimer();
  isRunning = true;
  renderStep();
  timerId = window.setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      remaining = 0;
      stopTimer();
    }
    renderStep();
  }, 1000);
}

function loadStep(index) {
  currentStep = index;
  const step = currentSteps[currentStep];
  stepDuration = step.seconds;
  remaining = step.seconds;
  runTimer();
}

function completeRitual() {
  stopTimer();
  $("#step-counter").textContent = "RITUAL / COMPLETO";
  $("#step-code").textContent = "UMBRA / FIN";
  $("#step-title").textContent = "DISFRUTA";
  $("#step-instruction").textContent = "Prueba tu café antes de cambiar algo. La próxima taza puede ser distinta.";
  $("#timer-value").textContent = "LISTO";
  $("#timer-state").textContent = "CAFÉ DE VERDAD";
  $("#timer-ring").style.setProperty("--progress", "100%");
  $("#pause-button").hidden = true;
  $("#next-button").textContent = "[ NUEVA TAZA ] →";
  $$(".step-dot").forEach((dot) => dot.className = "step-dot is-done");
}

function nextStep() {
  if (isCountingDown) return;
  if (ritualReady) {
    beginCountdown();
    return;
  }
  if (currentStep >= currentSteps.length) {
    exitRitual();
    return;
  }
  stopTimer();
  if (currentStep < currentSteps.length - 1) loadStep(currentStep + 1);
  else {
    currentStep = currentSteps.length;
    completeRitual();
  }
}

function startRitual() {
  const recipe = getCurrentRecipe();
  currentSteps = recipe.steps;
  saveCurrentRecipe();
  $("#ritual-screen").classList.add("is-visible");
  $("#ritual-screen").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  requestWakeLock();
  renderReady();
}

function exitRitual() {
  stopTimer();
  ritualReady = false;
  isCountingDown = false;
  releaseWakeLock();
  $("#ritual-screen").classList.remove("is-visible");
  $("#ritual-screen").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  $("#start-button").focus();
}

function togglePause() {
  if (remaining === 0) return;
  if (isRunning) {
    stopTimer();
    renderStep();
  } else runTimer();
}

$$(".method-card").forEach((button) => button.addEventListener("click", () => selectMethod(button.dataset.method)));
$$("[data-dose-mode]").forEach((button) => button.addEventListener("click", () => setDoseMode(button.dataset.doseMode)));
$("#custom-coffee-input").addEventListener("input", updateCustomDose);
$("#custom-coffee-input").addEventListener("keydown", (event) => { if (event.key === "Enter") confirmCustomDose(); });
$("#custom-dose-confirm").addEventListener("click", confirmCustomDose);
$$(".grind-mode-card").forEach((button) => button.addEventListener("click", () => selectGrindMode(button.dataset.grindMode)));
$$('[data-go-step]').forEach((button) => button.addEventListener("click", () => showSetupStep(Number(button.dataset.goStep))));
$$('[data-help]').forEach((button) => button.addEventListener("click", () => showHelp(button.dataset.help)));
$("#repeat-button").addEventListener("click", repeatLastRitual);
$("#home-button").addEventListener("click", resetSetup);
$("#start-button").addEventListener("click", startRitual);
$("#exit-ritual").addEventListener("click", exitRitual);
$("#pause-button").addEventListener("click", togglePause);
$("#next-button").addEventListener("click", nextStep);
$("#install-prompt-action").addEventListener("click", handleInstallPromptAction);
$("#install-prompt-later").addEventListener("click", postponeInstallPrompt);
$("#install-prompt-close").addEventListener("click", postponeInstallPrompt);

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  updateInstallPromptCopy();
});

window.addEventListener("appinstalled", rememberInstallPrompt);

document.addEventListener("keydown", (event) => {
  if (!$("#ritual-screen").classList.contains("is-visible")) return;
  if (event.code === "Space") { event.preventDefault(); ritualReady ? beginCountdown() : togglePause(); }
  if (event.code === "ArrowRight") nextStep();
  if (event.code === "Escape") exitRitual();
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && $("#ritual-screen").classList.contains("is-visible")) requestWakeLock();
});

startAppSplash();

lastRecipe = readSavedRecipe();
preferredGrindMode = lastRecipe?.grindMode || null;
updateRepeatCard();
showSetupStep(0);
scheduleInstallPrompt();
