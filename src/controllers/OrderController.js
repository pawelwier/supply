import {makeApiRequest, getApiUrl} from '../utils/apiRequests'

export async function getAllOrders() {
  return await makeApiRequest('get', getApiUrl('orders'))
}

export async function getOrderById(id) {
  return await makeApiRequest('get', getApiUrl(`orders/${id}`))
}

export async function addOrder(order) {
  return await makeApiRequest('post', getApiUrl('orders'), {...order})
}

export async function editOrder(order, id) {
  return await makeApiRequest('put', getApiUrl(`orders/${id}`), {...order})
}

export async function deleteOrder(id) {
  return await makeApiRequest('delete', getApiUrl(`orders/${id}`))
}
