/* =====================================================================
   WRIGHTSITE — shared layout (fresh build)
   Injects the sticky Wright26 header (7 routes), global footer, and
   the deferred Ko-fi floating widget. Light, dependency-free.
   ===================================================================== */
(function () {
  "use strict";

  const ROUTES = [
    { label: "Home", href: "index.html" },
    { label: "Healthcare", href: "healthcare.html" },
    { label: "Systems & AI", href: "systems.html" },
    { label: "Advocacy", href: "advocacy.html" },
    { label: "Writing", href: "writing.html" },
    { label: "CV", href: "cv.html" },
    { label: "Gallery", href: "gallery.html" }
  ];

  function getCurrentFileName() {
    const path = window.location.pathname;
    const segment = path.substring(path.lastIndexOf("/") + 1);
    return segment === "" ? "index.html" : segment.toLowerCase();
  }

  function injectHeader() {
    const currentFile = getCurrentFileName();

    const navItems = ROUTES.map(function (route) {
      const isActive = currentFile === route.href.toLowerCase();
      const activeAttr = isActive ? ' class="active" aria-current="page"' : "";
      return '<li><a href="' + route.href + '"' + activeAttr + '>' + route.label + "</a></li>";
    }).join("");

    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML =
      '<nav class="nav-container" aria-label="Primary Navigation">' +
        '<a href="index.html" class="brand-link">' +
          "<span>Chavon Wright</span>" +
          '<span class="brand-divider" aria-hidden="true"></span>' +
          "<span>Wright26</span>" +
        "</a>" +
        '<ul class="nav-menu">' + navItems + "</ul>" +
      "</nav>";

    document.body.insertBefore(header, document.body.firstChild);
  }

  function injectFooter() {
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="footer-inner">' +
        "<div><strong>&copy; 2026 Chavon Wright</strong> &middot; Ocala, FL</div>" +
        '<div class="footer-links">' +
          '<a href="https://fundamentalhumanwrights.org" target="_blank" rel="noopener noreferrer">fundamentalhumanwrights.org</a>' +
          '<a href="mailto:cwrightconsult@gmail.com">cwrightconsult@gmail.com</a>' +
          '<a href="mailto:fundamentalhumanwrights@gmail.com">fundamentalhumanwrights@gmail.com</a>' +
          '<a href="https://ko-fi.com/chavonwright" target="_blank" rel="noopener noreferrer">ko-fi.com/chavonwright</a>' +
          '<a href="ops.html" class="ops-link">ops</a>' +
        "</div>" +
      "</div>";

    document.body.appendChild(footer);
  }

  function injectKofiWidget() {
    const script = document.createElement("script");
    script.src = "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";
    script.defer = true;
    script.onload = function () {
      if (window.kofiWidgetOverlay && typeof window.kofiWidgetOverlay.draw === "function") {
        window.kofiWidgetOverlay.draw("chavonwright", {
          type: "floating-chat",
          "floating-chat.donateButton.text": "Support",
          "floating-chat.donateButton.background-color": "#F7E5E0",
          "floating-chat.donateButton.text-color": "#101010"
        });
      }
    };
    document.body.appendChild(script);
  }

  function initLayout() {
    injectHeader();
    injectFooter();
    injectKofiWidget();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLayout);
  } else {
    initLayout();
  }
})();
