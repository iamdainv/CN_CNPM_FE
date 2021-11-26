import antdEnUS from 'ant-design-vue/es/locale-provider/vi_VN'
import momentEU from 'moment/locale/vi'
import global from './vi-VN/global'

import menu from './vi-VN/menu'
import setting from './vi-VN/setting'
import user from './vi-VN/user'

import dashboard from './vi-VN/dashboard'
import form from './vi-VN/form'
import result from './vi-VN/result'
import account from './vi-VN/account'

import organization from '@/locales/lang/vi-VN/organization/organization'
const components = {
  antLocale: antdEnUS,
  momentName: 'vi',
  momentLocale: momentEU
}

export default {
  message: '-',

  'layouts.usermenu.dialog.title': 'Message',
  'layouts.usermenu.dialog.content': 'Bạn có chắc chắn muốn đăng xuất không?',
  'layouts.userLayout.title': 'VNPOST',
  ...components,
  ...global,
  ...menu,
  ...setting,
  ...user,
  ...dashboard,
  ...form,
  ...result,
  ...account,
  ...organization
}
