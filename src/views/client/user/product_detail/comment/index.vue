<template>
  <div>

    <div class="description-product__information w-100">
      <div class="bg-blur detail-product__information w-100">
        <div class="title__name py-3 pl-3">ĐÁNH GIÁ SẢN PHẨM</div>
      </div>
      <div class="f-14 p-3">
        <div v-if="isBought">
          <div class="comment" style=" width: 100%; margin-bottom: 5px;">
            <div id="editor">
              <Textarea limit="1500" :value="commentText" @change="handleChange"></Textarea>
            </div>

          </div>
          <div style=" width: 100%;" class="comment">
            <div class="form-group f-14" style="max-width: 70%">
              <label class="control-label" htmlFor="filebutton">Đăng ảnh</label>
              <UploadFile @change="handleChangeImage" :images="images"/>
            </div>
            <div ><label class="control-label" htmlFor="filebutton">Đánh giá</label>
              <AwesomeVueStarRating
                class="star2"
                :maxstars="5"
                :star="this.star"
                :hasresults="false"
                @change="handleChangeRatingStar"
              /></div>

          </div>
          <button type="button" class="h-button__red p-3 h-color__white cursor-pointer f-14 mt-5" id="btn-add-comment" @click="addCommentToProduct">Bình luận</button>
        </div>

        <div v-if="comments.length === 0" class="comment-empty__container purchase-empty-order__container purchase-list-page__empty-page-wrapper" >
          <div class="purchase-empty-order__icon"></div>
          <div class="purchase-empty-order__text">Không có nhận xét</div>
        </div>
        <div class="list-comment_product" v-else>
          <div class="comment-item-container" v-for="(comment,index) in comments" :key="index">
            <div class="comment-item-wrapper"><div class="user-photo">
                                                <img class="user-photo-comment" src="https://i.pinimg.com/originals/50/05/f5/5005f514424141acf70727360add163d.png">
                                              </div>
              <div class="comment-content-container">
                <p class="comment-username"> {{ comment.user_comment.username }} </p>
                <AwesomeVueStarRating
                  class="star2"
                  :maxstars="5"
                  :star="+comment.comment.star"
                  :hasresults="false"
                  :hasdescription="false"
                  disabled
                />
                <p class="comment-content"> {{ comment.comment.comment }} </p>
                <div class="list-image-container"><div v-for="(image, index) in comment.comment.images" :key="index" class="square image-item">
                  <img :src="image" class="square" style="object-fit:cover">
                </div>
                </div>

                <p class="comment-createdAt"> {{ moment(comment.comment.createdAt).format("yyyy-mm-dd hh:mm") }} </p></div></div>
            <hr/>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AwesomeVueStarRating from '@/components/Rating/Rating'
import UploadFile from '@/components/UploadFile/UploadFile'
import Textarea from '@/components/TextArea/index'
import moment from 'moment'
function initValueState () {
  return {
    commentText: '',
    images: [],
    star: 4
  }
}

export default {
  name: 'Comment',
  components: { Textarea, UploadFile, AwesomeVueStarRating },
  props: {
    isBought: Boolean,
    comments: Array
  },
  data () {
    return initValueState()
  },
  methods: {
    moment: function () {
      return moment()
    },
    handleChange (text) {
      this.commentText = text
    },
    handleChangeImage (images) {
      this.images = images
    },
    handleChangeRatingStar (value) {
        this.star = value
    },
    addCommentToProduct () {
      this.resetWindow()
      console.log(this.$data, initValueState())
    },
    resetWindow: function () {
      Object.assign(this.$data, initValueState())
    }
  }
}
</script>

<style>
.weeklyPreview {
    display: flex;
    flex-wrap: wrap;
}
#editor{
  width: 100%;
}
.comment{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
.comment-empty__container{
  height: 15rem !important;
}

.comment-item-container{

  margin-top: 20px;
  margin-bottom: 20px;
}

.comment-item-wrapper{
  display: flex;
}

.user-photo-comment{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-content{
  font-size: 13px;
  font-weight: 600;
}

.comment-createdAt{
  margin-top: 10px;
  font-size: 11px;
}
p {
  margin-bottom: 2px;
}
</style>
