<template>
  <div>
    <a-row>
      <a-col :lg="4" style="margin-right: 30px">
        <div style="border: 1px solid #8E97A9;background-color: #FFFFFF">
          <a-tree
            v-model="checkedKeys"
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            :selected-keys="selectedKeys"
            :tree-data="treeData"
            @expand="onExpand"
            @select="onSelect"
          />
        </div>
      </a-col>
      <a-col :lg="19">
        <a-spin :spinning="loadingSpin" tip="Loading...">
          <a-card :title="'Điều kiện tìm kiếm'" style="margin-bottom: 30px">
            <a-row :gutter="16">
              <search-page :search-fields="search" v-model="searchFields" :options="self"/>
              <a-col
                :xs="6"
                :md="6"
                :lg="6"
                style="margin-top: 42px"
              >
                <a-button
                  @click="getDataUnit"
                  type="primary"
                  class="uppercase"
                >
                  Tìm kiếm
                </a-button>
              </a-col>
            </a-row>
          </a-card>
          <div style="display: flex; margin-bottom: 8px">
            <a-button type="primary" @click="showDrawer" icon="plus-circle" style="margin-left: auto;">Thêm mới
            </a-button>
          </div>
          <a-card title="Kết quả tìm kiếm" style="margin-bottom: 30px">
            <a-row :gutter="16">
              <a-table
                :columns="columns"
                :data-source="dataUnit"
                :rowKey=" (rowKey, index ) => index"
                :scroll="{x: 1300}"
                class="ant-table-bordered">
                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>
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

          <a-card :title="'Danh sách nhân viên'">
            <a-row :gutter="16">
              <a-table
                :columns="columnsStaff"
                :data-source="dataStaff"
                :rowKey=" (rowKey, index ) => index"
                :pagination="pagination"
                :loading="loading"
                :locale="{ emptyText: 'Chưa có dữ liệu' }"
                @change="handleTableChange"
                class="ant-table-bordered">

                <template slot="rowIndex" slot-scope="text, record, index">
                  <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
                </template>

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
        </a-spin>
      </a-col>
    </a-row>
    <a-drawer
      title="Thêm mới đơn vị"
      :width="720"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      @close="onClose"
    >
      <a-form :form="form" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="Loại đơn vị">
              <a-select
                v-decorator="[
                  'orgUnitType',
                  {
                    rules: [{ required: true, message: 'Loại đơn vị là trường bắt buộc' }],
                  },
                ]"
                placeholder="Loại đơn vị"
              >
                <a-select-option value="0">Đơn vị chuyển phát</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Loại bưu cục">
              <a-select
                v-decorator="[
                  'poType',
                  {
                    rules: [{ required: true, message: 'Loại bưu cục là trường bắt buộc' }],
                  },
                ]"
                placeholder="Loại bưu cục"
              >
                <a-select-option value="private">
                  Private
                </a-select-option>
                <a-select-option value="public">
                  Public
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Người đại diện">
              <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [{ required: true, message: 'Loại đơn vị là trường băt' }],
                  },
                ]"
                placeholder="Người đại diện"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Mã đơn vị">
              <a-input
                v-decorator="[
                  'orUnitCode',
                  {
                    rules: [{ required: true, message: 'orUnitCode required' }],
                  },
                ]"
                placeholder="Mã đơn vị"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Tên đơn vị">
              <a-input
                v-decorator="[
                  'orUnitName',
                  {
                    rules: [{ required: true, message: 'orUnitName' }],
                  },
                ]"
                placeholder="Mã đơn vị"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="Tỉnh">
              <a-select
                v-decorator="[
                  'locProvinceCode',
                  {
                    rules: [{ required: true, message: 'Please select an type' }],
                  },
                ]"
                placeholder="Loại đơn vị"
              >
                <a-select-option value="0">Đơn vị chuyển phát</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Quận/huyện">
              <a-select
                v-decorator="[
                  'locDistrictCode',
                  {
                    rules: [{ required: true, message: 'Please choose the type' }],
                  },
                ]"
                placeholder="Huyện"
              >
                <a-select-option value="private">
                  Private
                </a-select-option>
                <a-select-option value="public">
                  Public
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Xã">
              <a-select
                v-decorator="[
                  'locCommuneCode',
                  {
                    rules: [{ required: true, message: 'Please choose the type' }],
                  },
                ]"
                placeholder="Xã"
              >
                <a-select-option value="private">
                  Private
                </a-select-option>
                <a-select-option value="public">
                  Public
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Đia chỉ">
              <a-input
                v-decorator="[
                  'address',
                  {
                    rules: [{ required: true, message: 'Please select an address' }],
                  },
                ]"
                placeholder="Địa chỉ"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Kĩnh độ/Vĩ độ">
              <a-input
                v-decorator="[
                  'locationLng',
                  {
                    rules: [{ required: true, message: 'Please select an locationLng' }],
                  },
                ]"
                placeholder="Kĩnh độ/Vĩ độ"
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
      :width="600"
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
              <a-spin v-if="loadingMore"/>
              <a-button v-else @click="onLoadMore">
                loading more
              </a-button>
            </div>
            <a-list-item slot="renderItem" slot-scope="item">
              <a-checkbox slot="actions"></a-checkbox>
              <a-list-item-meta
                :description="`email: ${item.email}, gender: ${item.gender}`"
              >
                <a slot="title" href="https://www.facebook.com/chiem.dieu.18/">{{ item.name.last }}</a>
                <a-avatar
                  slot="avatar"
                  type="primary"
                  style="background-color:#87d068"
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
import search from '@/views/admin/crm/organization/orgrani/search'
import columns from './columns'
import columnsStaff from '@/views/admin/crm/organization/orgrani/columnsStaff'
import reqwest from 'reqwest'
import { api } from '@/api/crm/index'
import { executor } from '@/api'
import _merge from 'lodash/merge'

