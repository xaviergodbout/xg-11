const CACHE_NAME = 'x-g-ca-v2';
const PRECACHE_URLS = [
  '/',
  '/css/styles.css',
  '/js/script.js',
  '/img/x-g_favicon_light.svg',
  '/img/x-g_favicon_dark.svg',
  '/img/link_ascii.webp',
  '/img/rs_banner.webp',
  '/img/x-g_logo_spin.gif'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((networkResponse) => {
        const shouldCache = networkResponse.ok && new URL(event.request.url).origin === self.location.origin;

        if (shouldCache) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }

        return networkResponse;
      });
    })
  );
});
