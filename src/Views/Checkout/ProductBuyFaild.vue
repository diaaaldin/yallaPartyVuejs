<script>
//import { mapState, mapGetters, mapActions } from "vuex";

import pageNav from '@/components/navbar.vue';
import pageFooter from '@/components/footer.vue';

export default {
    data() {
        return {

        }
    },
    mounted() {

    },
    components: {
        pageNav,
        pageFooter
    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created

    },

    computed: {
        //...mapGetters(),
        //...mapGetters(),

    },
    methods: {
        //...mapActions(),
        // goToMarketPlace(){
        //     this.$router.push({ name: 'marketPlace' });
        // }
    }
};
</script>
<template>
     <pageNav></pageNav>
    <div class="success-checkout">
      <div class="success-container">
        <div class="success-icon">
          <!-- <i class="fas fa-close-circle"></i> -->
          <!-- <i class="fas fa-circle-x"></i> -->
          <i class="fas fa-times-circle"></i>
        </div>
        <h1>Payment Failed!</h1>
        <p>Thank you for your purchase. Your order has been Failed processed.</p>
        <!-- Additional order information if needed -->
        <!-- <div class="order-details" v-if="orderId">
          <p>Order ID: <strong>{{ orderId }}</strong></p>
          <p>We've sent an order confirmation email with all the details.</p>
        </div> -->
        <div class="success-buttons">
          <router-link class="btn btn-primary" to="/productStore">Back to store</router-link>
        </div>
      </div>
    </div>
    <pageFooter></pageFooter>
  </template>

<style scoped>
.success-checkout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
}

.success-container {
  text-align: center;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.success-icon {
  font-size: 4rem;
  color: #d31010;
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.8rem;
  color: #333;
}

p {
  color: #666;
}

.order-details {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;
}

.success-buttons {
  margin-top: 2rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  text-decoration: none;
  margin: 0.5rem;
}

.btn-primary {
  background-color: #d31010;
  border-color: #d31010;
  color: #fff;
}

.btn-secondary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover, .btn-secondary:hover {
  opacity: 0.9;
}

</style>