const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pgclient = require('./db');
const authRoutes = require('./routes/auth')
const traineeRoutes = require('./routes/traineeRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const usersRoutes = require('./routes/usersRoutes')
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

pgclient.connect()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('Database connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/trainee', traineeRoutes);
app.use('/api/trainer', trainerRoutes);
app.use('/api/users', usersRoutes);

app.get('/', (req, res) => {
  res.send('TrainMate API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//to add this feature we can make the user choose the trainer and send a request to the trainer that this user has sent 
// you a follow do you want to accept him or not? if not view delete buton from dashboard