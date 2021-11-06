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
                  prop="bDomainId"
                  label="Loại sản phẩm"
                >
                  <a-select
                    :allowClear="true"
                    :filter-option="filterSelectOption"
                    show-search
                    style="width: 100%"
                    v-model="filters.bDomainId"
                    @change="handleSelectBDomain"
                  >
                    <a-select-option :value="''" :key="'all'"> -- Tất cả --</a-select-option>
                    <a-select-option
                      v-for="item in listBusinessDomain"
                      :key="'p-g-' + item.code"
                      :value="item.value">{{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :xs="24" :md="6" :lg="6" class="filter-item-container">
                <a-form-model-item
                  prop="productCode"
                  label="Mã sản phẩm"
                  :rules="
                    [
                      {
                        max: 50,
                        message: 'Nhập tối đa 50 ký tự',
                        trigger: 'change'
                      },{
                        validator: inputNumberSpecialCharacters,
                        message: 'Chỉ cho phép nhập số, chữ không dấu và dấu _',
                        trigger: 'change'
                      }
                    ]">
                  <a-input
                    v-model="filters.productCode"
                    @blur="DeepTrimValue(filters)"
                    :maxLength="50"
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
            <template slot="staTime" slot-scope="text, record">
              <span>{{ record && record.staTime ? moment(record.staTime,'DD/MM/YYYY').format('DD/MM/YYYY') : '' }}</span>
            </template>
            <template slot="endTime" slot-scope="text, record">
              <span>{{ record && record.endTime ? moment(record.endTime,'DD/MM/YYYY').format('DD/MM/YYYY') : '' }}</span>
            </template>
            <template slot="createTime" slot-scope="text, record">
              <span>{{ record && record.createTime ? moment(record.createTime,'DD/MM/YYYY').format('DD/MM/YYYY') : '' }}</span>
            </template>
            <template slot="status" slot-scope="text, record">
              <a-switch
                v-action="'change_status'"
                :checked="!!record.status"
                @change="switchStatus(record)"
              />
            </template>
            <template slot="operation" slot-scope="text, record">
              <div>
                <a-tooltip placement="top">
                  <template slot="title">
                    <span>{{ `Xem chi tiết ${record.productName}` }}</span>
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
                    <span>{{ `Cập nhật ${record.productName}` }}</span>
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
      :listBusinessDomain="listBusinessDomain"
      :listStatus="listStatus"
    >
    </DrawForm>
  </div>
</template>

<script>
import columns from '@/views/admin/grocery/product/columns'
import DrawForm from './Form'

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
        pageSize: 15,
        pageSizes: 500,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '25', '100'],
        showTotal: (total) => {
          return 'Tổng số dòng ' + total
        }
      },
      loading: false,
      filters: {
        productCode: '',
        productName: '',
        bDomainId: '',
        pGroupCode: '',
        staTime: '',
        endTime: '',
        status: ''
      }
    }
  },
  created () {
    this.getListStatus()
    this.getListBusinessDomain()
    this.getData()
  },
  methods: {
    switchStatus (record) {
      const that = this
      if (record) {
        this.$confirm({
          title: `Bạn muốn thay đổi trạng thái của ${record.productName}?`,
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
    getData () {

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

</style>
