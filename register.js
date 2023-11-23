import { createUserWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth,db, storage } from "./config.js";
import {collection, addDoc  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {  ref, uploadBytes ,getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
// import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'

const nam = document.querySelector('.username');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const btn = document.querySelector('.btn');
const img = document.querySelector('.file');







// log in function start
 
btn.addEventListener('click',(event)=>{
event.preventDefault();
createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    // console.log(user);
    const storageRef = ref(storage, nam.value);

// 'file' comes from the Blob or File API
const file = img.files[0]

uploadBytes(storageRef, file).then(() => {
  getDownloadURL(storageRef(url))
  .then((url) => {
    addDoc(collection(db, "users"), {
      name: nam.value,
      email: email.value,
      uid: user.uid,
      profileUrl: url
  }).then((res) => {
      console.log(res);
      window.location = 'log.html'
  }).catch((err) => {
      console.log(err);
  })
 
   
  })
  .catch((error) => {
    // Handle any errors
  });
});

    
    window.location = './home.html'
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
})

// log in function end


