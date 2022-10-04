const submitSettings = document.getElementById("submit-settings");
const settingsForm = document.getElementById("settingsForm");
const hourPerDay = document.getElementById("hour-per-day");
const logoutButton = document.getElementById("logout-button");

submitSettings.addEventListener("click", (e) => {
  let hourPerDayValue = hourPerDay.value;
  // e.preventDefault();
  console.log("Test store settings");
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
      hourPerDay.value = result.hourPerDay;
    });
  }
});

/* *********************************
            BOUTON LOGOUT
  ********************************* */
logoutButton.addEventListener("click", (e) => {
  e.preventDefault();

  chrome.runtime.sendMessage({ message: "logout" }, function (response) {
    if (response === "success") window.location.replace("./login.html");
  });
});
