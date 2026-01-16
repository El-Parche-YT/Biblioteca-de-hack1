// ==========================================
// 1. LÓGICA DEL BLOQUEADOR (3 CLICS - SIEMPRE AL RECARGAR)
// ==========================================
let clicsLocker = 0;
const smartlinkURL = "https://www.effectivegatecpm.com/udwqdtkwf?key=2439b5fa83ecf2fd05ad50db1ef80d65";

function registrarClicLocker() {
    clicsLocker++;
    window.open(smartlinkURL, '_blank');
    
    let faltan = 3 - clicsLocker;
    const contadorTexto = document.getElementById('clics-restantes');
    if (contadorTexto) {
        contadorTexto.innerText = faltan + " clics";
    }

    if (clicsLocker >= 3) {
        const overlay = document.getElementById('locker-overlay');
        if (overlay) overlay.style.display = 'none';
        // Nota: Al no guardar nada en localStorage, el bloqueador vuelve a salir al refrescar F5.
    }
}

// ==========================================
// 2. LÓGICA ORIGINAL DE DESBLOQUEO DE TARJETAS
// ==========================================
const unlockSound = document.getElementById("unlockSound");
if (unlockSound) unlockSound.volume = 0.4;

document.querySelectorAll('.unlock-card').forEach(initCard);

function initCard(card) {
  const waitTime = parseInt(card.dataset.wait) || 15;
  const likeBtn = card.querySelector(".like-btn");
  const subBtn = card.querySelector(".sub-btn");
  const subBtn2 = card.querySelector(".sub-btn-2");
  const downloadBtn = card.querySelector(".download-btn");
  const timerBox = card.querySelector(".timer");
  const countEl = card.querySelector(".count");
  const fakeCounter = card.querySelector(".fake-counter");

  let liked = false, subscribed = false, subscribed2 = false, countdownInterval;

  if (likeBtn) {
    likeBtn.onclick = () => {
      if (liked) return;
      window.open(likeBtn.dataset.link, "_blank");
      liked = true;
      likeBtn.innerHTML = "✅ Like Completado";
      startCountdown(waitTime, () => unlockSubBtn());
    };
  }

  if (subBtn) {
    subBtn.onclick = () => {
      if (subscribed) return;
      window.open(subBtn.dataset.link, "_blank");
      subscribed = true;
      subBtn.innerHTML = "✅ Suscripción 1 OK";
      startCountdown(waitTime, () => subBtn2 ? unlockSubBtn2() : unlockButton());
    };
  }

  if (subBtn2) {
    subBtn2.onclick = () => {
      if (subscribed2) return;
      window.open(subBtn2.dataset.link, "_blank");
      subscribed2 = true;
      subBtn2.innerHTML = "✅ Suscripción 2 OK";
      startCountdown(waitTime, () => unlockButton());
    };
  }

  if (downloadBtn) {
    downloadBtn.onclick = () => { window.open(downloadBtn.dataset.link, "_blank"); };
  }

  function startCountdown(seconds, callback) {
    if (countdownInterval) clearInterval(countdownInterval);
    if (timerBox) timerBox.classList.remove("hidden");
    let time = seconds;
    if (countEl) countEl.innerText = time;
    countdownInterval = setInterval(() => {
      time--;
      if (countEl) countEl.innerText = time;
      if (time <= 0) { clearInterval(countdownInterval); if (callback) callback(); }
    }, 1000);
  }

  function unlockSubBtn() {
    if (timerBox) timerBox.classList.add("hidden");
    if (subBtn) { subBtn.disabled = false; subBtn.classList.remove("locked"); subBtn.innerHTML = "🔔 Suscribirse 1"; }
  }

  function unlockSubBtn2() {
    if (timerBox) timerBox.classList.add("hidden");
    if (subBtn2) { subBtn2.disabled = false; subBtn2.classList.remove("locked"); subBtn2.innerHTML = "🔔 Suscribirse 2"; }
  }

  function unlockButton() {
    if (timerBox) timerBox.classList.add("hidden");
    if (downloadBtn) { downloadBtn.disabled = false; downloadBtn.classList.remove("locked"); downloadBtn.innerHTML = "⬇️ Ir al Link"; }
    if (unlockSound) unlockSound.play();
    launchConfetti();
  }
}

function launchConfetti() {
  for (let i = 0; i < 30; i++) {
    const div = document.createElement("div");
    div.style.position = "fixed"; div.style.width = "10px"; div.style.height = "10px";
    div.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
    div.style.left = Math.random() * 100 + "vw"; div.style.top = "-10px";
    div.style.zIndex = "9999"; div.style.borderRadius = "2px";
    div.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(100vh) rotate(360deg)' }], { duration: 3000 });
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  }
}

// Partículas y contador de visitas original
setInterval(() => {
  const p = document.createElement('div');
  p.classList.add('particle');
  p.style.width = '4px'; p.style.height = '4px';
  p.style.left = Math.random()*100+'vw'; p.style.background = '#ffae00';
  p.style.setProperty('--drift', (Math.random()-0.5)*100+'px');
  p.style.animationDuration = '7s';
  document.getElementById('particles-container').appendChild(p);
  setTimeout(() => p.remove(), 7000);
}, 400);