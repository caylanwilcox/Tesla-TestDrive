import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  databaseURL: "https://testdrive-d53a9-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

// Optionally initialize analytics
if (process.env.REACT_APP_MEASUREMENT_ID) {
  const analytics = getAnalytics(app);
}

const database = getDatabase(app);

export { app, database };
