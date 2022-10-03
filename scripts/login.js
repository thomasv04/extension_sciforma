let button = document.getElementById("login-button");
let username = document.getElementById("username");
let password = document.getElementById("password");

document.addEventListener("DOMContentLoaded", async () => {
  chrome.storage.local.get(["userStatus", "user_info"], function (response) {
    if (response.userStatus) {
      window.location.href = "popup.html";
    }
  });
});

button.addEventListener("click", (e) => {
  e.preventDefault();

  const usernameValue = username.value;
  const passwordValue = password.value;

  if (usernameValue && passwordValue) {
    chrome.runtime.sendMessage(
      { message: "login", payload: { usernameValue, passwordValue } },
      function (response) {
        if (response === "success") window.location.replace("./popup.html");
      }
    );
  }
});

is_user_signed_in = async () => {
  chrome.storage.local.get(["userStatus", "user_info"], function (response) {
    if (chrome.runtime.lastError) resolve({ userStatus: false, user_info: {} });
    resolve(
      response.userStatus === undefined
        ? { userStatus: false, user_info: {} }
        : { userStatus: response.userStatus, user_info: response.user_info }
    );
  });
};
