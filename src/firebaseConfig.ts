import * as firebase from 'firebase'
import { toast } from './toast'

//credentials
const config = {
    apiKey: "AIzaSyADpR83z0E2y16chOn3DtZ34prGl22TEXI",
    authDomain: "contact-app-ionic.firebaseapp.com",
    projectId: "contact-app-ionic",
    storageBucket: "contact-app-ionic.appspot.com",
    messagingSenderId: "259970694720",
    appId: "1:259970694720:web:7886e6f20d9d3d31f0e9a5",
    measurementId: "G-P9JBTD2HNL"
}


//init firebase
firebase.default.initializeApp(config)


//authenticate
export async function loginUser(email: string, password: string) {

    try {
        const res = await firebase.default.auth().signInWithEmailAndPassword(email, password)
        return res
    } catch (err) {
        toast(err.message)
        return false
    }

}

//register user
export async function registerUser(email: string, password: string) {

    try {
        const res = await firebase.default.auth().createUserWithEmailAndPassword(email, password)

        return res
    } catch (err) {
        toast(err.message)
        return false
    }
}

//modify email
export async function updateEmailUser(user: string) {
    try {
        const res = await firebase.default.auth().currentUser?.updateEmail(user)
    } catch (err) {
        toast(err.message)
        return false
    }
}

//user informations
export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsub = firebase.default.auth().onAuthStateChanged(function (user) {
            if (user) {
                resolve(user)
            } else {
                resolve(null)
            }
            unsub()
        })
    })
}

//logout
export function logOutUser() {
    return firebase.default.auth().signOut
}