import { createStore } from "vuex";

import shiftModule from './modules/shifts.js';

const store = createStore({
    modules: {
        shifts: shiftModule
    }
})

export default store;