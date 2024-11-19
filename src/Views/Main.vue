<script>
import { useHead } from '@vueuse/head'
import { RouterView } from 'vue-router';
import { ElLoading } from 'element-plus';

import { mapState, mapGetters, mapActions } from "vuex";
import pageFooter from '../components/footer.vue';
import axios from "axios";

export default {
    setup() {
                useHead({
                // Can be static or computed
                title: 'Home | YallaParty',
                meta: [
                    {
                    name: `description`,
                    content: 'Yalla Party is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties. Our platform also supports businesses by providing a marketplace where they can showcase and sell everything related to parties.',
                    },
                    ],
                
                })
            },
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
                orderDate: null,
                comunicationMethods: 0,
                service: 0,
                otherService: "",
                moreInfo: "",
                questionData: [],
                birthdayOwnerName: "",
                childrenServices: "",
                totalPrice: 0
            },
            // states: [], // Will hold the list of states
            cities: [], // Will hold the list of cities for the selected state

            selectedService: '', // To store the selected service
            showOtherServiceText: false,
            birthdayBookingFor: 0,
            birthdayAgeGroup: 0,
            childrenServices: [],

            weddingQuestion: [],
            engagementQuestion: [],
            birthdayQuestion: [],
            graduationQuestion: [],
            specialQuestion: [],
            jobApplicationQuestion: [],

            userAnswers: {},
            questions: [ /* your questions array */],
            questionAnswers: {}, // For storing answers to text, radio, and date questions
            selectedAnswers: {}, // For storing checkbox selections
            questionData: [] // This will hold the final structured data
        }
    },
    components: {
        RouterView,
        pageFooter,
    },
    mounted() {
        //console.log("this.getQuestionsData : ", this.getQuestionsData);
        // Initialize intl-tel-input on the input element
        this.iti = window.intlTelInput(this.$refs.phoneInput1, {
            initialCountry: "us",
            strictMode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });
        this.iti2 = window.intlTelInput(this.$refs.phoneInput2, {
            initialCountry: "us",
            strictMode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });
        this.iti3 = window.intlTelInput(this.$refs.phoneInput3, {
            initialCountry: "us",
            strictMode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });
        this.iti4 = window.intlTelInput(this.$refs.phoneInput4, {
            initialCountry: "us",
            strictMode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });
        this.iti5 = window.intlTelInput(this.$refs.phoneInput5, {
            initialCountry: "us",
            strictMode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });

        this.organizeQuestions();
        console.log("this.getChildrenServicesData : ", this.getChildrenServicesData);
    },
    beforeUnmount() {
        // Properly destroy the instance when the component is unmounted
        if (this.iti) {
            this.iti.destroy();
        }
        if (this.iti2) {
            this.iti2.destroy();
        }
        if (this.iti3) {
            this.iti3.destroy();
        }

        if (this.iti4) {
            this.iti4.destroy();
        }

        if (this.iti5) {
            this.iti5.destroy();
        }


    },

    created() {
       // this.fetchStates();

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
        ...mapActions("Code", ["GetQuestionsData", "GetComunicationMethods", "GetOrderServices", "GetChildrenServices"]),
        ...mapActions("Orders", ["CreateOrder"]),
        ...mapActions("Users", ["CustomerProfileInfo"]),

        goToProfileFunc() {
            if (!this.isTokenValid()) {
                this.$router.push({ name: 'login' });
            } else {
                let Id = parseInt(localStorage.getItem("id"));
                this.CustomerProfileInfo(Id).then(Response => {
                    this.$router.push({ name: 'profileProfile' });
                })
            }
        },
        goToBookStore() {
            this.$router.push({ name: 'bookStore' });
        },
        isTokenValid() {
            const token = localStorage.getItem('token');
            if (!token) return false;
            // Example: check token expiration
            const payload = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            return payload.exp > currentTime;
        },
        logoutFunc() {
            localStorage.clear();
            this.$router.push({ name: 'main' });
            window.location.reload();
        },

        // Fetch the states from the API
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

        weddingOrderCreate() {
            this.data.orderType = 17;
            this.saveWeddingAnswers();
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
                    $('#wedding_party').modal('hide');
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

        engagementOrderCreate() {
            this.data.orderType = 18;
            this.saveEngagementAnswers();
            const countryData = this.iti2.getSelectedCountryData();
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
                    $('#engagement_parties').modal('hide');
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

        birthdayOrderCreate() {
            this.data.orderType = 19;
            this.data.childrenServices = this.convertSelectedChildrenServicesToString();
            this.saveBirthdayAnswers();
            const countryData = this.iti3.getSelectedCountryData();
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
                    $('#birthday_parties').modal('hide');
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

        graduationOrderCreate() {
            this.data.orderType = 20;
            this.saveGraduationAnswers();

            const countryData = this.iti4.getSelectedCountryData();
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
                    $('#graduation_party').modal('hide');
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

        specialOrderCreate() {
            this.data.orderType = 21;
            this.saveSpecialAnswers();

            const countryData = this.iti5.getSelectedCountryData();
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
                    $('#special_occasions').modal('hide');
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
        jobApplicationCreate() {
            this.data.orderType = 23;
            this.saveJobApplicationAnswers();

            console.log("data : ", this.data);
            if (this.checkJobApplicationValidation()) {
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
                    $('#special_occasions').modal('hide');
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

            else if (this.data.orderDate == null) {
                this.$moshaToast("enter party date", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.password.focus();
                return false;
            } else if (this.data.comunicationMethods == 0) {
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
            this.weddingQuestion = [];
            this.engagementQuestion = [];
            this.birthdayQuestion = [];
            this.graduationQuestion = [];
            this.specialQuestion = [];
            this.jobApplicationQuestion = [];

            // Iterate over questions and filter based on orderType
            for (const question of this.getQuestionsData) {
                switch (question.orderType) {
                    case 17:
                        this.weddingQuestion.push(question);
                        break;
                    case 18:
                        this.engagementQuestion.push(question);
                        break;
                    case 19:
                        this.birthdayQuestion.push(question);
                        break;
                    case 20:
                        this.graduationQuestion.push(question);
                        break;
                    case 21:
                        this.specialQuestion.push(question);
                        break;
                    case 23:
                        this.jobApplicationQuestion.push(question);
                        break;
                    default:
                        console.warn(`No array for orderType: ${question.orderType}`);
                }
            }

        },

        saveWeddingAnswers() {
            // Clear the previous questionData
            this.data.questionData = [];

            // Loop through each question to build the questionData
            for (const question of this.weddingQuestion) {
                // Create a new entry for questionData
                const questionEntry = {
                    id: question.id, // Using the question ID
                    question: question.questionName, // Using the question name
                    answer: ""
                };

                questionEntry.answer = String(this.userAnswers[question.id] || '');


                // Add the question entry to the questionData array
                this.data.questionData.push(questionEntry);
            }

            console.log(this.data.questionData); // Display the collected data
        },

        saveEngagementAnswers() {
            // Clear the previous questionData
            this.data.questionData = [];

            // Loop through each question to build the questionData
            for (const question of this.engagementQuestion) {
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

        saveBirthdayAnswers() {
            // Clear the previous questionData
            this.data.questionData = [];

            // Loop through each question to build the questionData
            for (const question of this.birthdayQuestion) {
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

        saveGraduationAnswers() {
            // Clear the previous questionData
            this.data.questionData = [];
            // Loop through each question to build the questionData
            for (const question of this.graduationQuestion) {
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

        saveSpecialAnswers() {
            // Clear the previous questionData
            this.data.questionData = [];

            // Loop through each question to build the questionData
            for (const question of this.specialQuestion) {
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

            this.showOtherServi
            //console.log("this.selectedService : ", this.selectedService);
        },

        deleteChildrenService() {
            // If "Other services" is selected, clear the textarea
            this.childrenServices = [];
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
                this.data.orderDate = null,
                this.data.service = 0,
                this.data.otherService = "",
                this.data.comunicationMethods = 0,
                this.data.moreInfo = "",
                this.data.questionData = [],
                this.data.childrenServices = "",
                this.data.totalPrice = 0
        },

        convertSelectedChildrenServicesToString() {
            return this.childrenServices.join(', ');
        }

    }
};
</script>

<template>
    <div class="home">
        <!--start header section -->
        <div class="header-div">
            <nav class="navbar navbar-expand-lg navbar-expand-lg pt-3">
                <div class="container">

                    <router-link to="/" class="navbar-brand">
                        <img src="/img/WhiteYallaPartyLogo.png" width="110" alt="" />
                    </router-link>

                    <!-- <div class="navigation">
                        <input type="checkbox" class="navigation__checkbox" id="nav-toggle">
                        <label for="nav-toggle" class="navigation__button">
                            <span class="navigation__icon" aria-label="toggle navigation menu"></span>
                        </label>
                        <div class="navigation__background"></div>
                        <nav class="navigation__nav" role="navigation">
                            <label for="nav-toggle" class="navigation__button">
                                <i class="fa fa-arrow-left" style="color: #de147f;font-size: 18px;margin-top: 15px;"></i>
                            </label>
                            <ul class="navigation__list">
                                <li class="navigation__item">
                                    <a href="http://dash.yallaparty.net/login" class="navigation__link"> Login Business </a>
                                </li>
                                <li class="navigation__item">
                                    <a href="http://dash.yallaparty.net/companylogin" class="navigation__link"> Create Event </a>
                                </li>
                                <li class="navigation__item">
                                    <a href="http://dash.yallaparty.net/storelogin" class="navigation__link"> Create Product </a>
                                </li>
                                <li class="navigation__item">
                                    <a href="http://dash.yallaparty.net/storesignup" class="navigation__link"> Create Store </a>
                                </li>
                                <li class="navigation__item">
                                    <a href="http://dash.yallaparty.net/companysignup" class="navigation__link"> Create Company </a>
                                </li>
                                <li class="navigation__item">
                                    <a href="http://dash.yallaparty.net/partnersignup" class="navigation__link"> Be a partner </a>
                                </li>
                            </ul>
                         </nav>
                    </div> -->

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler">
                            <svg width="34" height="26" viewBox="0 0 34 26" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.3479 21.124H0V25.3656H11.3479V21.124Z" fill="white"></path>
                                <path d="M22.6738 10.5625H0.148438V14.8041H22.6738V10.5625Z" fill="white"></path>
                                <path d="M34 0H0.148438V4.24156H34V0Z" fill="white"></path>
                            </svg>
                        </span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav align-items-center mb-2 mb-lg-0 gradiant_nav">
                            <li class="nav-item">
                                <router-link to="/" class="nav-link active"> HOME </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/events" class="nav-link "> EVENT </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/productStore" class="nav-link ">STORE</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/bookStore" class="nav-link ">TOOLS</router-link>
                            </li>
                        </ul>

                        <ul v-if="GetUserName == ''"
                            class="nav align-items-center mb-2 mb-lg-0 white-header justify-content-center gradiant_nav">
                            <li class="nav-item login">
                                <router-link to="/login" type="button"
                                    class="px-3 py-2 align-items-center d-flex login-btn ">LOGIN</router-link>
                            </li>
                            <li class="nav-item sign-up">
                                <router-link to="/signUp" type="button"
                                    class="px-3 py-2 align-items-center d-flex login-btn ">SIGN UP</router-link>
                            </li>
                        </ul>
                        <ul v-else
                            class="nav align-items-center mb-2 mb-lg-0 white-header justify-content-center gradiant_nav">
                            <li class="nav-item dropdown ms-2">
                                <a href="" class="dropdown-toggle px-3 py-2 align-items-center d-flex login-btn"
                                    id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M4 19C4 16.2386 6.23858 14 9 14H15C17.7614 14 20 16.2386 20 19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19Z"
                                                fill="#CFE0F3"></path>
                                            <path
                                                d="M12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2Z"
                                                fill="#0B3D74"></path>
                                        </svg>
                                    </span>
                                    {{ GetUserName }}
                                </a>
                                <ul class="dropdown-menu user-ul" aria-labelledby="navbarDropdown">
                                    <li class="profile">
                                        <a class="dropdown-item" v-on:click="goToProfileFunc()">
                                            <span>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M4 7.8C4 6.11984 4 5.27976 4.32698 4.63803C4.6146 4.07354 5.07354 3.6146 5.63803 3.32698C6.27976 3 7.11984 3 8.8 3H15.2C16.8802 3 17.7202 3 18.362 3.32698C18.9265 3.6146 19.3854 4.07354 19.673 4.63803C20 5.27976 20 6.11984 20 7.8V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V7.8Z"
                                                        fill="#B5BEC8"></path>
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10ZM13 8C12.4477 8 12 8.44772 12 9C12 9.55228 12.4477 10 13 10H15C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8H13ZM13 12C12.4477 12 12 12.4477 12 13C12 13.5523 12.4477 14 13 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12H13ZM12 17C12 16.4477 12.4477 16 13 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H13C12.4477 18 12 17.5523 12 17ZM10 13C10 13.5523 9.55228 14 9 14C8.44772 14 8 13.5523 8 13C8 12.4477 8.44772 12 9 12C9.55228 12 10 12.4477 10 13ZM9 18C9.55228 18 10 17.5523 10 17C10 16.4477 9.55228 16 9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18Z"
                                                        fill="black"></path>
                                                    <path
                                                        d="M9 3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4V3Z"
                                                        fill="black"></path>
                                                </svg>
                                            </span>
                                            Profile
                                        </a>
                                    </li>
                                    <li class="log-out">
                                        <a href="" class="dropdown-item" v-on:click="logoutFunc()">
                                            <span>
                                                <svg width="24" height="24" viewBox="0 0 17 13" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M0.85 2.70332V10.2966C0.85 11.4258 1.77072 12.3465 2.89986 12.3465H9.03692C10.1661 12.3465 11.0868 11.4258 11.0868 10.2966V9.06677C11.0868 8.7759 10.8514 8.54047 10.5605 8.54047C10.2696 8.54047 10.0342 8.7759 10.0342 9.06677V10.2966C10.0342 10.8471 9.5843 11.297 9.03386 11.297H2.89986C2.34941 11.297 1.89954 10.8471 1.89954 10.2966V2.70332C1.89954 2.15288 2.34941 1.70301 2.89986 1.70301H9.03692C9.58736 1.70301 10.0372 2.15288 10.0372 2.70332V3.93318C10.0372 4.22406 10.2727 4.45948 10.5635 4.45948C10.8544 4.45948 11.0898 4.22406 11.0898 3.93318V2.70332C11.0898 1.57418 10.1691 0.653467 9.03998 0.653467H2.89986C1.77087 0.653467 0.85 1.57097 0.85 2.70332Z"
                                                        fill="#e5008f" stroke="#e5008f" stroke-width="0.3"></path>
                                                    <path
                                                        d="M12.6848 9.43595C12.7873 9.53847 12.9207 9.59002 13.057 9.59002C13.1933 9.59002 13.3267 9.53847 13.4292 9.43595L15.996 6.86915C16.2014 6.66372 16.2014 6.33318 15.996 6.12775L13.4292 3.56096C13.2238 3.35553 12.8932 3.35553 12.6878 3.56096C12.4824 3.76638 12.4824 4.09693 12.6878 4.30236L14.3591 5.97368H7.68782C7.39695 5.97368 7.16152 6.2091 7.16152 6.49998C7.16152 6.79086 7.39694 7.02628 7.68782 7.02628H14.3561L12.6853 8.69708C12.479 8.89975 12.4792 9.23464 12.6859 9.43706L12.7908 9.32989L12.6848 9.43595Z"
                                                        fill="#e5008f" stroke="#e5008f" stroke-width="0.3"></path>
                                                </svg>
                                            </span>
                                            Log Out
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div class="container">
                <div class="panner text-center">
                    <!-- <p>Big Event 2024</p> -->
                    <h2 class="panner-title">Yalla Party</h2>
                    <p class="sub-index-title">
                        Yalla Party is your go-to platform for booking events of any size, from weddings and engagements to birthdays and graduation parties. Our platform also supports businesses by providing a marketplace where they can showcase and sell everything related to parties.
                        <br>For DJs, Yalla Party is a place to create and promote events, making it easy to sell tickets directly through us. Currently available in DC, MD, VA, PA, NJ and NY—with plans to expand soon!
                    </p>
                    <a href="#card">Book Us</a>
                </div>
            </div>
        </div>
        <!-- end header -->
        <section class="mt-3">
            <div class="container">
                <div class="row"></div>
                <!--start row card -->
                <section class="mt-5 home-row">
                    <span class="sub-hero-title" id="card"> Cards </span>
                    <div class="row">
                        <div class="tab-pane fade active show" id="waiting" role="tabpanel"
                            aria-labelledby="waiting-tab">
                            <div class="row cards">
                                <div class="col-lg-7 col-md-12 col-sm-12">
                                    <!--      start card link               -->
                                    <div class="card-pop col-md-12 py-3 mt-3">
                                        <div v-on:click="clearData()" class="a1" data-bs-toggle="modal"
                                            data-bs-target="#wedding_party">
                                            <a v-on:click="clearData()">
                                                <div class="row">
                                                    <div class="col-lg-1 col-md-1 col-sm-1 px-0">
                                                        <img class="img-fluid card_waiting_img w-100"
                                                            src="/img/pr15.jpg" alt="" />
                                                    </div>
                                                    <div class="col-lg-11 col-md-11 col-sm-11">
                                                        <div class="d-flex justify-content-between align-items-center name-card">
                                                            <div class="d-flex justify-content-start">
                                                                <span class="text">Wedding Party</span>
                                                            </div>
                                                            <div class="d-flex justify-content-end">
                                                                    <svg class="feather feather-plus-square" fill="none"
                                                                        height="24" stroke="currentColor"
                                                                        stroke-linecap="round" stroke-linejoin="round"
                                                                        stroke-width="2" viewBox="0 0 24 24" width="24"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <rect height="18" rx="2" ry="2" width="18" x="3"
                                                                            y="3"></rect>
                                                                        <line x1="12" x2="12" y1="8" y2="16"></line>
                                                                        <line x1="8" x2="16" y1="12" y2="12"></line>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-pop col-md-12 py-3 mt-3">
                                        <div v-on:click="clearData()" class="a1" data-bs-toggle="modal"
                                            data-bs-target="#engagement_parties">
                                            <a v-on:click="clearData()">
                                                <div class="row">
                                                    <div class="col-12 col-lg-1 col-md-1 col-sm-1 px-0">
                                                        <img class="img-fluid card_waiting_img w-100"
                                                            src="/img/pr15.jpg" alt="" />
                                                    </div>
                                                    <div class="col-12 col-lg-11 col-md-11 col-sm-11">
                                                        <div class="d-flex justify-content-between align-items-center name-card">
                                                            <div class="d-flex justify-content-start">
                                                                <span class="text">Engagement Parties</span>
                                                            </div>
                                                            <div class="d-flex justify-content-end">
                                                                    <svg class="feather feather-plus-square" fill="none"
                                                                        height="24" stroke="currentColor"
                                                                        stroke-linecap="round" stroke-linejoin="round"
                                                                        stroke-width="2" viewBox="0 0 24 24" width="24"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <rect height="18" rx="2" ry="2" width="18" x="3"
                                                                            y="3"></rect>
                                                                        <line x1="12" x2="12" y1="8" y2="16"></line>
                                                                        <line x1="8" x2="16" y1="12" y2="12"></line>
                                                                    </svg>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-pop col-md-12 py-3 mt-3">
                                        <div v-on:click="clearData()" class="a1" data-bs-toggle="modal"
                                            data-bs-target="#birthday_parties">
                                            <a v-on:click="clearData()">
                                                <div class="row">
                                                    <div class="col-12 col-lg-1 col-md-1 col-sm-1 px-0">
                                                        <img class="img-fluid card_waiting_img w-100"
                                                            src="/img/pr15.jpg" alt="" />
                                                    </div>
                                                    <div class="col-12 col-lg-11 col-md-11 col-sm-11">
                                                        <div class="d-flex justify-content-between align-items-center name-card">
                                                            <div class="d-flex justify-content-start">
                                                                <span class="text">Birthday Parties</span>
                                                            </div>
                                                            <div class="d-flex justify-content-end">
                                                                    <svg class="feather feather-plus-square" fill="none"
                                                                        height="24" stroke="currentColor"
                                                                        stroke-linecap="round" stroke-linejoin="round"
                                                                        stroke-width="2" viewBox="0 0 24 24" width="24"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <rect height="18" rx="2" ry="2" width="18" x="3"
                                                                            y="3"></rect>
                                                                        <line x1="12" x2="12" y1="8" y2="16"></line>
                                                                        <line x1="8" x2="16" y1="12" y2="12"></line>
                                                                    </svg>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-pop col-md-12 py-3 mt-3">
                                        <div v-on:click="clearData()" class="a1" data-bs-toggle="modal"
                                            data-bs-target="#graduation_party">
                                            <a v-on:click="clearData()">
                                                <div class="row">
                                                    <div class="col-12 col-lg-1 col-md-1 col-sm-1 px-0">
                                                        <img class="img-fluid card_waiting_img w-100"
                                                            src="/img/pr15.jpg" alt="" />
                                                    </div>
                                                    <div class="col-12 col-lg-11 col-md-11 col-sm-11">
                                                        <div class="d-flex justify-content-between align-items-center name-card">
                                                            <div class="d-flex justify-content-start">
                                                                <span class="text">Graduation Parties</span>
                                                            </div>
                                                            <div class="d-flex justify-content-end">
                                                                    <svg class="feather feather-plus-square" fill="none"
                                                                        height="24" stroke="currentColor"
                                                                        stroke-linecap="round" stroke-linejoin="round"
                                                                        stroke-width="2" viewBox="0 0 24 24" width="24"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <rect height="18" rx="2" ry="2" width="18" x="3"
                                                                            y="3"></rect>
                                                                        <line x1="12" x2="12" y1="8" y2="16"></line>
                                                                        <line x1="8" x2="16" y1="12" y2="12"></line>
                                                                    </svg>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-pop col-md-12 py-3 mt-3">
                                        <div v-on:click="clearData()" class="a1" data-bs-toggle="modal"
                                            data-bs-target="#special_occasions">
                                            <a v-on:click="clearData()">
                                                <div class="row">
                                                    <div class="col-12 col-lg-1 col-md-1 col-sm-1 px-0">
                                                        <img class="img-fluid card_waiting_img w-100"
                                                            src="/img/pr15.jpg" alt="" />
                                                    </div>
                                                    <div class="col-12 col-lg-11 col-md-11 col-sm-11">
                                                        <div class="d-flex justify-content-between align-items-center name-card">
                                                            <div class="d-flex justify-content-start">
                                                                <span class="text">Special Occasions</span>
                                                            </div>
                                                            <div class="d-flex justify-content-end">
                                                                    <svg class="feather feather-plus-square" fill="none"
                                                                        height="24" stroke="currentColor"
                                                                        stroke-linecap="round" stroke-linejoin="round"
                                                                        stroke-width="2" viewBox="0 0 24 24" width="24"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <rect height="18" rx="2" ry="2" width="18" x="3"
                                                                            y="3"></rect>
                                                                        <line x1="12" x2="12" y1="8" y2="16"></line>
                                                                        <line x1="8" x2="16" y1="12" y2="12"></line>
                                                                    </svg>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-pop col-md-12 py-3 mt-3">
                                        <div class="a1">
                                            <a v-on:click="goToBookStore()">
                                                <div class="row">
                                                    <div class="col-12 col-lg-1 col-md-1 col-sm-1 px-0">
                                                        <img class="img-fluid card_waiting_img w-100"
                                                            src="/img/pr15.jpg" alt="" />
                                                    </div>
                                                    <div class="col-12 col-lg-11 col-md-11 col-sm-11">
                                                        <div
                                                            class="d-flex justify-content-between align-items-center name-card">
                                                            <div class="d-flex justify-content-start">
                                                                <span class="text">Equipment Reservation</span>
                                                            </div>
                                                            <div class="d-flex justify-content-end">
                                                                    <svg class="feather feather-plus-square" fill="none"
                                                                        height="24" stroke="currentColor"
                                                                        stroke-linecap="round" stroke-linejoin="round"
                                                                        stroke-width="2" viewBox="0 0 24 24" width="24"
                                                                        xmlns="http://www.w3.org/2000/svg">
                                                                        <rect height="18" rx="2" ry="2" width="18" x="3"
                                                                            y="3"></rect>
                                                                        <line x1="12" x2="12" y1="8" y2="16"></line>
                                                                        <line x1="8" x2="16" y1="12" y2="12"></line>
                                                                    </svg>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!--       end card link        -->
                                </div>
                                <div class="col-lg-5 col-md-12 col-sm-12">
                                    <div class="row side-images">
                                        <div class=" col-12 col-md-6 col-lg-6 mt-lg-5">
                                            <div class="d-flex flex-column mt-lg-5 right-side-images">
                                                <!-- <img class="img-fluid my-2" src="/img/wedding.jpg" alt=""> -->
                                                <div class="image my-2"><img class="img-fluid" src="/img/wedding.jpg"
                                                        alt=""></div>
                                                <div class="image my-2"><img class="img-fluid" src="/img/pr11.jpg"
                                                        alt=""></div>
                                                <div class="image my-2"><img class="img-fluid" src="/img/pr3.jpg"
                                                        alt=""></div>

                                            </div>
                                        </div>
                                        <div class=" col-12 col-md-6 col-lg-6">
                                            <div class="d-flex flex-column  left-side-images ">
                                                <div class="image my-2"><img class="img-fluid w-100" src="/img/pr1.jpg"
                                                        alt="" style="object-fit: contain;"></div>
                                                <div class="image my-2"><img class="img-fluid w-100" src="/img/pr14.jpg"
                                                        alt="" style="object-fit: contain;"></div>
                                                <div class="image my-2"><img class="img-fluid w-100" src="/img/pr13.jpg"
                                                        alt="" style="object-fit: contain;"></div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <!--   end row card  -->
                <!--     start blue section   -->
                <section class="mt-5" data-aos="fade-up" data-aos-delay="150" data-aos-duration="700">
                    <div class="row p-4 blue-section-index flex-column-reverse flex-md-row book-product">
                        <div class="col-12 col-md-7 col-lg-7">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex justify-content-start flex-column">
                                    <h2 class="text-hero mt-4 mt-lg-3 mb-lg-2">Be a partner</h2>
                                    <span class="sub-index-title mb-3 mb-lg-0 my-lg-4">
                                        We are looking to extend Yalla Party to other states. Be our partner! </span>
                                    <div class="my-4">
                                        <a href="http://dash.yallaparty.net/partnersignup" type="button"
                                            class="home-btn p-2"> Create Account
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-4">
                            <div class="d-flex justify-content-center justify-content-lg-end mt-lg-3">
                                <img src="/img/bePanter.png" width="190" class="img-fluid" alt=" " />
                            </div>
                        </div>
                    </div>
                </section>
                <!--   end blue section     -->

            </div>
        </section>

    </div>

    <!--start footer section -->
    <pageFooter> </pageFooter>
    <!--end footer section-->

    <!-- Modal -->
    <div class="modal fade" id="wedding_party" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Wedding Party</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" method="">
                        <label class=" label-form"> Name </label>
                        <div class="input-group mb-3">
                            <input v-model="data.name" type="text" class="form-control" placeholder="Username"
                                aria-label="Username" aria-describedby="basic-addon1" required>
                        </div>
                        <label class=" label-form"> Nickname </label>
                        <div class="input-group mb-3">
                            <input v-model="data.nickName" type="text" class="form-control" placeholder="Nickname"
                                aria-label="Username" aria-describedby="basic-addon1" required>
                        </div>
                        <label class=" label-form"> Mobile </label>
                        <div class="input-group mb-3">
                            <input v-model="data.mobile" id="phone" type="tel" ref="phoneInput1" class="form-control"
                                maxlength="10" placeholder="(201) 555-0123" aria-label=""
                                aria-describedby="basic-addon1" required>

                        </div>
                        <label class=" label-form"> Email </label>
                        <div class="input-group mb-3">
                            <input v-model="data.email" type="text" class="form-control" placeholder="Email"
                                aria-label="Username" aria-describedby="basic-addon1" required>
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
                        <label class=" label-form"> Party date </label>
                        <div class="input-group mb-3">
                            <input class="form-control" type="date" v-model="data.orderDate" required />
                        </div>
                        <!-- <label class=" label-form"> Event Date </label>
                        <div class="input-group mb-3">
                            <input name="date" type="date" class="form-control mt-2 py-3 text-start text gray-inp "
                                required="">
                        </div> -->
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

                        <label class="label-form">Select the type of service provided</label>
                        <div class="mb-3">
                            <div class="form-check" v-for="service in this.getOrderServicesData" :key="service.id">
                                <input class="form-check-input" type="radio" name="rad" :id="'service-' + service.id"
                                    :value="service.id" v-model="data.service" @change="handleServiceChange">
                                <label class="form-check-label" :for="'service-' + service.id"> {{ service.name }}
                                </label>
                            </div>
                        </div>
                        <!-- Textarea for "Other services" -->
                        <div v-if="this.showOtherServiceText">
                            <label class="label-form">Please specify other services:</label>
                            <textarea class="form-control" v-model="data.otherService" rows="3"></textarea>
                        </div>

                        <div v-for="(question, index) in this.weddingQuestion" :key="question.id">
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
                    <button type="button" v-on:click="weddingOrderCreate()" class="btn btn-primary">Send order</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="engagement_parties" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Engagement Party</h5>
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
                            <input v-model="data.mobile" id="phone" type="tel" ref="phoneInput2" class="form-control"
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
                        <label class=" label-form"> Party date </label>
                        <div class="input-group mb-3">
                            <input class="form-control" type="date" v-model="data.orderDate" required />
                        </div>

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

                        <label class="label-form">Select the type of service provided</label>
                        <div class="mb-3">
                            <div class="form-check" v-for="service in this.getOrderServicesData" :key="service.id">
                                <input class="form-check-input" type="radio" name="rad" :id="'service-' + service.id"
                                    :value="service.id" v-model="data.service" @change="handleServiceChange">
                                <label class="form-check-label" :for="'service-' + service.id"> {{ service.name }}
                                </label>
                            </div>
                        </div>
                        <!-- Textarea for "Other services" -->
                        <div v-if="this.showOtherServiceText">
                            <label class="label-form">Please specify other services:</label>
                            <textarea class="form-control" v-model="data.otherService" rows="3"></textarea>
                        </div>

                        <div v-for="(question, index) in this.engagementQuestion" :key="question.id">
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
                    <button type="button" v-on:click="engagementOrderCreate()" class="btn btn-primary">Send
                        order</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="birthday_parties" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Birthday Party </h5>
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
                            <input v-model="data.mobile" id="phone" type="tel" ref="phoneInput3" class="form-control"
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
                        <label class=" label-form"> Party date </label>
                        <div class="input-group mb-3">
                            <input class="form-control" type="date" v-model="data.orderDate" required />
                        </div>

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

                        <label class="label-form">Select the type of service provided</label>
                        <div class="mb-3">
                            <div class="form-check" v-for="service in this.getOrderServicesData" :key="service.id">
                                <input class="form-check-input" type="radio" name="rad" :id="'service-' + service.id"
                                    :value="service.id" v-model="data.service" @change="handleServiceChange">
                                <label class="form-check-label" :for="'service-' + service.id"> {{ service.name }}
                                </label>
                            </div>
                        </div>
                        <!-- Textarea for "Other services" -->
                        <div v-if="this.showOtherServiceText">
                            <label class="label-form">Please specify other services:</label>
                            <textarea class="form-control" v-model="data.otherService" rows="3"></textarea>
                        </div>

                        <label class="label-form">Are you booking the party for yourself or someone else?</label>
                        <div class="mb-3">
                            <div class="form-check" key="1">
                                <input class="form-check-input" type="radio" name="bookfor" id="1" value="1"
                                    v-model="birthdayBookingFor">
                                <label class="form-check-label" for="1"> My self </label>
                            </div>
                            <div class="form-check" key="1">
                                <input class="form-check-input" type="radio" name="bookfor" id="2" value="2"
                                    v-model="birthdayBookingFor">
                                <label class="form-check-label" for="2"> Someone else </label>
                            </div>
                        </div>

                        <div v-if="this.birthdayBookingFor == 2">
                            <label class="label-form">Birthday owner's name</label>
                            <input v-model="data.birthdayOwnerName" type="text" class="form-control"
                                placeholder="Birthday owner's name" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label v-if="this.birthdayBookingFor == 2" class="label-form">What is his age group?</label>
                        <div class="mb-3" v-if="this.birthdayBookingFor == 2">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="ageGroup" id="11" value="11"
                                    v-model="birthdayAgeGroup">
                                <label class="form-check-label" for="11"> Child </label>
                            </div>
                            <div class="form-check" v-on:click="deleteChildrenService()">
                                <input class="form-check-input" type="radio" name="ageGroup" id="22" value="22"
                                    v-model="birthdayAgeGroup">
                                <label class="form-check-label" for="22"> Adult </label>
                            </div>
                        </div>

                        <label v-if="this.birthdayAgeGroup == 11" class="label-form">Services provided to
                            children</label>
                        <div v-if="this.birthdayAgeGroup == 11" class="mb-3">
                            <div class="form-check" v-for="service in this.getChildrenServicesData" :key="service.id">
                                <input name="childrenService" class="form-check-input" type="checkbox"
                                    :id="'checkbox-' + service.id" :value="service.id" v-model="childrenServices" />
                                <label :for="'checkbox-' + service.id">{{ service.name }}</label>
                            </div>
                        </div>

                        <div v-for="(question, index) in this.birthdayQuestion" :key="question.id">
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
                    <button type="button" v-on:click="birthdayOrderCreate()" class="btn btn-primary">Send order</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="graduation_party" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Graduation Party </h5>
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
                            <input v-model="data.mobile" id="phone" type="tel" ref="phoneInput4" class="form-control"
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
                        <label class=" label-form"> Party date </label>
                        <div class="input-group mb-3">
                            <input class="form-control" type="date" v-model="data.orderDate" required />
                        </div>

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

                        <label class="label-form">Select the type of service provided</label>
                        <div class="mb-3">
                            <div class="form-check" v-for="service in this.getOrderServicesData" :key="service.id">
                                <input class="form-check-input" type="radio" name="rad" :id="'service-' + service.id"
                                    :value="service.id" v-model="data.service" @change="handleServiceChange">
                                <label class="form-check-label" :for="'service-' + service.id"> {{ service.name }}
                                </label>
                            </div>
                        </div>
                        <!-- Textarea for "Other services" -->
                        <div v-if="this.showOtherServiceText">
                            <label class="label-form">Please specify other services:</label>
                            <textarea class="form-control" v-model="data.otherService" rows="3"></textarea>
                        </div>

                        <div v-for="(question, index) in this.graduationQuestion" :key="question.id">
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
                    <button type="button" v-on:click="graduationOrderCreate()" class="btn btn-primary">Send
                        order</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="special_occasions" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Special Occasions</h5>
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
                            <input v-model="data.mobile" id="phone" type="tel" ref="phoneInput5" class="form-control"
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
                        <label class=" label-form"> Party date </label>
                        <div class="input-group mb-3">
                            <input class="form-control" type="date" v-model="data.orderDate" required />
                        </div>

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

                        <label class="label-form">Select the type of service provided</label>
                        <div class="mb-3">
                            <div class="form-check" v-for="service in this.getOrderServicesData" :key="service.id">
                                <input class="form-check-input" type="radio" name="rad" :id="'service-' + service.id"
                                    :value="service.id" v-model="data.service" @change="handleServiceChange">
                                <label class="form-check-label" :for="'service-' + service.id"> {{ service.name }}
                                </label>
                            </div>
                        </div>
                        <!-- Textarea for "Other services" -->
                        <div v-if="this.showOtherServiceText">
                            <label class="label-form">Please specify other services:</label>
                            <textarea class="form-control" v-model="data.otherService" rows="3"></textarea>
                        </div>

                        <div v-for="(question, index) in this.specialQuestion" :key="question.id">
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
                    <button type="button" v-on:click="specialOrderCreate()" class="btn btn-primary">Send order</button>
                </div>
            </div>
        </div>
    </div>



</template>

<style scoped></style>