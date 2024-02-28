// ==UserScript==
// @name         PTYT Adskip
// @namespace    https://pulyustech.github.io/userscripts
// @match        https://*.youtube.com/*
// @grant        none
// @version      1.0
// @author       PulyusTech
// @description  Ads are stupid and should be utterly terminated
// @icon         https://www.google.com/s2/favicons?sz=64&domain=YouTube.com
// @run-at       document-start
// ==/UserScript==
setInterval(() => {
  let v = document.querySelector("video");
  if (v) {
    if (v.currentTime < 0.05 || v.currentTime == v.duration) {
      v.style.display = "none";
    } else {
      v.style.display = "block";
    }
    if (document.querySelector(".ytp-ad-text")) v.currentTime = v.duration;
  }
  for (let adtype of [
    `#masthead-ad`,
    `ytd-rich-item-renderer.style-scope.ytd-rich-grid-row #content:has(.ytd-display-ad-renderer)`,
    `tp-yt-paper-dialog:has(yt-mealbar-promo-renderer)`,
    `ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"]`,
    `#related #player-ads`,
    `#related ytd-ad-slot-renderer`,
    `ytd-ad-slot-renderer`,
    `yt-mealbar-promo-renderer`,
    `ad-slot-renderer`,
    `ytm-companion-ad-renderer`,
  ]) {
    let adRenderers = document.querySelectorAll(adtype);
    for (let ad of adRenderers) {
      ad.style.display = "none";
    }
  }
}, 10);
