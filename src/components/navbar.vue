<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Urls } from '@/config';

export default {
    data() {
        return {

        dashUrl :{
            login : Urls.login,
            addProduct :Urls.addProduct ,
            addEvent :Urls.addEvent ,
            storeSignup : Urls.storeSignup,
            companySignup :Urls.companySignup ,
            partnerSignup :Urls.partnerSignup ,
        }
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
        // this.GetStatistics();

    },

    computed: {
        // ...mapGetters("Services", ["getStatisticsData"]),
        GetUserName() {
            const name = this.getUserLoginName;// just for loud this function again when name change
            let userName = localStorage.getItem("customerName");
            if (userName == null) {
                return "";
            } else {
                return userName;
            }
        },
    },
    methods: {
        ...mapActions("Users", ["CustomerProfileInfo"]),
        goToProfileFunc() {
            if (!this.isTokenValid()) {
                this.$router.push({ name: 'login' });
            } else {
                let email = localStorage.getItem("email");
                this.CustomerProfileInfo(email).then(Response => {
                    this.$router.push({ name: 'profileProfile' });
                })
            }
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
            //window.location.reload();
            /// refresh page
        },
        
    }
};
</script>
<template>
    <div class="header-div second">
        <nav class="navbar navbar-expand-lg navbar-expand-lg pt-3">
            <div class="container">


                <div class="navbar-brand">

                    <router-link to="/">
                        <img src="/img/YallaPartyLogo2.png" width="65" alt="" />
                    </router-link>

                    <div class="navigation">
                        <input type="checkbox" class="navigation__checkbox" id="nav-toggle">
                        <label for="nav-toggle" class="navigation__button">
                            <span class="navigation__icon" aria-label="toggle navigation menu"></span>
                        </label>
                        <!-- <div class="navigation__background"></div> -->

                        <nav class="navigation__nav" role="navigation">
                            <label for="nav-toggle" class="navigation__button">
                                <i class="fa fa-arrow-left"
                                    style="color: #de147f;font-size: 18px;margin-top: 15px;"></i>
                            </label>
                            <ul class="navigation__list">
                                <li class="navigation__item">
                                    <a :href="dashUrl.login" class="navigation__link"> Login Business
                                    </a>
                                </li>
                                <li class="navigation__item">
                                    <a :href="dashUrl.addEvent" class="navigation__link"> Create
                                        Event </a>
                                </li>
                                <li class="navigation__item">
                                    <a :href="dashUrl.addProduct" class="navigation__link"> Create
                                        Product 
                                    </a>
                                </li>
                                <li class="navigation__item">
                                    <a :href="dashUrl.storeSignup" class="navigation__link"> Create
                                        Store </a>
                                </li>
                                <li class="navigation__item">
                                    <a :href="dashUrl.companySignup" class="navigation__link"> Create
                                        Company </a>
                                </li>
                                <li class="navigation__item">
                                    <a :href="dashUrl.partnerSignup" class="navigation__link"> Be a
                                        partner </a>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>


                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler">
                        <svg width="34" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.3479 21.124H0V25.3656H11.3479V21.124Z" fill="white"></path>
                            <path d="M22.6738 10.5625H0.148438V14.8041H22.6738V10.5625Z" fill="white"></path>
                            <path d="M34 0H0.148438V4.24156H34V0Z" fill="white"></path>
                        </svg>
                    </span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav align-items-center mb-2 mb-lg-0 gradiant_nav">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }"> HOME
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/events" class="nav-link" :class="{ active: $route.path === '/events' }">
                                EVENT </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/productStore" class="nav-link"
                                :class="{ active: $route.path === '/productStore' }"> STORE </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/toolStore" class="nav-link"
                                :class="{ active: $route.path === '/toolStore' }"> TOOLS </router-link>
                        </li>
                    </ul>

                    <ul v-if="GetUserName == ''"
                        class="nav align-items-center mb-2 mb-lg-0 white-header justify-content-center gradiant_nav">
                        <li class="nav-item login">

                            <router-link to="/login" class="px-3 py-2 align-items-center d-flex login-btn"> LOGIN
                            </router-link>

                        </li>
                        <li class="nav-item sign-up">

                            <router-link to="/signUp" class="px-3 py-2 align-items-center d-flex login-btn"> SIGN UP
                            </router-link>

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
    </div>
</template>
<style scoped></style>