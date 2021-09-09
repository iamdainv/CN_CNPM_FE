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
                                        required: true, message: 'Please input your email!'
                                    },
                                    {
                                        type: 'email',
                                        required: true, message: 'Please enter the correct email format!'
                                    },
                                ],
                            },
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
                                { required: true, message: 'Please input your Password!' },
                            ],
                            },
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
            <!-- <div>
                <div class="IFLxoY">
                <div class="_3svg61"></div>
                <span class="_1ZEpVL">HOẶC</span>
                <div class="_3svg61"></div>
                </div>
                <div class="_1ix216">
                <button class="dJsOUU _1A307B _1hKScg _1A307B _2ph_NL">
                    <div class="_1b1OLX">
                    <div
                        class="_1JEYOo social-white-background social-white-fb-png"
                    ></div>
                    </div>
                    <div class="_1iDCwS _28-Tq8">Facebook</div></button
                ><button class="dJsOUU _1A307B _1hKScg _1A307B _1SPkQc">
                    <div class="_1b1OLX _35Loth">
                    <div
                        class="_1o_kg_ social-white-background social-white-google-png"
                    ></div>
                    </div>
                    <div class="_1iDCwS">Google</div></button
                ><button class="dJsOUU _1A307B _1hKScg _1A307B nvH7Oz">
                    <div class="_1b1OLX">
                    <div
                        class="_1JEYOo social-white-background social-white-apple-png"
                    ></div>
                    </div>
                    <div class="_1iDCwS">Apple</div>
                </button>
                </div>
            </div> -->
        </div>
        <div class="form-footer">
            <div class="form-footer__content">
                <span class="form-footer__text">Bạn mới biết đến Shopee?</span>
                <router-link class="button-redirect" :to="{ name: 'register' }">Đăng ký</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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

</style>
