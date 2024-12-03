<script>
import { useHead } from '@vueuse/head';
import { ElLoading } from 'element-plus';
import { RouterView } from 'vue-router';
import { mapState, mapGetters, mapActions } from "vuex";
import axios from "axios";


export default {
    props: {

    },

    components: {
        RouterView
    },

    data() {
        return {
            data: {
                id: 0,
                name: "",
                nickName: "",
                email: "",
                mobile: "",
                stateId: "",
                cityId: "",
                address: "",
                password: "",
                confirmPassword: "",
                userTypeCFK: 0,
                zipCode: ""
            },
            emailError: '', 
            states: [], // Will hold the list of states
            cities: [], // Will hold the list of cities for the selected state
        }
    },
    created() {
        this.fetchStates();

        //localStorage.clear();
    },

    mounted() {
        useHead({
                // Can be static or computed
                title: 'SignUp | YallaParty',
                meta: [
                    {
                    name: `description`,
                    content: 'Yalla Party is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties. Our platform also supports businesses by providing a marketplace where they can showcase and sell everything related to parties.',
                    },
                    ],
                
                });
        // Initialize intl-tel-input on the input element
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

    computed: {
        //...mapState("cart", ["cart"]),
    },

    methods: {
        ...mapActions("Users", ["CustomerSignUp"]),
        getSignUpfunc() {

            if (this.checkValidation()) {

                const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "Signing you up...",
                    
                });

                this.CustomerSignUp(this.data).then(Response => {
                    this.$moshaToast('Registration Successful!', {
                        hideProgressBar: 'false',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'success',
                        timeout: 3000,
                    });


                    localStorage.setItem('customerName', JSON.parse(JSON.stringify(Response.name)));
                    localStorage.setItem('customerNickName', JSON.parse(JSON.stringify(Response.nickName)));

                    localStorage.setItem("token", JSON.stringify(Response.token));
                    Response.token = "";
                    localStorage.setItem('id', JSON.parse(JSON.stringify(Response.id)));
                    localStorage.setItem('email', JSON.parse(JSON.stringify(Response.email)));
                    localStorage.setItem('parentId', JSON.parse(JSON.stringify(Response.parentId)));
                    localStorage.setItem('userTypeId', JSON.parse(JSON.stringify(Response.userTypeId)));
                    localStorage.setItem('typeName', JSON.parse(JSON.stringify(Response.typeName)));

                    loading.close();
                    this.$router.push({ name: 'main' });


                }).catch(error => {

                    this.$moshaToast(error.response.data.message || 'Signup failed', {
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
            if (this.data.name.trim() == '') {
                this.$moshaToast("enter name", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.email.focus();
                return false;
            } else if (this.data.nickName.trim() == '') {
                this.$moshaToast("enter nickname", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.nickName.focus();
                return false;
            } else if (this.data.email.trim() == '') {
                this.$moshaToast("enter email", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            } else if (this.data.mobile.trim() == '') {
                this.$moshaToast("enter mobile", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            } else if (this.data.stateId.trim() == '') {
                this.$moshaToast("select state", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            } else if (this.data.cityId.trim() == '') {
                this.$moshaToast("select city", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            } else if (this.data.zipCode.trim() == '') {
                this.$moshaToast("enter zip code", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            } else if (this.data.password.trim() == '') {
                this.$moshaToast("enter password", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            } else if (this.data.confirmPassword.trim() == '') {
                this.$moshaToast("enter confirmPassword", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            } else if (this.data.password != this.data.confirmPassword) {
                this.$moshaToast("confirm password not equal password", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;

            }else if (!this.validateEmail(this.data.email)) {
                this.$moshaToast("Please enter a valid email address.", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            }
            return true;
        },

        validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Check if the input is empty
            if (!this.data.email) {
                this.emailError = '';
                return false;
            } 
            // Check if the input does not match the email format
            else if (!emailPattern.test(this.data.email)) {
                this.emailError = 'Please enter a valid email address.';
                return false;
            } 
            // Clear the error if the input is valid
            else {
                this.emailError = '';
                return true;
            }
        },
        filterMobileInput(event) {
            const input = event.target.value.replace(/\D/g, '').slice(0, 10);
            this.data.mobile = input; 
        },
        filterzipCdoeInput(event) {
            const input = event.target.value.replace(/\D/g, '').slice(0, 5);
            this.data.zipCode = input; 
        },
        // Fetch the states from the API
        async fetchStates() {
            try {
                const response = await axios.get("https://api.census.gov/data/2020/dec/pl?get=NAME&for=state:*", {
                    withCredentials: false,
                });
                // API returns the first element as headers, so we slice it off
                this.states = response.data;
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        },

        // Fetch cities based on the selected state
        async fetchCities(stateId) {
            try {
                const response = await axios.get(
                    `https://api.census.gov/data/2020/dec/pl?get=NAME&for=place:*&in=state:${stateId}`, {
                    withCredentials: false,
                });
                this.cities = response.data;
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        },
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
                            <router-link to="/">
                                <img src="/img/YallaPartyLogo2.png" alt="">
                            </router-link>
                        </div>
                        <div class="text-center">
                            <h2 class="title_log">Sign Up</h2>
                            <div>
                                <p class="gray_text"> Welcome to the Yalla Party </p>
                            </div>
                        </div>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="">
                                <form class="mt-4" >
                                    <label class="text">Name</label>
                                    <br>
                                    <input v-model="data.name" ref="name" name="name" type="text"
                                        class="form-control my-3 py-3 text-start gray_text gray-inp " placeholder="Name"
                                        required>
                                    <label class="text">Nickname</label>
                                    <br>
                                    <input v-model="data.nickName" ref="nickName" name="nickname" type="text"
                                        class="form-control my-3 py-3 text-start gray_text gray-inp "
                                        placeholder="Nickname" required>

                                    <label class="text">Email</label>
                                    <br>
                                    <input v-model="data.email" ref="email" name="email" type="email" @input="validateEmail"
                                        class="form-control my-3 py-3 text-start gray_text gray-inp "
                                        placeholder="email" required>
                                        <p v-if="emailError" style="color: red">{{ emailError }}</p>


                                    <label class="text">Mobile</label>
                                    <br>
                                    <input v-model="data.mobile" name="mobile" id="phone" type="tel" ref="phoneInput"
                                        class="form-control my-3 py-3 text-start gray_text gray-inp"
                                        placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1"
                                        @input="filterMobileInput" required>
                                    <label class="text">State</label>
                                    <br>
                                    <select v-model="data.stateId"
                                        class="form-control my-3 py-3 text-start gray_text gray-inp"
                                        @change="fetchCities(data.stateId)">
                                        <option value="" key="" selected>-- select a state --</option>
                                        <option v-for="item in states" :key="parseInt(item[1])" :value="item[1]">
                                            {{ item[0] }}
                                        </option>
                                    </select>

                                    <label class="text">City</label>
                                    <br>
                                    <select v-model="data.cityId"
                                        class="form-control  my-3 py-3 text-start gray_text gray-inp"
                                        :disabled="cities.length === 0">
                                        <option value="" key="" selected>-- select a city --</option>
                                        <option v-for="item in cities" :key="parseInt(item[2])" :value="item[2]">
                                            {{ item[0] }}
                                        </option>
                                    </select>


                                    <label class="text">Zip Code</label>
                                    <br>
                                    <input v-model="data.zipCode" ref="zipCode" name="zipCode" type="text"
                                        class="form-control my-3 py-3 text-start gray_text gray-inp "
                                        placeholder="Zip Code" @input="filterzipCdoeInput"required>
                                    <!-- <label class="text">Company Address</label>
                                    <br>
                                    <input name="companyAddress" type="text"
                                        class="form-control my-3 py-3 text-start gray_text gray-inp "
                                        placeholder="Company Address" required> -->
                                    <div class="password-container">
                                        <label class="text">Password</label>
                                        <br>
                                        <input v-model="data.password" ref="password" type="password"
                                            class="form-control my-3 py-3 gray_text gray-inp id_password"
                                            autocomplete="current-password" placeholder="password" required>
                                        <i class="far fa-eye togglePassword"></i>
                                    </div>
                                    <div class="password-container">
                                        <label class="text">Confirm Password</label>
                                        <br>
                                        <input v-model="data.confirmPassword" ref="confirmPassword" type="Password"
                                            class="form-control my-3 py-3 gray_text gray-inp id_password"
                                            autocomplete="current-password" placeholder="Confirm Password" required>
                                        <i class="far fa-eye togglePassword"></i>
                                    </div>

                                    <button type="button" v-on:click="getSignUpfunc" class=" btn_submit_1 form-control mt-4 mb-3 py-3"
                                        value="SignUp">Sign Up</button>
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