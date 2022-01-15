// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-analytics.js";

const firebaseConfig = {
apiKey: "AIzaSyCMCzqjcdGEoettJ-zBQN1-rIuWdvZJuEk",
authDomain: "my-project-1585217513267.firebaseapp.com",
databaseURL: "https://my-project-1585217513267-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "my-project-1585217513267",
storageBucket: "my-project-1585217513267.appspot.com",
messagingSenderId: "886979474055",
appId: "1:886979474055:web:0aca84c17ab82b15383e22",
measurementId: "G-Z43XKMG7VX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

// const getDatabase, ref, set = require("firebase/database")
// import { getDatabase, ref, set } from "./firebase/database";

// import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js"
import { getFirestore, collection, getDocs, updateDoc, doc} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js"

// const db = getDatabase();
const db = getFirestore();

var vue = new Vue({
  el: '#wel',
  data: {
    name_: 'user'
  },
  
  methods: {
    async clickBtn() {
      const name_ref = doc(db, "user/user_info");
      await updateDoc(name_ref, {
        name : this.name_
      });
    }
  },

  async created() {
    const querySnapshot = await getDocs(collection(db, 'user'));
    querySnapshot.forEach((doc) => {
      this.name_ = doc.data()['name'];
    });
  }
});