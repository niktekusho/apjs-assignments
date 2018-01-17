let timerValue = 0;
let isTimerRunning = false;
let pastTimes = [];
let interval;
let timerStartedAt;

// in ms: 1/100 * 1000
const timerInterval = 10;

function switchTimerState() {
  if (isTimerRunning) {
    stopTimer();
  } else {
    startTimer();
  }
}

function repeatedFunction() {
  const now = new Date();
  // time in milliseconds
  const elapsedTime = now - timerStartedAt;
  
  const timerValueElement = document.getElementById("timerValue");
  
  // retrieve the previous timerValue (s)
  const prevTime = Number(timerValueElement.innerHTML);
  
  // second part needs conversion from ms to s
  const resultTime = prevTime + (elapsedTime / 1000);
  
  timerValueElement.innerHTML = resultTime;
}

function startTimer() {
  // if timer has been paused by stopTimer() the timerStartedAt variable must not be reset
  timerStartedAt = new Date();
  interval = setInterval(repeatedFunction, timerInterval);
  isTimerRunning = true;
}

function stopTimer() {
  clearInterval(interval);
  isTimerRunning = false;
}

function resetTimer() {
  timerStartedAt = null;
}