
import {
    onAuthStateChanged,
    signOut
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
  import {
    auth,
    db
  } from "./config.js";
  import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
    deleteDoc,
    doc,
    updateDoc
  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
  
  const btn = document.querySelector('.signout');
  const title = document.querySelector('.title');
  const des = document.querySelector('.des');
  const submit = document.querySelector('.submitbtn');
  const div = document.querySelector('.render');
  
  let arr = [];
  
  // onauth functions start
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    }
  });
  // onauth functions end
  
  // sign out function start
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    signOut(auth).then(() => {
      console.log('logout successfully');
      window.location = './log.html';
    }).catch((error) => {
      console.log(error);
    });
  });
  // sign out function end
  
  // render function start
  function renderpost() {
    div.innerHTML = '';
    arr.forEach((item, index) => {
      div.innerHTML += `
        <div>
          Title: ${item.Title}<br>
          Description: ${item.Description}<br>
          <button type="button" data-index="${index}" class="btn btn-danger text-white delete">Delete</button>
          <button type="button" data-index="${index}" class="btn btn-info text-white update">Edit</button>
        </div>
        <hr>`;
    });
  
    const delButtons = document.querySelectorAll('.delete');
    const updButtons = document.querySelectorAll('.update');
  
    delButtons.forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        const index = event.target.dataset.index;
        console.log('delete called', arr[index]);
        await deleteDoc(doc(db, 'posts', arr[index].Docid));
      });
    });
  
    updButtons.forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        const index = event.target.dataset.index;
        console.log('update called', arr[index]);
        const updatedTitle = prompt('Enter new Title', arr[index].Title);
        if (updatedTitle !== null) {
          await updateDoc(doc(db, 'posts', arr[index].Docid), {
            Title: updatedTitle
          });
        }
      });
    });
  }
  // render function end
  
  // get data from firestore start
  async function getdatafirestore() {
    const q = query(collection(db, "posts"), orderBy('PostDate', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({
          ...doc.data(),
          Docid: doc.id
        });
      });
      console.log(arr);
      renderpost();
    });
  
    return unsubscribe;
  }
  const unsubscribeFirestore = getdatafirestore();
  // get data from firestore end
  
  // add data on firestore function start
  submit.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      const postObj = {
        Title: title.value,
        Description: des.value,
        Uid: auth.currentUser.uid,
        PostDate: Timestamp.fromDate(new Date())
      };
      await addDoc(collection(db, "posts"), postObj);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });
  // add data on firestore function end
  
  // Unsubscribe from the Firestore listener when the page is unloaded
  window.addEventListener('beforeunload', () => {
    unsubscribeFirestore();
  });
  










