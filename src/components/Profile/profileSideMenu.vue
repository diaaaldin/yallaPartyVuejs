<script>
import { mapState, mapGetters, mapActions } from "vuex";

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
    // this.GetStatistics();

  },

  computed: {
    // ...mapGetters("Services", ["getStatisticsData"]),

  },
  methods: {
    // ...mapActions("Services", ["GetStatistics"]),
    logOutFunc(){
        this.$router.push({ name: 'main' });
    }
  }
};
</script>
<template>
  <!--    start left side list          -->
  <div class="col-12 col-lg-3 h-100 left-side">
    <ul class="list-group list-group-flush white_card_collapse_top">
      <li class="list-group-item">
        <div class="d-flex justify-content-between align-items-center py-2">
          <div class="justify-content-start d-flex">
            <div class="d-flex align-items-center ">
              <img src="/img/person1.jpg" class="img-fluid hero-profile-pic1" alt="profile pic">
              <div class="d-flex flex-column">

                <router-link to="/profile" class="list_link ms-2" style="color: black">Ahmad Mahmood</router-link>

                <div class=" align-items-center d-flex ms-2">
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="3.5" cy="3.5" r="3.5" fill="#0AB905" />
                  </svg>
                  <span class="gray_text ms-1 " style="font-size: 10px">Activated Acount</span>
                </div>
              </div>
            </div>
          </div>
          <div class="justify-content-end  d-flex ">
            <div class="d-none d-lg-block">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m9 5 7 7-7 7"></path>
              </svg>
            </div>
            <div class="d-block d-lg-none">
              <a data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
                aria-controls="collapseExample">
                <i class="fa-sharp fa-solid fa-bars" style="color: var(--second-color);"></i>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div class="collapse d-lg-block " id="collapseExample">
      <ul class="list-group list-group-flush white_card_collapse_bottom h-100">
        <li class="list-group-item" :class="{ active: $route.path === '/profile' }">
          <div class="d-flex justify-content-between align-items-center py-2">
            <div class="justify-content-start  d-flex">
              <div class="d-flex align-items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 7.8C4 6.11984 4 5.27976 4.32698 4.63803C4.6146 4.07354 5.07354 3.6146 5.63803 3.32698C6.27976 3 7.11984 3 8.8 3H15.2C16.8802 3 17.7202 3 18.362 3.32698C18.9265 3.6146 19.3854 4.07354 19.673 4.63803C20 5.27976 20 6.11984 20 7.8V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V7.8Z"
                    fill="#B5BEC8" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M9 10C9.55228 10 10 9.55228 10 9C10 8.44772 9.55228 8 9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10ZM13 8C12.4477 8 12 8.44772 12 9C12 9.55228 12.4477 10 13 10H15C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8H13ZM13 12C12.4477 12 12 12.4477 12 13C12 13.5523 12.4477 14 13 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12H13ZM12 17C12 16.4477 12.4477 16 13 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H13C12.4477 18 12 17.5523 12 17ZM10 13C10 13.5523 9.55228 14 9 14C8.44772 14 8 13.5523 8 13C8 12.4477 8.44772 12 9 12C9.55228 12 10 12.4477 10 13ZM9 18C9.55228 18 10 17.5523 10 17C10 16.4477 9.55228 16 9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18Z"
                    fill="black" />
                  <path
                    d="M9 3C9 2.44772 9.44772 2 10 2H14C14.5523 2 15 2.44772 15 3V4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4V3Z"
                    fill="black" />
                </svg>
                <router-link to="/profile" class="list_link ms-2"> My Profile </router-link>
              </div>
            </div>
            <div class="justify-content-end  d-flex">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m9 5 7 7-7 7"></path>
              </svg>


            </div>
          </div>
        </li>
        <li class="list-group-item " :class="{ active: $route.path === '/orders' }">
          <div class="d-flex justify-content-between align-items-center py-2">
            <div class="justify-content-start  d-flex">
              <div class="d-flex align-items-center">
                <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 4.56C0 2.96385 0 2.16578 0.310631 1.55613C0.583871 1.01987 1.01987 0.583871 1.55613 0.310631C2.16578 0 2.96385 0 4.56 0H14.44C16.0361 0 16.8342 0 17.4439 0.310631C17.9801 0.583871 18.4161 1.01987 18.6894 1.55613C19 2.16578 19 2.96385 19 4.56V10.64C19 12.2362 19 13.0342 18.6894 13.6439C18.4161 14.1801 17.9801 14.6161 17.4439 14.8894C16.8342 15.2 16.0361 15.2 14.44 15.2H4.56C2.96385 15.2 2.16578 15.2 1.55613 14.8894C1.01987 14.6161 0.583871 14.1801 0.310631 13.6439C0 13.0342 0 12.2362 0 10.64V4.56Z"
                    fill="#B5BEC8" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M14.2499 4.75H18.9999V10.45H14.2499C12.6759 10.45 11.3999 9.17401 11.3999 7.6C11.3999 6.02599 12.6759 4.75 14.2499 4.75ZM14.2499 8.55C14.7746 8.55 15.1999 8.12467 15.1999 7.6C15.1999 7.07533 14.7746 6.65 14.2499 6.65C13.7252 6.65 13.2999 7.07533 13.2999 7.6C13.2999 8.12467 13.7252 8.55 14.2499 8.55Z"
                    fill="black" />
                </svg>
                <router-link to="/orders" class="list_link ms-2"> Orders </router-link>
              </div>
            </div>
            <div class="justify-content-end  d-flex">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m9 5 7 7-7 7"></path>
              </svg>


            </div>
          </div>
        </li>

        <li class="list-group-item" :class="{ active: $route.path === '/favorit' }">
          <div class="d-flex justify-content-between align-items-center py-2">
            <div class="justify-content-start  d-flex">
              <div class="d-flex align-items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 2C5.79086 2 4 3.79087 4 6V20.0008C4 21.6842 5.95294 22.6146 7.26018 21.5538L11.3699 18.2191C11.7371 17.9211 12.2629 17.9211 12.6301 18.2191L16.7398 21.5538C18.047 22.6146 19.9999 21.6842 19.9999 20.0008V6C19.9999 3.79086 18.2091 2 15.9999 2H8Z"
                    fill="#B5BEC8" />
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M15.7071 7.29289C16.0976 7.68342 16.0976 8.31658 15.7071 8.70711L11.7071 12.7071C11.3166 13.0976 10.6834 13.0976 10.2929 12.7071L8.29289 10.7071C7.90237 10.3166 7.90237 9.68342 8.29289 9.29289C8.68342 8.90237 9.31658 8.90237 9.70711 9.29289L11 10.5858L14.2929 7.29289C14.6834 6.90237 15.3166 6.90237 15.7071 7.29289Z"
                    fill="#12131A" />
                </svg>
                <router-link to="/favorit" class="list_link ms-2"> Favorite </router-link>
              </div>
            </div>
            <div class="justify-content-end  d-flex">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m9 5 7 7-7 7"></path>
              </svg>


            </div>
          </div>
        </li>
        <li class="list-group-item" :class="{ active: $route.path === '/changePassword' }">
          <div class="d-flex justify-content-between align-items-center py-2">
            <div class="justify-content-start  d-flex">
              <div class="d-flex align-items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M10.0001 3.5C10.0001 2.67157 10.6716 2 11.5001 2H12.5001C13.3285 2 14.0001 2.67157 14.0001 3.5V3.86445C14.0001 4.09259 14.155 4.29021 14.3729 4.35779C14.8439 4.50387 15.2962 4.69228 15.7255 4.91859C15.9274 5.025 16.1767 4.99485 16.3381 4.8335L16.5962 4.57538C17.182 3.98959 18.1317 3.98959 18.7175 4.57538L19.4246 5.28249C20.0104 5.86827 20.0104 6.81802 19.4246 7.40381L19.1665 7.66193C19.0052 7.82328 18.975 8.07264 19.0814 8.27449C19.3077 8.70378 19.4961 9.15614 19.6422 9.62713C19.7098 9.84503 19.9074 10 20.1356 10H20.5C21.3284 10 22 10.6716 22 11.5V12.5C22 13.3284 21.3284 14 20.5 14H20.1356C19.9074 14 19.7098 14.155 19.6422 14.3729C19.4961 14.8439 19.3077 15.2962 19.0814 15.7255C18.975 15.9274 19.0052 16.1767 19.1665 16.3381L19.4246 16.5962C20.0104 17.182 20.0104 18.1317 19.4246 18.7175L18.7175 19.4246C18.1317 20.0104 17.182 20.0104 16.5962 19.4246L16.3381 19.1665C16.1767 19.0052 15.9274 18.975 15.7255 19.0814C15.2962 19.3077 14.8439 19.4961 14.3729 19.6422C14.155 19.7098 14.0001 19.9074 14.0001 20.1355V20.5C14.0001 21.3284 13.3285 22 12.5001 22H11.5001C10.6716 22 10.0001 21.3284 10.0001 20.5V20.1356C10.0001 19.9074 9.84509 19.7098 9.62719 19.6422C9.15618 19.4962 8.70379 19.3077 8.27449 19.0814C8.07264 18.975 7.82327 19.0052 7.66192 19.1665L7.40381 19.4246C6.81802 20.0104 5.86827 20.0104 5.28249 19.4246L4.57538 18.7175C3.98959 18.1317 3.98959 17.182 4.57538 16.5962L4.8335 16.3381C4.99485 16.1767 5.025 15.9274 4.91859 15.7255C4.69227 15.2962 4.50385 14.8439 4.35777 14.3729C4.29019 14.155 4.09257 14 3.86443 14H3.5C2.67157 14 2 13.3284 2 12.5V11.5C2 10.6716 2.67157 10 3.5 10H3.86443C4.09257 10 4.29019 9.84503 4.35778 9.62713C4.50385 9.15614 4.69227 8.70378 4.91859 8.27449C5.025 8.07264 4.99485 7.82327 4.8335 7.66193L4.57538 7.40381C3.98959 6.81802 3.98959 5.86827 4.57538 5.28249L5.28249 4.57538C5.86827 3.98959 6.81802 3.98959 7.40381 4.57538L7.66193 4.8335C7.82327 4.99485 8.07264 5.025 8.27449 4.91859C8.70379 4.69226 9.15618 4.50384 9.62719 4.35776C9.84509 4.29017 10.0001 4.09255 10.0001 3.86441V3.5Z"
                    fill="#B5BEC8" />
                  <path
                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                    fill="black" />
                </svg>

                <router-link to="/changePassword" class="list_link ms-2"> Change Password </router-link>
              </div>
            </div>
            <div class="justify-content-end  d-flex">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m9 5 7 7-7 7"></path>
              </svg>


            </div>
          </div>
        </li>

        <li class="list-group-item mt-lg-5">
                      <div class="d-flex justify-content-between align-items-center py-2">
                        <div class="justify-content-start  d-flex">
                          <div class="d-flex align-items-center">
                            <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.85 2.70332V10.2966C0.85 11.4258 1.77072 12.3465 2.89986 12.3465H9.03692C10.1661 12.3465 11.0868 11.4258 11.0868 10.2966V9.06677C11.0868 8.7759 10.8514 8.54047 10.5605 8.54047C10.2696 8.54047 10.0342 8.7759 10.0342 9.06677V10.2966C10.0342 10.8471 9.5843 11.297 9.03386 11.297H2.89986C2.34941 11.297 1.89954 10.8471 1.89954 10.2966V2.70332C1.89954 2.15288 2.34941 1.70301 2.89986 1.70301H9.03692C9.58736 1.70301 10.0372 2.15288 10.0372 2.70332V3.93318C10.0372 4.22406 10.2727 4.45948 10.5635 4.45948C10.8544 4.45948 11.0898 4.22406 11.0898 3.93318V2.70332C11.0898 1.57418 10.1691 0.653467 9.03998 0.653467H2.89986C1.77087 0.653467 0.85 1.57097 0.85 2.70332Z" fill="#272265" stroke="#0B3D74" stroke-width="0.3"/>
                              <path d="M12.6848 9.43595C12.7873 9.53847 12.9207 9.59002 13.057 9.59002C13.1933 9.59002 13.3267 9.53847 13.4292 9.43595L15.996 6.86915C16.2014 6.66372 16.2014 6.33318 15.996 6.12775L13.4292 3.56096C13.2238 3.35553 12.8932 3.35553 12.6878 3.56096C12.4824 3.76638 12.4824 4.09693 12.6878 4.30236L14.3591 5.97368H7.68782C7.39695 5.97368 7.16152 6.2091 7.16152 6.49998C7.16152 6.79086 7.39694 7.02628 7.68782 7.02628H14.3561L12.6853 8.69708C12.479 8.89975 12.4792 9.23464 12.6859 9.43706L12.7908 9.32989L12.6848 9.43595Z" fill="#272265" stroke="#0B3D74" stroke-width="0.3"/>
                            </svg>
            
            
            
                            <a href="" v-on:click="logOutFunc()" class="list_link ms-2"> Log Out </a>
                          </div>
                        </div>
                        <div class="justify-content-end  d-flex">
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"></path>
                              </svg>
            
                        </div>
                      </div>
                     </li>

      </ul>


    </div>


  </div>
  <!-- end left side list      -->
</template>
<style scoped></style>