<template>
  <CategorySelect @change="categorySelect" />
  <div class="home" v-if="demands">
    <table>
      <tbody>
      <tr>
        <th v-for="(header, i) in demandHeaders" :key="i">
          {{header}}
        </th>
        <th></th>
        <th class="urgent-background">
          Pilne?
        </th>
      </tr>
      <tr v-for="(demand, i) in demands" :key="i">
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
import {demandHeaders} from "../data/demandHeaders";

const demands = ref(null)

const categorySelect = async (category) => {
  const res = category ? await getDemandsByCategory(category) : await getAllDemands()
  demands.value = res.data
}

onMounted(async () => {
  const res = await getAllDemands()
  demands.value = res.data
})

</script>

<style>
.category-select {
  margin-bottom: 20px;
}
.urgent-background {
  background-color: #E2866F47;
}
th {
  padding: 0 20px;
}
tr {
  line-height: 30px;
}
</style>
