<script>
//import { mapState, mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {

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

    }
};
</script>
<template>

    <!-- right side container -->
    <div class="col-12 col-lg-9  ">
        <div class="container white_card px-4 pt-4 pb-0 mt-3 mt-lg-0 right-side">
            <form method="" action="" class="mt-2">
                <div class="row ">
                    <div class="col-lg-6">
                        <div class="password-container">
                            <label class="text">Old Password</label>
                            <br>
                            <input type="password"
                                class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp id_password"
                                autocomplete="current-password" placeholder="Old password" required>
                            <i class="far fa-eye togglePassword"></i>
                        </div>
                        <div class="password-container">
                            <label class="text">New Password</label>
                            <br>
                            <input type="password"
                                class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp id_password"
                                autocomplete="current-password" placeholder="New password" required>
                            <i class="far fa-eye togglePassword"></i>
                        </div>
                        <div class="password-container">
                            <label class="text">Confirm New Password</label>
                            <br>
                            <input type="Password"
                                class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp id_password"
                                autocomplete="current-password" placeholder="Confirm Password" required>
                            <i class="far fa-eye togglePassword"></i>
                        </div>
                    </div>

                    <hr>
                    <div class="row justify-content-start">
                        <div class=" col-12 col-md-4 col-lg-3">

                            <input type="submit" class=" form-control party-btn  w-100 my-4 py-3" value="Update Data">

                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- end right side  -->
</template>
<style scoped></style>