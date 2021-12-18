<template>
  <div>
    <a href="#" @click="loginRedirect">
      Zaloguj się
    </a>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()

const loginRedirect = () => {
  router.push({
    name: 'Login',
  })
}
</script>

<style scoped>

</style>
