import { createApp } from 'vue'

import store from './Store/index.js';

import BaseCard from './components/ui/BaseCard.vue';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import App from './App.vue'

const app = createApp(App);

app.use(store);

app.component('base-card', BaseCard);
app.component('VueDatePicker', VueDatePicker);

app.mount('#app')
