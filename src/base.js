import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCmJMVf_T2S_GY2-MddiiPqliuTJAPCD8Q",
  authDomain: "catch-of-the-day-devon-daviau.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-devon-daviau.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
