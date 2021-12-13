<template>
  <div class="popup-wrapper">
    <div>
      Nagłówek
    </div>
    <div>
      <slot />
    </div>
    <div>
      <button @click="closePopup">Zamknij</button>
<!--      <button>Wyślij</button>-->
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
const store = useStore()

const closePopup = () => {
  store.dispatch('setPopupContent', null)
}

</script>

<style scoped>
.popup-wrapper {
  position: absolute;
  top: 50px;
  left: 20%;
  width: 60%;
  max-width: 800px;
  z-index: 9999;
  background-color: #FFF;
  border: 2px #42b983 solid;
  padding: 10px;
}
</style>
