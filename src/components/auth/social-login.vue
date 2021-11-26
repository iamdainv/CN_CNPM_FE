<template>
  <div>
    <div class="flex justify-center items-center my-4">
      <div class="line"></div>
      <span class="font-12 px-4 color_gray">HOẶC</span>
      <div class="line"></div>
    </div>
    <div class="flex justify-between">
      <button
        class="flex button__wrapper button-facebook justify-center items-center"
        :class="isLoadingLoginFacebook && 'currently-logged'"
        @click="loginWithFacebook"
      >
        <div class="button-social__wrapper button-login-facebook">
          <div class="social-white-background social-white-fb-png social-icon"></div>
        </div>
        <div>Facebook</div>
      </button>
      <button
        class="flex button-google button__wrapper justify-center items-center"
        :class="isLoadingLoginGoogle && 'currently-logged'"
        @click="loginWithGoogle"
      >
        <div class="button-social__wrapper button-login-google">
          <div class="social-white-background social-white-gg-png social-icon"></div>
        </div>
        <div>Google</div>
      </button>
      <button
        class="flex button-github button__wrapper justify-center items-center"
        :class="isLoadingLoginGithub && 'currently-logged'"
        @click="loginWithGithub"
      >
        <div class="button-social__wrapper">
          <a-icon type="github" class="social-black-github social-icon font-22" />
        </div>
        <div>Github</div>
      </button>
    </div>
  </div>
</template>

<script>
import { authService } from '@/service/auth.service'
import { facebookProvider, googleProvider, githubProvider } from '@/config/auth-firebase.config'
import { loginType } from '@/const/app.const'
import store from '@/store'
export default {
  name: 'HeaderAuth',

  data () {
    return {
      isLoadingLoginGoogle: false,
      isLoadingLoginFacebook: false,
      isLoadingLoginGithub: false
    }
  },

  methods: {
    hasHistory () { return window.history.length > 2 },
    async handleLogin (loginParam, typeLogin) {
      const userLogin = {
        image: loginParam?.photoURL,
        email: loginParam?.email,
        phoneNumber: loginParam?.phoneNumber ?? '',
        uid: loginParam?.uid,
        firstName: loginParam?.displayName,
        lastName: null,
        address: '',
        googleId: '',
        facebookId: '',
        githubId: '',
        shobbeName: '',
        password: loginParam?.uid
      }

      switch (typeLogin) {
        case loginType.GOOGLE:
          userLogin.googleId = loginParam.uid
          break
        case loginType.FACEBOOK:
          userLogin.facebookId = loginParam.uid
          break
        case loginType.GITHUB:
          userLogin.githubId = loginParam.uid
          break
      }

      await authService.handleUserLoginOrRegisterSocial(userLogin, typeLogin).then(response => {
        const { data, message } = response.data
        if (message === 'Success') {
          store.dispatch('initUser', data)
          this.$emit('getToken', data.token)
          this.hasHistory() ? this.$router.go(-1)
            : this.$router.push({ path: '/' })
        }
      })
    },

    async loginWithFacebook () {
      try {
        // this.isLoadingLoginGoogle = true
        const res = await authService.socialMediaAuth(facebookProvider, () => {
          this.isLoadingLoginGoogle = false
        })
        console.log('response facebook login', res)
        // TODO: Login with facebook
        // await this.handleLogin(res, loginType.FACEBOOK).then(res => {
        //   this.isLoadingLoginFacebook = false
        // })

        this.isLoadingLoginFacebook = false
      } catch (e) {
        console.error('message.error_login_facebook', e)
      }
    },
    async loginWithGoogle () {
      try {
        this.isLoadingLoginGoogle = true
        const res = await authService.socialMediaAuth(googleProvider, () => {
          this.isLoadingLoginGoogle = false
        })

        console.log('response google login', res)

        this.handleLogin(res, loginType.GOOGLE).finally(() => {
          this.isLoadingLoginGoogle = false
        })
      } catch (e) {
        console.error('message.error_login_facebook', e)
      }
    },

    async loginWithGithub () {
      try {
        this.isLoadingLoginGithub = true
        const res = await authService.socialMediaAuth(githubProvider, () => {
          this.isLoadingLoginGithub = false
        })

        console.log('response github login', res)

        this.handleLogin(res, loginType.GITHUB).finally(() => {
          this.isLoadingLoginGithub = false
        })
      } catch (e) {
        console.error('message.error_login_github', e)
      }
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
.button-github {
  background-color: #333;
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
  background-image: url('https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/a9e27c05087330a9581e4b9b39ad4417.png');
}

.social-white-fb-png {
  background-size: 372% 232%;
  background-position: 76.4706% 15.1515%;
}
.social-white-gg-png {
  background-size: 516.667% 322.222%;
  background-position: 100% 100%;
}

.currently-logged {
  opacity: 0.7;
}
</style>
