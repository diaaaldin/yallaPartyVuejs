<script>
import { useHead } from '@vueuse/head'
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import pageNav from '@/components/navbar.vue';
import pageFooter from '@/components/footer.vue';

import lastProduct from '@/components/Store/lastProductCard.vue'
import product from '@/components/Store/productCard.vue'

export default {

    data() {
        return {
            dataSearch: {
                exceptionIds: [],
                productName: "",
                productSection: 0,
                userEmail: "",
                userName: "",
                page: 1,
                pageSize: 12,
            },

            productsData : [],
            moreDataShow : false,

            currentSlide: 0, // Initialize current slide
            totalSlides: 0, // Total slides will be set in the mounted hook

            selectedOption: '-- select section --', // Default selected option
            selectedOption2: '-- select2 --', // Default selected option
            isOpen: false, // Dropdown visibility state
            isOpen2: false, // Dropdown visibility state
        }
    },
    mounted() {
        useHead({
                // Can be static or computed
                title: 'Store | YallaParty',
                meta: [
                    {
                    name: `description`,
                    content: 'Yalla Party is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties.',
                    },
                    ],
                
                });
        this.initSlider();
        document.addEventListener('click', this.closeDropdown);

    
    },

    components: {
        pageNav,
        pageFooter,
        lastProduct,
        product
    },

    emits: {

    },

    created() {
        // Call the function from the store directly when the component is created
        this.GetToolsSections();
        this.initFunc();
    },

    computed: {
        ...mapGetters("Code", ["getToolsSectionsData"]),
        ...mapGetters("Products", ["getProductsData", "getLastProductsData"]),
    },
    methods: {
        ...mapActions("Code", ["GetToolsSections"]),
        ...mapActions("Products", ["GetProductsRandomly", "GetLastProducts" , "GetProductInBasket"]),

        initFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });
            this.GetLastProducts();
            this.GetProductInBasket();
            this.GetProductsRandomly(this.dataSearch).then(Response => {
                Response.products.data.forEach(event => {
                    this.productsData.push(event);
                });
                if(Response.products.pagination.currentPage >= Response.products.pagination.pageCount ) this.moreDataShow = false;
                else this.moreDataShow = true;
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

        SearchChangeFunc() {
            this.GetData();
        },

        GetData() {
            this.GetProductsRandomly(this.dataSearch).then(Response => {
                this.productsData = [];
                Response.products.data.forEach(event => {
                    this.productsData.push(event);
                });
                if(Response.products.pagination.currentPage >= Response.products.pagination.pageCount ) this.moreDataShow = false;
                else this.moreDataShow = true;
            }).catch(error => {
                this.$moshaToast(error.response.data.message, {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
            });
        },

        seeMoreFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });

            this.productsData.forEach(product => {
                this.dataSearch.exceptionIds.push(product.id);
            });
            this.GetProductsRandomly(this.dataSearch).then(Response => {
                Response.products.data.forEach(event => {
                    this.productsData.push(event);
                });
                if(Response.products.pagination.currentPage >= Response.products.pagination.pageCount ) this.moreDataShow = false;
                else this.moreDataShow = true;

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

        initSlider() {
            $('.latestslider').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 3,
                autoplay: true,
                autoplaySpeed: 2000,
                prevArrow: '<button class="slick-prev prev-arrow"><i class="fa-solid fa-angle-right"></i></button>',
                nextArrow: '<button class="slick-next next-arrow"><i class="fa-solid fa-angle-left"></i></button>',
                slidesToScroll: 2,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 1008,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            arrows: false,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    }
                ]
            });


        },

        toggleDropdown() {
            this.isOpen = !this.isOpen; // Toggle dropdown visibility
        },

        selectOption(option) {
            if(option == 0){
                this.selectedOption = "-- select section --";
                this.dataSearch.productSection = 0;
            } else {
                this.selectedOption = option.name;
                this.dataSearch.productSection = option.id;
            }
            this.SearchChangeFunc();
            this.isOpen = false; // Close dropdown
        },

        closeDropdown(e) {
            const customSelect1 = this.$refs.customSelect;
            //const customSelect2 = this.$refs.customSelect2;

            // Check if click is outside customSelect1
            if (!customSelect1.contains(e.target)) {
                this.isOpen = false;
            }
            // Check if click is outside customSelect2
            // if (!customSelect2.contains(e.target)) {
            //     this.isOpen2 = false;
            // }
        }
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeDropdown);
    }
};

</script>

