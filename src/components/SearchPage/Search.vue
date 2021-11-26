<template>
  <a-form-model :model="searchFields" ref="searchForm">
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
          v-bind="item.attrs"
          v-model="item.value"
          :key="item.text"
        >
          <a-select-option v-if="item.type === 'a-select'" v-for="(field, fieldIndex) in item.items" :key="fieldIndex" :value="field.value">{{ field.name }}</a-select-option>
        </component>
      </a-form-model-item>
    </a-col>
  </a-form-model>
</template>

<script>
export default {
  name: 'Search',
  watch: {
    searchFields: {
      handler (val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  data () {
    const self = this
    return {
      self,
      activeSearchKey: 1,
      searchFields: this.$attrs['search-fields']['searchField'],
      searchButton: this.$attrs['search-fields']['searchButton']
    }
  },
  mounted () {
    console.log(this.$attrs)
  }
}
</script>

<style scoped>

</style>
