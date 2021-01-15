import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/functions';

export const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyA0TKchrx9cS6PotlEFJa29RWMBaN3r0l0',
    authDomain: 'shopify-application-2021-web.firebaseapp.com',
    projectId: 'shopify-application-2021-web',
    storageBucket: 'shopify-application-2021-web.appspot.com',
    messagingSenderId: '986386228807',
    appId: '1:986386228807:web:6e18898d73e0e6c64b7362',
    measurementId: 'G-RZN6HM5QWQ'
});

firebaseApp.analytics();