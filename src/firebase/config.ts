import firebase from "firebase";
import 'firebase/firestore'

// se for maior que 0 significa que ja foi inicializado
// esse if é como se length for 0
if(!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    })
}

export default firebase