<script>
import { useHead } from '@vueuse/head'
//import { mapState, mapGetters, mapActions } from "vuex";
import pageNav from '@/components/navbar.vue';
import pageFooter from '@/components/footer.vue';
import product from '@/components/MarketPlace/productCard.vue'

export default {
    setup() {
                useHead({
                // Can be static or computed
                title: 'Market | YallaParty',
                meta: [
                    {
                    name: `description`,
                    content: 'Yalla Party is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties.',
                    },
                    ],
                
                })
            },
    data() {
        return {

        }
    },
    mounted() {

    },
    components: {
        pageNav,
        pageFooter,
        product
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
    </div>
    <section class="profile campany mt-5">
        <div class="container">
            <div class="row mt-5 h-100 ">
                <!--    start left side list          -->
                <div class="col-12 col-lg-3 h-100 left-side">
                    <div class="image">
                        <img src="/img/person1.jpg" class="img-fluid hero-profile-campany" alt="profile pic">
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

                                            <a href="profile.html" class="list_link ms-2">Camapany Name </a>
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
                                            <a href="orders.html" class="list_link ms-2">Broadway NY, New York </a>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li class="list-group-item">
                                <div class="d-flex justify-content-between align-items-center py-2">
                                    <div class="justify-content-start  d-flex">
                                        <div class="d-flex align-items-center">
                                            <img src="/img/icons/city-svgrepo-com.svg" alt="" width="24"
                                                class="me-2">

                                            <a href="favorite.html" class="list_link ms-2"> California</a>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li class="list-group-item">
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
                            </li>
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
                <div class="col-12 col-lg-9  ">
                    <div class="container white_card px-4 pb-4 pt-4 pb-0 mt-3 mt-lg-0 right-side">
                        <div class="Product">
                            <span class="sub-hero-title">Products </span>
                            <div class="row first_sec">
                               
                                <product></product>
                                <product></product>
                                <product></product>
                                <product></product>
                                <product></product>
                                <product></product>
                                <product></product>
                                <product></product>
                                <product></product>
                           
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