let startTime, elapsedTime = 0, timerInterval;
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const clearButton = document.getElementById('clear');

// Formatear el tiempo en formato hh:mm:ss:ms
function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

// Añadir ceros iniciales
function pad(number, length = 2) {
    return number.toString().padStart(length, '0');
}

// Actualizar la pantalla del cronómetro
function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

// Iniciar el cronómetro
function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
    saveElapsedTime(); // Guardar tiempo en localStorage
    toggleButtons(true);
}

// Pausar el cronómetro
function pause() {
    clearInterval(timerInterval);
    saveElapsedTime(); // Guardar tiempo al pausar
    toggleButtons(false);
}

// Reiniciar el cronómetro
function clear() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    localStorage.removeItem('stopwatch-time'); // Eliminar del localStorage
    toggleButtons(false);
}

// Alternar botones entre activo/inactivo
function toggleButtons(isRunning) {
    startButton.disabled = isRunning;
    pauseButton.disabled = !isRunning;
}

// Guardar el tiempo en localStorage
function saveElapsedTime() {
    localStorage.setItem('stopwatch-time', elapsedTime);
}

// Recuperar tiempo guardado al cargar la página
window.onload = () => {
    const savedTime = localStorage.getItem('stopwatch-time');
    if (savedTime) {
        elapsedTime = parseInt(savedTime);
        updateDisplay();
    }
    toggleButtons(false);
};

// Asignar eventos a los botones
startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
clearButton.addEventListener('click', clear);

