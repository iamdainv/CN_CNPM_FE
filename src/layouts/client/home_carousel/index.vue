<template>
  <div class="grid wide d-flex mb-5">

    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">

    </div>
    <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="1000">

      <!-- Indicators -->
      <ul class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ul>

      <!-- The slideshow -->
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img style=" height: 235px; width: 795px;" class="d-block w-100" src="https://cf.shopee.vn/file/6c02f7b917400b2a32a544fb82d8dd19_xxhdpi" alt="First slide">
        </div>
        <div class="carousel-item">
          <img style=" height: 235px; width: 795px;" class="d-block w-100" src="https://cf.shopee.vn/file/6c02f7b917400b2a32a544fb82d8dd19_xxhdpi" alt="First slide">
        </div>
        <div class="carousel-item">
          <img style=" height: 235px; width: 795px;" class="d-block w-100" src="https://cf.shopee.vn/file/6c02f7b917400b2a32a544fb82d8dd19_xxhdpi" alt="First slide">
        </div>
      </div>

      <!-- Left and right controls -->
      <a class="carousel-control-prev" href="#myCarousel" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </a>
      <a class="carousel-control-next" href="#myCarousel" data-slide="next">
        <span class="carousel-control-next-icon"></span>
      </a>
    </div>
    <div style="margin-left:5px" class="hide-on-mobile-tablet">
      <img style=" height: 115px; width: 400px; margin-bottom:5px; border-radius:5px" class="d-block " src="https://cf.shopee.vn/file/163bd81bc1a24b94de0b6a6dc89deb3a_xxhdpi" alt="First slide">
      <img style=" height: 115px; width: 400px;border-radius:5px" class="d-block " src="https://cf.shopee.vn/file/163bd81bc1a24b94de0b6a6dc89deb3a_xxhdpi" alt="First slide">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeCarousel'
}
</script>

<style>

</style>
