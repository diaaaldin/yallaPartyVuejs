<script>
import { useHead } from '@vueuse/head'
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';

import pageNav from '@/components/navbar.vue';
import pageFooter from '@/components/footer.vue';
import { pointManagmentOperation } from '@/config';

export default {

    
    data() {
        return {
            emailError: '', 
            buyData: {
                paymentMethod: 0,
                data: {
                    sessionId: "",
                    productId: 0,
                    price: 0,
                    name: "",
                    mobile: "",
                    email: "",
                    discountCode: ""
                },
                productData: {
                    title: "",
                    description: "",
                    imageUrl: "",
                    price: 0,
                },
            },
            siteProfitRate: 0,
            pointsForDoller: 0,
            finalProductPrice: 0,

        }
    },
    mounted() {
        useHead({
                // Can be static or computed
                title: 'Product Details | YallaParty',
                meta: [
                    {
                    name: `description`,
                    content: 'Yalla Party is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties.',
                    },
                    ],
                
                });

    //     this.iti = window.intlTelInput(this.$refs.phoneInput, {
    //   initialCountry: "us",
    //   strictMode: true,
    //   utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    // });
    },
    beforeUnmount() {
        // Properly destroy the instance when the component is unmounted


    },
    components: {
        pageNav,
        pageFooter
    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created
        this.GetPointsProfitData();
        this.initFunc();
    },

    computed: {
        ...mapGetters("Code", ["getPointProfitData"]),
        ...mapGetters("Products", ["getProductData"]),

    },
    methods: {
        ...mapActions("Code", ["GetPointsProfitData",]),
        ...mapActions("Products", ["GetProduct" , "BuyProductOperationWithPoint" , "BuyProductOperationWithPayment"]),

        validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Check if the input is empty
            if (!this.data.email) {
                this.emailError = '';
                return false;
            } 
            // Check if the input does not match the email format
            else if (!emailPattern.test(this.data.email)) {
                this.emailError = 'Please enter a valid email address.';
                return false;
            } 
            // Clear the error if the input is valid
            else {
                this.emailError = '';
                return true;
            }
        },
        filterMobileInput(event) {
            const input = event.target.value.replace(/\D/g, '').slice(0, 10);
            this.data.mobile = input; 
        },
        
        mapBuyDataFunc() {
            const selectedProfitRate = this.getPointProfitData.find(x => x.id === pointManagmentOperation.SiteProfitPercentage);
            const selectedPointsForDoller = this.getPointProfitData.find(x => x.id === pointManagmentOperation.howManyPointForDollar);

            if (selectedProfitRate) {
                this.siteProfitRate = selectedProfitRate.value;
            }
            if (selectedPointsForDoller) {
                this.pointsForDoller = selectedPointsForDoller.value;
            }

            this.buyData.data.productId = this.getProductData.id;
            this.finalProductPricePoint = Math.ceil(this.pointsForDoller * this.getProductData.price);
            this.buyData.data.price = this.finalProductPrice;
            this.buyData.data.name = localStorage.getItem('customerName');
            this.buyData.data.email = localStorage.getItem('email');

            this.finalProductPrice = this.formatPriceToTwoDigits(this.getProductData.price + (this.getProductData.price * (this.siteProfitRate / 100)));
            this.buyData.productData.price = this.finalProductPrice;
            this.buyData.productData.title = "Buy product";
            this.buyData.productData.description = this.getProductData.name;
            this.buyData.productData.imageUrl = this.getProductData.image;
        },

        toMarketFunc() {
            this.$router.push({ name: 'productsmarket', params: { id: this.getProductData.userId } });
        
        },
        clearData() {
            this.buyData.paymentMethod = 0;

            this.buyData.data.sessionId = "";
            this.buyData.data.productId = 0;
            this.buyData.data.name = "";
            this.buyData.data.mobile = "";
            this.buyData.data.email = "";
            this.buyData.data.discountCode = "";

            this.buyData.productData.id = "";
            this.buyData.productData.title = "";
            this.buyData.productData.description = "";
            this.buyData.productData.imageUrl = "";
            this.buyData.productData.price = "";

            this.selectedTicket = {};
            this.TicketSelectName = "";
            this.isDiscountSuccess = false;
            this.discountMessage = "";

        },

        initFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });
            const path = window.location.pathname;
            const lastSection = path.split('/').pop(); // Get the last section of the URL
            const idMatch = lastSection.match(/^\d+/); // Match numbers at the start of the string
            const id = idMatch ? idMatch[0] : null; // Extract the first number if it exists

            this.GetProduct(id).then(Response => {
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

        getProductFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });
            this.GetProduct(this.getProductData.id).then(Response => {
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

        buyFunc() {
            if (this.checkValidation()) {
                const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "",
                });

                if (this.buyData.paymentMethod == 1) {
                    this.BuyProductOperationWithPoint(this.buyData.data).then(Response => {
                        this.$moshaToast('Buy product success', {
                            hideProgressBar: 'false',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'success',
                            timeout: 3000,
                        });
                        this.$router.push({ name: 'myproducts' });
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
                } else {
                    this.BuyProductOperationWithPayment(this.buyData).then(Response => {
                       
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
                }
            }
        },

        checkValidation() {
            if (this.buyData.data.productId == 0) {
                this.$moshaToast("there are error with select product contact with site manager", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.email.focus();
                return false;
            }
            else if (this.buyData.data.name.trim() == '') {
                this.$moshaToast("login first if you want to buy product", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.nickName.focus();
                return false;
            } else if (this.buyData.data.email.trim() == '') {
                this.$moshaToast("login first if you want to buy product", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            } else if (this.buyData.paymentMethod == 0) {
                this.$moshaToast("select payment method", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            }
            return true;
        },

        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: "USD",
                minimumFractionDigits: 0, // No decimals
                maximumFractionDigits: 0  // No decimals
            }).format(value);
        },

        formatPriceToTwoDigits(price) {
            return Math.round(price);  
        }
    }
};
</script>
<template>
    <pageNav></pageNav>

    <!-- end header second -->
    <div class="header-title text-center">
        <div class="breadcrumb-outer">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <h5 class="theme mb-0">Yalla Party</h5>
                    <h1 class="mb-0 white">Product Details</h1>
                </div>
            </div>
        </div>
    </div>
    <section class="details-product mt-5">
        <div class="container">

            <div class="row">
                <div class="col-lg-8">
                    <div class="col-12 col-lg-12">
                        <div class="main-img">
                            <img :src="getProductData.image" alt="name product" class="img-fluid">
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="col-lg-12 gray-inp details-text">
                        <div class=" row p-4 ">
                            <div class=" justify-content-between align-items-center">
                                <div class="flex-column mb-4">
                                    <div class="d-flex align-items-center">
                                        <img src="/img/icons/event-svgrepo-2.svg" class="icon-card" width="25" alt="">
                                        <span class="text-store"> {{ getProductData.name }} </span>
                                    </div>
                                </div>
                                <div class="flex-column mb-4">
                                    <div class="d-flex align-items-center">
                                        <img src="/img/icons/price-svgrepo-com.svg" class="icon-card" width="25" alt="">
                                        <span class="text-store">{{ getProductData.price }}</span>
                                    </div>
                                </div>
                                <div class="flex-column">
                                    <div class="d-flex align-items-center">
                                        <img src="/img/icons/company-svgrepo-com.svg" class="icon-card" width="25"
                                            alt="">
                                        <a href="javascript:void(0)" v-on:click="toMarketFunc()"><span
                                                class="text-store"> {{
                                                    getProductData.companyName }}</span></a>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center shop-now">
                                <a data-bs-toggle="modal" data-bs-target="#shop_now" v-on:click="mapBuyDataFunc()"> Buy
                                    now </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 multi-img">
                        <div class="d-flex flex-lg-column  mt-3 mt-lg-0">
                            <div id="gallery" class="mt-lg-3">
                                <a v-for="(image, index) in getProductData.images" :key="index" :href="image"
                                    :data-caption="'Image #' + (index + 1)"
                                    :class="{ 'Before_After_div': index === 0 }">
                                    <img :src="image" alt="" :class="index === 0
                                        ? 'img-fluid srv_img w-100 last-sec-img'
                                        : 'd-none'" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



            <div class="row mt-5">
                <div class="col-md-12">
                    <div class="row">
                        <div class="gray-inp px-4 py-3">
                            <p class="text mb-3 mt-2 description-text-title">
                                <img src="/img/heart_icon.png" alt="" width="30" class="">
                                Product Description
                            </p>
                            <p v-html="getProductData.description" class="description-text-gray"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <pageFooter></pageFooter>

    <div class="modal fade" id="shop_now" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ getProductData.name }} : {{
                        formatCurrency(getProductData.price) }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" method="">
                       
                        <label class=" label-form"> Payment Method </label>
                        <div class="input-group mb-3">
                            <div class="mb-3">
                                <div class="form-check" key="1">
                                    <input class="form-check-input" type="radio" name="bookfor" id="1" value="1"
                                        v-model="buyData.paymentMethod">
                                    <label class="form-check-label" for="1"> My Points </label>
                                    <p style="color: red;  margin-top: 5px;">Note: The number of points that will be
                                        deducted {{ this.finalProductPricePoint }} point</p>
                                </div>
                                <div class="form-check" key="1">
                                    <input class="form-check-input" type="radio" name="bookfor" id="2" value="2"
                                        v-model="buyData.paymentMethod">
                                    <label class="form-check-label" for="2"> Payment </label>
                                    <p style="color: red;  margin-top: 5px; ">Note: Price after the site commission {{
                                        formatCurrency(buyData.productData.price) }}</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" v-on:click="buyFunc()" class="btn btn-primary">Buy now</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>