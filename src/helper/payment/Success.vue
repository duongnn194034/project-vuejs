<template>
  <div class="text-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PaymentSuccess',
    props: ["baseURL"],
    data() {
    return {
      token: null,
      sessionId: null
    }
  },
  methods:{
      saveOrder() { 
        axios.post(this.baseURL+"offer/add",
        {
          vehicleId: localStorage.getItem("vehicleId"),
          userId: localStorage.getItem("userId"),
          start: new Date(localStorage.getItem("start")).getTime(),
          end: new Date(localStorage.getItem("end")).getTime(),
          price: parseFloat(localStorage.getItem("price")),
          sessionId: this.sessionId
        }, {
          headers: {
            token: this.token
          }
        })
        .then(()=>{
            localStorage.removeItem("vehicleId");
            localStorage.removeItem("userId");
            localStorage.removeItem("start");
            localStorage.removeItem("end");
            localStorage.removeItem("price");
            window.location.href = '/offer'
        }).catch((error)=>{
          console.log(error);
        })
      }
  },
  mounted() {
      this.token = localStorage.getItem("token");
      this.sessionId = localStorage.getItem("sessionId");
      this.saveOrder()
  }
}
</script>