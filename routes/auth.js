const express = require('express');
const pgclient = require('../db');
const router = express.Router();

router.post('/trainee/register', async (req, res) => {
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

router.post('/trainer/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await pgclient.query(
      'INSERT INTO coaches (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await pgclient.query('SELECT * FROM trainees WHERE email = $1', [email]);
    if (user.rows.length && user.rows[0].password === password) {
      return res.json({ id: user.rows[0].id, role: 'trainee', name: user.rows[0].name });
    }

    user = await pgclient.query('SELECT * FROM coaches WHERE email = $1', [email]);
    if (user.rows.length && user.rows[0].password === password) {
      return res.json({ id: user.rows[0].id, role: 'trainer', name: user.rows[0].name });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
