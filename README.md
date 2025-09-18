# DevSync

DevSync is a Slack-inspired mobile collaboration app built with React Native (Expo) for the frontend and Spring Boot with PostgreSQL for the backend.  
It replicates all core Slack features while introducing improvements for modern team workflows.

---

## Features

### Frontend (React Native + Expo)
- User authentication (JWT + secure storage)
- Channel messaging with threads and replies
- Direct messages (DMs)
- Search and jump to channels or DMs
- Profile sidebar and settings
- Real-time updates via WebSocket
- Modern UI/UX with the following primary colors:
  - Purple: #97689a
  - Beige: #e3ac88

### Backend (Spring Boot + PostgreSQL)
- User authentication with JWT and Spring Security
- Channel and direct message management
- PostgreSQL database for persistence
- WebSocket integration for real-time chat
- RESTful APIs for frontend consumption

---

## Project Structure

```

DevSync-App/
├── frontend/   # React Native (Expo Router) mobile app
└── backend/    # Spring Boot + PostgreSQL API

````

---

## Tech Stack

### Frontend
- React Native with Expo Router
- TypeScript
- WebSockets
- Tailwind CSS and Shadcn components

### Backend
- Spring Boot
- PostgreSQL
- Spring Security with JWT
- Maven
- Firebase

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/jaalvin/DevSync-App.git
cd DevSync-App
````

### 2. Frontend Setup (React Native)

```bash
cd frontend
npm install
npx expo start
```

This runs the app on Expo Go (Android/iOS) or a simulator.

### 3. Backend Setup (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

* Ensure PostgreSQL is running locally.
* Update `application.properties` with your database credentials.

---

## Improvements Over Slack

* Lightweight mobile-first design
* Customizable themes
* Optimized for low-bandwidth environments
* Simplified onboarding for new teams

---

## License

MIT License © 2025 DevSync