<template>
    <pageNav></pageNav>
    <div class="header-title store text-center">
        <div class="breadcrumb-outer search add">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <h5 class="theme mb-0">Yalla Party</h5>
                    <h1 class="white">Store</h1>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between mt-5 search_input">
            <div class="input-group">
                <input @input="SearchChangeFunc()" v-model="dataSearch.productName" type="text" placeholder="Search..." class="form-control search_input-tab  p-3 search">
                <button class="input-group-text search_icon-tab"><i class="fas fa-search"></i>
                </button>
            </div>
            <div class="custom-select" :class="{ open: isOpen === true }" ref="customSelect">
                <div class="selected-option" @click="toggleDropdown()">{{ selectedOption }}</div>
                <ul class="options-list">
                    <li class="option" @click="selectOption(0)">-- select section --</li>
                    <li v-for="item in getToolsSectionsData" :key="item.id" class="option" @click="selectOption(item)">
                        {{ item.name }}
                    </li>
                </ul>
            </div>

            <!-- <div class="custom-select" :class="{ open: isOpen2 === true }" ref="customSelect2">
                <div class="selected-option"  @click="toggleDropdown2()">{{ selectedOption2 }}</div>
                <ul class="options-list">
                    <li class="option" @click="selectOption2('-- select section --')">-- select section 2--</li>
                    <li class="option" @click="selectOption2('Category Product 1')">Category Product 1</li>
                    <li class="option" @click="selectOption2('Category Product 2')">Category Product 2</li>
                    <li class="option" @click="selectOption2('Category Product 3')">Category Product 3</li>
                    <li class="option" @click="selectOption2('Category Product 4')">Category Product 4</li>
                    <li class="option" @click="selectOption2('Category Product 5')">Category Product 5</li>
                    <li class="option" @click="selectOption2('Category Product 6')">Category Product 6</li>
                </ul>
            </div> -->

        </div>
    </div>


    <section class="store mt-5">
        <div class="container">
            <div v-if="getLastProductsData && getLastProductsData.length >= 5" class="row">
                <div class="div-slider">
                    <span class="sub-hero-title"> Latest Products </span>
                    <div class="row latestslider first_sec">
                        <!--  start row latestslider  -->
                        <!-- <lastProduct v-for="item in getLastProductsData" :product='item' ></lastProduct> -->
                        <product v-for="item in getLastProductsData" :product='item' ></product>
           
                      
                    </div>
                </div>
            </div>

            <div class="Product">
                <span class="sub-hero-title">Products</span>
                <div class="row first_sec justify-content-center">
                    <product v-for="item in productsData" :product='item'></product>
                </div>

            </div>

            <div v-if="moreDataShow" class="row justify-content-center see-more">
                <div class="col-6 col-lg-3">
                    <div class=" d-flex align-items-center justify-content-center mt-4 ">
                        <a href="javascript:void(0)" v-on:click="seeMoreFunc()" class="btn btn-light p-3  show-more-btn w-100">
                            <span> See More </span>
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.276545 8.37881L6.36051 14.7351C6.45269 14.8314 6.55255 14.8998 6.6601 14.9403C6.76764 14.9807 6.88287 15.0006 7.00578 15C7.12869 15 7.24391 14.9798 7.35146 14.9393C7.459 14.8989 7.55887 14.8308 7.65105 14.7351L13.735 8.37881C13.904 8.20224 13.9922 7.98137 13.9996 7.71621C14.0069 7.45104 13.9188 7.22247 13.735 7.03049C13.566 6.83788 13.3546 6.7374 13.1008 6.72905C12.847 6.7207 12.6282 6.81316 12.4445 7.00642L7.92759 11.7255L7.92759 0.963084C7.92759 0.690211 7.8391 0.46132 7.66211 0.276408C7.48512 0.0914964 7.26634 -0.000639042 7.00578 3.73129e-06C6.7446 3.72818e-06 6.52551 0.0921392 6.34853 0.276408C6.17154 0.460678 6.08335 0.689569 6.08397 0.963084L6.08397 11.7255L1.56708 7.00642C1.39808 6.82985 1.18299 6.7374 0.921813 6.72905C0.660633 6.7207 0.445544 6.81316 0.276545 7.00642C0.0921823 7.18298 9.05373e-08 7.4077 8.72833e-08 7.68057C8.40293e-08 7.95344 0.0921822 8.18619 0.276545 8.37881Z"
                                    fill=""></path>
                            </svg>

                        </a>
                    </div>
                </div>
            </div>

            <div v-if="!productsData || productsData === 0" class="alert alert-danger mt-3">
                No data added yet.
            </div>
        </div>
    </section>

    <pageFooter></pageFooter>
</template>

<style scoped>
.custom-select .options-list {
    display: none;
    /* Hide options by default */
}

.custom-select .options-list[style*="display: block"] {
    display: block;
    /* Show options when open */
}
</style>