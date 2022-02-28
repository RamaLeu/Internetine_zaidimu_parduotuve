import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDA9Ez4i7vSWvq8uzvmmy8CMQ54x-EDRfs",
  databaseURL: "https://derrastore-default-rtdb.europe-west1.firebasedatabase.app/",
  authDomain: "derrastore.firebaseapp.com",
  projectId: "derrastore",
  storageBucket: "derrastore.appspot.com",
  messagingSenderId: "70390486239",
  appId: "1:70390486239:web:f0e884d634f8114597856a"
};

let currentUser
let register = false
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

//Klaidu sarasas registracijos metu
let errList = []
let errs = document.querySelector(".errs");

//Prisijungimo islaikymas perkrovus puslapi
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
//register dalis 

//-Rasymas i duombaze kuri yra different nuo authentication duombazes, su papildomais duomenis
function writeUserData(data) {
  console.log(currentUser)
  const db = getDatabase();
  set(ref(db, 'users/' + data.id), {
    username: data.username,
    admin: data.admin,
    email: data.email,
    surname: data.surname,
    country: data.country,
  });
}

let userData = {
  "id": "",
  "admin": true,
  "username": "",
  "surname": "",
  "email": "",
  "country": "",
  "password": ""
}

//- Checkinimas, jei registracijos metu kuris nors input field yra empty
function checkIfEmpty(err, value) {
  console.log(`Value is ${value}`)
  if (value == "" /* || value == "----" */ || value == false) {
    console.log("WRONG");
    errList.push(err)
    return false;
  }
  else {
    return true;
  }
}


document.querySelector("#signUpSubmit").addEventListener("click", function (e) {
  e.preventDefault()
  let result = true
  document.querySelector(".errs").innerHTML = "";
  result = checkIfEmpty("<p>Enter a username</p><br/>", document.querySelector("#reg-username").value)
  result = checkIfEmpty("<p>Enter a surname</p><br/>", document.querySelector("#reg-surname").value)
  result = checkIfEmpty("<p>Enter your email</p><br/>", document.querySelector("#reg-email").value)
  result = checkIfEmpty("<p>Pick a country</p><br/>", document.querySelector("#reg-country").value)
  result = checkIfEmpty("<p>Enter a password</p><br/>", document.querySelector("#reg-password").value)
  result = checkIfEmpty("<p>Repeat your password</p><br/>", document.querySelector("#repeat-password").value)
  result = checkIfEmpty("<p>You must agree to our privacy policy</p><br/>", document.querySelector("#agreement").checked)

  if (document.querySelector("#reg-password").value == document.querySelector("#repeat-password").value) {
  }
  else {
    result = false;
    errList.push("Passwords must match")
  }

  for (let item in errList) {
    errs.innerHTML += errList[item];
  }
  errList = []

  console.log(result)

  if (result) {
    register = true;
    userData.username = document.querySelector("#reg-username").value;
    userData.surname = document.querySelector("#reg-surname").value;
    userData.email = document.querySelector("#reg-email").value;
    userData.country = document.querySelector("#reg-country").value;
    userData.password = document.querySelector("#reg-password").value;
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
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

    //writeUserData(userData) 
    switchPage(0);
  }

})

//register dalies pabaiga


//Kai pasikeicia prisijungimo state (prisijungiama, atsijungiama, etc) suveikianti funkcija
onAuthStateChanged(auth, (user) => {
  //Jeigu user yra prisijunges, naudojama pradinio prisijungimo atveju
  if (user) {
    const uid = user.uid;
    console.log(uid)
    if (register) {
      userData.id = uid;
      writeUserData(userData);
      register = false
    }
    currentUser = user
    document.querySelector('.regBtns').innerHTML = `<li>${currentUser.email}</li>
    <a href="#" class="logoutNav"><li>LOGOUT</li></a>`;
    document.querySelector('.logoutNav').addEventListener("click", function (e) {
      e.preventDefault()
      logout()
    });
    // ...
  } else {
    document.querySelector('.regBtns').innerHTML = `<a href="#" id="loginTag"><li>Login</li></a>
    <a href="#" id="registerTag"><li>Sign up</li></a>`;
    document.querySelector("#registerTag").addEventListener("click", function () {
      switchPage(2);
    });
    document.querySelector("#loginTag").addEventListener("click", function () {
      switchPage(1);
    });
  }
});


