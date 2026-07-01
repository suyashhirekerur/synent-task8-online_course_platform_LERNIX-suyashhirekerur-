# Lernix - Online Course Platform

Welcome to the **Lernix** repository. Lernix is a comprehensive, full-stack online course platform designed to facilitate seamless learning and teaching experiences. This application provides robust features for both students and administrators, including user authentication, course enrollment, video lecture delivery, payment processing, and administrative dashboards.

## 🌟 Key Features

### For Students
*   **User Authentication**: Secure signup, login, email verification, password reset, and forgot password functionalities using JWT and bcrypt.
*   **Course Catalog**: Browse available courses with detailed descriptions.
*   **Secure Payments**: Seamless integration with Razorpay for secure course purchasing.
*   **Dashboard & Progress Tracking**: Personalized dashboard to track enrolled courses and learning progress.
*   **Lecture Viewer**: Dedicated interface to watch course lectures.
*   **Profile Management**: View and manage account details.

### For Administrators
*   **Admin Dashboard**: Centralized hub for platform statistics and management.
*   **Course Management**: Create, update, and manage courses and their respective lectures.
*   **User Management**: Monitor and manage registered users on the platform.

## 🛠️ Technology Stack

This project is built using the MERN stack along with modern libraries and tools.

### Frontend
*   **Framework**: React (v19) with Vite
*   **Routing**: React Router DOM
*   **Styling**: Custom CSS
*   **Icons**: React Icons
*   **Notifications**: React Hot Toast
*   **Security**: React Google reCAPTCHA
*   **HTTP Client**: Axios

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (via Mongoose)
*   **Authentication**: JSON Web Tokens (JWT) & bcrypt
*   **Payment Gateway**: Razorpay (Test Mode)
*   **File Handling**: Multer
*   **Email Services**: Nodemailer

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:
*   **Node.js**: Installed on your local machine (v18+ recommended).
*   **MongoDB**: A running instance of MongoDB (local or Atlas).
*   **Razorpay Account**: For generating test/live API keys for payments.
*   **Email Provider**: An SMTP server or service (like Gmail) for sending verification and password reset emails.

## 🚀 Installation & Setup

Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone <repository-url>
cd synent-task8-online_course_platform-suyashhirekerur-
```

### 2. Backend Setup

Navigate to the `server` directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and configure the necessary environment variables (see [Environment Variables](#environment-variables) section below).

Start the backend server in development mode:

```bash
npm run dev
```
*The server will start on `http://localhost:3000` (or your defined PORT).*

### 3. Frontend Setup

Open a new terminal window/tab, navigate to the `frontend` directory, and install dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```
*The application will be accessible at `http://localhost:5173/`.*

## ⚙️ Environment Variables

### Server (`server/.env`)
Create a `.env` file in the `server` root and add the following keys:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_email
SMTP_PASS=your_smtp_password
```

## 📁 Folder Structure

```text
.
├── frontend/               # React frontend application
│   ├── public/             # Static assets
│   └── src/
│       ├── admin/          # Admin dashboard components and pages
│       ├── components/     # Reusable UI components (Header, Footer, etc.)
│       ├── context/        # React Context for global state (e.g., UserData)
│       ├── pages/          # Main application pages (Home, Auth, Courses, etc.)
│       ├── App.jsx         # Main application routing
│       └── main.jsx        # React application entry point
│
└── server/                 # Node.js / Express backend application
    ├── controllers/        # Request handlers and business logic
    ├── middlewares/        # Express middlewares (Auth, Multer, etc.)
    ├── models/             # Mongoose database schemas (User, Courses, Lecture, Payment, Progress)
    ├── routes/             # API route definitions
    └── index.js            # Server entry point
```

## 📜 Available Scripts

### Frontend (`/frontend`)
*   `npm run dev`: Starts the Vite development server.
*   `npm run build`: Builds the app for production.
*   `npm run lint`: Runs ESLint to analyze code quality.
*   `npm run preview`: Locally previews the production build.

### Backend (`/server`)
*   `npm start`: Starts the node server for production.
*   `npm run dev`: Starts the server using nodemon for automatic restarts during development.
