import { executor } from '@/api'
export function crmRequest (url, parameter, method = 'get') {
  return executor('crm', url, parameter, method)
}

export const api = {

}
