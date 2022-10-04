let darkModeToggle = document.getElementById("dark-mode-toggle");
let body = document.body;

document.addEventListener("DOMContentLoaded", async () => {
  chrome.storage.local.get(["darkMode"], function (response) {
    if (response.darkMode === undefined) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        if (darkModeToggle) darkModeToggle.checked = true;
        chrome.storage.local.set({ darkMode });
      }
    }

    if (darkModeToggle) darkModeToggle.checked = true;

    if (response.darkMode) body.classList.add("dark-mode");
  });
});

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
