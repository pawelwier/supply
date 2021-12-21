<template>
  <h3>Zaloguj się</h3>
  <form @submit.prevent="validateUser" class="login-form">
    <div>
      <label>nazwa: </label>
      <input v-model="user.name" />
    </div>
    <div>
      <label>hasło: </label>
      <input type="password" v-model="user.password" @input="errorMessage = ''" />
    </div>
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
import {useStore} from "vuex";
import {checkAuth} from '../../controllers/UserController';

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
  window.location.reload()
}

</script>

<style scoped>
.error-message {
  margin-top: 30px;
  color: #FF0015F9;
  font-weight: 700;
}
.login-form {
  background-color: #BEAC4D49;
  padding: 20px 0;
}
.login-form div {
  line-height: 30px;
}
</style>
