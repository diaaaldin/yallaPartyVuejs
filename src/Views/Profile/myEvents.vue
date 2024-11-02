<script>
//import { mapState, mapGetters, mapActions } from "vuex";
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

  },

  computed: {
    //...mapGetters(),
    //...mapGetters(),

  },
  methods: {
    //...mapActions(),

  }
};
</script>
<template>
<div class="col-12 col-lg-9" >
      <div class="container white_card px-4 pb-0 mt-lg-0 right-side">
        <section class="events">
              <div class="row">
                  <div class="col-12 col-lg-12 col-md-12">
                      <div class="all mt-3 mt-lg-0 white_card">
                            <event></event>
                            <event></event>
                            <event></event>
                            <event></event>
                        </div>
                   </div>
               </div>
        </section>
      </div>
</div>
</template>
<style scoped></style>