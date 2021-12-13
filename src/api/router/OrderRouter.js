const {
  getAllOrders,
  addNewOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/OrderController')

const express = require('express')
const orderRouter = express.Router()

orderRouter.get('/', getAllOrders)
orderRouter.post('/', addNewOrder)
orderRouter.put('/:id', updateOrder)
orderRouter.delete('/:id', deleteOrder)

module.exports = {
  orderRouter
}
