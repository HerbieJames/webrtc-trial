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

const servers = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun2.l.google.com:19302"]
    },
  ],
  iceCandidatePoolSize: 10
}

let pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

const callInput = document.getElementById("callInput");
const callButton = document.getElementById("callBtn");
const webcamVideo = document.getElementById("localFootage");
const remoteVideo = document.getElementById("remoteFootage");
const webcamButton = document.getElementById("webcamBtn");
const hangupButton = document.getElementById("hangUpBtn");
const answerButton = document.getElementById("answerBtn");

// 1. Setup media sources

webcamButton.onclick = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true});
  remoteStream = new MediaStream();

  // Push tracks from local stream to peer connection
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });

  // Push tracks from remote stream, add to video stream
  pc.ontrack = event => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  }

  webcamVideo.srcObject = localStream;
  remoteVideo.srcObject = remoteStream;
}