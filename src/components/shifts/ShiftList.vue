<template>
  <div class="filter-wrapper">
    <h2>Filter</h2>
    <div class="flex">
      <p>Filter on price</p>
      <div class="relative">
        <div v-if="minPrice"  class="minmax-value">
          <span>{{ minPrice }}</span>
          <span>{{ maxPrice }}</span>
        </div>
        <Slider 
         v-model="value"
         :min="minPrice ? minPrice : 0"
         :max="maxPrice ? maxPrice : 500" 
        />
      </div>
    </div>
    <div class="flex spc-btnw">
      <h2>Shifts</h2>
      <base-button mode="normal" @click="openDrawer">Add Shift</base-button>
    </div>
  </div>
  <add-update v-if="cloaseDrawer"></add-update>

  <shift-item
    v-for="shift in listShift"
    :key="shift.id"
    :id="shift.id"
    :title="shift.title"
    :desc="shift.desc"
    :range="value"
    :shiftDetails="shift.shiftdetails">
  </shift-item>
</template>

<script>
  import AddUpdate from './AddUpdate.vue';
  import ShiftItem from '../shift/ShiftItem.vue';
  import Slider from '@vueform/slider';
  import BaseButton from '../ui/BaseButton.vue';

  export default {
     components: {AddUpdate, ShiftItem, Slider, BaseButton},
     data() {
      return {
        value: [0, 500],
        priceArr: [],
      }
     },
     computed: {
      listShift() {
        return this.$store.getters.shifts;
      },
      maxPrice() {
        if(this.$store.getters.priceList.length === 0) {
          return false;
        }
        return Math.max(...this.$store.getters.priceList);
      },
      minPrice() {
        if(this.$store.getters.priceList.length === 0) {
          return false;
        }
        return Math.min(...this.$store.getters.priceList);
      },
      selectedShift() {
        return this.$store.getters.selectedShift;
      },
      cloaseDrawer() {
        return this.$store.getters.cloaseDrawer;
      }
     },
     methods: {
      openDrawer() {
        this.$store.dispatch('cloaseDrawer', true);
      }
     }
  
  }
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style scoped>
 .filter-wrapper {
  max-width: 640px;
  margin: 0px auto;
 }

 .spc-btnw {justify-content: space-between;}

  .flex {
    display: flex;
    align-items: center;
  }

  .minmax-value {
    display: flex;
    width: 94%;
    justify-content: space-between;
    position: absolute;
    top: 15px;
    font-size: 14px;
    margin-left: 25px;
  }
  .relative {
    position: relative;
  }
</style>

