const express = require('express');
const cors = require('cors');
const connection = require('./db'); // Import the database connection

const app = express();
const port = 3000;

// Enable CORS for all domains (* means any frontend can access)
app.use(cors({
  origin: "*",  // Allow all domains (change this in production for security)
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization"
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
  const { id, name, email, Pnumber, address, password } = req.body;

  if (!id || !name || !email || !Pnumber || !address || !password) {
    return res.status(400).send('All fields (id, name, email, Pnumber, address, password) are required');
  }

  const query = `
    INSERT INTO users (id, name, email, Pnumber, address, password)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [id, name, email, Pnumber, address, password], (err) => {
    if (err) {
      console.error('Error inserting into the database:', err.message);
      return res.status(500).send('Database error');
    }
    res.status(201).send('User added successfully');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
