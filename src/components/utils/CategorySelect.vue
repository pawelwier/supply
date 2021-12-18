<template>
  <div>
    Wybierz kategorię:
    <select @change="categorySelect" v-model="selectedCategory">
      <option value=""></option>
      <option v-for="(category, i) in supplyCategories" :key="i">
        {{category}}
      </option>
    </select>
  </div>
</template>

<script setup>
import {defineEmits, defineProps, onMounted, ref} from 'vue'
import {supplyCategories} from "../../data/supplyCategories";

const props = defineProps({
  category: null
})

const selectedCategory = ref(null)


const emit = defineEmits(['change'])
const categorySelect = () => {
  emit('change', selectedCategory.value)
}

onMounted(() => {
  if (props.category) {
    selectedCategory.value = props.category
  }
})

</script>

<style scoped>

</style>
