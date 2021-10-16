<template>
  <div class="form__container">
    <div class="form-header">
      <div class="form-header__title">
        <h2 class="form-header__text">Đăng ký</h2>
      </div>
    </div>
    <div class="form-content">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item class="form-item">
          <a-input
            placeholder="Số điện thoại"
            class="form-input"
            size="large"
            v-decorator="[
              'number_phone',
              {
                rules: [
                  {
                    required: true,
                    message: 'Số điện thoại không được để trống !'
                  },
                  {
                    pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
                    message: 'Số điện thoại không hợp lệ'
                  }
                ]
              }
            ]"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            size="large"
            class="login-form-button"
            html-type="submit"
            :loading="this.loading"
          >
            Tiếp theo
          </a-button>
        </a-form-item>
      </a-form>
      <div class="wrap-forgot-password">
        <a class="forgot-password" href="#">Quên mật khẩu</a>
        <a class="login-sms" href="#">Đăng nhập với SMS</a>
      </div>
    </div>
    <!-- <social-login /> -->
    <div class="form-footer">
      <div class="form-footer__content">
        <span class="form-footer__text">Bạn mới biết đến Shopee?</span>
        <router-link
          class="button-redirect"
          :to="{ name: 'login' }"
        >Đăng nhập</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import socialLogin from '@/components/auth/social-login.vue'
import firebase from 'firebase'
export default {
  components: { socialLogin },
  name: 'Register',
  data () {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      loading: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'register' })
  },

  mounted () {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.

        const appVerifier = window.recaptchaVerifier
        firebase.auth().signInWithPhoneNumber('+84888539611', appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            console.log(confirmationResult)
            window.confirmationResult = confirmationResult
            // ...
          }).catch(res => {
          // Error; SMS not sent
          // ...
          console.error(res)
        })
      },
      'expired-callback': function () {
        console.log('expired-callback')
      }
    })
    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId
    })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.loading = true
          console.log(values)
          setTimeout(() => {
            this.loading = false
          }, 2000)
        } else {
          console.log(err)
        }
      })
    },
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        // eslint-disable-next-line standard/no-callback-literal
        callback('Two passwords that you enter is inconsistent!')
      } else {
        callback()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    }
  }
}
</script>

<style>
</style>
