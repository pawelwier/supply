<template>
  <button @click="onEditOrder">
    Edytuj
  </button>
</template>

<script setup>
import {defineEmits} from 'vue'

const emit = defineEmits(['edit-order'])

const onEditOrder = () => emit('edit-order')
</script>

<style scoped>

</style>
