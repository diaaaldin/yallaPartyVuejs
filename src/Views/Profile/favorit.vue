<script>
//import { mapState, mapGetters, mapActions } from "vuex";
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import favoritProduct from '@/components/Favorit/favoritProduct.vue';

export default {
  data() {
    return {

    }
  },

  mounted() {

  },

  components: {
    favoritProduct,
  },

  emits: {

  },

  created() {
    // Call the function from the store directly when the component is created
    this.GetProductInBasket();
  },

  computed: {
    ...mapGetters("Products", ["getFavoritProductsData"]),

  },

  methods: {
    ...mapActions("Products", ["GetProductInBasket"]),

  }
};
</script>
<template>
  <!-- right side container -->
  <div class="col-12 col-lg-9  ">
    <div class="container white_card px-4 pt-3 pb-2 mt-3 mt-lg-0 right-side">
      <div class="tab-content px-0" id="myTabContent">
        <div class="favorite-product" id="">
          <!-- start card link -->
          <favoritProduct v-for="item in getFavoritProductsData" :product='item'></favoritProduct>
          <!-- end card link -->

        </div>
      </div>
      <div v-if="!getFavoritProductsData || getFavoritProductsData === 0" class="alert alert-danger mt-3">
                Your table is empty. Try adding to show some data.
              </div>
    </div>
  </div>
  <!-- end right side  -->
</template>
<style scoped></style>