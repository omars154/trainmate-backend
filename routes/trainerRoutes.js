const express = require('express');
const pgclient = require('../db');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await pgclient.query(
      'INSERT INTO coaches (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log('Error registering coach:', err);
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pgclient.query('SELECT id, name FROM coaches');
    res.json(result.rows);
  } catch (err) {
    console.log('Error fetching coaches:', err);
  }
});

router.get('/:coachId/users', async (req, res) => {
  const { coachId } = req.params;

  try {
    console.log(`Fetching trainees for coach ID: ${coachId}`);
    
    const result = await pgclient.query(
      'SELECT id, name, age, initials FROM trainees WHERE coach_id = $1',
      [coachId]
    );

    console.log(`Found ${result.rows.length} trainees:`, result.rows);
    
    res.json(result.rows);
  } catch (err) {
    console.log('Error fetching trainees:', err);
  }
});

module.exports = router;