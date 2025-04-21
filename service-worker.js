const CACHE_NAME = 'diario-cache-v2'; // cambia el número si haces cambios futuros

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Instalar y guardar archivos
self.addEventListener('install', event => {
  self.skipWaiting(); // fuerza instalación inmediata
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

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
});
