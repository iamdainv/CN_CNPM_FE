import firebase from '@/config/firebase.config'
class AuthService {
  socialMediaAuth (provider) {
    return firebase.auth().signInWithPopup(provider).then(response => {
      const { credential, additionalUserInfo, user, operationType } = response
      console.log(credential, additionalUserInfo, user, operationType)
      return response.user
    })
  }
}

export const authService = new AuthService()
