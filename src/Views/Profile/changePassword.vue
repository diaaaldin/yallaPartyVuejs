<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';

export default {
    data() {
        return {
            data: {
                userId: 0,
                email: "",
                mobile: "",
                sendWay: 0,
                oldPassword: "",
                newPassword: ""
            },
            confirmPassword:"",

            isPassword1Visible: false,
            isPassword2Visible: false,
            isPassword3Visible: false,
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
        ...mapActions("Users", ["ChangePassword"]),


        ChangePasswordFunc() {
            if (this.checkValidation()) {
                const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "",
                });

                this.ChangePassword(this.data).then(Response => {
                    console.log(Response);
                    this.$moshaToast('change password success', {
                        hideProgressBar: 'false',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'success',
                        timeout: 3000,
                    });
                    this.clearData();
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
            }
        },

        checkValidation() {
            if (this.data.oldPassword.trim() == '') {
                this.$moshaToast("enter old password", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                // this.$refs.email.focus();
                return false;
            } else if (this.data.newPassword.trim() == '') {
                this.$moshaToast("enter new password", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                // this.$refs.email.focus();
                return false;
            } else if (this.data.newPassword.trim() != this.confirmPassword.trim()) {
                this.$moshaToast("new password not equal confirm password", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                // this.$refs.nickName.focus();
                return false;
            } 

            return true;
        },

        togglePassword1Visibility() {
            this.isPassword1Visible = !this.isPassword1Visible;
        },
        togglePassword2Visibility() {
            this.isPassword2Visible = !this.isPassword2Visible;
        },
        togglePassword3Visibility() {
            this.isPassword3Visible = !this.isPassword3Visible;
        },

        clearData() {
            this.data.userId = 0;
            this.data.email = "";
            this.data.mobile = "";
            this.data.sendWay = 0;
            this.data.oldPassword = "";
            this.data.newPassword = "";
            this.confirmPassword = "";
        },
    }
};
</script>
<template>

    <!-- right side container -->
    <div class="col-12 col-lg-9  ">
        <div class="container white_card px-4 pt-4 pb-0 mt-3 mt-lg-0 right-side">
            <div method="" action="" class="mt-2">
                <div class="row ">
                    <div class="col-lg-6">
                        <div class="password-container">
                            <label class="text">Old Password</label>
                            <br>
                            <input v-model="data.oldPassword" :type="isPassword1Visible ? 'text' : 'password'"
                                class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp id_password"
                                autocomplete="current-password" placeholder="Old password" required>
                            <a v-on:click="togglePassword1Visibility">
                                <i
                                    :class="isPassword1Visible ? 'far fa-eye-slash togglePassword' : 'far fa-eye togglePassword'"></i>
                                <!-- <i class="far fa-eye-slash togglePassword"></i> -->
                            </a>
                        </div>
                        <div class="password-container">
                            <label class="text">New Password</label>
                            <br>
                            <input v-model="data.newPassword" :type="isPassword2Visible ? 'text' : 'password'"
                                class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp id_password"
                                autocomplete="current-password" placeholder="New password" required>
                            <a v-on:click="togglePassword2Visibility">
                                <i
                                    :class="isPassword2Visible ? 'far fa-eye-slash togglePassword' : 'far fa-eye togglePassword'"></i>
                                <!-- <i class="far fa-eye-slash togglePassword"></i> -->
                            </a>
                        </div>
                        <div class="password-container">
                            <label class="text">Confirm New Password</label>
                            <br>
                            <input v-model="confirmPassword" :type="isPassword3Visible ? 'text' : 'password'"
                                class="form-control mt-2 mb-4  py-3 text-start list_link gray-inp id_password"
                                autocomplete="current-password" placeholder="Confirm Password" required>
                            <a v-on:click="togglePassword3Visibility">
                                <i
                                    :class="isPassword3Visible ? 'far fa-eye-slash togglePassword' : 'far fa-eye togglePassword'"></i>
                                <!-- <i class="far fa-eye-slash togglePassword"></i> -->
                            </a>
                        </div>
                    </div>

                    <hr>
                    <div class="row justify-content-start">
                        <div class=" col-12 col-md-4 col-lg-3">

                            <input type="submit" v-on:click="ChangePasswordFunc()" class=" form-control party-btn  w-100 my-4 py-3" value="Update Data">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end right side  -->
</template>
<style scoped></style>