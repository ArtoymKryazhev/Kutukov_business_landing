(function () {
  var AXIS_LOCK = 10;
  var TRANSITION_MS = 350;

  function designScale() {
    var rootStyle = getComputedStyle(document.documentElement);
    var scaleW = parseFloat(rootStyle.getPropertyValue("--design-scale-w"));
    if (scaleW > 0) return scaleW;
    var value = parseFloat(rootStyle.getPropertyValue("--design-scale"));
    return value > 0 ? value : 1;
  }

  function isMobileLayout() {
    return document.documentElement.getAttribute("data-layout") === "mobile";
  }

  function initPricingCarousel(root) {
    var track = root.querySelector(".pricing-carousel__track");
    if (!track) return null;

    var items = track.querySelectorAll(".carousel__item");
    if (!items.length) return null;

    var indicatorsSelector = root.getAttribute("data-carousel-indicators");
    var indicatorsRoot = indicatorsSelector
      ? document.querySelector(indicatorsSelector)
      : null;
    var dots = indicatorsRoot
      ? Array.prototype.slice.call(indicatorsRoot.children)
      : [];

    var activeIndex = 0;
    var dragOffset = 0;
    var isDragging = false;
    var startX = 0;
    var startY = 0;
    var enabled = false;

    function cardWidth() {
      return items[0].offsetWidth;
    }

    function gap() {
      return parseFloat(getComputedStyle(track).gap) || 0;
    }

    function leadInset() {
      return parseFloat(getComputedStyle(track).paddingLeft) || 0;
    }

    function clampIndex(index) {
      return Math.max(0, Math.min(items.length - 1, index));
    }

    function cardLeftInTrack(index) {
      return leadInset() + index * (cardWidth() + gap());
    }

    function targetOffsetForIndex(index) {
      var cardLeft = cardLeftInTrack(index);
      var viewportW = root.clientWidth;
      var isLast = index === items.length - 1;

      if (isLast) {
        return cardLeft - (viewportW - cardWidth()) / 2;
      }

      return cardLeft - leadInset();
    }

    function maxOffset() {
      return targetOffsetForIndex(items.length - 1);
    }

    function applyTransform(offsetPx, animate) {
      if (animate) {
        track.style.transition = "transform " + TRANSITION_MS + "ms ease";
      } else {
        track.style.transition = "none";
      }

      track.style.transform = "translate3d(-" + offsetPx + "px, 0, 0)";

      if (!animate) {
        track.offsetHeight;
        track.style.transition = "";
      }
    }

    function syncIndicators(index) {
      if (!dots.length) return;
      var active = clampIndex(index);

      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === active);
      });
    }

    function goTo(index, animate) {
      activeIndex = clampIndex(index);
      dragOffset = 0;
      applyTransform(targetOffsetForIndex(activeIndex), animate !== false);
      syncIndicators(activeIndex);
    }

    function applyDragOffset() {
      var base = targetOffsetForIndex(activeIndex);
      var offset = base - dragOffset;
      offset = Math.max(0, Math.min(offset, maxOffset()));
      applyTransform(offset, false);
    }

    function finishDrag() {
      if (!isDragging) return;

      isDragging = false;
      var step = cardWidth() + gap();
      var threshold = step / 3;

      if (dragOffset > threshold && activeIndex > 0) {
        goTo(activeIndex - 1);
        return;
      }

      if (dragOffset < -threshold && activeIndex < items.length - 1) {
        goTo(activeIndex + 1);
        return;
      }

      goTo(activeIndex);
    }

    function onPointerDown(event) {
      if (!enabled || (event.pointerType === "mouse" && event.button !== 0)) return;

      isDragging = false;
      dragOffset = 0;
      startX = event.clientX;
      startY = event.clientY;
    }

    function onPointerMove(event) {
      if (!enabled) return;

      var dx = event.clientX - startX;
      var dy = event.clientY - startY;

      if (!isDragging) {
        if (Math.abs(dx) < AXIS_LOCK && Math.abs(dy) < AXIS_LOCK) return;
        if (Math.abs(dy) > Math.abs(dx)) return;
        isDragging = true;
        try {
          root.setPointerCapture(event.pointerId);
        } catch (err) {
          /* ignore */
        }
      }

      if (!isDragging) return;

      if (event.cancelable) event.preventDefault();
      dragOffset = dx;
      applyDragOffset();
    }

    function onPointerUp() {
      if (!enabled) return;
      finishDrag();
    }

    function enable() {
      if (enabled) {
        goTo(activeIndex, false);
        return;
      }

      enabled = true;
      track.style.willChange = "transform";
      goTo(activeIndex, false);
    }

    function disable() {
      enabled = false;
      isDragging = false;
      dragOffset = 0;
      track.style.transition = "";
      track.style.transform = "";
      track.style.willChange = "";
    }

    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove, { passive: false });
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerUp);

    return {
      enable: enable,
      disable: disable,
      refresh: function () {
        if (enabled) goTo(activeIndex, false);
      },
    };
  }

  function initScrollCarousel(root) {
    var track = root.querySelector(".pricing-carousel__track") || root;
    var items = track.querySelectorAll(".carousel__item, .covers__item");
    if (!items.length) return;

    var startX = 0;
    var startY = 0;
    var startScroll = 0;
    var tracking = false;
    var axis = "";
    var pointerId = null;

    function slideWidth() {
      var first = items[0];
      var gap = parseFloat(getComputedStyle(track).gap) || 0;
      return first.offsetWidth + gap;
    }

    function clampIndex(index) {
      return Math.max(0, Math.min(items.length - 1, index));
    }

    function maxScroll() {
      return Math.max(0, root.scrollWidth - root.clientWidth);
    }

    function snapToNearest() {
      var w = slideWidth();
      if (!w) return;
      var index = clampIndex(Math.round(root.scrollLeft / w));
      root.scrollTo({
        left: Math.min(index * w, maxScroll()),
        behavior: "smooth",
      });
    }

    function endGesture() {
      if (!tracking) return;
      var shouldSnap = axis === "x";
      tracking = false;
      axis = "";
      pointerId = null;
      if (shouldSnap) snapToNearest();
    }

    function onPointerDown(event) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      tracking = true;
      axis = "";
      pointerId = event.pointerId;
      startX = event.clientX;
      startY = event.clientY;
      startScroll = root.scrollLeft;
    }

    function onPointerMove(event) {
      if (!tracking || event.pointerId !== pointerId) return;

      var dxVisual = event.clientX - startX;
      var dyVisual = event.clientY - startY;

      if (!axis) {
        if (Math.abs(dxVisual) < AXIS_LOCK && Math.abs(dyVisual) < AXIS_LOCK) {
          return;
        }
        axis = Math.abs(dxVisual) > Math.abs(dyVisual) ? "x" : "y";
        if (axis === "y") {
          tracking = false;
          pointerId = null;
          return;
        }
        try {
          root.setPointerCapture(event.pointerId);
        } catch (err) {
          /* ignore */
        }
      }

      if (axis !== "x") return;

      if (event.cancelable) event.preventDefault();
      var scale = designScale();
      var next = startScroll - dxVisual / scale;
      root.scrollLeft = Math.max(0, Math.min(maxScroll(), next));
    }

    function onPointerUp(event) {
      if (event.pointerId !== pointerId) return;
      endGesture();
    }

    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove, { passive: false });
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerUp);
  }

  var pricingCarousels = [];
  var resizeTimer = null;

  function applyLayout() {
    pricingCarousels.forEach(function (entry) {
      if (isMobileLayout()) {
        entry.enable();
        entry.refresh();
      } else {
        entry.disable();
      }
    });
  }

  function onViewportChange() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyLayout, 100);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-carousel]").forEach(function (root) {
      if (root.querySelector(".pricing-carousel__track")) {
        var carousel = initPricingCarousel(root);
        if (carousel) pricingCarousels.push(carousel);
        return;
      }

      initScrollCarousel(root);
    });

    applyLayout();
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("orientationchange", onViewportChange);
  });
})();
