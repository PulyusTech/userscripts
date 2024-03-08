// ==UserScript==
// @name        UNSW Auto Book Pod
// @namespace   https://pulyustech.github.io/userscripts
// @match       https://unswlibrary-bookings.libcal.com/reserve/main-pod/*
// @match       https://unswlibrary-bookings.libcal.com/spaces/*
// @version     1.0
// @author      PulyusTech
// @description Books library pods as soon as available
// @icon        https://my.unsw.edu.au/images-channel/SADP/moodle.png
// ==/UserScript==

//todo: auto refresh, auto go to date
const bookSlots = [0, 2, 4, 6];
(async () => {
  if (window.location.href.includes("/reserve/")) {
    for (let i = 0; i < 4; i++) {
      document.querySelectorAll(".fc-timeline-event")[bookSlots[i]].click();
      let html = document.getElementById("s-lc-eq-bwell").innerHTML;
      while (html == document.getElementById("s-lc-eq-bwell").innerHTML)
        await new Promise((r) => setTimeout(r, 100));
    }
    document.getElementById("submit_times").click();
  } else {
    document.getElementById("terms_accept").click();
    await new Promise((r) => setTimeout(r, 100));
    document.getElementById("btn-form-submit").click();
  }
})();
