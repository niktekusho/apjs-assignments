let timerValue = 0;
let isTimerRunning = false;
let pastTimes = [];
let interval;
let timerStartedAt;
let prevTime = 0;

const startStopButtonId = "startStopButton";
const resetButtonId = "resetButton";
const recordTimeButtonId = "recordTimeButton";
const timerValueId = "timerValue";

const domElements = {};

function initListeners() {
  const startStopButton = document.getElementById(startStopButtonId);
  startStopButton.addEventListener("click", function() {
    switchTimerState();
  });
  domElements.startStopButton = startStopButton;
  
  const resetButton = document.getElementById(resetButtonId);
  resetButton.addEventListener("click", function() {
    resetTimer();
  });
  domElements.resetButton = resetButton;
  
  const recordButton = document.getElementById(recordTimeButtonId);
  recordButton.addEventListener("click", function() {
    recordTime();
  });
  domElements.recordTimeButton = recordButton;
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
  // TODO
  console.log(timerValue);
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
  
  // lazy init timerValue inside domElements
  if (!domElements.timerValue) {
    domElements.timerValue = document.getElementById(timerValueId);
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
}

initListeners();