<template>
  <div>
    <a-row>
      <a-col :lg="16">
        <a-carousel :autoplay="true">
          <img
            style=" height: 235px; width: 900px;"
            class="d-block w-100"
            src="https://cf.shopee.vn/file/6c02f7b917400b2a32a544fb82d8dd19_xxhdpi"
            alt="First slide"
          />
          <img
            style=" height: 235px; width: 900px;"
            class="d-block w-100"
            src="https://cf.shopee.vn/file/6c02f7b917400b2a32a544fb82d8dd19_xxhdpi"
            alt="First slide"
          />
          <img
            style=" height: 235px; width: 900px;"
            class="d-block w-100"
            src="https://cf.shopee.vn/file/6c02f7b917400b2a32a544fb82d8dd19_xxhdpi"
            alt="First slide"
          />
        </a-carousel>
      </a-col>
      <a-col :lg="2">
        <div style="margin-left:5px" class="hide-on-mobile-tablet">
          <img
            style=" height: 115px; width: 400px; margin-bottom:5px; border-radius:5px"
            class="d-block "
            src="https://cf.shopee.vn/file/163bd81bc1a24b94de0b6a6dc89deb3a_xxhdpi"
            alt="First slide"
          />
          <img
            style=" height: 115px; width: 400px;border-radius:5px"
            class="d-block "
            src="https://cf.shopee.vn/file/163bd81bc1a24b94de0b6a6dc89deb3a_xxhdpi"
            alt="First slide"
          />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'HomeCarousel'
}
</script>

<style scoped></style>
