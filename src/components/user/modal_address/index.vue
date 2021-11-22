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
                  <a-select-option v-for="(item, index) in listProvince" :key="index" :value="item.code">
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
                  <a-select-option v-for="(item, index) in listDistrict" :key="index" :value="item.code">
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
                  <a-select-option v-for="(item, index) in listWard" :key="index" :value="item.code">
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
                prop="addressDetail"
                :rules="[
                  {
                    required: true,
                    message: 'Địa chỉ cụ thể là bắt buộc',
                    trigger: 'change'
                  }
                ]"
              >
                <a-input
                  v-model="form.addressDetail"
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
                  :draggable="true"
                  @dragend="drag"
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
        addressDetail: '',
        lat: '',
        lon: '',
        recipientName: '',
        recipientNumberPhone: '',
        isDefault: ''
      },
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
      center: [21.135425028881837, 106.00459399317398],
      // center: [this.form.lat, this.form.lon],
      markerLatLng: [21.135425028881837, 106.00459399317398]
    }
  },
  created () {
    this.visibleModal = this.visible
    this.getListProvince()
    this.form = _.cloneDeep(this.formData)
    this.center = [this.form.lat ? this.form.lat : 21.135425028881837, this.form.lon ? this.form.lon : 106.00459399317398]
    this.markerLatLng = [this.form.lat ? this.form.lat : 21.135425028881837, this.form.lon ? this.form.lon : 106.00459399317398]
  },
  methods: {
    getListProvince () {
      axios({
        method: 'get',
        url: 'https://provinces.open-api.vn/api/?depth=1'
      }).then(rs => {
        this.listProvince = rs.data ? rs.data : []
      })
    },
    getListDistrict () {
      axios({
        method: 'get',
        url: `https://provinces.open-api.vn/api/p/${this.form.city}/?depth=2`
      }).then(rs => {
        if (rs) {
          this.listDistrict = rs.data.districts ? rs.data.districts : []
        }
      })
    },
    getListWard () {
      axios({
        method: 'get',
        url: `https://provinces.open-api.vn/api/d/${this.form.district}/?depth=2`
      }).then(rs => {
        this.listWard = rs.data.wards ? rs.data.wards : []
      })
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
    handleChangeProvince () {
      this.getListDistrict()
    },
    handleChangeDistrict () {
      this.getListWard()
    },
    handleFindCurrentAddress () {
      const keyword = this.form.addressDetail + ' ' + this.getWardName(this.form.ward) + ' ' + this.getDistrictName(this.form.district) + ' ' + this.getProvinceName(this.form.city)
      this.getLocation(keyword)
    },
    drag (e) {
      console.log(e.target.getLatLng())
    },
    handleOk () {
      this.$refs.ruleForm(valid => {
        if (valid) {
          if (this.form.lat && this.form.lon) {}
        }
      })
    },
    handleCancel () {
      this.visibleModal = false
      this.closeModal(false)
    },
    closeModal (reload = false) {
      this.$emit('closeModal', reload)
    }
  }
}
</script>

<style scoped>

</style>
