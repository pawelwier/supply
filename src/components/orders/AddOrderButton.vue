<template>
  <div>
    <button @click="toggleDisplayNewOrderForm()">
      Dodaj zamówienie
    </button>
  </div>
</template>

<script setup>
import {defineProps} from "vue";
import {useStore} from 'vuex'
const store = useStore()
const props = defineProps({
  id: Number,
})

const toggleDisplayNewOrderForm = () => {
  store.dispatch('setPopupContent', {
    type: 'add-order',
    data: props.id,
  })
}

</script>

<style scoped>

</style>
