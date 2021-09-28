<template>
  <div>
    <div style="display: flex">
      <div>
        <a-breadcrumb separator=">">
          <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
            <router-link :to="{name: item.routerName}">{{ $t(item.text) }}</router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <h2 style="text-transform: uppercase">{{ $t(title) }}</h2>
      </div>
      <slot name="setting"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      breadcrumb: this.$attrs.breadcrumb,
      title: this.$attrs.text
    }
  }
}
</script>
