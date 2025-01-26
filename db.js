const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Exit the application if the connection fails
  } else {
    console.log('Connected to the MySQL database!');
  }
});

module.exports = connection;
