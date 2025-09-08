const cacheName = "mi-pwa-cache-v1";
const filesToCache = [
  "/",
  "/pwa/index.html",
  "/pwa/manifest.json",
  "/pwa/icon-192.png",
  "/pwa/icon-512.png"
];


self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      for (const file of filesToCache) {
        try {
          await cache.add(file);
          console.log("Cacheado correctamente:", file);
        } catch (err) {
          console.error("Error cacheando:", file, err);
        }
      }
    })()
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
