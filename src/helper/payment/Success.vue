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

        }, {
          headers: {
            token: this.token
          }
        })
        .then(()=>{
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