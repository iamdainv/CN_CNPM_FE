<template>
  <a-form-model-item :label="label" :prop="prop" :rules="rules">
    <a-select v-model="model.value" showSearch showArrow allowClear :filter-option="filterSelectOption">
      <a-select-option v-for="(item, index) in items" :key="index" :value="item.value">
        {{ item.name }}
      </a-select-option>
    </a-select>
  </a-form-model-item>
</template>

<script>
export default {
  name: 'VaSelect',
  data () {
    return {
      items: this.$attrs.items,
      label: this.$attrs.label,
      rules: this.$attrs.rules,
      prop: this.$attrs.prop,
      model: {
        value: ''
      }
    }
  },
  watch: {
    'model.value': {
      deep: true,
      handler (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    getData () {
      const params = {}
      console.log(params)
    }
  }
}
</script>

<style scoped>

</style>
