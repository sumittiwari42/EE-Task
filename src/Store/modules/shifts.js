export default {
    state() {
        return {
            shifts: [],
            selectedShift: null,
            siftType: ["Consultation", "Telephone", "Ambulance"],
            priceArr: [],
            openDrawer: false 
        }
    },
    mutations: {
        addShift(state, payload) {
          state.shifts.push(payload);
        },
        selectedShift(state, payload) {
          state.selectedShift = payload;
        },
        updateShift(state, payload) {
          const id = payload.id;
          const index = state.shifts.findIndex(shift => shift.id === id);
          if(index > -1) {
            state.shifts[index] = payload;
            state.selectedShift = null;  
          }
        },
        deletShift(state, payload) {
            const index = state.shifts.findIndex(shift => shift.id === payload);
            if(index > -1) {
             state.shifts.splice(index, 1);
             state.selectedShift = null; 
            }
        },
        priceList(state) {
         state.priceArr = [];
         if(state.shifts.length > 0) {
            for(var i = 0; i < state.shifts.length; i++) {
                for(var j = 0; j < state.shifts[i].shiftdetails.length; j++) {
                    state.priceArr.push(state.shifts[i].shiftdetails[j].price);
                }               
            }
         }
        },
        cloaseDrawer(state, payload) {
            state.openDrawer = payload;
        }
    },
    actions: {
        addShift(context, data) {
           const shiftData = {
            id: data.id,
            title: data.title,
            desc: data.desc,
            dates: data.dates,
            shiftdetails: data.shiftdetails
           }

           context.commit('addShift', shiftData);
        },
        selectedShift(context, data) {
            context.commit('selectedShift', data);
        },
        updateShift(context, data) {
            context.commit('updateShift', data);
        },
        deletShift(context, data) {
            context.commit('deletShift', data);
        },
        priceList(context) {
            context.commit('priceList');
        },
        cloaseDrawer(context, data) {
            context.commit('cloaseDrawer', data);
        }
    },
    getters: {
        shifts(state) {
          return state.shifts;
        },
        shiftTypes(state) {
         return state.siftType;
        },
        selectedShift(state) {
            return state.selectedShift;
        },
        priceList(state) {
            return state.priceArr;
        },
        cloaseDrawer(state) {
            return state.openDrawer;
        }
    }
}