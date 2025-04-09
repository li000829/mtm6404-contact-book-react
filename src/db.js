// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB9Z8338U6Dz1nkWnDsVtRwmJ7N76m_xvM",
  authDomain: "contact-book-9c06c.firebaseapp.com",
  projectId: "contact-book-9c06c",
  storageBucket: "contact-book-9c06c.appspot.com",
  messagingSenderId: "304048881868",
  appId: "1:304048881868:web:2f128714c596609ecfc269"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
