# TrainMate Backend (Express + PostgreSQL)

This is the **backend** for the TrainMate fitness application. It provides APIs for user authentication, profiles, and managing workout plans between trainers and trainees.

---

## Tech Stack

- Node.js + Express  
- PostgreSQL (`pg`)  
- CORS, Morgan, Dotenv

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
cd trainmate-server
npm install

# 2. Create a PostgreSQL database (e.g., trainmate)

# 3. Setup schema
psql -d trainmate -f schema.sql

# 4. Start the server
node server.js

## 🗂️ Project Structure
```
trainmate-server/
├── routes/
│ ├── auth.js # signup & login
│ ├── traineeRoutes.js # admin CRUD
│ └── traineroutes.js # cart endpoints
├── schema.sql # DB schema
├── db.js # pg client
└── server.js # app entry
```

## 📡 API Endpoints

The API will run on: http://localhost:5000

### 🔐 Auth Routes

**Base URL**: `/api/auth`

| Method | Endpoint     | Description        |
|--------|--------------|--------------------|
| POST   | `/signup`    | Register new user  |
| POST   | `/login`     | Log in existing user |


#### POST `/api/auth/signup`

Registers a new user (admin or user role).

```json
{
  "email": "johndoe@gmail.com",
  "password": "123456",
  "role": "admin"
}
```

#### POST /api/auth/login

Logs in an existing user.
```json
{
  "email": "johndoe@gmail.com",
  "password": "123456"
}
```

### 📦 trainee Routes

**Base URL**: `/api/trainee`

| Method | Endpoint     | Description        |
|--------|--------------|--------------------|
| GET    | `/:userId/workouts`          | Get workouts by user  |
| POST   | `/:userId/workouts/:day/exercises`          | Add exercises |
| PUT    | `/:userId`       | Update user profile |
| DELETE | `/:userId/workouts/:day/exercises/:exerciseId`       | Delete exercise by id |
| GET | `/coaches`       | Get trainee coach |
| GET | `/:userId`       | Get user profile |

#### 🔸 GET /api/trainee/:userId/workouts
```json
[
  {
  "Monday": [
    {
      "id": 101,
      "name": "Push Up",
      "bodyPart": "chest",
      "equipment": "body weight",
      "target": "pectorals"
    }
  ]
}
]
```

#### 🔸 POST /api/users/:userId/workouts/:day/exercises
```json
[
    {
    "exerciseId": 1,
    "exerciseName": "Push Up",
    "bodyPart": "chest",
    "equipment": "body weight",
    "target": "pectorals"
    }

]
```

#### 🔸 DELETE /api/users/:userId/workouts/:day/exercises/:exerciseId
```json
[
    {
        "message": "Exercise deleted"
    }
]
```

#### 🔸 GET /api/users/:userId
```json
[
    {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "height": 175,
        "weight": 70,
        "coach_id": 2,
        "coach_name": "Coach Mike",
        "role": "trainee"
    }

]
```

#### 🔸 PUT /api/users/:userId
```json
[
    {
        "name": "John Doe",
        "height": 180,
        "weight": 75,
        "coach_id": 2
    }
]
```

#### 🔸 GET /api/coaches
```json
[
    [
    {
        "id": 2,
        "name": "Coach Mike"
    },
    {
        "id": 3,
        "name": "Coach Sarah"
    }
    ]
]
```

### 🧑‍🏫 Trainer Routes

**Base URL**: `/api/trainer`

| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| POST   | `/register`             | Register a new coach               |
| GET    | `/`                     | Get all coaches                    |
| GET    | `/:coachId/users`       | Get trainees assigned to a coach   |

#### 🔸 GET /api/trainer
```json
[
    {
        "id": 2,
        "name": "Coach Sarah"
    }
]
```
#### 🔸 GET /api/trainer/:coachId/users
```json
[
    {
    "id": 102,
    "name": "Jane Trainee",
    "age": 25,
    "initials": "JT"
  }
]
```