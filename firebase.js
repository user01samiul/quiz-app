// import { initializeApp } from "firebase/app";

// const app = initializeApp({
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   databaseURL: import.meta.env.VITE_DATABASE_URL,
// });

// export default app;

// note - import.meta.env for vite app instead of process.env


//----------------------method 2 (not secured)-------------------------------

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSGqBeBEZTXZ12Yn3avbtD_co48qabo2o",
  authDomain: "quiz-app-dev-dad6b.firebaseapp.com",
  databaseURL: "https://quiz-app-dev-dad6b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quiz-app-dev-dad6b",
  storageBucket: "quiz-app-dev-dad6b.appspot.com",
  messagingSenderId: "1031418863906",
  appId: "1:1031418863906:web:44afd2f138ff976c4e457b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
