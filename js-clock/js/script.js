var hr = 0,
  min = 0,
  sec = 0;
var today = new Date();
var utcToday = today.getUTCDate();
var started = false;
function getById(id) {
  return document.getElementById(id);
}
hourContent = getById("hour");
minuteContent = getById("minute");
secondContent = getById("second");
meridianContent = getById("meridian");
startButton = getById("startButton");
resetButton = getById("resetButton");
resetDiv = getById("resetDiv");
liveTimeButton = getById("liveTimeButton");
stopwatch_controls = getById("stopwatch-controls");
livetime_controls = getById("livetime-controls");
lsec = getById("left-sec");
rsec = getById("right-sec");
var clockInterval;

function show(element) {
  element.style.display = "block";
}
function showInline(element) {
  element.style.display = "inline-block";
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
  //secondContent.innerHTML = sec;


  setContent(lsec, Math.floor(sec / 10));
  setContent(rsec, sec % 10);
  rsec.addEventListener('DOMSubtreeModified', changer(rsec));
}
function changer(element) {

  var myArray = ['red', 'green', 'blue', 'black'];
  var randomColor = myArray[(Math.random() * myArray.length) | 0];
  element.style.backgroundColor = randomColor;
}
setValues(0, 0, 0);

function startClock() {
  started = !started;
  showInline(resetDiv);
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
  hide(meridianContent);
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
  showInline(meridianContent);
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
    ampm = hr < 12 ? "AM" : "PM"
    hr = (hr == 24) ? 0 : hr;
    min = (min == 60) ? 0 : min;
    sec = (sec == 60) ? 0 : sec;
    hr = (hr % 12 == 0) ? 12 : (hr % 12);

    time = Number(hr) + " : " + Number(min) + " : " + Number(sec);
    setContent(meridianContent, ampm);
    setValues(hr, min, sec);
  }, 1000);
}