// ==UserScript==
// @name        AI Soullink
// @namespace   AI Soullink
// @match       https://moodle.telt.unsw.edu.au/*
// @match       https://chatgpt.com/*
// @grant       GM_setValue
// @grant       GM_getValue
// @version     1.0
// @author      PulyusTech
// @description Remotely send requests to AI from another tab
// ==/UserScript==
document.getElementByAttVal = function (attribute, value) {
  for (let el of document.getElementsByTagName("*")) {
    if (el.hasAttribute(attribute)) {
      if (el.getAttribute(attribute) === value) return el;
    }
  }
  return null;
};
(async () => {
  if (window.location.href.includes("moodle")) {
    document.head.insertAdjacentHTML(
      "beforeend",
      `<style>
       ::selection {
         background-color: #ffffff00;
         color: black;
       }
       </style>`
    );
    document.body.contentEditable = true;
    document.body.spellcheck = false;
    document.body.oncopy = async () => {
      let t = window.getSelection().toString();
      if (t) {
        let prevQ = await GM_getValue("q");
        await GM_setValue("q", prevQ + "\n\n" + t);
        document.body.contentEditable = false;
      }
    };
    document.onkeydown = async (event) => {
      if (event.key == "Enter") await GM_setValue("answerNow", "answering");
    };
    let l = async () => {
      let answerNow = await GM_getValue("answerNow");
      if (answerNow == "answerDone") {
        let a = await GM_getValue("a");
        console.log(a);
        let options = "";
        for (let el of a.split("\n")) {
          if (el != "") {
            options += `
            <div class="option">
              <input type="radio" /><label>${el}</label>
            </div>
            `;
          }
        }
        document.querySelector(".answer").innerHTML = options;
      } else {
        setTimeout(l, 1000);
      }
    };
    l();
  } else if (window.location.href.includes("chatgpt")) {
    await GM_setValue("q", "");
    await GM_setValue("a", "");
    await GM_setValue("answerNow", "notAnswered");
    let l = async () => {
      let answerNow = await GM_getValue("answerNow");
      if (answerNow == "answering") {
        let q = await GM_getValue("q");
        document.getElementById("prompt-textarea").value = q;
        document
          .getElementByAttVal("data-testid", "fruitjuice-send-button")
          .click();
        let prevA = "AMOGUS";
        let l2 = async () => {
          let res = document.getElementsByClassName("markdown");
          let a = res[res.length - 1].innerHTML.replace(/<p>|<\/p>/g, "\n");
          if (a != prevA) {
            prevA = a;
            setTimeout(l2, 1000);
          } else {
            await GM_setValue("a", a);
            await GM_setValue("answerNow", "answerDone");
          }
        };
        setTimeout(l2, 5000);
      } else {
        setTimeout(l, 1000);
      }
    };
    l();
  }
})();
