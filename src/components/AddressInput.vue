<template>
  <input class="form-control" type="text" :placeholder="placeholder" :disabled="disabled" v-model="query" @input="input">
  <div id="autocomplete-list" class="autocomplete-items margin-right-10-sm margin-right-10-md" v-if="suggest">
    <div v-for="(ad, index) in this.suggestedAddress" :key="index" @click="select">
      <strong>{{ ad.display_name }}</strong>
      <input type="hidden" :value="index">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: null,
      suggest: true,
      suggestedAddress: [],
    }
  },
  props: ["placeholder", "disabled"],
  emits: ["address"],
  methods: {
    async fetchAddress(query) {
      await axios
        .get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`)
        .then((res) => {
          if (query == this.query) {
            this.suggestedAddress = res.data;
            console.log(this.suggestedAddress[0])
          }
        })
        .catch((err) => console.log(err));
    },
    select(event) {
      let index = 0;
      if (event.target.lastChild.value != undefined) {
        index = event.target.lastChild.value;
      } else {
        index = event.target.parentNode.lastChild.value;
      }
      this.query = this.suggestedAddress[index].display_name;
      this.$emit("address", this.suggestedAddress[index]);
      this.suggest = false;
    },
    input() {
      this.suggest = true;
      this.fetchAddress(this.query);
    },
  }
}
</script>
<style scoped>
.autocomplete-items {
  position: absolute;
  z-index: 99;
  left: 15px;
  right: 15px;
  top: 100%;
  border: 2px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
}
.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 2px solid #d4d4d4;
}
.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9;
}
.autocomplete-active {
  /*when navigating through the items using the arrow keys:*/
  background-color: DodgerBlue !important;
  color: #ffffff;
}
</style>