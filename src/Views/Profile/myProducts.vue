<script>
import { RouterView } from 'vue-router';
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';
import axios from "axios";

export default {
  data() {
    return {
      data: {
        id: 0,
      },

    }
  },

  mounted() {

  },
  beforeUnmount() {

  },


  components: {

  },

  emits: {

  },

  created() {
    this.initFunc();
  },

  computed: {
    ...mapGetters("Products", ["getCustomerBuyProductsOrdersData"]),
  
  },

  methods: {
    ...mapActions("Products", ["GetCustomerBuyProductsOrders"]),

    initFunc() {
      const loading = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: "",
      });
      this.GetCustomerBuyProductsOrders().then(Response => {
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

    GetData() {
      this.GetCustomerBuyProductsOrders().then(Response => {
      }).catch(error => {
        this.$moshaToast(error.response.data.message, {
          hideProgressBar: 'false',
          position: 'top-center',
          showIcon: 'true',
          swipeClose: 'true',
          type: 'warning',
          timeout: 3000,
        });
      });
    },

    DeleteFunc() {
      if (this.checkDeleteValidation()) {

        const loading = ElLoading.service({
          lock: true,
          background: 'rgba(0, 0, 0, 0.7)',
          text: "",
        });

        this.DeleteOrder(this.data.id).then(Response => {
          //console.log(Response);
          this.$moshaToast('Deleted order successfully', {
            hideProgressBar: 'false',
            showIcon: 'true',
            swipeClose: 'true',
            type: 'success',
            timeout: 3000,
          });
          loading.close();
          this.GetData();
          $('#delete_order').modal('hide');
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

    checkDeleteValidation() {
      if (this.data.id == 0) {
        this.$moshaToast('error in item select', {
          hideProgressBar: 'false',
          position: 'top-center',
          showIcon: 'true',
          swipeClose: 'true',
          type: 'warning',
          timeout: 3000,
        });
        return false;
      }
      return true;
    },

    selectItemForDelete(id) {
      console.log("id :", id);
      const selectedOrder = this.getCustomerBuyProductsOrdersData.find(x => x.id === id);
      console.log("selectedOrder :", selectedOrder);

      if (selectedOrder) {
        this.data.id = selectedOrder.id;
      }
    },

    toProductFunc(id) {
      console.log("id :", id);
      const selectedOrder = this.getCustomerBuyProductsOrdersData.find(x => x.id === id);
      console.log("selectedOrder :", selectedOrder);

      if (selectedOrder) {
        this.data.id = selectedOrder.id;
        this.$router.push({ name: "product", params: { slug: selectedOrder.productSlug } });
        }

    },




  }
};
</script>
<template>

  <!-- right side container -->
  <div class="col-12 col-lg-9 order">
    <div class="container white_card px-4 pt-4 pb-0 mt-3 mt-lg-0 right-side">
      <table class="table text-center">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Store</th>
            <th scope="col">Product name</th>
            <th scope="col">Price</th>
            <th scope="col">Image </th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index ) in getCustomerBuyProductsOrdersData">
            <td>{{ index + 1 }}</td>
            <td>{{ item.storeName }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.productPrice }}</td>
            <td>
                <img :src="item.productImage" class="img-responsive rounded" alt="product image" height="80">
            </td>
            <td>
                {{ item.statusName }}
                <!-- <span v-if="item.ticketAllNum > item.ticketBookNum" class="availabe"> {{item.statusName}} </span>
                <span v-else-if="item.ticketAllNum <= item.ticketBookNum" class="not-availabe">{{ item.statusName }}</span> -->
            </td>

            <td>
              <a v-on:click="selectItemForDelete(item.id)">
                <i class="fa fa-trash" data-bs-toggle="modal" data-bs-target="#delete_order"></i>
              </a>
              <a v-on:click="toProductFunc(item.id)">
                <i class="fa fa-edit" ></i>
              </a>
            </td>

          </tr>

        </tbody>
      </table>
      <div v-if="!getCustomerBuyProductsOrdersData || getCustomerBuyProductsOrdersData === 0" class="alert alert-danger mt-3">
         Your table is empty. Try adding to show some data.
      </div>
    </div>
  </div>
  <!-- end right side  -->

  <div class="modal fade" id="delete_order" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Delete Order</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete the Order?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" v-on:click="DeleteFunc()" class="btn btn-primary">Delete</button>
        </div>
      </div>
    </div>
  </div>



</template>
<style scoped></style>