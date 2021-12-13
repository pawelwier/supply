<template>
  <div>
    <form @submit.prevent="submitDemand" class="order-form">
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
      <CategorySelect @change="categorySelect" />
      <div>
        <label>
          Opis
        </label>
        <textarea v-model="demand.comment" />
      </div>
      <div>
        <button type="submit">Utwórz</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {addDemand} from "../../controllers/DemandController";
import CategorySelect from "../utils/CategorySelect";

const demand = ref({
  quantity: null,
  comment: '',
  createdBy: 'pawel',

})

const categorySelect = (category) => {
  demand.value = {
    ...demand.value,
    category,
  }
}

const submitDemand = async () => {
  await addDemand(demand.value)
  window.location.reload()
}
</script>

<style scoped>

</style>
