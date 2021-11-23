<template>
  <a-modal
    v-model="visibleModal"
    :destroyOnClose="true"
    :mask="true"
    ok-text="Lưu thay đổi"
    cancel-text="Trở lại"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="'50%'">
    <div class="modal-address--container">
      <div class="modal-address--header">
        <h2 class="modal-address--title">{{ isCreated ? 'Địa Chỉ Mới' : 'Cập nhật địa chỉ' }}</h2>
      </div>
      <div class="modal-address--content">
        <a-form-model
          :model="form"
          ref="ruleForm"
          style="overflow: hidden;">
          <a-row :gutter="16">
            <a-col :span="12" class="filter-item-container">
              <span>Họ và tên <span style="color: red;"> *</span></span>
              <a-form-model-item
                prop="recipientName"
                :rules="[
                  {
                    required: true,
                    message: 'Họ và tên là bắt buộc',
                    trigger: 'change'
                  }
                ]"
              >
                <a-input
                  v-model="form.recipientName"
                  placeholder="Họ và tên"
                  size="large"
                  style="width: 100%"
                ></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12" class="filter-item-container">
              <span>Số điện thoại <span style="color: red;"> *</span></span>
              <a-form-model-item
                prop="recipientNumberPhone"
                :rules="[
                  {
                    required: true,
                    message: 'Số điện thoại là bắt buộc',
                    trigger: 'change'
                  }
                ]">
                <a-input
                  placeholder="Số điện thoại"
                  size="large"
                  v-model="form.recipientNumberPhone"
                  style="width: 100%"
                ></a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8" class="filter-item-container">
              <span>Tỉnh/Thành Phố <span style="color: red;"> *</span></span>
              <a-form-model-item
                prop="city"
                :rules="[
                  {
                    required: true,
                    message: 'Tỉnh/Thành Phố là bắt buộc',
                    trigger: 'change'
                  }
                ]">
                <a-select
                  v-model="form.city"
                  show-search
                  placeholder="Tỉnh/Thành Phố"
                  style="width: 100%"
                  @change="handleChangeProvince"
                >
                  <a-select-option v-for="(item, index) in listProvince" :key="index" :value="item.name">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8" class="filter-item-container">
              <span>Quận/Huyện <span style="color: red;"> *</span></span>
              <a-form-model-item
                prop="district"
                :rules="[
                  {
                    required: true,
                    message: 'Quận/Huyện là bắt buộc',
                    trigger: 'change'
                  }
                ]">
                <a-select
                  v-model="form.district"
                  show-search
                  placeholder="Quận/Huyện"
                  style="width: 100%"
                  @change="handleChangeDistrict"
                >
                  <a-select-option v-for="(item, index) in listDistrict" :key="index" :value="item.name">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8" class="filter-item-container">
              <span>Phường/Xã <span style="color: red;"> *</span></span>
              <a-form-model-item
                prop="ward"
                :rules="[
                  {
                    required: true,
                    message: 'Phường/Xã là bắt buộc',
                    trigger: 'change'
                  }
                ]">
                <a-select
                  v-model="form.ward"
                  show-search
                  placeholder="Phường/Xã"
                >
                  <a-select-option v-for="(item, index) in listWard" :key="index" :value="item.name">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12" class="filter-item-container">
              <span>Địa chỉ cụ thể <span style="color: red;"> *</span></span>
              <a-form-model-item
                prop="address"
                :rules="[
                  {
                    required: true,
                    message: 'Địa chỉ cụ thể là bắt buộc',
                    trigger: 'change'
                  }
                ]"
              >
                <a-input
                  v-model="form.address"
                  placeholder="Địa chỉ cụ thể"
                  size="large"
                  style="width: 100%"
                ></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-button ref="findCurrentAddress" @click="handleFindCurrentAddress" style="margin-top: 23px">Tìm kiếm</a-button>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24" style="overflow: hidden;" class="filter-item-container">
              <l-map style="height: 350px; width: 100%;" :zoom="zoom" :center="center">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker
                  :lat-lng="markerLatLng"
                  :draggable="false"
                  :icon="icon"
                >
                </l-marker>
              </l-map>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
    </div>
  </a-modal>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import { icon } from 'leaflet'
import { mapActions } from 'vuex'

