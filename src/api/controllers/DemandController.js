const {connection} = require ('../config/sqlConfig')

connection.connect();

const getAllDemands = async (req, res) => {
  const sqlQuery = `SELECT * FROM products`
  await connection.query(sqlQuery, (err, data) => {
    res.json({data})
  })
}

const addNewDemand = async (req, res) => {
  const {name, unit, quantity, comment, createdBy, assignedTo} = req.body
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const sqlQuery = `INSERT INTO products (name, unit, quantity, comment, createdBy, assignedTo, status, createdAt) VALUES ("${name}", "${unit}", ${Number(quantity)}, "${comment}", "${createdBy}", "${assignedTo}", "new", "${currentDate}")`
  await connection.query(sqlQuery, (err, rows) => {
    res.json({rows})
  })
}

const updateDemand = async (req, res) => {
  const field = Object.keys(req.body)
  const value = req.body[field]
  const {id} = req.params
  const sqlQuery = `UPDATE products SET ${field} = "${value}" WHERE id = ${id}`
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
  addNewDemand,
  updateDemand,
  deleteDemand,
}
