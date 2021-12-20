<template>
  <div>
    <div class="header-wrapper">
      <div class="header-elements">
        <div>
          <a href="#" @click="toggleCompleteVisible">{{toggleVisibleText}}</a>
        </div>
        <CategorySelect @change="categorySelect" />
      </div>
    </div>
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
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {getAllDemands, getDemandsByCategory, getActiveDemands} from '../controllers/DemandController'
import DemandRecord from "../components/demands/DemandRecord";
import AddDemandButton from "../components/demands/AddDemandButton";
import CategorySelect from "../components/utils/CategorySelect";
import {demandHeaders} from "../data/demandHeaders";

const demands = ref(null)
const showComplete = ref(true)
const toggleVisibleText = ref('Ukryj nieaktualne')

const categorySelect = async (category) => {
  const res = category ? await getDemandsByCategory(category) : await getAllDemands()
  demands.value = res.data
}

const toggleCompleteVisible = async () => {
  showComplete.value = !showComplete.value
  toggleVisibleText.value = showComplete.value ? 'Ukryj nieaktualne' : 'Pokaż nieaktualne'
  const res = !showComplete.value ? await getActiveDemands() : await getAllDemands()
  demands.value = res.data
}

onMounted(async () => {
  const res = await getAllDemands()
  demands.value = res.data
})

</script>

<style scoped>
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
