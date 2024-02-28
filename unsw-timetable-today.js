// ==UserScript==
// @name        UNSW Timetable for today
// @namespace   https://pulyustech.github.io/userscripts
// @match       https://my.unsw.edu.au/active/studentTimetable/timetable.xml*
// @grant       none
// @version     1.0
// @author      PulyusTech
// @description Show the timetable for today
// @icon        https://moodle.telt.unsw.edu.au/pluginfile.php/1/theme_remui/faviconurl/1708606952/unsw_shield.svg
// ==/UserScript==
(async () => {
  let d = new Date();
  let m = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");
  let $ = (q) => document.querySelector(q);
  while (!$(".fc-next-button")) await new Promise((r) => setTimeout(r, 100));
  let b = $("h2").innerHTML.split(" ");
  let i = 0;
  while (`${m[d.getMonth()]}${d.getDate()}` != `${b[0]}${b[1]}`) {
    d.setDate(d.getDate() - 1);
    i++;
  }
  while (i > 6) {
    $(".fc-next-button").click();
    i -= 7;
  }
})();
