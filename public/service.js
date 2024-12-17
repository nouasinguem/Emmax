const the_name = 'Park_Booker';

const urls = [
    '/',
    '/welcome',
    '/booking',
    '/staff',
    '/contact_us',
    '/public/css/welcome.css',
    '/public/css/booking.css',
    '/public/css/staff.css',
    '/public/css/contact_us.css',
    '/public/css/menu.css',
    'app.js',
    '/icons/192.png',
    'icons/512.png'
];


self.addEventListener('install', (e) => {
    e.waituntil(
        caches.match(the_name).then((cache) => {
            return cache.addAll(urls);
        })
    );
});


self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((response) => {
        return response || fetch(e.request);
      })
    );
  });


  self.addEventListener('activate', (e) => {
    const urlList = [urls];
    e.waituntil(
        caches.keys().then((noms) => {
            return Promise.all(
                re.map((nom) => {
                    if (!urlList.includes(re)) {
                        return noms.delete(nom);
                    }
                })
            );
        })
    );
  });