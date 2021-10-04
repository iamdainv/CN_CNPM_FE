<template>
  <div>
    <a-spin :spinning="loadingSpin" tip="Loading...">
      <a-card :title="'Điều kiện tìm kiếm'" style="margin-bottom: 30px">
        <a-row :gutter="16">
          <search-page :search-fields="search" v-model="searchFields"/>
        </a-row>
      </a-card>
      <div style="display: flex; margin-bottom: 8px">
        <a-button type="primary" @click="showDrawer" icon="plus-circle" style="margin-left: auto;">Thêm mới
        </a-button>
      </div>
      <a-card title="Thông tin nhân viên" style="margin-bottom: 30px">
        <a-row :gutter="16">
          <a-table :columns="columns">
            <template slot="actionTitle">
              {{ 'Hành động' }}
            </template>
            <template slot="operation" slot-scope="record">
              <div>
                <span
                  style="padding-right:12px;cursor: pointer">
                  <a-icon
                    type="save"
                    :style="{color: '#F98500',fontSize: '14px'}"
                  />
                </span>
                <span
                  style="cursor: pointer"
                  @click="confirmDelete(record.globalListId, record)"
                >
                  <a-icon
                    type="delete"
                    :style="{color: '#ee0033', fontSize: '14px'}"
                  />
                </span>
              </div>
            </template>
          </a-table>
        </a-row>
      </a-card>
      <div style="display: flex; margin-bottom: 8px">
        <a-button type="primary" @click="onCreateStaff" icon="plus-circle" style="margin-left: auto;">Thêm mới
        </a-button>
      </div>

      <a-row :gutter="24">
        <a-col :lg="16">
          <a-card title="Thông tin đơn vị">
            <a-row :gutter="16">
              <a-table :columns="columnsStaff">
                <template slot="actionTitle">
                  {{ 'Hành động' }}
                </template>
                <template slot="operation" slot-scope="record">
                  <div>
                    <span
                      style="padding-right:12px;cursor: pointer">
                      <a-icon
                        type="save"
                        :style="{color: '#F98500',fontSize: '14px'}"
                      />
                    </span>
                    <span
                      style="cursor: pointer"
                      @click="confirmDelete(record.globalListId, record)"
                    >
                      <a-icon
                        type="delete"
                        :style="{color: '#ee0033', fontSize: '14px'}"
                      />
                    </span>
                  </div>
                </template>
              </a-table>
            </a-row>
          </a-card>
        </a-col>
        <a-col :lg="8">
          <a-card title="Thông tin vai trò">
            <a-row :gutter="16">
              <a-table :columns="columnsRole">
                <template slot="actionTitle">
                  {{ 'Hành động' }}
                </template>
                <template slot="operation" slot-scope="record">
                  <div>
                    <span
                      style="padding-right:12px;cursor: pointer">
                      <a-icon
                        type="save"
                        :style="{color: '#F98500',fontSize: '14px'}"
                      />
                    </span>
                    <span
                      style="cursor: pointer"
                      @click="confirmDelete(record.globalListId, record)"
                    >
                      <a-icon
                        type="delete"
                        :style="{color: '#ee0033', fontSize: '14px'}"
                      />
                    </span>
                  </div>
                </template>
              </a-table>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
    <a-drawer
      title="Thêm mới nhân viên"
      :width="500"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Mã nhân viên">
              <a-input
                v-decorator="[
                  'staffCode',
                  {
                    rules: [{ required: true, message: 'Mã nhân viên là trường bắt buộc' }],
                  },
                ]"
                placeholder="Mã nhân viên"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Tên nhân viên">
              <a-input
                v-decorator="[
                  'staffName',
                  {
                    rules: [{ required: true, message: 'Tên nhân viên là trường bắt buộc' }],
                  },
                ]"
                placeholder="Tên nhân viên"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Loại nhân viên">
              <a-select
                v-decorator="[
                  'orUnitCode',
                  {
                    rules: [{ required: true, message: 'orUnitCode required' }],
                  },
                ]"
                placeholder="Loại nhân viên"
              >
                <a-select-option value="0">Nhân viên 1</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Mã nhân viên bưu tá">
              <a-input
                v-decorator="[
                  'orUnitName',
                  {
                    rules: [{ required: true, message: 'orUnitName' }],
                  },
                ]"
                placeholder="Mã nhân viên bưu tá"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Tên đơn vị">
              <a-input
                v-decorator="[
                  'staffCode',
                  {
                    rules: [{ required: true, message: 'Mã nhân viên là trường bắt buộc' }],
                  },
                ]"
                placeholder="Tên đơn vị"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Mã đơn vị">
              <a-input
                v-decorator="[
                  'staffName',
                  {
                    rules: [{ required: true, message: 'Tên nhân viên là trường bắt buộc' }],
                  },
                ]"
                placeholder="Mã đơn vị"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Số điện thoại">
              <a-input
                v-decorator="[
                  'staffCode',
                  {
                    rules: [{ required: true, message: 'Mã nhân viên là trường bắt buộc' }],
                  },
                ]"
                placeholder="Tên đơn vị"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Email">
              <a-input
                v-decorator="[
                  'staffName',
                  {
                    rules: [{ required: true, message: 'Tên nhân viên là trường bắt buộc' }],
                  },
                ]"
                placeholder="Mã đơn vị"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
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
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          Bỏ qua
        </a-button>
        <a-button type="primary" @click="onSubmit">
          Lưu
        </a-button>
      </div>
    </a-drawer>
    <a-drawer
      title="Thêm mới nhân viên vào đơn vị"
      :width="720"
      :visible="visibleStaff"
      :body-style="{ paddingBottom: '80px' }"
      @close="onCloseStaff"
    >
      <a-form :form="formStaff" layout="vertical">
        <a-row>
          <a-input style="width: 100%" placeholder="Nhập nội dung tìm kiếm..."></a-input>
        </a-row>
        <a-row :gutter="16">
          <a-list
            class="demo-loadmore-list"
            :loading="loading"
            item-layout="horizontal"
            :data-source="data"
          >
            <div
              v-if="showLoadingMore"
              slot="loadMore"
              :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
            >
              <a-spin v-if="loadingMore" />
              <a-button v-else @click="onLoadMore">
                loading more
              </a-button>
            </div>
            <a-list-item slot="renderItem" slot-scope="item">
              <a-checkbox slot="actions"></a-checkbox>
              <a-list-item-meta
                :description="`email: ${item.email}, gender: ${item.gender}`"
              >
                <a slot="title" href="https://www.antdv.com/">{{ item.name.last }}</a>
                <a-avatar
                  slot="avatar"
                >
                  {{ item.name.last.substring(0) }}
                </a-avatar>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-row>
      </a-form>
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
        <a-button :style="{ marginRight: '8px' }" @click="onCloseStaff">
          Bỏ qua
        </a-button>
        <a-button type="primary" @click="onCloseStaff">
          Lưu
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import searchPage from '@/components/SearchPage/Search'
import search from '@/views/admin/crm/organization/staff/search'
import columns from './columns'
import columnsStaff from '@/views/admin/crm/organization/staff/columnsStaff'
import columnsRole from '@/views/admin/crm/organization/staff/columnsRole'
import reqwest from 'reqwest'
import TagSelectOption from '@/components/TagSelect/TagSelectOption'
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,description,email,nat&noinfo'

