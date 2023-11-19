import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { addDoc, collection, getDocs,Timestamp, query, where,orderBy,deleteDoc, doc, updateDoc, } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const title = document.querySelector('.title');
const des = document.querySelector('.des');
const submit = document.querySelector('.submit');
const sign = document.querySelector('.signout');
const div1 = document.querySelector('.container');
const div = document.querySelector('.div');

// console.log(div);



// ouauthfunction start
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid); 
    const q = query(collection(db, "posts"), where("uid", '==', uid));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      div.innerHTML = `hello ${doc.data().name}`
    })
    // console.log(docId);

  } else {
    window.location = './index.html'
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






//  render data function start
let arr = []
function renderpost(params) {
  arr.value = ''
  arr.map((item) => {
    div1.innerHTML += `
    <div >
    <div>
        <p><span>Title:</span>${item.Title}</p>
        <p><span>Description:</span>${item.Description}</p>
        <button type="button" id="delete" >Delete</button>
        <button type="button" id="update>Edit</button>
    </div>
</div>`
})

const del = document.querySelectorAll('#delete');
const upd = document.querySelectorAll('#update');

del.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
        console.log('delete called', arr[index]);
        await deleteDoc(doc(db, "posts", arr[index].docId))
            .then(() => {
                console.log('post deleted');
                arr.splice(index, 1);
                renderpost()
            });
    })
})
upd.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
        console.log('update called', arr[index]);
        const updatedTitle = prompt('enter new Title');
        await updateDoc(doc(db, "posts", arr[index].docId), {
            Title: updatedTitle
        });
        arr[index].Title = updatedTitle;
        renderpost()

    })
})
}

//  render data function end






// get data fromfirestore start 
async function getdata() {
  const q = query(collection(db, "posts"), orderBy('PostDate', 'desc'));
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), docId: doc.id });
    // console.log(doc.data(),doc.id);
    
  })
  renderpost()
  console.log(arr);
}
getdata()

// get data fromfirestore end 













// post data on firestore start



submit.addEventListener('click', async (event) => {
  event.preventDefault()

  try {
    const postObj = {
      Title: title.value,
      Description: des.value,
      uid: auth.currentUser.uid,
      PostDate: Timestamp.fromDate(new Date())
    }
    

      const docRef = await addDoc(collection(db, "posts"), postObj);
    console.log("Document written with ID: ", docRef.id);
    postObj.docId = docRef.id;
    arr = [postObj, ...arr];
    console.log(arr);
    renderpost();
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

})
// post data on firestore end
