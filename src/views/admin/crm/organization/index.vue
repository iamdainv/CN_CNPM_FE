<template>
  <div>
    <div style="margin-bottom: 40px">
      <breadcrumb :breadcrumb="breadcrumb.breadcrumb" :text="breadcrumb.text">
        <template v-slot:setting>
          <div style="margin-left: auto">
            <a-select v-model="typeComponent" style="width: 200px">
              <a-select-option v-for="sys in systems" :key="sys.value" :value="sys.value">
                {{ sys.text }}
              </a-select-option>
            </a-select>
          </div>
        </template>
      </breadcrumb>
    </div>
    <div>
      <orgraniation v-if="typeComponent === 'organization'"/>
      <staff v-else/>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import breadcrumb from '@/views/admin/crm/organization/orgrani/breadcrumb'
import Orgraniation from '@/views/admin/crm/organization/orgrani'
import Staff from '@/views/admin/crm/organization/staff'

export default {
  data () {
    return {
      breadcrumb,
      typeComponent: 'organization',
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
      systems: [
        {
          text: 'Tổ chức',
          value: 'organization'
        },
        {
          text: 'Nhân viên',
          value: 'staff'
        }
      ]
    }
  },
  components: {
    Breadcrumb,
    Orgraniation,
    Staff
  },
  watch: {
    checkedKeys (val) {
    }
  },
  methods: {
  }
}
</script>
