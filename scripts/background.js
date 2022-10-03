chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "login") {
    if (
      request.payload.usernameValue === "admin" &&
      request.payload.passwordValue === "admin"
    ) {
      flip_user_status(true, request.payload);
      sendResponse("success");
    } else {
      flip_user_status(false, request.payload);
      sendResponse("failed");
    }
  } else if (request.message === "logout") {
    flip_user_status(false, null);
    sendResponse("success");
  }
});

function flip_user_status(signIn, user_info) {
  chrome.storage.local.set({ userStatus: signIn, user_info });
}
