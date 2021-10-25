<template>
  <div class="home-filter hide-on-mobile-tablet">
    <span class="home-filter__label">Sắp xếp theo</span>
    <button
      class="home-filter__btn btn"
      :class="currentSortType === sortType.popular ? 'btn--primary' : ''"
      @click="hanldeFilterBySortType(sortType.popular)">Phổ biến</button>
    <button
      class="home-filter__btn btn"
      :class="currentSortType === sortType.latest ? 'btn--primary' : ''"
      @click="hanldeFilterBySortType(sortType.latest)">Mới nhất</button>
    <button
      class="home-filter__btn btn"
      :class="currentSortType === sortType.hotSelling ? 'btn--primary' : ''"
      @click="hanldeFilterBySortType(sortType.hotSelling)">Bán chạy</button>

    <div class="select-input">
      <span class="select-input__label">Giá</span>
      <i class="fas fa-angle-down select-input__icon"></i>
      <!-- list option -->
      <ul class="select-input__list">
        <li class="select-input__item" style="cursor: pointer;" @click="handleSortPrice(sortPrice.asc)">
          <div class="select-input__link">
            <span :style="{ color: (currentSortPrice === sortPrice.asc ? 'var(--primary-color)' : '')}">Giá: Thấp đến cao</span>
            <i class="fas fa-check" v-if="currentSortPrice === sortPrice.asc" style="margin-left: 20px; color: var(--primary-color)"></i></div>
        </li>
        <li class="select-input__item" style="cursor: pointer;" @click="handleSortPrice(sortPrice.desc)">
          <div class="select-input__link">
            <span :style="{ color: (currentSortPrice === sortPrice.desc ? 'var(--primary-color)' : '')}">Giá: Cao đến thấp</span>
            <i class="fas fa-check" v-if="currentSortPrice === sortPrice.desc" style="margin-left: 20px; color: var(--primary-color)"></i></div>
        </li>
      </ul>
    </div>

    <div class="home-filter__page">
      <span class="home-filter__page-num">
        <span class="home-filter__page-current">{{ page }}</span>/{{ totalPage }}
      </span>

      <div class="home-filter__page-control">
        <a
          href="#"
          class="home-filter__page-btn"
          :class="page <= 1 ? 'home-filter__page-btn--disable' : ''"
          :disabled="page <= 1"
          @click="handlePagination(page - 1)"
        >
          <i class="fas fa-angle-left home-filter__page-icon"></i>
        </a>
        <a
          href="#"
          class="home-filter__page-btn"
          :class="page >= totalPage ? 'home-filter__page-btn--disable' : ''"
          :disabled="page >= totalPage"
          @click="handlePagination(page + 1)">
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
    page: {
      required: true,
      type: Number
    },
    sortType: {
      required: true,
      type: Object
    },
    currentSortType: {
      required: true,
      type: Number
    },
    sortPrice: {
      required: true,
      type: Object
    },
    currentSortPrice: {
      required: true,
      type: Number
    }
  },
  methods: {
    handlePagination (page) {
      this.$emit('getByPagination', page)
    },
    hanldeFilterBySortType (sortType) {
      this.$emit('getBySortType', sortType)
    },
    handleSortPrice (sortPrice) {
      this.$emit('getByPrice', sortPrice)
    }
  }
}
</script>

<style>

</style>
