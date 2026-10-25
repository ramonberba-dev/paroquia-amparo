const C='amparo-202610251717';
const A=['./','index.html','manifest.webmanifest','icons/icon-192.png','dados/santos.json','dados/novenas.json','dados/biblia.json','dados/oracoes.json','dados/devocionarios.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(_){d={titulo:'Paróquia N. Sra. do Amparo',texto:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.titulo||'Paróquia N. Sra. do Amparo',{body:d.texto||'',icon:'icons/icon-192.png',badge:'icons/icon-192.png',tag:d.tag||'aviso',data:{url:d.url||'./'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return clients.openWindow(e.notification.data.url||'./')}))});
