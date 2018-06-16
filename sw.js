let staticCacheName = 'restaurants-static-cache';
let toBeCached = [
	'./',
	'index.html',
	'restaurant.html',
	'css/styles.css',
	'data/restaurants.json',
	'js/restaurant_info.js',
	'js/dbhelper.js',
	'js/main.js',
	'img/1.jpg',
	'img/2.jpg',
	'img/3.jpg',
	'img/4.jpg',
	'img/5.jpg',
	'img/6.jpg',
	'img/7.jpg',
	'img/8.jpg',
	'img/9.jpg',
	'img/10.jpg',
];

self.addEventListener('install', e =>
	e.waitUntil(
		caches
			.open(staticCacheName)
			.then(cache => cache.addAll(toBeCached))
			.then(self.skipWaiting())
	)
);

self.addEventListener('activate', e =>
	e.waitUntil(
		caches.keys().then(cacheKeys =>
			Promise.all(
				cacheKeys.map(cache => {
					if (cache !== staticCacheName) {
						console.log('[ServiceWorker] removing cached files from ', cache);
						return caches.delete(cache);
					}
				})
			)
		)
	)
);

self.addEventListener('fetch', e => {
	if (e.request.url.startsWith(self.location.origin)) {
		e.respondWith(caches.match(e.request).then(res => (res ? res : fetch(e.request))));
	}
});