//login dalis


//-Prisijungimas prie sistemos
function login() {
  let email = document.querySelector("#log-email").value
  let password = document.querySelector("#log-password").value

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      switchPage(0);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

}

//-Atsijungimas nuo sistemos
function logout() {
  signOut(auth).then(() => {
    console.log("signed out")
    currentUser = null
  }).catch((error) => {
    // An error happened.
  });
}


//-Consoleje ismeta esama user
function checkUser() {
  if (currentUser) {
    const uid = currentUser.uid;
    console.log(uid)
    console.log(currentUser.email)
    console.log(currentUser)
  }

}

document.querySelector("#signInSubmit").addEventListener("click", function (e) {
  e.preventDefault();
  login();
})
// document.querySelector('#logout').addEventListener("click", function (e) {
//   e.preventDefault();
//   logout();
// })

// document.querySelector('#checkUser').addEventListener("click", function (e) {
//   e.preventDefault();
//   checkUser();
// })


//login dalies pabaiga
//Carouseles script

let translate = 0;

let prev = document.querySelector(".prevBtn");
let next = document.querySelector(".nextBtn");

prev.addEventListener("click", function () {
  if (translate > 0) {
    translate -= 25;
    document.querySelector(".inner").style.transform = `translateX(${-translate}%)`;
  }
});
next.addEventListener("click", function () {
  if (translate < 75) {
    translate += 25;
    document.querySelector(".inner").style.transform = `translateX(${-translate}%)`;
  }
})

let prev2 = document.querySelector(".prevBtn2");
let next2 = document.querySelector(".nextBtn2");
let translate2 = 0;

prev2.addEventListener("click", function () {
  if (translate2 > 0) {
    translate2 -= 50;
    if (translate2 == 1) {
      translate2 = 0;
    }
    document.querySelector(".inner2").style.transform = `translateX(${-translate2}%)`;
  }
});
next2.addEventListener("click", function () {
  if (translate2 < 50) {
    translate2 += 50;
    if (translate2 == 99) {
      translate2 = 100;
    };
    document.querySelector(".inner2").style.transform = `translateX(${-translate2}%)`;
  }
})

let prev3 = document.querySelector(".prevBtn3");
let next3 = document.querySelector(".nextBtn3");
let translate3 = 0;

prev3.addEventListener("click", function () {
  if (translate3 > 0) {
    translate3 -= 50;
    if (translate3 == 1) {
      translate3 = 0;
    }
    document.querySelector(".inner3").style.transform = `translateX(${-translate3}%)`;
  }
});
next3.addEventListener("click", function () {
  if (translate3 < 50) {
    translate3 += 50;
    if (translate3 == 99) {
      translate3 = 100;
    }
    document.querySelector(".inner3").style.transform = `translateX(${-translate3}%)`;
  }
})

//Carouseles scripto pabaiga
//Puslapio keitimas

function switchPage(page) {
  if (page == 0) {
    switchingFunction('registerPage', false);
    switchingFunction('loginPage', false);
    switchingFunction('mainPage', true);
  }
  else if (page == 1) {
    switchingFunction('registerPage', false);
    switchingFunction('loginPage', true);
    switchingFunction('mainPage', false);
  }
  else if (page == 2) {
    switchingFunction('registerPage', true);
    switchingFunction('loginPage', false);
    switchingFunction('mainPage', false);
  }
}

function switchingFunction(className, visibility) {
  if (visibility) {
    document.querySelector(`.${className}`).classList.replace('d-none', 'd-default')
  }
  else {
    document.querySelector(`.${className}`).classList.replace('d-default', 'd-none')
  }
}

document.querySelector("#loginTag").addEventListener("click", function () {
  switchPage(1);
})
document.querySelector("#homeTag").addEventListener("click", function () {
  switchPage(0);
})
document.querySelector("#registerTag").addEventListener("click", function () {
  switchPage(2);
})


//Puslapio keitimo pabaiga