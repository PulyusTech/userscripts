// ==UserScript==
// @name         PTYT Adskip
// @namespace    https://pulyustech.github.io/userscripts
// @match        https://*.youtube.com/*
// @grant        none
// @version      1.1
// @author       PulyusTech
// @description  It's actually insane how simple this script is.
// @icon         https://www.google.com/s2/favicons?sz=64&domain=YouTube.com
// @run-at       document-start
// ==/UserScript==
document.head.insertAdjacentHTML(
  "beforeend",
  '<style>#masthead-ad, ytd-rich-item-renderer.style-scope.ytd-rich-grid-row #content:has(.ytd-display-ad-renderer), tp-yt-paper-dialog:has(yt-mealbar-promo-renderer), ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"], #related #player-ads, #related ytd-ad-slot-renderer, ytd-ad-slot-renderer, yt-mealbar-promo-renderer, ad-slot-renderer, ytm-companion-ad-renderer, .ytp-ad-player-overlay, .ytp-ad-survey-player-overlay, .ytp-ad-survey-question-player-overlay{display:none;}</style>'
);
setInterval(() => {
  let v = document.querySelector("video");
  if (v)
    try {
      if (v.currentTime < 0.05 || v.currentTime == v.duration) {
        v.style.display = "none";
      } else {
        v.style.display = "block";
      }
      if (document.querySelector(".ytp-ad-text")) v.currentTime = v.duration;
    } catch (e) {
      let skipbtn =
        document.querySelector(".ytp-ad-skip-button") ||
        document.querySelector(".ytp-ad-skip-button-modern");
      if (skipbtn) skipbtn.click();
    }
}, 10);
