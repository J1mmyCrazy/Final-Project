# Typing Survival

Typing Survival is a real-time typing game where players eliminate incoming words by typing them correctly. The game increases in difficulty over time with faster speeds, more lanes, and longer words.

---

## What functionality is present

- Real-time typing gameplay (no input box, direct key detection)
- Enemy system with words moving across lanes
- Dynamic difficulty progression (Easy → Medium → Hard)
- Lane system that expands from 1 to 3 lanes based on performance
- Combo system that increases for perfect words and resets instantly on mistakes
- Score system based on difficulty, combo, words destroyed, and time survived
- Sound system including:
  - Correct key sound
  - Incorrect key sound
  - Word completion sound
  - Miss sound
  - Background music with playlist and crossfading
- Main menu and intro screen to enable audio playback
- Leaderboard system:
  - Stores scores in MongoDB
  - Fetches and displays top 10 scores
- Full deployment:
  - Frontend hosted on Render
  - Backend hosted on Render
  - Database hosted on MongoDB Atlas

---

## What is still missing

- Currently all features that I wanted are implemented.
- As for future works there are some things i've consisdered
  - Adding 2 seperate leaderboards, all time and weekly
  - aloww backspace/esc to cancel spelling a word you're locked onto
  - if you miss a word it clear the page to give a chance to recover rather than just continueing
  - Nerfing the difficulty a liltte, I currently believe the game is a little too hard in its current state

---

## Technologies / Libraries Used

Frontend:
- React/Vite
- JavaScript 
- motion/react for animations

Backend:
- Node.js
- Express.js
- MongoDB/Mongoose

Deployment:
- Render for frontend and backend
- MongoDB Atlas for database

Other:
- HTML Audio API for sound and music system
- Git and GitHub for version control

---

## How to download and run the project

1. Go to the GitHub repository:
https://github.com/J1mmyCrazy/Final-Project

2. Click the green **Code** button and copy the HTTPS link.

3. Open a terminal and run:

git clone https://github.com/J1mmyCrazy/Final-Project.git  
cd Final-Project/typing-survival  

4. Install frontend dependencies:

npm install  

---

**Optional (Backend Setup):**  
Steps 5–7 are only required if you want to run the backend locally for leaderboard functionality.  
You will need your own MongoDB connection string.

---

5. Install backend dependencies:

cd backend  
npm install  

6. Create a `.env` file inside the backend folder:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  

7. Start the backend:

node server.js  

---

8. Start the frontend (from typing-survival folder in a new terminal):

npm run dev  

9. Open the app in your browser:

http://localhost:5173  

---

**Note:**  
The game will run locally without the backend.  
The backend is only required for leaderboard functionality.

---

## Individual Contribution / Work Summary

I was responsible for implementing the full functionality of the project, including both frontend and backend systems.

Key contributions include:

- Designing and building the core gameplay loop
- Implementing the combo and scoring system
- Creating dynamic difficulty scaling and lane progression
- Developing a custom audio system with sound effects and music crossfading
- Integrating a MongoDB leaderboard with a backend API
- Deploying the full application using Render
- Managing environment variables and production setup
- Debugging gameplay systems and improving overall game feel

Progress was made consistently throughout the project, with commits showing ongoing development in gameplay, UI, audio, backend integration, and deployment.

---

## Notes on Work Gaps

There were no significant gaps in development longer than four days. I worked on it everyday and pushed once a week my changes when I felt they were ready.
