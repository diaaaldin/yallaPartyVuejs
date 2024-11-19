<script>
import { useHead } from '@vueuse/head'
//import { mapState, mapGetters, mapActions } from "vuex";
import pageNav from '@/components/navbar.vue';
import pageFooter from '@/components/footer.vue';

export default {

    
    data() {
        return {

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

        this.iti = window.intlTelInput(this.$refs.phoneInput, {
      initialCountry: "us",
      strictMode: true,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });
    },
    beforeUnmount() {
    // Properly destroy the instance when the component is unmounted
    if (this.iti) {
      this.iti.destroy();
    }

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
        goToMarketPlace(){
            this.$router.push({ name: 'marketPlace' });
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
            <!-- <p class="title">Name product</p> -->
            <div class="row">
                <div class="col-lg-8">
                    <div class="col-12 col-lg-12">
                        <div class="main-img">
                            <img src="/img/pr2.jpg" alt="name product" class="img-fluid">
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="col-lg-12 gray-inp details-text">
                        <div class=" row p-4 ">
                            <div class=" justify-content-between align-items-center">
                                <div class="flex-column mb-4">
                                    <div class="d-flex align-items-center">
                                        <img src="/img/icons/event-svgrepo-2.svg" class="icon-card" width="25"
                                            alt="">
                                        <span class="text-store"> Name Product</span>
                                    </div>
                                </div>
                                <div class="flex-column mb-4">
                                    <div class="d-flex align-items-center">
                                        <img src="/img/icons/price-svgrepo-com.svg" class="icon-card" width="25"
                                            alt="">
                                        <span class="text-store">50$</span>
                                    </div>
                                </div>
                                <div class="flex-column">
                                    <div class="d-flex align-items-center">
                                        <img src="/img/icons/company-svgrepo-com.svg" class="icon-card" width="25"
                                            alt="">
                                        <a href="" v-on:click="goToMarketPlace()" ><span class="text-store"> Campany Name</span></a>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center shop-now">
                                <a data-bs-toggle="modal" data-bs-target="#shop_now"> shop now </a>
                             </div>
                        </div>
                    </div>
                    <div class="col-lg-12 multi-img">
                        <div class="d-flex flex-lg-column  mt-3 mt-lg-0">
                            <div id="gallery" class="mt-lg-3">
                                <a class="Before_After_div  " href="/img/pr6.jpg" data-caption="Image #1">
                                    <img src="/img/pr6.jpg" alt=" "
                                        class="img-fluid srv_img  w-100 last-sec-img ">
                                </a>
                                <a href="/img/pr2.jpg" data-caption="Image #2">
                                    <img src="/img/pr2.jpg" class="d-none" />
                                </a>
                                <a href="/img/pr6.jpg" data-caption="Image #3">
                                    <img src="/img/pr6.jpg" class="d-none" />
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
                            <p class="description-text-gray"> Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Non cumque odio, sapiente fugiat voluptas voluptatibus fugit aliquid obcaecati explicabo
                                dolorum eaque similique laborum architecto ipsa vero. Quasi cumque sint ducimus.</p>
                            <ul class="ps-0">
                                <li class="li_blue"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                                    cumque odio, sapiente fugiat </li>
                                <li class="li_blue"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                                    cumque odio, sapiente fugiat </li>
                                <li class="li_blue"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                                    cumque odio, sapiente fugiat </li>
                                <li class="li_blue"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                                    cumque odio, sapiente fugiat </li>
                            </ul>

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
              <h5 class="modal-title" id="exampleModalLabel">Shop Now</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form action="" method="">
                <label class=" label-form"> Name </label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
                </div>
                <label class=" label-form"> Moblie </label>
                <div class="input-group mb-3">
                    <input id="phone" type="tel" ref="phoneInput" class="form-control" maxlength="10" placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1">
                </div>
                <label class=" label-form"> Email </label>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1">
                </div>
             
           
               
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Shop Now</button>
            </div>
          </div>
        </div>
      </div>
</template>
<style scoped></style>