// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxSlWotU1ly1O0zeyvEJK-oeBjA1m4is8",
    authDomain: "pushanotification.firebaseapp.com",
    projectId: "pushanotification",
    storageBucket: "pushanotification.firebasestorage.app",
    messagingSenderId: "752431191312",
    appId: "1:752431191312:web:dc2455b78896f3f9034195",
    measurementId: "G-TZWMT5CWHG"
  };

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

