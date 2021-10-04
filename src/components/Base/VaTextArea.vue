<template>
  <a-form-model-item :label="label" :prop="prop" :rules="rules">
    <a-textarea v-model="model.value"/>
  </a-form-model-item>
</template>

<script>
export default {
  name: 'VaInput',
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
      const params = {

      }
      console.log(params)
    }
  }
}
</script>

<style scoped>

</style>
