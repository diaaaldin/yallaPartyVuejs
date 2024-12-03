<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';

import pageNav from '@/components/navbar.vue';
import pageFooter from '@/components/footer.vue';
import { pointManagmentOperation } from '@/config';

export default {
    data() {
        return {
            rentData: {
                paymentMethod: 0,
                data: {
                    sessionId: "",
                    toolId: 0,
                    rentDate: null,
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
        ...mapGetters("Tools", ["getToolData"]),

    },
    methods: {
        ...mapActions("Code", ["GetPointsProfitData",]),
        ...mapActions("Tools", ["GetTool", "RentToolOperationWithPoint", "RentToolOperationWithPayment"]),

        mapRentDataFunc() {

            const selectedProfitRate = this.getPointProfitData.find(x => x.id === pointManagmentOperation.SiteProfitPercentage);
            const selectedPointsForDoller = this.getPointProfitData.find(x => x.id === pointManagmentOperation.howManyPointForDollar);

            if (selectedProfitRate) {
                this.siteProfitRate = selectedProfitRate.value;
            }
            if (selectedPointsForDoller) {
                this.pointsForDoller = selectedPointsForDoller.value;
            }

            this.rentData.data.toolId = this.getToolData.id;
            this.finalProductPricePoint = Math.ceil(this.pointsForDoller * this.getToolData.rentPrice);
            this.rentData.data.price = this.finalProductPrice;
            this.rentData.data.name = localStorage.getItem('customerName');
            this.rentData.data.email = localStorage.getItem('email');

            this.finalProductPrice = this.formatPriceToTwoDigits(this.getToolData.rentPrice + (this.getToolData.rentPrice * (this.siteProfitRate / 100)));
            this.rentData.productData.price = this.finalProductPrice;
            this.rentData.productData.title = "Rent tool";
            this.rentData.productData.description = this.getToolData.name;
            this.rentData.productData.imageUrl = this.getToolData.image;
        },

        toMarketFunc() {
            this.$router.push({ name: 'toolsmarket', params: { id: this.getToolData.userId } });
        },

        clearData() {
            this.rentData.paymentMethod = 0;

            this.rentData.data.sessionId = "";
            this.rentData.data.toolId = 0;
            this.rentData.data.price = 0;
            this.rentData.data.rentDate = null;
            this.rentData.data.name = "";
            this.rentData.data.mobile = "";
            this.rentData.data.email = "";
            this.rentData.data.discountCode = "";

            this.rentData.productData.id = "";
            this.rentData.productData.title = "";
            this.rentData.productData.description = "";
            this.rentData.productData.imageUrl = "";
            this.rentData.productData.price = "";

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

            this.GetTool(id).then(Response => {
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
                if (this.rentData.paymentMethod == 1) {
                    this.RentToolOperationWithPoint(this.rentData.data).then(Response => {
                        this.$moshaToast('Rent tool success', {
                            hideProgressBar: 'false',
                            showIcon: 'true',
                            swipeClose: 'true',
                            type: 'success',
                            timeout: 3000,
                        });
                        this.$router.push({ name: 'mytools' });
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
                    this.RentToolOperationWithPayment(this.rentData).then(Response => {
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
            if (this.rentData.data.toolId == 0) {
                this.$moshaToast("there are error with select tool contact with site manager", {
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
            else if (!this.rentData.data.name || this.rentData.data.name.trim() == '') {
                this.$moshaToast("login first if you want to rent tool", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.nickName.focus();
                return false;
            } else if (this.rentData.data.email.trim() == '') {
                this.$moshaToast("login first if you want to rent tool", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            } else if (this.rentData.data.rentDate == null) {
                this.$moshaToast("enter rent date", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            } else if (this.rentData.paymentMethod == 0) {
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
                    <h1 class="mb-0 white">Details Tool</h1>
                </div>
            </div>
        </div>
    </div>
    <section class="details-product mt-5">
        <div class="container">
            <!-- <p class="title">Name product</p> -->
            <div class="row">
                <div class="col-lg-8">
                    <div class="col-12 col-lg-12">
                        <div class="main-img">
                            <img :src="getToolData.image" alt=" tool image" class="img-fluid">
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
                                        <span class="text-store"> {{ getToolData.name }} </span>
                                    </div>
                                </div>
                                <div class="flex-column mb-4">
                                    <div class="d-flex align-items-center">
                                        <img src="/img/icons/price-svgrepo-com.svg" class="icon-card" width="25" alt="">
                                        <span class="text-store">{{ getToolData.rentPrice }}</span>
                                    </div>
                                </div>
                                <div class="flex-column">
                                    <div class="d-flex align-items-center">
                                        <img src="/img/icons/company-svgrepo-com.svg" class="icon-card" width="25"
                                            alt="">
                                        <a href="javascript:void(0)" v-on:click="toMarketFunc()"><span
                                                class="text-store"> {{ getToolData.userName }}</span></a>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center shop-now">
                                <a data-bs-toggle="modal" data-bs-target="#shop_now" v-on:click="mapRentDataFunc()"> Rent now </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12 multi-img">
                        <div class="d-flex flex-lg-column  mt-3 mt-lg-0">
                            <div id="gallery" class="mt-lg-3">
                                <a v-for="(image, index) in getToolData.images" :key="index" :href="image"
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
                                Tool Description
                            </p>
                            <p v-html="getToolData.description" class="description-text-gray"></p>
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
                    <h5 class="modal-title" id="exampleModalLabel">{{ getToolData.name }} : {{ formatCurrency(getToolData.rentPrice) }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" method="">
                        <label class=" label-form"> Rent date </label>
                        <div class="input-group mb-3">
                            <input v-model="rentData.data.rentDate" type="date" class="form-control"
                                placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                        </div>

                        <label class=" label-form"> Payment Method </label>
                        <div class="input-group mb-3">
                            <div class="mb-3">
                                <div class="form-check" key="1">
                                    <input class="form-check-input" type="radio" name="bookfor" id="1" value="1"
                                        v-model="rentData.paymentMethod">
                                    <label class="form-check-label" for="1"> My Points </label>
                                    <p style="color: red;  margin-top: 5px;">Note: The number of points that will be
                                        deducted {{ this.finalProductPricePoint }} point</p>
                                </div>
                                <div class="form-check" key="1">
                                    <input class="form-check-input" type="radio" name="bookfor" id="2" value="2"
                                        v-model="rentData.paymentMethod">
                                    <label class="form-check-label" for="2"> Payment </label>
                                    <p style="color: red;  margin-top: 5px; ">Note: Price after the site commission {{
                                        formatCurrency(rentData.productData.price) }}</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" v-on:click="buyFunc()" class="btn btn-primary">Rent now</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>