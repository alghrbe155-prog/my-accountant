const CACHE_NAME = 'accountant-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
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
      .then(response => {
        // إذا وجد الملف في الكاش، ارجعه فوراً
        if (response) {
          return response;
        }
        // وإلا، حاول تحميله من الشبكة
        return fetch(event.request);
      })
      .catch(() => {
        // إذا لم يوجد اتصال بالإنترنت، اعرض الصفحة الرئيسية
        return caches.match('./index.html');
      })
  );
});
