<template>
  <div>
    <div class="comment" style=" width: 100%; margin-bottom: 50px;">
      <div id="editor">

      </div>

    </div>
    <div style=" width: 100%;" class="comment">
      <div id="rateYo" class="mt-4"></div>
      <div class="form-group f-14 mt-4">
        <label class="col-md-8 control-label" htmlFor="filebutton">Đăng ảnh</label>
        <div class="col-md-8">
          <input
            id="filebutton"
            multiple
            name="filebutton"
            class="input-file"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange="" />
        </div>
      </div>
      <div class="weeklyPreview ">

      </div>
      <button type="button" class="h-button__red p-3 h-color__white cursor-pointer f-14 mt-5" id="btn-add-comment">Bình luận</button>
      <hr />
    </div>

    <div class="description-product__information w-100">
      <div class="bg-blur detail-product__information w-100">
        <div class="title__name py-3 pl-3">ĐÁNH GIÁ SẢN PHẨM</div>
      </div>
      <div class="f-14 p-3">
        <div class="list-comment_product">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment'
}
</script>

<style>
.weeklyPreview {
    display: flex;
    flex-wrap: wrap;
}

.weeklyPreview img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin: 10px;
    border-radius: 5px;
}

.weeklyPreview div {
    position: relative;
}

.weeklyPreview div::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background-image: url(https://www.flaticon.com/svg/vstatic/svg/1828/1828945.svg?token=exp=1620505409~hmac=dfe311db4e0a62036810a211fa615513);
    top: 4px;
    right: 2px;
    z-index: 1;
    background-position: center;
    background-size: cover;
    background-color: white;
    border-radius: 100%;
    cursor: pointer;
}
</style>
