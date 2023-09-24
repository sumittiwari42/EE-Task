<template>
  <shift-list></shift-list>
</template>

<script>
 import ShiftList from './components/shifts/ShiftList.vue';
export default {
  components: {ShiftList}
}
</script>

<style>
  body {
    font-family: Arial, Helvetica, sans-serif;
    color: #757575;
  }

  html, body {
    padding: 0px;
    margin: 0px;
  }

  h2 {position: relative;}

  h2:after {
    content: "";
    position: absolute;
    width: 25px;
    height: 3px;
    background-color: #ff6c86;
    bottom: -3px;
    left: 0px;
  }

  .dp__input {
    height: 15px;
    padding: 0px;
    font-size: 12px;
    border: 0px solid;
  }

  .icon-input .dp__input {
    padding: 2px;
  }

  .dp__clear_icon,
  .dp__icon, 
  .dp__arrow_bottom,
  .dp__arrow_top {display: none;}

  .dp__inc_dec_button .dp__icon {display: block;}
  

 .slider-tooltip {
    background: #fff;
    color: #7b7b7b;
    font-size: 12px;
  }

  .slider-connect {
    background: #c4c4c4;
  }

  .slider-handle {
    background: #ff6c86;
  }

  .slider-connects {
    background: white;
    border: 1px solid #c4c4c4;
  }

  .slider-tooltip {border: #fff;}

  .slider-target {
    margin: 0px 0px 0px 30px;
    width: 300px;
  }
</style>
