import * as firebase from "firebase/app";
import "firebase/messaging";

export function initializeFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "your-domain.com",
    databaseURL: "https://your-project.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef1234567890",
  };

  // Check if Firebase is already initialized
  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // Request permission for notifications
  if (typeof window !== "undefined" && "Notification" in window) {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    });
  }

  return firebase;
}