export default {
  data () {
    const self = this
    return {
      self,
      search,
      columns,
      columnsStaff,
      columnsRole,
      typeComponent: '',
      searchFields: {},
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
      loadingSpin: true,
      activeSearchKey: 1,
      activeSearchKey1: 1,
      activeSearchKey2: 1,
      form: this.$form.createForm(this),
      formStaff: this.$form.createForm(this),
      visible: false,
      visibleStaff: false,
      loadingMore: false,
      loading: false,
      showLoadingMore: true,
      data: []

    }
  },
  components: {
    TagSelectOption,
    searchPage

  },
  watch: {
    checkedKeys (val) {
      console.log('onCheck', val)
    }
  },
  mounted () {
    setTimeout(() => {
      this.loadingSpin = false
      this.getData(res => {
        this.loading = false
        this.data = res.results
      })
    }, 200)
  },
  methods: {
    onExpand (expandedKeys) {
      console.log('onExpand', expandedKeys)
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
      this.loadingSpin = true
      setTimeout(() => {
        this.loadingSpin = false
      }, 500)
    },
    showDrawer () {
      this.visible = true
    },
    onCreateStaff () {
      this.visibleStaff = true
    },
    onClose () {
      this.visible = false
    },
    onCloseStaff () {
      this.visibleStaff = false
    },
    onSubmit () {
      this.visible = false

      setTimeout(() => {
        this.$notification.success({
          message: 'Thông báo',
          description: 'Thêm mới đơn vị thành công',
          style: {
            width: '400px',
            marginLeft: `${335 - 400}px`
          },
          duration: 4
        })
      }, 100)
    },
    getData (callback) {
      reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: res => {
          callback(res)
        }
      })
    },
    onLoadMore () {
      this.loadingMore = true
      this.getData(res => {
        this.data = this.data.concat(res.results)
        this.loadingMore = false
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    }
  }
}
</script>
