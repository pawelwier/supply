<template>
  <div>
    <button @click="toggleDisplayNewDemandForm(true)">
      Dodaj nowe zapotrzebowanie
    </button>
  </div>
</template>

<script setup>
import {useStore} from 'vuex'
const store = useStore()

const toggleDisplayNewDemandForm = () => {
  store.dispatch('setPopupContent', 'add-demand')
}

</script>

<style scoped>

</style>
