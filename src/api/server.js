const express = require('express')
const cors = require('cors')
const {demandRouter} = require('./routers/DemandRouter')
const {orderRouter} = require('./routers/OrderRouter')
const {userRouter} = require('./routers/UserRouter')
const {verifyUser} = require('./auth/auth')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.use(verifyUser)

app.use('/api/v1/demands', demandRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/users', userRouter)

app.listen(3000)
