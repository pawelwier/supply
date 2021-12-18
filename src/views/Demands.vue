<template>
  <div v-if="loggedIn">
    <div class="header-wrapper">
      <div class="header-elements">
        <div>
          <a href="#" @click="toggleCompleteVisible">{{toggleVisibleText}}</a>
        </div>
        <CategorySelect @change="categorySelect" />
      </div>
      <div class="header-elements">
        <div>
          zalogowano jako: {{loggedInUser.name}}
        </div>
        <LogoutButton />
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
  <LoginRedirect v-else />
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useStore} from "vuex";
import {getAllDemands, getDemandsByCategory, getActiveDemands} from '../controllers/DemandController'
import DemandRecord from "../components/demands/DemandRecord";
import AddDemandButton from "../components/demands/AddDemandButton";
import CategorySelect from "../components/utils/CategorySelect";
import LoginRedirect from "../components/utils/LoginRedirect";
import {demandHeaders} from "../data/demandHeaders";
import LogoutButton from "../components/utils/LogoutButton";

const store = useStore()

const demands = ref(null)
const showComplete = ref(true)
const toggleVisibleText = ref('Ukryj nieaktualne')
const loggedInUser = ref(null)
const loggedIn = ref(false)

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
  loggedIn.value = store.getters.isLoggedIn
  loggedInUser.value = store.getters.getUser
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
