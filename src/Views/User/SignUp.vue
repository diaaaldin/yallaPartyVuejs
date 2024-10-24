<script>
import { ElLoading } from 'element-plus';
import { RouterView } from 'vue-router';
import { mapState, mapGetters, mapActions } from "vuex";


export default {
    props: {

    },

    components: {
        RouterView
    },

    data() {
        return {
            user: {
                email: "",
                password: "",
            },
        }
    },
    created() {
        localStorage.clear();
    },


    computed: {
        //...mapState("cart", ["cart"]),
    },

    methods: {
        ...mapActions("Users", ["getLogin"]),
        getLoginfunc() {

            if (this.checkValidation()) {

                // const loading = ElLoading.service({
                // 	lock: true,
                // 	background: 'rgba(0, 0, 0, 0.7)',
                // 	text: "",
                // });
                this.$router.push('/main');
                // this.getLogin(this.user).then(Response => {
                // 	console.log(Response);
                // 	this.$moshaToast('Login Success', {
                // 		hideProgressBar: 'false',
                // 		showIcon: 'true',
                // 		swipeClose: 'true',
                // 		type: 'success',
                // 		timeout: 3000,
                // 	});
                // 	loading.close();


                // }).catch(error => {

                // 	this.$moshaToast(error.response.data.message, {
                // 		hideProgressBar: 'false',
                // 		position: 'top-center',
                // 		showIcon: 'true',
                // 		swipeClose: 'true',
                // 		type: 'warning',
                // 		timeout: 3000,
                // 	});
                // 	loading.close();
                // });
            }

        },

        checkValidation() {
            if (this.user.email.trim() == '') {
                this.$moshaToast("أدخل الإيميل", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.email.focus();
                return;
            }
            if (this.user.password.trim() == '') {
                this.$moshaToast("أدخل كلمة المرور", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return;
            }
            return true;
        }
    },
}
</script>

<template>
    <div class="container me-lg-0 login register">
        <div class="row flex-column-reverse flex-lg-row ">
            <div class="col-12 col-lg-5 mt-5 pe-lg-0">
                <div class="row row-login register">
                    <div class="col-12 col-lg-8">
                        <div class="img">
                            <img src="/img/YallaPartyLogo2.png" alt="">
                        </div>
                        <div class="text-center">
                            <h2 class="title_log">Register</h2>
                            <div>
                                <p class="gray_text"> Welcome to the Yalla Party </p>
                            </div>
                        </div>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="">
                                <form class="mt-4">
                                    <label class="text">Name</label>
                                    <br>
                                    <input name="name" type="text"
                                        class="form-control my-3 py-3 text-start gray_text gray-inp " placeholder="Name"
                                        required>
                                    <label class="text">Nickname</label>
                                    <br>
                                    <input name="nickname" type="text"
                                        class="form-control my-3 py-3 text-start gray_text gray-inp "
                                        placeholder="Nickname" required>
                                    <label class="text">Email</label>
                                    <br>
                                    <input name="email" type="email"
                                        class="form-control my-3 py-3 text-start gray_text gray-inp "
                                        placeholder="email" required>

                                    <label class="text">Zip Code</label>
                                    <br>
                                    <input name="zipCode" type="text"
                                        class="form-control my-3 py-3 text-start gray_text gray-inp "
                                        placeholder="Zip Code" required>
                                    <label class="text">Company Address</label>
                                    <br>
                                    <input name="companyAddress" type="text"
                                        class="form-control my-3 py-3 text-start gray_text gray-inp "
                                        placeholder="Company Address" required>
                                    <div class="password-container">
                                        <label class="text">Password</label>
                                        <br>
                                        <input type="password"
                                            class="form-control my-3 py-3 gray_text gray-inp id_password"
                                            autocomplete="current-password" placeholder="password" required>
                                        <i class="far fa-eye togglePassword"></i>
                                    </div>
                                    <div class="password-container">
                                        <label class="text">Confirm Password</label>
                                        <br>
                                        <input type="Password"
                                            class="form-control my-3 py-3 gray_text gray-inp id_password"
                                            autocomplete="current-password" placeholder="Confirm Password" required>
                                        <i class="far fa-eye togglePassword"></i>
                                    </div>

                                    <input type="submit" class=" btn_submit_1 form-control mt-4 mb-3 py-3"
                                        value="Register">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-7  pe-lg-0 image">
                <!-- <img src="assets/img/bg-login.jpg" class="img-fluid" alt=""> -->
            </div>

        </div>
    </div>
</template>

<style scoped></style>