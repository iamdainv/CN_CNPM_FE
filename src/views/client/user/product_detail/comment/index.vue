<template>
  <div>

    <div class="description-product__information w-100">
      <div class="bg-blur detail-product__information w-100">
        <div class="title__name py-3 pl-3">ĐÁNH GIÁ SẢN PHẨM</div>
      </div>
      <div class="f-14 p-3">
        <div v-if="isBought">
          <div @click="visibleInputComment = !visibleInputComment" class="show-input-comment">
            <i class="fas fa-arrow-right"></i>   <p class="text-show-input-comment">Bình luận</p>
          </div>
          <div v-if="visibleInputComment" style="margin-top: 10px">
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
        </div>

        <div v-if="comments.length === 0" class="comment-empty__container purchase-empty-order__container purchase-list-page__empty-page-wrapper" >
          <div class="purchase-empty-order__icon"></div>
          <div class="purchase-empty-order__text">Không có nhận xét</div>
        </div>
        <div class="list-comment_product" v-else>
          <div class="comment-item-container" v-for="(comment,index) in comments" :key="index">
            <comment-item :comment="comment"></comment-item>
          </div>
        </div>
      </div>
    </div>
  </div></template>

<script>
import AwesomeVueStarRating from '@/components/Rating/Rating'
import UploadFile from '@/components/UploadFile/UploadFile'
import Textarea from '@/components/TextArea/index'
import moment from 'moment'
import VueEasyLightbox from 'vue-easy-lightbox'
import CommentItem from './comment-item'
function initValueState () {
  return {
    commentText: '',
    images: [],
    star: 4,
    visibleInputComment: false
  }
}

export default {
  name: 'Comment',
  components: { Textarea, UploadFile, AwesomeVueStarRating, VueEasyLightbox, CommentItem },
  props: {
    isBought: Boolean,
    comments: Array,
    loadingComment: Boolean,
    totalComment: Number
  },
  data () {
    return {
      commentText: '',
      images: [],
      star: 0,
      visibleInputComment: false
    }
  },
  // computed: {
  //   formatComments: function () {
  //     // `this` points to the vm instance
  //     return this.comments.map(comment => )
  //   }
  // },
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
      if (this.commentText || this.images || this.star) {
        this.$emit('onSubmitCreateComment', this.commentText, this.images, this.star)
        this.resetWindow()
      }
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

.rating-media-list__zoomed-video-item{
  width: 50rem;
  height: 50rem;
}

.video-container{
  position: relative;
}

.video-item{
  width: 100%;
  height: 100%;
}

.shopee-svg-icon{
  position: absolute;
  width: 6.25rem;
  height: 6.25rem;
  top: 50%;
  left: 50%;
  -webkit-transform: translate3d(-3.125rem,-3.125rem ,0);
  transform: translate3d(-3.125rem,-3.125rem,0);
  pointer-events: none;
}

.show-input-comment{
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  background-color: #e7e7e7;
  padding: 5px;
  border-radius: 4px;
  margin-left: -1rem;
  margin-right: -1rem;
}

.text-show-input-comment{
  margin-left: 10px;
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
