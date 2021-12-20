<template>
  <div>
    <ArchiveRecord v-for="(demand, i) in demands" :key="i" :demand="demand" />
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {getCompleteDemands} from '../controllers/DemandController'
import ArchiveRecord from "../components/archive/ArchiveRecord";

const store = useStore()

const demands = ref([])
const loggedIn = ref(false)

onMounted(async () => {
  loggedIn.value = store.getters.isLoggedIn
  const res = await getCompleteDemands()
  demands.value = res.data
})
</script>

<style scoped>

</style>
