<template>
  <div class="add-new-demand-button">
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
.add-new-demand-button {
  margin-top: 20px;
}
</style>
