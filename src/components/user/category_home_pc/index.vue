<template>
  <div class="category">
    <h3 class="category__heading">
      <i class="category__heading-icon fas fa-list-ul"></i>
      Danh mục
    </h3>
    <ul class=" row-lbr sm-gutter list-product">
      <li class="category-item l-1" v-for="(cat, index) in listCategory" :key="index">
        <a href="" class="category-item__link">
          <div
            class="home-produce-item__img image-category"
            style="background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnnx2KJ1IJAuVvf1jcdOvKMd36UuVOkkrtdQ&usqp=CAU');"
          ></div>
          <div class="category-name">cat.name</div>
        </a>
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
  }
}
</script>

<style></style>
