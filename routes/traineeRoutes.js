const express = require('express');
const pgclient = require('../db');
const router = express.Router();

// Register Trainee
router.post('/trainees/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await pgclient.query(
      'INSERT INTO trainees (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

// Get user (trainee or coach) by email
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  let user = await pgclient.query('SELECT * FROM trainees WHERE email = $1', [email]);
  if (user.rows.length) {
    if (user.rows[0].password === password) {
      return res.json({ id: user.rows[0].id, role: 'trainee', name: user.rows[0].name });
    }
  }

  user = await pgclient.query('SELECT * FROM coaches WHERE email = $1', [email]);
  if (user.rows.length) {
    if (user.rows[0].password === password) {
      return res.json({ id: user.rows[0].id, role: 'trainer', name: user.rows[0].name });
    }
  }
  res.json({ error: 'Invalid email or password' });
});


// Get workouts by user
router.get('/users/:userId/workouts', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pgclient.query(
      'SELECT * FROM exercises WHERE trainee_id = $1',
      [userId]
    );
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const formatted = Object.fromEntries(days.map(day => [day, []]));

    result.rows.forEach(row => {
      formatted[row.day]?.push({
        id: row.id,
        name: row.name,
        bodyPart: row.body_part,
        equipment: row.equipment,
        target: row.target,
      });
    });

    res.json(formatted);
  } catch (err){
    console.log(err);
  }
});

// Add exercise
router.post('/users/:userId/workouts/:day/exercises', async (req, res) => {
  const { userId, day } = req.params;
  const { exerciseId, exerciseName, bodyPart, equipment, target } = req.body;

  try {
    const result = await pgclient.query(
      'INSERT INTO exercises (trainee_id, day, name, body_part, equipment, target) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, day, exerciseName, bodyPart, equipment, target]
    );

    const ex = result.rows[0];
    res.json({
      id: ex.id,
      name: ex.name,
      bodyPart: ex.body_part,
      equipment: ex.equipment,
      target: ex.target,
    });
  } catch (err){
    console.log(err);
  }
});

// Delete exercise
router.delete('/users/:userId/workouts/:day/exercises/:exerciseId', async (req, res) => {
  const { exerciseId } = req.params;
  try {
    const result = await pgclient.query('DELETE FROM exercises WHERE id = $1 RETURNING *', [exerciseId]);
    if (!result.rows.length) return res.json({ error: 'Exercise not found' });

    res.json({ message: 'Exercise deleted' });
  } catch (err){
    console.log(err);
  }
});

// Get user profile
router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const coach = await pgclient.query('SELECT * FROM coaches WHERE id = $1', [userId]);
    if (coach.rows.length) return res.json({ ...coach.rows[0], role: 'trainer' });

    const trainee = await pgclient.query(`
      SELECT t.*, c.name AS coach_name
      FROM trainees t
      LEFT JOIN coaches c ON t.coach_id = c.id
      WHERE t.id = $1
    `, [userId]);
    if (trainee.rows.length) return res.json({ ...trainee.rows[0], role: 'trainee' });

    res.json({ error: 'User not found' });
  } catch (err){
    console.log(err);
  }
});

// Get all coaches
router.get('/coaches', async (req, res) => {
  try {
    const result = await pgclient.query('SELECT id, name FROM coaches');
    res.json(result.rows);
  } catch (err){
    console.log(err);
  }
});

// Update user
router.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, height, weight, coach_id, phone } = req.body;

  try {
    const fields = [];
    const values = [];
    let idx = 1;
    
    if (height !== undefined) fields.push(`height = $${idx++}`), values.push(height);
    if (weight !== undefined) fields.push(`weight = $${idx++}`), values.push(weight);
    if (coach_id !== undefined) fields.push(`coach_id = $${idx++}`), values.push(coach_id);
    if (phone !== undefined) fields.push(`phone = $${idx++}`), values.push(phone);

    values.push(userId);
    const isCoach = phone !== undefined;
    const table = isCoach ? 'coaches' : 'trainees';
    const result = await pgclient.query(
      `UPDATE ${table} SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    );

    res.json({ ...result.rows[0], role: isCoach ? 'trainer' : 'trainee' });
  } catch (err){
    console.log(err);
  }
});

module.exports = router;
