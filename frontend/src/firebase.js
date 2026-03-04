import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKLsOw49su3xCUwBOCa_NYCHrpHes8iEw",
  authDomain: "ecommerce-otp-auth.firebaseapp.com",
  projectId: "ecommerce-otp-auth",
//   storageBucket: "ecommerce-otp-auth.firebasestorage.app",
//   messagingSenderId: "661034555692",
  appId: "1:661034555692:web:6f6a43ee249e5b4953f489",
//   measurementId: "G-QTT2PNBBF4"
};

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   appId: "YOUR_APP_ID",
// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

