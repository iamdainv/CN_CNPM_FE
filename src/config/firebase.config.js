import firebase from 'firebase'
import { envConfig } from './env.config'
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: envConfig.firebaseApiKey,
  authDomain: envConfig.firebaseAuthDomain,
  projectId: envConfig.firebaseProjectId,
  storageBucket: envConfig.firebaseStorageBucket,
  messagingSenderId: envConfig.firebaseMessagingSenderId,
  appId: envConfig.firebaseAppId,
  measurementId: envConfig.firebaseMeasurementId
}
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase
