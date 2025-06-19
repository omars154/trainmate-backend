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
    let parameterIndex  = 1; //This to make sure for every value added is in right order

    if (height !== undefined) fields.push(`height = $${parameterIndex++}`), values.push(height);
    if (weight !== undefined) fields.push(`weight = $${parameterIndex++}`), values.push(weight);
    if (coach_id !== undefined) fields.push(`coach_id = $${parameterIndex++}`), values.push(coach_id);
    if (phone !== undefined) fields.push(`phone = $${parameterIndex++}`), values.push(phone);
    if (name !== undefined) fields.push(`name = $${parameterIndex++}`), values.push(name);

    values.push(userId);

    const setCommas = fields.join(', '); //updating values need (,) 
    const table = phone !== undefined ? 'coaches' : 'trainees';

    const result = await pgclient.query(
      `UPDATE ${table} SET ${setCommas} WHERE id = $${parameterIndex} RETURNING *`,
      values
    );
    res.json({ ...result.rows[0], role: table === 'coaches' ? 'trainer' : 'trainee' });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;