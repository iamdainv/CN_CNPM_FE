<template>
    <div class="auth-header">
        <div class="wrap-brand">
            <img src="@/assets/img/LogoAuth.svg" class="img-brand"/>
            <h1 class="auth-header__title">Đăng nhập / Đăng ký</h1>
        </div>
        <div class="auth-header__help">Bạn cần trợ giúp?</div>
    </div>
</template>

<script>
export default {
    name: 'header-auth'
}
</script>

<style>
    .auth-header {
        width: 100%;
        height: 90px;
        padding: 0 100px;
        background-color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .wrap-brand {
        flex: 1;
        display: flex;
        align-items: center;
    }
    .img-brand {
        height: 60px;
        transform: translateY(-10px);
    }
    .auth-header__title {
        margin: 0 20px;
    }
    .auth-header__help {
        cursor: pointer;
        color: rgb(238,77,45);
    }
</style>
