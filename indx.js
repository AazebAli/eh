require('dotenv').config();  // Load environment variables
const express = require('express');
const pool = require('./db'); // Database connection pool

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors()); // Enable CORS for all origins
app.use(express.json({ limit: '10MB' })); // This needs to be above your routes

// Get request to test connection
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // Query to check DB connection
    res.json({
      message: 'Connected to PostgreSQL!',
      time: result.rows[0].now
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register route to handle user sign-up
app.post('/register', async (req, res) => {
  console.log(req.body); // Debugging to see the request body

  const { name, email, password, phone } = req.body; // Destructure input fields

  try {
    // Inserting user data into PostgreSQL database
    await pool.query(
      'INSERT INTO users(name, email, password, phone) VALUES($1, $2, $3, $4)',
      [name, email, password, phone]
    );
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route to handle user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email=$1 AND password=$2',
      [email, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0]; // get user data from DB
      res.json({ message: 'Login successful', user: {
          id: user.user_id,   // Make sure your column is named `user_id`
          name: user.name,
          email: user.email
        } }); // send it in response
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Route to add a product
app.post('/add-product', (req, res) => {
  const {
    seller_id,
    product_name,
    starting_price,
    image_url,
    end_time,
    start_time
  } = req.body;

  pool.query(
    'INSERT INTO products (seller_id, product_name, starting_price, IMG_url, end_time, start_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING product_id',
    [seller_id, product_name, starting_price, image_url, end_time, start_time]
  )
  .then(result => {
    const productId = result.rows[0].product_id;
    res.status(200).json({
      message: 'Product added successfully',
      product_id: productId
    });
  })
  .catch(err => {
    console.error('Error adding product:', err.message);
    res.status(500).json({ error: 'Failed to add product' });
  });
});

app.post('/submit-problem', async (req, res) => {
  const { name, email, contact, problem } = req.body;

  try {
    await pool.query(
      'INSERT INTO problem (email, name, contact, problem) VALUES ($1, $2, $3, $4)',
      [name, email, contact, problem]
    );
    res.json({ message: 'Query submitted successfully' });
  } catch (err) {
    console.error('Error inserting problem:', err.message);
    res.status(500).json({ error: 'Failed to submit query' });
  }
  
});
app.post('/create-auction', (req, res) => {
  const { prod_id, start_time, end_time } = req.body;

  if (!prod_id || !start_time || !end_time) {
    return res.status(400).json({ error: 'Missing auction details' });
  }

  pool.query(
    'INSERT INTO auction (prod_id, start_time, end_time) VALUES ($1, $2, $3)',
    [prod_id, start_time, end_time]
  )
  .then(() => {
    res.status(200).json({ message: 'Auction created successfully' });
  })
  .catch(err => {
    console.error('Error creating auction:', err.message);
    res.status(500).json({ error: 'Failed to create auction' });
  });
});
app.get('/get-auctions', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.product_name,
        p.starting_price,
        p.img_url,
        a.end_time
      FROM auction a
      JOIN products p ON a.prod_id = p.product_id
      ORDER BY a.end_time ASC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching auctions:', err.message);
    res.status(500).json({ error: 'Failed to retrieve auctions' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
