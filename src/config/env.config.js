export const envConfig = {
   baseUrl: process.env.VUE_APP_BASE_URL,
  // baseUrl: 'https://615aa0344a360f0017a8114b.mockapi.io/shobbe/api/',

  // -------------------------------------
  // firebase
  // -------------------------------------
  firebaseApiKey: process.env.VUE_APP_API_KEY,
  firebaseAuthDomain: process.env.VUE_APP_AUTH_DOMAIN,
  firebaseProjectId: process.env.VUE_APP_PROJECT_ID,
  firebaseStorageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  firebaseMessagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  firebaseAppId: process.env.VUE_APP_APP_ID,
  firebaseMeasurementId: process.env.VUE_APP_MEASUREMENT_ID
}
