<template>

  <div style="display: flex">

    <a-breadcrumb separator=">">
      <a-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">
        <router-link to="/" v-if="index === 0">{{ item.text }}</router-link>
        <span v-else> {{ item.text }} </span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <!--        <h2 style="text-transform: uppercase">{{ $t(title) }}</h2>-->

    <slot name="setting"></slot>
  </div>

</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    breadcrumb: Array
  }

}
</script>

<style scoped>
.ant-breadcrumb-link{
  color: #10c2ff;
}
</style>
