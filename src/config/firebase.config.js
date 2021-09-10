import firebase from 'firebase'

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBy83QtIcQKvzXktb4AwWr51rGpObQ6-dw',
  authDomain: 'shobbe-a305f.firebaseapp.com',
  projectId: 'shobbe-a305f',
  storageBucket: 'shobbe-a305f.appspot.com',
  messagingSenderId: '320273411730',
  appId: '1:320273411730:web:dd7b9009e96ea491e0404b',
  measurementId: 'G-RVTSFWCDPD'
}
console.log('firebase', firebase)
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase
