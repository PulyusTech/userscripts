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

//How to use:
//You can now highlight text in Moodle you aren't supposed to, and highlights are now invisible
//Open ChatGPT and type anything in the prompt to initiate
//Press Shift to record highlighed text in Moodle
//Press Enter to ask ChatGPT the recorded text from Moodle
//After ChatGPT responds, the Moodle quiz question multiple choices will be replaced with the answers

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
    let answerNow = await GM_getValue("answerNow");
    if (answerNow == "answering") await GM_setValue("answerNow", "answerDone");
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
    document.onkeydown = async (event) => {
      switch (event.key) {
        case "Shift":
          let t = window.getSelection().toString();
          if (t) {
            let prevQ = await GM_getValue("q");
            await GM_setValue("q", prevQ + "\n\n" + t);
            document.body.contentEditable = false;
          }
          break;
        case "Enter":
          await GM_setValue("answerNow", "answering");
          l();
          break;
      }
    };
    let l = async () => {
      let a = await GM_getValue("a");
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
      setTimeout(l, 1000); //interval to update moodle fake mc answers on creen
    };
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
        let l2 = async () => {
          let res = document.getElementsByClassName("markdown");
          let a = res[res.length - 1].innerHTML.replace(/<p>|<\/p>/g, "\n");
          await GM_setValue("a", a);
          let answerNow2 = await GM_getValue("answerNow");
          if (answerNow2 == "answering") setTimeout(l2, 500); //interval to update moodle fake mc answers
        };
        setTimeout(l2, 1000); //delay before checking response
      } else {
        setTimeout(l, 1000); //interval to check if question is submitted
      }
    };
    l();
  }
})();
