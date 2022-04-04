import firebase from "firebase/compat/app";
import "firebase/compat/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCidA4CPdv-Ol9OiOfff1Bq9SXGTVmccgM",
  authDomain: "restro-otp-app.firebaseapp.com",
  projectId: "restro-otp-app",
  storageBucket: "restro-otp-app.appspot.com",
  messagingSenderId: "111677814992",
  appId: "1:111677814992:web:460382d09a1d4bdce506d5",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
