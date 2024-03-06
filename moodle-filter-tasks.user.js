// ==UserScript==
// @name        UNSW Moodle Filter Tasks
// @namespace   https://pulyustech.github.io/userscripts
// @match       https://moodle.telt.unsw.edu.au/*
// @version     1.0.1
// @author      PulyusTech
// @description Filters the sidebar to only show tasks.
// @icon        https://my.unsw.edu.au/images-channel/SADP/moodle.png
// @run-at      document-end
// ==/UserScript==
(() => {
  for (let el of document.querySelectorAll(".drawerheader")) {
    el.insertAdjacentHTML(
      "beforeend",
      "<button class='tglFilter'>Filter: OFF</button>"
    );
  }
  for (let el of document.querySelectorAll(".tglFilter")) {
    el.onclick = () => {
      if (el.innerHTML == "Filter: ON") {
        el.innerHTML = "Filter: OFF";
        for (let item of document
          .getElementById("theme_remui-drawers-courseindex")
          .querySelectorAll("li")) {
          if (item.querySelectorAll("i").length == 2)
            item.setAttribute("style", "display:flex !important");
        }
      } else {
        el.innerHTML = "Filter: ON";
        for (let item of document
          .getElementById("theme_remui-drawers-courseindex")
          .querySelectorAll("li")) {
          if (item.querySelectorAll("i").length == 2)
            item.setAttribute("style", "display:none !important");
        }
      }
    };
  }
})();
