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
          <a-card style="width: 100%;border: none;padding: 0 0 60px 0" class="search-container">
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
                    }
                  ]">
                  <a-input
                    v-model="modelForm.name"
                    style="color: black"
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
              <a-col :xs="24" :md="24" :lg="24">
                <a-form-model-item
                  label="Ảnh mô tả sản phẩm"
                  :rules="[
                    {
                      required: true,
                      message: 'Giá sản phẩm là bắt buộc',
                      trigger: 'change'
                    }
                  ]"
                >
                  <div class="clearfix">
                    <a-upload
                      :disabled="isView"
                      accept="image/*"
                      name="file"
                      :multiple="true"
                      :before-upload="handleBeforeUpload"
                      list-type="picture-card"
                      :file-list="fileList"
                      :remove="onRemoveFile"
                      @preview="handlePreview"
                      @change="handleChangeFileUpload"
                    >
                      <a-icon type="plus" />
                      <div class="ant-upload-text">
                        Tải lên
                      </div>
                    </a-upload>
                    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelPreview">
                      <img alt="example" style="width: 100%" :src="previewImage" />
                    </a-modal>
                  </div>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="24" :lg="24" class="filter-item-container">
                <a-form-model-item
                  prop="description"
                  label="Mô tả"
                >
                  <a-textarea
                    v-html="modelForm.description"
                    :disabled="isView"
                    style="color: black"
                    v-model="modelForm.description"
                    :maxLength="500"
                    :auto-size="{ minRows: 3}"
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
import { createProduct, updateProduct } from '@/api/user/product'

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
      fileList: [],
      filePreUpload: [],
      fileIdRemove: []
    }
  },
  created () {
    if ((this.isEditable && this.objectEdit && this.objectEdit.id) || (this.isView && this.objectEdit && this.objectEdit.id)) {
      this.modelForm = this.objectEdit
      if (this.objectEdit.images) {
        let i
        const len = this.objectEdit.images.length
        for (i = 0; i < len; i++) {
          this.fileList.push({
            uid: this.objectEdit.images[i].id,
            name: 'image.png',
            status: 'done',
            url: this.objectEdit.images[i].path
          })
        }
      } else {
        this.fileList = []
      }
    }
  },
  methods: {
    handleBeforeUpload (file) {
      this.filePreUpload.push(file)
      return false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChangeFileUpload (info) {
      const fileList = [...info.fileList]
      this.fileList = fileList
    },
    onRemoveFile (file) {
      this.filePreUpload = this.filePreUpload.filter(item => {
        return item.uid !== file.uid
      })
      if (this.isEditable) {
        this.fileIdRemove.push(file.uid)
      }
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
          if (this.fileList) {
            const $this = this
            $this.$confirm({
              title: 'Bạn chắc chắn muốn ' + (this.objectEdit.id && this.isEditable ? 'cập nhật' : 'thêm mới') + ' sản phẩm?',
              onOk () {
                $this.doUpdate()
              },
              onCancel () {
              }
            })
          } else {
            this.$notification.error({
              message: 'Thêm mới sản phẩm',
              description: 'Ảnh mô tả sản phẩm không được để trống',
              duration: 5
            })
          }
        }
      })
    },
    doUpdate () {
      if (this.objectEdit.id && this.isEditable) {
        const params = {
          name: this.modelForm.name,
          id_category: this.modelForm.id_category,
          id_user: this.$store.getters.userId,
          quantity: Number(this.modelForm.quantity),
          discount: Number(this.modelForm.discount),
          price: Number(this.modelForm.price),
          description: this.modelForm.description
        }
        const formData = new FormData()
        formData.append('product',
          new Blob([JSON.stringify(params)],
            {
              type: 'application/json'
            }
          ))
        formData.append('id_images', new Blob([JSON.stringify(this.fileIdRemove)],
          {
            type: 'application/json'
          }
        ))
        const len = this.filePreUpload.length
        for (let i = 0; i < len; i++) {
          formData.append('files', this.filePreUpload[i])
        }
        this.loadingDrawer = true
        updateProduct(this.objectEdit.id, formData).then(res => {
          this.$notification.success({
            message: 'Cập nhật sản phẩm',
            description: 'Cập nhật sản phẩm thành công',
            duration: 5
          })
          this.gotoList(true)
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loading = false
          this.loadingDrawer = false
        })
      } else {
        const params = {
          name: this.modelForm.name,
          id_category: this.modelForm.id_category,
          id_user: this.$store.getters.userId,
          quantity: Number(this.modelForm.quantity),
          discount: Number(this.modelForm.discount),
          price: Number(this.modelForm.price),
          description: this.modelForm.description
        }
        const formData = new FormData()
        formData.append('product',
          new Blob([JSON.stringify(params)],
            {
              type: 'application/json'
            }
          ))
        const len = this.filePreUpload.length
        for (let i = 0; i < len; i++) {
          formData.append('files', this.filePreUpload[i])
        }
        this.loadingDrawer = true
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
      }
    }
  }
}
</script>

<style scoped>

</style>
