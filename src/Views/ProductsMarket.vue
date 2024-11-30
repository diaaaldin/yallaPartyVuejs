<script>
import { useHead } from '@vueuse/head'
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import axios from "axios";


import pageNav from '@/components/navbar.vue';
import pageFooter from '@/components/footer.vue';
// import toolCard from '@/components/MarketPlace/ToolCard.vue';
import productCard from '@/components/MarketPlace/productCard.vue';

export default {

    data() {
        return {
            dataSearch: {
                exceptionIds: [],
                productName: "",
                productSection: 0,
                userId : 0,
                userEmail: "",
                userName: "",
                stateId : "",
                page: 1,
                pageSize: 12,
            },

            
            productsData : [],
            moreDataShow : false,

            selectedOption: '-- select --', // Default selected option
            selectedOption2: '-- select2 --', // Default selected option
            isOpen: false, // Dropdown visibility state
            isOpen2: false, // Dropdown visibility state

            cities: []
        }
    },
    mounted() {
        useHead({
                title: 'Market | YallaParty',
                meta: [
                    {
                    name: `description`,
                    content: 'Yalla Party is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties.',
                    },
                    ],
                });

          //document.addEventListener('click', this.closeDropdown);
    },
    components: {
        pageNav,
        pageFooter,
        productCard
    },

    emits: {

    },

    async created() {
        // Call the function from the store directly when the component is created
        this.GetToolsSections();
        await this.initFunc();

        if (this.getCompanyData.stateId) {
            await this.fetchSearchCities(this.getCompanyData.stateId);
        }
    },
    watch: {
        // Watch for changes in the event prop's stateId
        "getCompanyData.stateId": {
            immediate: true,
            handler(newStateId) {
                if (newStateId) {
                    this.fetchSearchCities(newStateId);
                }
            }
        }
    },

    computed: {
        ...mapGetters("Code", ["getToolsSectionsData"]),
        ...mapGetters("Products", ["getProductsData"]),
        ...mapGetters("Users", ["getCompanyData"]),

    },
    methods: {
        ...mapActions("Code", ["GetToolsSections"]),
        ...mapActions("Products", ["GetProducts"]),
        ...mapActions("Users", ["GetCompanyInfo"]),


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

            this.dataSearch.userId = id;

            this.GetCompanyInfo(id);
            this.GetProducts(this.dataSearch).then(Response => {
                Response.products.data.forEach(event => {
                    this.productsData.push(event);
                });
                if(Response.products.pagination.currentPage >= Response.products.pagination.pageCount ) this.moreDataShow = false;
                else this.moreDataShow = true;

                console.log("getCompanyData : ", this.getCompanyData);
                console.log("getProductsData : ", this.getProductsData);

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
            this.GetProducts(this.dataSearch).then(Response => {
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

            this.productsData.forEach(tool => {
                this.dataSearch.exceptionIds.push(tool.id);
            });
            this.GetProducts(this.dataSearch).then(Response => {
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

        toggleDropdown2() {
            this.isOpen2 = !this.isOpen2; // Toggle dropdown visibility
        },
        
        // selectOption2(option) {
        //     this.selectedOption2 = option; // Update selected option
        //     this.isOpen2 = false; // Close dropdown
        // },

        closeDropdown(e) {
            const customSelect1 = this.$refs.customSelect;
            const customSelect2 = this.$refs.customSelect2;
            
            // Check if click is outside customSelect1
            if (!customSelect1.contains(e.target)) {
                this.isOpen = false;
            }
            // // Check if click is outside customSelect2
            // if (!customSelect2.contains(e.target)) {
            //     this.isOpen2 = false;
            // }
        },

            // Fetch cities for the given stateId
        async fetchSearchCities(stateId) {
            console.log("Fetching cities for stateId:", stateId);
            try {
                const response = await axios.get(
                    `https://api.census.gov/data/2020/dec/pl?get=NAME&for=place:*&in=state:${stateId}`, {
                    withCredentials: false
                });
                console.log("Cities data fetched:", response.data);  // Log the raw data to check structure
                this.cities = response.data;
            } catch (error) {
                console.error("Error fetching cities:", error);
            }

        },

        // Get city name by city ID (index 2 in the data array)
        getCityName(cityId) {
            console.log("City ID in getCityName:", cityId);  // Log the ID to debug
            console.log("Cites:", this.cities);  // Log the ID to debug
            const selectedCity = this.cities.find(x => x[2] === cityId);  // Assuming cityId is at index 2
            return selectedCity ? selectedCity[0] : "City not found";  // Return city name or a default message
        },
       
    },
    beforeDestroy() {
        document.removeEventListener('click', this.closeDropdown);
    }
};
</script>
<template>
    <pageNav></pageNav>

    <div class="header-title text-center ">
        <div class="breadcrumb-outer campany">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <h5 class="theme mb-0">Yalla Party</h5>
                    <h1 class="mb-0 white">Market</h1>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between mt-5 search_input">
            <div class="input-group">
                <input @input="SearchChangeFunc()" v-model="dataSearch.productName"  type="text" placeholder="Search..." class="form-control search_input-tab  p-3 search">
                <button class="input-group-text search_icon-tab"><i class="fas fa-search"></i></button>
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
    <section class="profile campany mt-5">
        <div class="container">
            <div class="row mt-5 h-100 ">
                <!--    start left side list          -->
                <div class="col-12 col-lg-3 h-100 left-side">
                    <div class="image">
                        <img :src="getCompanyData.image" class="img-fluid hero-profile-campany" alt="profile pic">
                    </div>

                    <div class="" id="">
                        <ul class="list-group  h-100">
                            <li class="list-group-item">
                                <div class="d-flex justify-content-between align-items-center py-2">
                                    <div class="justify-content-start  d-flex">
                                        <div class="d-flex align-items-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M4 7.8C4 6.11984 4 5.27976 4.32698 4.63803C4.6146 4.07354 5.07354 3.6146 5.63803 3.32698C6.27976 3 7.11984 3 8.8 3H15.2C16.8802 3 17.7202 3 18.362 3.32698C18.9265 3.6146 19.3854 4.07354 19.673 4.63803C20 5.27976 20 6.11984 20 7.8V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V7.8Z"
                                                    fill="#B5BEC8" />
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10ZM13 8C12.4477 8 12 8.44772 12 9C12 9.55228 12.4477 10 13 10H15C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8H13ZM13 12C12.4477 12 12 12.4477 12 13C12 13.5523 12.4477 14 13 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12H13ZM12 17C12 16.4477 12.4477 16 13 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H13C12.4477 18 12 17.5523 12 17ZM10 13C10 13.5523 9.55228 14 9 14C8.44772 14 8 13.5523 8 13C8 12.4477 8.44772 12 9 12C9.55228 12 10 12.4477 10 13ZM9 18C9.55228 18 10 17.5523 10 17C10 16.4477 9.55228 16 9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18Z"
                                                    fill="black" />
                                                <path
                                                    d="M9 3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4V3Z"
                                                    fill="black" />
                                            </svg>

                                            <a href="javascript:void(0)" class="list_link ms-2"> {{ getCompanyData.name }} </a>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li class="list-group-item ">
                                <div class="d-flex justify-content-between align-items-center py-2">
                                    <div class="justify-content-start  d-flex">
                                        <div class="d-flex align-items-center">
                                            <svg class="svg-inline--fa fa-map-marked-alt fa-w-18 fa-1x me-2"
                                                aria-hidden="true" width="24" height="24" focusable="false"
                                                data-prefix="fas" data-icon="map-marked-alt" role="img"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                                data-fa-i2svg="">
                                                <path fill="currentColor"
                                                    d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z">
                                                </path>
                                            </svg>
                                            <a href="javascript:void(0)" class="list_link ms-2"> {{ getCityName(getCompanyData.cityId) }} </a>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <!-- <li class="list-group-item">
                                <div class="d-flex justify-content-between align-items-center py-2">
                                    <div class="justify-content-start  d-flex">
                                        <div class="d-flex align-items-center">
                                            <img src="/img/icons/city-svgrepo-com.svg" alt="" width="24"
                                                class="me-2">
                                            <a href="javascript:void(0)" class="list_link ms-2"> California</a>
                                        </div>
                                    </div>
                                </div>
                            </li> -->

                            <!-- <li class="list-group-item">
                                <div class="d-flex justify-content-between align-items-center py-2">
                                    <div class="justify-content-start  d-flex">
                                        <div class="d-flex align-items-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8 2C5.79086 2 4 3.79087 4 6V20.0008C4 21.6842 5.95294 22.6146 7.26018 21.5538L11.3699 18.2191C11.7371 17.9211 12.2629 17.9211 12.6301 18.2191L16.7398 21.5538C18.047 22.6146 19.9999 21.6842 19.9999 20.0008V6C19.9999 3.79086 18.2091 2 15.9999 2H8Z"
                                                    fill="#B5BEC8" />
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M15.7071 7.29289C16.0976 7.68342 16.0976 8.31658 15.7071 8.70711L11.7071 12.7071C11.3166 13.0976 10.6834 13.0976 10.2929 12.7071L8.29289 10.7071C7.90237 10.3166 7.90237 9.68342 8.29289 9.29289C8.68342 8.90237 9.31658 8.90237 9.70711 9.29289L11 10.5858L14.2929 7.29289C14.6834 6.90237 15.3166 6.90237 15.7071 7.29289Z"
                                                    fill="#12131A" />
                                            </svg>

                                            <p class="description-text-gray"> Lorem ipsum dolor, sit amet consectetur
                                                adipisicing elit. Non cumque odio, sapiente fugiat voluptas voluptatibus
                                                fugit aliquid obcaecati explicabo dolorum eaque similique laborum
                                                architecto ipsa vero. Quasi cumque sint ducimus.</p>
                                        </div>
                                    </div>
                                </div>
                            </li> -->
                            <!-- <li class="list-group-item">
                            <div class="text-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0001 3.5C10.0001 2.67157 10.6716 2 11.5001 2H12.5001C13.3285 2 14.0001 2.67157 14.0001 3.5V3.86445C14.0001 4.09259 14.155 4.29021 14.3729 4.35779C14.8439 4.50387 15.2962 4.69228 15.7255 4.91859C15.9274 5.025 16.1767 4.99485 16.3381 4.8335L16.5962 4.57538C17.182 3.98959 18.1317 3.98959 18.7175 4.57538L19.4246 5.28249C20.0104 5.86827 20.0104 6.81802 19.4246 7.40381L19.1665 7.66193C19.0052 7.82328 18.975 8.07264 19.0814 8.27449C19.3077 8.70378 19.4961 9.15614 19.6422 9.62713C19.7098 9.84503 19.9074 10 20.1356 10H20.5C21.3284 10 22 10.6716 22 11.5V12.5C22 13.3284 21.3284 14 20.5 14H20.1356C19.9074 14 19.7098 14.155 19.6422 14.3729C19.4961 14.8439 19.3077 15.2962 19.0814 15.7255C18.975 15.9274 19.0052 16.1767 19.1665 16.3381L19.4246 16.5962C20.0104 17.182 20.0104 18.1317 19.4246 18.7175L18.7175 19.4246C18.1317 20.0104 17.182 20.0104 16.5962 19.4246L16.3381 19.1665C16.1767 19.0052 15.9274 18.975 15.7255 19.0814C15.2962 19.3077 14.8439 19.4961 14.3729 19.6422C14.155 19.7098 14.0001 19.9074 14.0001 20.1355V20.5C14.0001 21.3284 13.3285 22 12.5001 22H11.5001C10.6716 22 10.0001 21.3284 10.0001 20.5V20.1356C10.0001 19.9074 9.84509 19.7098 9.62719 19.6422C9.15618 19.4962 8.70379 19.3077 8.27449 19.0814C8.07264 18.975 7.82327 19.0052 7.66192 19.1665L7.40381 19.4246C6.81802 20.0104 5.86827 20.0104 5.28249 19.4246L4.57538 18.7175C3.98959 18.1317 3.98959 17.182 4.57538 16.5962L4.8335 16.3381C4.99485 16.1767 5.025 15.9274 4.91859 15.7255C4.69227 15.2962 4.50385 14.8439 4.35777 14.3729C4.29019 14.155 4.09257 14 3.86443 14H3.5C2.67157 14 2 13.3284 2 12.5V11.5C2 10.6716 2.67157 10 3.5 10H3.86443C4.09257 10 4.29019 9.84503 4.35778 9.62713C4.50385 9.15614 4.69227 8.70378 4.91859 8.27449C5.025 8.07264 4.99485 7.82327 4.8335 7.66193L4.57538 7.40381C3.98959 6.81802 3.98959 5.86827 4.57538 5.28249L5.28249 4.57538C5.86827 3.98959 6.81802 3.98959 7.40381 4.57538L7.66193 4.8335C7.82327 4.99485 8.07264 5.025 8.27449 4.91859C8.70379 4.69226 9.15618 4.50384 9.62719 4.35776C9.84509 4.29017 10.0001 4.09255 10.0001 3.86441V3.5Z" fill="#B5BEC8"/>
                                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" fill="black"/>
                              </svg>
                              <p class="list_link ms-2"> Camapany Name </p>
                            </div>
                       </li>
             -->
                        </ul>


                    </div>


                </div>
                <!-- end left side list      -->

                <!-- right side container -->
                <div class="col-12 col-lg-9 ">
                    <div class="container white_card px-4 pb-4 pt-4 pb-0 mt-3 mt-lg-0 right-side">
                        <div class="Product">
                            <span class="sub-hero-title"> Products </span>
                            <div class="row first_sec">
                                <productCard v-for="item in productsData" :product='item'></productCard>                               
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
                    </div>
                </div>
                <!-- end right side  -->
            </div>
        </div>
    </section>

    <pageFooter></pageFooter>
</template>
<style scoped></style>