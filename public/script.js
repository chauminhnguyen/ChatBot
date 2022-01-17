// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-analytics.js";

import json_data from './keys.json' assert { type: "json" };

const firebaseConfig = {
apiKey: json_data.apiKey,
authDomain: json_data.authDomain,
databaseURL: json_data.databaseURL,
projectId: json_data.projectId,
storageBucket: json_data.storageBucket,
messagingSenderId: json_data.messagingSenderId,
appId: json_data.appId,
measurementId: json_data.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

// const getDatabase, ref, set = require("firebase/database")
// import { getDatabase, ref, set } from "./firebase/database";

// import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js"
import { getFirestore, collection, getDocs, updateDoc, doc, arrayUnion} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js"

// const db = getDatabase();
const db = getFirestore();

var vue = new Vue({
  el: '#wel',
  data: {
    name_: 'user',
    inputs: [],
    text: "",
    response: ""
  },
  
  methods: {
    async addInputs() {
      const history_ref = doc(db, "user/history");
      await updateDoc(history_ref, {
        history: arrayUnion(this.text)
      });
      this.inputs.push(this.text)

      const rawResponse = await fetch('http://127.0.0.1:5000/chatbot', 
      {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: this.text
        })
      });
      this.response = await rawResponse.json();

      this.inputs.push(this.response.data['bot']);
      setInterval(updateScroll,100)
    },

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

function updateScroll(){
  var element = document.getElementById("chat-area");
  element.scrollTop = element.scrollHeight;
}