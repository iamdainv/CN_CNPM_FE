<template>
  <nav class="category category-sidebar">
    <h3 class="category__heading">
      <i class="category__heading-icon fas fa-list-ul"></i>
      Danh mục
    </h3>
    <ul class="category-list">
      <li
        :class="Number.parseInt(cat.id) === currentIdCategory ? 'mobile__category-item category-item--active' : 'mobile__category-item'"
        v-for="(cat, index) in listCategory"
        :key="index"
      >
        <div
          class="category-item__link"
          @click="gotoProductsByCategory(cat)">{{ cat.original_category_name }}</div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'ListCategory',
  data () {
    return {
      currentIdCategory: null
    }
  },
  props: {
    listCategory: {
      required: true,
      type: Array
    }
  },
  created () {
    this.currentIdCategory = Number.parseInt(this.$route.params.categoryId)
  },
  updated () {
    this.currentIdCategory = Number.parseInt(this.$route.params.categoryId)
  },
  methods: {
    gotoProductsByCategory (cat) {
      if (Number.parseInt(cat.id) !== this.currentIdCategory) {
        this.currentIdCategory = cat.id
        this.$emit('getByCategoryId', cat.id)
        this.$router.push({ name: 'productsByCategory', params: { categoryId: cat.id } })
      }
    }
  }
}
</script>

<style>

</style>
