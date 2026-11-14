const VERSION = new URL(self.location.href).searchParams.get("v") || "dev";
const SHELL = `tt-shell-${VERSION}`;
const DATA = "tt-data-1";
const BASE = new URL("./", self.location.href).pathname;
const ANY = { ignoreVary: true };

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.add(BASE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("tt-shell-") && key !== SHELL)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(request, cacheName, fallback) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(fallback ?? request, response.clone());
    return response;
  } catch (error) {
    const hit = await cache.match(fallback ?? request, ANY);
    if (hit) return hit;
    throw error;
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request, ANY);
  if (hit) return hit;
  const response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName, event) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request, ANY);
  const fresh = fetch(request)
    .then((response) => {
      if (response.ok) return cache.put(request, response.clone()).then(() => response);
      return response;
    })
    .catch(() => null);
  if (hit) {
    event.waitUntil(fresh);
    return hit;
  }
  const response = await fresh;
  return response ?? Response.error();
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;
  const path = url.pathname.slice(BASE.length);
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, SHELL, BASE));
  } else if (path.startsWith("assets/") || path.startsWith("brand/")) {
    event.respondWith(cacheFirst(request, SHELL));
  } else if (path.startsWith("bundle/")) {
    event.respondWith(staleWhileRevalidate(request, DATA, event));
  }
});

function cacheFor(path) {
  if (path.startsWith("assets/") || path.startsWith("brand/")) return SHELL;
  return path.startsWith("bundle/") ? DATA : null;
}

async function keepOne(href) {
  const url = new URL(href);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;
  const name = cacheFor(url.pathname.slice(BASE.length));
  if (!name) return;
  const cache = await caches.open(name);
  if (await cache.match(href, ANY)) return;
  const response = await fetch(href).catch(() => null);
  if (response && response.ok) await cache.put(href, response);
}

async function keep(urls) {
  const batch = 6;
  for (let i = 0; i < urls.length; i += batch) {
    await Promise.all(urls.slice(i, i + batch).map(keepOne));
  }
}

self.addEventListener("message", (event) => {
  const data = event.data;
  if (data && data.type === "keep" && Array.isArray(data.urls)) event.waitUntil(keep(data.urls));
});
