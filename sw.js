const CACHE_NAME = 'storia-lingua-v1';
const ASSETS = ["index.html", "manifest.webmanifest", "assets/css/style.css", "assets/js/app.js", "assets/icons/icon-192.png", "assets/icons/icon-512.png", "content/microlezione_01.json", "content/microlezione_02.json", "content/microlezione_03.json", "content/microlezione_04.json", "content/microlezione_05.json", "content/microlezione_06.json", "content/microlezione_07.json", "content/microlezione_08.json", "content/microlezione_09.json", "content/microlezione_10.json", "content/microlezione_11.json", "content/microlezione_12.json", "content/microlezione_13.json", "content/microlezione_14.json", "content/microlezione_15.json", "content/microlezione_16.json", "content/microlezione_17.json", "content/microlezione_18.json", "content/microlezione_19.json", "content/microlezione_20.json", "content/microlezione_21.json", "content/microlezione_22.json", "content/microlezione_23.json", "content/microlezione_24.json", "content/microlezione_25.json", "content/microlezione_26.json", "content/microlezione_27.json", "content/microlezione_28.json", "content/microlezione_29.json", "content/microlezione_30.json", "content/microlezione_31.json", "images/pagina_1.png", "images/pagina_10.png", "images/pagina_11.png", "images/pagina_12.png", "images/pagina_13.png", "images/pagina_14.png", "images/pagina_15.png", "images/pagina_16.png", "images/pagina_17.png", "images/pagina_18.png", "images/pagina_19.png", "images/pagina_2.png", "images/pagina_20.png", "images/pagina_21.png", "images/pagina_22.png", "images/pagina_23.png", "images/pagina_24.png", "images/pagina_25.png", "images/pagina_26.png", "images/pagina_27.png", "images/pagina_28.png", "images/pagina_29.png", "images/pagina_3.png", "images/pagina_30.png", "images/pagina_31.png", "images/pagina_4.png", "images/pagina_5.png", "images/pagina_6.png", "images/pagina_7.png", "images/pagina_8.png", "images/pagina_9.png"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const clone = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
    return response;
  }).catch(() => caches.match('index.html'))));
});