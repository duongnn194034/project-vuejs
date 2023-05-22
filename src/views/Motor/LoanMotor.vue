<template>
  <div id="loan" class="container-fluid">
    <div class="container">
      <div class="row my-3">
        <div class="form-select col-md-8 col-xs-12">
          <select name="vehicle" id="vehicle" class="form-control" v-model="vehicle">
            <option label="Select Vehicle" selected></option> 
            <option value="Motor">Motor</option>
          </select>
        </div>
      </div>
    </div>
    <section v-if="vehicle == 'Motor'">
      <h3 class="py-3 text-center">Add your motorbike</h3>
      <div class="row py-3">
        <div class="float-left" v-for="i in index">
          <label class="ml-5">Motor Images</label>
          <AddImage :baseURL="baseURL"  @addImage="addImage" />
        </div>
      </div>
      <div class="container">
        <form class="row">
          <div class="form-group col-md-6">
            <label>Production name</label>
            <input type="text" class="form-control" v-model="production" required>
          </div>
          <div class="form-group col-md-6">
            <label>Model</label>
            <input type="text" class="form-control" v-model="model" required>
          </div>
          <div class="form-group col-md-4">
            <label>License Plate</label>
            <input type="text" class="form-control" v-model="license" required>
          </div>
          <div class="form-group col-md-4">
            <label>Engine Size</label>
            <input type="text" class="form-control" v-model="engineSize" required>
          </div>
          <div class="form-group col-md-4">
            <label>Fuel</label>
            <input type="text" class="form-control" v-model="fuel" required>
          </div>
          <div class="form-group col-md-4">
            <label>Type</label>
            <select class="form-control" v-model="type">
              <option value="AUTOMATIC">AUTOMATIC</option>
              <option value="MANUAL">MANUAL</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <label>Price</label>
            <input type="number" class="form-control" v-model="price" required>
          </div>
          <div class="form-group col-12">
            <label>Note</label>
            <textarea v-model="note" name="note" id="note" cols="12" rows="5" class="form-control"></textarea>
          </div>
          <button type="button" class="btn btn-primary" @click="saveChanged">Confirm</button>
        </form>
      </div>
    </section>
  </div>
</template>
<script>
import AddImage from '../../components/Image/AddImage.vue';
export default {
    data() {
      return {
        vehicle: "",
        index: 1,
        URLs: [],
        type: null,
        production: null,
        model: null,
        license: null,
        engineSize: null,
        fuel: null,
        price: 0,
        note: null,
      } 
    },
    props: ["baseURL"],
    components: { AddImage },
    methods: {
      addImage(url) {
        this.index = this.index + 1;
        this.URLs.push(url);
      }
    },
    mounted() {
        if (localStorage.getItem("token") == null) {
            this.$router.push({ name: 'Home'});
            return;
        }
    }
}
</script>
<style scoped>
</style>