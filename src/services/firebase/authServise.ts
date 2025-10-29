// // src/services/authService.ts
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "../firebase/firebaseConfig"

// export const registerUser = async (email: string, password: string, username: string) => {
//   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//   const user = userCredential.user;

//   // Guardar datos del usuario en Firestore
//   await setDoc(doc(db, "users", user.uid), {
//     username,
//     email,
//     createdAt: new Date()
//   });

//   return user;
// };

// export const loginUser = async (email: string, password: string) => {
//   const userCredential = await signInWithEmailAndPassword(auth, email, password);
//   return userCredential.user;
// };
