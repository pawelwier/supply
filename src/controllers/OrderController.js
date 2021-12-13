import {makeApiRequest, getApiUrl} from '../utils/apiRequests'

export async function getAllOrders() {
  return await makeApiRequest('get', getApiUrl('orders'))
}

export async function getOrdersByDemandId(id) {
  return await makeApiRequest('get', getApiUrl(`orders/demand/${id}`))
}

export async function getOrdersByCategory(category) {
  return await makeApiRequest('get', getApiUrl(`orders/category/${category}`))
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
