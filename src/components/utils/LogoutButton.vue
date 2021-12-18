<template>
  <div>
    <a href="#" @click="logout">Wyloguj</a>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const store = useStore()
const router = useRouter()
const logout = () => {
  store.dispatch('logout')
  router.push({
    name: 'Login',
  })
}
</script>

<style scoped>

</style>
