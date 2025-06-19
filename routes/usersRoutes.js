const express = require('express');
const pgclient = require('../db');
const router = express.Router();

//Updates a user’s profile fields 
router.put('/:userId', async (req, res) => {
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