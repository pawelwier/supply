<template>
  <div v-if="demand">
    <h3>Dodaj nowe zapotrzebowanie</h3>
    <form @submit.prevent="submitDemand" class="demand-form">
      <div>
        <label>
          Nazwa:
        </label>
        <input v-model="demand.name">
      </div>
      <div>
        <label>
          Ile?
        </label>
        <input type="number" max="500" min="1" v-model="demand.quantity" />
      </div>
      <div>
        <label>
          Jednostka:
        </label>
        <input v-model="demand.unit">
      </div>
      <CategorySelect @change="categorySelect" :category="store.getters.getEditedDemandId ? demand.category : null" />
      <div>
        <label>
          Opis
        </label>
        <textarea v-model="demand.comment" />
      </div>
      <div v-if="showErrorMessage" class="error-message">Uzupełnij brakujące pola</div>
      <div>
        <button type="submit">{{store.getters.getEditedDemandId ? 'Edytuj' : 'Utwórz' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {addDemand, getDemandById, editDemand} from "../../controllers/DemandController";
import CategorySelect from "../utils/CategorySelect";

const store = useStore()

const demandId = ref(null)
const demand = ref(null)
const showErrorMessage = ref(false)

const categorySelect = (category) => {
  demand.value = {
    ...demand.value,
    category,
  }
}

const submitDemand = async () => {
  const {name, quantity, unit, category, comment} = demand.value
  if ([name, quantity, unit, category].some(field => !field)) {
    showErrorMessage.value = true
    return
  }
  if (!store.getters.getEditedDemandId) {
    await addDemand(demand.value)
  } else {
    await editDemand({
      name,
      quantity,
      unit,
      category,
      comment,
    }, demandId.value)
    store.dispatch('setEditedDemandId', null)
    showErrorMessage.value = false
  }
  window.location.reload()
}

onMounted(async () => {
  demandId.value = store.getters.getEditedDemandId
  if (!demandId.value) {
    demand.value = {
      quantity: null,
      comment: '',
      createdBy: 'pawel',
    }
    return
  }
  const res = await getDemandById(demandId.value)
  const demandById = res.data[0]
  if (!demandById) return
  demand.value = demandById
})
</script>

<style scoped>
.demand-form {
  text-align: left;
}
.demand-form div {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
}
.error-message {
  color: red;
}
</style>
