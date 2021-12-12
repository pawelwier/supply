const path = require('path')
const mysql = require('mysql')
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })

const connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
});

module.exports = {
  connection,
}

/*
CREATE TABLE supply.Products (
	id BIGINT UNSIGNED auto_increment not null primary key,
	name varchar(100) NULL,
	unit varchar(100) NULL,
	quantity BIGINT UNSIGNED NULL,
	comment varchar(100) NULL,
	createdBy varchar(100) NULL,
	createdAt DATETIME NULL,
	assignedTo varchar(100) NULL,
	orderStartedAt DATETIME NULL,
	orderFinishedAt DATETIME NULL,
	status varchar(100) NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

* */
