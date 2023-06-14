<template>
  <div id="toggle-switch" class="d-inline-block">
    <label class="switch">
      <input type="checkbox" v-model="value">
      <span class="slider round"></span>
    </label>
    <span class="ml-3">{{ content }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: false
    }
  },
  name: 'Switch',
  props: ["content", "show"],
  emits: ["getVal"],
  watch: {
    value() {
      this.$emit("getVal", this.value);
    }
  },
  mounted() {
    if (this.show) {
      document.getElementById('toggle-switch');
    }
  }
}
</script>
<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22.5px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 17.5px;
  width: 17.5px;
  left: 2.5px;
  bottom: 2.5px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(17.5px);
  -ms-transform: translateX(17.5px);
  transform: translateX(17.5px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 22.5px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>