const express = require('express');
const pgclient = require('../db');
const router = express.Router();

// router.get('/:userId', async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const coach = await pgclient.query('SELECT * FROM coaches WHERE id = $1', [userId]);
//     if (coach.rows.length) return res.json({ ...coach.rows[0], role: 'trainer' });

//     const trainee = await pgclient.query(`
//       SELECT t.*, c.name AS coach_name
//       FROM trainees t
//       LEFT JOIN coaches c ON t.coach_id = c.id
//       WHERE t.id = $1
//     `, [userId]);
//     if (trainee.rows.length) return res.json({ ...trainee.rows[0], role: 'trainee' });

//   } catch (err){
//     console.log(err);
//   }
// });

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