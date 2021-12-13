<template>
  <CategorySelect @change="categorySelect" />
  <div class="home" v-if="demands">
    <table>
      <tbody>
      <tr>
        <th v-for="header in headers" :key="header">
          {{header}}
        </th>
      </tr>
      <tr v-for="demand in demands" :key="demand.id">
        <DemandRecord :demand="demand" />
      </tr>
      </tbody>
    </table>
    <AddDemandButton />
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {getAllDemands, getDemandsByCategory} from '../controllers/DemandController'
import DemandRecord from "../components/demands/DemandRecord";
import AddDemandButton from "../components/demands/AddDemandButton";
import CategorySelect from "../components/utils/CategorySelect";

const demands = ref(null)

const categorySelect = async (category) => {
  const res = category ? await getDemandsByCategory(category) : await getAllDemands()
  demands.value = res.data
}

const headers = [
  'nazwa',
  'kategoria',
  'jednostka',
  'ilość',
  'komentarz',
  'kto dodał',
  'data dodania',
]

onMounted(async () => {
  const res = await getAllDemands()
  demands.value = res.data
})

</script>

<style>
.category-select {
  margin-bottom: 20px;
}
th {
  padding: 0 20px;
}
</style>
