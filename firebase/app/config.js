// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkvultaBepxTfVR2X672L46HtR6My8mW8",
  authDomain: "basetcc-570e6.firebaseapp.com",
  projectId: "basetcc-570e6",
  storageBucket: "basetcc-570e6.appspot.com",
  messagingSenderId: "82761107010",
  appId: "1:82761107010:web:8661168173299bdb3dcfdb",
  measurementId: "G-L2SSDRELM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;

const googleLogin = document.querySelector("#googleLogin")

googleLogin?.addEventListener("click", (e)=>{
  e.preventDefault()
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider).then(()=>{
    window.location.href = "/pages/clients2.html"
  })
})

const loginEmail = document.querySelector("#loginEmail")

loginEmail?.addEventListener("click", (e)=>{
  e.preventDefault()
  const email = document.querySelector("#username").value
  const senha = document.querySelector("#password").value
  signInWithEmailAndPassword(auth, email, senha).then(()=>{
    window.location.href = "/pages/clients2.html"
  })
})

const cadastrarBtn = document.querySelector("#cadastrarBtn")

cadastrarBtn?.addEventListener("click", (e)=>{
  e.preventDefault()
  const email = document.querySelector("#email").value
  const senha = document.querySelector("#senha").value
  createUserWithEmailAndPassword(auth, email, senha).then(()=>{
    window.location.href = "/pages/clients2.html"
  })
})
