const express = require('express')
const userRouter = express.Router()

const {
  getAllUsers,
  getUserById,
  validateUser,
  addNewUser,
} = require('../controllers/UserController')

userRouter.get('/', getAllUsers)
userRouter.get('/:id', getUserById)
userRouter.post('/auth', validateUser)
userRouter.post('/', addNewUser)

module.exports = {
  userRouter
}
