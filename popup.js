if (!chrome.cookies) {
  chrome.cookies = chrome.experimental.cookies;
}

let cookiesSaved;

function onLoad() {
  chrome.cookies.getAll({}, function (cookies) {
    cookiesSaved = cookies;
  });
}
function copyCookies(from, to) {
  const foundCookies = cookiesSaved.filter((cookie) => cookie.domain === from);

  foundCookies.forEach((cookie) => {
    const { hostOnly, session, ...rest } = cookie;
    const newCookie = { ...rest, domain: to, url: `https://${to}` };
    chrome.cookies.set(newCookie);
  });
}

function documentEvents() {
  document.getElementById("submit").addEventListener("click", function () {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;

    if (!from || !to) {
      document.getElementById("error").innerText =
        "From or to must not be empty";
      return;
    }

    copyCookies(from, to);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  onLoad();
  documentEvents();
});
