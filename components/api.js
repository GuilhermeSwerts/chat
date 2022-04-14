import { initializeApp } from 'firebase/app'
import { getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const config = {
    apiKey: "AIzaSyBUK3HWJXCkSD6vpJuFHDB7EOYEsxh_MwM",
    authDomain: "anonymous-chat-c8247.firebaseapp.com",
    projectId: "anonymous-chat-c8247",
    storageBucket: "anonymous-chat-c8247.appspot.com",
    messagingSenderId: "558592310367",
    appId: "1:558592310367:web:e5c7e647420f836d75afea",
    measurementId: "G-8ZBSDBJXE4"
}

const app = initializeApp(config);
const auth = getAuth()
const db = getFirestore()
export {auth,db}