<template>
  <div id="loan" class="container">
    <div class="row">
      <div class="form-select">
        <label>Vehicle</label>
        <select name="vehicle" id="vehicle" class="form-control" v-model="vehicle">
            <option value="MOTOR">MOTOR</option>
        </select>
      </div>
    </div>
    <div v-if="vehicle == 'MOTOR'" class="row">
        <p>Test</p>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            vehicle: "",
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