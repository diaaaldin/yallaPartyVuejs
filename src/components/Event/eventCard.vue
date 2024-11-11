<script>
import axios from "axios";
import { ElLoading } from 'element-plus';
import { mapState, mapGetters, mapActions } from "vuex";


export default {
    data() {
        return {
            cities: []
        };
    },
    props: {
        event: {
            type: Object,
            default() {
                return {
                    id: 0,
                    title: "",
                    companyName: "",
                    date: "",
                    stateId: "",
                    cityId: "",
                    imagePath: "",
                    description: "",
                    slug: ""
                };
            }
        }
    },
    async created() {
        // Fetch cities based on initial stateId if available
        if (this.event.stateId) {
            await this.fetchSearchCities(this.event.stateId);
        }
    },
    watch: {
        // Watch for changes in the event prop's stateId
        "event.stateId": {
            immediate: true,
            handler(newStateId) {
                if (newStateId) {
                    this.fetchSearchCities(newStateId);
                }
            }
        }
    },
    methods: {
        ...mapActions("Events", ["GetEventsForShow", "GetEvent",]),

        goToEventFunc() {
            const loading = ElLoading.service({
                lock: true,
                background: 'rgba(0, 0, 0, 0.7)',
                text: "",
            });
            this.GetEvent(this.event.id).then(Response => {
                loading.close();
				this.$router.push({ name: "event", params: { slug: Response.slug } });
			}).catch(error => {
                loading.close();
				Swal.fire(error.response.data.message);
			});
            loading.close();
        },

        async fetchSearchCities(stateId) {
            console.log("Fetching cities for stateId:", stateId);
            try {
                const response = await axios.get(
                    `https://api.census.gov/data/2020/dec/pl?get=NAME&for=place:*&in=state:${stateId}`, {
                    withCredentials: false
                }
                );
                this.cities = response.data;
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        },
        getCityName(city) {
            const selectedCity = this.cities.find(x => x[2] === city);
            return selectedCity ? selectedCity[0] : "";
        },
        
        formatDate(dateTime) {
            if (!dateTime) return '';
            return new Date(dateTime).toISOString().split('T')[0];
        },
        stripHtml(html) {
            const div = document.createElement('div');
            div.innerHTML = html;
            const text = div.textContent || div.innerText || '';
            return text.length > 20 ? text.slice(0,75) + '...' : text;
        },
      
    }
};
</script>

<template>
    <div class="row gray-inp fav-card card-events">
        <div class="col-12 col-lg-4 col-md-12 px-0">
            <div class="d-flex h-100 w-100 image" @click="goToEventFunc()">
                <img class="img-fluid fav-img w-100" :src="event.imagePath">
            </div>
        </div>
        <div class="col-12 col-lg-8 col-md-12 p-3 p-md-3 p-lg-4">
            <div class="d-flex justify-content-between titlep">
                <div>
                    <span>{{ event.title }}</span>
                </div>
            </div>
            <div class="mt-4">
                <div class="d-flex justify-content-between a1">
                    <div class=" d-flex align-items-center titlep-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            class="bi bi-calendar2" viewBox="0 0 16 16">
                            <path
                                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z">
                            </path>
                            <path
                                d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z">
                            </path>
                        </svg>

                        <span class="ms-2"> {{ formatDate(event.date) }} </span>
                    </div>
                    <div class="d-flex align-items-center titlep-text">
                        <svg class="svg-inline--fa fa-map-marked-alt fa-w-18 fa-1x" aria-hidden="true" focusable="false"
                            data-prefix="fas" data-icon="map-marked-alt" role="img" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512" data-fa-i2svg="">
                            <path fill="currentColor"
                                d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z">
                            </path>
                        </svg>
                        <span class="ms-2">{{ getCityName(event.cityId) }} </span>
                    </div>
                    <div class="d-flex align-items-center titlep-text">
                        <svg class="svg-inline--fa fa-bullhorn fa-w-18 fa-1x" aria-hidden="true" focusable="false"
                            data-prefix="fas" data-icon="bullhorn" role="img" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512" data-fa-i2svg="">
                            <path fill="currentColor"
                                d="M576 240c0-23.63-12.95-44.04-32-55.12V32.01C544 23.26 537.02 0 512 0c-7.12 0-14.19 2.38-19.98 7.02l-85.03 68.03C364.28 109.19 310.66 128 256 128H64c-35.35 0-64 28.65-64 64v96c0 35.35 28.65 64 64 64h33.7c-1.39 10.48-2.18 21.14-2.18 32 0 39.77 9.26 77.35 25.56 110.94 5.19 10.69 16.52 17.06 28.4 17.06h74.28c26.05 0 41.69-29.84 25.9-50.56-16.4-21.52-26.15-48.36-26.15-77.44 0-11.11 1.62-21.79 4.41-32H256c54.66 0 108.28 18.81 150.98 52.95l85.03 68.03a32.023 32.023 0 0 0 19.98 7.02c24.92 0 32-22.78 32-32V295.13C563.05 284.04 576 263.63 576 240zm-96 141.42l-33.05-26.44C392.95 311.78 325.12 288 256 288v-96c69.12 0 136.95-23.78 190.95-66.98L480 98.58v282.84z">
                            </path>
                        </svg>
                        <span class="ms-2"> {{ event.companyName }} </span>
                    </div>

                    <div class="justify-content-end go">
                        <a @click="goToEventFunc()">
                            <!-- <i class="fas fa-angle-right"></i> -->
                            <svg class="svg-inline--fa fa-long-arrow-alt-right fa-w-14" aria-hidden="true"
                                focusable="false" data-prefix="fas" data-icon="long-arrow-alt-right" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                <path fill="currentColor"
                                    d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z">
                                </path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <div class="d-flex justify-content-between ">
                    <div class=" d-flex align-items-center">
                        <p>
                            {{ stripHtml(event.description) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>