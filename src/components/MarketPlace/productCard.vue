<script>
//import { mapState, mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            isFilled: false // Track if the heart is filled or not
        }
    },
    mounted() {

    },
    components: {

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

        toggleHeartFill() {
            this.isFilled = !this.isFilled; // Toggle the filled state
        },
        toProductFunc(){
            this.$router.push({ name: 'product' });
        },

        toMarketFunc(){
            this.$router.push({ name: 'productsmarket' });
        }
    }
};
</script>
<template>
    <div class="col-12 col-lg-4 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100" data-aos-duration="700">
        <a href="" style="color:black;">
            <div class="card custom_card">
                <img v-on:click="toProductFunc()" src="/img/pr2.jpg" class="card-img-top index-img-card" alt="...">
                <div class="card-body p-3">
                    <div class="d-flex justify-content-between align-items-baseline mb-2">
                        <h6 class="card-title justify-content-start"> Name product </h6>
                        <a href="javascript:void(0)" @click="toggleHeartFill">
                            <svg width="21" height="17" :stroke="isFilled ? 'red' : '#999999'" class="heart_svg"
                                viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 18C9.71527 18 9.44077 17.8957 9.22684 17.7061C8.41888 16.9914 7.63992 16.3198 6.95267 15.7274L6.94916 15.7243C4.93423 13.9873 3.19427 12.4873 1.98364 11.0096C0.630341 9.35765 0 7.79138 0 6.08032C0 4.41788 0.563507 2.88418 1.58661 1.76153C2.62192 0.625613 4.04251 0 5.58716 0C6.74164 0 7.79892 0.369224 8.72955 1.09733C9.19922 1.46486 9.62494 1.91466 10 2.43932C10.3752 1.91466 10.8008 1.46486 11.2706 1.09733C12.2012 0.369224 13.2585 0 14.413 0C15.9575 0 17.3782 0.625613 18.4135 1.76153C19.4366 2.88418 20 4.41788 20 6.08032C20 7.79138 19.3698 9.35765 18.0165 11.0094C16.8059 12.4873 15.0661 13.9872 13.0515 15.724C12.363 16.3173 11.5828 16.99 10.773 17.7064C10.5592 17.8957 10.2846 18 10 18Z"
                                    :fill="isFilled ? 'red' : 'white'" stroke-width="1.4" />
                            </svg>
                        </a>
                    </div>
                    <div class="d-flex align-items-center">
                        <p class="text-store">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Doloremque, ullam? Optio tempora natus molestiae eveniet quo, voluptatibus
                            eligendi repellendus pariatur dolorum explicabo non vero nobis excepturi
                            tempore ducimus maxime modi.</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class=" d-flex  flex-column">
                            <div class="d-flex align-items-center mb-3">
                                <img src="/img/icons/price-svgrepo-com.svg" class="icon-card" width="25" alt="">
                                <span class="text-store">50$</span>
                            </div>

                        </div>
                        <div class="d-flex justify-content-end flex-column">
                            <div class="d-flex align-items-center mb-3">
                                <img src="/img/icons/company-svgrepo-com.svg" class="icon-card" width="25" alt="">

                                <a href="" v-on:click="toMarketFunc()"><span class="text-store">Campany Name</span></a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </a>
    </div>
</template>
<style scoped>
.heart_svg {
    cursor: pointer;
    /* Change cursor to pointer for better UX */
}
</style>