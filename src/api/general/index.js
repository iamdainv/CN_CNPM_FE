import { executor } from '@/api'
export function generalRequest (url, parameter, method = 'get') {
  return executor('general', url, parameter, method)
}

export const authUrl = {
  login: '/auth/login',
  logout: '/auth/logout',
  forgePassword: '/auth/forge-password',
  register: '/auth/register',
  userMenu: '',
  userInfo: ''
}
