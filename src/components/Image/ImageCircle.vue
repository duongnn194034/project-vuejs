<template>
  <div class="image-box">
    <img :src="url" :alt="image.name" class="img-fluid my-image" ref="rimage">
  </div>
</template>

<script>
export default {
  name : 'ImageBox',
  props : ["image"],
  computed: {
    url() {
      if (this.image.url) {
        return this.image.url;
      } else {
        return "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";
      }
    }
  },
}
</script>

<style>
.image-box{
  position : relative;
  width:300px;
  height:300px;
  margin:20px;
  border-radius: 150px;
}

.image-box img{
  opacity : 1;
  width: 100%;
  height: 100%;
  transition: .5s ease;
  backface-visibility: hidden;
  border-radius: 5px;
  padding : 5px;
  border : .5px solid rgb(216, 216, 216);
}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.image-box:hover .my-image {
  transform: scale(1.1);
  transition: transform 0.2s ease;
  opacity: 0.3;
}

.image-box:hover .middle {
  opacity: 1;
}
</style>

