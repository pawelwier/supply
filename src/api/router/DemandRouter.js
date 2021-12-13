const {
  getAllDemands,
  getDemandById,
  addNewDemand,
  updateDemand,
  deleteDemand,
} = require('../controllers/DemandController')

const express = require('express')
const demandRouter = express.Router()

demandRouter.get('/', getAllDemands)
demandRouter.get('/:id', getDemandById)
demandRouter.post('/', addNewDemand)
demandRouter.put('/:id', updateDemand)
demandRouter.delete('/:id', deleteDemand)

module.exports = {
  demandRouter
}
