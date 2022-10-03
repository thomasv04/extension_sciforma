let darkModeToggle = document.getElementById("dark-mode-toggle");

document.addEventListener("DOMContentLoaded", async () => {
  chrome.storage.local.get(["darkMode"], function (response) {
    console.log(response.darkMode);

    if (response.darkMode === undefined) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        darkModeToggle.checked = true;
        chrome.storage.local.set({ darkMode });
      }
    }

    if (response.darkMode) {
      darkModeToggle.checked = true;
    }
  });
});

darkModeToggle.addEventListener("click", (e) => {
  const darkMode = darkModeToggle.checked;

  chrome.storage.local.set({ darkMode });
});
