import axios from "axios"
require('dotenv').config()

export const makeApiRequest = async (method, url, data) => {
  const response = await axios({
    method,
    url,
    data,
  })
  return response.data
}

export const getApiUrl = url => `${process.env.VUE_APP_API_HOST}/${url}`
