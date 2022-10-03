let logoutButton = document.getElementById("logout-button");

logoutButton.addEventListener("click", (e) => {
  e.preventDefault();

  chrome.runtime.sendMessage({ message: "logout" }, function (response) {
    if (response === "success") window.location.replace("./login.html");
  });
});
