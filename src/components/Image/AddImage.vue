<template>
  <div class="container border p-3 add-image" v-if="!image">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0 pt-5">
        <div class="form-group">
          <label for="myfile">Select Image :</label>
          <input type="file" id="myfile" class="form-control-file" @change="onFileSelected">
        </div>
        <button type="button" class="btn btn-info" @click="onUpload">OK</button>
      </div>
    </div>
  </div>
  <div v-else>
    <ImageBox :image="image" />
  </div>
</template>

<script>
import axios from 'axios';
import ImageBox from './ImageBox.vue';
export default {
    data(){
        return {
            selectedFile : null,
            image: null,
        }
    },
    components: { ImageBox },
    props : ["baseURL"],
    methods : {
        onFileSelected(event){
            //this will always update the selected file whenever user changes files
            this.selectedFile = event.target.files[0];
        },
        async onUpload(){
            if(!this.selectedFile) {
                swal({
                    text: "Select a file first",
                    icon: "warning",
                    closeOnClickOutside: false,
                });
                return;
            }
            if (this.selectedFile.type !== "image/jpeg" && this.selectedFile.type !== "image/png" &&
               this.selectedFile.type !== "image/jpg") {
                //file format is not correct
                swal({
                    text: "Select a image/jpeg file!",
                    icon: "error",
                    closeOnClickOutside: false,
                });
                return;
            }
            const formData = new FormData();
            formData.append('file', this.selectedFile);

            await axios({
                method: 'post',
                url: this.baseURL + "fileUpload/",
                data : formData,
            })
            .then(res => {
              this.image = res.data;
              this.$emit("addImage", res.data.url);
            })
            .catch(err => console.log(err))
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}
.add-image {
  margin-top: 20px;
  width: 300px;
  height: 300px;
  position: relative;
}
</style>
