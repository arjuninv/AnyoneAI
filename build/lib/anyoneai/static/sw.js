self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('moonshotstudio').then(function(cache) {
     return cache.addAll([
       '/index.html',
       '/js/script.js',
       '/js/blockly_compressed.js',
       '/js/blocks_compressed.js',
       '/js/python_compressed.js',
       '/css/style.css',
       '/css/bootstrap.min.css',
       '/msg/js/en.js',
       '/js/custom_blocks.js',
       '/js/custom_codegen.js',
       '/js/bootstrap.js',
       '/js/bluetooth.js',
       '/js/jquery.js',
       '/js/popper.min.js',
       '/media/sprites.svg'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});
