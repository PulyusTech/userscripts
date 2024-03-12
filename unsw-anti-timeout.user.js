// ==UserScript==
// @name        UNSW Anti Timeout
// @namespace   https://pulyustech.github.io/userscripts
// @match       https://moodle.telt.unsw.edu.au/*
// @match       https://my.unsw.edu.au/*
// @grant       GM_setValue
// @grant       GM_getValue
// @version     2.1.2
// @author      PulyusTech
// @description Make UNSW sites automatically log in when session is expired :)
// @icon        https://my.unsw.edu.au/images-channel/SADP/moodle.png
// @run-at      document-end
// ==/UserScript==
document.head.insertAdjacentHTML(
  "beforeend",
  "<style id='ptinvis'>body{display:none;}</style>"
);
(async () => {
  if (
    window.location.href == "https://moodle.telt.unsw.edu.au/login/index.php"
  ) {
    window.location.href = "https://moodle.telt.unsw.edu.au/auth/oidc";
  } else if (
    window.location.href.includes("moodle.telt.unsw.edu.au") &&
    window.location.href != "https://moodle.telt.unsw.edu.au/auth/oidc"
  ) {
    setInterval(() => {
      for (let el of document.querySelectorAll("div")) {
        if (
          el.innerHTML == "Session Expiry Alert" ||
          el.innerHTML == "Session Extended" ||
          el.innerHTML == "Session Expired"
        ) {
          el.parentElement.querySelector("button").click();
          break;
        }
      }
    }, 100);
    let m = await GM_getValue("moodle");
    if (!m) {
      for (let item of document.querySelectorAll(".nav-link")) {
        if (item.innerHTML.includes("Log in")) {
          await GM_setValue("moodle", window.location.href);
          window.location.href = "https://moodle.telt.unsw.edu.au/my/";
          break;
        }
      }
      document.getElementById("ptinvis").remove();
    } else {
      await GM_setValue("moodle", "");
      window.location.href = m;
    }
  }
  if (window.location.href.includes("my.unsw.edu.au")) {
    if (
      document.querySelector("h1") &&
      document.querySelector("h1").innerHTML == "HTTP Status 401 – Unauthorized"
    ) {
      window.location.href = `https://sso.unsw.edu.au/cas/clientredirect?client_name=azuread&service=${encodeURIComponent(
        window.location.href.split("?ticket=")[0]
      )}`;
    } else if (
      window.location.href.includes(
        "https://sso.unsw.edu.au/cas/login?service="
      )
    ) {
      window.location.href = window.location.href.replace(
        "login?",
        "clientredirect?client_name=azuread&"
      );
    } else {
      document.getElementById("ptinvis").remove();
    }
  }
})();
