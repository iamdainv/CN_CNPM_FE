<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <div style="background-color: #f5f5f5;"><router-view /></div>
    </div>
  </a-config-provider>
</template>

<script>
import '@/assets/css/index.scss'
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'
import '@/utils/mixins'
import store from '@/store'
import { loginByToken } from '@/api/user/auth'

export default {
  data () {
    return {}
  },
  computed: {
    locale () {
      // Update the title when switching languages
      const { title } = this.$route.meta
      title && setDocumentTitle(`${i18nRender(title)} - ${domTitle}`)
      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    }
  },
  mounted () {
    const token = this.$cookies.get('token')
    if (token) {
      loginByToken(token).then(response => {
        const { data } = response.data
        store.commit('SET_INFO', data)
      }).catch(_ => {
        this.$cookies.remove('token')
      })
    }
  }
}
</script>
