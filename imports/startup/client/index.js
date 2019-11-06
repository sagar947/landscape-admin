// Import client startup through a single index entry point
import Vue from 'vue';
import { Meteor } from 'meteor/meteor'
import './routes.js';
import './vuetify.js';
import './meteorVueTracker.js';
import './veeValidate.js';
import './filters.js';
import createRouter from './routes.js';
import MainLayout from '../../ui/layouts/MainLayout.vue';

function createApp() {
    const router = createRouter();
    const app = new Vue({
        el: '#app',
        router,
        ...MainLayout
    })
}

Meteor.startup(() => {
    createApp({
        ssr: false
    })
})