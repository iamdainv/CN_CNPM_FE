<template>
  <div>

    <div class="comment-item-wrapper">
      <div class="user-photo">
        <img class="user-photo-comment" :src="comment.userInfo.photo">
      </div>
      <div class="comment-content-container">
        <p class="comment-username"> {{ comment.userInfo.name }} </p>
        <AwesomeVueStarRating
          class="star2"
          :maxstars="5"
          :star="+comment.star"
          :hasresults="false"
          :hasdescription="false"
          :hasTextDescription="false"
          disabled
        />
        <p class="comment-content" v-html="comment.comment" style="white-space: pre-wrap;"></p>
        <div class="list-image-container">

          <vue-easy-lightbox
            escDisabled
            moveDisabled
            :visible="visibleImagePreview"
            :imgs="imagesFromUserCommentFormat"
            :index="indexPickImagePreView"
            @hide="handleHide"
          ></vue-easy-lightbox>
          <div
            v-for="(image, mediaIndex) in comment.images"
            :key="image.id"
            class="square image-item"
            @click="image.fileType === 'image/jpeg' ? showPreviewImage(mediaIndex, comment.images) : showVideoContent(image.path, mediaIndex) ">
            <img :src="image.path" class="square" style="object-fit:cover" v-if="image.fileType === 'image/jpeg'">
            <video v-if="image.fileType === 'video/mp4'" ref="videoRef" class="video-item" style="background-color: black" :src="image.path ">
            </video>
          </div>
        </div>
        <div class="video-container" v-if="visibleVideoContent">
          <video
            ref="videoRef"
            id="videoElement"
            class="rating-media-list__zoomed-video-item"
            controls
            autoplay
            style="background-color: black">
            <source :src="videoPreview.path " type="video/mp4">

            Your browser does not support HTML video.
          </video>

          <svg
            enable-background="new 0 0 15 15"
            viewBox="0 0 15 15"
            x="0"
            y="0"
            class="shopee-svg-icon _1CDHoM "
            v-if="isPause"
          ><g opacity=".54"><g><circle cx="7.5" cy="7.5" fill="#040000" r="7.3"></circle><path d="m7.5.5c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7m0-.5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5-3.4-7.5-7.5-7.5z" fill="#ffffff"></path></g></g><path d="m6.1 5.1c0-.2.1-.3.3-.2l3.3 2.3c.2.1.2.3 0 .4l-3.3 2.4c-.2.1-.3.1-.3-.2z" fill="#ffffff"></path></svg>

        </div>
        <p class="comment-createdAt"> {{ moment(comment.createdAt).format("yyyy-mm-dd hh:mm") }} </p></div></div>
    <hr/>
  </div>

</template>

<script>
import AwesomeVueStarRating from '@/components/Rating/Rating'
import UploadFile from '@/components/UploadFile/UploadFile'
import Textarea from '@/components/TextArea/index'
import moment from 'moment'
import VueEasyLightbox from 'vue-easy-lightbox'

function initValueState () {
  return {
    visibleImagePreview: false,
    visibleVideoContent: false,
    isPlaying: true,
    isPause: false,
    videoPreview: {
      index: -1,
      path: ''
    }
  }
}

export default {
  name: 'Comment',
  components: { Textarea, UploadFile, AwesomeVueStarRating, VueEasyLightbox },
  props: {
    isBought: Boolean,
    comment: Object
  },
  data () {
    return {
      visibleImagePreview: false,
      visibleVideoContent: false,
      indexPickImagePreView: 0,
      imagesFromUserCommentFormat: [],
      isPlaying: true,
      isPause: false,
      videoPreview: {
        index: -1,
        path: ''
      }
    }
  },
  // computed: {
  //   formatComments: function () {
  //     // `this` points to the vm instance
  //     return this.comments.map(comment => )
  //   }
  // },
  computed: {

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
    },
    showVideoContent (videoPath, index) {
      this.videoPreview.path = videoPath
      this.visibleVideoContent = !this.visibleVideoContent
      if (this.videoPreview.index !== index) {
        this.videoPreview.index = index
      }
    },
    resetWindow: function () {
      Object.assign(this.$data, initValueState())
    },
    handleHide () {
      this.visibleImagePreview = false
    },

    showPreviewImage (imageIndex, listImage) {
      this.imagesFromUserCommentFormat = [...listImage].filter(image => image.fileType === 'image/jpeg').map(image => ({
        src: image.path
      }))
      this.visibleImagePreview = true
      this.indexPickImagePreView = imageIndex
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
  margin-top: 20px;
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
