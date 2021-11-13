<template>
  <div>
    <breadcrumb/>
    <a-form-model
      ref="ruleForm"
      :model="filters"
      @submit="search"
      layout="vertical">
      <a-collapse
        v-model="activeSearchKey"
        expandIconPosition="left"
        class="collapse-left">
        <a-collapse-panel header="Danh sách sản phẩm" key="1">
          <a-button
            slot="extra"
            class="ant-btn ant-btn-primary"
            @click="addNew"
          >
            Thêm mới
          </a-button>
          <a-card style="width: 100%;border: none" class="search-container">
            <a-row :gutter="16" type="flex">
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item
                  prop="id_category"
                  label="Loại sản phẩm"
                >
                  <a-tree-select
                    :allowClear="true"
                    style="width: 100%"
                    show-search
                    filterTreeNode
                    v-model="filters.id_category"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    :tree-data="treeData"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item
                  prop="productName"
                  label="Tên sản phẩm"
                  :rules="[
                    {
                      max: 200,
                      message: 'Nhập tối đa 200 ký tự',
                      trigger: 'change'
                    }
                  ]">
                  <a-input
                    v-model="filters.productName"
                    @blur="DeepTrimValue(filters)"
                    :maxLength="200"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item
                  prop="status"
                  label="Trạng thái"
                >
                  <a-select
                    :allowClear="true"
                    :filter-option="filterSelectOption"
                    show-search
                    style="width: 100%"
                    v-model="filters.status"
                  >
                    <a-select-option :value="''" :key="'all'"> -- Tất cả --</a-select-option>
                    <a-select-option v-for="item in listStatus" :value="item.key" :key="'l-'+item.key+'-s'">{{ item.value }}</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col
                :xs="24"
                :md="24"
                :lg="24"
                style="display: flex;justify-content: center"
              >
                <a-button class="btn-success uppercase" @click="resetForm" style="margin-right: 1rem">Nhập lại</a-button>
                <a-button v-action="'search'" type="primary" class="btn-success uppercase" @click="search" >Tìm kiếm</a-button>
              </a-col>
            </a-row>
          </a-card>
        </a-collapse-panel>
      </a-collapse>
    </a-form-model>
    <a-card style="margin-top: 8px">
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
                  <span v-action="'detail'" style="padding-right:12px;cursor: pointer">
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
                  <span v-action="'update'" @click="onEditRow(record)" class="vnpost-link">
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
import { getListProductByAdmin } from '@/api/user/product'
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
    changeStatusProduct () {

    },
    getData () {
      console.log(this.filters.id_category)
      getListProductByAdmin().then(res => {
        const { total, list } = res.data.data
        this.data = list
        this.pagination.total = total
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
      this.objectEdit = record
      this.drawTitle = 'Cập nhật sản phẩm'
      this.drawIsCreate = false
      this.drawIsEdit = true
      this.drawIsView = false
      this.drawSync = true
    },
    onViewRow (record) {
      this.objectEdit = record
      this.drawTitle = 'Chi tiết sản phẩm'
      this.drawIsCreate = false
      this.drawIsEdit = false
      this.drawIsView = true
      this.drawSync = true
    },
    resetForm (e) {
      this.$refs.ruleForm.resetFields()
      this.search(e)
    },
    search () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.pagination.current = 1
          this.getData()
        }
      })
    },
    onChangeStartDate (date) {
      this.filters.staTime = date
    },
    onChangeEndDate (date) {
      this.filters.endTime = date
    },
    disabledStartDate (startDate) {
      const endDate = this.filters.endTime
      if (!startDate || !endDate) {
        return false
      }
      return startDate.valueOf() > endDate.valueOf()
    },
    disabledEndDate (endDate) {
      const startDate = this.filters.staTime
      if (!startDate || !endDate) {
        return false
      }
      return startDate.valueOf() >= endDate.valueOf() - 1
    },
    handleCancelDraw (reload = false) {
      this.drawSync = false
      if (reload) {
        this.getData()
      }
    }
    // handlePaginationData (res) {
    //   if (res.body !== undefined) {
    //     return {
    //       total: res.body.totalRecord
    //     }
    //   }
    //   return {}
    // }
  }
}
</script>

<style scoped>
.image{
  object-fit: cover;
}
</style>
