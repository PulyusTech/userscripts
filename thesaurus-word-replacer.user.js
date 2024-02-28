// ==UserScript==
// @name        Thesaurus Word Replacer
// @namespace   https://pulyustech.github.io/userscripts
// @match       https://*/*
// @grant       GM_xmlhttpRequest
// @version     1.0
// @author      PulyusTech
// @description Copy word twice to replace it with synonyms from thesaurus.com, copy again for more results.
// @icon        https://www.thesaurus.com/0d297be7e698b98c9da8.png
// ==/UserScript==

const rpl = (t) => {
  if (window.getSelection) {
    let sel = window.getSelection();
    let txt = /^[A-Z]/.test(sel.toString())
      ? t[0].toUpperCase() + t.slice(1)
      : t;
    if (sel.rangeCount) {
      let range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(txt));
    }
  } else if (document.selection && document.selection.createRange) {
    let range = document.selection.createRange();
    range.text = txt;
  }
};
let c = "";
let r = [];
document.oncopy = function () {
  const t = window.getSelection().toString();
  if (!t.includes(" ")) {
    if (r.indexOf(t.toLowerCase()) != -1) {
      rpl(r[(r.indexOf(t.toLowerCase()) + 1) % r.length]);
    } else if (c == t) {
      GM_xmlhttpRequest({
        method: "GET",
        url: `https://www.thesaurus.com/browse/${t.toLowerCase()}`,
        onload: function (response) {
          const txt = response.responseText;
          r = txt.split(":80/browse/");
          r = r.map((a) => a.split('"')[0]).slice(3);
          r = [...new Set(r)];
          rpl(r[0]);
          console.log(`Synonyms for ${t}:`);
          console.log({ r });
        },
      });
    }
  }
  c = t;
};
