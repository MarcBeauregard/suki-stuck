/**
 * Suki Stuck ($SUKISTUCK) — DRAFT / NO LAUNCH
 * CA TBA · no mint · copy disabled
 */
(function () {
  "use strict";

  var copyBtn = document.getElementById("copy-ca");
  var copyHero = document.getElementById("copy-ca-hero");
  var caValue = document.getElementById("ca-value");
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function flashTBA(btn) {
    if (!btn) return;
    var prev = btn.innerHTML;
    btn.textContent = "TBA — no CA";
    setTimeout(function () {
      btn.innerHTML = prev;
    }, 1600);
  }

  function lockCopy(btn) {
    if (!btn) return;
    btn.disabled = true;
    btn.setAttribute("aria-disabled", "true");
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      flashTBA(btn);
    });
  }

  lockCopy(copyBtn);
  lockCopy(copyHero);

  if (caValue) {
    caValue.textContent = "TBA — DRAFT / NO LAUNCH";
  }

  document.querySelectorAll(".hero__cta .btn").forEach(function (btn) {
    btn.disabled = true;
    btn.setAttribute("aria-disabled", "true");
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
    var els = document.querySelectorAll(".section");
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
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  if (typeof console !== "undefined" && console.info) {
    console.info("[SUKISTUCK] DRAFT / NO LAUNCH — CA TBA. Hole = brand. Not VCFD.");
  }
})();
