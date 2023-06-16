import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";

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
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// function existingEmail(data, email) {
//   return Object.values(data).some((user) => {
//     return user.email === email;
//   });
// }

export { fetchData };
export function createAccount(email, password, fullname, matricule) {
  const db = getDatabase();
  return fetchData("Users/").then((data) => {
    // if (existingEmail(data, email) === false) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          FullName: fullname,
          Matricule: matricule,
          Password: password,
          email: email,
        };
        return set(ref(db, `Users/${user.uid}`), userData)
          .then(() => {
            console.log("User account created successfully");
            console.log(user);
            return [user, true];
          })
          .catch((error) => {
            console.error("Error writing user data:", error);
            throw [error, false];
          });
      })
      .catch((error) => {
        console.error("Error creating user account:", error);
        throw error;
      });
    // } else {
    //   console.log("Existing email");
    //   return ["Existing email", false];
    // }
  });
}
