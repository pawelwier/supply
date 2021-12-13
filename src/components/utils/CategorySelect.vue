<template>
  <div class="category-select">
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
import {defineEmits, ref} from 'vue'
import {supplyCategories} from "../../data/supplyCategories";

const selectedCategory = ref(null)

const emit = defineEmits(['change'])
const categorySelect = () => {
  emit('change', selectedCategory.value)
}

</script>

<style scoped>

</style>
