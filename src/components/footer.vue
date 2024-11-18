<script>
import { RouterView } from 'vue-router';
import { ElLoading } from 'element-plus';

import { mapState, mapGetters, mapActions } from "vuex";
import axios from "axios";


export default {
    data() {
        return {
            data: {
                id: 0,
                orderType: 0,
                name: "",
                nickName: "",
                email: "",
                mobile: "",
                stateId: "",
                cityId: "",
                comunicationMethods: 0,
                service: 0,
                otherService: "",
                moreInfo: "",
                questionData: [],
                birthdayOwnerName: "",
                childrenServices: "",
                totalPrice: 0
            },
            states: [], // Will hold the list of states
            cities: [], // Will hold the list of cities for the selected state

            selectedService: '', // To store the selected service
            showOtherServiceText: false,
            birthdayBookingFor: 0,
            birthdayAgeGroup: 0,
            childrenServices: [],

            jobApplicationQuestion: [],

            userAnswers: {},
            questions: [ /* your questions array */],
            questionAnswers: {}, // For storing answers to text, radio, and date questions
            selectedAnswers: {}, // For storing checkbox selections
            questionData: [], // This will hold the final structured data
            isSwinging: false, // Controls the swing class
        }
    },
    components: {
        RouterView,
    },
    mounted() {
        // Initialize intl-tel-input on the input element
        this.iti = window.intlTelInput(this.$refs.phoneInput, {
            initialCountry: "us",
            strictMode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });

        console.log("this.getQuestionsData : ", this.getQuestionsData);

        this.organizeQuestions();
    },
    beforeUnmount() {
        // Properly destroy the instance when the component is unmounted
        if (this.iti) {
            this.iti.destroy();
        }
    },

    created() {
        this.GetStates();
        this.GetQuestionsData();
        this.GetComunicationMethods();
        this.GetOrderServices();
        this.GetChildrenServices();
    },

    computed: {
        ...mapGetters("Code", ["getQuestionsData", "getStatesData", "getComunicationMethodsData", "getOrderServicesData", "getChildrenServicesData"]),

        GetUserName() {
            let userName = localStorage.getItem("customerName");
            if (userName == null) {
                return "";
            } else {
                return userName;
            }
        },
    },

    methods: {
        ...mapActions("Code", ["GetQuestionsData", "GetStates", "GetComunicationMethods", "GetOrderServices", "GetChildrenServices"]),
        ...mapActions("Orders", ["CreateOrder"]),


        // // Fetch the states from the API
        // async fetchStates() {
        //     try {
        //         const response = await axios.get("https://api.census.gov/data/2020/dec/pl?get=NAME&for=state:*", {
        //             withCredentials: false,
        //         });
        //         // API returns the first element as headers, so we slice it off
        //         this.states = response.data;
        //     } catch (error) {
        //         console.error("Error fetching states:", error);
        //     }
        // },

        // Fetch cities based on the selected state
        async fetchCities(stateId) {
            try {
                const response = await axios.get(
                    `https://api.census.gov/data/2020/dec/pl?get=NAME&for=place:*&in=state:${stateId}`, {
                    withCredentials: false,
                });
                this.cities = response.data;
                console.log(this.cities);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        },
        applySwing() {
            this.isSwinging = true; // Apply swing class
        },
        jobApplicationCreate() {
            this.data.orderType = 23;
            this.saveJobApplicationAnswers();

            const countryData = this.iti.getSelectedCountryData();
            const countryCode = countryData.dialCode;
            const fullPhoneNumber = `+${countryCode}${this.data.mobile}`;
            this.data.mobile = fullPhoneNumber;

            if (this.checkValidation()) {
                const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "",
                });

                this.CreateOrder(this.data).then(Response => {
                    console.log(Response);
                    this.$moshaToast('Send order success', {
                        hideProgressBar: 'false',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'success',
                        timeout: 3000,
                    });

                    loading.close();
                    $('#job-application').modal('hide');
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
            if (this.data.orderType == 0) {
                this.$moshaToast("there are error comunicate with site manager", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.email.focus();
                return false;
            } else if (this.data.name.trim() == '') {
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
            }

            else if (this.data.stateId.trim() == '') {
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
            }

            else if (this.data.comunicationMethods == 0) {
                this.$moshaToast("select comunication method", {
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

        organizeQuestions() {
            // Clear previous data
            this.jobApplicationQuestion = [];
            // Iterate over questions and filter based on orderType
            for (const question of this.getQuestionsData) {
                if (question.orderType == 23) {
                    this.jobApplicationQuestion.push(question);
                }
            }
        },

        saveJobApplicationAnswers() {
            // Clear the previous questionData
            this.data.questionData = [];
            // Loop through each question to build the questionData
            for (const question of this.jobApplicationQuestion) {
                // Create a new entry for questionData
                const questionEntry = {
                    id: question.id, // Using the question ID
                    question: question.questionName, // Using the question name
                    answer: ""
                };

                questionEntry.answer = this.userAnswers[question.id] || '';
                // Add the question entry to the questionData array
                this.data.questionData.push(questionEntry);
            }
            console.log(this.data.questionData); // Display the collected data
        },

        handleServiceChange() {
            // If "Other services" is selected, clear the textarea
            const selectedUser = this.getOrderServicesData.find(x => x.id === this.data.service);
            // console.log("selectedUser :", selectedUser);
            if (selectedUser) {
                if (selectedUser.name.toLowerCase().includes('other')) {
                    this.showOtherServiceText = true;
                } else {
                    this.data.otherService = '';
                    this.showOtherServiceText = false;
                }
            }
        },

        getCommaSeparatedAnswers(questionId) {
            // Ensure userAnswers[questionId] is an array, otherwise use an empty array
            const answers = Array.isArray(this.userAnswers[questionId]) ? this.userAnswers[questionId] : [];
            return answers.join(', ');
        },

        handleCheckboxChange(questionId, answerName, event) {
            // Ensure userAnswers[questionId] is an array
            if (!this.userAnswers[questionId]) {
                // Initialize it as an empty array if it's not defined or is not an array
                this.userAnswers[questionId] = [];
            } else if (typeof this.userAnswers[questionId] === 'string') {
                // If it's a string, convert it back to an array
                this.userAnswers[questionId] = this.userAnswers[questionId].split(', ').filter(Boolean);
            }

            // Add or remove the answer based on the checkbox state
            if (event.target.checked) {
                // Add the answer to the array if not already present
                if (!this.userAnswers[questionId].includes(answerName)) {
                    this.userAnswers[questionId].push(answerName);
                }
            } else {
                // Remove the answer from the array
                const index = this.userAnswers[questionId].indexOf(answerName);
                if (index !== -1) {
                    this.userAnswers[questionId].splice(index, 1);
                }
            }

            // Convert the array to a comma-separated string
            this.userAnswers[questionId] = this.userAnswers[questionId].join(', ');
            //  console.log("this.userAnswers[questionId] : " , this.userAnswers[questionId]);
        },

        clearData() {
            this.data.id = 0,
                this.data.orderType = 0,
                this.data.name = "",
                this.data.nickName = "",
                this.data.email = "",
                this.data.mobile = "",
                this.data.stateId = "",
                this.data.cityId = "",
                this.data.service = 0,
                this.data.otherService = "",
                this.data.comunicationMethods = 0,
                this.data.moreInfo = "",
                this.data.questionData = [],
                this.data.childrenServices = "",
                this.data.totalPrice = 0
        },

    }
};
</script>

<template>
    <!--start footer section -->
    <footer class="mt-5">
        <div class="container py-5">
            <div class="row align-items-center text-center text-lg-start justify-content-md-center">
                <div class="col-lg-3 col-md-12">
                    <div class="d-flex flex-column flex-lg-column">
                        <div class="d-flex justify-content-center justify-content-lg-start my-3">
                            <img src="/img/WhiteYallaPartyLogo.png" alt="" width="70" class="img-fluid" />
                        </div>
                        <p class="text_footer_hero">
                            Yalla Party is a subsidiary of Yalla Party LLC, registered in the state of Maryland, United
                            States of America.
                        </p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 ps-lg-5 services">
                    <div class="d-flex flex-column flex-lg-column justify-content-center">
                        <a href="#">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m9 5 7 7-7 7" />
                            </svg>
                            <span class="text_footer">Services </span>
                        </a>

                        <!-- <a href="">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                              </svg> 

                            <span class="text_footer">About Us</span>
                        </a> -->
                        <router-link to="/aboutus">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m9 5 7 7-7 7" />
                            </svg>
                            <span class="text_footer">About Us</span>
                        </router-link>

                        <a id="contact_with" @click="applySwing">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m9 5 7 7-7 7" />
                            </svg>

                            <span class="text_footer"> Contact with us </span>
                        </a>
                        <a href="" data-bs-toggle="modal" data-bs-target="#job-application">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m9 5 7 7-7 7" />
                            </svg>

                            <span class="text_footer">Work with Yalla Party</span>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 info">
                    <div class="d-flex flex-column flex-lg-column justify-content-between">
                        <p class="text_footer_hero">
                            Capitol Heights, MD USA
                        </p>
                        <a>
                            <i class="fa fa-phone white fs-4"></i>
                            <span class="text_footer contact-footer" :class="{ swing: isSwinging }"
                                @animationend="isSwinging = false"> 202 455 9004 </span>
                        </a>
                        <a>
                            <i class="fa fa-envelope white fs-4"></i>
                            <span class="text_footer contact-footer" :class="{ swing: isSwinging }"
                                @animationend="isSwinging = false"> info@yallaparty.net</span>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 mb-lg-4 follow">
                    <h3 class="text_footer"> Follow us on: </h3>
                    <div class="d-flex justify-content-center justify-content-lg-start">
                        <div class="social-links">
                            <ul>
                                <li><a href="#"><i class="fab fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fab fa-linkedin" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="row text-center mt-4 mx-0 copy-write">
            <h3 class="text_footer py-2 mb-0">
                Copyright ©2024 Yalla Party. All Rights Reserved Copyright
            </h3>
        </div>
    </footer>
    <!--end footer section-->

    <div class="modal fade" id="job-application" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Job Application</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" method="">
                        <label class=" label-form"> Name </label>
                        <div class="input-group mb-3">
                            <input v-model="data.name" type="text" class="form-control" placeholder="Username"
                                aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Nickname </label>
                        <div class="input-group mb-3">
                            <input v-model="data.nickName" type="text" class="form-control" placeholder="Nickname"
                                aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Mobile </label>
                        <div class="input-group mb-3">
                            <input v-model="data.mobile" id="phone" type="tel" ref="phoneInput" class="form-control"
                                maxlength="10" placeholder="(201) 555-0123" aria-label=""
                                aria-describedby="basic-addon1" required>

                        </div>
                        <label class=" label-form"> Email </label>
                        <div class="input-group mb-3">
                            <input v-model="data.email" type="text" class="form-control" placeholder="Email"
                                aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> State </label>
                        <div class="input-group mb-3">
                            <select v-model="data.stateId" class="form-control" @change="fetchCities(data.stateId)">
                                <option value="" key="" selected>-- select a state --</option>
                                <option v-for="item in getStatesData" :key="parseInt(item[1])" :value="item[1]">
                                    {{ item[0] }}
                                </option>
                            </select>
                        </div>
                        <label class=" label-form"> City </label>
                        <div class="input-group mb-3">
                            <select v-model="data.cityId" class="form-control" :disabled="cities.length === 0">
                                <option value="" key="" selected>-- select a city --</option>
                                <option v-for="item in cities" :key="parseInt(item[2])" :value="item[2]">
                                    {{ item[0] }}
                                </option>
                            </select>
                        </div>
                        <!-- <label class=" label-form"> Party date </label>
                        <div class="input-group mb-3" >
                                <input class="form-control" type="date" v-model="data.orderDate"
                                    required />
                        </div>-->

                        <label class=" label-form"> Would you like to communicate by ? </label>

                        <div class="mb-3">
                            <div class="form-check" v-for="service in this.getComunicationMethodsData"
                                :key="service.id">
                                <input class="form-check-input" type="radio" name="radio" :id="'service-' + service.id"
                                    :value="service.id" v-model="data.comunicationMethods">
                                <label class="form-check-label" :for="'service-' + service.id"> {{ service.name }}
                                </label>
                            </div>
                        </div>

                        <!-- <label class="label-form">Select the type of service provided</label>
                        <div class="mb-3">
                            <div class="form-check" v-for="service in this.getOrderServicesData" :key="service.id">
                                <input class="form-check-input" type="radio" name="rad" 
                                :id="'service-' + service.id" :value="service.id"  v-model="data.service" @change="handleServiceChange">
                                <label class="form-check-label" :for="'service-' + service.id"> {{ service.name }} </label>
                            </div>
                        </div> -->
                        <!-- Textarea for "Other services" -->
                        <!-- <div v-if="this.showOtherServiceText">
                            <label class="label-form">Please specify other services:</label>
                            <textarea class="form-control" v-model="data.otherService" rows="3"></textarea>
                        </div> -->

                        <div v-for="(question, index) in this.jobApplicationQuestion" :key="question.id">
                            <label class="label-form">{{ question.questionName }}</label>

                            <div class="input-group mb-3" v-if="question.questionAnswerType === 'text'">
                                <textarea class="form-control" type="text" v-model="userAnswers[question.id]"
                                    :required="question.required"></textarea>
                            </div>

                            <div class="input-group mb-3" v-else-if="question.questionAnswerType === 'number'">
                                <input class="form-control" type="number" v-model="userAnswers[question.id]"
                                    :required="question.required" />
                            </div>

                            <div class="input-group mb-3" v-else-if="question.questionAnswerType === 'date'">
                                <input class="form-control" type="date" v-model="userAnswers[question.id]"
                                    :required="question.required" />
                            </div>

                            <div class=" mb-3" v-else-if="question.questionAnswerType === 'checkbox'">
                                <div class="form-check" v-for="answer in question.answers" :key="answer.id">
                                    <input name="amr" class="form-check-input" type="checkbox"
                                        :id="'checkbox-' + answer.id" :value="answer.answerName"
                                        @change="handleCheckboxChange(question.id, answer.answerName, $event)" />
                                    <label :for="'checkbox-' + answer.id">{{ answer.answerName }}</label>
                                </div>
                            </div>

                            <div class=" mb-3" v-else-if="question.questionAnswerType === 'radio'">
                                <div class="form-check" v-for="answer in question.answers" :key="answer.id">
                                    <input class="form-check-input" type="radio" :name="'radio-' + question.id"
                                        :id="'radio-' + answer.id" :value="answer.answerName"
                                        v-model="userAnswers[question.id]" :required="question.required" />
                                    <label :for="'radio-' + answer.id">{{ answer.answerName }}</label>
                                </div>
                            </div>

                            <div v-if="question.required && !userAnswers[question.id]">
                                <span class="text-danger">This question is required.</span>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" v-on:click="jobApplicationCreate()" class="btn btn-primary">Send
                        order</button>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped></style>
