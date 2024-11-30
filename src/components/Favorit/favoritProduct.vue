<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';

export default {
  data() {
    return {
      isFilled: true // Track if the heart is filled or not
    }
  },

  props: {
    product: {
      type: Object,
      default() {
        return {
          id: 0,
          companyId: 0,
          companyEmail: "",
          companyName: "",
          name: "",
          section: 0,
          sectionName: "",
          image: "",
          price: 0,
          description: "",
          slug: ""
        };
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
   // this.chickIsFavoritFunc();
  },

  computed: {
    ...mapGetters("Products", ["getFavoritProductsData"]),

  },

  methods: {
    ...mapActions("Products", ["ToggleProductInBasket" , "GetProductInBasket"]),

    toggleHeartFill() {
      const loading = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: "",
      });

      this.ToggleProductInBasket(this.product.id).then(Response => {
          this.$moshaToast('Removed from favourites', {
            hideProgressBar: 'false',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'danger',
            timeout: 3000,
          });
          this.GetProductInBasket();
          //this.isFilled = false;
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

    toProductFunc() {
      this.$router.push({ name: "product", params: { slug: this.product.slug } });
    },

    toMarketFunc() {
      this.$router.push({ name: 'productsmarket', params: { id: this.product.companyId } });
    },

    stripHtml(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      const text = div.textContent || div.innerText || '';
      return text.length > 20 ? text.slice(0, 75) + '...' : text;
    },

    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: "USD",
        //minimumFractionDigits: 0, // No decimals
        //maximumFractionDigits: 0  // No decimals
      }).format(value);
    },
  }
};
</script>
<template>
  <div class="gray-inp px-4 py-3 mt-3 mb-3 fav-card">
    <div class="row">
      <div class="col-12 col-lg-2 px-0">
        <a href="javascript:void(0)">
          <div class="image">
            <img class="img-fluid" v-on:click="toProductFunc()" :src="product.image" alt="">
          </div>
        </a>

      </div>
      <div class="col-12 col-lg-10 ">
        <div class="d-flex justify-content-between align-items-center mt-2 mt-lg-0">
          <div class="d-flex justify-content-start  ">
            <a href="details-product.html">
              <span class="text"> {{ product.name }}</span>
            </a>

          </div>

          <div class="d-flex justify-content-end text-end">
            <div class="gray_text">
              <!-- <span> Monday ، 16 April </span> -->
            </div>
            <a href="javascript:void(0)" @click="toggleHeartFill()">
              <svg width="21" height="17" :stroke="isFilled ? 'red' : '#999999'"
                class="heart_svg" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 18C9.71527 18 9.44077 17.8957 9.22684 17.7061C8.41888 16.9914 7.63992 16.3198 6.95267 15.7274L6.94916 15.7243C4.93423 13.9873 3.19427 12.4873 1.98364 11.0096C0.630341 9.35765 0 7.79138 0 6.08032C0 4.41788 0.563507 2.88418 1.58661 1.76153C2.62192 0.625613 4.04251 0 5.58716 0C6.74164 0 7.79892 0.369224 8.72955 1.09733C9.19922 1.46486 9.62494 1.91466 10 2.43932C10.3752 1.91466 10.8008 1.46486 11.2706 1.09733C12.2012 0.369224 13.2585 0 14.413 0C15.9575 0 17.3782 0.625613 18.4135 1.76153C19.4366 2.88418 20 4.41788 20 6.08032C20 7.79138 19.3698 9.35765 18.0165 11.0094C16.8059 12.4873 15.0661 13.9872 13.0515 15.724C12.363 16.3173 11.5828 16.99 10.773 17.7064C10.5592 17.8957 10.2846 18 10 18Z"
                  :fill="isFilled ? 'red' : 'white'" stroke-width="1.4" />
              </svg>
            </a>

          </div>

        </div>

        <div class="d-flex justify-content-between align-items-center mt-2 ">
          <div class="d-flex justify-content-start align-items-center ">
            <span class="description-text-gray ms-1">{{ stripHtml(product.description) }}</span>
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center mt-2 ">

          <div class="col-8  col-md-5 col-lg-4 a3">
            <div class="d-flex justify-content-between align-items-center gab-3 gap-lg-5 ">
              <div class="d-flex align-items-center">
                <img src="/img/icons/price-svgrepo-com.svg" class="icon-card" width="25" alt="">
                <span class="gray_text_2 ms-1">{{ product.price }}</span>
              </div>
              <div class="d-flex align-items-center">
                <img src="/img/icons/company-svgrepo-com.svg" class="icon-card" width="25" alt="">
                <a href="javascript:void(0)" v-on:click="toMarketFunc()"><span class="gray_text_2 ms-1 campany-name">{{ product.companyName }}</span></a>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <a href="javascript:void(0)" v-on:click="toProductFunc()"class="arrow">
              <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M15 5C15 4.85268 14.9436 4.71139 14.8431 4.60722C14.7426 4.50305 14.6064 4.44452 14.4643 4.44452L1.82977 4.44452L5.20134 0.949458C5.30193 0.845154 5.35844 0.703688 5.35843 0.55618C5.35843 0.408672 5.30193 0.267205 5.20134 0.162902C5.10075 0.0585978 4.96433 9.46888e-07 4.82208 9.53106e-07C4.67983 9.59324e-07 4.5434 0.0585979 4.44282 0.162902L0.157376 4.60672C0.10749 4.65832 0.0679108 4.71962 0.0409056 4.7871C0.0139005 4.85459 -2.21751e-07 4.92694 -2.18557e-07 5C-2.15363e-07 5.07307 0.0139005 5.14541 0.0409057 5.2129C0.0679108 5.28038 0.10749 5.34168 0.157376 5.39328L4.44282 9.8371C4.49262 9.88874 4.55175 9.92971 4.61682 9.95766C4.6819 9.98561 4.75164 10 4.82208 10C4.96433 10 5.10075 9.9414 5.20134 9.8371C5.30193 9.73279 5.35844 9.59133 5.35844 9.44382C5.35844 9.29631 5.30193 9.15485 5.20134 9.05054L1.82977 5.55548L14.4643 5.55548C14.6064 5.55548 14.7426 5.49695 14.8431 5.39278C14.9436 5.28861 15 5.14732 15 5Z"
                  fill="#e5008f" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<style scoped>
.heart_svg {
  cursor: pointer;
  /* Change cursor to pointer for better UX */
}
</style>