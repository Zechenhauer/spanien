// Universeller Service Worker für alle Web-Apps
self.addEventListener('push', function(event) {
    let data = { 
        title: '⚽ Fussball-Alarm', 
        body: 'Es gibt ein neues Update!' 
    };

    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body,
        // Universelles Fußball-Icon (funktioniert für jedes Team perfekt)
        icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%231a1a1a"/><text x="50" y="70" font-size="60" text-anchor="middle">⚽</text></svg>',
        badge: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%231a1a1a"/><text x="50" y="70" font-size="60" text-anchor="middle">⚽</text></svg>',
        vibrate: [200, 100, 200]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('./')
    );
});