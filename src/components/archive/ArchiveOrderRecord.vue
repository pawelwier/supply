<template>
  <div>
    ilość: <span class="archive-record-value">{{order.quantity}}</span>, ogarnięte przez: <span class="archive-record-value">{{order.assignedTo}} {{order.orderFinishedAt ? formatDate(new Date(order.orderFinishedAt)) : ''}}</span>
  </div>
</template>

<script setup>
import {defineProps} from "vue";
import {formatDate} from '../../utils/formUtils'

defineProps({
  order: null,
})

</script>

<style scoped>
.archive-record-value {
  font-weight: 700;
}
</style>
