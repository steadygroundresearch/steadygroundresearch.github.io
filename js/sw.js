const CACHE_NAME = 'sgresearch-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/projects.html',
  '/learning.html',
  '/css/styles.css',
  '/js/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});