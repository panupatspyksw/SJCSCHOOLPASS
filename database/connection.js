

var mysql = require('mysql2');
var connection = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    socketPath: `/cloudsql/${process.env.INSTANCE_CONECTION_NAME}`
});

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log("Database Connect Successfully")
});

module.exports = connection;

