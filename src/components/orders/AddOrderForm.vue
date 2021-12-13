<template>
  <div v-if="demand">
    <h3>
      Zamówienie dla {{demand.name}} ({{demand.quantity}})
    </h3>
    <form @submit.prevent="submitOrder" class="order-form">
      <div>
        <label>
          Ile?
        </label>
        <input type="number" :max="demand.quantity" min="1" v-model="order.quantity" />
      </div>
      <div>
        <label>
          Kto ogarnie?
        </label>
        <select v-model="order.assignedTo">
          <option> - </option>
          <option v-for="person in supplyTeam" :key="person">
            {{person}}
          </option>
        </select>
      </div>
      <div>
        <label>
          Skąd?
        </label>
        <select v-model="order.deliveryBase">
          <option> - </option>
          <option v-for="base in supplyBases" :key="base">
            {{base}}
          </option>
        </select>
      </div>
      <div>
        <label>
          Opis
        </label>
        <textarea v-model="order.comment" />
      </div>
      <div>
        <button type="submit">Utwórz</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useStore} from 'vuex'
import {supplyTeam} from '../../data/supplyTeam'
import {supplyBases} from '../../data/supplyBases'
import {getDemandById, editDemand} from '../../controllers/DemandController'
import {addOrder} from '../../controllers/OrderController'

const demand = ref(null)
const order = ref({
  quantity: null,
  assignedTo: null,
  deliveryBase: null,
  comment: '',
  createdBy: 'pawel',

})

const store = useStore()

const submitOrder = async () => {
  const {unit, id} = demand.value
  const orderBody = {
    ...order.value,
    unit,
    productId: id,
  }
  await addOrder(orderBody)

  const {quantity} = demand.value
  const demandBody = {
    quantity: quantity - orderBody.quantity
  }
  await editDemand(demandBody, demand.value.id)
}

onMounted(async () => {
  const id = store.getters.getPopupContent.data
  const res = await getDemandById(id)
  demand.value = res.data[0]
})
</script>

<style scoped>
.order-form {
  text-align: left;
}
.order-form div {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
}
</style>
