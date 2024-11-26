<script>
import { useHead } from '@vueuse/head'
import { mapState, mapGetters, mapActions } from "vuex";
import profileHeader from '@/components/Profile/profileHeader.vue';
import profileSideMenu from '@/components/Profile/profileSideMenu.vue';
import profileNav from '@/components/navbar.vue';
import pageFooter from '@/components/footer.vue';

export default {

    data() {
        return {

        }
    },
    mounted() {
        useHead({
                // Can be static or computed
                title: 'Profile | YallaParty',
                meta: [
                    {
                    name: `description`,
                    content: 'Yalla Party is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties.',
                    },
                    ],
                
                });
    },
    components: {
        profileHeader,
        profileNav,
        profileSideMenu,
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
    }
};
</script>
<template>
    <profileNav></profileNav>
    <profileHeader></profileHeader>

    <section class="profile mt-5">
        <div class="container">
            <div class="row mt-5 h-100 ">
                <!-- start left side list -->
                <profileSideMenu></profileSideMenu>
                <!-- end left side list  -->
                <!-- right side container -->
                <router-view />
                <!-- end right side  -->
            </div>
        </div>
    </section>

    <pageFooter></pageFooter>
</template>
<style scoped></style>