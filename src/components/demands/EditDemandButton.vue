<template>
<button @click="onEditDemand">
  Edytuj
</button>
</template>

<script setup>
import {defineEmits} from 'vue'

const emit = defineEmits(['edit-demand'])

const onEditDemand = () => emit('edit-demand')
</script>

<style scoped>

</style>
