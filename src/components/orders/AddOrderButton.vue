<template>
  <div>
    <button @click="toggleDisplayNewOrderForm(true)">
      Dodaj zamówienie
    </button>
  </div>
</template>

<script setup>
import {useStore} from 'vuex'
const store = useStore()

const toggleDisplayNewOrderForm = () => {
  store.dispatch('setPopupContent', 'add-order')
}

</script>

<style scoped>

</style>
