// Initialize Firebase

import firebase from 'firebase'

// Initialize Firebase
const config = {
	apiKey: "AIzaSyA-PXD1lnZ_5rhqPP1L2uRFdUZ16gohqWY",
	authDomain: "shop-test-8d187.firebaseapp.com",
	databaseURL: "https://shop-test-8d187.firebaseio.com",
	projectId: "shop-test-8d187",
	storageBucket: "shop-test-8d187.appspot.com",
	messagingSenderId: "440144533330"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore()