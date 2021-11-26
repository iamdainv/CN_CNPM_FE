<template>
  <blank-layout>
    <div class="container">
      <div class="limiter">
        <div class="container-login">
          <div class="wrap-login">
            <a-row :gutter="16" style="width: 100%;">
              <img src="~@/assets/vnpost_logo.svg" class="logo" alt="logo">
              <a-form
                id="formLogin"
                class="user-layout-login"
                ref="formLogin"
                :form="form"
                @submit="handleSubmit"
              >
                <a-form-item>
                  <a-input
                    size="large"
                    type="text"
                    class="input"
                    :placeholder="$t('user.login.username.placeholder')"
                    v-decorator="[
                      'username',
                      {rules: [{ required: true, message: $t('user.userName.required') }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
                    ]"
                  >
                    <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
                  </a-input>
                </a-form-item>

                <a-form-item>
                  <a-input-password
                    size="large"
                    :placeholder="$t('user.login.password.placeholder')"
                    v-decorator="[
                      'password',
                      {rules: [{ required: true, message: $t('user.password.required') }], validateTrigger: 'blur'}
                    ]"
                  >
                    <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
                  </a-input-password>
                </a-form-item>
                <a-form-item style="margin-top:24px">
                  <a-button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    class="login-form-btn"
                    :loading="state.loginBtn"
                    :disabled="state.loginBtn"
                  >{{ $t('user.login.login') }}
                  </a-button>
                </a-form-item>

              </a-form>
            </a-row>
          </div>
        </div>
      </div>
    </div>
  </blank-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import BlankLayout from './BlankLayout.vue'

export default {
  components: {
    BlankLayout
  },
  data () {
    return {
      loginBtn: false,
      loginType: 0,
      isLoginError: false,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey = ['username', 'password']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const loginParams = { ...values }
          loginParams['clientId'] = 'o2oService'
          Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess (res) {
      this.$router.push({ path: '/' })
      setTimeout(() => {
        this.$notification.success({
          message: 'Xin chào',
          description: `${timeFix()}`
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: 'Lỗi',
        description: err.message || 'Đã có lỗi xảy ra',
        duration: 4
      })
    }
  }
}
</script>

<style lang='less'>
@import "login";

.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
