var hr = 0,
  min = 0,
  sec = 0;
var today = new Date();
var utcToday = today.getUTCDate();
var started = false;
hourContent = document.getElementById("hour");
minuteContent = document.getElementById("minute");
secondContent = document.getElementById("second");
meridianContent = document.getElementById("meridian");
startButton = document.getElementById("startButton");
resetButton = document.getElementById("resetButton");
resetDiv = document.getElementById("resetDiv");
liveTimeButton = document.getElementById("liveTimeButton");
stopwatch_controls = document.getElementById("stopwatch-controls");
livetime_controls = document.getElementById("livetime-controls");
var clockInterval;

function show(element) {
  element.style.display = "block";
}
function hide(element) {
  element.style.display = "none";
}
function setContent(element, text) {
  element.innerHTML = text;
}

function setValues(hr, min, sec) {
  hr = (hr < 10) ? "0" + Number(hr) : hr;
  min = (min < 10) ? "0" + Number(min) : min;
  sec = (sec < 10) ? "0" + Number(sec) : sec;
  hourContent.innerHTML = hr;
  minuteContent.innerHTML = min;
  secondContent.innerHTML = sec;
}

setValues(0, 0, 0);

function startClock() {
  started = !started;
  resetDiv.style.display = "inline-block";
  startButton.innerHTML = "STOP";
  clearInterval(clockInterval);
  if (started) {
    clockInterval = setInterval(function () {
      if (sec < 60) {
        sec++;
        if (sec == 60) {
          sec = 0;
          if (min < 60) {
            min++;
            if (min == 60) {
              min = 0;
              hr++;
            }
          }
        }
      }
      setValues(hr, min, sec);
    }, 1000);
  } else {
    started = false;
    startButton.innerHTML = "RESUME";
    clearInterval(clockInterval);
  }
}

function resetClock() {
  hr = 0;
  min = 0;
  sec = 0;
  startButton.innerHTML = "START";
  clearInterval(clockInterval);
  started = false;
  setValues(hr, min, sec);
  hide(resetDiv);
}

function stopwatch() {
  hide(livetime_controls);
  show(stopwatch_controls);
  resetClock();
}

function livetime() {
  // hide(stopwatch_controls);
  // show(livetime_controls);
  // setInterval(function () {
  //   today = new Date();
  //   hr = today.getHours();
  //   min = today.getMinutes();
  //   sec = today.getSeconds();
  //   setContent(meridianContent, "AM");
  //   setValues(hr, min, sec);
  // }, 500);
}

function countryClock(utcHour, utcMin) {
  hide(stopwatch_controls);
  show(livetime_controls);
  setValues(0, 0, 0);
  clearInterval(clockInterval);
  clockInterval = setInterval(function () {
    today = new Date();
    hr = today.getUTCHours() + utcHour;
    min = today.getUTCMinutes() + utcMin;
    sec = today.getUTCSeconds();
    if (min > 60) {
      min = min - 60;
      ++hr;
    }
    if (hr > 24) {
      hr -= 24;
    }
    hr = (hr == 24) ? 0 : hr;
    min = (min == 60) ? 0 : min;
    sec = (sec == 60) ? 0 : sec;

    time = Number(hr) + " : " + Number(min) + " : " + Number(sec);
    setContent(meridianContent, hr < 12 ? "AM" : "PM");
    setValues(hr % 12, min, sec);
  }, 1000);
}