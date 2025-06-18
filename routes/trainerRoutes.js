const express = require('express');
const pgclient = require('../db');
const router = express.Router();

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

router.post('/:userId/workouts/:day/exercises', async (req, res) => {
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

router.delete('/:userId/workouts/:day/exercises/:exerciseId', async (req, res) => {
  const { exerciseId } = req.params;
  try {
    const result = await pgclient.query('DELETE FROM exercises WHERE id = $1 RETURNING *', [exerciseId]);
    if (!result.rows.length) return res.json({ error: 'Exercise not found' });

    res.json({ message: 'Exercise deleted' });
  } catch (err){
    console.log(err);
  }
});

module.exports = router;