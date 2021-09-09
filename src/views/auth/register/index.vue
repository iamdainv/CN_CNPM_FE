<template>
    <div class="form__container">
        <div class="form-header">
            <div class="form-header__title">
                <h2 class="form-header__text">Đăng ký</h2>
            </div>
        </div>
        <div class="form-content">
            <a-form :form="form" @submit="handleSubmit">
                <a-form-item>
                    <a-input
                        placeholder="First Name"
                        size="large"
                        v-decorator="[
                            'firstname',
                            {
                            rules: [
                                { required: true, message: 'Please input your first name!' },
                            ],
                            },
                        ]"
                    />
                </a-form-item>
                <a-form-item>
                    <a-input
                        placeholder="Last Name"
                        size="large"
                        v-decorator="[
                            'lastname',
                            {
                            rules: [
                                { required: true, message: 'Please input your last name!' },
                            ],
                            },
                        ]"
                    />
                </a-form-item>
                <a-form-item class="form-item">
                    <a-input
                        placeholder="Email"
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
                    </a-input>
                </a-form-item>
                <a-form-item has-feedback>
                    <a-input
                        placeholder="Password"
                        size="large"
                        v-decorator="[
                            'password',
                            {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: validateToNextPassword,
                                },
                            ],
                            },
                        ]"
                        type="password"
                    />
                </a-form-item>
                <a-form-item
                    has-feedback
                >
                    <a-input
                    placeholder="Confirm Password"
                    size="large"
                    v-decorator="[
                        'confirm',
                        {
                        rules: [
                                {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: compareToFirstPassword,
                            },
                        ],
                        },
                    ]"
                    type="password"
                    @blur="handleConfirmBlur"
                    />
                </a-form-item>
                <a-form-item>
                    <a-button size="large" class="login-form-button" html-type="submit" :loading="this.loading">
                        Đăng ký
                    </a-button>
                </a-form-item>
            </a-form>
            <div class="wrap-forgot-password">
                <a class="forgot-password" href="#">Quên mật khẩu</a>
                <a class="login-sms" href="#">Đăng nhập với SMS</a>
            </div>
        </div>
        <div class="form-footer">
            <div class="form-footer__content">
                <span class="form-footer__text">Bạn mới biết đến Shopee?</span>
                <router-link class="button-redirect" :to="{ name: 'login' }">Đăng nhập</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'register',
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
