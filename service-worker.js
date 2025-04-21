const CACHE_NAME = 'diario-cache-v2'; // ⚠️ Incrementa este número al hacer cambios
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

// Instala el SW y guarda en cache los archivos necesarios
self.addEventListener('install', event => {
  self.skipWaiting(); // ⚡ Activa el SW inmediatamente sin esperar
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Elimina caches antiguos al activar el nuevo SW
self.addEventListener('activate', event => {
  const whitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (!whitelist.includes(key)) {
            return caches.delete(key); // 🧹 Limpieza
          }
        })
      )
    )
  );
});

// Intercepta todas las peticiones y usa cache o red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
