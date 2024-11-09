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
        <div class="breadcrumb-outer events">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <h5 class="theme mb-0">Yalla Party</h5>
                    <h1 class="mb-5 white">About Us</h1>
                </div>
            </div>
        </div>
    </div>
    <section class="about-us mt-5">
        <div class="container"> 
            <div class="row">
                <div class="col-12 col-lg-6">
                    <div class="me-3">
                        <div class="ms-4">
                            <h2 class="title mb-0">About Us</h2>
                            <p class="text mt-5" >Yalla Party is your go-to platform for booking events of all sizes, including weddings, engagements, birthdays, and graduation parties. We strive to connect users with businesses that provide everything needed for unforgettable celebrations, offering a marketplace where they can showcase and sell their services.

Our platform also empowers DJs by allowing them to create and promote their events, making it easy for them to sell tickets directly to their audience through Yalla Party. Currently serving the DC, MD, and VA areas, we have exciting plans to expand to other states, fostering community engagement and celebration.

We are always looking for partnerships with businesses and individuals who share our vision of creating memorable experiences. Join us in bringing people together and celebrating life's special moments!</p>
                        </div>
                        <!-- <ul class="ul_about mt-3 ">
                            <li class="item_about_us py-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur blanditiis autem fugiat accusamus porro dolor.</li>
                            <li class="item_about_us py-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur blanditiis autem fugiat accusamus porro dolor.</li>
                            <li class="item_about_us py-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur blanditiis autem fugiat accusamus porro dolor.</li>
                            <li class="item_about_us py-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur blanditiis autem fugiat accusamus porro dolor.</li>
                            <li class="item_about_us py-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur blanditiis autem fugiat accusamus porro dolor.</li>
                            <li class="item_about_us py-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur blanditiis autem fugiat accusamus porro dolor.</li>
                        </ul> -->
                    </div>
                  </div>
                  <div class="col-12 col-lg-6 img-about-us">
                        <div class="row">
                            <div class=" col-12 col-md-6 col-lg-6 mt-lg-5 a1">
                                <div class="d-flex flex-column mt-lg-5 ">
                                    <img class="img-fluid my-2" src="/img/pr3.jpg" alt="">
                                    <!-- <img class="img-fluid my-2" src="/img/pr11.jpg" alt=""> -->
                                    <img class="img-fluid my-2" src="/img/bg-login.jpg" alt="">
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-6 ps-lg-1 a2">
                                <div class="d-flex flex-column ">
                                    <img class="img-fluid my-2 w-100" src="/img/pr14.jpg" alt="" style="object-fit: contain;">
                                    <img class="img-fluid my-2" src="/img/pr2.jpg" alt="">
                                    <img class="img-fluid mt-5" src="/img/YallaPartyLogo.png" alt="">
                                </div>
                            </div>
                        </div>
                  </div>
            </div>
        </div>
    </section>

    
    <pageFooter></pageFooter>
</template>
<style scoped></style>