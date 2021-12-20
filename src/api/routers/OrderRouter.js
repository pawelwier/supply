const express = require('express')
const orderRouter = express.Router()

const {
  getAllOrders,
  getOrderById,
  getOrdersByDemandId,
  getOrdersByDemandCategory,
  addNewOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/OrderController')

orderRouter.get('/', getAllOrders)
orderRouter.get('/:id', getOrderById)
orderRouter.get('/category/:category', getOrdersByDemandCategory)
orderRouter.get('/demand/:id', getOrdersByDemandId)
orderRouter.post('/', addNewOrder)
orderRouter.put('/:id', updateOrder)
orderRouter.delete('/:id', deleteOrder)

module.exports = {
  orderRouter
}
