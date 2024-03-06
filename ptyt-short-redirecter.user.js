// ==UserScript==
// @name         PTYT Short Redirecter
// @namespace    https://pulyustech.github.io/userscripts
// @match        https://*.youtube.com/*
// @grant        none
// @version      1.0
// @author       PulyusTech
// @description  Makes all youtube shorts play as a normal video.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=YouTube.com
// ==/UserScript==
setInterval(() => {
  if (window.location.href.includes("/shorts/"))
    window.location.href = window.location.href.replace(
      "/shorts/",
      "/watch?v="
    );
}, 100);
