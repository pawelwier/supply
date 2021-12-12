<template>
<div class="popup-wrapper">
  <slot />
</div>
</template>

<script setup>

</script>

<style scoped>
.popup-wrapper {
  position: relative;
  top: 50px;
  left: 20%;
  width: 60%;
  max-width: 800px;
  z-index: 9999;
  background-color: #FFF;
}
</style>
