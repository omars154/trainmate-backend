const express = require('express');
const pgclient = require('../db');
const router = express.Router();

// Get workouts by user
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

// Get all coaches
router.get('/coaches', async (req, res) => {
  try {
    const result = await pgclient.query('SELECT id, name FROM coaches');
    res.json(result.rows);
  } catch (err){
    console.log(err);
  }
});


module.exports = router;
