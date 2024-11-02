import { createRouter, createWebHistory } from 'vue-router'
import login from '../Views/User/Login.vue'
import signUp from '../Views/User/SignUp.vue'

import main from '../Views/Main.vue'
import profile from '../Views/Profile.vue'
import profileProfile from '../Views/Profile/profile.vue'
import myevents from '../Views/Profile/myEvents.vue'
import profileOrders from '../Views/Profile/orders.vue'
import profileChangePassword from '../Views/Profile/changePassword.vue'
import profileFavorit from '../Views/Profile/favorit.vue'

import events from '../Views/Events.vue'
import event from '../Views/EventDetails.vue'
import marketPlace from '../Views/MarketPlace.vue'
import product from '../Views/Product.vue'
import store from '../Views/Store.vue'
import bookStore from '../Views/BookStore.vue'
import aboutus from '../Views/AboutUs.vue'



const routes = [
    {
        path: '/',
        name: "main",
        component: main
    },
    {
        path: '/login',
        name: "login",
        component: login
    },
    {
        path: '/signUp',
        name: "signUp",
        component: signUp
    },
    {
        path: '/aboutus',
        name: "aboutus",
        component: aboutus
    },
    {
        path: '/events',
        name: "events",
        component: events
    },
    {
        path: '/event',
        name: "event",
        component: event
    },
    {
        path: '/productStore',
        name: "store",
        component: store
    },
    {
        path: '/bookStore',
        name: "bookStore",
        component: bookStore
    },
    {
        path: '/marketPlace',
        name: "marketPlace",
        component: marketPlace
    },
    {
        path: '/product',
        name: "product",
        component: product
    },

    {
        path: '/profile',
        name: "profile",
        component: profile,
        children: [
            {
                path: '',
                name: "profileProfile",
                component: profileProfile
            },
            {
                path: '/myevents',
                name: "myevents",
                component: myevents
            },
            {
                path: '/orders',
                name: "profileOrders",
                component: profileOrders
            },
            {
                path: '/favorit',
                name: "profileFavorit",
                component: profileFavorit
            },
            {
                path: '/changePassword',
                name: "profileChangePassword",
                component: profileChangePassword
            },
        ]
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
      // to scroll to the top if any route happen
    //   scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         return savedPosition;
    //     } else {
    //         return { left: 0, top: 0 }; // Always scroll to the top
    //     }
    // }
});

export default router 