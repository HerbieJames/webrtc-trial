import './style.css'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA1LcpMILrp3lenqNVlfzwsDsnqus52nR4",
  authDomain: "webrtc-trial-1b8c5.firebaseapp.com",
  projectId: "webrtc-trial-1b8c5",
  storageBucket: "webrtc-trial-1b8c5.firebasestorage.app",
  messagingSenderId: "937727585015",
  appId: "1:937727585015:web:dad9fa975cc39d2c82c1f2"
};

const app = initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const servers = {
  iceServers: [
    {
      urls: ["stun.root-1.de:3478", "stun.1cbit.ru:3478"]
    },
  ],
  iceCandidatePoolSize: 10
}

let pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

const webcamVideo = document.getElementById("localFootage");
const remoteVideo = document.getElementById("remoteFootage");
const callButton = document.getElementById("callBtn");
const callInput = document.getElementById("callInput");
const webcamButton = document.getElementById("webcamBtn");
const hangupButton = document.getElementById("hangUpBtn");
const answerButton = document.getElementById("answerBtn");