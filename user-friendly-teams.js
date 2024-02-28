// ==UserScript==
// @name        User Friendly Teams
// @namespace   https://pulyustech.github.io/userscripts
// @match       https://teams.microsoft.com/*
// @grant       none
// @version     1.0
// @author      PulyusTech
// @description Makes Microsoft Teams less of a pain to use. Click sidebar to enlarge embedded frames (OneNote etc.)
// @icon        https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018–present%29.svg/2203px-Microsoft_Office_Teams_%282018–present%29.svg.png
// ==/UserScript==
setInterval(() => {
  if (document.getElementById("openTeamsClientInBrowser"))
    document.getElementById("openTeamsClientInBrowser").click();
}, 100);
const ifrstyl = [];
let loop = true;
function l() {
  for (let el of document.body.getElementsByTagName("*")) {
    if (el.role == "navigation") {
      loop = false;
      el.parentElement.onclick = () => {
        const ifr = document.querySelector("iframe");
        if (ifr.style.top != "-8px") {
          if (!ifrstyl.length) {
            ifrstyl.push(ifr.style.top);
            ifrstyl.push(ifr.style.left);
            ifrstyl.push(ifr.style.width);
            ifrstyl.push(ifr.style.height);
            ifrstyl.push(ifr.style.zIndex);
          }
          ifr.style.top = "-8px";
          ifr.style.left = "61px";
          ifr.style.width = "96%";
          ifr.style.height = "100%";
          ifr.style.zIndex = "2147483647";
        } else {
          ifr.style.top = ifrstyl[0];
          ifr.style.left = ifrstyl[1];
          ifr.style.width = ifrstyl[2];
          ifr.style.height = ifrstyl[3];
          ifr.style.zIndex = ifrstyl[4];
        }
      };
    }
  }
  if (loop) setTimeout(l, 100);
}
l();
