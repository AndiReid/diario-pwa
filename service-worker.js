<<<<<<< HEAD
const CACHE_NAME = 'diario-cache-v3'; // cambia el número si haces cambios futuros

=======
const CACHE_NAME = 'diario-cache-v3'; // cambia esto cada vez que actualices
>>>>>>> 94f1ea20681aea8277d1122ca5199f05f66f9300
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

<<<<<<< HEAD
// Instalar y guardar archivos
self.addEventListener('install', event => {
  self.skipWaiting(); // fuerza instalación inmediata
=======
// Instala y guarda en caché los archivos
self.addEventListener('install', event => {
  self.skipWaiting();
>>>>>>> 94f1ea20681aea8277d1122ca5199f05f66f9300
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

<<<<<<< HEAD
// Activar y eliminar cachés viejos
self.addEventListener('activate', event => {
  clients.claim(); // toma control de inmediato
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // elimina versiones antiguas
          }
        })
      );
    })
  );
});

// Fetch: primero red, luego caché
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Actualiza la caché
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request)) // si falla, usa caché
  );
=======
// Activa y limpia caché viejo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Intercepta las solicitudes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Escucha mensaje desde el cliente
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
>>>>>>> 94f1ea20681aea8277d1122ca5199f05f66f9300
});
