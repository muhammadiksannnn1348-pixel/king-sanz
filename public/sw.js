self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', async () => {
  const registrations = await self.registration.scope
    ? self.registration.unregister()
    : false

  if (registrations) {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))
  }
})
