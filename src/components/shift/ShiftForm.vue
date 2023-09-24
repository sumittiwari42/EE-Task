<template>
  <section>
      <p class="error">{{ errorMsg }}</p>
      <div v-if="!selectedShift">
        <h2>Add Shift</h2>
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" :maxlength="100" name="title" id="title" v-model="title">
        </div>

        <div class="form-group">
            <label for="description">Description</label>
            <textarea name="description" :maxlength="500" id="description" v-model="desc" cols="30" rows="4"></textarea>
        </div>

        <div class="form-group">
            <label for="dates">Dates</label>
            <div class="icon-input date-input">
            <VueDatePicker name="dates" id="dates" v-model="dates" :enable-time-picker="false" multi-dates />
            <i class="fa fa-calendar"></i>
            </div>
        </div>

        <div class="date-wrapper" v-for="(date, index) in dates" :key="index">
          <div class="flex remove-wrap">
            <p>{{ date.getDate()+" "+date.toLocaleString("default", { month: "short" })+" "+date.getFullYear() }}</p>
            <button @click="removeDate(index)"><i class="fa fa-close"></i></button>
          </div>
        <div class="shift-details">
            <div class="flex">
                <div class="form-group">
                    <label for="starttime">Start Time</label>
                    <div class="icon-input date-input">
                    <VueDatePicker name="starttime" id="starttime" v-model="starttime[index]" time-picker mode-height="120" position="left" />
                    <i class="fa fa-clock"></i>
                    </div>
                </div>
                <div class="form-group">
                    <label for="endtime">End Time</label>
                    <div class="icon-input date-input">
                    <VueDatePicker name="endtime" id="endtime" v-model="endtime[index]" time-picker mode-height="120"/>
                    <i class="fa fa-clock"></i>
                    </div>
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <div class="icon-input">
                      <input name="price" id="price" type="number" v-model="price[index]"><i class="fa fa-euro"></i>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="type">Type</label>
                <select name="type" id="type" v-model="type[index]">
                    <option v-for="type in typeList" :key="type" :value="type">{{type}}</option>
                </select>
            </div>
        </div>
        </div>

        <div class="form-group btn-group">
           <base-button @click="addShift()" mode="normal">Save</base-button>
        </div>
      </div>

      <div v-else>
        <h2>Edit/Delete Shift</h2>
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" :maxlength="100" name="title" id="title" v-model="selectedShift.title">
        </div>

        <div class="form-group">
            <label for="description">Description</label>
            <textarea name="description" :maxlength="500" id="description" v-model="selectedShift.desc" cols="30" rows="4"></textarea>
        </div>

        <div class="form-group">
            <label for="dates">Dates</label>
            <div class="icon-input date-input">
            <VueDatePicker name="dates" id="dates" @update:model-value="datechnage" v-model="selectedShift.dates" :enable-time-picker="false" multi-dates />
            <i class="fa fa-calendar"></i>  
            </div>
        </div>

        <div v-for="(date, index) in selectedShift.shiftdetails" :key="index">
          <div class="flex remove-wrap">
            <p>{{ date.date.getDate()+" "+date.date.toLocaleString("default", { month: "short" })+" "+date.date.getFullYear() }}</p>
            <button @click="removeDate(index)"><i class="fa fa-close"></i></button>
          </div>
        <div class="shift-details">
            <div class="flex">
                <div class="form-group">
                    <label for="starttime">Start Time</label>
                    <div class="icon-input date-input">
                    <VueDatePicker name="starttime" id="starttime" v-model="date.starttime" time-picker mode-height="120" />
                    <i class="fa fa-clock"></i>
                    </div>
                </div>
                <div class="form-group">
                    <label for="endtime">End Time</label>
                    <div class="icon-input date-input">
                    <VueDatePicker name="endtime" id="endtime" v-model="date.endtime" time-picker mode-height="120"/>
                    <i class="fa fa-clock"></i>
                    </div>
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <div class="icon-input">
                      <input name="price" id="price" type="number" v-model="date.price"> <i class="fa fa-euro"></i>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="type">Type</label>
                <select name="type" id="type" v-model="date.type">
                    <option v-for="type in typeList" :key="type" :value="type">{{type}}</option>
                </select>
            </div>
        </div>
        </div>

        <div class="form-group btn-group">
           <base-button @click="editShift()" mode="normal">Save</base-button>
           <base-button @click="deletShift()" mode="flat">Delete</base-button>
        </div>
      </div> 
  </section>
</template>

