const CACHE_NAME = 'x-g-ca-v1';
const urlsToCache = [
  '/',
  '/css/styles.css',
  '/js/script.js',
  '/img/x-g_favicon_light.svg',
  '/img/x-g_favicon_dark.svg',
  '/img/link_ascii.webp',
  '/img/rs_banner.webp',
  '/img/x-g_logo_spin.gif'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle install prompt
let deferredPrompt;

self.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  console.log('PWA install prompt ready');
});

self.addEventListener('appinstalled', (evt) => {
  console.log('PWA was installed');
});
