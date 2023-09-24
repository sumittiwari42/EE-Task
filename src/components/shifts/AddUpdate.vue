<template>
     <div class="drawer">
      <shift-form @form-data="submitData" @update-data="updateData" @delete-data="deleteData"></shift-form>
     </div>
</template>

<script>
  import ShiftForm from '../shift/ShiftForm.vue';
  export default {
    components: {ShiftForm},
    methods: {
        submitData(formData) {
            this.$store.dispatch('addShift', formData);
        },
        updateData(updateData) {
          this.$store.dispatch('updateShift', updateData);
        },
        deleteData(id) {
          this.$store.dispatch('deletShift', id);
        }
    }
  }
</script>

<style scoped>
  .drawer {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        padding: 15px;
        width: 300px;
        position: fixed;
        right: 0px;
        top: 0px;
        height: calc(100vh - 65px);
        overflow: scroll;
        z-index: 1000;
        background-color: #fff;
        padding-bottom: 55px;
  }
</style>