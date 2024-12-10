self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  self.skipWaiting()
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data.action === "cacheFiles") {
    const files = event.data.files;
    const uniqueFiles = [...new Set(files)]
    event.waitUntil(
        caches.open("audio-cache").then((cache) => {
          return cache.addAll(uniqueFiles);
        }).then(() => {
          console.log("Files cached successfully");
        }).catch((err) => {
          console.error("Error caching files:", err);
        })
      );
  }
});
