self.addEventListener("push", (event) => {
  let data = {
    title: "용인대 승리태권도",
    body: "출석이 완료되었습니다.",
    url: "https://victory-attendance.vercel.app"
  };

  if (event.data) {
    try {
      data = {
        ...data,
        ...event.data.json()
      };
    } catch (e) {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      vibrate: [200, 100, 200],
      tag: "victory-attendance",
      renotify: true,
      data: {
        url: data.url
      }
    })
  );
});


self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url =
    event.notification.data?.url ||
    "https://victory-attendance.vercel.app";

  event.waitUntil(
    clients.openWindow(url)
  );
});
