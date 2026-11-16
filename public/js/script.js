(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    updateCurrentYear();
    updateFavicon();
    initFaviconWatcher();
    initThemeColor();
    registerServiceWorker();
    initLinkLayoutToggle();
  });

  function updateCurrentYear() {
    const currentYear = document.getElementById('currentYear');
    if (currentYear) currentYear.textContent = new Date().getFullYear();
  }

  function updateFavicon() {
    const favicon = document.getElementById('favicon');
    if (!favicon || !window.matchMedia) return;
    favicon.href = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? '/img/x-g_favicon_dark.svg'
      : '/img/x-g_favicon_light.svg';
  }

  function initFaviconWatcher() {
    if (!window.matchMedia) return;
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }

  function initThemeColor() {
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) return;

    // Read the active CSS token so the status bar follows both theme controls.
    const updateThemeColor = () => {
      themeColor.content = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-bg').trim();
    };

    updateThemeColor();
    document.getElementById('theme-toggle')?.addEventListener('change', updateThemeColor);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeColor);
    window.addEventListener('pageshow', updateThemeColor);
  }

  function initLinkLayoutToggle() {
    resetHorizontalScroll();

    const iconToggle = document.getElementById('links-icon-toggle');
    if (!iconToggle) return;

    iconToggle.addEventListener('change', resetHorizontalScroll);
  }

  function resetHorizontalScroll() {
    window.scrollTo(0, window.scrollY);
    if (document.scrollingElement) document.scrollingElement.scrollLeft = 0;
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
  }
})();
