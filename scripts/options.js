const settingsForm = document.getElementById("settingsForm");
const hourPerDay = document.getElementById("hour-per-day");
const logoutButton = document.getElementById("logout-button");
darkModeToggle = document.getElementById("dark-mode-toggle");
const themeColor = document.getElementById("theme-color");
body = document.body;

/* 
 HEURE PAR JOUR
*/

hourPerDay.addEventListener("change", (e) => {
  let hourPerDayValue = hourPerDay.value;
  // e.preventDefault();
  storeSettings(hourPerDayValue);
});

function storeSettings(hourPerDayValue) {
  chrome.storage.local.set({ hourPerDay: hourPerDayValue }, function () {
    // console.log("Value is set to " + hourPerDayValue)
  });
}

window.addEventListener("load", (event) => {
  if (chrome.storage.local.get(["hourPerDay"])) {
    chrome.storage.local.get(["hourPerDay"], function (result) {
      if (result.hourPerDay !== undefined) {
        hourPerDay.value = result.hourPerDay;
      } else {
        hourPerDay.value = 7;

        //target hourPerDay change
        hourPerDay.dispatchEvent(new Event("change"));
      }

      console.log(result);
    });
  }

  //theme color
  if (chrome.storage.local.get(["themeColor"])) {
    chrome.storage.local.get(["themeColor"], function (result) {
      if (result.themeColor !== undefined) themeColor.value = result.themeColor;
    });
  }
});

/* *********************************
            BOUTON LOGOUT
  ********************************* */
if (logoutButton) {
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();

    chrome.runtime.sendMessage({ message: "logout" }, function (response) {
      if (response === "success") window.location.replace("./login.html");
    });
  });
}

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", (e) => {
    const darkMode = darkModeToggle.checked;

    if (darkModeToggle.checked) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }

    chrome.storage.local.set({ darkMode });
  });
}

if (themeColor) {
  themeColor.addEventListener("change", (e) => {
    const themeColorValue = themeColor.value;

    chrome.storage.local.set({ themeColor: themeColorValue });
  });
}
