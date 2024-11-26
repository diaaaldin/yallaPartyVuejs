<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { ElLoading } from 'element-plus';

export default {
    data() {
        return {
            isFilled: false // Track if the heart is filled or not
        }
    },
    props: {
        tool: {
            type: Object,
            default() {
                return {
                    id: 0,
                    userId: 0,
                    userEmail: "",
                    userName: "",
                    name: "",
                    sectionId: 0,
                    sectionName: "",
                    image: "",
                    rentPrice: 0,
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
      
    },

    computed: {

    },
    methods: {

        toToolFunc() {
            this.$router.push({ name: "tool", params: { slug: this.tool.slug } });
        },

        toMarketFunc() {
            this.$router.push({ name: 'marketPlace', params: { id: this.tool.userId } });
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
    <div class="col-12 col-lg-3 col-md-6 mt-4" data-aos="fade-up" data-aos-delay="100" data-aos-duration="700">
        <a href="javascript:void(0)" style="color:black;">
            <div class="card custom_card">
                <img v-on:click="toToolFunc()" :src="tool.image" class="card-img-top index-img-card" alt="...">
                <div class="card-body p-3">
                    <div class="d-flex justify-content-between align-items-baseline mb-2">
                        <h6 class="card-title justify-content-start"> {{ tool.name }} </h6>
                       
                    </div>
                    <div class="d-flex align-items-center">
                        <p class="text-store">{{ stripHtml(tool.description) }}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <div class=" d-flex  flex-column">
                            <div class="d-flex align-items-center mb-3">
                                <img src="/img/icons/price-svgrepo-com.svg" class="icon-card" width="25" alt="">
                                <span class="text-store">{{ tool.rentPrice }}</span>
                            </div>

                        </div>
                        <div class="d-flex justify-content-end flex-column">
                            <div class="d-flex align-items-center mb-3">
                                <img src="/img/icons/company-svgrepo-com.svg" class="icon-card" width="25" alt="">

                                <a href="javascript:void(0)" v-on:click="toMarketFunc()"><span class="text-store">
                                    {{ tool.userName }}</span></a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </a>
    </div>
</template>
<style scoped>
.heart_svg {
    cursor: pointer;
    /* Change cursor to pointer for better UX */
}
</style>