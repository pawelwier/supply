const {connection} = require ('../config/sqlConfig')

const getAllDemands = async (req, res) => {
  const sqlQuery = `SELECT * FROM products`
  await connection.query(sqlQuery, (err, data) => {
    res.json({data})
  })
}

const getDemandsByCategory = async (req, res) => {
  const {category} = req.params
  const sqlQuery = `SELECT * FROM products WHERE category = "${category}"`
  await connection.query(sqlQuery, (err, data) => {
    res.json({data})
  })
}

const getCompleteDemands = async (req, res) => {
  const sqlQuery = `SELECT * FROM products WHERE quantity = "0"`
  await connection.query(sqlQuery, (err, data) => {
    res.json({data})
  })
}

const getDemandById = async (req, res) => {
  const {id} = req.params
  const sqlQuery = `SELECT * FROM products WHERE id = ${id}`
  await connection.query(sqlQuery, (err, data) => {
    res.json({data})
  })
}

const addNewDemand = async (req, res) => {
  const {name, unit, quantity, comment, category} = req.body
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const sqlQuery = `INSERT INTO products (name, unit, quantity, originalQuantity, comment, category, createdBy, createdAt) VALUES ("${name}", "${unit}", ${Number(quantity)}, ${Number(quantity)}, "${comment}", "${category}", "pawel", "${currentDate}")`
  await connection.query(sqlQuery, (err, rows) => {
    res.json({rows})
  })
}

const updateDemand = async (req, res) => {
  const updateString = Object.keys(req.body).map(key => `${key} = "${req.body[key]}"`).join(', ')
  const {id} = req.params
  const sqlQuery = `UPDATE products SET ${updateString} WHERE id = ${id}`
  await connection.query(sqlQuery, (err, rows) => {
    res.json({rows})
  })
}

const deleteDemand = async (req, res) => {
  const {id} = req.params
  const sqlQuery = `DELETE FROM products WHERE id = ${id}`
  await connection.query(sqlQuery, (err, rows) => {
    res.json({rows})
  })
}

module.exports = {
  getAllDemands,
  getCompleteDemands,
  getDemandsByCategory,
  getDemandById,
  addNewDemand,
  updateDemand,
  deleteDemand,
}
