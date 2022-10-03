chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  if (request.message === "login") {
    if (
      request.payload.usernameValue === "admin" &&
      request.payload.passwordValue === "admin"
    ) {
      sendResponse("success");
    } else {
      sendResponse("failure");
    }
  }
});
