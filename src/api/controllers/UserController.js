const {connection} = require ('../config/sqlConfig')

const getUserById = async (req, res) => {
  const {id} = req.params
  const sqlQuery = `SELECT * FROM users WHERE id = ${id}`
  await connection.query(sqlQuery, (err, data) => {
    res.json({data})
  })
}

const validateUser = async (req, res) => {
  const {name, password} = req.body
  const sqlQuery = `SELECT * FROM users WHERE name = "${name}" AND password = "${password}"`
  await connection.query(sqlQuery, (err, data) => {
    if (!data.length) {
      res.json({
        error: 'nieprawidłowe dane logowania'
      })
      return
    }
    res.json({data})
  })
}

const addNewUser = async (req, res) => {
  const {name, password, email, phoneNumber} = req.body
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const sqlQuery = `INSERT INTO users (name, email, phoneNumber, password, createdAt) VALUES ("${name}", "${email}", "${Number(phoneNumber)}", "${password}", "${currentDate}")`
  await connection.query(sqlQuery, (err, rows) => {
    res.json({rows})
  })
}

module.exports = {
  getUserById,
  validateUser,
  addNewUser,
}
