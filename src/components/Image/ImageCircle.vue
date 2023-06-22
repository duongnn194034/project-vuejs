<template>
  <div class="image-box">
    <img :src="url" :alt="image.name" class="img-fluid image-index" ref="rimage">
  </div>
</template>

<script>
export default {
  name : 'ImageBox',
  props : ["image", "option2"],
  computed: {
    url() {
      if (this.image.url) {
        return this.image.url;
      } else {
        return "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";
      }
    }
  },
  mounted() {
    if (this.option2) {
      const img = document.getElementsByClassName("image-index")[0];
      console.log(img);
      img.setAttribute('class', 'img-fluid my-image')
    }
  }
}
</script>

<style scoped>
.image-box{
  position : relative;
  width: 300px;
  height: 300px;
  margin: 20px;
}

.image-box img{
  opacity : 1;
  width: 100%;
  height: 100%;
  transition: .5s ease;
  backface-visibility: hidden;
  border-radius: 150px;
  padding : 5px;
  border : .5px solid rgb(216, 216, 216);
  background-color: white;
}

.my-image {
  border-radius: 75px !important;
  border: 0 !important;
  /* padding: 0 !important; */
}
</style>

