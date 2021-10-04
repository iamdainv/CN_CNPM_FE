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
          <p class="control-label" htmlfor="product_quantity" style="margin: 0 10px 0 0;">Mật khẩu cũ</p>

          <input
            id="oldpass"
            name="product_quantity"
            placeholder="Mật khẩu cũ"
            class="form-control col-md-8 input-md"
            type="password"
            style="flex-shrink: 1; font-size: 14px; margin-left: 9px">
        </div>

        <div class="form-group d-flex" style="align-items: center;">
          <p class="control-label" htmlfor="product_quantity" style="margin: 0 10px 0 0;">Mật khẩu mới</p>

          <input
            id="newpass"
            name="product_quantity"
            placeholder="Mật khẩu mới"
            class="form-control col-md-8 input-md"
            type="password"
            style="flex-shrink: 1;font-size: 14px;">
        </div>

        <div class="d-flex justify-content-center">
          <button type="button" class="h-button__red p-3 h-color__white cursor-pointer " id="btn-change-pass-user">Xác nhận</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
    name: 'UserPass'
}
</script>

<style>

</style>