const treeData = [
  {
    title: 'Tổng công ty',
    key: 'root',
    children: [
      {
        title: 'Bưu điện thành phố Hà Nội',
        key: '0-0-0',
        children: [
          { title: 'Bưu điện Cầu Giấy', key: '0-0-0-0' },
          { title: 'Bưu điện quận hà đông', key: '0-0-0-1' },
          { title: 'Bưu điện quận thanh xuân', key: '0-0-0-2' },
          { title: 'Bưu điện quận nam từ liêm', key: '0-0-0-3' }
        ]
      },
      {
        title: 'Bưu điện thành phố Hồ Chí Minh',
        key: '1-0-0',
        children: [
          { title: 'Bưu điện quận 1', key: '1-0-0-0' },
          { title: 'Bưu điện quận 2', key: '1-0-0-1' },
          { title: 'Bưu điện quận 3', key: '1-0-0-2' },
          { title: 'Bưu điện quận 4', key: '1-0-0-3' },
          { title: 'Bưu điện quận 5', key: '1-0-0-4' },
          { title: 'Bưu điện quận 6', key: '1-0-0-5' },
          { title: 'Bưu điện quận 7', key: '1-0-0-6' },
          { title: 'Bưu điện quận 8', key: '1-0-0-7' }
        ]
      },
      {
        title: 'Bưu điện thành phố Khách hòa',
        key: '2-0-0',
        children: [
          { title: 'Bưu điện nha trang', key: '2-0-0-0' }
        ]
      },
      {
        title: 'Bộ phận tổng kế toán',
        key: '3-0-0'
      }
    ]
  }
]
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,description,email,nat&noinfo'

export default {
  data () {
    const self = this
    return {
      self,
      search,
      columns,
      columnsStaff,
      api: api.api,
      sys: api.system,
      typeComponent: '',
      searchFields: {},
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: ['0-0-0'],
      treeData,
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
      data: [],
      dataStaff: [],
      dataUnit: [],
      pagination: {
        current: 1,
        total: 1,
        pageSize: 15,
        pageSizes: 500,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '25', '50'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      }

    }
  },
  components: {
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
    async getDataUnit () {
      const $this = this
      const filter = {
        orgUnitSearchSdi: {}
      }
      const pagination = {
        'pageInfo': {
          'currentPage': 1,
          'pageSize': 5
        }
      }
      for (const key in this.searchFields) {
        filter.orgUnitSearchSdi[key] = this.searchFields[key].value
      }
      const params = _merge(pagination, filter)
      try {
        const { body } = await executor('app', $this.customUrl($this.sys.app, $this.api.searchOrgUnit), 'post', params)
        if (body) {
          this.dataUnit = body.result
        }
      } catch (e) {
        console.log(e)
      }
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
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
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
