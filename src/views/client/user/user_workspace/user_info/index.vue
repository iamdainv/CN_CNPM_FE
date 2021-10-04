<template>
  <div class="purchase-list-page__empty-page-wrapper p-5 flex-1  h-full">
    <div>
      <h2>Hồ Sơ Của Tôi</h2>
      <p class="text-muted">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

    </div>
    <hr />
    <div class="d-flex p-3">
      <div class="d-flex flex-column flex-70">
        <div class="form-group d-flex" style="align-items: center;">
          <p class="control-label" htmlfor="product_quantity" style="margin: 0 10px 0 0;">Full Name</p>

          <input
            id="firstname"
            name="product_quantity"
            placeholder="Full Name"
            class="form-control col-md-8 input-md"
            type="text"
            style="
                    flex-shrink: 1;
                    font-size: 14px;"
          >

        </div>

        <div class="form-group d-flex" style="align-items: center;">
          <p
            class="control-label"
            htmlfor="product_quantity"
            style="margin: 0 10px 0 0;">Last Name</p>

          <input
            id="lastname"
            name="product_quantity"
            placeholder="Last Name"
            class="form-control col-md-8 input-md"
            type="text"
            style="
                    flex-shrink: 1;
                    font-size: 14px;"
          >

        </div>

        <div class="d-flex justify-content-center" >
          <button type="button" class="h-button__red p-3 h-color__white cursor-pointer " id="btn-save-user">Lưu thay đổi</button>
        </div>
      </div>
      <div style="width: 26.5rem; border-left: 1px solid #efefef;">
        <div class="d-flex flex-column justify-content-center align-center align-items-center " style="margin: 0px 46px;">
          <div
            class="d-flex justify-content-end avatar-uploader__avatar-image comment__image rounded-circle"
            id="user-image"
            style="
                    background-image: url('https://cf.shopee.vn/file/f3f241bf2fd5593f85eecbaeec6e0ccc_tn');
                    width: 100px;
                    height: 100px;
                    margin-right: 0;
                    margin-top: 20px;
                    margin-bottom: 20px;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;"
          ></div>
          <div class=" p-2 btn-light cursor-pointer mt-4">
            <span class="mx-2 " id="btn-choose-image-user">
              Chọn ảnh
            </span>
            <input class="avatar-uploader__file-input" type="file" accept=".jpg,.jpeg,.png">
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
export default {
    name: 'UserInfo'
}
</script>

<style>

</style>
