<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import pageNav from '@/components/navbar.vue';
import pageFooter from '@/components/footer.vue';

export default {
    data() {
        return {

         // buyTicketData : localStorage.getItem('BuyOperationTicketData'),

        }
    },

    props: {
      sessionId: {
        type: String,
        required: true
      },
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
        this.checkSuccessPaymentAndSaveFunc();
    },

    computed: {
      ...mapGetters("Tools", ["getToolData"]),

    },

    methods: {
      ...mapActions("Tools", ["successToolPayment"]),

        checkSuccessPaymentAndSaveFunc(){
               const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "",
                });
                const buyData = JSON.parse(localStorage.getItem('RentOperationToolData'));
                this.successToolPayment(buyData.data).then(Response => {
                    this.$moshaToast('success', {
                        hideProgressBar: 'false',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'success',
                        timeout: 3000,
                    });
                    loading.close();
                }).catch(error => {
                    this.$moshaToast(error.response.data.message, {
                        hideProgressBar: 'false',
                        position: 'top-center',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'warning',
                        timeout: 3000,
                    });
                    loading.close();
                });
        
        },

        goBackToolFunc() {
            this.$router.push({ name: "tool", params: { slug: this.getToolData.slug }});
        },

    }
};
</script>
<template>
     <pageNav></pageNav>

    <div class="success-checkout">
      <div class="success-container">
        <div class="success-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your order has been successfully processed.</p>
        <!-- Additional order information if needed -->
        <!-- <div class="order-details" v-if="orderId">
          <p>Order ID: <strong>{{ orderId }}</strong></p>
          <p>We've sent an order confirmation email with all the details.</p>
        </div> -->
        <div class="success-buttons">
          <button type="button" v-on:click="goBackToolFunc()" class="btn btn-primary">Back to tool</button>
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
  color: #e5008f;
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
  background-color: #e5008f;
  color: #fff;
  border-color: #e5008f;
}

.btn-secondary {
  background-color: #007bff;
  color: #fff;
}

.btn-primary:hover, .btn-secondary:hover {
  opacity: 0.9;
}

</style>