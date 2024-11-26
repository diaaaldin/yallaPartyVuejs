import { createRouter, createWebHistory } from 'vue-router'
import login from '../Views/User/Login.vue'
import signUp from '../Views/User/SignUp.vue'

import main from '../Views/Main.vue'
import profile from '../Views/Profile.vue'
import profileProfile from '../Views/Profile/profile.vue'
import myevents from '../Views/Profile/myEvents.vue'
import myproducts from '../Views/Profile/myProducts.vue'
import mytools from '../Views/Profile/myTools.vue'
import profileOrders from '../Views/Profile/orders.vue'
import profileChangePassword from '../Views/Profile/changePassword.vue'
import profileFavorit from '../Views/Profile/favorit.vue'

import events from '../Views/Events.vue'
import event from '../Views/EventDetails.vue'

import marketPlace from '../Views/MarketPlace.vue'
import product from '../Views/Product.vue'
import tool from '../Views/Tool.vue'
import productStore from '../Views/Store.vue'
import toolStore from '../Views/BookStore.vue'
import aboutus from '../Views/AboutUs.vue'

import teckitsuccess from '../Views/Checkout/TeckitBuySuccess.vue'
import teckitfail from '../Views/Checkout/TeckitBuyFail.vue'
import productsuccess from '../Views/Checkout/ProductBuySuccess.vue'
import productfail from '../Views/Checkout/ProductBuyFaild.vue'
import toolsuccess from '../Views/Checkout/RentToolSuccess.vue'
import toolfail from '../Views/Checkout/RentToolFaild.vue'


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
        path: '/event/:slug',
        name: "event",
        component: event
    },
    {
        path: '/productStore',
        name: "productStore",
        component: productStore
    },
    {
        path: '/toolStore',
        name: "toolStore",
        component: toolStore
    },
    {
        path: '/marketPlace/:id',
        name: "marketPlace",
        component: marketPlace
    },
    {
        path: '/product/:slug',
        name: "product",
        component: product
    },
    {
        path: '/tool/:slug',
        name: "tool",
        component: tool
    },
    {
        path: '/teckitfail',
        name: "teckitfail",
        component: teckitfail
    },
    {
        path: '/teckitsuccess',
        name: "teckitsuccess",
        component: teckitsuccess,
        props: route => ({ sessionId: route.query.sessionId }) // Pass sessionId as a prop
    },
    {
        path: '/productfail',
        name: "productfail",
        component: productfail
    },
    {
        path: '/productsuccess',
        name: "productsuccess",
        component: productsuccess,
        props: route => ({ sessionId: route.query.sessionId }) // Pass sessionId as a prop
    },
    {
        path: '/toolfail',
        name: "toolfail",
        component: toolfail
    },
    {
        path: '/toolsuccess',
        name: "toolsuccess",
        component: toolsuccess,
        props: route => ({ sessionId: route.query.sessionId }) // Pass sessionId as a prop
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
                path: '/myproducts',
                name: "myproducts",
                component: myproducts
            },
            {
                path: '/mytools',
                name: "mytools",
                component: mytools
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