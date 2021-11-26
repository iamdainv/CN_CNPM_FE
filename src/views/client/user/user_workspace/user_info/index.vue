<template>
  <div class="purchase-list-page__empty-page-wrapper p-5 flex-1  h-full">
    <div>
      <h2>Hồ Sơ Của Tôi</h2>
      <p class="text-muted">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

    </div>
    <hr />
    <div class="d-flex p-3">
      <div class="d-flex flex-column flex-70" style="flex: 1;padding: 0 40px;">
        <div class="form-group d-flex form-field-item" style="align-items: center;">
          <p class="control-label text-field" htmlfor="product_quantity" style="margin: 0 10px 0 0;">Tên</p>

          <input
            id="firstname"
            name="product_quantity"
            placeholder="Full Name"
            class="form-control col-md-8 input-md"
            type="text"
            :value="firstName + ' ' + lastName "
            style="
                    flex-shrink: 1;
                    font-size: 14px;"
          >

        </div>

        <!--        <div class="form-group d-flex form-field-item" style="align-items: center; ">-->
        <!--          <p-->
        <!--            class="control-label text-field"-->
        <!--            htmlfor="product_quantity"-->
        <!--            style="margin: 0 10px 0 0;">Last Name</p>-->

        <!--          <input-->
        <!--            id="lastname"-->
        <!--            name="product_quantity"-->
        <!--            placeholder="Last Name"-->
        <!--            class="form-control col-md-8 input-md"-->
        <!--            type="text"-->
        <!--            style="-->
        <!--                    flex-shrink: 1;-->
        <!--                    font-size: 14px;"-->
        <!--            :value="$store.getters.userInfo.lastName"-->
        <!--          >-->

        <!--        </div>-->
        <div class="form-group d-flex form-field-item" style="align-items: center;">
          <p
            class="control-label text-field"
            htmlfor="product_quantity"
            style="margin: 0 10px 0 0;">Email
          </p>
          <div
            class="control-label"
            htmlfor="product_quantity"
            v-if="email"
            style="margin: 0 10px 0 0;"> <span>
                                           {{ email }}
                                         </span>
            <span class="control-label button__change-value"> Thay đổi </span>
          </div>
          <div v-else>
            <p
              class="control-label button__change-value"
              htmlfor="product_quantity"

              style="margin: 0 10px 0 0;"> Thêm
            </p>
          </div>
        </div>

        <div class="form-group d-flex form-field-item" style="align-items: center;">
          <p
            class="control-label text-field"
            htmlfor="product_quantity"
            style="margin: 0 10px 0 0;">Số điện thoại
          </p>
          <div
            class="control-label"
            htmlfor="product_quantity"
            v-if="numberPhone"
            style="margin: 0 10px 0 0;"> <span>
                                           {{ numberPhone }}
                                         </span>
            <span class="control-label button__change-value"> Thay đổi </span>
          </div>
          <div v-else>
            <p
              class="control-label button__change-value"
              htmlfor="product_quantity"

              style="margin: 0 10px 0 0;"> Thêm
            </p>
          </div>

        </div>

        <div class="form-group d-flex form-field-item" style="align-items: center;">
          <p
            class="control-label text-field"
            htmlfor="product_quantity"
            style="margin: 0 10px 0 0;">Tên Shop
          </p>

          <input
            id="shopname"
            name="product_quantity"
            placeholder="Last Name"
            class="form-control col-md-8 input-md"
            type="text"
            style="
                    flex-shrink: 1;
                    font-size: 14px;"
            :value="shopName"
          >

        </div>

        <div class="d-flex" style="    padding-left: calc(20% + 1.25rem);" @click="onUpdateInfoUser">
          <button type="button" class="h-button__red h-color__white cursor-pointer btn-save" id="btn-save-user">Lưu</button>
        </div>
      </div>
      <div style="width: 26.5rem; border-left: 1px solid #efefef;">
        <div class="d-flex flex-column justify-content-center align-center align-items-center " style="margin: 0px 46px;">
          <div
            class="d-flex justify-content-end avatar-uploader__avatar-image comment__image rounded-circle"
            id="user-image"
            style="
                    width: 100px;
                    height: 100px;
                    margin-right: 0;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;"
            :style="{ backgroundImage: `url(${ photoUrl})`}"
          ></div>
          <div class=" p-2 btn-light cursor-pointer mt-4">
            <span class="mx-2 " id="btn-choose-image-user" @click="openFolderChoosePicture">
              Chọn ảnh
            </span>
            <input ref="inputChoosePicture" class="avatar-uploader__file-input" type="file" accept=".jpg,.jpeg,.png" @change="userChoosePhotoFromLocal">
          </div>
          <p class="text-muted mt-3">
            Dụng lượng file tối đa 1 MB
            Định dạng:.JPEG, .PNG
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { baseMixin } from '@/store/app-mixin'
// import { getUserInfo } from '@/api/user/user'

export default {
  name: 'UserInfo',
  mixins: [baseMixin],

  data: function () {
    return {
      // url preview
      photoUrl: '',
      // file to upload server
      fileImage: null,
      email: '',
      numberPhone: '',
      firstName: '',
      lastName: '',
      shopName: ''
    }
  },

  mounted () {
    // TODO: get user info when login success then update to store
      this.photoUrl = this.$store.getters.userInfo.photoURL
      this.email = this.partialUserEmail
      this.numberPhone = this.partialUserNumberPhone
      this.firstName = this.$store.getters.userInfo.firstName
      this.lastName = this.$store.getters.userInfo.lastName
      this.shopName = this.$store.getters.userInfo.shopName
  },
  methods: {
    openFolderChoosePicture () {
      this.$refs.inputChoosePicture.click()
    },

    userChoosePhotoFromLocal (event) {
      this.photoUrl = URL.createObjectURL(event.target.files[0])
      this.fileImage = event.target.files[0]
    },

    onUpdateInfoUser () {
      const dataUpdateUser = {
        // photoUrl: this.photoUrl,
        email: this.$store.getters.userInfo.email,
        numberPhone: this.$store.getters.userInfo.numberPhone,
        firstName: this.firstName,
        lastName: this.lastName
      }

      if (this.fileImage) dataUpdateUser.fileImage = this.fileImage

      console.log('[MESSAGE.DATA_UPDATE_USER]', dataUpdateUser)
    }
  }
}
</script>

<style>

.text-field{
  flex-basis: 20%;
  text-align: right;
}

.form-field-item{
  margin-bottom: 30px;
}

.button__change-value{
  text-decoration: underline;
  color: #0055aa;
  font-size: 12px;
}

.btn-save{
  height: 40px;
  padding: 0 20px;
  min-width: 70px;
  max-width: 220px;
  border-radius: 5px;
}

</style>
