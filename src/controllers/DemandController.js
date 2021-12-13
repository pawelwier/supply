import {makeApiRequest, getApiUrl} from '../utils/apiRequests'

export async function getAllDemands() {
  return await makeApiRequest('get', getApiUrl('demands'))
}

export async function getDemandById(id) {
  return await makeApiRequest('get', getApiUrl(`demands/${id}`))
}

export async function addDemand(demand) {
  return await makeApiRequest('post', getApiUrl('demands'), {...demand})
}

export async function editDemand(demand, id) {
  return await makeApiRequest('put', getApiUrl(`demands/${id}`), {...demand})
}

export async function deleteDemand(id) {
  return await makeApiRequest('delete', getApiUrl(`demands/${id}`))
}
