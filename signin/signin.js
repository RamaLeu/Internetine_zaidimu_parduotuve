import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAuth,  signInWithEmailAndPassword , onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
import { getDatabase, ref, set  } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";



let currentUser


const firebaseConfig = {
apiKey: "AIzaSyDA9Ez4i7vSWvq8uzvmmy8CMQ54x-EDRfs",
databaseURL: "https://derrastore-default-rtdb.europe-west1.firebasedatabase.app/",
authDomain: "derrastore.firebaseapp.com",
projectId: "derrastore",
storageBucket: "derrastore.appspot.com",
messagingSenderId: "70390486239",
appId: "1:70390486239:web:f0e884d634f8114597856a"
};



const app = initializeApp(firebaseConfig); 

const db = getDatabase(app);

const auth = getAuth();



setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

onAuthStateChanged(auth, (user) => {
if (user) {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/firebase.User
  const uid = user.uid;
  currentUser = user
  // ...
} else {
  // User is signed out
  // ...
}
});




document.querySelector("#signInSubmit").addEventListener("click", function(e){
    e.preventDefault()
    login()
})
document.querySelector('#logout').addEventListener("click", function(e){
  e.preventDefault()
  logout()
})

document.querySelector('#checkUser').addEventListener("click", function(e){
  e.preventDefault()
  checkUser()
})

function login(){
  let email = document.querySelector("#email").value
  let password = document.querySelector("#password").value

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}

function logout(){
  signOut(auth).then(() => {
    console.log("signed out")
    const uid = user.uid;
    console.log(uid)
    console.log(user.email)
    currentUser = ""
  }).catch((error) => {
    // An error happened.
  });
}

function checkUser(){
  if (currentUser){
    const uid = currentUser.uid;
    console.log(uid)
    console.log(currentUser.email)
    console.log(currentUser)
  }

}