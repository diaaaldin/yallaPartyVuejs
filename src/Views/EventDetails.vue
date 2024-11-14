<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import axios from "axios";

import pageNav from '@/components/navbar.vue';
import pageFooter from '@/components/footer.vue';

export default {
    data() {
        return {
            buyTicketData: {
                paymentMethod: 0,
                ticketData:{
                    sessionId: "",
                    ticketId: 0,
                    price : 0,
                    name: "",
                    mobile: "",
                    email: "",
                    discountCode : ""
                },
                productData: {
                    title: "",
                    description: "",
                    imageUrl: "",
                    price: 0,
                },
            },
            selectedTicket : {},

            TicketSelectName: "",

            isDiscountSuccess : false,
            discountMessage : "",
            discountCode : "",
           
            cities: []
        };
    },
    mounted() {
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
    components: {
        pageNav,
        pageFooter
    },

    emits: {},

    async created() {
        // Fetch cities based on initial stateId if available
        console.log("this.getEventData :", this.getEventData);
        await this.initFunc();
        
        if (this.getEventData.stateId) {
            await this.fetchSearchCities(this.getEventData.stateId);
        }
    },
    watch: {
        // Watch for changes in the event prop's stateId
        "getEventData.stateId": {
            immediate: true,
            handler(newStateId) {
                if (newStateId) {
                    this.fetchSearchCities(newStateId);
                }
            }
        }
    },

    computed: {
        ...mapGetters("Events", ["getEventsData", "getEventData"]),
    },

    methods: {
        ...mapActions("Events", ["BuyTicketOperation", "GetEvent",]),

        clearData() {
            this.buyTicketData.paymentMethod = 0;
            
            this.buyTicketData.ticketData.sessionId = "";
            this.buyTicketData.ticketData.ticketId = 0;
            this.buyTicketData.ticketData.name = "";
            this.buyTicketData.ticketData.mobile = "";
            this.buyTicketData.ticketData.email = "";
            this.buyTicketData.ticketData.discountCode = "";

            this.buyTicketData.productData.id = "";
            this.buyTicketData.productData.title = "";
            this.buyTicketData.productData.description = "";
            this.buyTicketData.productData.imageUrl = "";
            this.buyTicketData.productData.price = "";

            this.selectedTicket = {};
            this.TicketSelectName = "";
            this.isDiscountSuccess = false;
            this.discountMessage = "";

        },
        formatDate(dateTime) {
            if (!dateTime) return '';
            return new Date(dateTime).toISOString().split('T')[0];
        },
        formatTime(dateTime) {
            if (!dateTime) return '';
            const date = new Date(dateTime);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        },
        
        initFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });
            this.GetEvent(this.getEventData.id).then(Response => {
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
        },

        getEvnetFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });
            this.GetEvent(this.getEventData.id).then(Response => {
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
        },


        // Fetch cities for the given stateId
        async fetchSearchCities(stateId) {
            console.log("Fetching cities for stateId:", stateId);
            try {
                const response = await axios.get(
                    `https://api.census.gov/data/2020/dec/pl?get=NAME&for=place:*&in=state:${stateId}`, {
                    withCredentials: false
                });
                console.log("Cities data fetched:", response.data);  // Log the raw data to check structure
                this.cities = response.data;
            } catch (error) {
                console.error("Error fetching cities:", error);
            }

        },

        // Get city name by city ID (index 2 in the data array)
        getCityName(cityId) {
            console.log("City ID in getCityName:", cityId);  // Log the ID to debug
            console.log("Cites:", this.cities);  // Log the ID to debug
            const selectedCity = this.cities.find(x => x[2] === cityId);  // Assuming cityId is at index 2
            return selectedCity ? selectedCity[0] : "City not found";  // Return city name or a default message
        },

        selectTicketToBuy(id) {
            this.clearData();

            const selectedTicket = this.getEventData.ticketsInfo.find(x => x.id === id);
            if (selectedTicket) {
                this.selectedTicket = selectedTicket;
                this.TicketSelectName = selectedTicket.ticketTypeName;

                this.buyTicketData.ticketData.ticketId = selectedTicket.id;
                this.buyTicketData.ticketData.price = selectedTicket.price;

                this.buyTicketData.productData.title = "Buy " + selectedTicket.ticketTypeName + " Ticket.";
                this.buyTicketData.productData.description = this.getEventData.title;
                this.buyTicketData.productData.imageUrl = this.getEventData.imagePath;
                this.buyTicketData.productData.price = selectedTicket.price;
            }
        },

        checkDiscountCodeFunc(){
            const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "",
             });
             setTimeout(() => {

                if (this.discountCode === this.getEventData.discountCode) {
                    
                    let discountRate = this.selectedTicket.price * (this.getEventData.discountRate / 100);
                    let priceAfterDiscount = this.selectedTicket.price - discountRate;
              
                    this.buyTicketData.ticketData.price = priceAfterDiscount;
                    this.buyTicketData.productData.price = priceAfterDiscount;
        
                    this.isDiscountSuccess = true;  // Note: use `=` for assignment
                    this.discountMessage = "Discount success"; // Note: use `=` for assignment
                    this.buyTicketData.ticketData.discountCode = this.discountCode;
        
                    this.$moshaToast('Discount success', {
                        hideProgressBar: false,
                        showIcon: true,
                        swipeClose: true,
                        type: 'success',
                        timeout: 3000,
                    });
                } else {

                    this.isDiscountSuccess = false;  // Note: use `=` for assignment
                    this.discountMessage = "Discount fail"; // Note: use `=` for assignment
        
                    this.$moshaToast("Discount fail, try again with another code", {
                        hideProgressBar: false,
                        position: 'top-center',
                        showIcon: true,
                        swipeClose: true,
                        type: 'warning',
                        timeout: 3000,
                    });
                }
                loading.close(); // Close loading after the check
            }, 2000); // Delay of 1 second (2000 milliseconds)

        },

        selectItemForDelete(id) {
            console.log("id :", id);
            const selectedOrder = this.getOrdersData.orders.data.find(x => x.id === id);
            console.log("selectedOrder :", selectedOrder);

            if (selectedOrder) {
                this.data.id = selectedOrder.id;
                this.dataStatus.id = selectedOrder.id;
            }

        },

        buyTicket() {
            const countryData = this.iti.getSelectedCountryData();
            const countryCode = countryData.dialCode;
            const fullPhoneNumber = `+${countryCode}${this.buyTicketData.ticketData.mobile}`;
            
            this.buyTicketData.ticketData.mobile = fullPhoneNumber;

            if (this.checkValidation()) {
                const loading = ElLoading.service({
                    lock: true,
                    background: 'rgba(0, 0, 0, 0.7)',
                    text: "",
                });
                this.BuyTicketOperation(this.buyTicketData).then(Response => {
                    if(this.buyTicketData.paymentMethod == 1){
                        this.$moshaToast('Buy ticket success', {
                        hideProgressBar: 'false',
                        showIcon: 'true',
                        swipeClose: 'true',
                        type: 'success',
                        timeout: 3000,
                       });
                       this.getEvnetFunc();
                    }
                    $('#tickets_vip').modal('hide');
                    
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
            
            if (this.buyTicketData.ticketData.ticketId == 0) {
                this.$moshaToast("there are error with select ticket contact with site manager", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.email.focus();
                return false;
            } 
            else if (this.buyTicketData.ticketData.name.trim() == '') {
                this.$moshaToast("enter name", {
                    hideProgressBar: 'false',
                    position: 'top-center',
                    showIcon: 'true',
                    swipeClose: 'true',
                    type: 'warning',
                    timeout: 3000,
                });
                this.$refs.nickName.focus();
                return false;
            } else if (this.buyTicketData.ticketData.mobile.trim() == '') {
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
            } else if (this.buyTicketData.ticketData.email.trim() == '') {
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
            }
            else if (this.buyTicketData.paymentMethod == 0) {
                this.$moshaToast("select payment method", {
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

       
    }
};
</script>

<template>
    <pageNav></pageNav>

    <div class="header-title text-center">
        <div class="breadcrumb-outer">
            <div class="container">
                <div class="breadcrumb-content text-center">
                    <h1 class="mb-0 white">Details Eevent</h1>
                    <h2 class="theme mb-0 pt-3 name-event">{{ getEventData.title }}</h2>
                </div>
            </div>
        </div>
    </div>
    <section class="event-details mt-5">
        <div class="container">
            <div class="row">

                <div class="col-md-7">
                    <div class="row">

                        <div class="gray-inp  px-4 py-3">
                            <p class="text mb-3 mt-2 description-text-title">
                                <img src="/img/heart_icon.png" alt="" width="30" class="" />
                                Event Description
                            </p>
                            <p v-html="getEventData.description" class="description-text-gray"> </p>

                            <!-- <ul class="ps-0">
                                <li class="li_blue"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                                    cumque odio, sapiente fugiat </li>
                                <li class="li_blue"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                                    cumque odio, sapiente fugiat </li>
                                <li class="li_blue"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                                    cumque odio, sapiente fugiat </li>
                                <li class="li_blue"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                                    cumque odio, sapiente fugiat </li>
                            </ul>
                            -->
                            <!-- <div class="d-flex mb-2">
                                <p class="text mb-1 mt-2 description-text-title">
                                    <svg class="svg-inline--fa fa-building fa-w-14 fa-fw" aria-hidden="true"
                                        focusable="false" data-prefix="far" data-icon="building" role="img"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                        <path fill="currentColor"
                                            d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z">
                                        </path>
                                    </svg>
                                    Event Services
                                </p>
                            </div>
                            <div class="col-12">
                                <div class="d-flex justify-content-between ms-1">
                                    <div class="d-flex align-items-center gap-2 description-text-gray">

                                        <div class="blue_circle_hotel d-flex align-items-center justify-content-center">
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.42847 11.25H8.57132V15H6.42847V11.25Z" fill="white" />
                                                <path
                                                    d="M14.4643 13.9286H13.3929V3.21429C13.3929 2.89286 13.1786 2.67857 12.8571 2.67857H12.3214V0.535714C12.3214 0.214286 12.1071 0 11.7857 0H3.21429C2.89286 0 2.67857 0.214286 2.67857 0.535714V2.67857H2.14286C1.82143 2.67857 1.60714 2.89286 1.60714 3.21429V13.9286H0.535714C0.214286 13.9286 0 14.1429 0 14.4643C0 14.7857 0.214286 15 0.535714 15H5.35714V10.7143C5.35714 10.3929 5.57143 10.1786 5.89286 10.1786H9.10714C9.42857 10.1786 9.64286 10.3929 9.64286 10.7143V15H14.4643C14.7857 15 15 14.7857 15 14.4643C15 14.1429 14.7857 13.9286 14.4643 13.9286ZM10.7143 4.28571C11.0357 4.28571 11.25 4.5 11.25 4.82143V5.89286C11.25 6.21429 11.0357 6.42857 10.7143 6.42857C10.3929 6.42857 10.1786 6.21429 10.1786 5.89286V4.82143C10.1786 4.5 10.3929 4.28571 10.7143 4.28571ZM4.28571 12.3214C4.28571 12.6429 4.07143 12.8571 3.75 12.8571C3.42857 12.8571 3.21429 12.6429 3.21429 12.3214V11.25C3.21429 10.9286 3.42857 10.7143 3.75 10.7143C4.07143 10.7143 4.28571 10.9286 4.28571 11.25V12.3214ZM4.82143 9.10714C4.82143 9.42857 4.60714 9.64286 4.28571 9.64286C3.96429 9.64286 3.75 9.42857 3.75 9.10714V8.03571C3.75 7.71429 3.96429 7.5 4.28571 7.5C4.60714 7.5 4.82143 7.71429 4.82143 8.03571V9.10714ZM4.82143 5.89286C4.82143 6.21429 4.60714 6.42857 4.28571 6.42857C3.96429 6.42857 3.75 6.21429 3.75 5.89286V4.82143C3.75 4.5 3.96429 4.28571 4.28571 4.28571C4.60714 4.28571 4.82143 4.5 4.82143 4.82143V5.89286ZM5.35714 3.75C5.03571 3.75 4.82143 3.53571 4.82143 3.21429V2.14286C4.82143 1.82143 5.03571 1.60714 5.35714 1.60714C5.67857 1.60714 5.89286 1.82143 5.89286 2.14286V3.21429C5.89286 3.53571 5.67857 3.75 5.35714 3.75ZM6.96429 9.10714C6.96429 9.42857 6.75 9.64286 6.42857 9.64286C6.10714 9.64286 5.89286 9.42857 5.89286 9.10714V8.03571C5.89286 7.71429 6.10714 7.5 6.42857 7.5C6.75 7.5 6.96429 7.71429 6.96429 8.03571V9.10714ZM6.96429 5.89286C6.96429 6.21429 6.75 6.42857 6.42857 6.42857C6.10714 6.42857 5.89286 6.21429 5.89286 5.89286V4.82143C5.89286 4.5 6.10714 4.28571 6.42857 4.28571C6.75 4.28571 6.96429 4.5 6.96429 4.82143V5.89286ZM7.5 3.75C7.17857 3.75 6.96429 3.53571 6.96429 3.21429V2.14286C6.96429 1.82143 7.17857 1.60714 7.5 1.60714C7.82143 1.60714 8.03571 1.82143 8.03571 2.14286V3.21429C8.03571 3.53571 7.82143 3.75 7.5 3.75ZM9.10714 9.10714C9.10714 9.42857 8.89286 9.64286 8.57143 9.64286C8.25 9.64286 8.03571 9.42857 8.03571 9.10714V8.03571C8.03571 7.71429 8.25 7.5 8.57143 7.5C8.89286 7.5 9.10714 7.71429 9.10714 8.03571V9.10714ZM9.10714 5.89286C9.10714 6.21429 8.89286 6.42857 8.57143 6.42857C8.25 6.42857 8.03571 6.21429 8.03571 5.89286V4.82143C8.03571 4.5 8.25 4.28571 8.57143 4.28571C8.89286 4.28571 9.10714 4.5 9.10714 4.82143V5.89286ZM9.64286 3.75C9.32143 3.75 9.10714 3.53571 9.10714 3.21429V2.14286C9.10714 1.82143 9.32143 1.60714 9.64286 1.60714C9.96429 1.60714 10.1786 1.82143 10.1786 2.14286V3.21429C10.1786 3.53571 9.96429 3.75 9.64286 3.75ZM10.1786 9.10714V8.03571C10.1786 7.71429 10.3929 7.5 10.7143 7.5C11.0357 7.5 11.25 7.71429 11.25 8.03571V9.10714C11.25 9.42857 11.0357 9.64286 10.7143 9.64286C10.3929 9.64286 10.1786 9.42857 10.1786 9.10714ZM11.7857 12.3214C11.7857 12.6429 11.5714 12.8571 11.25 12.8571C10.9286 12.8571 10.7143 12.6429 10.7143 12.3214V11.25C10.7143 10.9286 10.9286 10.7143 11.25 10.7143C11.5714 10.7143 11.7857 10.9286 11.7857 11.25V12.3214Z"
                                                    fill="white" />
                                            </svg>
                                        </div>
                                        <span style="font-size: 14px">DJ</span>
                                    </div>
                                    <div class="d-flex align-items-center gap-2 description-text-gray">

                                        <div class="blue_circle_hotel d-flex align-items-center justify-content-center">
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.42847 11.25H8.57132V15H6.42847V11.25Z" fill="white" />
                                                <path
                                                    d="M14.4643 13.9286H13.3929V3.21429C13.3929 2.89286 13.1786 2.67857 12.8571 2.67857H12.3214V0.535714C12.3214 0.214286 12.1071 0 11.7857 0H3.21429C2.89286 0 2.67857 0.214286 2.67857 0.535714V2.67857H2.14286C1.82143 2.67857 1.60714 2.89286 1.60714 3.21429V13.9286H0.535714C0.214286 13.9286 0 14.1429 0 14.4643C0 14.7857 0.214286 15 0.535714 15H5.35714V10.7143C5.35714 10.3929 5.57143 10.1786 5.89286 10.1786H9.10714C9.42857 10.1786 9.64286 10.3929 9.64286 10.7143V15H14.4643C14.7857 15 15 14.7857 15 14.4643C15 14.1429 14.7857 13.9286 14.4643 13.9286ZM10.7143 4.28571C11.0357 4.28571 11.25 4.5 11.25 4.82143V5.89286C11.25 6.21429 11.0357 6.42857 10.7143 6.42857C10.3929 6.42857 10.1786 6.21429 10.1786 5.89286V4.82143C10.1786 4.5 10.3929 4.28571 10.7143 4.28571ZM4.28571 12.3214C4.28571 12.6429 4.07143 12.8571 3.75 12.8571C3.42857 12.8571 3.21429 12.6429 3.21429 12.3214V11.25C3.21429 10.9286 3.42857 10.7143 3.75 10.7143C4.07143 10.7143 4.28571 10.9286 4.28571 11.25V12.3214ZM4.82143 9.10714C4.82143 9.42857 4.60714 9.64286 4.28571 9.64286C3.96429 9.64286 3.75 9.42857 3.75 9.10714V8.03571C3.75 7.71429 3.96429 7.5 4.28571 7.5C4.60714 7.5 4.82143 7.71429 4.82143 8.03571V9.10714ZM4.82143 5.89286C4.82143 6.21429 4.60714 6.42857 4.28571 6.42857C3.96429 6.42857 3.75 6.21429 3.75 5.89286V4.82143C3.75 4.5 3.96429 4.28571 4.28571 4.28571C4.60714 4.28571 4.82143 4.5 4.82143 4.82143V5.89286ZM5.35714 3.75C5.03571 3.75 4.82143 3.53571 4.82143 3.21429V2.14286C4.82143 1.82143 5.03571 1.60714 5.35714 1.60714C5.67857 1.60714 5.89286 1.82143 5.89286 2.14286V3.21429C5.89286 3.53571 5.67857 3.75 5.35714 3.75ZM6.96429 9.10714C6.96429 9.42857 6.75 9.64286 6.42857 9.64286C6.10714 9.64286 5.89286 9.42857 5.89286 9.10714V8.03571C5.89286 7.71429 6.10714 7.5 6.42857 7.5C6.75 7.5 6.96429 7.71429 6.96429 8.03571V9.10714ZM6.96429 5.89286C6.96429 6.21429 6.75 6.42857 6.42857 6.42857C6.10714 6.42857 5.89286 6.21429 5.89286 5.89286V4.82143C5.89286 4.5 6.10714 4.28571 6.42857 4.28571C6.75 4.28571 6.96429 4.5 6.96429 4.82143V5.89286ZM7.5 3.75C7.17857 3.75 6.96429 3.53571 6.96429 3.21429V2.14286C6.96429 1.82143 7.17857 1.60714 7.5 1.60714C7.82143 1.60714 8.03571 1.82143 8.03571 2.14286V3.21429C8.03571 3.53571 7.82143 3.75 7.5 3.75ZM9.10714 9.10714C9.10714 9.42857 8.89286 9.64286 8.57143 9.64286C8.25 9.64286 8.03571 9.42857 8.03571 9.10714V8.03571C8.03571 7.71429 8.25 7.5 8.57143 7.5C8.89286 7.5 9.10714 7.71429 9.10714 8.03571V9.10714ZM9.10714 5.89286C9.10714 6.21429 8.89286 6.42857 8.57143 6.42857C8.25 6.42857 8.03571 6.21429 8.03571 5.89286V4.82143C8.03571 4.5 8.25 4.28571 8.57143 4.28571C8.89286 4.28571 9.10714 4.5 9.10714 4.82143V5.89286ZM9.64286 3.75C9.32143 3.75 9.10714 3.53571 9.10714 3.21429V2.14286C9.10714 1.82143 9.32143 1.60714 9.64286 1.60714C9.96429 1.60714 10.1786 1.82143 10.1786 2.14286V3.21429C10.1786 3.53571 9.96429 3.75 9.64286 3.75ZM10.1786 9.10714V8.03571C10.1786 7.71429 10.3929 7.5 10.7143 7.5C11.0357 7.5 11.25 7.71429 11.25 8.03571V9.10714C11.25 9.42857 11.0357 9.64286 10.7143 9.64286C10.3929 9.64286 10.1786 9.42857 10.1786 9.10714ZM11.7857 12.3214C11.7857 12.6429 11.5714 12.8571 11.25 12.8571C10.9286 12.8571 10.7143 12.6429 10.7143 12.3214V11.25C10.7143 10.9286 10.9286 10.7143 11.25 10.7143C11.5714 10.7143 11.7857 10.9286 11.7857 11.25V12.3214Z"
                                                    fill="white" />
                                            </svg>
                                        </div>
                                        <span style="font-size: 14px">Laser lighting</span>
                                    </div>
                                    <div class="d-flex align-items-center gap-2 description-text-gray">

                                        <div class="blue_circle_hotel d-flex align-items-center justify-content-center">
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.42847 11.25H8.57132V15H6.42847V11.25Z" fill="white" />
                                                <path
                                                    d="M14.4643 13.9286H13.3929V3.21429C13.3929 2.89286 13.1786 2.67857 12.8571 2.67857H12.3214V0.535714C12.3214 0.214286 12.1071 0 11.7857 0H3.21429C2.89286 0 2.67857 0.214286 2.67857 0.535714V2.67857H2.14286C1.82143 2.67857 1.60714 2.89286 1.60714 3.21429V13.9286H0.535714C0.214286 13.9286 0 14.1429 0 14.4643C0 14.7857 0.214286 15 0.535714 15H5.35714V10.7143C5.35714 10.3929 5.57143 10.1786 5.89286 10.1786H9.10714C9.42857 10.1786 9.64286 10.3929 9.64286 10.7143V15H14.4643C14.7857 15 15 14.7857 15 14.4643C15 14.1429 14.7857 13.9286 14.4643 13.9286ZM10.7143 4.28571C11.0357 4.28571 11.25 4.5 11.25 4.82143V5.89286C11.25 6.21429 11.0357 6.42857 10.7143 6.42857C10.3929 6.42857 10.1786 6.21429 10.1786 5.89286V4.82143C10.1786 4.5 10.3929 4.28571 10.7143 4.28571ZM4.28571 12.3214C4.28571 12.6429 4.07143 12.8571 3.75 12.8571C3.42857 12.8571 3.21429 12.6429 3.21429 12.3214V11.25C3.21429 10.9286 3.42857 10.7143 3.75 10.7143C4.07143 10.7143 4.28571 10.9286 4.28571 11.25V12.3214ZM4.82143 9.10714C4.82143 9.42857 4.60714 9.64286 4.28571 9.64286C3.96429 9.64286 3.75 9.42857 3.75 9.10714V8.03571C3.75 7.71429 3.96429 7.5 4.28571 7.5C4.60714 7.5 4.82143 7.71429 4.82143 8.03571V9.10714ZM4.82143 5.89286C4.82143 6.21429 4.60714 6.42857 4.28571 6.42857C3.96429 6.42857 3.75 6.21429 3.75 5.89286V4.82143C3.75 4.5 3.96429 4.28571 4.28571 4.28571C4.60714 4.28571 4.82143 4.5 4.82143 4.82143V5.89286ZM5.35714 3.75C5.03571 3.75 4.82143 3.53571 4.82143 3.21429V2.14286C4.82143 1.82143 5.03571 1.60714 5.35714 1.60714C5.67857 1.60714 5.89286 1.82143 5.89286 2.14286V3.21429C5.89286 3.53571 5.67857 3.75 5.35714 3.75ZM6.96429 9.10714C6.96429 9.42857 6.75 9.64286 6.42857 9.64286C6.10714 9.64286 5.89286 9.42857 5.89286 9.10714V8.03571C5.89286 7.71429 6.10714 7.5 6.42857 7.5C6.75 7.5 6.96429 7.71429 6.96429 8.03571V9.10714ZM6.96429 5.89286C6.96429 6.21429 6.75 6.42857 6.42857 6.42857C6.10714 6.42857 5.89286 6.21429 5.89286 5.89286V4.82143C5.89286 4.5 6.10714 4.28571 6.42857 4.28571C6.75 4.28571 6.96429 4.5 6.96429 4.82143V5.89286ZM7.5 3.75C7.17857 3.75 6.96429 3.53571 6.96429 3.21429V2.14286C6.96429 1.82143 7.17857 1.60714 7.5 1.60714C7.82143 1.60714 8.03571 1.82143 8.03571 2.14286V3.21429C8.03571 3.53571 7.82143 3.75 7.5 3.75ZM9.10714 9.10714C9.10714 9.42857 8.89286 9.64286 8.57143 9.64286C8.25 9.64286 8.03571 9.42857 8.03571 9.10714V8.03571C8.03571 7.71429 8.25 7.5 8.57143 7.5C8.89286 7.5 9.10714 7.71429 9.10714 8.03571V9.10714ZM9.10714 5.89286C9.10714 6.21429 8.89286 6.42857 8.57143 6.42857C8.25 6.42857 8.03571 6.21429 8.03571 5.89286V4.82143C8.03571 4.5 8.25 4.28571 8.57143 4.28571C8.89286 4.28571 9.10714 4.5 9.10714 4.82143V5.89286ZM9.64286 3.75C9.32143 3.75 9.10714 3.53571 9.10714 3.21429V2.14286C9.10714 1.82143 9.32143 1.60714 9.64286 1.60714C9.96429 1.60714 10.1786 1.82143 10.1786 2.14286V3.21429C10.1786 3.53571 9.96429 3.75 9.64286 3.75ZM10.1786 9.10714V8.03571C10.1786 7.71429 10.3929 7.5 10.7143 7.5C11.0357 7.5 11.25 7.71429 11.25 8.03571V9.10714C11.25 9.42857 11.0357 9.64286 10.7143 9.64286C10.3929 9.64286 10.1786 9.42857 10.1786 9.10714ZM11.7857 12.3214C11.7857 12.6429 11.5714 12.8571 11.25 12.8571C10.9286 12.8571 10.7143 12.6429 10.7143 12.3214V11.25C10.7143 10.9286 10.9286 10.7143 11.25 10.7143C11.5714 10.7143 11.7857 10.9286 11.7857 11.25V12.3214Z"
                                                    fill="white" />
                                            </svg>
                                        </div>
                                        <span style="font-size: 14px">Stage</span>
                                    </div>
                                    <div class="d-flex align-items-center gap-2 description-text-gray">

                                        <div class="blue_circle_hotel d-flex align-items-center justify-content-center">
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.42847 11.25H8.57132V15H6.42847V11.25Z" fill="white" />
                                                <path
                                                    d="M14.4643 13.9286H13.3929V3.21429C13.3929 2.89286 13.1786 2.67857 12.8571 2.67857H12.3214V0.535714C12.3214 0.214286 12.1071 0 11.7857 0H3.21429C2.89286 0 2.67857 0.214286 2.67857 0.535714V2.67857H2.14286C1.82143 2.67857 1.60714 2.89286 1.60714 3.21429V13.9286H0.535714C0.214286 13.9286 0 14.1429 0 14.4643C0 14.7857 0.214286 15 0.535714 15H5.35714V10.7143C5.35714 10.3929 5.57143 10.1786 5.89286 10.1786H9.10714C9.42857 10.1786 9.64286 10.3929 9.64286 10.7143V15H14.4643C14.7857 15 15 14.7857 15 14.4643C15 14.1429 14.7857 13.9286 14.4643 13.9286ZM10.7143 4.28571C11.0357 4.28571 11.25 4.5 11.25 4.82143V5.89286C11.25 6.21429 11.0357 6.42857 10.7143 6.42857C10.3929 6.42857 10.1786 6.21429 10.1786 5.89286V4.82143C10.1786 4.5 10.3929 4.28571 10.7143 4.28571ZM4.28571 12.3214C4.28571 12.6429 4.07143 12.8571 3.75 12.8571C3.42857 12.8571 3.21429 12.6429 3.21429 12.3214V11.25C3.21429 10.9286 3.42857 10.7143 3.75 10.7143C4.07143 10.7143 4.28571 10.9286 4.28571 11.25V12.3214ZM4.82143 9.10714C4.82143 9.42857 4.60714 9.64286 4.28571 9.64286C3.96429 9.64286 3.75 9.42857 3.75 9.10714V8.03571C3.75 7.71429 3.96429 7.5 4.28571 7.5C4.60714 7.5 4.82143 7.71429 4.82143 8.03571V9.10714ZM4.82143 5.89286C4.82143 6.21429 4.60714 6.42857 4.28571 6.42857C3.96429 6.42857 3.75 6.21429 3.75 5.89286V4.82143C3.75 4.5 3.96429 4.28571 4.28571 4.28571C4.60714 4.28571 4.82143 4.5 4.82143 4.82143V5.89286ZM5.35714 3.75C5.03571 3.75 4.82143 3.53571 4.82143 3.21429V2.14286C4.82143 1.82143 5.03571 1.60714 5.35714 1.60714C5.67857 1.60714 5.89286 1.82143 5.89286 2.14286V3.21429C5.89286 3.53571 5.67857 3.75 5.35714 3.75ZM6.96429 9.10714C6.96429 9.42857 6.75 9.64286 6.42857 9.64286C6.10714 9.64286 5.89286 9.42857 5.89286 9.10714V8.03571C5.89286 7.71429 6.10714 7.5 6.42857 7.5C6.75 7.5 6.96429 7.71429 6.96429 8.03571V9.10714ZM6.96429 5.89286C6.96429 6.21429 6.75 6.42857 6.42857 6.42857C6.10714 6.42857 5.89286 6.21429 5.89286 5.89286V4.82143C5.89286 4.5 6.10714 4.28571 6.42857 4.28571C6.75 4.28571 6.96429 4.5 6.96429 4.82143V5.89286ZM7.5 3.75C7.17857 3.75 6.96429 3.53571 6.96429 3.21429V2.14286C6.96429 1.82143 7.17857 1.60714 7.5 1.60714C7.82143 1.60714 8.03571 1.82143 8.03571 2.14286V3.21429C8.03571 3.53571 7.82143 3.75 7.5 3.75ZM9.10714 9.10714C9.10714 9.42857 8.89286 9.64286 8.57143 9.64286C8.25 9.64286 8.03571 9.42857 8.03571 9.10714V8.03571C8.03571 7.71429 8.25 7.5 8.57143 7.5C8.89286 7.5 9.10714 7.71429 9.10714 8.03571V9.10714ZM9.10714 5.89286C9.10714 6.21429 8.89286 6.42857 8.57143 6.42857C8.25 6.42857 8.03571 6.21429 8.03571 5.89286V4.82143C8.03571 4.5 8.25 4.28571 8.57143 4.28571C8.89286 4.28571 9.10714 4.5 9.10714 4.82143V5.89286ZM9.64286 3.75C9.32143 3.75 9.10714 3.53571 9.10714 3.21429V2.14286C9.10714 1.82143 9.32143 1.60714 9.64286 1.60714C9.96429 1.60714 10.1786 1.82143 10.1786 2.14286V3.21429C10.1786 3.53571 9.96429 3.75 9.64286 3.75ZM10.1786 9.10714V8.03571C10.1786 7.71429 10.3929 7.5 10.7143 7.5C11.0357 7.5 11.25 7.71429 11.25 8.03571V9.10714C11.25 9.42857 11.0357 9.64286 10.7143 9.64286C10.3929 9.64286 10.1786 9.42857 10.1786 9.10714ZM11.7857 12.3214C11.7857 12.6429 11.5714 12.8571 11.25 12.8571C10.9286 12.8571 10.7143 12.6429 10.7143 12.3214V11.25C10.7143 10.9286 10.9286 10.7143 11.25 10.7143C11.5714 10.7143 11.7857 10.9286 11.7857 11.25V12.3214Z"
                                                    fill="white" />
                                            </svg>
                                        </div>
                                        <span style="font-size: 14px">External speakers</span>
                                    </div>

                                </div>
                            </div> -->

                        </div>

                        <div class="gray-inp mt-3 tickets px-4 py-3">
                            <div class="d-flex mb-2 ">
                                <p class="text mb-1 mt-2 description-text-title">
                                    <svg class="svg-inline--fa fa-server fa-w-16 fa-fw" aria-hidden="true"
                                        focusable="false" data-prefix="fas" data-icon="server" role="img"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                        <path fill="currentColor"
                                            d="M480 160H32c-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm112 248H32c-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32h448c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32zm-48-88c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm-64 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z">
                                        </path>
                                    </svg>
                                    Tickets
                                </p>
                            </div>
                            <table class="table text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Type</th>
                                        <th scope="col">Availability</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">book</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in getEventData.ticketsInfo" :key="index">
                                        <td>{{ item.ticketTypeName }}</td>
                                        <td>
                                            <span v-if="item.ticketAllNum > item.ticketBookNum" class="availabe">
                                                Availabe </span>
                                            <span v-else-if="item.ticketAllNum <= item.ticketBookNum"
                                                class="not-availabe">Not Availabe</span>
                                        </td>
                                        <td>{{ item.price }} $</td>
                                        <td>
                                            <a v-if="item.ticketAllNum > item.ticketBookNum"
                                                v-on:click="selectTicketToBuy(item.id)" class="book-now"
                                                data-bs-toggle="modal" data-bs-target="#tickets_vip">
                                                Book Now </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
                <div class="col-md-5">
                    <div class="title-event">
                        <div class="img-title">
                            <img :src="getEventData.imagePath" class="img-fluid" alt="">
                        </div>
                        <div class="details-event-card row  align-items-center mx-0">
                            <div class="col-lg-12 ">
                                <div class="d-flex align-items-center mt-3 mt-lg-0 a1">
                                    <img src="/img/icons/event-svgrepo-com.svg" alt="" width="24" class="me-2" />
                                    <span class="text">{{ getEventData.title }}</span>
                                </div>

                            </div>
                            <div class="col-md-12">
                                <div class="d-flex  align-items-center mt-3 mt-lg-0 a1">
                                    <svg class="svg-inline--fa fa-bullhorn fa-w-18 fa-1x me-2" width="20"
                                        aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bullhorn"
                                        role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
                                        data-fa-i2svg="">
                                        <path fill="currentColor"
                                            d="M576 240c0-23.63-12.95-44.04-32-55.12V32.01C544 23.26 537.02 0 512 0c-7.12 0-14.19 2.38-19.98 7.02l-85.03 68.03C364.28 109.19 310.66 128 256 128H64c-35.35 0-64 28.65-64 64v96c0 35.35 28.65 64 64 64h33.7c-1.39 10.48-2.18 21.14-2.18 32 0 39.77 9.26 77.35 25.56 110.94 5.19 10.69 16.52 17.06 28.4 17.06h74.28c26.05 0 41.69-29.84 25.9-50.56-16.4-21.52-26.15-48.36-26.15-77.44 0-11.11 1.62-21.79 4.41-32H256c54.66 0 108.28 18.81 150.98 52.95l85.03 68.03a32.023 32.023 0 0 0 19.98 7.02c24.92 0 32-22.78 32-32V295.13C563.05 284.04 576 263.63 576 240zm-96 141.42l-33.05-26.44C392.95 311.78 325.12 288 256 288v-96c69.12 0 136.95-23.78 190.95-66.98L480 98.58v282.84z">
                                        </path>
                                    </svg>
                                    <span class="text"> {{ getEventData.companyName }} </span>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="d-flex  align-items-center mt-3 mt-lg-0 a1">
                                    <svg class="svg-inline--fa fa-calendar-alt fa-w-14 fa-fw me-2"
                                        style="margin-left: -3px;" width="24" height="24" aria-hidden="true"
                                        focusable="false" data-prefix="far" data-icon="calendar-alt" role="img"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                        <path fill="currentColor"
                                            d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z">
                                        </path>
                                    </svg>

                                    <span class="text"> {{ formatDate(getEventData.date) }} </span>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="d-flex  align-items-center mt-3 mt-lg-0 a1">
                                    <img src="/img/icons/city-svgrepo-com.svg" alt="" width="24" class="me-2" />

                                    <span class="text"> {{ formatTime(getEventData.date) }} </span>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="d-flex  align-items-center mt-3 mt-lg-0 a1">
                                    <svg class="svg-inline--fa fa-map-marked-alt fa-w-18 fa-1x me-2" aria-hidden="true"
                                        width="24" height="24" focusable="false" data-prefix="fas"
                                        data-icon="map-marked-alt" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512" data-fa-i2svg="">
                                        <path fill="currentColor"
                                            d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z">
                                        </path>
                                    </svg>
                                    <span class="text"> {{ getCityName(getEventData.cityId) }} </span>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="d-flex  align-items-center mt-3 mt-lg-0 a1">
                                    <img src="/img/icons/city-svgrepo-com.svg" alt="" width="24" class="me-2" />
                                    <span class="text" style="white-space: pre-line;"> {{ getEventData.address }}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <pageFooter></pageFooter>


    <!-- Modal -->
    <div class="modal fade" id="tickets_vip" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Tickets {{ TicketSelectName }} : {{ buyTicketData.ticketData.price }}$</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" method="">

                        <label class=" label-form"> Name </label>
                        <div class="input-group mb-3">
                            <input v-model="buyTicketData.ticketData.name" type="text" class="form-control" placeholder="Username"
                                aria-label="Username" aria-describedby="basic-addon1">
                        </div>

                        <label class=" label-form"> Mobile </label>
                        <div class="input-group mb-3">

                            <input v-model="buyTicketData.ticketData.mobile" id="phone" type="tel" ref="phoneInput"
                                class="form-control" maxlength="10" placeholder="(201) 555-0123" aria-label=""
                                aria-describedby="basic-addon1" required>
                        </div>

                        <label class=" label-form"> Email </label>
                        <div class="input-group mb-3">
                            <input v-model="buyTicketData.ticketData.email" type="email" class="form-control" placeholder="Email"
                                aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                          <!-- Discount Code Section -->
                        <label class="label-form">Discount Code</label>
                        <div class="input-group mb-3">
                            <input :disabled="isDiscountSuccess" v-model="discountCode" type="text" class="form-control" placeholder="Enter discount code">
                            <button :disabled="isDiscountSuccess" type="button" class="btn btn-outline-primary" v-on:click="checkDiscountCodeFunc()">Apply</button>
                        </div>
     
                        <!-- Discount Message -->
                        <div v-if="discountMessage" class="mt-2 text-success">
                            {{ discountMessage }}
                        </div>

                        <label class=" label-form"> Payment Method </label>
                        <div class="input-group mb-3">
                            <div class="mb-3">
                                <div class="form-check" key="1">
                                    <input class="form-check-input" type="radio" name="bookfor" id="1" value="1"
                                        v-model="buyTicketData.paymentMethod">
                                    <label class="form-check-label" for="1"> My Points </label>
                                </div>
                                <div class="form-check" key="1">
                                    <input class="form-check-input" type="radio" name="bookfor" id="2" value="2"
                                        v-model="buyTicketData.paymentMethod">
                                    <label class="form-check-label" for="2"> Cash </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" v-on:click="buyTicket()" class="btn btn-primary">Buy now</button>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal -->
</template>
<style scoped></style>