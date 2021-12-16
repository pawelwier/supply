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
        <input @change="setQuantity" type="number" :max="orderTotalQuantity" min="1" v-model="order.quantity" />
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
        <button type="submit">{{store.getters.getEditedOrderId ? 'Edytuj' : 'Utwórz' }}</button>
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
import {addOrder, getOrderById, editOrder, getOrdersByDemandId} from '../../controllers/OrderController'

const demand = ref(null)
const orderId = ref(null)
const order = ref(null)
const orderTotalQuantity = ref(0)
const totalDemandOrderQuantity = ref(0)

const store = useStore()

const getDemandOrders = async () => {
  const res = await getOrdersByDemandId(demand.value.id)
  return res.data
}

const setQuantity = (e) => {
  const demandQuantity = orderTotalQuantity.value
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
    quantity: orderTotalQuantity.value
  }
}

const submitOrder = async () => {

  if (store.getters.getEditedOrderId) {
    const {quantity, comment, deliveryBase, assignedTo} = order.value
    await editOrder({
      quantity,
      comment,
      deliveryBase,
      assignedTo
    }, order.value.id)
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

  window.location.reload()
}

onMounted(async () => {
  const id = store.getters.getPopupContent.data
  const demandRes = await getDemandById(id)
  demand.value = demandRes.data[0]

  orderId.value = store.getters.getEditedOrderId
  if (!orderId.value) {
    // demand.value = {
    //   quantity: null,
    //   assignedTo: null,
    //   deliveryBase: null,
    //   comment: '',
    //   createdBy: 'pawel',
    // }
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
  orderTotalQuantity.value = orderById.quantity + demand.value.quantity

  const totalRes = await getDemandOrders()
  totalDemandOrderQuantity.value = totalRes.map(({quantity}) => quantity).reduce((a, b) => a + b) + demand.value.quantity

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
