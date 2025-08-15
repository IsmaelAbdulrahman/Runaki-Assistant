const CACHE_NAME = 'runaki-bill-assistant-cache-v2';
const urlsToCache = [
  '/Runaki-Assistant/',
  '/Runaki-Assistant/index.html',
  '/Runaki-Assistant/manifest.json',
  '/Runaki-Assistant/icons/icon-192x192.png',
  '/Runaki-Assistant/icons/icon-512x512.png',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/chart.js@3.9.1',
  'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match('/Runaki-Assistant/index.html');
      });
    })
  );
});
