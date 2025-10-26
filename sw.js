const CACHE_NAME = 'floating-video-player-v1';
const urlsToCache = [
  '/flotante-/',
  '/flotante-/index.html',
  '/flotante-/styles.css',
  '/flotante-/script.js',
  '/flotante-/manifest.json',
  '/flotante-/media/vivo.mp4',
  '/flotante-/icons/icon-72x72.png',
  '/flotante-/icons/icon-96x96.png',
  '/flotante-/icons/icon-128x128.png',
  '/flotante-/icons/icon-144x144.png',
  '/flotante-/icons/icon-152x152.png',
  '/flotante-/icons/icon-192x192.png',
  '/flotante-/icons/icon-384x384.png',
  '/flotante-/icons/icon-512x512.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cacheando archivos');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Service Worker: Error al cachear archivos:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Interceptando request:', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si está en cache, devolverlo
        if (response) {
          console.log('Service Worker: Sirviendo desde cache:', event.request.url);
          return response;
        }
        
        // Si no está en cache, hacer fetch
        console.log('Service Worker: Haciendo fetch:', event.request.url);
        return fetch(event.request).then((response) => {
          // Verificar si la respuesta es válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clonar la respuesta
          const responseToCache = response.clone();
          
          // Agregar al cache
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch((error) => {
          console.error('Service Worker: Error en fetch:', error);
          
          // Para videos, intentar servir desde cache aunque sea una versión antigua
          if (event.request.url.includes('.mp4')) {
            return caches.match(event.request);
          }
          
          // Para otros archivos, devolver una página de error personalizada
          if (event.request.destination === 'document') {
            return caches.match('/flotante-/index.html');
          }
        });
      })
  );
});

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Manejar notificaciones push (opcional)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push recibido');
  
  const options = {
    body: event.data ? event.data.text() : 'Nueva notificación',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver detalles',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/icons/icon-72x72.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Reproductor Video Flotante', options)
  );
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Click en notificación');
  
  event.notification.close();
  
  if (event.action === 'explore') {
  event.waitUntil(
    clients.openWindow('/flotante-/')
  );
  }
});

// Manejar actualizaciones de la app
self.addEventListener('appinstalled', (event) => {
  console.log('Service Worker: App instalada');
});

// Limpiar cache periódicamente
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cleanup-cache') {
    event.waitUntil(cleanupCache());
  }
});

async function cleanupCache() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(name => name !== CACHE_NAME);
  
  await Promise.all(
    oldCaches.map(name => caches.delete(name))
  );
  
  console.log('Service Worker: Cache limpiado');
}