<script>
  import BaseButton from '../ui/BaseButton.vue';
  
  export default {
    data() {
        return {
          title: '',
          desc: '',
          starttime: [],
          endtime: [],
          type: [],
          price: [],
          dates: [],
          dateList: [],
          uidCounter: 0,
          errorMsg: ''
        }
    },
    components: {BaseButton},
    computed: {
      selectedShift() {
        return this.$store.getters.selectedShift;
      },
      typeList() {
        return this.$store.getters.shiftTypes;
      }
    },
    methods: {
        addShift() {
      
            if(!this.title) {
              this.errorMsg = "Please Enter title!";
              return false;
            } else if(this.dates == "" || this.dates.length > 10) {
              this.errorMsg = "Please enter date or not more date 10 date!";
              return false;
            }
            for(const date in this.dates) {

            if(this.price[date] < 0) {
              this.errorMsg = "Price should be 0 or more then 0!";
              return false;
            }

            if(!this.starttime[date] || !this.endtime[date] || this.price[date] == null || this.type[date] == null) {
              this.errorMsg = "Please fill all required input or correct price!";
              return false;
            } else if(this.endtime[date].hours*60 + this.endtime[date].minutes <= this.starttime[date].hours*60 + this.starttime[date].minutes) {
              this.errorMsg = "End time sould be greater then start time!";
              return false;
            }

            this.errorMsg = "";

             this.dateList.push({
                date: this.dates[date],
                starttime: this.starttime[date],
                endtime: this.endtime[date],
                price: this.price[date],
                type: this.type[date]
              })
            }

            this.uidCounter = crypto.randomUUID();

           let formData = {
            id: this.uidCounter,
            title: this.title,
            desc: this.desc,
            dates: this.dates,
            shiftdetails: this.dateList
           }

           this.$emit('form-data', formData);

           this.title = '',
           this.desc = '',
           this.starttime = [],
           this.endtime = [],
           this.type = [],
           this.price = [],
           this.dates = [],
           this.dateList = []

           this.$store.dispatch('priceList');
           this.$store.dispatch('cloaseDrawer', false);
        },
        editShift() {
          if(!this.selectedShift.title) {
              this.errorMsg = "Please Enter title!";
              return false;
            } else if(this.selectedShift.dates.length < 0 || this.selectedShift.dates.length > 10) {
              this.errorMsg = "Please enter date or not more date 10 date!";
              return false;
            }
            console.log(this.selectedShift.shiftdetails);
            for(const date in this.selectedShift.shiftdetails) {

              if(this.selectedShift.shiftdetails[date].price < 0) {
                this.errorMsg = "Price should be 0 or more then 0!";
                return false;
              }

              if(!this.selectedShift.shiftdetails[date].starttime || !this.selectedShift.shiftdetails[date].endtime || this.selectedShift.shiftdetails[date].price == null || this.selectedShift.shiftdetails[date].type == null) {
                this.errorMsg = "Please fill all required input or correct price!";
                return false;
              } else if(this.selectedShift.shiftdetails[date].endtime.hours*60 + this.selectedShift.shiftdetails[date].endtime.minutes <= this.selectedShift.shiftdetails[date].starttime.hours*60 + this.selectedShift.shiftdetails[date].starttime.minutes) {
                this.errorMsg = "End time sould be greater then start time!";
                return false;
              }
            }

            this.errorMsg = "";
            this.$emit('update-data', this.selectedShift);
            this.$store.dispatch('priceList');
            this.$store.dispatch('cloaseDrawer', false);
        },
        deletShift() {
          this.$emit('delete-data', this.selectedShift.id);
          this.$store.dispatch('cloaseDrawer', false);
        },
        datechnage(modeleData) {     
          const addValue = modeleData.length - this.selectedShift.dates.length;
      
          const newDate = new Date();
          let hour = newDate.getHours();
          let minut = newDate.getMinutes();
          let second = newDate.getSeconds();
          
          for(var i = 0; i < addValue; i++) {
            this.selectedShift.shiftdetails.push({
              date: modeleData[this.selectedShift.dates.length+i],
              endtime: {hours: hour, minutes: minut, seconds: second},
              starttime: {hours: hour, minutes: minut, seconds: second},
              price: null,
              type: null
            });
          }
        },
        removeDate(index) {
          if(this.selectedShift) {
            this.selectedShift.shiftdetails.splice(index, 1);
            this.selectedShift.dates.splice(index, 1);
          } else {
            this.dates.splice(index, 1);
            this.dates.splice(index, 1);
          }
          
        }
    }
  }
</script>

<style scoped>
  .flex {
    display: flex;
  }
  .form-group  {
    margin-bottom: 10px;
  }
  .remove-wrap {
    justify-content: space-between;
    font-size: 14px;
  }
  .remove-wrap p {margin: 10px 0px;}
  .remove-wrap button {
    padding: 0px;
    background-color: #fff;
    border: 0px solid;
    cursor: pointer;
  }
  .form-group label {
    display: block;
    font-size: 12px;
    margin-bottom: 5px;
  }
  .form-group input,
  .form-group textarea,
  .form-group select {
    padding: 8px;
    display: block;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: calc(100% - 18px);
    font-size: 12px;
  }

  .form-group input{
    height: 16px;
    padding: 4px;
    width: calc(100% - 10px);
  }
  .form-group select {
    height: 26px;
    padding: 4px;
    width: calc(100% - 0px);
  }
  .shift-details .flex > .form-group {
    flex: 1;
    margin-right: 5px;
  }
  .shift-details .flex > .form-group:last-child {
    margin-right: 0px;
  } 
  .shift-details {
    background-color: #000000c9;
    padding: 10px 10px 1px;
    border-radius: 5px;;
  }

  .shift-details label {
    color: #ffffffb8;
  }

  .date-wrapper {margin-top: 10px;}
  .date-wrapper:first-child {margin-top: 20px;}

  .btn-group {
    position: fixed;
    bottom: 0px;
    background: #fff;
    width: 280px;
    margin: 0px;
    padding: 10px;
    display: flex;
    justify-content: space-around;
  }

  .error {color: red;}

  h2 {margin: 15px 0px;}
  .requiredInput {
    border: 1px solid red !important;
    border-radius: 5px;
  }

  .icon-input {
    display: flex;
    background: #fff;
    border: 1px solid;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 4px;
  }

  .icon-input input {
    border: 0px solid;
    padding: 0px;
  }

  .date-input {padding: 3px;}

</style>