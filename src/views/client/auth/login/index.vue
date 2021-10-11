<template>
  <div class="form__container">
    <div class="form-header">
      <div class="form-header__title">
        <h2 class="form-header__text">Đăng nhập</h2>
      </div>
    </div>
    <div class="form-content">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
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
                    message: 'Số điện thoại không được để trống!'
                  },
                  {
                    pattern: new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
                    message: 'Vui lòng nhập đúng số điện thoại!'
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
        <a-form-item class="form-item">
          <a-input
            class="form-input"
            size="large"
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              }
            ]"
            type="password"
            placeholder="Mật khẩu"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item class="form-item">
          <a-button
            type="primary"
            size="large"
            html-type="submit"
            class="login-form-button"
            :loading="this.loading"
          >
            Đăng nhập
          </a-button>
        </a-form-item>
      </a-form>
      <div class="wrap-forgot-password">
        <a class="forgot-password" href="#">Quên mật khẩu</a>
        <a class="login-sms" href="#">Đăng nhập với SMS</a>
      </div>
      <social-login/>
      <div id="recaptcha-container"></div>
    </div>
    <div class="form-footer">
      <div class="form-footer__content mt-4">
        <span class="form-footer__text">Bạn mới biết đến Shopee?</span>
        <router-link
          class="button-redirect"
          :to="{ name: 'register' }"
        >Đăng ký</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>

import socialLogin from '@/components/auth/social-login.vue'
import { authService } from '@/service/auth.service'

export default {
  components: { socialLogin },
  name: 'Login',
  data () {
    return {
      loading: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },

  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.loading = true
         authService.handleLoginByNumberPhone(values.number_phone, values.password).then(response => {
           this.loading = false
           this.$router.push({ path: '/' })
         })
        } else {
          console.log(err)
        }
      })
    }
  }
}
</script>

<style>

</style>
