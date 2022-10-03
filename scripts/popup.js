let logoutButton = document.getElementById("logout-button");
let timeProject = document.querySelectorAll(".projets .time");
let totalTime = document.querySelector("#total .time");
let addTime = document.querySelectorAll(".add");
let timeTab = [];

const time = "08:00";

console.log(timeProject);

logoutButton.addEventListener("click", (e) => {
  e.preventDefault();

  chrome.runtime.sendMessage({ message: "logout" }, function (response) {
    if (response === "success") window.location.replace("./login.html");
  });
});

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
          time: "05:00",
        });
      });
    }
  });

  updateDom(timeTab);
});

const convertTime = (time) => {
  const [hours, minutes] = time.split(":");
  return { hours, minutes };
};

const updateDom = (timeTab) => {
  chrome.storage.local.get(["timeProject"], function (response) {
    if (response.timeProject !== undefined) {
      timeTab = response.timeProject;
    }

    timeProject.forEach((project) => {
      timeTab.forEach((time) => {
        if (project.dataset.project === time.name) {
          console.log(time.time);
          project.innerText = time.time;
        }
      });
    });

    totalTime.innerText = timeTab
      .reduce((acc, time) => {
        const { hours, minutes } = convertTime(time.time);
        return acc + parseInt(hours) + parseInt(minutes) / 60;
      }, 0)
      .toFixed(2);
  });
};

addTime.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const timeSibling = e.target.parentElement.previousElementSibling;

    const { hours, minutes } = convertTime(timeSibling.innerText);

    let newHours = parseInt(hours) + parseInt(convertTime(time).hours);
    let newMinutes = parseInt(minutes) + parseInt(convertTime(time).minutes);

    if (newHours < 10) {
      newHours = "0" + newHours;
    }

    if (newMinutes < 10) {
      newMinutes = "0" + newMinutes;
    }

    timeSibling.innerText = `${newHours}:${newMinutes}`;

    timeTab.forEach((time) => {
      if (time.name === timeSibling.dataset.project) {
        time.time = `${newHours}:${newMinutes}`;
      }
    });

    updateDom(timeTab);
  });
});
