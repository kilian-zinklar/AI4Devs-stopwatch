// Variables para el cronómetro
let stopwatchInterval;
let stopwatchTime = 0;
let stopwatchRunning = false;

// Variables para la cuenta atrás
let countdownInterval;
let countdownTime = 480000; // 8 minutos en milisegundos
let countdownRunning = false;

// Función para actualizar el display del cronómetro con milisegundos
function updateStopwatchDisplay() {
  const hours = Math.floor(stopwatchTime / 3600000)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((stopwatchTime % 3600000) / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((stopwatchTime % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const milliseconds = (stopwatchTime % 1000).toString().padStart(3, "0");

  document.getElementById(
    "stopwatch-display"
  ).textContent = `${hours}:${minutes}:${seconds}`;
  document.getElementById("stopwatch-ms").textContent = `.${milliseconds}`;
}

// Función para iniciar o pausar el cronómetro
document.getElementById("start-stopwatch").addEventListener("click", () => {
  if (!stopwatchRunning) {
    stopwatchRunning = true;
    document.getElementById("start-stopwatch").textContent = "Pausar";
    document
      .getElementById("start-stopwatch")
      .classList.replace("bg-green-500", "bg-blue-500");
    const startTime = Date.now() - stopwatchTime;
    stopwatchInterval = setInterval(() => {
      stopwatchTime = Date.now() - startTime;
      updateStopwatchDisplay();
    }, 1); // Actualizar cada milisegundo
  } else {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    document.getElementById("start-stopwatch").textContent = "Continuar";
    document
      .getElementById("start-stopwatch")
      .classList.replace("bg-blue-500", "bg-green-500");
  }
});

// Función para reiniciar el cronómetro
document.getElementById("reset-stopwatch").addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchTime = 0;
  stopwatchRunning = false;
  document.getElementById("start-stopwatch").textContent = "Iniciar";
  document
    .getElementById("start-stopwatch")
    .classList.replace("bg-blue-500", "bg-green-500");
  updateStopwatchDisplay();
});

// Función para actualizar el display de la cuenta atrás con milisegundos
function updateCountdownDisplay() {
  const hours = Math.floor(countdownTime / 3600000)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((countdownTime % 3600000) / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((countdownTime % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const milliseconds = (countdownTime % 1000).toString().padStart(3, "0");

  document.getElementById(
    "countdown-display"
  ).textContent = `${hours}:${minutes}:${seconds}`;
  document.getElementById("countdown-ms").textContent = `.${milliseconds}`;
}

// Función para iniciar o pausar la cuenta atrás
document.getElementById("start-countdown").addEventListener("click", () => {
  if (!countdownRunning) {
    countdownRunning = true;
    document.getElementById("start-countdown").textContent = "Pausar";
    document
      .getElementById("start-countdown")
      .classList.replace("bg-green-500", "bg-blue-500");
    const startTime = Date.now();
    countdownInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;

      // Actualización controlada de los milisegundos, segundos y minutos
      countdownTime -= 10; // Restar en pequeños intervalos

      if (countdownTime <= 0) {
        clearInterval(countdownInterval);
        countdownTime = 0;
        countdownRunning = false;
        updateCountdownDisplay();
        // Cambia el color del texto a rojo cuando llega a 00:00:00
        document
          .getElementById("countdown-display")
          .classList.add("text-red-500");
      } else {
        updateCountdownDisplay();
      }
    }, 10); // Actualizar cada 10ms para mayor precisión
  } else {
    clearInterval(countdownInterval);
    countdownRunning = false;
    document.getElementById("start-countdown").textContent = "Continuar";
    document
      .getElementById("start-countdown")
      .classList.replace("bg-blue-500", "bg-green-500");
  }
});

// Función para reiniciar la cuenta atrás
document.getElementById("reset-countdown").addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownTime = 480000; // Restablece a 8 minutos en milisegundos
  countdownRunning = false;
  document.getElementById("start-countdown").textContent = "Iniciar";
  document
    .getElementById("start-countdown")
    .classList.replace("bg-blue-500", "bg-green-500");
  document.getElementById("countdown-display").classList.remove("text-red-500"); // Elimina el color rojo
  updateCountdownDisplay();
});

// Funciones para aumentar o disminuir el tiempo de la cuenta atrás
document.getElementById("increase-hours").addEventListener("click", () => {
  countdownTime += 3600000; // Aumenta una hora
  updateCountdownDisplay();
});

document.getElementById("increase-minutes").addEventListener("click", () => {
  countdownTime += 60000; // Aumenta un minuto
  updateCountdownDisplay();
});

document.getElementById("increase-seconds").addEventListener("click", () => {
  countdownTime += 1000; // Aumenta un segundo
  updateCountdownDisplay();
});

document.getElementById("decrease-hours").addEventListener("click", () => {
  countdownTime = Math.max(0, countdownTime - 3600000); // Disminuye una hora
  updateCountdownDisplay();
});

document.getElementById("decrease-minutes").addEventListener("click", () => {
  countdownTime = Math.max(0, countdownTime - 60000); // Disminuye un minuto
  updateCountdownDisplay();
});

document.getElementById("decrease-seconds").addEventListener("click", () => {
  countdownTime = Math.max(0, countdownTime - 1000); // Disminuye un segundo
  updateCountdownDisplay();
});
