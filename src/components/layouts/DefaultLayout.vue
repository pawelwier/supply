<template>
  <div v-if="loggedIn">
    <div class="logout-element">
      zalogowano jako: {{loggedInUser.name}}
      <LogoutButton />
    </div>
    <div id="nav">
      <router-link to="/">Zapotrzebowanie</router-link> |
      <router-link to="/orders">Zamówienia w toku</router-link> |
      <router-link to="/archive">Archiwum</router-link>
    </div>
    <slot/>
  </div>
  <Login v-else />
</template>

<script setup>
import {onMounted, ref} from "vue";
import LogoutButton from "../utils/LogoutButton";
import Login from "../utils/Login";
import {useStore} from "vuex";

const store = useStore()

const loggedInUser = ref(null)
const loggedIn = ref(false)

onMounted(async () => {
  loggedIn.value = store.getters.isLoggedIn
  loggedInUser.value = store.getters.getUser
})
</script>

<style scoped>
.logout-element {
  background-color: #BEAC4D49;
  padding: 10px 0;
}
</style>
