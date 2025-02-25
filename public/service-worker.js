const CACHE_NAME = "echo-memories-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/static/js/bundle.js",
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js",
  "/static/css/main.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// 📌 Installation du Service Worker et mise en cache des fichiers essentiels
self.addEventListener("install", (event) => {
  console.log("🔄 Service Worker : Installation en cours...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ Mise en cache des fichiers !");
      return cache.addAll(urlsToCache);
    })
  );
});

// 📌 Activation du Service Worker (Nettoyage des anciens caches)
self.addEventListener("activate", (event) => {
  console.log("🛠️ Service Worker activé !");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("🗑️ Suppression de l'ancien cache :", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// 📌 Interception des requêtes pour renvoyer les fichiers en cache si hors ligne
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match("/index.html"); // Renvoie la page d’accueil en cas de panne
      });
    })
  );
});
