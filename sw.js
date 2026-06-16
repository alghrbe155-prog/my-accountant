const CACHE_NAME = 'accountant-v1';
const urlsToCache = [
  '.',
  'index.html',
  'manifest.json'
];

// تثبيت الـ Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// استرجاع الملفات من الكاش عند عدم الاتصال
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// تحديث الكاش (حذف القديم)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});