<template>
  <div class="div_class">
    <h3>You will be redirected to payment page</h3>

    <div class="alert alert-primary" role="alert">
      While making payment use card number 4242 4242 4242 4242 and enter random
      cvv (3 digit)
    </div>

    <button
      class="checkout_button"
      id="proceed-to-checkout"
      @click="goToCheckout()"
    >
      Make payment
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stripeAPIToken: process.env.VUE_APP_STRIPETOKEN,
      stripe: '',
      token: null,
      sessionId: null,
      checkoutBodyArray: [],
    };
  },

  name: 'Checkout',
  props: ['baseURL'],
  methods: {
    /*
      Configures Stripe by setting up the elements and
      creating the card element.
    */
    configureStripe() {},

    goToCheckout() {
      axios
        .post(
          this.baseURL + `offer/create-checkout-session?token=${this.token}`,
          {
            vehicleId: localStorage.getItem("vehicleId"),
            userId: localStorage.getItem("userId"),
            start: new Date(localStorage.getItem("start")).getTime(),
            end: new Date(localStorage.getItem("end")).getTime(),
            price: localStorage.getItem("price")
          }
        )
        .then((response) => {
          localStorage.setItem('sessionId', response.data.sessionId);
          return response.data;
        })
        .then((session) => {
          return this.stripe.redirectToCheckout({
            sessionId: session.sessionId,
          });
        });
    },
  },
  mounted() {
    // get the token)
    this.token = localStorage.getItem('token');
    // get all the cart items
    this.stripe = Stripe(this.stripeAPIToken);
    this.goToCheckout();
  },
};
</script>

<style scoped>
.alert {
  width: 50%;
}

.div_class {
  margin-top: 5%;
  margin-left: 30%;
}

.checkout_button {
  background-color: #5d3dec;
  border: none;
  color: white;
  margin-left: 15%;
  padding: 15px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  font-weight: bold;
  border-radius: 15px;
}

.checkout_button:focus {
  outline: none;
  box-shadow: none;
}

.checkout_button:disabled {
  background-color: #9b86f7;
  border: none;
  color: white;
  margin-left: 15%;
  padding: 15px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  font-weight: bold;
  border-radius: 15px;
  cursor: not-allowed;
}
</style>
