(function () {
  const SCROLL_LOCK_CLASS = 'frs-lightbox-is-open';
  const DRAGGING_CLASS = 'is-dragging';

  let lockedScrollY = 0;
  let pendingScrollY = null;

  document.querySelectorAll('.frs-slider__lightbox-link').forEach((link) => {
    link.addEventListener('click', () => {
      pendingScrollY = window.scrollY;
    });
  });

  document.querySelectorAll('.frs-lightbox__image-wrap').forEach(initDragPan);

  updateLightboxState();
  window.addEventListener('hashchange', updateLightboxState);

  function initDragPan(viewport) {
    let drag = null;

    viewport.addEventListener('pointerdown', (event) => {
      if (!isZoomed(viewport)) return;

      event.preventDefault();
      drag = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        left: viewport.scrollLeft,
        top: viewport.scrollTop,
      };
      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add(DRAGGING_CLASS);
    });

    viewport.addEventListener('pointermove', (event) => {
      if (!drag || drag.id !== event.pointerId) return;

      event.preventDefault();
      viewport.scrollLeft = drag.left - (event.clientX - drag.x);
      viewport.scrollTop = drag.top - (event.clientY - drag.y);
    });

    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    viewport.addEventListener('lostpointercapture', endDrag);

    function endDrag(event) {
      if (drag && event.pointerId === drag.id) {
        drag = null;
        viewport.classList.remove(DRAGGING_CLASS);
      }
    }
  }

  function updateLightboxState() {
    const target = getHashTarget();

    if (getOpenLightbox(target)) {
      lockPageScroll();
    } else {
      unlockPageScroll();
    }

    if (target && target.classList.contains('frs-lightbox__zoom-target')) {
      centerZoomedViewport(target);
    }
  }

  function getHashTarget() {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return null;

    return document.getElementById(decodeURIComponent(targetId));
  }

  function getOpenLightbox(target) {
    if (!target) return null;
    if (target.classList.contains('frs-lightbox')) return target;
    if (target.classList.contains('frs-lightbox__zoom-target')) return target.closest('.frs-lightbox');

    return null;
  }

  function isZoomed(viewport) {
    const target = getHashTarget();
    return Boolean(
      target &&
      target.classList.contains('frs-lightbox__zoom-target') &&
      viewport.closest('.frs-lightbox') === target.closest('.frs-lightbox')
    );
  }

  function centerZoomedViewport(target) {
    const viewport = target.parentElement.querySelector('.frs-lightbox__image-wrap');
    if (!viewport) return;

    requestAnimationFrame(() => {
      viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
      viewport.scrollTop = (viewport.scrollHeight - viewport.clientHeight) / 2;
    });
  }

  function lockPageScroll() {
    if (document.body.classList.contains(SCROLL_LOCK_CLASS)) return;

    lockedScrollY = pendingScrollY === null ? window.scrollY : pendingScrollY;
    pendingScrollY = null;
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.classList.add(SCROLL_LOCK_CLASS);
  }

  function unlockPageScroll() {
    if (!document.body.classList.contains(SCROLL_LOCK_CLASS)) return;

    document.body.classList.remove(SCROLL_LOCK_CLASS);
    document.body.style.top = '';
    window.scrollTo(0, lockedScrollY);
  }
})();
