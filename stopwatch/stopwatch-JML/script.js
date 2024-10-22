// Utility functions
function padZero(num, length = 2) {
    return num.toString().padStart(length, '0');
}

function formatTime(ms, includeMs = true) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000));
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}${includeMs ? `<span class="milliseconds">${padZero(milliseconds, 3)}</span>` : ''}`;
}

function showScreen(screenId) {
    // Hide all screens first
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Hide or show main menu
    const mainMenu = document.getElementById('main-menu');
    if (screenId === 'main-menu') {
        mainMenu.classList.remove('hidden');
    } else {
        mainMenu.classList.add('hidden');
    }
    
    // Show selected screen
    if (screenId !== 'main-menu') {
        document.getElementById(screenId).classList.add('active');
    }
}

// Stopwatch class
class Stopwatch {
    constructor() {
        this.display = document.getElementById('stopwatch-display');
        this.running = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.intervalId = null;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.startTime = Date.now() - this.elapsedTime;
            this.intervalId = setInterval(() => {
                this.elapsedTime = Date.now() - this.startTime;
                this.display.innerHTML = formatTime(this.elapsedTime);
            }, 10);
        }
    }

    clear() {
        this.running = false;
        clearInterval(this.intervalId);
        this.elapsedTime = 0;
        this.display.innerHTML = formatTime(0);
    }
}

// Timer class
class Timer {
    constructor() {
        this.display = document.getElementById('timer-display');
        this.running = false;
        this.remainingTime = 0;
        this.intervalId = null;
        this.inputValue = '';
    }

    inputNumber(num) {
        if (this.inputValue.length < 6) {
            this.inputValue += num;
            this.updateDisplay();
        }
    }

    updateDisplay() {
        const padded = this.inputValue.padStart(6, '0');
        const hours = padded.slice(0, 2);
        const minutes = padded.slice(2, 4);
        const seconds = padded.slice(4, 6);
        this.display.innerHTML = `${hours}:${minutes}:${seconds}<span class="milliseconds">000</span>`;
    }

    set() {
        if (this.inputValue) {
            const padded = this.inputValue.padStart(6, '0');
            const hours = parseInt(padded.slice(0, 2));
            const minutes = parseInt(padded.slice(2, 4));
            const seconds = parseInt(padded.slice(4, 6));
            this.remainingTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
            
            if (this.remainingTime > 0) {
                this.running = true;
                const endTime = Date.now() + this.remainingTime;
                this.intervalId = setInterval(() => {
                    this.remainingTime = Math.max(0, endTime - Date.now());
                    this.display.innerHTML = formatTime(this.remainingTime);
                    if (this.remainingTime === 0) {
                        this.clear();
                        alert('Time is up!');
                    }
                }, 10);
            }
        }
        this.inputValue = '';
    }

    clear() {
        this.running = false;
        clearInterval(this.intervalId);
        this.remainingTime = 0;
        this.inputValue = '';
        this.display.innerHTML = formatTime(0);
    }
}

// Initialize objects
const stopwatch = new Stopwatch();
const timer = new Timer();
