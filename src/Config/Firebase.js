import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";

const firebaseConfig = {
  apiKey: "AIzaSyBl-tVPS8qftUX7X93ROdp7OQ50Km28eAU",
  authDomain: "leoni-dash.firebaseapp.com",
  databaseURL: "https://leoni-dash-default-rtdb.firebaseio.com",
  projectId: "leoni-dash",
  storageBucket: "leoni-dash.appspot.com",
  messagingSenderId: "754187840193",
  appId: "1:754187840193:web:83745de4bd57727e8ac240",
  measurementId: "G-WZYYSC5GWG"
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
