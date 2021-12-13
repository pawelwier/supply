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
        <input @change="setQuantity" type="number" :max="demand.quantity" min="1" v-model="order.quantity" />
        <button type="button" @click="setMaxQuantity">
          wszystko
        </button>
      </div>
      <div>
        <label>
          Kto ogarnie?
        </label>
        <select v-model="order.assignedTo">
          <option> - </option>
          <option v-for="(person, i) in supplyTeam" :key="i">
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
          <option v-for="(base, i) in supplyBases" :key="i">
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

const setQuantity = (e) => {
  const demandQuantity = demand.value.quantity
  const quantity = e.target.value
  if (quantity > demandQuantity) {
    order.value = {
      ...order.value,
      quantity: demandQuantity
    }
  }
}

const setMaxQuantity = () => {
  order.value = {
    ...order.value,
    quantity: demand.value.quantity
  }
}

const submitOrder = async () => {
  const {unit, id} = demand.value
  const orderBody = {
    ...order.value,
    unit,
    productId: id,
  }
  await addOrder(orderBody)

  const {quantity} = demand.value
  await editDemand({
    quantity: quantity - orderBody.quantity
  }, demand.value.id)

  if (!(quantity - orderBody.quantity)) {
    await editDemand({
      isComplete: 1
    }, demand.value.id)
  }
  window.location.reload()
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
