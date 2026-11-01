/* Hive library — call-number block at the bottom of every page in this repo,
   plus page tools (call number, jump menu, copy link, share) and a Top button.
   Add a page to HIVE_LIBRARY_PAGES and every page's list and next/previous update. */
var HIVE_LIBRARY_PAGES = [
  { callNumber: "HL 000.00", slug: "index", name: "The Hive library (master index)" },
  { callNumber: "HL 000.01", slug: "tips", name: "Tips and comments we checked" },
  { callNumber: "HL 000.02", slug: "tip", name: "Send a tip (opens the tip form)" }
];
/* Shelves in other repos that already have call numbers. A call number typed
   here opens that repo's shelf with the search filled in. */
/* Shelves with call numbers come from the one shared list, hive-shelves.js.
   Add a repo there and every Hive page's call-number search knows it. */
var HIVE_CALL_SHELVES = { HL: { name: "Hive library", url: "index.html" } };
(window.HIVE_SHELVES || []).forEach(function (s) {
  if (s.prefix !== "HL") HIVE_CALL_SHELVES[s.prefix] = { name: s.name, url: s.url };
});
(function () {
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var list = HIVE_LIBRARY_PAGES.slice();
  var file = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "") || "index";
  var i = list.findIndex(function (p) { return p.slug === file; });
  if (i < 0) i = 0;
  var me = list[i], prev = i > 0 ? list[i - 1] : null, next = i < list.length - 1 ? list[i + 1] : null;

  /* Where a typed call number goes */
  window.hiveCallLookup = function (q) {
    var m = String(q || "").trim().toUpperCase().match(/^([A-Z]{1,5})\s*(\d{3}(?:\.\d{1,2})?)$/);
    if (!m) return null;
    var cn = m[1] + " " + m[2], shelf = HIVE_CALL_SHELVES[m[1]];
    if (!shelf) return { cn: cn, html: "Call number <b>" + esc(cn) + "</b>: that shelf doesn't have call numbers yet. Try a name or topic instead." };
    if (m[1] === "HL") {
      var hit = list.filter(function (p) { return p.callNumber === cn || p.callNumber.indexOf(cn) === 0; })[0];
      return { cn: cn, url: hit ? hit.slug + ".html" : "index.html", html: hit ? 'Call number <b>' + esc(hit.callNumber) + '</b>: <a href="' + hit.slug + '.html">' + esc(hit.name) + ' →</a>' : "No Hive library page has call number <b>" + esc(cn) + "</b>." };
    }
    var url = shelf.url + "?q=" + encodeURIComponent(cn);
    return { cn: cn, url: url, html: 'Call number <b>' + esc(cn) + '</b> is on the <a href="' + url + '">' + esc(shelf.name) + ' shelf →</a>' };
  };

  var box = document.getElementById("hive-shelf");
  if (box) {
    var link = function (p, dir) {
      if (!p) return '<span class="hl-nav-btn hl-off">' + (dir === "prev" ? "← Start of shelf" : "End of shelf →") + "</span>";
      return '<a class="hl-nav-btn" href="' + p.slug + '.html">' + (dir === "prev" ? "← " : "") + "<b>" + p.callNumber + "</b> " + esc(p.name) + (dir === "next" ? " →" : "") + "</a>";
    };
    var rows = '<li class="hl-shelf-head">HL 000 · Hive library</li>' + list.map(function (p) {
      return "<li" + (p === me ? ' class="hl-here"' : "") + '><a href="' + p.slug + '.html"><span class="hl-cn">' + p.callNumber + "</span> " + esc(p.name) + (p === me ? " <em>(you are here)</em>" : "") + "</a></li>";
    }).join("");
    var shelves = Object.keys(HIVE_CALL_SHELVES).map(function (k) { return "<b>" + k + "</b> = " + esc(HIVE_CALL_SHELVES[k].name); }).join(" · ");
    box.innerHTML =
      '<div class="hl-cn-big">Call number <b>' + me.callNumber + "</b> · Shelf HL 000 · Hive library</div>" +
      '<div class="hl-nav">' + link(prev, "prev") + link(next, "next") + "</div>" +
      '<details class="hl-list"><summary>See every page on this shelf, by call number</summary><ol>' + rows + "</ol></details>" +
      '<form class="hl-find" id="hl-find" role="search"><label for="hl-q">Look up a call number, name or topic</label>' +
      '<div><input id="hl-q" name="q" type="search" placeholder="e.g. HL 000.01, UP 200.02 or Schultz"><button type="submit">Search</button></div></form>' +
      '<div class="hl-search" id="hl-find-out">Call numbers so far: ' + shelves + '. Other repos are getting theirs one at a time. Names and topics search the <a href="index.html">Hive library</a>.</div>';
    document.getElementById("hl-find").addEventListener("submit", function (e) {
      e.preventDefault();
      var v = document.getElementById("hl-q").value, hit = window.hiveCallLookup(v);
      if (hit && hit.url) { location.href = hit.url; return; }
      if (hit) { document.getElementById("hl-find-out").innerHTML = hit.html; return; }
      location.href = "index.html?q=" + encodeURIComponent(v);
    });
  }

  /* Page tools under the Where/Who box */
  var ww = document.querySelector(".hl-ww");
  if (ww) {
    var heads = [].slice.call(document.querySelectorAll("h2")).filter(function (h) {
      return !h.closest("footer") && !h.closest(".hb-foot") && !h.closest(".hl-ww") && h.textContent.trim();
    });
    var used = {};
    var jl = heads.map(function (h) {
      if (!h.id) {
        var id = "s-" + h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
        while (used[id] || document.getElementById(id)) id += "-x";
        h.id = id;
      }
      used[h.id] = 1;
      return '<li><a href="#' + h.id + '">' + esc(h.textContent.trim()) + "</a></li>";
    }).join("");
    var url = location.href.split("#")[0].split("?")[0];
    var tools = document.createElement("div");
    tools.className = "hl-tools";
    tools.innerHTML =
      '<a class="hl-tool hl-cnchip" href="#hive-shelf" title="Jump to the call number and search">Call number <b>' + me.callNumber + "</b> ↓</a>" +
      (jl ? '<details class="hl-jump"><summary>Jump to a section</summary><ol>' + jl + "</ol></details>" : "") +
      '<button type="button" class="hl-tool" id="hl-copy">Copy link</button>' +
      '<a class="hl-tool" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '">Share on Facebook</a>';
    ww.parentNode.insertBefore(tools, ww.nextSibling);
    var cb = document.getElementById("hl-copy");
    cb.addEventListener("click", function () {
      var done = function () { cb.textContent = "Link copied ✓"; setTimeout(function () { cb.textContent = "Copy link"; }, 2500); };
      try { navigator.clipboard.writeText(url).then(done, function () { window.prompt("Copy this link:", url); }); }
      catch (e) { window.prompt("Copy this link:", url); }
    });
    tools.querySelectorAll(".hl-jump a").forEach(function (a) { a.addEventListener("click", function () { tools.querySelector(".hl-jump").open = false; }); });
  }
  var top = document.createElement("a");
  top.href = "#"; top.className = "hl-totop"; top.textContent = "↑ Top"; top.setAttribute("aria-label", "Back to top of page");
  top.addEventListener("click", function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  document.body.appendChild(top);
  var showTop = function () { top.style.display = window.scrollY > 900 ? "block" : "none"; };
  window.addEventListener("scroll", showTop, { passive: true }); showTop();

  var st = document.createElement("style");
  st.textContent =
    ".hl-shelfwrap{background:#2a2013;color:#e8dbb5;padding:26px 20px 30px;font-family:'Inter',Arial,sans-serif;font-size:16px;line-height:1.5}" +
    ".hl-shelfwrap .in{max-width:900px;margin:0 auto}" +
    "#hive-shelf{border:2px dashed #c9a96a;border-radius:10px;padding:16px 18px;text-align:left}" +
    ".hl-cn-big{font:600 17px 'IBM Plex Mono',monospace;margin-bottom:12px;color:#efe6cc}.hl-cn-big b{color:#d4af37}" +
    ".hl-nav{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:12px}" +
    ".hl-nav-btn{flex:1;min-width:220px;background:#17130c;border:1px solid #77571f;border-radius:8px;padding:12px 14px;color:#fff;text-decoration:none;font-size:16px}.hl-nav-btn b{color:#d4af37;font-family:'IBM Plex Mono',monospace}.hl-off{opacity:.5}" +
    ".hl-list summary{cursor:pointer;font-weight:700;color:#efe6cc;padding:6px 0}.hl-list ol{list-style:none;margin:6px 0 0;padding:0}.hl-list li{padding:6px 0;border-bottom:1px solid #4a3a20}.hl-list a{color:#efe6cc;text-decoration:none}.hl-here a{color:#fff;font-weight:700}" +
    ".hl-shelf-head{color:#d4af37;font:600 13px 'IBM Plex Mono',monospace;letter-spacing:.1em}.hl-cn{font-family:'IBM Plex Mono',monospace;color:#d4af37;margin-right:6px}" +
    ".hl-find{margin:14px 0 4px}.hl-find label{display:block;font-weight:700;margin-bottom:6px;color:#efe6cc}.hl-find div{display:flex;gap:8px;flex-wrap:wrap}.hl-find input{flex:1;min-width:0;width:100%;padding:12px 14px;font-size:17px;border:2px solid #77571f;border-radius:6px}.hl-find button{padding:12px 18px;font-size:16px;font-weight:700;background:#d4af37;color:#17130c;border:0;border-radius:6px;cursor:pointer}" +
    ".hl-search{font-size:15px;margin-top:12px;color:#d9ccaa}.hl-search a,.hl-search b{color:#d4af37}" +
    ".hl-tools{max-width:900px;margin:12px auto 4px;padding:0 20px;display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start}" +
    ".hl-tool{display:inline-block;font:600 15px 'Inter',Arial,sans-serif;color:#17130c;background:#faf7ef;border:1px solid #ddd6c4;border-radius:6px;padding:9px 13px;text-decoration:none;cursor:pointer;line-height:1.2}" +
    ".hl-tool:hover{border-color:#17130c}.hl-cnchip b{color:#9c7620;font-family:'IBM Plex Mono',monospace}" +
    ".hl-jump{flex-basis:100%;order:5;border:1px solid #ddd6c4;border-radius:6px;background:#fff}.hl-jump summary{cursor:pointer;padding:9px 13px;font:600 15px 'Inter',Arial,sans-serif;color:#17130c}" +
    ".hl-jump ol{margin:0;padding:4px 16px 12px 36px}.hl-jump li{margin:6px 0;font-size:16.5px}.hl-jump a{color:#3a5f7d}" +
    ".hl-totop{display:none;position:fixed;right:16px;bottom:16px;z-index:50;background:#17130c;color:#fff;border:2px solid #d4af37;border-radius:24px;padding:10px 16px;font:700 15px Arial,sans-serif;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,.25)}" +
    "@media print{.hl-tools,.hl-totop{display:none}}";
  document.head.appendChild(st);
})();
