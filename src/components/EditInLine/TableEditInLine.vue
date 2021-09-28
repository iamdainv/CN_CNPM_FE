<template>
  <main-layout>
    <template v-slot:breadcrumb>
      <a-breadcrumb separator=">">
        <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
          <router-link :to="{name: item.routerName}">{{ item.text }}</router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </template>
    <a-collapse v-model="activeSearchKey" expandIconPosition="left" class="collapse-left" style="margin-bottom: 8px">
      <a-collapse-panel :header="titleSearch" key="1">
        <a-card style="width: 100%;border: none" class="search-container">
          <a-form-model v-bind="attrSearch" :model="searchFields" ref="searchForm">
            <a-row :gutter="24">
              <a-col
                v-for="(item, index) in searchFields"
                :lg="item.lg"
                :md="item.md"
                :xs="item.xs"
                :key="index">
                <a-form-model-item
                  :ref="item.prop"
                  :prop="item.prop + '.value'"
                  :label="item.text"
                  :rules="item.rules">
                  <component
                    :is="item.type"
                    v-model="item.value"
                    :key="item.text"
                  >
                    <a-select-option v-if="item.type === 'a-select'" v-for="(field, fieldIndex) in item.items" :key="fieldIndex" :value="field.value">{{ field.name }}</a-select-option>
                  </component>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-col
              :xs="24"
              :md="10"
              :lg="10"
              class="filter-item-container"
              style="display: flex;flex-wrap: wrap; margin-top: 17px">
              <a-button
                v-for="(item, index) in searchButton"
                v-bind="item.attrs"
                v-on="item.on"
                @click="item.on['click'](self)"
                :key="index"
                class="uppercase"
                style="margin-right: 1rem;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);">
                {{ item.attrs.text }}
              </a-button>
            </a-col>
          </a-form-model>
        </a-card>
      </a-collapse-panel>
    </a-collapse>
    <a-collapse v-model="searchResults" expandIconPosition="left" class="collapse-left">
      <a-collapse-panel :header="titleSearch" key="1">
        <a-card style="width: 100%; border: none" class="vts-table-container">
          <a-row>
            <a-col :span="12">
            </a-col>
            <a-col :span="12" class="btn-container">
              <a-button
                v-if="hasComponentPermission('QLKD_DANH_MUC_DUNG_CHUNG_THEM_MOI_DANH_MUC')"
                class="ant-btn ant-btn-primary"
                :disabled="disabledCreated"
                @click="addRow">
                <a-icon type="plus-circle"/>
                Thêm mới
              </a-button>
            </a-col>
          </a-row>
          <a-row :gutter="16" type="flex">
            <a-col :span="24">
              <div class="wrapper1" v-if="table.columns.length > 5">
                <div class="div1"></div>
              </div>
              <a-form-model ref="formDataTable" :model="formValidate" hideRequiredMark>
                <a-table
                  ref="tb1"
                  @expand="expandRow"
                  :data-source="data"
                  :expandedRowKeys="expandedRowKeys"
                  :columns="table.columns"
                  :rowKey="rowKey"
                  :pagination="pagination"
                  :loading="loadingTable"
                  :locale="{ emptyText: 'Chưa có dữ liệu' }"
                  @change="handleTableChange"
                  class="ant-table-bordered">

                  <template slot="actionTitle">
                    <a-icon type="control" :style="{fontSize: '14px'}"/>
                  </template>
                  <slot v-for="(_, name) in $slots" :name="name" :slot="name"></slot>
                  <template v-for="(_, slot) in $scopedSlots" :name="slot" :slot="slot" slot-scope="text, record">
                    <slot :name="slot" v-bind="record"></slot>
                  </template>
                  <template
                    v-for="(field, indexField) in formOptions"
                    :slot="field.prop"
                    slot-scope="text, record, index"
                  >
                    <a-form-model-item
                      :key="indexField"
                      v-if="record.editable === true"
                      :ref="field.prop"
                      :prop="'items.' + index + '.' + field.prop"
                      :rules="field.rules">
                      <component
                        :is="field.type"
                        :items="field.items"
                        v-model="record[field.prop]"
                        :key="field.text"
                        :name="field.prop"
                        :value="field.prop['value']"
                        :prop="'items.' + index + '.' + field.prop"
                        :rules="field.rules"
                      >
                        <a-select-option v-if="field.type === 'a-select'" v-for="(itemFields, indexFileds) in field.items" :key="indexFileds" :value="itemFields.value">{{ itemFields.name }}</a-select-option>
                      </component>
                    </a-form-model-item>
                    <template v-else >
                      <span :key="field.text">
                        <span v-if="field.type === 'a-select'">
                          {{ getText(field.items, text, 'value', 'name') }}
                        </span>
                        <span v-else>
                          {{ text }}
                        </span>
                      </span>
                    </template>
                  </template>
                </a-table>
              </a-form-model>
            </a-col>
          </a-row>
        </a-card>
      </a-collapse-panel>
    </a-collapse>
  </main-layout>
