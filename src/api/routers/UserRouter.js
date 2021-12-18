const {
  getUserById,
  ValidateUser,
  addNewUser,
} = require('../controllers/UserController')

const express = require('express')
const userRouter = express.Router()

userRouter.get('/:id', getUserById)
userRouter.post('/auth', ValidateUser)
userRouter.post('/', addNewUser)

module.exports = {
  userRouter
}
