//import * as Vue from "vue"
import { createApp } from 'vue';
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import Users from "./modules/Users/index";
import Code from "./modules/Code/index";
import Orders from "./modules/Orders/index";
import Events from "./modules/Events/index";
import Visit from "./modules/Visit/index";
import Products from "./modules/Products/index";
import Tools from "./modules/Tools/index";



import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

const app = createApp();
app.use(Vuex);

const store = new Vuex.Store({
    state:{
        isLogged : false,
    },

    // getter for read
    getters : getters,
    // mutations for update and operation  like setter 
    mutations : mutations,
    // for custom function 
    actions : actions,
    
     modules :{
      Users,
      Code,
      Orders,
      Events,
      Visit,
      Products,
      Tools,
     },

     plugins: [
        createPersistedState({
          paths: ['Users','Code','Orders','Events','Products','Tools'],
        })
      ],
});

export default store;