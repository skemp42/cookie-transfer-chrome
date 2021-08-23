if (!chrome.cookies) {
  chrome.cookies = chrome.experimental.cookies;
}

let cookiesSaved;

function onLoad() {
  chrome.cookies.getAll({}, function (cookies) {
    console.log("Found cookies: ", cookies);

    cookiesSaved = cookies;
  });
}
function copyCookies(from, to) {
  console.log("input value is : " + from.value);

  const foundCookies = cookiesSaved.filter(
    (cookie) => cookie.domain === from.value
  );

  foundCookies.forEach((cookie) => {
    const { hostOnly, session, ...rest } = cookie;
    const newCookie = { ...rest, domain: to.value, url: `https://${to.value}` };
    console.log("Set cookie", newCookie);
    chrome.cookies.set(newCookie);
  });
}

function documentEvents() {
  document.getElementById("submit").addEventListener("click", function () {
    copyCookies(document.getElementById("from"), document.getElementById("to"));
  });
}

document.addEventListener("DOMContentLoaded", function () {
  onLoad();
  documentEvents();
});
