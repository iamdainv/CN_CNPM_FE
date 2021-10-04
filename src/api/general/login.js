import { authUrl, generalRequest } from '@/api/general'

export function login (parameter) {
  return generalRequest(authUrl.login, parameter, 'post')
}

export function getInfo () {
  return generalRequest(authUrl.userInfo)
}

export function getCurrentUserNav () {
  return generalRequest(authUrl.userMenu)
}

export function logout (data) {
  return generalRequest(authUrl.logout, data, 'post')
}
