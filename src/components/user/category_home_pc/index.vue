<template>
  <div class="category">
    <h3 class="category__heading">
      <i class="category__heading-icon fas fa-list-ul"></i>
      Danh mục
    </h3>
    <ul class=" row-lbr sm-gutter list-product category-list-home">
      <li class="category-item l-1" v-for="(cat, index) in listCategory" :key="index">
        <div class="category-item__content category-item__link" @click="gotoProductsByCategory(cat)">
          <div
            class="home-produce-item__img image-category"
            :style="'background-image: url(' + cat.image + ');'"
          ></div>
          <div class="category-name">{{ cat.original_category_name }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CategoryHome',
  props: {
    listCategory: {
      type: Array,
      required: true
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
