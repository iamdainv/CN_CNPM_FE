import { apiService } from '@/api/api'
import { api } from '@/api/user/index'

export async function login (loginParam, typeLogin = null) {
  const loginUserParam = {
    ...loginParam,
    loginType: typeLogin
  }

  // eslint-disable-next-line no-return-await
  return await apiService.post(api.login, loginUserParam)
}

export async function loginByToken (accessToken) {
  const param = {
    token: accessToken
  }
  return apiService.post(api.loginByToken, param)
}
