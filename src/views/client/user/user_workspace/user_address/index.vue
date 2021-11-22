<template>
  <div class="purchase-list-page__empty-page-wrapper h-full">
    <div class="d-flex justify-content-between">
      <h2>Địa chỉ của tôi</h2>
      <div @click="handleOpenModalCreate" class="h-button__red p-4 h-color__white cursor-pointer" id="btn-open-modal-add-address" data-toggle="modal" data-target="#modal-add-address">
        <i class="fas fa-plus"></i>
        <span class="mx-2"> Thêm địa chỉ </span>
      </div>
    </div>
    <hr />
    <div class="list-address">

    </div>
    <div class="d-flex p-3 justify-between" v-for="(address) in listUserAddress" :key="address.id">

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
          <p class="text-decoration-underline mr-3" style="cursor: pointer;" @click="handleOpenModalUpdate(address)">Sửa</p>
          <p class="text-decoration-underline" v-if="!address.isDefault" @click="handleDeleteUserAddress(address.id)">Xóa</p>
        </div>
        <div class=" p-2 btn-light cursor-pointer" @click="setDeliveryAddress(address)">

          <span class="mx-2"> Thiết lập mặc định </span>
        </div>
      </div>
    </div>
    <hr />
    <modal-address v-if="visibleModal" :visible="visibleModal" :isCreated="isCreated" @closeModal="handleCloseModal" :formData="formData"></modal-address>
  </div>
</template>

<script>
import ModalAddress from '@/components/user/modal_address'
import { mapActions } from 'vuex'

export default {
  name: 'UserAddress',
  components: {
    ModalAddress
  },
  data () {
    return {
      visibleModal: false,
      isCreated: false,
      formData: {
        city: '',
        id_user: '',
        address: '',
        district: '',
        ward: '',
        addressDetail: '',
        lat: '',
        lon: '',
        recipientName: '',
        recipientNumberPhone: '',
        isDefault: ''
      }
    }
  },
  computed: {
    listUserAddress () {
      return this.$store.getters.userAddress
    }
  },
  watch: {
    listUserAddress (newList, oldList) {
      console.log('newListAddress: ', newList)
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    console.log(this.$store.getters.userAddress)
  },
  methods: {
    ...mapActions(['getUserAddress', 'removeUserAddress']),
    getData () {
      this.$store.dispatch('getUserAddress')
    },
    handleDeleteUserAddress (id) {
      this.$store.dispatch('removeUserAddress', { idAddress: id })
    },
    setDeliveryAddress (address) {
      console.log(address)
    },
    handleOpenModalCreate () {
      this.visibleModal = true
      this.isCreated = true
    },
    handleOpenModalUpdate (address) {
      this.visibleModal = true
      this.isCreated = false
      this.formData = { ...address }
    },
    resetFormData () {
      this.visibleModal = false
      this.isCreated = false
      this.formData = {
        city: '',
        id_user: '',
        address: '',
        district: '',
        ward: '',
        addressDetail: '',
        lat: '',
        lon: '',
        recipientName: '',
        recipientNumberPhone: '',
        isDefault: ''
      }
    },
    handleCloseModal (reload = false) {
      this.resetFormData()
      this.visibleModal = false
      this.create = false
      if (reload) {
        this.getData()
      }
    }
  }
}
</script>

<style>

</style>
