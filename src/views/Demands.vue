<template>
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
import {getAllDemands} from '../controllers/DemandController'
import DemandRecord from "../components/demands/DemandRecord";
import AddDemandButton from "../components/demands/AddDemandButton";

const demands = ref(null)
const headers = [
  'nazwa',
  'jednostka',
  'ilość',
  'komentarz',
  'kto dodał',
  'przypisane do (???)',
  'status (???)',
  'data dodania',
]

onMounted(async () => {
  const res = await getAllDemands()
  demands.value = res.data
})

</script>

<style>
th {
  padding: 0 20px;
}
</style>
