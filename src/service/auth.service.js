import firebase from '@/config/firebase.config'
import { login as loginApi } from '@/api/user/auth'
import { loginType } from '@/const/app.const'

class AuthService {
  socialMediaAuth (provider, callback) {
    return firebase.auth().signInWithPopup(provider).then(response => {
      const { credential, additionalUserInfo, user, operationType } = response
      console.log(credential, additionalUserInfo, user, operationType)
      return response.user
    }).catch(callback)
  }

  async handleUserLoginOrRegisterSocial (userLoginParam, typeLogin) {
    // const { photoURL,
    //   email,
    //   firstname,
    //   lastname } = userLoginParam

    // eslint-disable-next-line no-return-await
    return await loginApi(userLoginParam, typeLogin)
  }

  async handleLoginByNumberPhone (phoneNumber, password) {
    // const { photoURL,
    //   email,
    //   firstname,
    //   lastname } = userLoginParam

    const loginParam = {
      phoneNumber, password
    }

    // eslint-disable-next-line no-return-await
    return await loginApi(loginParam, loginType.NUMBER_PHONE)
  }
}

export const authService = new AuthService()
