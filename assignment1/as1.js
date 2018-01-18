let timerValue = 0;
let isTimerRunning = false;
let interval;
let timerStartedAt;
let prevTime = 0;

const startStopButtonId = "startStopButton";
const resetButtonId = "resetButton";
const recordTimeButtonId = "recordTimeButton";
const timerValueId = "timerValue";
const pastTimesId = "pastTimes";

const domElements = {};

function setup() {
  domElements.startStopButton = document.getElementById(startStopButtonId);
  
  domElements.resetButton = document.getElementById(resetButtonId);
  
  domElements.recordTimeButton = document.getElementById(recordTimeButtonId);
  
  domElements.timerValue = document.getElementById(timerValueId);
  
  domElements.pastTimes = document.getElementById(pastTimesId);
}

function initListeners() {
  setup();
  
  domElements.startStopButton.addEventListener("click", function() {
    switchTimerState();
  });
  
  domElements.resetButton.addEventListener("click", function() {
    resetTimer();
  });  

  domElements.recordTimeButton.addEventListener("click", function() {
    recordTime();
  });
  
}

const TIMER_INTERVAL = 100;
// in ms: 1/100 * 1000
const timerInterval = 1/TIMER_INTERVAL * 1000;

function switchTimerState() {
  if (isTimerRunning) {
    prevTime = timerValue;
    stopTimer();
  } else {
    startTimer();
  }
}

function recordTime() {
  const span = document.createElement("span");
  const text = document.createTextNode(timerValue);
  span.appendChild(text);
  
  domElements.pastTimes.appendChild(span);
}

function repeatedFunction() {
  const now = new Date();
  // time in milliseconds
  const elapsedTime = now - timerStartedAt;
  
  // needs conversion from ms to s
  timerValue = elapsedTime / 1000;
  
  if (prevTime > 0) {
    timerValue += prevTime;
  }
  
  domElements.timerValue.innerHTML = timerValue.toFixed(2);
}

function startTimer() {
  timerStartedAt = new Date();
  interval = setInterval(repeatedFunction, timerInterval);
  isTimerRunning = true;
}

function stopTimer() {
  clearInterval(interval);
  isTimerRunning = false;
}

function resetTimer() {
  stopTimer();
  timerValue = 0;
  prevTime = 0;
  timerStartedAt = null;
  domElements.timerValue.innerHTML = timerValue;
  domElements.pastTimes.innerHTML = "";
}

initListeners();