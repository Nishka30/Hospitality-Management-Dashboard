// // src/auth.js
// import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from './firebase';

// export const register = async (email, password, displayName, userType) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     await updateProfile(userCredential.user, {
//       displayName,
//       photoURL: userType // you can use photoURL to store the userType
//     });
//     return userCredential.user;
//   } catch (error) {
//     console.error("Error registering new user:", error);
//     throw error;
//   }
// };

// export const login = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     console.error("Error logging in:", error);
//     throw error;
//   }

  
// };

// export const logout = () => {
//     // Your logout logic here
//     // For example, clear tokens or user data from localStorage or sessionStorage
//     localStorage.removeItem("userToken"); // Example
//     alert("User logged out");
//   };