/* SenPrints Seller Connector — docs site behaviour.
 * Three features, no dependencies: theme switch, in-page contents, search.
 * The anti-flash half of the theme logic runs inline in <head>; this file only
 * wires up the switch itself. */

(function () {
  "use strict";

  /* ---------- theme: light / dark / system ---------- */

  var KEY = "sp-theme";

  function apply(choice) {
    if (choice === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", choice);
    }
    document.querySelectorAll("[data-set-theme]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.setTheme === choice));
    });
  }

  function current() {
    try {
      return localStorage.getItem(KEY) || "system";
    } catch (e) {
      return "system";
    }
  }

  document.querySelectorAll("[data-set-theme]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var choice = btn.dataset.setTheme;
      try {
        if (choice === "system") localStorage.removeItem(KEY);
        else localStorage.setItem(KEY, choice);
      } catch (e) {
        /* private mode: the choice simply does not persist */
      }
      apply(choice);
    });
  });

  apply(current());

  /* ---------- in-page contents ---------- */

  var toc = document.querySelector(".toc-list");

  if (toc) {
    var heads = Array.prototype.slice.call(
      document.querySelectorAll(".content h2[id], .content h3[id]")
    );

    if (heads.length < 2) {
      var panel = document.querySelector(".toc");
      if (panel) panel.hidden = true;
    } else {
      heads.forEach(function (h) {
        var li = document.createElement("li");
        if (h.tagName === "H3") li.className = "sub";
        var a = document.createElement("a");
        a.href = "#" + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        toc.appendChild(li);
      });

      var links = {};
      toc.querySelectorAll("a").forEach(function (a) {
        links[a.getAttribute("href").slice(1)] = a;
      });

      // Highlight the heading nearest the top of the viewport rather than the
      // last one to intersect — with short sections several are visible at once.
      var spy = new IntersectionObserver(
        function () {
          var best = null;
          var bestTop = Infinity;
          heads.forEach(function (h) {
            var top = h.getBoundingClientRect().top;
            if (top < 140 && Math.abs(top) < Math.abs(bestTop)) {
              bestTop = top;
              best = h;
            }
          });
          Object.keys(links).forEach(function (id) {
            links[id].removeAttribute("data-active");
          });
          if (best && links[best.id]) links[best.id].setAttribute("data-active", "true");
        },
        { rootMargin: "-100px 0px -70% 0px", threshold: [0, 1] }
      );

      heads.forEach(function (h) {
        spy.observe(h);
      });
    }
  }

  /* ---------- search ---------- */

  var box = document.getElementById("q");
  var out = document.getElementById("results");

  if (box && out) {
    var index = null;
    var loading = false;

    function load() {
      if (index || loading) return;
      loading = true;
      fetch("/search-index.json")
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          index = data;
          if (box.value.trim()) run(box.value);
        })
        .catch(function () {
          loading = false;
        });
    }

    function esc(s) {
      return s.replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
      });
    }

    function snippet(text, term) {
      var at = text.toLowerCase().indexOf(term);
      if (at < 0) return esc(text.slice(0, 110)) + "…";
      var from = Math.max(0, at - 40);
      var slice = text.slice(from, from + 150);
      return (
        (from ? "…" : "") +
        esc(slice).replace(
          new RegExp("(" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"),
          "<mark>$1</mark>"
        ) +
        "…"
      );
    }

    function run(raw) {
      var term = raw.trim().toLowerCase();
      if (!term) {
        out.setAttribute("data-open", "false");
        out.innerHTML = "";
        return;
      }
      if (!index) {
        load();
        return;
      }

      var hits = [];
      index.forEach(function (entry) {
        var inTitle = entry.title.toLowerCase().indexOf(term) >= 0;
        var inBody = entry.text.toLowerCase().indexOf(term) >= 0;
        if (inTitle || inBody) hits.push({ e: entry, score: inTitle ? 0 : 1 });
      });

      hits.sort(function (a, b) {
        return a.score - b.score;
      });
      hits = hits.slice(0, 8);

      if (!hits.length) {
        out.innerHTML = '<p class="r-empty">No match for &ldquo;' + esc(raw.trim()) + "&rdquo;</p>";
      } else {
        out.innerHTML = hits
          .map(function (h) {
            return (
              '<a href="' +
              h.e.url +
              '"><span class="r-page">' +
              esc(h.e.page) +
              '</span><span class="r-title">' +
              esc(h.e.title) +
              '</span><span class="r-snip">' +
              snippet(h.e.text, term) +
              "</span></a>"
            );
          })
          .join("");
      }
      out.setAttribute("data-open", "true");
    }

    var timer;
    box.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        run(box.value);
      }, 120);
    });

    box.addEventListener("focus", load);

    box.addEventListener("keydown", function (e) {
      var items = Array.prototype.slice.call(out.querySelectorAll("a"));
      var at = items.findIndex(function (a) {
        return a.dataset.active === "true";
      });

      if (e.key === "Escape") {
        box.value = "";
        run("");
        box.blur();
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        if (!items.length) return;
        e.preventDefault();
        if (at >= 0) items[at].removeAttribute("data-active");
        var next = e.key === "ArrowDown" ? (at + 1) % items.length : (at <= 0 ? items.length : at) - 1;
        items[next].setAttribute("data-active", "true");
        items[next].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter" && at >= 0) {
        e.preventDefault();
        window.location.href = items[at].href;
      }
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".search")) out.setAttribute("data-open", "false");
    });

    // "/" focuses search, the convention on every docs site
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        e.preventDefault();
        box.focus();
      }
    });
  }
})();
