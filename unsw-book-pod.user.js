// ==UserScript==
// @name        UNSW Auto Book Pod
// @namespace   https://pulyustech.github.io/userscripts
// @match       https://unswlibrary-bookings.libcal.com/reserve/main-pod/*
// @version     1.0
// @author      PulyusTech
// @description Books library pods as soon as available
// @icon        https://my.unsw.edu.au/images-channel/SADP/moodle.png
// ==/UserScript==
(async () => {
  document.querySelectorAll(".fc-timeline-event")[0].click();
  await new Promise((r) => setTimeout(r, 1000));
  document.querySelector(".b-end-date").value = document
    .querySelector(".b-end-date")
    .querySelectorAll("option")[2].value;
  document.getElementById("submit_times").click();
})();
