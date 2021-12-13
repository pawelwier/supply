<template>
  <div v-if="showButton">
    <button @click="orderStatusChange">
      {{statusButtonText}}
    </button>
  </div>
  <div v-else>
    Ogarnięte
  </div>
</template>

<script setup>
import {ref, defineProps, onMounted, defineEmits} from "vue";

const props = defineProps({
  status: String
})

const emit = defineEmits(['status-change'])

const statusButtonText = ref('')
const showButton = ref(true)

const orderStatusChange = () => {
  emit('status-change', props.status)
}

onMounted(() => {
  if (!['nowy', 'w trakcie'].includes(props.status)) {
    showButton.value = false
    return
  }
  statusButtonText.value = props.status === 'nowy' ? 'Zaczynam' : 'Ogarnięte'
})
</script>

<style scoped>

</style>
