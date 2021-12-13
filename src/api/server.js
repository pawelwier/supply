const express = require('express')
const cors = require('cors')
const {demandRouter} = require('./router/DemandRouter')
const {orderRouter} = require('./router/OrderRouter')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/demands', demandRouter)
app.use('/api/v1/orders', orderRouter)

app.listen(3000)
