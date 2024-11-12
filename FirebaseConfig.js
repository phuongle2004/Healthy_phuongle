// FirebaseConfig.js
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const FIREBASE_AUTH = firebase.auth();
const FIREBASE_DB = firestore();

export { FIREBASE_AUTH, FIREBASE_DB };