</template>

<script>
import MainLayout from '@/pages/layouts/MainLayoutSystem.vue'
import { executor } from '@/api/globalFunctionApi'
import api from '@/api'
import _merge from 'lodash/merge'

export default {
  name: 'TableEditInLine',
  components: {
    MainLayout
  },
  data () {
    const self = this
    return {
      api,
      self,
      activeSearchKey: 1,
      searchResults: 1,
      titleSearch: this.$attrs.tableOptions['searchTable'].search.title,
      breadcrumb: this.$attrs.tableOptions['searchTable'].breadcrumb,
      searchFields: this.$attrs.tableOptions['searchTable'].search.searchField,
      searchButton: this.$attrs.tableOptions['searchTable'].search.searchButton,
      attrSearch: this.$attrs.tableOptions['searchTable'].search.attrs,
      formOptions: this.$attrs.tableOptions['form'].fields,
      table: {
        columns: this.$attrs.tableOptions['table'].columns
      },
      data: [],
      expandedRowKeys: [],
      loadingTable: false,
      pagination: {
        current: 1,
        total: 0,
        pageSize: 15,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['15', '25', '50'],
        showTotal: (total) => {
          console.log(total)
          return `Tổng số dòng ${total}`
        }
      }
    }
  },
  computed: {
    formValidate () {
      return {
        items: this.data
      }
    },
    disabledCreated () {
      return this.data.some(item => {
        return item.editable === false
      })
    }
  },
  created () {
    this.getData()
  },
  methods: {
    search () {
      this.$refs['searchForm'].validate(valid => {
        if (valid) {
          this.getData()
        }
      })
    },
    getData () {
      const self = this
      self.loadingTable = true
      self.expandedRowKeys = []
      let params = {}
      if (this.searchFields) {
        for (const key in this.searchFields) {
          params[key] = this.searchFields[key].value
        }
      }
      const pagination = {
        page: this.pagination.current - 1,
        size: this.pagination.pageSize
      }
      params = _merge(params, pagination)
      executor(self.api.searchGlobalList, 'get', params).then(result => {
        self.data = result.content
        this.pagination.total = this.data.length
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        this.loadingTable = false
      })
    },
    expandRow (expand, record) {
      this.$emit('expandRow', record)
      if (expand) {
        this.expandedRowKeys = [...this.expandedRowKeys, record.rowKey]
        console.log(this.expandedRowKeys)
      } else {
        this.expandedRowKeys = this.expandedRowKeys.filter(rowKey => rowKey !== record.rowKey)
      }
    },
    rowKey (record, index) {
      record.rowKey = index
      return record.rowKey
    },
    handleTableChange (pagination, filters, sorter) {
      this.pagination = pagination
      this.getData()
    },
    appendRowEmpty (numberRow) {
      const { data } = this
      if (data.length + numberRow > this.pagination.pageSize) {
        data.splice(this.pagination.pageSize - numberRow, numberRow)
      }
      for (let i = 0; i < numberRow; i++) {
        const newData = {
          description: '',
          globallistId: null,
          name: '',
          code: '',
          status: '1',
          editable: true,
          values: []
        }
        this.data = [newData, ...data]
        this.expandedRowKeys = []
      }
    },
    addRow () {
      this.appendRowEmpty(1)
    }
  }
}
</script>

<style scoped>

</style>
