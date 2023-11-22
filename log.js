import {  signInWithEmailAndPassword ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";



const email = document.querySelector('.email');
const password = document.querySelector('.password');
const btn = document.querySelector('.btn');


// onauth function start


onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      if (uid === auth.currentUser.uid) {
        window.location = './home.html'
      }
    } 
  });
  
  
  // onauth function end









// sign in function start 

btn.addEventListener('click',(event) =>{
event.preventDefault();
signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    window.location = './home.html'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });

})

// sign in function end 
