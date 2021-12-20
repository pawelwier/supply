<template>
  <div>
    <a href="#" @click="logout">Wyloguj</a>
  </div>
</template>

<script setup>
import {useStore} from "vuex";

const store = useStore()
const logout = () => {
  store.dispatch('logout')
  window.location.reload()
}
</script>

<style scoped>

</style>
