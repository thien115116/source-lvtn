// importScripts("https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js");

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("./firebase-messaging-sw.js")
//     .then(function (registration) {
//       console.log("Registration successful, scope is:", registration.scope);
//     })
//     .catch(function (err) {
//       console.log("Service worker registration failed, error:", err);
//     });
// } else {
//   console.log("alo 123");
// }
// firebase.initializeApp({
//   messagingSenderId: "203895453268",
// });

// const msg = firebase.messaging();
// console.log(msg);
// msg.setBackgroundMessageHandler((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "./icon_tran.png",
//   };
//   console.log(payload.data.badgeCount);
//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });
