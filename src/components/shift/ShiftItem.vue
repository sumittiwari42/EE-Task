<template>
    <base-card>
      <section>
        <div class="flex">
          <h3>{{ title }}</h3>
          <button @click="getEditValue(id)"><i class="fa fa-pencil"></i></button>
        </div>
        <p>{{ desc }}</p>
        <div class="date-list">
          <h3>Dates</h3>
          <div v-for="(shift, index) in shiftDetails" :key="index">
            <div v-if="range[0] <= shift.price && range[1] >= shift.price" class="shift-detail flex" >
            <div class="flex date-details">
                <span>{{ shift.date.getDate()+" "+shift.date.toLocaleString("default", { month: "short" })+" "+shift.date.getFullYear()}}</span>
                <span>{{ shift.starttime.hours+":"+shift.starttime.minutes }}</span>
                <span>{{ shift.endtime.hours+":"+shift.endtime.minutes }}</span>
                <span>{{ shift.type }}</span>
            </div>
            <div class="price">
                <span><i class="fa fa-euro"></i> {{ shift.price }}</span>
            </div>
            </div>
          </div>
        </div>
      </section>
    </base-card>
</template>

<script>
  export default {
    props: ['id','title', 'desc', 'shiftDetails', 'range'],
    data() {
        return {
            selectedShift: null,
            value: 30
        }
    },
    methods: {
        getEditValue(id) {
            this.selectedShift = this.$store.getters.shifts.find(shift => shift.id === id);
            this.$store.dispatch('selectedShift', this.selectedShift);
            this.$store.dispatch('cloaseDrawer', true);
        }
    }
  }
</script>

<style scoped>
 .flex {
  display: flex;
  justify-content: space-between;
 }

 .date-details {
   width: 400px;
 }

 button {
  background-color: transparent;
  border: 0px solid;
  cursor: pointer;
 }

 .price {width: 80px;}
 .shift-detail {
  background: #000000c9;
    color: #ffffffb8;
    border-radius: 5px;
    font-size: 14px;
    padding: 10px;
    margin-bottom: 10px;
 }

 h3 {
  margin: 10px 0px;
    font-weight: normal;
    font-size: 20px;
 }

 p {
  margin-top: 10px;
  font-size: 14px;
}
</style>