<template>
  <PopUp v-if="displayedComponent">
    <component :is="displayedComponent === 'add-demand' ? NewDemandForm : AddOrderForm" />
  </PopUp>
  <div id="nav">
    <router-link to="/">Zapotrzebowanie</router-link> |
    <router-link to="/orders">Zamówienia w toku</router-link>
  </div>
  <router-view/>
</template>

<script setup>
import {useStore} from 'vuex'
import {ref} from 'vue'
import PopUp from "./components/utils/PopUp";
import NewDemandForm from "./components/demands/AddDemandForm";
import AddOrderForm from "./components/orders/AddOrderForm";

const displayedComponent = ref(null)
const store = useStore()
store.watch(
  (state, getters) => getters.getPopupContent,
  newValue => displayedComponent.value = newValue
)

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
