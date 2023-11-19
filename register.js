import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";



const email = document.querySelector('.email');
const nam = document.querySelector('.names');
// const img = document.querySelector('.img');
const form = document.querySelector('.form');
const password = document.querySelector('.password');


form.addEventListener('submit', (event) => {
  event.preventDefault();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // console.log(user);
      addDoc(collection(db, 'posts'), {
        name: nam.value,
        email: email.value,
        uid: user.uid,
      }).then((res) => {
        window.location = './home.html'
        console.log(res);
      }).catch((error) => {
        console.log(error);
        email.value = ''
        password.value = ''
        email.value = ''
      })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        })
    })

})
// });

// })


// });

// )}