export default {
  name: 'modal-address',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    isCreated: {
      type: Boolean,
      required: true
    },
    formData: {
      type: Object,
      required: true
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      visibleModal: false,
      form: {
        city: '',
        id_user: '',
        address: '',
        district: '',
        ward: '',
        lat: '',
        lon: '',
        recipientName: '',
        recipientNumberPhone: '',
        isDefault: 0
      },
      provinceCode: null,
      districtCode: null,
      wardCode: null,
      listProvince: [],
      listDistrict: [],
      listWard: [],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      icon: icon({
        iconUrl: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png',
        iconSize: [37, 37]
      }),
      center: [-1, -1],
      markerLatLng: [-1, -1]
    }
  },
  created () {
    this.visibleModal = this.visible
    this.form = _.cloneDeep(this.formData)
    this.getListProvince()
    if (!this.isCreated) {
      if (this.form.city) {
        this.getProvinceCode(this.form.city)
        this.getListDistrict()
        if (this.form.district) {
          this.getDistrictCode(this.form.district)
          this.getListWard()
        }
      }
    }
    this.center = [this.form.lat ? this.form.lat : -1, this.form.lon ? this.form.lon : -1]
    this.markerLatLng = [this.form.lat ? this.form.lat : -1, this.form.lon ? this.form.lon : -1]
  },
  methods: {
    ...mapActions(['createUserAddress', 'updateUserAddress']),
    getListProvince () {
      axios({
        method: 'get',
        url: 'https://provinces.open-api.vn/api/?depth=1'
      }).then(rs => {
        this.listProvince = rs.data ? rs.data : []
      })
    },
    getListDistrict () {
      if (this.provinceCode) {
        axios({
          method: 'get',
          url: `https://provinces.open-api.vn/api/p/${this.provinceCode}/?depth=2`
        }).then(rs => {
          if (rs) {
            this.listDistrict = rs.data.districts ? rs.data.districts : []
          }
        })
      } else {
        this.listDistrict = []
      }
    },
    getListWard () {
      if (this.districtCode) {
        axios({
          method: 'get',
          url: `https://provinces.open-api.vn/api/d/${this.districtCode}/?depth=2`
        }).then(rs => {
          this.listWard = rs.data.wards ? rs.data.wards : []
        })
      } else {
        this.listWard = []
      }
    },
    getLocation (keyword) {
      axios({
        method: 'get',
        url: 'https://nominatim.openstreetmap.org/search.php?q=' + keyword + '&format=jsonv2'
      }).then(rs => {
        if (rs.data[0]) {
          this.form.lat = rs.data[0].lat
          this.form.lon = rs.data[0].lon
          this.center = [this.form.lat, this.form.lon]
          this.markerLatLng = [this.form.lat, this.form.lon]
        }
      })
    },
    getProvinceName (provinceCode) {
      let provinceName = ''
      this.listProvince.forEach(item => {
        if (item.code === provinceCode) {
          provinceName = item.name
          return false
        }
      })
      return provinceName
    },
    getDistrictName (districtCode) {
      let districtName = ''
      this.listDistrict.forEach(item => {
        if (item.code === districtCode) {
          districtName = item.name
          return false
        }
      })
      return districtName
    },
    getWardName (wardCode) {
      let wardName = ''
      this.listWard.forEach(item => {
        if (item.code === wardCode) {
          wardName = item.name
          return false
        }
      })
      return wardName
    },
    getProvinceCode (provinceName) {
      let provinceCode = null
      this.listProvince.forEach(item => {
        if (item.name === provinceName) {
          provinceCode = item.code
          return false
        }
      })
      return provinceCode
    },
    getDistrictCode (districtName) {
      let districtCode = null
      this.listDistrict.forEach(item => {
        if (item.name === districtName) {
          districtCode = item.code
          return false
        }
      })
      return districtCode
    },
    handleChangeProvince () {
      this.provinceCode = this.getProvinceCode(this.form.city)
      this.getListDistrict()
    },
    handleChangeDistrict () {
      this.districtCode = this.getDistrictCode(this.form.district)
      this.getListWard()
    },
    handleFindCurrentAddress () {
      const keyword = this.form.address + ' ' + this.form.ward + ' ' + this.form.district + ' ' + this.form.city
      console.log(keyword)
      this.getLocation(keyword)
    },
    onChangeCheckedDefault (e) {
      this.form.isDefault = e.target.checked
    },
    handleOk () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.form.lat >= 0 && this.form.lon >= 0) {
            if (this.isCreated && !this.form.id) {
              const params = {
                city: this.form.city,
                country: 'Việt Nam',
                address: this.form.address,
                ward: this.form.ward,
                district: this.form.district,
                recipientName: this.form.recipientName,
                recipientNumberPhone: this.form.recipientNumberPhone,
                isDefault: this.form.isDefault,
                latitude: Number.parseFloat(this.form.lat),
                longitude: Number.parseFloat(this.form.lon)
              }
              this.$store.dispatch('createUserAddress', params).then(rs => {
                this.$success({ content: 'Thêm mới địa chỉ thành công!',
                  onOk: () => {
                    this.closeModal(false)
                  }
                })
              }).catch(() => {
                this.$error({ content: 'Thêm mới địa chỉ thất bại!' })
              })
            } else {
              const params = {
                id: this.form.id,
                city: this.form.city,
                country: 'Việt Nam',
                address: this.form.address,
                ward: this.form.ward,
                district: this.form.district,
                recipientName: this.form.recipientName,
                recipientNumberPhone: this.form.recipientNumberPhone,
                isDefault: this.form.isDefault,
                latitude: this.form.lat,
                longitude: this.form.lon
              }
              this.$store.dispatch('updateUserAddress', params).then(rs => {
                this.$success({ content: 'Cập nhật địa chỉ thành công!',
                  onOk: () => {
                    this.closeModal(false)
                  }
                })
              }).catch(() => {
                this.$error({ content: 'Cập nhật địa chỉ thất bại!' })
              })
            }
          }
        }
      })
    },
    handleCancel () {
      this.closeModal(false)
    },
    closeModal (reload = false) {
      this.visibleModal = false
      this.$emit('closeModal', reload)
    }
  }
}
</script>

<style scoped>

</style>
