<script>
import { RouterView } from 'vue-router';
import { mapState, mapGetters, mapActions } from "vuex";
import pageFooter from '../components/footer.vue';

export default {
    data() {
        return {

        }
    },
    components: {
        RouterView,
        pageFooter,
    },
    mounted() {

    },
    created() {
    },

    computed: {
        ...mapGetters("Users", ["getUserLoginName"]),

        GetUserName() {
            const name = this.getUserLoginName;// just for loud this function again when name change
            let userName = localStorage.getItem("userName");
            if (userName == null) {
                return "";
            } else {
                return userName;
            }
        },
        goToProfileFunc(){
            this.$router.push({ name: 'profileProfile' });
        },
        logOutFunc(){
            this.$router.push({ name: 'main' });
        }
    },

    methods: {

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
                                <router-link to="/bookStore" class="nav-link ">BOOKSTORE</router-link>
                            </li>
                        </ul>

                        <ul
                            class="nav align-items-center mb-2 mb-lg-0 white-header justify-content-center gradiant_nav">
                            <li class="nav-item login">
                                <router-link to="/login" type="button" class="px-3 py-2 align-items-center d-flex login-btn ">LOGIN</router-link>
                            </li>
                            <li class="nav-item sign-up">
                                <router-link to="/signUp" type="button" class="px-3 py-2 align-items-center d-flex login-btn ">SIGN UP</router-link>
                            </li>
                            <li class="nav-item dropdown ms-2">
                                <a href="log_in.html"
                                    class="dropdown-toggle px-3 py-2 align-items-center d-flex login-btn"
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
                                    Ahmad Mahmood
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
                                        <a class="dropdown-item"  v-on:click="logOutFunc()">
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
                    <p>Big Event 2024</p>
                    <h2 class="panner-title">book with Yalla Party</h2>
                    <p class="sub-index-title">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic est
                        illo architecto repellat maxime minima iusto! Aut deleniti tempora,
                        iste nobis a voluptate saepe dicta voluptatem odit, adipisci
                        laboriosam similique?
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
                                        <div class="a1" data-bs-toggle="modal" data-bs-target="#wedding_party">
                                            <a>
                                                <div class="row">
                                                    <div class="col-lg-1 col-md-1 col-sm-1 px-0">
                                                        <img class="img-fluid card_waiting_img w-100"
                                                            src="/img/pr15.jpg" alt="" />
                                                    </div>
                                                    <div class="col-lg-11 col-md-11 col-sm-11">
                                                        <div
                                                            class="d-flex justify-content-between align-items-center mt-2 mt-lg-0">
                                                            <div class="d-flex justify-content-start">
                                                                <span class="text">Wedding Party</span>
                                                            </div>
                                                        </div>

                                                        <div
                                                            class="d-flex justify-content-between align-items-center mt-2">
                                                            <div
                                                                class="d-flex justify-content-start align-items-center">
                                                                <svg width="14" height="14" viewBox="0 0 14 14"
                                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g clip-path="url(#clip0_2_7145)">
                                                                        <path
                                                                            d="M6.125 10.0625H7.875V13.125H6.125V10.0625Z"
                                                                            fill="#7C90A6"></path>
                                                                        <path
                                                                            d="M12.6875 12.25H11.8125V3.5C11.8125 3.2375 11.6375 3.0625 11.375 3.0625H10.9375V1.3125C10.9375 1.05 10.7625 0.875 10.5 0.875H3.5C3.2375 0.875 3.0625 1.05 3.0625 1.3125V3.0625H2.625C2.3625 3.0625 2.1875 3.2375 2.1875 3.5V12.25H1.3125C1.05 12.25 0.875 12.425 0.875 12.6875C0.875 12.95 1.05 13.125 1.3125 13.125H5.25V9.625C5.25 9.3625 5.425 9.1875 5.6875 9.1875H8.3125C8.575 9.1875 8.75 9.3625 8.75 9.625V13.125H12.6875C12.95 13.125 13.125 12.95 13.125 12.6875C13.125 12.425 12.95 12.25 12.6875 12.25ZM9.625 4.375C9.8875 4.375 10.0625 4.55 10.0625 4.8125V5.6875C10.0625 5.95 9.8875 6.125 9.625 6.125C9.3625 6.125 9.1875 5.95 9.1875 5.6875V4.8125C9.1875 4.55 9.3625 4.375 9.625 4.375ZM4.375 10.9375C4.375 11.2 4.2 11.375 3.9375 11.375C3.675 11.375 3.5 11.2 3.5 10.9375V10.0625C3.5 9.8 3.675 9.625 3.9375 9.625C4.2 9.625 4.375 9.8 4.375 10.0625V10.9375ZM4.8125 8.3125C4.8125 8.575 4.6375 8.75 4.375 8.75C4.1125 8.75 3.9375 8.575 3.9375 8.3125V7.4375C3.9375 7.175 4.1125 7 4.375 7C4.6375 7 4.8125 7.175 4.8125 7.4375V8.3125ZM4.8125 5.6875C4.8125 5.95 4.6375 6.125 4.375 6.125C4.1125 6.125 3.9375 5.95 3.9375 5.6875V4.8125C3.9375 4.55 4.1125 4.375 4.375 4.375C4.6375 4.375 4.8125 4.55 4.8125 4.8125V5.6875ZM5.25 3.9375C4.9875 3.9375 4.8125 3.7625 4.8125 3.5V2.625C4.8125 2.3625 4.9875 2.1875 5.25 2.1875C5.5125 2.1875 5.6875 2.3625 5.6875 2.625V3.5C5.6875 3.7625 5.5125 3.9375 5.25 3.9375ZM6.5625 8.3125C6.5625 8.575 6.3875 8.75 6.125 8.75C5.8625 8.75 5.6875 8.575 5.6875 8.3125V7.4375C5.6875 7.175 5.8625 7 6.125 7C6.3875 7 6.5625 7.175 6.5625 7.4375V8.3125ZM6.5625 5.6875C6.5625 5.95 6.3875 6.125 6.125 6.125C5.8625 6.125 5.6875 5.95 5.6875 5.6875V4.8125C5.6875 4.55 5.8625 4.375 6.125 4.375C6.3875 4.375 6.5625 4.55 6.5625 4.8125V5.6875ZM7 3.9375C6.7375 3.9375 6.5625 3.7625 6.5625 3.5V2.625C6.5625 2.3625 6.7375 2.1875 7 2.1875C7.2625 2.1875 7.4375 2.3625 7.4375 2.625V3.5C7.4375 3.7625 7.2625 3.9375 7 3.9375ZM8.3125 8.3125C8.3125 8.575 8.1375 8.75 7.875 8.75C7.6125 8.75 7.4375 8.575 7.4375 8.3125V7.4375C7.4375 7.175 7.6125 7 7.875 7C8.1375 7 8.3125 7.175 8.3125 7.4375V8.3125ZM8.3125 5.6875C8.3125 5.95 8.1375 6.125 7.875 6.125C7.6125 6.125 7.4375 5.95 7.4375 5.6875V4.8125C7.4375 4.55 7.6125 4.375 7.875 4.375C8.1375 4.375 8.3125 4.55 8.3125 4.8125V5.6875ZM8.75 3.9375C8.4875 3.9375 8.3125 3.7625 8.3125 3.5V2.625C8.3125 2.3625 8.4875 2.1875 8.75 2.1875C9.0125 2.1875 9.1875 2.3625 9.1875 2.625V3.5C9.1875 3.7625 9.0125 3.9375 8.75 3.9375ZM9.1875 8.3125V7.4375C9.1875 7.175 9.3625 7 9.625 7C9.8875 7 10.0625 7.175 10.0625 7.4375V8.3125C10.0625 8.575 9.8875 8.75 9.625 8.75C9.3625 8.75 9.1875 8.575 9.1875 8.3125ZM10.5 10.9375C10.5 11.2 10.325 11.375 10.0625 11.375C9.8 11.375 9.625 11.2 9.625 10.9375V10.0625C9.625 9.8 9.8 9.625 10.0625 9.625C10.325 9.625 10.5 9.8 10.5 10.0625V10.9375Z"
                                                                            fill="#7C90A6"></path>
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_2_7145">
                                                                            <rect width="14" height="14" fill="white">
                                                                            </rect>
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>

                                                                <span class="gray_text ms-1"> Lorem ipsum dolor sit amet
                                                                    consectetur adipisicing elit.</span>
                                                            </div>
                                                            <div
                                                                class="d-flex justify-content-end align-items-center gap-2">
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
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-pop col-md-12 py-3 mt-3">
                                        <div class="a1" data-bs-toggle="modal" data-bs-target="#engagement_parties">
                                            <a>
                                                <div class="row">
                                                    <div class="col-12 col-lg-1 col-md-1 col-sm-1 px-0">
                                                        <img class="img-fluid card_waiting_img w-100"
                                                            src="/img/pr15.jpg" alt="" />
                                                    </div>
                                                    <div class="col-12 col-lg-11 col-md-11 col-sm-11">
                                                        <div
                                                            class="d-flex justify-content-between align-items-center mt-2 mt-lg-0">
                                                            <div class="d-flex justify-content-start">
                                                                <span class="text">Engagement Parties</span>
                                                            </div>
                                                        </div>

                                                        <div
                                                            class="d-flex justify-content-between align-items-center mt-2">
                                                            <div
                                                                class="d-flex justify-content-start align-items-center">
                                                                <svg width="14" height="14" viewBox="0 0 14 14"
                                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g clip-path="url(#clip0_2_7145)">
                                                                        <path
                                                                            d="M6.125 10.0625H7.875V13.125H6.125V10.0625Z"
                                                                            fill="#7C90A6"></path>
                                                                        <path
                                                                            d="M12.6875 12.25H11.8125V3.5C11.8125 3.2375 11.6375 3.0625 11.375 3.0625H10.9375V1.3125C10.9375 1.05 10.7625 0.875 10.5 0.875H3.5C3.2375 0.875 3.0625 1.05 3.0625 1.3125V3.0625H2.625C2.3625 3.0625 2.1875 3.2375 2.1875 3.5V12.25H1.3125C1.05 12.25 0.875 12.425 0.875 12.6875C0.875 12.95 1.05 13.125 1.3125 13.125H5.25V9.625C5.25 9.3625 5.425 9.1875 5.6875 9.1875H8.3125C8.575 9.1875 8.75 9.3625 8.75 9.625V13.125H12.6875C12.95 13.125 13.125 12.95 13.125 12.6875C13.125 12.425 12.95 12.25 12.6875 12.25ZM9.625 4.375C9.8875 4.375 10.0625 4.55 10.0625 4.8125V5.6875C10.0625 5.95 9.8875 6.125 9.625 6.125C9.3625 6.125 9.1875 5.95 9.1875 5.6875V4.8125C9.1875 4.55 9.3625 4.375 9.625 4.375ZM4.375 10.9375C4.375 11.2 4.2 11.375 3.9375 11.375C3.675 11.375 3.5 11.2 3.5 10.9375V10.0625C3.5 9.8 3.675 9.625 3.9375 9.625C4.2 9.625 4.375 9.8 4.375 10.0625V10.9375ZM4.8125 8.3125C4.8125 8.575 4.6375 8.75 4.375 8.75C4.1125 8.75 3.9375 8.575 3.9375 8.3125V7.4375C3.9375 7.175 4.1125 7 4.375 7C4.6375 7 4.8125 7.175 4.8125 7.4375V8.3125ZM4.8125 5.6875C4.8125 5.95 4.6375 6.125 4.375 6.125C4.1125 6.125 3.9375 5.95 3.9375 5.6875V4.8125C3.9375 4.55 4.1125 4.375 4.375 4.375C4.6375 4.375 4.8125 4.55 4.8125 4.8125V5.6875ZM5.25 3.9375C4.9875 3.9375 4.8125 3.7625 4.8125 3.5V2.625C4.8125 2.3625 4.9875 2.1875 5.25 2.1875C5.5125 2.1875 5.6875 2.3625 5.6875 2.625V3.5C5.6875 3.7625 5.5125 3.9375 5.25 3.9375ZM6.5625 8.3125C6.5625 8.575 6.3875 8.75 6.125 8.75C5.8625 8.75 5.6875 8.575 5.6875 8.3125V7.4375C5.6875 7.175 5.8625 7 6.125 7C6.3875 7 6.5625 7.175 6.5625 7.4375V8.3125ZM6.5625 5.6875C6.5625 5.95 6.3875 6.125 6.125 6.125C5.8625 6.125 5.6875 5.95 5.6875 5.6875V4.8125C5.6875 4.55 5.8625 4.375 6.125 4.375C6.3875 4.375 6.5625 4.55 6.5625 4.8125V5.6875ZM7 3.9375C6.7375 3.9375 6.5625 3.7625 6.5625 3.5V2.625C6.5625 2.3625 6.7375 2.1875 7 2.1875C7.2625 2.1875 7.4375 2.3625 7.4375 2.625V3.5C7.4375 3.7625 7.2625 3.9375 7 3.9375ZM8.3125 8.3125C8.3125 8.575 8.1375 8.75 7.875 8.75C7.6125 8.75 7.4375 8.575 7.4375 8.3125V7.4375C7.4375 7.175 7.6125 7 7.875 7C8.1375 7 8.3125 7.175 8.3125 7.4375V8.3125ZM8.3125 5.6875C8.3125 5.95 8.1375 6.125 7.875 6.125C7.6125 6.125 7.4375 5.95 7.4375 5.6875V4.8125C7.4375 4.55 7.6125 4.375 7.875 4.375C8.1375 4.375 8.3125 4.55 8.3125 4.8125V5.6875ZM8.75 3.9375C8.4875 3.9375 8.3125 3.7625 8.3125 3.5V2.625C8.3125 2.3625 8.4875 2.1875 8.75 2.1875C9.0125 2.1875 9.1875 2.3625 9.1875 2.625V3.5C9.1875 3.7625 9.0125 3.9375 8.75 3.9375ZM9.1875 8.3125V7.4375C9.1875 7.175 9.3625 7 9.625 7C9.8875 7 10.0625 7.175 10.0625 7.4375V8.3125C10.0625 8.575 9.8875 8.75 9.625 8.75C9.3625 8.75 9.1875 8.575 9.1875 8.3125ZM10.5 10.9375C10.5 11.2 10.325 11.375 10.0625 11.375C9.8 11.375 9.625 11.2 9.625 10.9375V10.0625C9.625 9.8 9.8 9.625 10.0625 9.625C10.325 9.625 10.5 9.8 10.5 10.0625V10.9375Z"
                                                                            fill="#7C90A6"></path>
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_2_7145">
                                                                            <rect width="14" height="14" fill="white">
                                                                            </rect>
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>

                                                                <span class="gray_text ms-1"> Lorem ipsum dolor sit amet
                                                                    consectetur adipisicing elit.</span>
                                                            </div>
                                                            <div
                                                                class="d-flex justify-content-end align-items-center gap-2">
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
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-pop col-md-12 py-3 mt-3">
                                        <div class="a1" data-bs-toggle="modal" data-bs-target="#birthday_parties">
                                            <a>
                                                <div class="row">
                                                    <div class="col-12 col-lg-1 col-md-1 col-sm-1 px-0">
                                                        <img class="img-fluid card_waiting_img w-100"
                                                            src="/img/pr15.jpg" alt="" />
                                                    </div>
                                                    <div class="col-12 col-lg-11 col-md-11 col-sm-11">
                                                        <div
                                                            class="d-flex justify-content-between align-items-center mt-2 mt-lg-0">
                                                            <div class="d-flex justify-content-start">
                                                                <span class="text">Birthday Parties</span>
                                                            </div>
                                                        </div>

                                                        <div
                                                            class="d-flex justify-content-between align-items-center mt-2">
                                                            <div
                                                                class="d-flex justify-content-start align-items-center">
                                                                <svg width="14" height="14" viewBox="0 0 14 14"
                                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g clip-path="url(#clip0_2_7145)">
                                                                        <path
                                                                            d="M6.125 10.0625H7.875V13.125H6.125V10.0625Z"
                                                                            fill="#7C90A6"></path>
                                                                        <path
                                                                            d="M12.6875 12.25H11.8125V3.5C11.8125 3.2375 11.6375 3.0625 11.375 3.0625H10.9375V1.3125C10.9375 1.05 10.7625 0.875 10.5 0.875H3.5C3.2375 0.875 3.0625 1.05 3.0625 1.3125V3.0625H2.625C2.3625 3.0625 2.1875 3.2375 2.1875 3.5V12.25H1.3125C1.05 12.25 0.875 12.425 0.875 12.6875C0.875 12.95 1.05 13.125 1.3125 13.125H5.25V9.625C5.25 9.3625 5.425 9.1875 5.6875 9.1875H8.3125C8.575 9.1875 8.75 9.3625 8.75 9.625V13.125H12.6875C12.95 13.125 13.125 12.95 13.125 12.6875C13.125 12.425 12.95 12.25 12.6875 12.25ZM9.625 4.375C9.8875 4.375 10.0625 4.55 10.0625 4.8125V5.6875C10.0625 5.95 9.8875 6.125 9.625 6.125C9.3625 6.125 9.1875 5.95 9.1875 5.6875V4.8125C9.1875 4.55 9.3625 4.375 9.625 4.375ZM4.375 10.9375C4.375 11.2 4.2 11.375 3.9375 11.375C3.675 11.375 3.5 11.2 3.5 10.9375V10.0625C3.5 9.8 3.675 9.625 3.9375 9.625C4.2 9.625 4.375 9.8 4.375 10.0625V10.9375ZM4.8125 8.3125C4.8125 8.575 4.6375 8.75 4.375 8.75C4.1125 8.75 3.9375 8.575 3.9375 8.3125V7.4375C3.9375 7.175 4.1125 7 4.375 7C4.6375 7 4.8125 7.175 4.8125 7.4375V8.3125ZM4.8125 5.6875C4.8125 5.95 4.6375 6.125 4.375 6.125C4.1125 6.125 3.9375 5.95 3.9375 5.6875V4.8125C3.9375 4.55 4.1125 4.375 4.375 4.375C4.6375 4.375 4.8125 4.55 4.8125 4.8125V5.6875ZM5.25 3.9375C4.9875 3.9375 4.8125 3.7625 4.8125 3.5V2.625C4.8125 2.3625 4.9875 2.1875 5.25 2.1875C5.5125 2.1875 5.6875 2.3625 5.6875 2.625V3.5C5.6875 3.7625 5.5125 3.9375 5.25 3.9375ZM6.5625 8.3125C6.5625 8.575 6.3875 8.75 6.125 8.75C5.8625 8.75 5.6875 8.575 5.6875 8.3125V7.4375C5.6875 7.175 5.8625 7 6.125 7C6.3875 7 6.5625 7.175 6.5625 7.4375V8.3125ZM6.5625 5.6875C6.5625 5.95 6.3875 6.125 6.125 6.125C5.8625 6.125 5.6875 5.95 5.6875 5.6875V4.8125C5.6875 4.55 5.8625 4.375 6.125 4.375C6.3875 4.375 6.5625 4.55 6.5625 4.8125V5.6875ZM7 3.9375C6.7375 3.9375 6.5625 3.7625 6.5625 3.5V2.625C6.5625 2.3625 6.7375 2.1875 7 2.1875C7.2625 2.1875 7.4375 2.3625 7.4375 2.625V3.5C7.4375 3.7625 7.2625 3.9375 7 3.9375ZM8.3125 8.3125C8.3125 8.575 8.1375 8.75 7.875 8.75C7.6125 8.75 7.4375 8.575 7.4375 8.3125V7.4375C7.4375 7.175 7.6125 7 7.875 7C8.1375 7 8.3125 7.175 8.3125 7.4375V8.3125ZM8.3125 5.6875C8.3125 5.95 8.1375 6.125 7.875 6.125C7.6125 6.125 7.4375 5.95 7.4375 5.6875V4.8125C7.4375 4.55 7.6125 4.375 7.875 4.375C8.1375 4.375 8.3125 4.55 8.3125 4.8125V5.6875ZM8.75 3.9375C8.4875 3.9375 8.3125 3.7625 8.3125 3.5V2.625C8.3125 2.3625 8.4875 2.1875 8.75 2.1875C9.0125 2.1875 9.1875 2.3625 9.1875 2.625V3.5C9.1875 3.7625 9.0125 3.9375 8.75 3.9375ZM9.1875 8.3125V7.4375C9.1875 7.175 9.3625 7 9.625 7C9.8875 7 10.0625 7.175 10.0625 7.4375V8.3125C10.0625 8.575 9.8875 8.75 9.625 8.75C9.3625 8.75 9.1875 8.575 9.1875 8.3125ZM10.5 10.9375C10.5 11.2 10.325 11.375 10.0625 11.375C9.8 11.375 9.625 11.2 9.625 10.9375V10.0625C9.625 9.8 9.8 9.625 10.0625 9.625C10.325 9.625 10.5 9.8 10.5 10.0625V10.9375Z"
                                                                            fill="#7C90A6"></path>
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_2_7145">
                                                                            <rect width="14" height="14" fill="white">
                                                                            </rect>
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>

                                                                <span class="gray_text ms-1"> Lorem ipsum dolor sit amet
                                                                    consectetur adipisicing elit.</span>
                                                            </div>
                                                            <div
                                                                class="d-flex justify-content-end align-items-center gap-2">
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
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-pop col-md-12 py-3 mt-3">
                                        <div class="a1" data-bs-toggle="modal" data-bs-target="#wedding_party">
                                            <a>
                                                <div class="row">
                                                    <div class="col-12 col-lg-1 col-md-1 col-sm-1 px-0">
                                                        <img class="img-fluid card_waiting_img w-100"
                                                            src="/img/pr15.jpg" alt="" />
                                                    </div>
                                                    <div class="col-12 col-lg-11 col-md-11 col-sm-11">
                                                        <div
                                                            class="d-flex justify-content-between align-items-center mt-2 mt-lg-0">
                                                            <div class="d-flex justify-content-start">
                                                                <span class="text">Graduation Parties</span>
                                                            </div>
                                                        </div>

                                                        <div
                                                            class="d-flex justify-content-between align-items-center mt-2">
                                                            <div
                                                                class="d-flex justify-content-start align-items-center">
                                                                <svg width="14" height="14" viewBox="0 0 14 14"
                                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g clip-path="url(#clip0_2_7145)">
                                                                        <path
                                                                            d="M6.125 10.0625H7.875V13.125H6.125V10.0625Z"
                                                                            fill="#7C90A6"></path>
                                                                        <path
                                                                            d="M12.6875 12.25H11.8125V3.5C11.8125 3.2375 11.6375 3.0625 11.375 3.0625H10.9375V1.3125C10.9375 1.05 10.7625 0.875 10.5 0.875H3.5C3.2375 0.875 3.0625 1.05 3.0625 1.3125V3.0625H2.625C2.3625 3.0625 2.1875 3.2375 2.1875 3.5V12.25H1.3125C1.05 12.25 0.875 12.425 0.875 12.6875C0.875 12.95 1.05 13.125 1.3125 13.125H5.25V9.625C5.25 9.3625 5.425 9.1875 5.6875 9.1875H8.3125C8.575 9.1875 8.75 9.3625 8.75 9.625V13.125H12.6875C12.95 13.125 13.125 12.95 13.125 12.6875C13.125 12.425 12.95 12.25 12.6875 12.25ZM9.625 4.375C9.8875 4.375 10.0625 4.55 10.0625 4.8125V5.6875C10.0625 5.95 9.8875 6.125 9.625 6.125C9.3625 6.125 9.1875 5.95 9.1875 5.6875V4.8125C9.1875 4.55 9.3625 4.375 9.625 4.375ZM4.375 10.9375C4.375 11.2 4.2 11.375 3.9375 11.375C3.675 11.375 3.5 11.2 3.5 10.9375V10.0625C3.5 9.8 3.675 9.625 3.9375 9.625C4.2 9.625 4.375 9.8 4.375 10.0625V10.9375ZM4.8125 8.3125C4.8125 8.575 4.6375 8.75 4.375 8.75C4.1125 8.75 3.9375 8.575 3.9375 8.3125V7.4375C3.9375 7.175 4.1125 7 4.375 7C4.6375 7 4.8125 7.175 4.8125 7.4375V8.3125ZM4.8125 5.6875C4.8125 5.95 4.6375 6.125 4.375 6.125C4.1125 6.125 3.9375 5.95 3.9375 5.6875V4.8125C3.9375 4.55 4.1125 4.375 4.375 4.375C4.6375 4.375 4.8125 4.55 4.8125 4.8125V5.6875ZM5.25 3.9375C4.9875 3.9375 4.8125 3.7625 4.8125 3.5V2.625C4.8125 2.3625 4.9875 2.1875 5.25 2.1875C5.5125 2.1875 5.6875 2.3625 5.6875 2.625V3.5C5.6875 3.7625 5.5125 3.9375 5.25 3.9375ZM6.5625 8.3125C6.5625 8.575 6.3875 8.75 6.125 8.75C5.8625 8.75 5.6875 8.575 5.6875 8.3125V7.4375C5.6875 7.175 5.8625 7 6.125 7C6.3875 7 6.5625 7.175 6.5625 7.4375V8.3125ZM6.5625 5.6875C6.5625 5.95 6.3875 6.125 6.125 6.125C5.8625 6.125 5.6875 5.95 5.6875 5.6875V4.8125C5.6875 4.55 5.8625 4.375 6.125 4.375C6.3875 4.375 6.5625 4.55 6.5625 4.8125V5.6875ZM7 3.9375C6.7375 3.9375 6.5625 3.7625 6.5625 3.5V2.625C6.5625 2.3625 6.7375 2.1875 7 2.1875C7.2625 2.1875 7.4375 2.3625 7.4375 2.625V3.5C7.4375 3.7625 7.2625 3.9375 7 3.9375ZM8.3125 8.3125C8.3125 8.575 8.1375 8.75 7.875 8.75C7.6125 8.75 7.4375 8.575 7.4375 8.3125V7.4375C7.4375 7.175 7.6125 7 7.875 7C8.1375 7 8.3125 7.175 8.3125 7.4375V8.3125ZM8.3125 5.6875C8.3125 5.95 8.1375 6.125 7.875 6.125C7.6125 6.125 7.4375 5.95 7.4375 5.6875V4.8125C7.4375 4.55 7.6125 4.375 7.875 4.375C8.1375 4.375 8.3125 4.55 8.3125 4.8125V5.6875ZM8.75 3.9375C8.4875 3.9375 8.3125 3.7625 8.3125 3.5V2.625C8.3125 2.3625 8.4875 2.1875 8.75 2.1875C9.0125 2.1875 9.1875 2.3625 9.1875 2.625V3.5C9.1875 3.7625 9.0125 3.9375 8.75 3.9375ZM9.1875 8.3125V7.4375C9.1875 7.175 9.3625 7 9.625 7C9.8875 7 10.0625 7.175 10.0625 7.4375V8.3125C10.0625 8.575 9.8875 8.75 9.625 8.75C9.3625 8.75 9.1875 8.575 9.1875 8.3125ZM10.5 10.9375C10.5 11.2 10.325 11.375 10.0625 11.375C9.8 11.375 9.625 11.2 9.625 10.9375V10.0625C9.625 9.8 9.8 9.625 10.0625 9.625C10.325 9.625 10.5 9.8 10.5 10.0625V10.9375Z"
                                                                            fill="#7C90A6"></path>
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_2_7145">
                                                                            <rect width="14" height="14" fill="white">
                                                                            </rect>
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>

                                                                <span class="gray_text ms-1"> Lorem ipsum dolor sit amet
                                                                    consectetur adipisicing elit.</span>
                                                            </div>
                                                            <div
                                                                class="d-flex justify-content-end align-items-center gap-2">
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
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-pop col-md-12 py-3 mt-3">
                                        <div class="a1" data-bs-toggle="modal" data-bs-target="#special_occasions">
                                            <a>
                                                <div class="row">
                                                    <div class="col-12 col-lg-1 col-md-1 col-sm-1 px-0">
                                                        <img class="img-fluid card_waiting_img w-100"
                                                            src="/img/pr15.jpg" alt="" />
                                                    </div>
                                                    <div class="col-12 col-lg-11 col-md-11 col-sm-11">
                                                        <div
                                                            class="d-flex justify-content-between align-items-center mt-2 mt-lg-0">
                                                            <div class="d-flex justify-content-start">
                                                                <span class="text">Special Occasions</span>
                                                            </div>
                                                        </div>

                                                        <div
                                                            class="d-flex justify-content-between align-items-center mt-2">
                                                            <div
                                                                class="d-flex justify-content-start align-items-center">
                                                                <svg width="14" height="14" viewBox="0 0 14 14"
                                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g clip-path="url(#clip0_2_7145)">
                                                                        <path
                                                                            d="M6.125 10.0625H7.875V13.125H6.125V10.0625Z"
                                                                            fill="#7C90A6"></path>
                                                                        <path
                                                                            d="M12.6875 12.25H11.8125V3.5C11.8125 3.2375 11.6375 3.0625 11.375 3.0625H10.9375V1.3125C10.9375 1.05 10.7625 0.875 10.5 0.875H3.5C3.2375 0.875 3.0625 1.05 3.0625 1.3125V3.0625H2.625C2.3625 3.0625 2.1875 3.2375 2.1875 3.5V12.25H1.3125C1.05 12.25 0.875 12.425 0.875 12.6875C0.875 12.95 1.05 13.125 1.3125 13.125H5.25V9.625C5.25 9.3625 5.425 9.1875 5.6875 9.1875H8.3125C8.575 9.1875 8.75 9.3625 8.75 9.625V13.125H12.6875C12.95 13.125 13.125 12.95 13.125 12.6875C13.125 12.425 12.95 12.25 12.6875 12.25ZM9.625 4.375C9.8875 4.375 10.0625 4.55 10.0625 4.8125V5.6875C10.0625 5.95 9.8875 6.125 9.625 6.125C9.3625 6.125 9.1875 5.95 9.1875 5.6875V4.8125C9.1875 4.55 9.3625 4.375 9.625 4.375ZM4.375 10.9375C4.375 11.2 4.2 11.375 3.9375 11.375C3.675 11.375 3.5 11.2 3.5 10.9375V10.0625C3.5 9.8 3.675 9.625 3.9375 9.625C4.2 9.625 4.375 9.8 4.375 10.0625V10.9375ZM4.8125 8.3125C4.8125 8.575 4.6375 8.75 4.375 8.75C4.1125 8.75 3.9375 8.575 3.9375 8.3125V7.4375C3.9375 7.175 4.1125 7 4.375 7C4.6375 7 4.8125 7.175 4.8125 7.4375V8.3125ZM4.8125 5.6875C4.8125 5.95 4.6375 6.125 4.375 6.125C4.1125 6.125 3.9375 5.95 3.9375 5.6875V4.8125C3.9375 4.55 4.1125 4.375 4.375 4.375C4.6375 4.375 4.8125 4.55 4.8125 4.8125V5.6875ZM5.25 3.9375C4.9875 3.9375 4.8125 3.7625 4.8125 3.5V2.625C4.8125 2.3625 4.9875 2.1875 5.25 2.1875C5.5125 2.1875 5.6875 2.3625 5.6875 2.625V3.5C5.6875 3.7625 5.5125 3.9375 5.25 3.9375ZM6.5625 8.3125C6.5625 8.575 6.3875 8.75 6.125 8.75C5.8625 8.75 5.6875 8.575 5.6875 8.3125V7.4375C5.6875 7.175 5.8625 7 6.125 7C6.3875 7 6.5625 7.175 6.5625 7.4375V8.3125ZM6.5625 5.6875C6.5625 5.95 6.3875 6.125 6.125 6.125C5.8625 6.125 5.6875 5.95 5.6875 5.6875V4.8125C5.6875 4.55 5.8625 4.375 6.125 4.375C6.3875 4.375 6.5625 4.55 6.5625 4.8125V5.6875ZM7 3.9375C6.7375 3.9375 6.5625 3.7625 6.5625 3.5V2.625C6.5625 2.3625 6.7375 2.1875 7 2.1875C7.2625 2.1875 7.4375 2.3625 7.4375 2.625V3.5C7.4375 3.7625 7.2625 3.9375 7 3.9375ZM8.3125 8.3125C8.3125 8.575 8.1375 8.75 7.875 8.75C7.6125 8.75 7.4375 8.575 7.4375 8.3125V7.4375C7.4375 7.175 7.6125 7 7.875 7C8.1375 7 8.3125 7.175 8.3125 7.4375V8.3125ZM8.3125 5.6875C8.3125 5.95 8.1375 6.125 7.875 6.125C7.6125 6.125 7.4375 5.95 7.4375 5.6875V4.8125C7.4375 4.55 7.6125 4.375 7.875 4.375C8.1375 4.375 8.3125 4.55 8.3125 4.8125V5.6875ZM8.75 3.9375C8.4875 3.9375 8.3125 3.7625 8.3125 3.5V2.625C8.3125 2.3625 8.4875 2.1875 8.75 2.1875C9.0125 2.1875 9.1875 2.3625 9.1875 2.625V3.5C9.1875 3.7625 9.0125 3.9375 8.75 3.9375ZM9.1875 8.3125V7.4375C9.1875 7.175 9.3625 7 9.625 7C9.8875 7 10.0625 7.175 10.0625 7.4375V8.3125C10.0625 8.575 9.8875 8.75 9.625 8.75C9.3625 8.75 9.1875 8.575 9.1875 8.3125ZM10.5 10.9375C10.5 11.2 10.325 11.375 10.0625 11.375C9.8 11.375 9.625 11.2 9.625 10.9375V10.0625C9.625 9.8 9.8 9.625 10.0625 9.625C10.325 9.625 10.5 9.8 10.5 10.0625V10.9375Z"
                                                                            fill="#7C90A6"></path>
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_2_7145">
                                                                            <rect width="14" height="14" fill="white">
                                                                            </rect>
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>

                                                                <span class="gray_text ms-1"> Lorem ipsum dolor sit amet
                                                                    consectetur adipisicing elit.</span>
                                                            </div>
                                                            <div
                                                                class="d-flex justify-content-end align-items-center gap-2">
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
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-pop col-md-12 py-3 mt-3">
                                        <div class="a1" data-bs-toggle="modal" data-bs-target="#equipmentreservation">
                                            <a>
                                                <div class="row">
                                                    <div class="col-12 col-lg-1 col-md-1 col-sm-1 px-0">
                                                        <img class="img-fluid card_waiting_img w-100"
                                                            src="/img/pr15.jpg" alt="" />
                                                    </div>
                                                    <div class="col-12 col-lg-11 col-md-11 col-sm-11">
                                                        <div
                                                            class="d-flex justify-content-between align-items-center mt-2 mt-lg-0">
                                                            <div class="d-flex justify-content-start">
                                                                <span class="text">Equipment Reservation</span>
                                                            </div>
                                                        </div>

                                                        <div
                                                            class="d-flex justify-content-between align-items-center mt-2">
                                                            <div
                                                                class="d-flex justify-content-start align-items-center">
                                                                <svg width="14" height="14" viewBox="0 0 14 14"
                                                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <g clip-path="url(#clip0_2_7145)">
                                                                        <path
                                                                            d="M6.125 10.0625H7.875V13.125H6.125V10.0625Z"
                                                                            fill="#7C90A6"></path>
                                                                        <path
                                                                            d="M12.6875 12.25H11.8125V3.5C11.8125 3.2375 11.6375 3.0625 11.375 3.0625H10.9375V1.3125C10.9375 1.05 10.7625 0.875 10.5 0.875H3.5C3.2375 0.875 3.0625 1.05 3.0625 1.3125V3.0625H2.625C2.3625 3.0625 2.1875 3.2375 2.1875 3.5V12.25H1.3125C1.05 12.25 0.875 12.425 0.875 12.6875C0.875 12.95 1.05 13.125 1.3125 13.125H5.25V9.625C5.25 9.3625 5.425 9.1875 5.6875 9.1875H8.3125C8.575 9.1875 8.75 9.3625 8.75 9.625V13.125H12.6875C12.95 13.125 13.125 12.95 13.125 12.6875C13.125 12.425 12.95 12.25 12.6875 12.25ZM9.625 4.375C9.8875 4.375 10.0625 4.55 10.0625 4.8125V5.6875C10.0625 5.95 9.8875 6.125 9.625 6.125C9.3625 6.125 9.1875 5.95 9.1875 5.6875V4.8125C9.1875 4.55 9.3625 4.375 9.625 4.375ZM4.375 10.9375C4.375 11.2 4.2 11.375 3.9375 11.375C3.675 11.375 3.5 11.2 3.5 10.9375V10.0625C3.5 9.8 3.675 9.625 3.9375 9.625C4.2 9.625 4.375 9.8 4.375 10.0625V10.9375ZM4.8125 8.3125C4.8125 8.575 4.6375 8.75 4.375 8.75C4.1125 8.75 3.9375 8.575 3.9375 8.3125V7.4375C3.9375 7.175 4.1125 7 4.375 7C4.6375 7 4.8125 7.175 4.8125 7.4375V8.3125ZM4.8125 5.6875C4.8125 5.95 4.6375 6.125 4.375 6.125C4.1125 6.125 3.9375 5.95 3.9375 5.6875V4.8125C3.9375 4.55 4.1125 4.375 4.375 4.375C4.6375 4.375 4.8125 4.55 4.8125 4.8125V5.6875ZM5.25 3.9375C4.9875 3.9375 4.8125 3.7625 4.8125 3.5V2.625C4.8125 2.3625 4.9875 2.1875 5.25 2.1875C5.5125 2.1875 5.6875 2.3625 5.6875 2.625V3.5C5.6875 3.7625 5.5125 3.9375 5.25 3.9375ZM6.5625 8.3125C6.5625 8.575 6.3875 8.75 6.125 8.75C5.8625 8.75 5.6875 8.575 5.6875 8.3125V7.4375C5.6875 7.175 5.8625 7 6.125 7C6.3875 7 6.5625 7.175 6.5625 7.4375V8.3125ZM6.5625 5.6875C6.5625 5.95 6.3875 6.125 6.125 6.125C5.8625 6.125 5.6875 5.95 5.6875 5.6875V4.8125C5.6875 4.55 5.8625 4.375 6.125 4.375C6.3875 4.375 6.5625 4.55 6.5625 4.8125V5.6875ZM7 3.9375C6.7375 3.9375 6.5625 3.7625 6.5625 3.5V2.625C6.5625 2.3625 6.7375 2.1875 7 2.1875C7.2625 2.1875 7.4375 2.3625 7.4375 2.625V3.5C7.4375 3.7625 7.2625 3.9375 7 3.9375ZM8.3125 8.3125C8.3125 8.575 8.1375 8.75 7.875 8.75C7.6125 8.75 7.4375 8.575 7.4375 8.3125V7.4375C7.4375 7.175 7.6125 7 7.875 7C8.1375 7 8.3125 7.175 8.3125 7.4375V8.3125ZM8.3125 5.6875C8.3125 5.95 8.1375 6.125 7.875 6.125C7.6125 6.125 7.4375 5.95 7.4375 5.6875V4.8125C7.4375 4.55 7.6125 4.375 7.875 4.375C8.1375 4.375 8.3125 4.55 8.3125 4.8125V5.6875ZM8.75 3.9375C8.4875 3.9375 8.3125 3.7625 8.3125 3.5V2.625C8.3125 2.3625 8.4875 2.1875 8.75 2.1875C9.0125 2.1875 9.1875 2.3625 9.1875 2.625V3.5C9.1875 3.7625 9.0125 3.9375 8.75 3.9375ZM9.1875 8.3125V7.4375C9.1875 7.175 9.3625 7 9.625 7C9.8875 7 10.0625 7.175 10.0625 7.4375V8.3125C10.0625 8.575 9.8875 8.75 9.625 8.75C9.3625 8.75 9.1875 8.575 9.1875 8.3125ZM10.5 10.9375C10.5 11.2 10.325 11.375 10.0625 11.375C9.8 11.375 9.625 11.2 9.625 10.9375V10.0625C9.625 9.8 9.8 9.625 10.0625 9.625C10.325 9.625 10.5 9.8 10.5 10.0625V10.9375Z"
                                                                            fill="#7C90A6"></path>
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_2_7145">
                                                                            <rect width="14" height="14" fill="white">
                                                                            </rect>
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>

                                                                <span class="gray_text ms-1"> Lorem ipsum dolor sit amet
                                                                    consectetur adipisicing elit.</span>
                                                            </div>
                                                            <div
                                                                class="d-flex justify-content-end align-items-center gap-2">
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
                                                <img class="img-fluid my-2" src="/img/wedding.jpg" alt="">
                                                <img class="img-fluid my-2" src="/img/pr11.jpg" alt="">
                                                <img class="img-fluid my-2" src="/img/pr3.jpg" alt="">
                                            </div>
                                        </div>
                                        <div class=" col-12 col-md-6 col-lg-6">
                                            <div class="d-flex flex-column  left-side-images ">
                                                <img class="img-fluid my-2 w-100" src="/img/pr1.jpg" alt=""
                                                    style="object-fit: contain;">
                                                <img class="img-fluid my-2 w-100" src="/img/pr14.jpg" alt=""
                                                    style="object-fit: contain;">

                                                <img class="img-fluid my-2 w-100" src="/img/pr13.jpg" alt=""
                                                    style="object-fit: contain;">
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
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                        Officia maxime ipsam et sit, quisquam, iste eum voluptatibus
                                        nobis voluptate unde.
                                    </span>
                                    <div class="my-4">
                                        <router-link to="/signUp" type="button" class="home-btn p-2"> Create Account </router-link> 
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
    <pageFooter>

    </pageFooter>
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
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Nickname </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Nickname" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Phone Number </label>
                        <div class="input-group mb-3">
                            <input id="phone" type="tel" class="form-control" maxlength="10"
                                placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Email </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Email" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> City </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="City" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> State </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="State" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Event Date </label>
                        <div class="input-group mb-3">
                            <input name="date" type="date" class="form-control mt-2 py-3 text-start text gray-inp "
                                required="">
                        </div>
                        <label class=" label-form"> Would you like to communicate by email or phone? </label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Phone Number
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                checked>
                            <label class="form-check-label" for="flexRadioDefault2">
                                Email
                            </label>
                        </div>
                        <label class="label-form"> Type of service provided </label>
                        <div class="input-group mb-3 checkbox">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckA-Z">
                                <label class="form-check-label" for="flexCheckDefault">
                                    A - Z
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="me" checked>
                                <label class="form-check-label" for="me">
                                    DJ
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="otherServicesCheckbox"
                                    checked>
                                <label class="form-check-label" for="otherServicesCheckbox">
                                    Other services
                                </label>
                            </div>
                        </div>
                        <div id="otherServicesTextarea">
                            <label class=" label-form">Enter other services you want</label>
                            <div class="input-group mb-3">
                                <textarea class="form-control" aria-label="With textarea"></textarea>
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="engagement_parties" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Engagement Parties</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" method="">
                        <label class=" label-form"> Name </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Nickname </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Phone Number </label>
                        <div class="input-group mb-3">
                            <input id="phone" type="tel" class="form-control" placeholder="(201) 555-0123"
                                maxlength="10" aria-label="" aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> email </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> City </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> State </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Event Date </label>
                        <div class="input-group mb-3">
                            <input name="date" type="date" class="form-control mt-2 py-3 text-start text gray-inp "
                                required="">
                        </div>
                        <label class=" label-form"> Would you like to communicate by email or phone? </label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Phone Number
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                checked>
                            <label class="form-check-label" for="flexRadioDefault2">
                                Email
                            </label>
                        </div>
                        <label class="label-form"> Type of service provided </label>
                        <div class="input-group mb-3 checkbox">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    A - Z
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                                <label class="form-check-label" for="flexCheckChecked">
                                    DJ
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="otherServicesCheckbox2"
                                    checked>
                                <label class="form-check-label" for="flexCheckChecked2">
                                    Other services
                                </label>
                            </div>
                        </div>

                        <div id="">
                            <label class=" label-form">Enter other services you want</label>
                            <div class="input-group mb-3">
                                <textarea class="form-control" aria-label="With textarea"></textarea>
                            </div>
                        </div>

                        <label class=" label-form"> Event location </label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                home
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                checked>
                            <label class="form-check-label" for="flexRadioDefault2">
                                Wedding hall
                            </label>
                        </div>


                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="birthday_parties" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Birthday Parties </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" method="">
                        <label class=" label-form"> Name </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Nickname </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Nickname" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Phone Number </label>
                        <div class="input-group mb-3">
                            <input id="phone" type="tel" class="form-control" maxlength="10"
                                placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Email </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Email" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> City </label>
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" placeholder="City" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> State </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="State" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Event Date </label>
                        <div class="input-group mb-3">
                            <input name="date" type="date" class="form-control mt-2 py-3 text-start text gray-inp "
                                required="">
                        </div>
                        <label class=" label-form"> Would you like to communicate by email or phone? </label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Phone Number
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                checked>
                            <label class="form-check-label" for="flexRadioDefault2">
                                Email
                            </label>
                        </div>
                        <label class="label-form"> Type of service provided </label>
                        <div class="input-group mb-3 checkbox">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckA-Z">
                                <label class="form-check-label" for="flexCheckDefault">
                                    A - Z
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckdj" checked>
                                <label class="form-check-label" for="flexCheckChecked">
                                    DJ
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="otherServicesCheckbox"
                                    checked>
                                <label class="form-check-label" for="flexCheckChecked">
                                    Other services
                                </label>
                            </div>
                        </div>
                        <div id="otherServicesTextarea">
                            <label class=" label-form">Enter other services you want</label>
                            <div class="input-group mb-3">
                                <textarea class="form-control" aria-label="With textarea"></textarea>
                            </div>
                        </div>

                        <label class=" label-form"> Are you booking the person for yourself or someone else? </label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="radioMe">
                            <label class="form-check-label" for="radioMe">
                                Me
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="radioSomeoneElse"
                                checked>
                            <label class="form-check-label" for="radioSomeoneElse">
                                Someone else
                            </label>
                        </div>
                        <div id="someoneElseTextarea">
                            <label class=" label-form">Enter other services you want</label>
                            <div class="input-group mb-3">
                                <textarea class="form-control" aria-label="With textarea"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
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
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Nickname </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Nickname" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Phone Number </label>
                        <div class="input-group mb-3">
                            <input id="phone" type="tel" class="form-control" maxlength="10"
                                placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Email </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Email" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> City </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="City" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> State </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="State" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Event Date </label>
                        <div class="input-group mb-3">
                            <input name="date" type="date" class="form-control mt-2 py-3 text-start text gray-inp "
                                required="">
                        </div>
                        <label class=" label-form"> Would you like to communicate by email or phone? </label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Phone Number
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                checked>
                            <label class="form-check-label" for="flexRadioDefault2">
                                Email
                            </label>
                        </div>
                        <label class="label-form"> Type of service provided </label>
                        <div class="input-group mb-3 checkbox">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckA-Z">
                                <label class="form-check-label" for="flexCheckDefault">
                                    A - Z
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="me" checked>
                                <label class="form-check-label" for="me">
                                    DJ
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="" checked>
                                <label class="form-check-label" for="">
                                    Other services
                                </label>
                            </div>
                        </div>a
                        <div id="#">
                            <label class=" label-form">Enter other services you want</label>
                            <div class="input-group mb-3">
                                <textarea class="form-control" aria-label="With textarea"></textarea>
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="equipmentreservation" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Equipment Reservation</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" method="">
                        <label class=" label-form"> Name </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Nickname </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Nickname" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Phone Number </label>
                        <div class="input-group mb-3">
                            <input id="phone" type="tel" class="form-control" maxlength="10"
                                placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Email </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Email" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> City </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="City" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> State </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="State" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Event Date </label>
                        <div class="input-group mb-3">
                            <input name="date" type="date" class="form-control mt-2 py-3 text-start text gray-inp "
                                required="">
                        </div>
                        <label class=" label-form"> Would you like to communicate by email or phone? </label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Phone Number
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                checked>
                            <label class="form-check-label" for="flexRadioDefault2">
                                Email
                            </label>
                        </div>
                        <label class="label-form"> Type of service provided </label>
                        <div class="input-group mb-3 checkbox">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckA-Z">
                                <label class="form-check-label" for="flexCheckDefault">
                                    A - Z
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="me" checked>
                                <label class="form-check-label" for="me">
                                    DJ
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="" checked>
                                <label class="form-check-label" for="">
                                    Other services
                                </label>
                            </div>
                        </div>a
                        <div id="#">
                            <label class=" label-form">Enter other services you want</label>
                            <div class="input-group mb-3">
                                <textarea class="form-control" aria-label="With textarea"></textarea>
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="othersection" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Other Section</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" method="">
                        <label class=" label-form"> Name </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Nickname </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Nickname" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Phone Number </label>
                        <div class="input-group mb-3">
                            <input id="phone" type="tel" class="form-control" maxlength="10"
                                placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Email </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Email" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> City </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="City" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> State </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="State" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Event Date </label>
                        <div class="input-group mb-3">
                            <input name="date" type="date" class="form-control mt-2 py-3 text-start text gray-inp "
                                required="">
                        </div>
                        <label class=" label-form"> Would you like to communicate by email or phone? </label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Phone Number
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                checked>
                            <label class="form-check-label" for="flexRadioDefault2">
                                Email
                            </label>
                        </div>
                        <label class="label-form"> Type of service provided </label>
                        <div class="input-group mb-3 checkbox">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckA-Z">
                                <label class="form-check-label" for="flexCheckDefault">
                                    A - Z
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="me" checked>
                                <label class="form-check-label" for="me">
                                    DJ
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="" checked>
                                <label class="form-check-label" for="">
                                    Other services
                                </label>
                            </div>
                        </div>a
                        <div id="#">
                            <label class=" label-form">Enter other services you want</label>
                            <div class="input-group mb-3">
                                <textarea class="form-control" aria-label="With textarea"></textarea>
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="work_with" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Work with Yalla Party</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="" method="">
                        <label class=" label-form"> Name </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Nickname </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Nickname" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Phone Number </label>
                        <div class="input-group mb-3">
                            <input id="phone" type="tel" class="form-control" maxlength="10"
                                placeholder="(201) 555-0123" aria-label="" aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Email </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Email" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> City </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="City" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> State </label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="State" aria-label="Username"
                                aria-describedby="basic-addon1">
                        </div>
                        <label class=" label-form"> Event Date </label>
                        <div class="input-group mb-3">
                            <input name="date" type="date" class="form-control mt-2 py-3 text-start text gray-inp "
                                required="">
                        </div>
                        <label class=" label-form"> Would you like to communicate by email or phone? </label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Phone Number
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                checked>
                            <label class="form-check-label" for="flexRadioDefault2">
                                Email
                            </label>
                        </div>
                        <label class="label-form"> Type of service provided </label>
                        <div class="input-group mb-3 checkbox">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckA-Z">
                                <label class="form-check-label" for="flexCheckDefault">
                                    A - Z
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="me" checked>
                                <label class="form-check-label" for="me">
                                    DJ
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="" checked>
                                <label class="form-check-label" for="">
                                    Other services
                                </label>
                            </div>
                        </div>a
                        <div id="#">
                            <label class=" label-form">Enter other services you want</label>
                            <div class="input-group mb-3">
                                <textarea class="form-control" aria-label="With textarea"></textarea>
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped></style>