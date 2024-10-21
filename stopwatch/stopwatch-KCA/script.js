// Variables para el Cronómetro
let timerInterval
let timerStarted = false
let startTime
let elapsedTime = 0

// Variables para la Cuenta Atrás
let countdownInterval
let countdownStarted = false
let countdownTime = 0 // Tiempo en milisegundos

const timerElement = document.getElementById("timer")
const countdownElement = document.getElementById("countdown")
const timerContainer = document.getElementById("timer-container")
const countdownContainer = document.getElementById("countdown-container")
const toolSelection = document.getElementById("tool-selection")
const numPad = document.getElementById("num-pad")

// Crear botones del teclado numérico
for (let i = 0; i <= 9; i++) {
  const button = document.createElement("button")
  button.id = `num-${i}`
  button.className = "bg-gray-300 px-4 py-2 rounded"
  button.textContent = i
  button.addEventListener("click", () => addToCountdown(i))
  numPad.appendChild(button)
}

// Funcionalidad de Cronómetro
document.getElementById("start-timer-btn").addEventListener("click", () => {
  toolSelection.classList.add("hidden")
  timerContainer.classList.remove("hidden")
  resetTimer()
})

document.getElementById("start-btn").addEventListener("click", () => {
  if (!timerStarted) {
    startTime = Date.now() - elapsedTime
    timerInterval = setInterval(updateTimer, 10)
    timerStarted = true
  }
})

document.getElementById("pause-btn").addEventListener("click", () => {
  clearInterval(timerInterval)
  timerStarted = false
})

document.getElementById("reset-btn").addEventListener("click", () => {
  resetTimer()
})

document.getElementById("back-btn-timer").addEventListener("click", () => {
  timerContainer.classList.add("hidden")
  toolSelection.classList.remove("hidden")
  resetTimer()
})

// Funciones del Cronómetro
function updateTimer() {
  elapsedTime = Date.now() - startTime
  const milliseconds = Math.floor(elapsedTime % 1000)
  const seconds = Math.floor((elapsedTime / 1000) % 60)
  const minutes = Math.floor((elapsedTime / 60000) % 60)
  const hours = Math.floor(elapsedTime / 3600000)

  timerElement.innerText = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(
    milliseconds
  ).padStart(3, "0")}`
}

function resetTimer() {
  clearInterval(timerInterval)
  elapsedTime = 0
  timerStarted = false
  timerElement.innerText = "00:00:00.000"
}

// Funcionalidad de Cuenta Atrás
document.getElementById("countdown-btn").addEventListener("click", () => {
  toolSelection.classList.add("hidden")
  countdownContainer.classList.remove("hidden")
  resetCountdown()
})

document.getElementById("countdown-start-btn").addEventListener("click", () => {
  if (!countdownStarted && countdownTime > 0) {
    countdownStarted = true
    countdownInterval = setInterval(updateCountdown, 10)
  }
})

document.getElementById("countdown-pause-btn").addEventListener("click", () => {
  clearInterval(countdownInterval)
  countdownStarted = false
})

document.getElementById("countdown-reset-btn").addEventListener("click", () => {
  resetCountdown()
})

document.getElementById("countdown-clear-btn").addEventListener("click", () => {
  countdownTime = 0
  countdownElement.innerText = "00:00:00.000"
})

document.getElementById("back-btn-countdown").addEventListener("click", () => {
  countdownContainer.classList.add("hidden")
  toolSelection.classList.remove("hidden")
  resetCountdown()
})

// Teclado Numérico
function addToCountdown(num) {
  // Obtener el valor actual de la cuenta atrás y eliminar los milisegundos
  const currentValue = countdownElement.innerText.replace(/\./g, "").split(":")

  // Concatenar el nuevo dígito al final de la representación actual
  let newValue = (currentValue.join("") + num.toString()).slice(-6) // Asegurar que no exceda 6 caracteres

  // Asegurarse de que tenemos exactamente 6 caracteres
  while (newValue.length < 6) {
    newValue = "0" + newValue // Añadir ceros a la izquierda si es necesario
  }

  // Formatear horas, minutos y segundos
  const hours = newValue.substring(0, 2) // Primeros 2 caracteres para horas
  const minutes = newValue.substring(2, 4) // Siguientes 2 caracteres para minutos
  const seconds = newValue.substring(4, 6) // Últimos 2 caracteres para segundos

  // Actualizar la cuenta atrás en el formato HH:MM:SS.000
  countdownElement.innerText = `${hours}:${minutes}:${seconds}.000`

  // Calcular el tiempo total en milisegundos para iniciar la cuenta atrás
  countdownTime =
    parseInt(hours) * 3600000 +
    parseInt(minutes) * 60000 +
    parseInt(seconds) * 1000
}

function updateCountdown() {
  if (countdownTime <= 0) {
    clearInterval(countdownInterval)
    countdownStarted = false
    return
  }

  countdownTime -= 10
  const hours = Math.floor(countdownTime / 3600000)
  const minutes = Math.floor((countdownTime % 3600000) / 60000)
  const seconds = Math.floor((countdownTime % 60000) / 1000)
  const milliseconds = Math.floor(countdownTime % 1000)

  countdownElement.innerText = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(
    milliseconds
  ).padStart(3, "0")}`
}

function resetCountdown() {
  clearInterval(countdownInterval)
  countdownTime = 0
  countdownStarted = false
  countdownElement.innerText = "00:00:00.000"
}
