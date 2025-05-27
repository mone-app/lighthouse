// functions/firebaseConfig.js

const firebase = require("firebase/app");
require("firebase/auth");

// Konfigurasi Firebase Anda
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Fungsi untuk mendaftar pengguna baru
function registerUser(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

// Fungsi untuk login pengguna
function loginUser(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

// Ekspor fungsi
module.exports = {
    registerUser,
    loginUser
};
