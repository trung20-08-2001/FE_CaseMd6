import {initializeApp} from 'firebase/app';
import {getAuth,GoogleAuthProvider,FacebookAuthProvider} from "firebase/auth"
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAoqHlZFnGCpd2Ox3vX300IZ-Pcrh0Yxyw",
  authDomain: "case-module6-79593.firebaseapp.com",
  projectId: "case-module6-79593",
  storageBucket: "case-module6-79593.appspot.com",
  messagingSenderId: "801621806519",
  appId: "1:801621806519:web:459ccf817111dee6b12c32",
  measurementId: "G-LRKGBFR3BW"
};
const app=initializeApp(firebaseConfig);
const storage=getStorage(app);
const auth=getAuth(app);
const googleProvider=new GoogleAuthProvider();
const facebookProvider=new FacebookAuthProvider();

export {storage,auth,googleProvider,facebookProvider};
export const imageDb = getStorage(app)
