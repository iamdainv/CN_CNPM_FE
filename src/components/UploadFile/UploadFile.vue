<template>

  <div>
    <div class="list-image-container"><div v-for="(image, index) in images" :key="index" class="square image-item">
                                        <img :src="image.photoUrl" class="square" style="object-fit:cover">
                                        <i class="fas fa-minus  icon-minus" @click="removeImage(index)"></i>
                                      </div>
      <div class="square-upload square image-item" @click="openFileToChooseImage">
        <i class="fas fa-plus icon-plus"></i>
        <input
          @change="userChoosePhotoFromLocal"
          ref="inputChoosePicture"
          id="filebutton"
          multiple
          name="filebutton"
          class="input-file"
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange="" />
      </div></div>

  </div>
</template>

<script>
import './UploadFile.less'
export default {
  name: 'UploadFile',
  props: {
    images: Array
  },
  data () {
    return {
      listImage: this.images
    }
  },
  watch: {
    listImage: function (newValue, preValue) {
      this.$emit('change', newValue)
    }
  },
  methods: {
    openFileToChooseImage () {
      this.$refs.inputChoosePicture.click()
    },
    userChoosePhotoFromLocal (event) {
      Array.from(event.target.files).forEach(file => {
        this.listImage.push({
          photoUrl: URL.createObjectURL(file),
          fileImage: file
        })
      })
    },
    removeImage (index) {
      this.listImage = this.listImage.filter((_, idx) => idx !== index)
    }
  }
}
</script>
