let button = document.getElementById("login-button");
let username = document.getElementById("username");
let password = document.getElementById("password");

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
