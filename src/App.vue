<script >
import {reactive , provide} from 'vue'
import { mapState, mapGetters, mapActions } from "vuex";

export default{
 
components:{
},
computed:{

},

mounted(){
  this.recordVisit();
},
methods:{
  ...mapActions("Visit", ["RecordVisit"]),
  /////////// for visit ///////////
  async recordVisit() {
			try {
				// Create the visitData object 	
				const visitData = {
					ip: "", // Get the user's IP from the fetched data
					userAgent: navigator.userAgent,
					route: this.$route.path
				};
				// Log the visitData for debugging
				// If needed, send the data to your backend
				this.RecordVisit(visitData).then(Response => {
				}).catch(error => {
				    console.log(error.response.data.message);
				});
			} catch (error) {
				// Handle any errors (network issues, API failure, etc.)
				console.error("Error fetching IP:", error);
			}
		}
}
};
</script>

<template>
	<router-view/> 
</template>

<style scoped>
  *{
    font-family: "Rubik", sans-serif !important;
  }
</style>

