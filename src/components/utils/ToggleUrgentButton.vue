<template>
  <div>
    <button @click="toggleUrgent">
      {{props.urgent ? 'NIE' : 'TAK'}}
    </button>
  </div>
</template>

<script setup>
import {defineProps} from "vue";
import {editDemand} from '../../controllers/DemandController'
const props = defineProps({
  urgent: Number,
  id: Number,
})

const toggleUrgent = async () => {
  await editDemand({isUrgent: props.urgent ? 0 : 1}, props.id)
  window.location.reload()
}
</script>

<style scoped>

</style>
