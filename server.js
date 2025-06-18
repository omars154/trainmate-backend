const express = require('express');
const cors = require('cors'); // Add this if you don't have it
const dotenv = require('dotenv');
const pgclient = require('./db');

const traineeRoutes = require('./routes/traineeRoutes');
const trainerRoutes = require('./routes/trainerRoutes');

dotenv.config();

const app = express();

// Enable CORS for frontend communication
app.use(cors());
app.use(express.json());

// Connect to PostgreSQL
pgclient.connect()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('Database connection error:', err));

// Routes - Fixed the mounting paths
app.use('/api', traineeRoutes); // This handles /api/users/:userId/workouts
app.use('/api/coaches', trainerRoutes);  // This handles /api/coaches/:coachId/users

// Root route
app.get('/', (req, res) => {
  res.send('TrainMate API Running');
});

// Debug route to check all users
app.get('/debug/users', async (req, res) => {
  try {
    const result = await pgclient.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));