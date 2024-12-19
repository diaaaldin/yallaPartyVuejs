import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from '../store/index';
import moshaToast from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';
import 'cropperjs/dist/cropper.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createHead } from '@vueuse/head';


const head = createHead()
const app = createApp(App);

axios.defaults.withCredentials = true;

app.use(head);
app.use(router);
app.use(VueAxios, axios);
app.use(store);
app.use(moshaToast);
app.use(ElementPlus);
app.mount('#app');
