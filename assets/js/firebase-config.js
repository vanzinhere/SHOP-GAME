const firebaseConfig = {
    apiKey: "AIzaSyA9AyGgQLrIF7utIJvqabc3tQwOSr73D5s",
    authDomain: "green-game-data.firebaseapp.com",
    databaseURL: "https://green-game-data-default-rtdb.firebaseio.com",
    projectId: "green-game-data",
    storageBucket: "green-game-data.appspot.com",
    messagingSenderId: "966938356782",
    appId: "1:966938356782:web:411e5f5c7e2fa97a34c3bf",
  };
  
  const app = firebase.initializeApp(firebaseConfig) || firebase.analytics();