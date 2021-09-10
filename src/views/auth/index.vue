<template>
    <div class="auth__container">
        <header-auth></header-auth>
        <div class="auth__content">
            <div class="form__auth">
                <router-view></router-view>
            </div>
        </div>
        <footer-auth></footer-auth>
    </div>
</template>

<script>
import HeaderAuth from '@/components/auth/header'
import FooterAuth from '@/components/auth/footer'
export default {
    name: 'auth',
    components: {
        HeaderAuth,
        FooterAuth
    },
    mounted () {
        const path = this.$route.path
        const target = path.split('/')
        if (!target.some(item => { return item === 'login' || item === 'register' })) {
            this.$router.push({ name: 'login' })
        }
    }
}
</script>

<style>
    :root {
        --primary-color: rgb(238,77,45);
    }
    .auth__container {
        width: 100%;
        min-width: 120rem;
        background-color: rgb(238, 77, 45);
    }
    .auth__content {
        display: flex;
        align-items: center;
        height: 50rem;
        width: 100rem;
        min-height: 60rem;
        margin: 0 auto;

        background-image: url('https://cf.shopee.vn/file/be50c95ee8da6c997d171fc7e7e36712');
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .form__auth {
        display: block;
        margin-left: auto;
        background-color: white;
        border-radius: 5px;
        overflow: hidden;
    }
    .form__container {
        width: 40rem;
        padding: 20px;
    }
    .form-header {
        padding-bottom: 10px;
    }
    .form-header__text {
        font-weight: 520;
    }
    .login-form-button {
        width: 100%;
        background-color: var(--primary-color) !important;
        color: white !important;
        border: none;
        outline: none;
    }
    .wrap-forgot-password {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .forgot-password, .login-sms {
        color: var(--primary-color);
    }
    .form-footer {
        margin-bottom: 5px;
    }
    .form-footer__content {
        display: flex;
        justify-content: center;
    }
    .button-redirect {
        margin-left: 10px;
        color: var(--primary-color) !important;
    }
</style>
