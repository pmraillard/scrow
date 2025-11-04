const CACHE_NAME = 'nfc-writer-proto-v1';
const FILES_TO_CACHE = [
  '/index.html',
  '/manifest.json'
];
// Basic service worker to make the prototype installable (offline shell).
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});
self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((resp) => {
      return resp || fetch(evt.request);
    })
  );
});
