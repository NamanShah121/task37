# Workout Budyyy Assignment
This project has a simple Express and MongoDB backend and a React frontend.

# Folder structure
backend`
frontend`

## How to run backend

1. Open terminal in `backend`
2. Install packages:
   - `npm.cmd install`
3. Create a `.env` file using `.env.example`
4. Add your MongoDB Atlas connection string in `MONGO_URI`
5. Start backend:
   - `npm.cmd run dev`

Backend runs on `http://localhost:4000`

## How to run frontend

1. Open terminal in `frontend`
2. Install packages:
   - `npm.cmd install`
3. Optional: create `.env` and add:
   - `VITE_API_URL=http://localhost:4000`
3. Start frontend:
   - `npm.cmd run dev`

Frontend usually runs on `http://localhost:5173`

## APIs made

- `GET /api/workouts`
- `POST /api/workouts`
- `DELETE /api/workouts/:id`

## Render deploy idea

- Deploy `backend` as a Web Service
- Deploy `frontend` as a Static Site
- In frontend environment variables set `VITE_API_URL` to your backend Render URL
