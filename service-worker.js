// Menyimpan aset ke cache
const CACHE_NAME = "gocode";
let urlsToCache = [
    "/",
    "/link.html",
    "/index.html",
    "/pages/home.html",
    "/pages/daftar.html",
    "/pages/login.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/link.js",
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg",
    "/img/icon-96x96.png",
    "/img/icon-128x128.png",
    "/img/icon-192x192.png",
    "/img/icon-256x256.png",
    "/img/icon-384x384.png",
    "/img/icon-512x512.png",
    "/img/dataScience.svg",
    "/img/web.svg",
    "/img/devOps.svg",
    "/manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Menggunakan aset dari cache
self.addEventListener("fetch", event => {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(response => {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

// Menghapus cache yang sudah ada
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});