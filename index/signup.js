  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
  import { getDatabase, ref, set  } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";





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

createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
});


function writeUserData(data) {
    const db = getDatabase();
    set(ref(db, 'users/' + data.id), {
      username: data.username,
      admin: data.admin,
      surname: data.surname,
      email: data.email,
      country: data.country,
    });
  }




let errs = document.querySelector(".errs");
let errList = []

let userData = {
    "id": 2,
    "admin": true,
    "username": "",
    "surname": "",
    "email": "",
    "country": "",
    "password": ""
}
document.querySelector("#signUpSubmit").addEventListener("click", function(e){
    e.preventDefault()
    let result = true
    errs.innerHTML = "";
    result = checkIfEmpty("<p>Enter a username</p><br/>", document.querySelector("#username").value)
    result = checkIfEmpty("<p>Enter a surname</p><br/>", document.querySelector("#surname").value)
    result = checkIfEmpty("<p>Enter your email</p><br/>", document.querySelector("#email").value)
    result = checkIfEmpty("<p>Pick a country</p><br/>", document.querySelector("#country").value)
    result = checkIfEmpty("<p>Enter a password</p><br/>", document.querySelector("#password").value)
    result = checkIfEmpty("<p>Repeat your password</p><br/>", document.querySelector("#repeat-password").value)
    result = checkIfEmpty("<p>You must agree to our privacy policy</p><br/>", document.querySelector("#agreement").checked)

    if (document.querySelector("#password").value == document.querySelector("#repeat-password").value){
    }
    else{
        result = false;
        errList.push("Passwords must match")
    }

    for (let item in errList){
        errs.innerHTML += errList[item];
    }
    errList = []

    console.log(result)

    if (result){
        userData.username = document.querySelector("#username").value;
        userData.surname = document.querySelector("#surname").value;
        userData.email = document.querySelector("#email").value;
        userData.country = document.querySelector("#country").value;
        userData.password = document.querySelector("#password").value;
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
        writeUserData(userData) 
    }
    
})


function checkIfEmpty(err, value){
    console.log(`Value is ${value}`)
    if (value == "" /* || value == "----" */ || value == false){
        console.log("WRONG");
        errList.push(err)
        return false;
    }
    else{
        return true;
    }
}