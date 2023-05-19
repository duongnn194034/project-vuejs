import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { setupCalendar } from 'v-calendar';
import swal from 'sweetalert';

//using axios as a global object
window.axios = require('axios')

createApp(App).use(router, setupCalendar).mount('#app');
