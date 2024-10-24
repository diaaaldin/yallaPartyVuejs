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
    <div class="col-12 col-lg-9">
        <div class="container white_card px-4 pt-4 pb-0 mt-3 mt-lg-0 right-side">
            <form method="" action="" class="mt-2">
                <div class="row ">
                    <div class="d-flex  div-img-profile px-0 justify-content-center justify-content-lg-start mb-4">
                        <img src="/img/person1.jpg" alt="profile-picture" class="img-fluid hero-profile-pic"
                            id="output">

                        <div
                            class="upload_profile_div d-flex align-items-center justify-content-center justify-content-lg-start">
                            <label for="file-upload file" class="custom-file-upload">
                                <i class="fa-solid fa-plus" style="color: white;"></i>
                            </label>
                            <input id="file-upload file" type="file" class="upload_profile_input"
                                onchange="loadFile(event)">
                        </div>

                        <div class="point">
                            <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="3.5" cy="3.5" r="3.5" fill="#e5008f"></circle>
                            </svg>
                            <p>Point : <span>5</span></p>
                            <div class="clearfix"></div>
                        </div>

                    </div>
                    <div class="col-lg-12">
                        <label class="label-form"> Full Name </label>
                        <input name="name" type="text"
                            class="form-control mt-2 mb-4 py-3 text-start list_link  gray-inp" value="Ahmad Mahmood"
                            placeholder="Full Name">
                    </div>
                    <div class="col-lg-6">
                        <label class="label-form">Nickname</label>
                        <input name="nickname" id="mobile" type="tel"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp" value="Nickname">
                    </div>
                    <div class="col-lg-6">
                        <label class="label-form"> Email </label>
                        <input name="email" type="email" value="ahmad.mahmood@gmail.com"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp" placeholder="Email">
                    </div>
                    <div class="col-lg-6">
                        <label class="label-form"> Zip Code </label>
                        <input name="zipCode" type="text" value="001"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp" placeholder="Zip Code"
                            required="">
                    </div>
                    <div class="col-lg-6">
                        <label class="label-form"> Company Address </label>
                        <input name="zipCode" type="text" value="Almasa Campany"
                            class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp" placeholder="Zip Code"
                            required="">
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