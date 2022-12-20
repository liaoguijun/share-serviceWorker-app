
self.addEventListener('install', function(event) {
  console.log('service worker, install', event)
});

self.addEventListener('activate', function(event) {
  console.log('service worker, activate', event)
});


self.addEventListener('fetch', function(event) {
  console.log('service worker, fetch', event)
});

self.addEventListener('message', function(event) {
  console.log('service worker, message', event)
  event.source.postMessage('this message is from sw.js to page');  // 向主线程传递信息
});
