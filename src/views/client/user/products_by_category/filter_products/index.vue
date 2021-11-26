<template>
  <div class="home-filter hide-on-mobile-tablet">
    <span class="home-filter__label">Sắp xếp theo</span>
    <button
      class="home-filter__btn btn"
      :class="currentSortType === sortType.POPULAR ? 'btn--primary' : ''"
      @click="handleSortProducts(sortType.POPULAR, orderType.DESC)">Phổ biến</button>
    <button
      class="home-filter__btn btn"
      :class="currentSortType === sortType.NEWEST ? 'btn--primary' : ''"
      @click="handleSortProducts(sortType.NEWEST, orderType.DESC)">Mới nhất</button>
    <button
      class="home-filter__btn btn"
      :class="currentSortType === sortType.BEST_SALE ? 'btn--primary' : ''"
      @click="handleSortProducts(sortType.BEST_SALE, orderType.DESC)">Bán chạy</button>

    <div class="select-input" :class="currentSortType === sortType.PRICE ? 'active' : ''">
      <span class="select-input__label" style="color: var(--primary-color);" v-if="currentSortType === sortType.PRICE && currentOrderType === orderType.ASC">Giá: thấp đến cao</span>
      <span class="select-input__label" style="color: var(--primary-color);" v-else-if="currentSortType === sortType.PRICE && currentOrderType === orderType.DESC">Giá: Cao đến thấp</span>
      <span class="select-input__label" v-else>Giá</span>
      <i class="fas fa-angle-down select-input__icon"></i>
      <!-- list option -->
      <ul class="select-input__list">
        <li class="select-input__item" style="cursor: pointer;" @click="handleSortProducts(sortType.PRICE, orderType.ASC)">
          <div class="select-input__link">
            <span :style="{ color: (currentSortType === sortType.PRICE && currentOrderType === orderType.ASC ? 'var(--primary-color)' : '')}">Giá: Thấp đến cao</span>
            <i class="fas fa-check" v-if="currentSortType === sortType.PRICE && currentOrderType === orderType.ASC" style="margin-left: 20px; color: var(--primary-color)"></i></div>
        </li>
        <li class="select-input__item" style="cursor: pointer;" @click="handleSortProducts(sortType.PRICE, orderType.DESC)">
          <div class="select-input__link">
            <span :style="{ color: (currentSortType === sortType.PRICE && currentOrderType === orderType.DESC ? 'var(--primary-color)' : '')}">Giá: Cao đến thấp</span>
            <i class="fas fa-check" v-if="currentSortType === sortType.PRICE && currentOrderType === orderType.DESC" style="margin-left: 20px; color: var(--primary-color)"></i></div>
        </li>
      </ul>
    </div>

    <div class="home-filter__page">
      <span class="home-filter__page-num">
        <span class="home-filter__page-current">{{ currentPage }}</span>/{{ totalPage }}
      </span>

      <div class="home-filter__page-control">
        <a
          href="#"
          class="home-filter__page-btn"
          :class="currentPage <= 1 ? 'home-filter__page-btn--disable' : ''"
          :disabled="currentPage <= 1"
          @click="handlePagination(currentPage - 1)"
        >
          <i class="fas fa-angle-left home-filter__page-icon"></i>
        </a>
        <a
          href="#"
          class="home-filter__page-btn"
          :class="currentPage >= totalPage ? 'home-filter__page-btn--disable' : ''"
          :disabled="currentPage >= totalPage"
          @click="handlePagination(currentPage + 1)">
          <i class="fas fa-angle-right home-filter__page-icon"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterProducts',
  props: {
    totalPage: {
      required: true,
      type: Number
    },
    currentPage: {
      required: true,
      type: Number
    },
    sortType: {
      required: true,
      type: Object
    },
    currentSortType: {
      required: true,
      type: String
    },
    orderType: {
      required: true,
      type: Object
    },
    currentOrderType: {
      required: true,
      type: String
    }
  },
  methods: {
    handlePagination (pageNum) {
      this.$emit('getByPagination', { page: pageNum })
    },
    handleSortProducts (sortType, orderType) {
      this.$emit('sortProducts', { sortType: sortType, orderType: orderType })
    }
  }
}
</script>

<style>

</style>
