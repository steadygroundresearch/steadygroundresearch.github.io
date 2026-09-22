const CACHE_NAME = 'sgresearch-v2'; // bumped — forces every device to treat this as a new SW

const urlsToCache = [
  '/',
  '/index.html',
  '/projects.html',
  '/learning.html',
  '/services.html',
  '/css/styles.css',
  '/js/script.js'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // don't wait for old tabs to close — take over immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME) // delete every OLD cache
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim()) // take control of open pages right away
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});