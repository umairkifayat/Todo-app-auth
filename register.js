import { createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";

const email = document.querySelector('.email');
const password = document.querySelector('.password');
const btn = document.querySelector('.btn');







// log in function start
 
btn.addEventListener('click',(event)=>{
event.preventDefault();
createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    window.location = './home.html'
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
})

// log in function end


