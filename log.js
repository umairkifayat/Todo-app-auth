import { onAuthStateChanged,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";





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




//  log in function start

const email = document.querySelector('.email');
const password = document.querySelector('.password');
const form = document.querySelector('.btn');
form.addEventListener('click',(event)=>{
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
















