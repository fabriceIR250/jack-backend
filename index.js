  const express = require('express');
  const cors = require('cors');
  const connection = require('./db'); // Import the database connection

  const app = express();
  const port = 3000;

  // Enable CORS for all domains (* means any frontend can access)
  app.use(cors({
    origin: "*",  // Allow all domains (change this in production for security)
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type,Authorization"
  }));

  app.use(express.json());

  // Get all users
  app.get('/user', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error('Error querying the database:', err.message);
        return res.status(500).send('Database error');
      }
      res.json(results);
    });
  });

  // Add a new user
  app.post('/users', (req, res) => {
    const { name, email, Pnumber, address, password } = req.body; // Remove id
  
    if (!name || !email || !Pnumber || !address || !password) { // Remove id check
      return res.status(400).send('All fields (name, email, Pnumber, address, password) are required');
    }
  
    const query = `
      INSERT INTO users (name, email, Pnumber, address, password)  // Remove id from query
      VALUES (?, ?, ?, ?, ?)
    `;
  
    connection.query(query, [name, email, Pnumber, address, password], (err) => { // Remove id from values
      if (err) {
        console.error('Error inserting into the database:', err.message);
        return res.status(500).send('Database error');
      }
      res.status(201).send('User added successfully'); // Or send back the new user data
    });
  });
  // Start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
