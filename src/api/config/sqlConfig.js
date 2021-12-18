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

// demands
CREATE TABLE supply.Demands (
	id BIGINT UNSIGNED auto_increment not null primary key,
	name varchar(100) NULL,
	unit varchar(100) NULL,
	quantity BIGINT UNSIGNED NULL,
	originalQuantity BIGINT UNSIGNED NULL,
	comment varchar(100) NULL,
	createdBy varchar(100) NULL,
	createdAt DATETIME NULL,
	orderStartedAt DATETIME NULL,
	orderFinishedAt DATETIME NULL,
	category varchar(100) NULL
	isUrgent bool
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

// orders
CREATE TABLE supply.Orders (
	id BIGINT UNSIGNED auto_increment not null primary key,
	productId bigint unsigned NULL,
	unit varchar(100) NULL,
	quantity INT UNSIGNED NULL,
	comment varchar(100) NULL,
	createdBy varchar(100) NULL,
	createdAt DATETIME NULL,
	assignedTo varchar(100) NULL,
	orderStartedAt DATETIME NULL,
	orderFinishedAt DATETIME NULL,
	status varchar(100) null,
	deliveryBase varchar(100) null,
	FOREIGN KEY (productId) REFERENCES products(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

// users
CREATE TABLE supply.users (
	id BIGINT UNSIGNED auto_increment primary key NOT NULL,
	name varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	phoneNumber INT UNSIGNED NULL,
	password varchar(100) NOT NULL,
	createdAt DATETIME NOT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


* */
