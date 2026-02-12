(function () {
  const bodyEl = document.body;
  const container = document.querySelector(".container");
  if (!bodyEl || !container) return;

  let resizeTimer = null;

  function applyHeight() {
    const rectH = Math.ceil(container.getBoundingClientRect().height);
    const newH = rectH + "px";

    if (bodyEl.style.height !== newH) {
      bodyEl.style.height = newH;
    }
    bodyEl.style.marginBottom = "0";
  }

  function scheduleApply() {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyHeight, 60);
  }

  // Initial
  window.addEventListener("load", () => {
    applyHeight();
    setTimeout(applyHeight, 500); // sécurité après fonts/images
  });

  // resize/orientation
  window.addEventListener("resize", scheduleApply);
  window.addEventListener("orientationchange", scheduleApply);

  // observer mutations
  const mo = new MutationObserver(() => {
    requestAnimationFrame(applyHeight);
  });
  mo.observe(container, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });

  // fallback
  requestAnimationFrame(applyHeight);
})();
