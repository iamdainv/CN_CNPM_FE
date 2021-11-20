<template>
  <div class="purchase-list-page__empty-page-wrapper h-full">
    <div class="d-flex justify-content-between">
      <h2>Địa chỉ của tôi</h2>
      <div class="h-button__red p-4 h-color__white cursor-pointer" id="btn-open-modal-add-address" data-toggle="modal" data-target="#modal-add-address">
        <i class="fas fa-plus"></i>
        <span class="mx-2"> Thêm địa chỉ </span>
      </div>
    </div>
    <hr />
    <div class="list-address">

    </div>
    <div class="d-flex p-3 justify-between" v-for="(address) in $store.getters.userAddress" :key="address.id">

      <div class="d-flex flex-column flex-70">
        <div class="d-flex mb-4">
          <div class="address-display__field-label">
            <div >Họ và tên: </div>
          </div>
          <div class="address-display__field-value d-flex flex-1">
            <div class="fw-bold mr-4 font-16">{{ address.recipientName }}</div>
            <template v-if="address.isDefault">
              <div class="address-tag">Mặc định</div>
              <div class="address-pickup">Địa chỉ lấy hàng</div>
              <div class="address-pickup">Địa chỉ trả hàng</div>
            </template>
          </div>
        </div>
        <div class="d-flex mb-4">
          <div class="address-display__field-label">
            Số điện thoại
          </div>
          <div class="address-display__field-value flex-1">
            {{ address.recipientNumberPhone }}
          </div>
        </div>
        <div class="d-flex mb-4">
          <div class="address-display__field-label">
            Địa chỉ
          </div>
          <div class="address-display__field-value flex-1">
            <div class="pb-1"> {{ address.address }} </div>
            <div class="pb-1"> {{ address.ward }} </div>
            <div class="pb-1">{{ address.district }}</div>
            <div class="pb-1">{{ address.city }}</div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column justify-content-center">
        <div class="d-flex justify-content-end ">
          <p class="text-decoration-underline mr-3" >Sửa</p>
          <p class="text-decoration-underline" v-if="!address.is_delivery_address">Xóa</p>
        </div>
        <div class=" p-2 btn-light cursor-pointer" @click="setDeliveryAddress(address)">

          <span class="mx-2"> Thiết lập mặc định </span>
        </div>
      </div>
    </div>
    <hr />
    <div
      class="modal"
      id="modal-add-address"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title" id="exampleModalLongTitle">Địa Chỉ Mới</h2>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="text" class="w-100 p-2 mb-3 f-14 form-control" id="user-name-address" placeholder="Họ và Tên">
            <select id="city" name="country" class="form-control mb-3 f-14">
              <option hidden>Tỉnh/Thành phố</option>
            </select>
            <select id="district" name="country" class="form-control mb-3 f-14"><option hidden>Quận/Huyện</option></select>
            <select id="ward" name="country" class="form-control mb-3 f-14">  <option hidden>Phường/Xã</option></select>
            <input type="text" class="w-100 p-2 mb-3 f-14 form-control " id="number-phone-address" placeholder="Số điện thoại">
            <input type="text" class="w-100 p-2 mb-3 f-14 form-control" id="street-name-address" placeholder="Tòa nhà, Tên Đường ...">
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <div><input type="checkbox" id="chb-save-default"/> Đặt làm địa chỉ mặc đinh</div>
            <div>
              <button type="button" class=" btn btn-light cursor-pointer p-3 mr-1" data-dismiss="modal" style=" height: 38px; ">Trở lại</button>
              <button type="button" class="h-button__red p-3 h-color__white cursor-pointer " id="btn-save-address">Lưu thay đổi</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAddress',
  mounted () {
    console.log(this.$store.getters.userAddress)
  },
  methods: {
    setDeliveryAddress (address) {
      console.log(address)
    }
  }
}
</script>

<style>

</style>
