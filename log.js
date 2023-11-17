import { onAuthStateChanged,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";



const email = document.querySelector('.email');
const form = document.querySelector('.form');
const password = document.querySelector('.password');





//  log in function start
form.addEventListener('submit',(event)=>{
    event.preventDefault()
            signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
  });

        })
//  log in function end







        // ouauthfunction start
    onAuthStateChanged(auth, (user) => {
        if (user) {
         
                const uid = user.uid ;
              if (uid === auth.currentUser.uid) {
                    window.location = './home.html'
                
                }
              }
              // 
            });
        // ouauthfunction end
