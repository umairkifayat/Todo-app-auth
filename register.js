import {createUserWithEmailAndPassword   } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";
// console.log(auth)



const email = document.querySelector('.email');
const nam = document.querySelector('.names');
const form = document.querySelector('.form');
const password = document.querySelector('.password');


form.addEventListener('submit',(event)=>{
event.preventDefault();
createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    window.location = './home.html'
    // ...
    // console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);

    // ..
  });

})
