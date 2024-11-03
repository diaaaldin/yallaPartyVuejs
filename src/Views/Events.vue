<script>
//import { mapState, mapGetters, mapActions } from "vuex";
import pageNav from '@/components/navbar.vue';
import pageFooter from '@/components/footer.vue';
import eventCard from '@/components/Event/eventCard.vue';

export default {
    data() {
        return {

        }
    },
    mounted() {

    },
    components: {
        pageNav,
        pageFooter,
        eventCard
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

    <div class="header-title text-center">
        <div class="breadcrumb-outer events">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <h5 class="theme mb-0">Yalla Party</h5>
                    <h1 class="mb-5 white">Eevents</h1>
                </div>
            </div>
        </div>
    </div>
    <section class="events mt-5">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-9 col-md-12">
                    <div class="all mt-3 mt-lg-0 white_card py-4">
                       <eventCard></eventCard>
                       <eventCard></eventCard>
                       <eventCard></eventCard>
                       <eventCard></eventCard>
                       <eventCard></eventCard>
                       
                    </div>
                </div>
                <div class="row justify-content-center see-more">
                    <div class="col-6 col-lg-3">
                        <div class=" d-flex align-items-center justify-content-center mt-4 ">
                            <a href="#" class="btn btn-light p-3  show-more-btn w-100">
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
    </section>

    <pageFooter></pageFooter>

</template>
<style scoped></style>