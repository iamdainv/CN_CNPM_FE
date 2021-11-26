<template>
  <nav class="mobile__category">
    <ul class="mobile__category-list">
      <li class="mobile__category-item" v-for="(cat, index) in listCategory" :key="index">
        <div class="mobile__category-link" @click="gotoProductsByCategory(cat)">{{ cat.original_category_name }}</div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'CategoryMobile',
  props: {
    listCategory: {
      required: true,
      type: Array
    }
  },
  methods: {
    gotoProductsByCategory (cat) {
      this.$router.push({ name: 'productsByCategory', params: { categoryId: cat.id } })
    }
  }
}
</script>

<style></style>
