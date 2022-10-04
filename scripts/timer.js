var timerView = document.getElementById("timerView");
var start = document.getElementById("strt");
var stop = document.getElementById("stp");
var save = document.getElementById("save");
var secView = document.querySelector("#secView p");
var minView = document.querySelector("#minView p");
var hourView = document.querySelector("#hourView p");
var addButton = document.querySelectorAll(".add");
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

  if (isRunning) {
    start.children[0].classList.remove("fa-play");
    start.children[0].classList.remove("fa-pause");
    start.children[0].classList.add("fa-hourglass-start");
  }

  timer();
}

function getTime() {
  //HH:MM with hrs and min
  return `${hrs > 9 ? hrs : "0" + hrs}:${min > 9 ? min : "0" + min}`;
}

function reset() {
  chrome.storage.local.set({ timer: null }, function () {
    clearTimeout(t);
    isRunning = false;
    sec = 0;
    min = 0;
    hrs = 0;
    secView.textContent = "00";
    hourView.textContent = "00";
    minView.textContent = "00";
  });

  addButton.forEach((btn) => {
    btn.style.display = "none";
  });

  start.children[0].classList.remove("fa-hourglass-start");
  start.children[0].classList.remove("fa-pause");
  start.children[0].classList.add("fa-play");
}

function updateTimeTab(e) {
  chrome.storage.local.get(["timeProject"], function (response) {
    if (response.timeProject) {
      let timeProject = response.timeProject;
      let project =
        e.target.parentElement.previousElementSibling.dataset.project;

      let time = timeProject.filter((item) => item.name === project)[0].time;
      if (time) {
        let { hours, minutes } = convertTime(time);

        hours = hours + convertTime(getTime()).hours;
        minutes = minutes + convertTime(getTime()).minutes;

        //update timeProject
        timeProject = timeProject.map((item) => {
          if (item.name === project) {
            item.time = `${hours}:${minutes}`;
          }
          return item;
        });

        chrome.storage.local.set({ timeProject }, function () {
          console.log("timeProject is set to " + timeProject);
        });

        console.log(typeof reset);

        reset();

        updateDom(timeProject);
      }
    }
  });
}

addButton.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    updateTimeTab(e);
  });
});

function timer() {
  t = setTimeout(add, 1000);
}

start.onclick = () => {
  if (isRunning === false) {
    startTime = Date.now();
    chrome.storage.local.set({ timer: { startTime: startTime } }, function () {
      console.log(startTime);
    });
    isRunning = true;

    addButton.forEach((btn) => {
      btn.style.display = "none";
    });

    timer();
  } else {
    endTime = Date.now();
    chrome.storage.local.set({ timer: { endTime: endTime } }, function () {
      console.log(startTime);
    });
    clearTimeout(t);
    isRunning = false;

    start.children[0].classList.remove("fa-hourglass-start");
    start.children[0].classList.remove("fa-play");
    start.children[0].classList.add("fa-pause");

    //display block addButton
    addButton.forEach((btn) => {
      btn.style.display = "block";
    });
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
