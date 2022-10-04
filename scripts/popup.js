let timeProject = document.querySelectorAll(".projets .time");
let totalTime = document.querySelector("#total .time");
let addTime = document.querySelectorAll(".add");
let timeTab = [];
let hoursPerDays = document.getElementById("hours-per-day");
let sendButton = document.getElementById("send");
let popupCongrate = document.getElementById("popup-congrate");

// const time = "00:26";

document.addEventListener("DOMContentLoaded", async () => {
  chrome.storage.local.get(["timeProject"], function (response) {
    if (response.timeProject) {
      timeTab = response.timeProject;
      timeProject.forEach((time, index) => {
        time.innerHTML = timeTab[index];
      });
    } else {
      timeProject.forEach((project) => {
        timeTab.push({
          name: project.dataset.project,
          time: "00:00",
        });
      });

      updateTimeStorage(timeTab);
    }
  });

  updateDom(timeTab);

  if (chrome.storage.local.get(["hourPerDay"])) {
    chrome.storage.local.get(["hourPerDay"], function (result) {
      console.log(result);
      if (result.hourPerDay !== "")
        hoursPerDays.innerText = result.hourPerDay + ":00";
    });
  }

  if (chrome.storage.local.get(["themeColor"])) {
    chrome.storage.local.get(["themeColor"], function (result) {
      if (result.themeColor !== undefined)
        document.documentElement.style.setProperty(
          "--color-primary",
          result.themeColor
        );
    });
  }
});

const convertTime = (time) => {
  console.log("time", time);
  let [hours, minutes] = time.split(":");

  hours = parseInt(hours);
  minutes = parseInt(minutes);

  return { hours, minutes };
};

const displayTime = (time) => {
  let { hours, minutes } = convertTime(time);

  while (minutes >= 60) {
    hours = hours + 1;
    minutes = minutes - 60;
  }

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
};

const updateDom = (timeTab) => {
  chrome.storage.local.get(["timeProject"], function (response) {
    if (response.timeProject !== undefined) {
      timeTab = response.timeProject;
    }

    timeProject.forEach((project) => {
      timeTab.forEach((time) => {
        if (project.dataset.project === time.name) {
          project.innerText = displayTime(time.time);
        }
      });
    });

    let total = timeTab.reduce(
      (acc, time) => {
        let { hours, minutes } = convertTime(time.time);

        acc.hours += hours;
        acc.minutes += minutes;

        return acc;
      },
      { hours: 0, minutes: 0 }
    );

    totalTime.innerText = displayTime(`${total.hours}:${total.minutes}`);
  });
};

const updateTimeStorage = (timeTab) => {
  chrome.storage.local.set({ timeProject: timeTab }, function () {
    console.log("timeProject is set to " + timeTab);
  });
};

// addTime.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     e.preventDefault();

//     const timeSibling = e.target.parentElement.previousElementSibling;

//     const { hours, minutes } = convertTime(timeSibling.innerText);

//     let newHours = parseInt(hours) + parseInt(convertTime(time).hours);
//     let newMinutes = parseInt(minutes) + parseInt(convertTime(time).minutes);

//     if (newHours < 10) {
//       newHours = "0" + newHours;
//     }

//     if (newMinutes < 10) {
//       newMinutes = "0" + newMinutes;
//     }

//     timeSibling.innerText = `${newHours}:${newMinutes}`;

//     timeTab.forEach((time) => {
//       if (time.name === timeSibling.dataset.project) {
//         time.time = `${newHours}:${newMinutes}`;
//       }
//     });

//     updateTimeStorage(timeTab);

//     updateDom(timeTab);
//   });
// });

const resetTime = () => {
  timeTab.forEach((time) => {
    time.time = "00:00";
  });

  updateTimeStorage(timeTab);

  updateDom(timeTab);
};

if (sendButton) {
  sendButton.addEventListener("click", (e) => {
    e.preventDefault();

    popupCongrate.classList.add("active");
    setTimeout(() => {
      popupCongrate.classList.remove("active");
    }, 2000);

    //reset time
    resetTime();
    reset();
  });
}
