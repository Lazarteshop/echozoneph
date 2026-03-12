const CACHE="echozone-pro-v1";

const ASSETS=[
"/",
"/index.html",
"/manifest.json",
"/1768875223455.jpg"
];

self.addEventListener("install",e=>{
self.skipWaiting();
e.waitUntil(
caches.open(CACHE)
.then(cache=>cache.addAll(ASSETS))
);
});
self.addEventListener("activate",e=>{
e.waitUntil(
caches.keys().then(keys=>{
return Promise.all(
keys.filter(key=>key!==CACHE)
.map(key=>caches.delete(key))
);
})
);
});

self.addEventListener("fetch",e=>{
e.respondWith(
caches.match(e.request)
.then(res=>res||fetch(e.request))
);
});