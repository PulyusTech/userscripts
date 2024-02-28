// ==UserScript==
// @name        UNSW Anti Timeout
// @namespace   https://pulyustech.github.io/userscripts
// @match       https://moodle.telt.unsw.edu.au/*
// @match       https://my.unsw.edu.au/*
// @grant       none
// @version     1.0
// @author      PulyusTech
// @description Make UNSW sites automatically log in when session is expired :)
// @icon        https://my.unsw.edu.au/images-channel/SADP/moodle.png
// ==/UserScript==
if (window.location.href == "https://moodle.telt.unsw.edu.au/login/index.php")
  window.location.href = "https://moodle.telt.unsw.edu.au/auth/oidc";
if (window.location.href.includes("moodle.telt.unsw.edu.au")) {
  if (
    window.location.href == "https://moodle.telt.unsw.edu.au/my/" ||
    window.location.href == "https://moodle.telt.unsw.edu.au/my/courses.php"
  ) {
    try {
      window.opener.location.reload(1);
      window.close();
    } catch (e) {}
  }
  document.body.insertAdjacentHTML(
    "afterbegin",
    "<div class='GF32X2zYzF'></div>"
  );
  setInterval(() => {
    document.querySelector(".GF32X2zYzF").click();
  }, 10000);
  if (window.location.href != "https://moodle.telt.unsw.edu.au/auth/oidc")
    for (let item of document.querySelectorAll(".nav-link")) {
      if (item.innerHTML.includes("Log in")) {
        window.open("https://moodle.telt.unsw.edu.au/auth/oidc");
        break;
      }
    }
}
if (window.location.href.includes("my.unsw.edu.au")) {
  if (window.location.href.includes("popup=true")) {
    try {
      window.opener.location.href =
        window.opener.location.href.split("?ticket=")[0];
    } catch (e) {}
    window.close();
  }
  if (
    document.querySelector("h1").innerHTML == "HTTP Status 401 – Unauthorized"
  ) {
    window.open(
      "https://sso.unsw.edu.au/cas/clientredirect?client_name=azuread&service=https%3A%2F%2Fmy.unsw.edu.au%2Fportal%2Fportal%2Fhome.xml%3Fpopup%3Dtrue"
    );
  }
  if (
    window.location.href.includes("https://sso.unsw.edu.au/cas/login?service=")
  ) {
    window.location.href = window.location.href.replace(
      "login?",
      "clientredirect?client_name=azuread&"
    );
  }
}
