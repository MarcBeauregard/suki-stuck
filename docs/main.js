/**
 * Suki Stuck ($SUKISTUCK) — launch-ready
 * CA = TBA until mint. Copy enabled → copies TBA + toast.
 * No Connect Wallet. No fake metrics. No invented CA.
 */
(function () {
  "use strict";

  var CA_VALUE = "TBA";
  var TOAST_MSG = "CA TBA — post mint";
  var caValue = document.getElementById("ca-value");
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");
  var toast = document.getElementById("toast");
  var toastTimer = null;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (caValue) {
    caValue.textContent = CA_VALUE;
  }

  function showToast(msg) {
    if (!toast) return;
    toast.hidden = false;
    toast.textContent = msg;
    requestAnimationFrame(function () {
      toast.classList.add("is-visible");
    });
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
      setTimeout(function () {
        toast.hidden = true;
      }, 300);
    }, 2200);
  }

  function copyCa(e) {
    if (e) e.preventDefault();
    var done = function () {
      showToast(TOAST_MSG);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(CA_VALUE).then(done).catch(function () {
        fallbackCopy(CA_VALUE);
        done();
      });
    } else {
      fallbackCopy(CA_VALUE);
      done();
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      /* ignore */
    }
    document.body.removeChild(ta);
  }

  document.querySelectorAll("[data-copy-ca]").forEach(function (btn) {
    btn.addEventListener("click", copyCa);
  });

  document.querySelectorAll(".socials__link--tba").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      showToast("Socials TBA — coming soon");
    });
  });

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    siteNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    var els = document.querySelectorAll(
      ".section, .hero__frame, .species-card, .buy-step, .token__panel"
    );
    els.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(14px)";
      el.style.transition =
        "opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)";
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "none";
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  if (typeof console !== "undefined" && console.info) {
    console.info(
      "[SUKISTUCK] Launch-ready · CA TBA · assets ?v=4 · no mint yet. Habitat = brand."
    );
  }
})();
