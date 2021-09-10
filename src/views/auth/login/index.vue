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
            placeholder="Email"
            class="form-input"
            size="large"
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    required: true,
                    required: true,
                    message: 'Please input your email!'
                  },
                  {
                    type: 'email',
                    required: true,
                    message: 'Please enter the correct email format!'
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
            placeholder="Password"
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

export default {
  components: { socialLogin },
  name: 'login',
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
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          setTimeout(() => {
            this.loading = false
          }, 2000)
          console.log(values)
        } else {
          console.log(err)
        }
      })
    }
  }
}
</script>

<style>
.line {
  height: 1px;
  width: 100%;
  background-color: #dbdbdb;
}
.color_gray {
  color: #ccc;
}
.button-facebook {
  background-color: rgb(24, 119, 242);
  color: rgb(255, 255, 255);
}
.button-google {
  background-color: rgb(66, 133, 244);
  color: rgb(255, 255, 255);
}
.button-social__wrapper {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
}

.button__wrapper {
  height: 40px;
  border-radius: 2px;
  flex-basis: 45%;
  justify-content: space-around;
  margin: 4px;
}
.button__wrapper:hover {
  opacity: 0.9;
}
.button-login-google {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.social-icon {
  width: 22px;
  height: 22px;
}
.social-white-background {
  background-image: url("https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/a9e27c05087330a9581e4b9b39ad4417.png");
}

.social-white-fb-png {
  background-size: 372% 232%;
  background-position: 76.4706% 15.1515%;
}
.social-white-gg-png {
  background-size: 516.667% 322.222%;
  background-position: 100% 100%;
}
</style>
