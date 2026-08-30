(function () {
  var DEFAULT_DESKTOP_W = 1920;
  var DEFAULT_MOBILE_W = 440;

  /** Desktop от 1024px; tablet + mobile — один layout «mobile» */
  var DESKTOP_MIN_W = 1024;
  var MIN_W = 320;

  function readDim(attr, fallback) {
    var value = parseInt(document.documentElement.getAttribute(attr), 10);
    return value > 0 ? value : fallback;
  }

  function artboardConfig() {
    return {
      desktopW: readDim("data-artboard-w", DEFAULT_DESKTOP_W),
      mobileW: readDim("data-artboard-w-mobile", DEFAULT_MOBILE_W),
    };
  }

  function pickLayout(vw) {
    return vw >= DESKTOP_MIN_W ? "desktop" : "mobile";
  }

  function isMobileReady() {
    return document.querySelector(".page-index, .page-tariffs") !== null;
  }

  function isSupported(vw, layout) {
    if (vw < MIN_W) return false;
    if (layout === "desktop") return true;
    return isMobileReady();
  }

  function apply() {
    var root = document.documentElement;
    var page = document.querySelector(".page");
    var unsupported = document.querySelector(".viewport-unsupported");
    var config = artboardConfig();
    var vw = window.innerWidth;
    var layout = pickLayout(vw);
    var supported = isSupported(vw, layout);
    var designW = layout === "mobile" ? config.mobileW : config.desktopW;

    root.setAttribute("data-layout", layout);
    root.setAttribute("data-viewport", supported ? "ok" : "unsupported");
    root.style.setProperty("--design-w", String(designW));

    if (!supported) {
      if (page) page.hidden = true;
      if (unsupported) unsupported.hidden = false;
      return;
    }

    if (page) page.hidden = false;
    if (unsupported) unsupported.hidden = true;
  }

  function bind() {
    apply();
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
