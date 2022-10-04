var timerView = document.getElementById("timerView");
var start = document.getElementById("strt");
var stop = document.getElementById("stp");
var reset = document.getElementById("rst");
var save = document.getElementById("save");
var secView = document.getElementById("secView");
var sec = 0;
var min = 0;
var hrs = 0;
var t;
var isRunning = false;
var startTime;
dateNow = Date.now();

if (chrome.storage.local.get(["timer"])) {
  chrome.storage.local.get(["timer"], function (response) {
    if (response.timer.startTime && !response.timer.endTime) {
      isRunning = true;
      sec = Math.floor(dateNow - response.timer.startTime) / 1000;

      hrs = Math.floor(sec / 60 / 60);
      sec -= hrs * 60 * 60;

      min = Math.floor(sec / 60);
      sec -= min * 60;
      sec = Math.floor(sec);

      secView.textContent = sec > 9 ? sec : "0" + sec;
      hourView.textContent = hrs > 9 ? hrs : "0" + hrs;
      minView.textContent = min > 9 ? min : "0" + min;
      add();
    } else if (response.timer.endTime) {
      sec = 0;
      min = 0;
      hrs = 0;
    }
  });
}

// chrome.storage.local.get(["startTime"], function (response) {
//   if (response) {
//     isRunning = true;
//     console.log(response);
//   }
// });

function tick() {
  sec++;
  if (sec >= 60) {
    sec = 0;
    min++;
    if (min >= 60) {
      min = 0;
      hrs++;
    }
  }
}
function add() {
  tick();
  secView.textContent = sec > 9 ? sec : "0" + sec;
  hourView.textContent = hrs > 9 ? hrs : "0" + hrs;
  minView.textContent = min > 9 ? min : "0" + min;
  timer();
}
function timer() {
  t = setTimeout(add, 1000);
}

start.onclick = () => {
  if (isRunning === false) {
    startTime = Date.now();
    console.log(startTime);
    chrome.storage.local.set({ timer: { startTime: startTime } }, function () {
      console.log(startTime);
    });
    isRunning = true;
    timer();
  } else {
    endTime = Date.now();
    chrome.storage.local.set({ timer: { endTime: endTime } }, function () {
      console.log(startTime);
    });
    clearTimeout(t);
    isRunning = false;
  }
};

// reset.onclick = function () {
//   timerView.textContent = "00:00:00";
//   sec = 0;
//   min = 0;
//   hrs = 0;
// };

// save.onclick = async () => {
//   day = Date();
//   //set storage with data for time and date
//   chrome.storage.local.set(
//     { timer: { secondes: sec, minutes: min, hours: hrs }, date: day },
//     function () {
//       console.log(sec);
//     }
//   );
//   //To check if data is in the storage
//   chrome.storage.local.get(
//     ["secondes", "minutes", "hours"],
//     function (response) {
//       console.log(response);
//     }
//   );
// };
