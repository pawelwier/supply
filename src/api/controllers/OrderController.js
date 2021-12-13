const {connection} = require('../config/sqlConfig')

const getAllOrders = async (req, res) => {
  const sqlQuery = `SELECT * FROM orders`
  await connection.query(sqlQuery, (err, data) => {
    res.json({data})
  })
}

const getOrdersByDemandCategory = async (req, res) => {
  const {category} = req.params
  const sqlQuery = `SELECT a.* FROM orders a INNER JOIN products b on a.productId=b.id WHERE b.category = "${category}"`
  await connection.query(sqlQuery, (err, data) => {
    res.json({data})
  })
}

const getOrdersByDemandId = async (req, res) => {
  const {id} = req.params
  const sqlQuery = `SELECT * FROM orders WHERE productId = "${id}"`
  await connection.query(sqlQuery, (err, data) => {
    res.json({data})
  })
}

const addNewOrder = async (req, res) => {
  const {productId, quantity, comment, createdBy, assignedTo, deliveryBase} = req.body
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const sqlQuery = `INSERT INTO orders (productId, quantity, comment, createdBy, assignedTo, deliveryBase, status, createdAt) VALUES ("${Number(productId)}", ${Number(quantity)}, "${comment}", "${createdBy}", "${assignedTo}", "${deliveryBase}", "nowy", "${currentDate}")`
  await connection.query(sqlQuery, (err, rows) => {
    res.json({rows})
  })
}

const updateOrder = async (req, res) => {
  const field = Object.keys(req.body)
  const value = req.body[field]
  const {id} = req.params
  const sqlQuery = `UPDATE orders SET ${field} = "${value}" WHERE id = ${id}`
  await connection.query(sqlQuery, (err, rows) => {
    res.json({rows})
  })
}

const deleteOrder = async (req, res) => {
  const {id} = req.params
  const sqlQuery = `DELETE FROM order WHERE id = ${id}`
  await connection.query(sqlQuery, (err, rows) => {
    res.json({rows})
  })
}

module.exports = {
  getAllOrders,
  getOrdersByDemandId,
  getOrdersByDemandCategory,
  addNewOrder,
  updateOrder,
  deleteOrder,
}
