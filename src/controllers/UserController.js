import {makeApiRequest, getApiUrl} from '../utils/apiRequests'

export async function getUserById(id) {
  return await makeApiRequest('get', getApiUrl(`users/${id}`))
}

export async function checkAuth(auth) {
  return await makeApiRequest('post', getApiUrl('users/auth'), {...auth})
}

export async function addUser(user) {
  return await makeApiRequest('post', getApiUrl('users'), {...user})
}
