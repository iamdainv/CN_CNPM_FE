<template>
    <div class="home-filter hide-on-mobile-tablet">
        <span class="home-filter__label">Sắp xếp theo</span>
        <button class="home-filter__btn btn">Phổ biến</button>
        <button class="home-filter__btn btn btn--primary">
            Phổ mới nhất
        </button>
        <button class="home-filter__btn btn">Phổ bán chạy</button>

        <div class="select-input">
            <span class="select-input__label">Giá</span>
            <i class="fas fa-angle-down select-input__icon"></i>
            <!-- list option -->
            <ul class="select-input__list">
            <li class="select-input__item">
                <a href="#" class="select-input__link">Giá: Thấp đến cao</a>
            </li>
            <li class="select-input__item">
                <a href="#" class="select-input__link">Giá: Cao đến thấp</a>
            </li>
            </ul>
        </div>

        <div class="home-filter__page">
            <span class="home-filter__page-num">
            <span class="home-filter__page-current">1</span>/14
            </span>

            <div class="home-filter__page-control">
            <a
                href="#"
                class="home-filter__page-btn  home-filter__page-btn--disable"
            >
                <i class="fas fa-angle-left home-filter__page-icon"></i>
            </a>
            <a href="#" class="home-filter__page-btn">
                <i class="fas fa-angle-right home-filter__page-icon"></i>
            </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'filter-products'
}
</script>

<style>

</style>
