<template>
  <form @submit.prevent="validateUser">
    <label>nazwa: </label>
    <input v-model="user.name" />
    <label>hasło: </label>
    <input type="password" v-model="user.password" @input="errorMessage = ''" />
    <button>
      Zaloguj
    </button>
  </form>
  <div class="error-message" v-if="errorMessage">
    {{errorMessage}}
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {checkAuth} from '../controllers/UserController';

const router = useRouter()
const store = useStore()

const user = ref({
  name: '',
  password: '',
})
const errorMessage = ref('')

const validateUser = async () => {
  const res = await checkAuth(user.value)
  const {error, data} = res
  if (error) {
    errorMessage.value = error
    return
  }
  const {name, password} = data[0]
  store.dispatch('setUser', {
    name,
    password,
  })
  router.push({
    name: 'Demands'
  })

}

</script>

<style scoped>
.error-message {
  margin-top: 30px;
  color: #FF0015F9;
  font-weight: 700;
}
</style>
