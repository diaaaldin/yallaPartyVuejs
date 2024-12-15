<script>
import { ElLoading } from 'element-plus';
import { mapState, mapGetters, mapActions } from "vuex";
import event from '@/components/Event/eventCard.vue';

export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  components: {
    event,
  },

  emits: {

  },

  created() {
    // Call the function from the store directly when the component is created
    this.initFunc();
  },

  computed: {
    ...mapGetters("Events", ["getEventsData", "getEventData"]),


  },
  methods: {
    ...mapActions("Events", ["GetCustomerEventsGuests", "GetEvent",]),

    initFunc() {
      const loading = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
        text: "",
      });
      this.GetCustomerEventsGuests().then(Response => {
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

  }
};
</script>
<template>
  <div class="col-12 col-lg-9  ">
    <div class="container white_card px-4 pt-3 pb-2 mt-3 mt-lg-0 right-side">
      <div class="tab-content px-0" id="myTabContent">
        <div class="event" id="">
          <!-- start card link -->
          <event v-for="item in getEventsData" :event='item'></event>
          <!-- end card link -->
        </div>
      </div>
      <div v-if="!getEventsData || getEventsData.length === 0" class="alert alert-danger mt-3">
        Try adding to show data.
      </div>
    </div>
  </div>


</template>
<style scoped>

</style>