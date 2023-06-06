import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD4R4Uq89Qc4fWOGnRxMw-lTfHf_8TMVNU",
  authDomain: "leoni-pfe.firebaseapp.com",
  databaseURL: "https://leoni-pfe-default-rtdb.firebaseio.com",
  projectId: "leoni-pfe",
  storageBucket: "leoni-pfe.appspot.com",
  messagingSenderId: "385983907985",
  appId: "1:385983907985:web:f65ef5f00794752f0bd730",
};
export default firebaseConfig;
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

function fetchData(link) {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, link))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
export { fetchData };
