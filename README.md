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

- Currently, all features I originally planned have been implemented.
- For future improvements, I’ve considered:
  - Adding two separate leaderboards (all-time and weekly)
  - Allowing backspace/escape to cancel the current word lock
  - Clearing the screen after a missed word to give the player a chance to recover
  - Slightly reducing the difficulty, as the game feels a bit too hard in its current state

---

## Technologies / Libraries Used

Frontend:
- React (Vite)
- JavaScript
- motion/react for animations

Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)

Deployment:
- Render (frontend and backend)
- MongoDB Atlas (database)

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

This was an individual project, and I was responsible for all aspects of development.

My work included:

- Building the core gameplay loop and typing mechanics
- Implementing the combo and scoring systems
- Creating dynamic difficulty scaling and lane progression
- Developing the audio system with sound effects and background music
- Integrating a MongoDB leaderboard using a backend API
- Deploying the full application using Render
- Managing environment variables and production setup
- Debugging and refining gameplay and overall feel

Progress was made consistently throughout the project, which is reflected in regular commits and feature updates.

---

## Notes on Work Gaps

There were no significant gaps in development longer than four days. I worked on the project regularly and typically pushed updates once I felt features were complete and stable.
