<template>
    <button :class="mode">
        <slot></slot>
    </button>
</template>

<script>
  export default {
    props: ['mode']
  }
</script>

<style scoped>
button.normal {
   background-color: #000000c9;
    color: #fff;
    padding: 5px;
    border: 1px solid #000000c9;
    border-radius: 5px;
    width: 100px;
}

button.flat {
  background-color: #fff;
    color: #000000c9;
    padding: 5px;
    border: 1px solid #000000c9;
    border-radius: 5px;
    width: 100px;
}
</style>