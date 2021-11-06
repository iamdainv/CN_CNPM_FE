<template>
  <a-spin :spinning="loading" class="app-spinning">
    <a-drawer
      :title="drawTitle"
      :visible="drawSync"
      :maskClosable="false"
      width="35%"
      @close="handleCancel"
    >
      <a-spin :spinning="loadingDrawer">
        <a-form-model
          ref="ruleForm"
          :model="modelForm"
          @submit="handleSubmit"
          layout="vertical">
          <a-card style="width: 100%;border: none" class="search-container">
            <a-row :gutter="16" type="flex">
              <a-col :xs="24" :md="24" :lg="12" class="filter-item-container">
                <a-form-model-item
                  prop="productGroupId"
                  label="Loại sản phẩm"
                  :rules="[
                    {
                      required: true,
                      message: 'Loại sản phẩm là bắt buộc',
                      trigger: 'change'
                    }
                  ]">
                  <a-select
                    :allowClear="true"
                    :filter-option="filterSelectOption"
                    show-search
                    :disabled="isEditable||isView"
                    style="width: 100%"
                    v-model="modelForm.productGroupId"
                  >
                    <a-select-option
                      v-for="item in listProductGroup"
                      :key="'p-g-' + item.code"
                      :value="item.value">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="12" class="filter-item-container">
                <a-form-model-item
                  prop="productCode"
                  label="Mã sản phẩm"
                  :rules="[
                    {
                      required: true,
                      message: 'Mã sản phẩm là bắt buộc',
                      trigger: 'change'
                    },
                    {
                      max: 50,
                      message: 'Nhập tối đa 50 ký tự',
                      trigger: 'change'
                    },
                    {
                      validator:inputNumberSpecialCharacters,
                      message: 'Chỉ cho phép nhập số, chữ không dấu và dấu _',
                      trigger: 'change'
                    }
                  ]">
                  <a-input
                    v-model="modelForm.productCode"
                    :disabled="isEditable||isView"
                    style="color: black"
                    :maxLength="50"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="16" class="filter-item-container">
                <a-form-model-item
                  prop="productName"
                  label="Tên sản phẩm"
                  :rules="[
                    {
                      required: true,
                      message: 'Tên sản phẩm là bắt buộc',
                      trigger: 'change'
                    },
                    {
                      max: 200,
                      message: 'Nhập tối đa 200 ký tự',
                      trigger: 'change'
                    }]"
                >
                  <a-input
                    style="color: black"
                    v-model="modelForm.productName"
                    :disabled="isView"
                    :maxLength="200"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="8" class="filter-item-container">
                <a-form-model-item
                  prop="productName"
                  label="Giá sản phẩm"
                  :rules="[
                    {
                      required: true,
                      message: 'Giá sản phẩm là bắt buộc',
                      trigger: 'change'
                    },
                    {
                      max: 200,
                      message: 'Nhập tối đa 200 ký tự',
                      trigger: 'change'
                    }]"
                >
                  <a-input
                    style="color: black"
                    v-model="modelForm.productName"
                    :disabled="isView"
                    :maxLength="200"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="8" class="filter-item-container">
                <a-form-model-item
                  prop="productName"
                  label="Số lượng sản phẩm"
                  :rules="[
                    {
                      required: true,
                      message: 'Số lượng sản phẩm là bắt buộc',
                      trigger: 'change'
                    },l
                  ]"
                >
                  <a-input
                    style="color: black"
                    v-model="modelForm.productName"
                    :disabled="isView"
                    :maxLength="200"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="8" class="filter-item-container">
                <a-form-model-item
                  prop="productName"
                  label="Trạng thái"
                  :rules="[
                    {
                      required: true,
                      message: 'Trạng thái là bắt buộc',
                      trigger: 'change'
                    }
                  ]"
                >
                  <a-select
                    style="color: black"
                    v-model="modelForm.productName"
                    :disabled="isView"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="24" class="filter-item-container">
                <a-form-model-item
                  prop="description"
                  label="Mô tả"
                >
                  <a-textarea
                    :disabled="isView"
                    style="color: black"
                    v-model="modelForm.description"
                    :maxLength="500"
                    :auto-size="{ minRows: 2}"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-card>
        </a-form-model>
      </a-spin>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <div v-if="isEditable || isCreate">
          <a-button
            @click="handleCancel"
            style=" min-width:120px">Bỏ qua
          </a-button>
          <a-button
            type="primary"
            style="margin-left: 1rem;"
            @click="handleSubmit"
            :loading="loading">Lưu
          </a-button>
        </div>
        <div align="right" v-else>
          <a-button
            @click="handleCancel"
            style="min-width:120px">Bỏ qua
          </a-button>
        </div>
      </div>
    </a-drawer>
  </a-spin>
</template>
<script>

export default {
  name: 'DrawForm',
  components: {},
  props: {
    isCreate: {
      type: Boolean,
      required: true
    },
    isEditable: {
      type: Boolean,
      required: true
    },
    isView: {
      type: Boolean,
      required: true
    },
    objectEdit: {
      type: Object,
      required: false,
      default: function () {
        return {}
      }
    },
    listBusinessDomain: {
      type: Array,
      required: true
    },
    listStatus: {
      type: Array,
      required: true
    },
    drawTitle: {
      type: String,
      required: true
    },
    drawSync: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      loadingDrawer: false,
      modelForm: {
        bdomainId: null,
        productGroupId: null,
        productId: null,
        productCode: '',
        productName: '',
        staTime: '',
        endTime: '',
        status: '',
        description: ''
      },
      listProductGroup: [],
      listBusinessDomainForm: []
    }
  },
  created () {
    if (this.isCreate) {
      this.listBusinessDomainForm = this.listBusinessDomain.filter(item => item.status === 1)
    }
    if ((this.isEditable && this.objectEdit && this.objectEdit.productId) || (this.isView && this.objectEdit && this.objectEdit.productId)) {
      this.modelForm = {

      }
      this.listBusinessDomainForm = this.listBusinessDomain
    }
  },
  methods: {
    gotoList (reload = false) {
      this.$emit('closeDraw', reload)
    },
    handleCancel () {
      this.$emit('closeDraw', false)
    },
    handleSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const $this = this
          $this.$confirm({
            title: 'Bạn chắc chắn muốn ' + (this.objectEdit.productId && this.isEditable ? 'cập nhật' : 'thêm mới') + ' sản phẩm?',
            onOk () {
              $this.doUpdate()
            },
            onCancel () {
            }
          })
        }
      })
    },

    doUpdate () {
      this.loading = true
      if (this.objectEdit.productId && this.isEditable) {
        this.loadingDrawer = true
      } else {
        this.loadingDrawer = true
      }
    }
  }
}
</script>

<style scoped>

</style>
