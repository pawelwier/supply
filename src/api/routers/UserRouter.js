const express = require('express')
const userRouter = express.Router()

const {
  getUserById,
  validateUser,
  addNewUser,
} = require('../controllers/UserController')

userRouter.get('/:id', getUserById)
userRouter.post('/auth', validateUser)
userRouter.post('/', addNewUser)

module.exports = {
  userRouter
}
