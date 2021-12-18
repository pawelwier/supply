<template>
  <PopUp v-if="displayedComponent">
    <component :is="displayedComponent === 'add-demand' ? NewDemandForm : OrderForm" />
  </PopUp>
  <div id="nav">
    <router-link to="/">Zapotrzebowanie</router-link> |
    <router-link to="/orders">Zamówienia w toku</router-link> |
    <router-link to="/archive">Archiwum</router-link>
  </div>
  <router-view/>
</template>

<script setup>
import {useStore} from 'vuex'
import {ref} from 'vue'
import PopUp from "./components/utils/PopUp";
import NewDemandForm from "./components/demands/DemandForm";
import OrderForm from "./components/orders/OrderForm";

const displayedComponent = ref(null)
const store = useStore()
store.watch(
  (state, getters) => getters.getPopupContent,
  newValue => displayedComponent.value = newValue
)

</script>

<style>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #daf3e4;
}
.header-elements {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 10px;
}
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
button {
  padding: 5px 20px;
}
</style>
