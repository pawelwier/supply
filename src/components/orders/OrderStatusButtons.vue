<template>
  <div v-if="showButton" class="order-buttons-wrapper">
    <button @click="orderStatusChange">
      {{statusButtonText}}
    </button>
    <EditOrderButton @edit-order="emitEditOrder" />
    <button @click="cancelOrder">
      Wycofaj
    </button>
  </div>
  <div v-else class="order-complete">
    Ogarnięte
  </div>
</template>

<script setup>
import {ref, defineProps, onMounted, defineEmits} from "vue";
import EditOrderButton from "./EditOrderButton";

const props = defineProps({
  status: String
})

const emit = defineEmits(['status-change', 'cancel-order', 'edit-order'])

const statusButtonText = ref('')
const showButton = ref(true)

const orderStatusChange = () => {
  emit('status-change', props.status)
}

const cancelOrder = () => {
  emit('cancel-order', props.status)
}

const emitEditOrder = () => {
  emit('edit-order')
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
.order-complete {
  color: #2D6508;
  font-weight: 700;
}
.order-buttons-wrapper {
  display: flex;
  gap: 10px;
}
</style>
