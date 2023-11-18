import { onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db  } from "./config.js";
import { addDoc,collection } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const sign = document.querySelector('.signout');


        // ouauthfunction start
        onAuthStateChanged(auth, (user) => {
            if (user) {
             
                    const uid = user.uid ;
            console.log(uid);   
                  }
            
                });
            // ouauthfunction end




            // logout start 
         sign.addEventListener('click', () => {
                signOut(auth).then(() => {
                  console.log('logout successfully');
                  window.location = './index.html';
                }).catch((error) => {
                  console.log(error);
                });
              });
                          // logout end 






                          


const title = document.querySelector('.title');
const des = document.querySelector('.des');
const submit = document.querySelector('.submit');


submit.addEventListener('click',async (event)=>{
event.preventDefault()

try {
    const docRef = await addDoc(collection(db, "posts"), {
    Title : title.value,
    Description : des.value,
    uid: auth.currentUser.uid,

    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})