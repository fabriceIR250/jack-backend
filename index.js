const express = require('express');
const connection = require('./db'); // Import the database connection
const app = express();
const port = 3000;

app.use(express.json());


app.get('/user', (req, res) => {
  // Query the database to select all rows from the 'users' table
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err.message);
      return res.status(500).send('Database error');
    }
    res.json(results); // Send the results as a JSON response
  });
});

app.post('/users', (req, res) => {
  const { id, name, email, Pnumber, address, password } = req.body;
  if (!id || !name || !email || !Pnumber || !address || !password) {
    return res.status(400).send('All fields (id, name, email, Pnumber, address, password) are required');
  }

  const query = `
    INSERT INTO users (id, name, email, Pnumber, address, password)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [id, name, email, Pnumber, address, password], (err, results) => {
    if (err) {
      console.error('Error inserting into the database:', err.message);
      return res.status(500).send('Database error');
    }
    res.status(201).send('User added successfully');
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
