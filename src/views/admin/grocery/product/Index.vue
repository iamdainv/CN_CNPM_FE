<template>
  <div>
    <breadcrumb/>
    <a-card title="Danh sách sản phẩm" style="margin-top: 8px">
      <div slot="extra">
        <a-button
          class="ant-btn ant-btn-primary"
          @click="getData"
          style="margin-right:1rem"
        >
          Làm mới
        </a-button>
        <a-button
          class="ant-btn ant-btn-primary"
          @click="addNew"
        >
          Thêm mới
        </a-button>
      </div>
      <a-row :gutter="16" type="flex">
        <a-col :span="24">
          <a-table
            :columns="columns"
            :data-source="data"
            :rowKey=" (rowKey, index ) => index"
            :pagination="data.length === 0 ? false : pagination"
            :loading="loading"
            @change="handleTableChange"
            class="ant-table-wrapper"
            :scroll="{x:'max-content'}"
          >
            <template slot="actionTitle">
              <a-icon type="control" :style="{fontSize: '14px'}"/>
            </template>
            <template slot="rowIndex" slot-scope="text, record, index">
              <span>{{ getTableRowIndex(pagination.pageSize, pagination.current, index) }} </span>
            </template>
            <template slot="updatedAt" slot-scope="text, record">
              <span>{{ record && record.updatedAt ? moment(record.updatedAt).format('DD/MM/YYYY') : '' }}</span>
            </template>
            <template slot="productTypeName" slot-scope="text, record">
              <span>{{ getNameCatById(record.id_category) }}</span>
            </template>
            <template slot="price" slot-scope="text, record">
              <span>{{ formatPrice(record.price) }}</span>
            </template>
            <template slot="createdAt" slot-scope="text, record">
              <span>{{ record && record.createdAt ? moment(record.createdAt).format('DD/MM/YYYY') : '' }}</span>
            </template>
            <template slot="isSell" slot-scope="text, record">
              <a-switch
                :checked="!!record.isSell"
                @change="switchStatus(record)"
              />
            </template>
            <template slot="image" slot-scope="text, record">
              <img
                class="image"
                :src="record.image"
                width="50"
                height="50"
              />
            </template>
            <template slot="operation" slot-scope="text, record">
              <div>
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>{{ `Xem chi tiết ${record.name}` }}</span>
                  </template>
                  <span style="padding-right:12px;cursor: pointer">
                    <a-icon
                      @click="onViewRow(record)"
                      theme="twoTone"
                      type="eye"
                    />
                  </span>
                </a-tooltip>
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>{{ `Cập nhật ${record.name}` }}</span>
                  </template>
                  <span @click="onEditRow(record)" class="vnpost-link">
                    <a-icon
                      theme="twoTone"
                      type="edit"
                    />
                  </span>
                </a-tooltip>
              </div>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>
    <DrawForm
      v-if="drawSync"
      :drawSync="drawSync"
      :drawTitle="drawTitle"
      :is-editable="drawIsEdit"
      :is-view="drawIsView"
      :is-create="drawIsCreate"
      @closeDraw="handleCancelDraw"
      :objectEdit="objectEdit"
      :list-product-type="treeData"
      :listStatus="listStatus"
    >
    </DrawForm>
  </div>
</template>

<script>
import columns from '@/views/admin/grocery/product/columns'
import DrawForm from './Form'
import { getListCategory } from '@/api/user/category'
import { changeProductStatus, getDetailProductAdmin, getListProductByAdmin } from '@/api/user/product'
import moment from 'moment'

export default {
  name: 'Index',
  components: {
    DrawForm
  },
  data () {
    return {
      columns,
      activeSearchKey: 1,
      data: [],
      treeData: [],
      dataFilter: [],
      listStatus: [],
      listBusinessDomain: [],
      listProductGroup: [],
      drawTitle: 'Thêm mới hàng hóa',
      drawSync: false,
      drawIsEdit: false,
      drawIsCreate: false,
      drawIsView: false,
      objectEdit: {},
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizes: 500,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      },
      loading: false,
      filters: {
        id_category: '',
        productName: '',
        status: ''
      }
    }
  },
  created () {
    // this.getListStatus()
    // this.getListBusinessDomain()
    this.getCategory()
    this.getData()
  },
  methods: {
    getNameCatById (id) {
      const nameCat = this.dataFilter.find(item => item.id === id)
      return nameCat.original_category_name
    },
    moment,
    list_to_tree (list) {
      var map = {}; var node; var roots = []; var i
      for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i // initialize the map
        list[i].children = [] // initialize the children
        list[i].title = list[i].original_category_name
        list[i].key = list[i].id
        list[i].value = list[i].id
      }
      for (i = 0; i < list.length; i += 1) {
        node = list[i]
        if (node.parent_category_id !== 0) {
            list[map[node.parent_category_id]].children.push(node)
        } else {
          roots.push(node)
        }
      }
      return roots
    },
    getCategory () {
      getListCategory().then(res => {
        this.dataFilter = res.data.data
        this.treeData = this.list_to_tree(res.data.data)
      })
    },
    switchStatus (record) {
      const that = this
      if (record) {
        this.$confirm({
          title: `Bạn muốn thay đổi trạng thái của ${record.name}?`,
          okType: 'primary',
          onOk () {
            that.changeStatusProduct(record)
          }
        })
      } else {
        this.$notification.warning({
          message: 'Không tìm thấy bản ghi',
          duration: 5
        })
      }
    },
    changeStatusProduct (record) {
      changeProductStatus(record.id).then(res => {
        this.$notification.success({
          message: 'Thay đổi trạng thái sản phẩm',
          description: 'Thay đổi trạng thái sản phẩm thành công',
          duration: 5
        })
        this.getData()
      }).catch(err => {
        console.log(err)
      }).finally(() => {

      })
    },
    getData () {
      const params = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      this.loading = true
      getListProductByAdmin(params).then(res => {
        const { total, list } = res.data.data
        this.data = list
        this.pagination.total = total
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },
    addNew (e) {
      e.stopPropagation()
      this.drawTitle = 'Thêm mới sản phẩm'
      this.drawIsCreate = true
      this.drawIsEdit = false
      this.drawIsView = false
      this.drawSync = true
    },
    onEditRow (record) {
      getDetailProductAdmin(record.id).then(res => {
        this.objectEdit = res.data.data
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.drawTitle = 'Cập nhật sản phẩm'
        this.drawIsCreate = false
        this.drawIsEdit = true
        this.drawIsView = false
        this.drawSync = true
      })
    },
    onViewRow (record) {
      getDetailProductAdmin(record.id).then(res => {
        this.objectEdit = res.data.data
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.drawTitle = 'Chi tiết sản phẩm'
        this.drawIsCreate = false
        this.drawIsEdit = false
        this.drawIsView = true
        this.drawSync = true
      })
    },
    search () {
      this.pagination.current = 1
      this.getData()
    },
    handleCancelDraw (reload = false) {
      this.drawSync = false
      if (reload) {
        this.getData()
      }
    }
  }
}
</script>

<style scoped>
.image{
  object-fit: cover;
}
</style>
