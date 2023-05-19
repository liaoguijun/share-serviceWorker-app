// sw.js

// 监听 'install' 事件， 回调中缓存所需要的文件
self.addEventListener('install', function(event) {
  console.log('service worker, install', event)
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll(['./index.html', './index.js'])
    })
    )
});

self.addEventListener('activate', function(event) {
  console.log('service worker, activate', event)
});


// 拦截所有请求事件
// 如果缓存中已经存在已经有请求的数据就直接用缓存，否则去请求数据
self.addEventListener('fetch', function(event) {
  // console.log('service worker, fetch', event)
  // event.respondWith(
  //   caches.match(event.request).then(function(response) {
  //     if(response) {
  //       return response
  //     }
  //     console.log('fetch source')
  //   })
  // )
});

self.addEventListener('message', function(event) {
  // console.log('service worker, message', event)
  // todo 做大量计算，不可操作dom
  event.source.postMessage(event.data);  // 向主线程传递信息
});
