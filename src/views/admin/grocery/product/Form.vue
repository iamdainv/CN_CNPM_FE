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
                  prop="id_category"
                  label="Loại sản phẩm"
                  :rules="[
                    {
                      required: true,
                      message: 'Loại sản phẩm là bắt buộc',
                      trigger: 'change'
                    }
                  ]">
                  <a-tree-select
                    :allowClear="true"
                    :filterTreeNode="filterTreeSelectOption"
                    show-search
                    :disabled="isEditable||isView"
                    style="width: 100%"
                    v-model="modelForm.id_category"
                    :tree-data="listProductType"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="12" class="filter-item-container">
                <a-form-model-item
                  prop="name"
                  label="Tên sản phẩm"
                  :rules="[
                    {
                      required: true,
                      message: 'Tên sản phẩm là bắt buộc',
                      trigger: 'change'
                    },
                    {
                      max: 50,
                      message: 'Nhập tối đa 50 ký tự',
                      trigger: 'change'
                    }
                  ]">
                  <a-input
                    v-model="modelForm.name"
                    :disabled="isEditable||isView"
                    style="color: black"
                    :maxLength="50"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="8" class="filter-item-container">
                <a-form-model-item
                  prop="price"
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
                    }
                  ]"
                >
                  <a-input
                    style="color: black"
                    v-model="modelForm.price"
                    :disabled="isView"
                    :maxLength="200"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="8" class="filter-item-container">
                <a-form-model-item
                  prop="quantity"
                  label="Số lượng sản phẩm"
                  :rules="[
                    {
                      required: true,
                      message: 'Số lượng sản phẩm là bắt buộc',
                      trigger: 'change'
                    }
                  ]"
                >
                  <a-input
                    style="color: black"
                    v-model="modelForm.quantity"
                    :disabled="isView"
                    :maxLength="200"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="8" class="filter-item-container">
                <a-form-model-item
                  prop="discount"
                  label="Giảm giá"
                >
                  <a-input
                    style="color: black"
                    v-model="modelForm.discount"
                    :disabled="isView"
                    :maxLength="200"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="12" class="filter-item-container">
                <a-form-model-item
                  prop="title"
                  label="Tiêu đề"
                  :rules="[
                    {
                      required: true,
                      message: 'Tiêu đề là bắt buộc',
                      trigger: 'change'
                    },
                    {
                      max: 200,
                      message: 'Nhập tối đa 200 ký tự',
                      trigger: 'change'
                    }]"
                >
                  <a-textarea
                    style="color: black"
                    v-model="modelForm.title"
                    :disabled="isView"
                    :maxLength="200"
                    :auto-size="{ minRows: 2}"
                    @blur="DeepTrimValue(modelForm)"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="12" class="filter-item-container">
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
            <div class="clearfix">
              <a-upload
                :disabled="isView"
                accept=".jpg"
                name="file"
                :before-upload="handleBeforeUpload"
                list-type="picture-card"
                :file-list="fileList"
                @preview="handlePreview"
                @change="handleChangeFileUpload"
              >
                <div v-if="fileList.length < 8">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    Upload
                  </div>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelPreview">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>
            </div>
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
import { createProduct } from '@/api/user/product'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

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
    listProductType: {
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
      previewVisible: false,
      loadingDrawer: false,
      modelForm: {
        address: '',
        createdAt: '',
        description: '',
        discount: '',
        id: '',
        id_category: '',
        id_user: '',
        image: '',
        images: [],
        isSell: '',
        name: '',
        numberOfStar: '',
        price: '',
        quantity: '',
        selled: '',
        title: '',
        updatedAt: ''
      },
      previewImage: '',
      fileList: []
    }
  },
  created () {
    if ((this.isEditable && this.objectEdit && this.objectEdit.id) || (this.isView && this.objectEdit && this.objectEdit.id)) {
      this.modelForm = this.objectEdit
    }
  },
  methods: {
    handleBeforeUpload (file) {
      console.log(file)
      return false
    },
    async handlePreview (file) {
      this.previewImage = await getBase64(file.originFileObj)
      this.previewVisible = true
    },
    handleChangeFileUpload (info) {
      const fileList = [...info.fileList]
      this.fileList = fileList
      console.log(this.fileList)
    },
    handleCancelPreview () {
      this.previewVisible = false
    },
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
            title: 'Bạn chắc chắn muốn ' + (this.objectEdit.id && this.isEditable ? 'cập nhật' : 'thêm mới') + ' sản phẩm?',
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
      if (this.objectEdit.id && this.isEditable) {

      } else {
        const params = {
          name: this.modelForm.name,
          id_category: this.modelForm.id_category,
          id_user: this.$store.getters.userId,
          quantity: Number(this.modelForm.quantity),
          discount: Number(this.modelForm.discount),
          price: Number(this.modelForm.price),
          description: this.modelForm.description,
          title: this.modelForm.title
        }
        const formData = new FormData()
        formData.append('product',
          new Blob([JSON.stringify(params)],
            {
              type: 'application/json'
            }
          ))
        formData.append('files', this.fileList)
        createProduct(formData).then(res => {
          this.$notification.success({
            message: 'Thêm mới sản phẩm',
            description: 'Thêm mới sản phẩm thành công',
            duration: 5
          })
          this.gotoList(true)
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loading = false
          this.loadingDrawer = false
        })
        this.loadingDrawer = true
      }
    }
  }
}
</script>

<style scoped>

</style>
