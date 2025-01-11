const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "",
  password: "",
  database: "",
});

module.exports = {
  pool,
};
