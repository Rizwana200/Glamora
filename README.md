# 💇 Style Up Studio

A full-stack salon management system built using React, Node.js, Express.js and MySQL.

The application allows customers to explore services, book appointments, and provides an admin dashboard to manage salon operations.

## 🚀 Features

- Customer authentication
- Service browsing
- Appointment booking
- Admin dashboard
- Service CRUD management
- Appointment status management

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Bootstrap
- Axios

### Backend
- Node.js
- Express.js
- MySQL
- bcrypt
- JWT-style token handling
- dotenv

## Project Structure

```text
client/        # React frontend
server/        # Express backend
```

## Prerequisites

Make sure you have installed:
- Node.js
- npm
- MySQL

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd StyleUpStudio
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

## Environment Variables

Create a `.env` file inside the server folder with your database and app settings.

Example:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=styleup_studio
JWT_SECRET=your_secret_key
```

## Running the Project

### Start the backend

```bash
cd server
npm start
```

### Start the frontend

```bash
cd client
npm run dev
```

The frontend will usually run at:
- http://localhost:5173

The backend will run at:
- http://localhost:5000

## Database Setup

Create a MySQL database named `styleup_studio` and make sure the tables required by the application exist.

If your project uses an `admins` table, make sure it includes at least:
- `admin_id`
- `name`
- `email`
- `password`

## Admin Access

To access the admin panel, you need an admin account already present in the database or created through the admin creation flow.

## Notes

This project is a great full-stack learning project and can be improved further with:
- better UI polish
- stronger validation
- deployment to cloud platforms
- test coverage

## License

This project is for educational and personal development purposes.
