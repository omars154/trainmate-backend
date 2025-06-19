const express = require('express');
const pgclient = require('../db');
const router = express.Router();

router.get('/:userId/workouts', async (req, res) => {
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

router.get('/coaches', async (req, res) => {
  try {
    const result = await pgclient.query('SELECT id, name FROM coaches');
    res.json(result.rows);
  } catch (err){
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pgclient.query('SELECT * FROM trainees WHERE id = $1', [id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Trainee not found' });

    res.json({ ...result.rows[0], role: 'trainee' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
