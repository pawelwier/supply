<template>
  <div v-if="demand && order">
    <h3>
      Zamówienie dla {{demand.name}} ({{store.getters.getEditedOrderId ? `${order.quantity} / ${totalDemandOrderQuantity}` : demand.quantity}})
    </h3>
    <form @submit.prevent="submitOrder" class="order-form">
      <div>
        <label>
          Ile?
        </label>
        <input @change="setQuantity" type="number" :max="store.getters.getEditedOrderId ? orderTotalQuantity : demand.quantity" min="1" v-model="order.quantity" />
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
        <select v-model="order.deliveryBase" :disabled="outerDeliverySource">
          <option> - </option>
          <option v-for="(base, i) in supplyBases" :key="i">
            {{base}}
          </option>
        </select>
        <span>
        <input type="checkbox" @change="deliveryBaseTypeSelect" :checked="outerDeliverySource" />
        <span>
          inne:
        </span>
        <input v-if="outerDeliverySource" v-model="order.deliveryBase"/>
        </span>
      </div>
      <div>
        <label>
          Opis
        </label>
        <textarea v-model="order.comment" />
      </div>
      <div v-if="showErrorMessage" class="error-message">Uzupełnij brakujące pola</div>
      <div>
        <button type="submit">{{store.getters.getEditedOrderId ? 'Edytuj' : 'Utwórz' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useStore} from 'vuex'
import {getDemandById, editDemand} from '../../controllers/DemandController'
import {addOrder, getOrderById, editOrder, getOrdersByDemandId} from '../../controllers/OrderController'

const demand = ref(null)
const orderId = ref(null)
const order = ref(null)
const outerDeliverySource = ref(false)
const orderTotalQuantity = ref(0)
const totalDemandOrderQuantity = ref(0)
const originalOrderQuantity = ref(0)
const showErrorMessage = ref(false)
const supplyTeam = ref([])

const store = useStore()
const supplyBases = store.getters.supplyBases.split(',')

const getDemandOrders = async () => {
  const res = await getOrdersByDemandId(demand.value.id)
  return res.data
}

const setQuantity = (e) => {
  const demandQuantity = store.getters.getEditedOrderId ? orderTotalQuantity.value : demand.value.quantity
  const quantity = e.target.value
  if (quantity > demandQuantity) {
    order.value = {
      ...order.value,
      quantity: demandQuantity
    }
  }
}

const deliveryBaseTypeSelect = (e) => {
  const isOuter = e.target.checked
  outerDeliverySource.value = isOuter
  order.value.deliveryBase = ''
}

const setMaxQuantity = () => {
  order.value = {
    ...order.value,
    quantity: store.getters.getEditedOrderId ? orderTotalQuantity.value : demand.value.quantity
  }
}

const submitOrder = async () => {
  const {quantity, comment, deliveryBase, assignedTo} = order.value
  if ([quantity, deliveryBase, assignedTo].some(field => !field)) {
    showErrorMessage.value = true
    return
  }
  if (store.getters.getEditedOrderId) {
    await editOrder({
      quantity,
      comment,
      deliveryBase,
      assignedTo
    }, order.value.id)
    if (originalOrderQuantity.value !== quantity) {
      console.log(originalOrderQuantity.value - quantity)
    }
  } else {
    const {unit, id} = demand.value
    const orderBody = {
      ...order.value,
      unit,
      productId: id,
    }
    await addOrder(orderBody)

    await editDemand({
      quantity: demand.value.quantity - orderBody.quantity
    }, demand.value.id)
  }

  await editDemand({
    quantity: demand.value.quantity + (originalOrderQuantity.value - order.value.quantity)
  }, demand.value.id)

  window.location.reload()
}

onMounted(async () => {
  supplyTeam.value = await store.getters.supplyTeam

  const id = store.getters.getPopupContent.data
  const demandRes = await getDemandById(id)
  demand.value = demandRes.data[0]

  orderId.value = store.getters.getEditedOrderId
  if (!orderId.value) {
    order.value = {
      quantity: 0,
      comment: '',
      createdBy: 'pawel',
    }
    return
  }
  const orderRes = await getOrderById(orderId.value)
  const orderById = orderRes.data[0]
  if (!orderById) return
  order.value = orderById
  originalOrderQuantity.value = orderById.quantity
  orderTotalQuantity.value = orderById.quantity + demand.value.quantity

  const totalRes = await getDemandOrders()
  totalDemandOrderQuantity.value = totalRes.map(({quantity}) => quantity).reduce((a, b) => a + b) + demand.value.quantity
  outerDeliverySource.value = !supplyBases.includes(order.value.deliveryBase)
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
.error-message {
  color: red;
}
</style>
