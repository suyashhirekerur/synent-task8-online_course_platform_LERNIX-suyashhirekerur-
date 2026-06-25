# Online Course Platform — Full-Stack Implementation Plan (4-Day Roadmap)

## Overview

A production-grade, full-stack online learning platform where users can browse, enroll, and learn from courses, while admins manage all content. Integrates Razorpay Test Mode payments, JWT-based security, and email notifications — built in **4 intensive days**.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 + Vite | SPA, component-based UI |
| Styling | Vanilla CSS + CSS Variables | Premium, responsive design system |
| State Management | Redux Toolkit + RTK Query | Global state + API caching |
| Routing | React Router v6 | Protected routes, role-based access |
| Backend | Node.js + Express.js | REST API server |
| Database | MongoDB + Mongoose | Data persistence |
| Auth | JWT (Access + Refresh Tokens) | Stateless, secure authentication |
| Payments | Razorpay (Test Mode) | Course enrollment payments |
| Email | Nodemailer + Gmail SMTP | Transactional emails |
| File Storage | Cloudinary | Video & thumbnail uploads |
| Dev Tools | nodemon, concurrently, dotenv | Developer experience |

---

## Project Structure

```
online-course-platform/
├── client/                              # React + Vite Frontend
│   ├── public/
│   └── src/
│       ├── api/                         # RTK Query API slices
│       │   ├── baseApi.js
│       │   ├── authApi.js
│       │   ├── courseApi.js
│       │   ├── enrollmentApi.js
│       │   └── adminApi.js
│       ├── app/
│       │   └── store.js                 # Redux store
│       ├── components/
│       │   ├── common/                  # Button, Input, Modal, Spinner, Badge
│       │   ├── layout/                  # Navbar, Footer, Sidebar
│       │   └── course/                  # CourseCard, LessonItem, ProgressBar
│       ├── features/
│       │   ├── auth/authSlice.js        # Auth state (user, token)
│       │   └── ui/uiSlice.js            # Loading, toast state
│       ├── hooks/
│       │   ├── useAuth.js
│       │   └── useProgress.js
│       ├── pages/
│       │   ├── auth/                    # Login, Register, ForgotPassword, ResetPassword
│       │   ├── user/                    # Home, Courses, CourseDetail, Dashboard, Learn
│       │   └── admin/                   # AdminLayout, Dashboard, CourseManager, Users
│       ├── routes/
│       │   ├── ProtectedRoute.jsx
│       │   └── AdminRoute.jsx
│       ├── styles/
│       │   ├── index.css                # Design tokens (CSS vars), resets
│       │   └── components.css           # Shared component styles
│       └── utils/
│           ├── axiosInstance.js         # Axios + interceptor for token refresh
│           └── helpers.js
│
└── server/                              # Node.js + Express Backend
    ├── config/
    │   ├── db.js
    │   └── cloudinary.js
    ├── controllers/
    │   ├── authController.js
    │   ├── courseController.js
    │   ├── moduleController.js
    │   ├── lessonController.js
    │   ├── enrollmentController.js
    │   ├── paymentController.js
    │   └── adminController.js
    ├── middleware/
    │   ├── authMiddleware.js             # verifyToken, requireAdmin
    │   ├── errorMiddleware.js            # Global error handler
    │   └── uploadMiddleware.js           # Multer + Cloudinary
    ├── models/
    │   ├── User.js
    │   ├── Course.js
    │   ├── Module.js
    │   ├── Lesson.js
    │   ├── Enrollment.js
    │   └── Payment.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── courseRoutes.js
    │   ├── enrollmentRoutes.js
    │   ├── paymentRoutes.js
    │   └── adminRoutes.js
    ├── services/
    │   ├── emailService.js
    │   └── razorpayService.js
    ├── utils/
    │   ├── generateToken.js
    │   ├── ApiResponse.js
    │   └── seed.js                       # Demo data seeder
    ├── .env
    ├── .env.example
    ├── app.js
    └── server.js
```

---

## Database Schema

### User
```js
{ _id, name, email, password (bcrypt), role: 'user'|'admin',
  isEmailVerified, emailVerificationToken,
  resetPasswordToken, resetPasswordExpire,
  avatar, createdAt, updatedAt }
```

### Course
```js
{ _id, title, description, shortDescription, thumbnail,
  price, category, level: 'Beginner'|'Intermediate'|'Advanced',
  tags[], instructor: ref→User, modules: [ref→Module],
  isPublished, totalLessons, totalDuration, createdAt, updatedAt }
```

### Module
```js
{ _id, course: ref→Course, title, order, lessons: [ref→Lesson] }
```

### Lesson
```js
{ _id, module: ref→Module, title, description,
  videoUrl, duration, order, isFree, resources: [{title,url}] }
```

### Enrollment
```js
{ _id, user: ref→User, course: ref→Course, payment: ref→Payment,
  completedLessons: [ref→Lesson], progress: Number(0-100),
  enrolledAt, completedAt }
```

### Payment
```js
{ _id, user: ref→User, course: ref→Course,
  razorpayOrderId, razorpayPaymentId, razorpaySignature,
  amount, currency, status: 'pending'|'success'|'failed', createdAt }
```

---

## REST API Reference

### Auth — `/api/auth`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/register` | Register + send verification email | Public |
| POST | `/login` | Login + set refresh token cookie | Public |
| GET | `/verify-email/:token` | Confirm email | Public |
| POST | `/forgot-password` | Email reset link | Public |
| PUT | `/reset-password/:token` | Reset password | Public |
| GET | `/me` | Authenticated user profile | 🔒 User |
| POST | `/refresh-token` | Issue new access token | Cookie |
| POST | `/logout` | Clear refresh token cookie | 🔒 User |

### Courses — `/api/courses`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | All courses (search, filter, paginate) | Public |
| GET | `/:id` | Course detail + modules | Public |
| GET | `/:id/learn` | Full content (enrolled users) | 🔒 Enrolled |
| POST | `/` | Create course | 🔒 Admin |
| PUT | `/:id` | Update course | 🔒 Admin |
| DELETE | `/:id` | Delete course | 🔒 Admin |

### Modules — `/api/courses/:courseId/modules`
| Method | Endpoint | Access |
|---|---|---|
| POST | `/` | 🔒 Admin |
| PUT | `/:moduleId` | 🔒 Admin |
| DELETE | `/:moduleId` | 🔒 Admin |

### Lessons — `/api/courses/:courseId/modules/:moduleId/lessons`
| Method | Endpoint | Access |
|---|---|---|
| POST | `/` | 🔒 Admin |
| PUT | `/:lessonId` | 🔒 Admin |
| DELETE | `/:lessonId` | 🔒 Admin |

### Payments — `/api/payments`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/create-order` | Create Razorpay order | 🔒 User |
| POST | `/verify` | HMAC verify + create enrollment | 🔒 User |

### Enrollments — `/api/enrollments`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/my-courses` | User's enrolled courses | 🔒 User |
| POST | `/:courseId/complete-lesson` | Mark lesson done | 🔒 Enrolled |
| GET | `/:courseId/progress` | Course progress % | 🔒 Enrolled |

### Admin — `/api/admin`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/stats` | Platform overview stats | 🔒 Admin |
| GET | `/users` | All users (paginated) | 🔒 Admin |
| DELETE | `/users/:id` | Delete user | 🔒 Admin |
| GET | `/enrollments` | All enrollment records | 🔒 Admin |

---

## ⚡ 4-Day Build Roadmap

> **Strategy**: Backend-first (Day 1), Frontend foundation + auth (Day 2), Core features (Day 3), Polish + Admin UI + Testing (Day 4). Work in parallel where possible — build and test backend endpoints with Postman while the server is running.

---

### 🗓️ DAY 1 — Complete Backend

**Goal**: Fully functional, tested backend API by end of day.

#### Morning (Blocks 1–2): Setup + Core Models + Auth API

```
✅ Step 1.1 — Project Init
  - Initialize monorepo root (package.json with "workspaces")
  - cd server && npm init -y
  - Install dependencies:
      express mongoose dotenv bcryptjs jsonwebtoken cookie-parser
      cors nodemailer razorpay multer cloudinary multer-storage-cloudinary
      express-async-handler crypto nodemon
  - Create app.js, server.js, .env, .env.example
  - Connect MongoDB in config/db.js (mongoose.connect)

✅ Step 1.2 — All Mongoose Models
  - User.js     (bcrypt pre-save hook, comparePassword method)
  - Course.js   ($text index on title + description + tags)
  - Module.js
  - Lesson.js
  - Enrollment.js
  - Payment.js

✅ Step 1.3 — Auth System
  - utils/generateToken.js → signAccessToken (15min) + signRefreshToken (7d)
  - middleware/authMiddleware.js → verifyToken, requireAdmin
  - controllers/authController.js:
      register   → hash password, generate crypto token, call emailService.sendVerification()
      login      → compare password, set refreshToken in httpOnly cookie, return accessToken
      verifyEmail → find token in DB, set isEmailVerified = true
      forgotPassword → generate crypto reset token (10min expiry), call emailService.sendReset()
      resetPassword  → validate token + expiry, hash new password
      refreshToken   → read cookie, verify refresh JWT, issue new access token
      logout         → clear cookie
      getMe          → return req.user
  - authRoutes.js → wire all endpoints
  - TEST: Register, Login, Verify Email, Forgot/Reset Password via Postman ✓
```

#### Afternoon (Blocks 3–4): Course, Payment, Enrollment, Admin APIs

```
✅ Step 1.4 — Course + Module + Lesson API
  - controllers/courseController.js:
      getCourses   → query with $text search, category/level filters, paginate
      getCourseById → populate modules → lessons
      getLearnContent → check enrollment, return full content
      createCourse, updateCourse, deleteCourse (admin only)
  - controllers/moduleController.js: addModule, updateModule, deleteModule
  - controllers/lessonController.js: addLesson, updateLesson, deleteLesson
  - Wire routes in courseRoutes.js (nested: /courses/:id/modules/:mid/lessons)

✅ Step 1.5 — Cloudinary Upload Middleware
  - config/cloudinary.js → configure with env vars
  - middleware/uploadMiddleware.js → multer-storage-cloudinary for video + image

✅ Step 1.6 — Email Service
  - services/emailService.js → Nodemailer transporter (Gmail SMTP)
  - HTML email templates (inline styles):
      sendVerificationEmail(email, token)
      sendPasswordResetEmail(email, token)
      sendEnrollmentEmail(email, courseName, courseLink)
      sendWelcomeEmail(email, name)

✅ Step 1.7 — Razorpay Payment + Enrollment
  - services/razorpayService.js → new Razorpay({key_id, key_secret})
  - controllers/paymentController.js:
      createOrder → razorpay.orders.create({amount, currency:'INR', receipt})
      verifyPayment → HMAC-SHA256(orderId + '|' + paymentId, secret)
                   → if valid: create Payment(status:success) + Enrollment
                   → call emailService.sendEnrollmentEmail()
  - paymentRoutes.js → /create-order, /verify

✅ Step 1.8 — Enrollment Controller
  - getMyCourses → find Enrollments by user, populate course
  - completeLesson → push lessonId to completedLessons, recalculate progress %
  - getProgress → return completedLessons + progress for a course

✅ Step 1.9 — Admin Controller + Routes
  - getStats → aggregate counts (users, courses, enrollments, revenue)
  - getUsers, deleteUser
  - getEnrollments (with user + course population)
  - All protected by requireAdmin middleware

✅ Step 1.10 — Global Error Handler
  - middleware/errorMiddleware.js → catch-all async error handler
  - utils/ApiResponse.js → standardized {success, message, data} wrapper

✅ Step 1.11 — Seed Script
  - utils/seed.js → create admin user + 4 sample courses with modules/lessons
  - Run: node utils/seed.js

🎯 Day 1 Milestone: All API endpoints functional, tested in Postman
```

---

### 🗓️ DAY 2 — Frontend Foundation + Auth + User Pages

**Goal**: Running React app with design system, auth flow, course browsing, and course detail page.

#### Morning (Blocks 1–2): Setup + Design System + Redux + Auth Pages

```
✅ Step 2.1 — Frontend Bootstrap
  - cd client && npm create vite@latest . -- --template react
  - Install:
      react-router-dom @reduxjs/toolkit react-redux axios
      react-player react-hot-toast react-hook-form

✅ Step 2.2 — Vite Proxy Config
  - vite.config.js → proxy /api → http://localhost:5000
  - This removes CORS complexity in dev

✅ Step 2.3 — Design System (src/styles/index.css)
  - CSS custom properties:
      --color-primary: #6C63FF (vibrant purple)
      --color-primary-dark: #4A43D4
      --color-accent: #FF6B6B
      --color-bg: #0D0E1A (dark background)
      --color-surface: #1A1B2E
      --color-surface-2: #252640
      --color-text: #E8E8F0
      --color-text-muted: #8B8BA7
      --radius-md: 12px, --radius-lg: 20px
      --shadow-glow: 0 0 30px rgba(108,99,255,0.3)
      --transition: all 0.2s ease
  - Google Font: 'Inter' (weights 400, 500, 600, 700)
  - Global resets, utility classes

✅ Step 2.4 — Redux Store + RTK Query Setup
  - app/store.js → configureStore with RTK Query middleware
  - api/baseApi.js → createApi with baseUrl '/api', token injection
  - api/authApi.js → login, register, getMe, forgotPassword, resetPassword mutations
  - api/courseApi.js → getCourses, getCourseById, getLearnContent queries
  - features/auth/authSlice.js → { user, accessToken, isAuthenticated }

✅ Step 2.5 — Axios Instance + Interceptor
  - utils/axiosInstance.js:
      - Request interceptor: attach Authorization: Bearer <token>
      - Response interceptor: on 401, call /auth/refresh-token, retry request

✅ Step 2.6 — Core Components
  - components/common/Button.jsx     (variants: primary, secondary, ghost, danger)
  - components/common/Input.jsx      (label, error, icon support)
  - components/common/Modal.jsx      (backdrop, close on ESC/click-outside)
  - components/common/Spinner.jsx    (animated, size variants)
  - components/common/Badge.jsx      (level, category, status)
  - components/common/SkeletonCard.jsx

✅ Step 2.7 — Layout Components
  - components/layout/Navbar.jsx     (logo, nav links, auth buttons, user avatar dropdown)
  - components/layout/Footer.jsx     (links, copyright)
  - components/layout/Sidebar.jsx    (for admin panel)
  - routes/ProtectedRoute.jsx        (redirect to /login if not authenticated)
  - routes/AdminRoute.jsx            (redirect to / if not admin)
  - App.jsx → React Router setup with all route definitions

✅ Step 2.8 — Auth Pages
  - pages/auth/Register.jsx   (name, email, password, confirm → POST /auth/register)
  - pages/auth/Login.jsx      (email, password → POST /auth/login → save token in Redux)
  - pages/auth/ForgotPassword.jsx  (email → POST /auth/forgot-password)
  - pages/auth/ResetPassword.jsx   (new password + confirm from URL token)
  - pages/auth/VerifyEmail.jsx     (call GET /auth/verify-email/:token on mount)
  - All pages: full-screen centered card, gradient background, smooth animations

🎯 Morning Milestone: Auth fully working (register → verify → login → logout)
```

#### Afternoon (Blocks 3–4): Home + Course Listing + Course Detail

```
✅ Step 2.9 — Home / Landing Page
  - pages/user/Home.jsx:
      Hero section: big headline + subtitle + CTA button + animated gradient bg
      "Featured Courses" section: horizontal scroll of CourseCards
      "How It Works": 3-step icon cards
      Stats banner: X courses, X students, X instructors

✅ Step 2.10 — Course Card Component
  - components/course/CourseCard.jsx:
      thumbnail, level badge, title, instructor name, price, rating stars
      hover lift animation + glow shadow

✅ Step 2.11 — Course Listing Page
  - pages/user/Courses.jsx:
      - Search bar (debounced, triggers API re-fetch)
      - Left filter sidebar: category checkboxes, level radio, price range slider
      - Course grid (responsive: 1→2→3 columns)
      - Pagination controls
      - "No results" empty state

✅ Step 2.12 — Course Detail Page
  - pages/user/CourseDetail.jsx:
      - Hero: large thumbnail, title, description, instructor, tags, price
      - Left column: what you'll learn, modules accordion (Module → Lessons list)
      - Right column: sticky pricing card → "Enroll Now" button (or "Go to Course" if enrolled)
      - Free lesson preview badge on isFree lessons

🎯 Day 2 Milestone: Full course browsing experience, auth flow working end-to-end
```

---

### 🗓️ DAY 3 — Razorpay + Learning System + Admin Panel UI

**Goal**: Complete payment flow, full learning experience, and admin panel.

#### Morning (Blocks 1–2): Razorpay + User Dashboard + Learning System

```
✅ Step 3.1 — Razorpay Integration
  - Add Razorpay checkout script to index.html:
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  - api/enrollmentApi.js → createOrder mutation, verifyPayment mutation
  - In CourseDetail.jsx → "Enroll Now" button handler:
      1. POST /api/payments/create-order → get { orderId, amount, currency }
      2. Open Razorpay modal with options:
           { key, amount, currency, order_id, name, description, theme: {color:'#6C63FF'} }
      3. handler.payment.success → POST /api/payments/verify with {razorpayOrderId, razorpayPaymentId, razorpaySignature}
      4. On success: invalidate RTK cache → show toast "🎉 Enrolled!" → navigate to /learn/:courseId
      5. handler.payment.failed → show error toast

✅ Step 3.2 — User Dashboard
  - pages/user/Dashboard.jsx:
      - "My Courses" grid with progress bars
      - components/course/EnrolledCourseCard.jsx:
          thumbnail, title, progress bar (%), "Continue Learning" button
      - Empty state with "Browse Courses" CTA

✅ Step 3.3 — Learning Page (Course Player)
  - pages/user/Learn.jsx layout:
      - Left panel (collapsible sidebar):
          Course title
          Module accordion → Lesson list
          Each lesson: icon (video), title, duration, ✅ if completed
          Click lesson → load it in main area
      - Main content area:
          <video> tag or react-player with videoUrl
          Lesson title + description
          "Mark as Complete" button (disabled if already done)
          ← Previous / Next → navigation buttons
      - Top progress bar (overall course %)
  - hooks/useProgress.js → encapsulate completeLesson mutation + progress state
  - Auto-navigate to next lesson after marking complete

🎯 Morning Milestone: Full enroll → learn → mark complete flow working
```

#### Afternoon (Blocks 3–4): Admin Panel

```
✅ Step 3.4 — Admin Layout + Dashboard Stats
  - pages/admin/AdminLayout.jsx:
      Left sidebar (fixed): Dashboard, Courses, Users, Enrollments links
      Top bar: admin name + logout
  - pages/admin/AdminDashboard.jsx:
      4 stat cards: Total Users, Total Courses, Total Enrollments, Total Revenue (₹)
      Cards have icons + trend text + gradient accent border

✅ Step 3.5 — Course Manager
  - pages/admin/CourseManager.jsx:
      - Data table: thumbnail, title, category, price, published status, actions
      - "Add Course" button → opens multi-step modal:
          Step 1: Basic info (title, description, category, level, price)
          Step 2: Upload thumbnail (Cloudinary via API)
          Step 3: Publish toggle → Submit
      - Edit button → same modal pre-filled
      - Delete button → confirmation modal → DELETE /api/courses/:id

✅ Step 3.6 — Module & Lesson Editor
  - pages/admin/CourseEditor.jsx (route: /admin/courses/:id/edit):
      Course info panel at top (edit inline)
      "Modules" section:
        - "Add Module" button → input for title → POST /api/courses/:id/modules
        - Each module: title, order, "Add Lesson" button, Edit, Delete
        - Each lesson row: title, videoUrl input, duration, isFree toggle, Edit, Delete
      Use optimistic UI updates for smooth UX

✅ Step 3.7 — User Management
  - pages/admin/UserManagement.jsx:
      Table: avatar, name, email, role badge, joined date, enrolled courses count
      Delete user button + confirmation
      Search/filter by role

✅ Step 3.8 — Enrollment Records
  - pages/admin/Enrollments.jsx:
      Table: user name, course title, enrolled date, payment status badge, progress %

🎯 Day 3 Milestone: Admin can fully manage platform; users can complete the full learning journey
```

---

### 🗓️ DAY 4 — Polish, Responsive Design, Testing & README

**Goal**: Production-ready look and feel, all edge cases handled, seed data ready.

```
✅ Step 4.1 — Responsive CSS
  - Breakpoints: 480px (mobile), 768px (tablet), 1024px (desktop)
  - Navbar: hamburger menu on mobile
  - Course grid: 1 column on mobile, 2 on tablet, 3 on desktop
  - Admin sidebar: collapsible on mobile (drawer)
  - Learning page sidebar: collapsible on mobile

✅ Step 4.2 — Loading & Error States
  - SkeletonCard for course listing (pulse animation)
  - Full-page spinner on auth check
  - Error boundary component
  - Empty state illustrations (SVG inline) for: no courses, no enrollments

✅ Step 4.3 — Micro-animations & Polish
  - Page transition: fade-in on route change (CSS opacity + translateY)
  - Button press: scale(0.97)
  - CourseCard hover: translateY(-6px) + box-shadow glow
  - Progress bar: animated fill with CSS transition
  - Modal: slide-up + backdrop fade-in
  - Toast notifications (react-hot-toast) with custom styling

✅ Step 4.4 — Form Validation
  - Register: required fields, email format, password min 8 chars, confirm match
  - Login: required fields
  - Forgot Password: email format
  - Course Form (admin): required fields, price > 0

✅ Step 4.5 — End-to-End Testing Checklist
  Full user flow:
    Register → email verification link → verify → login
    Browse courses → search + filter
    Open course detail → view modules accordion
    Click Enroll → Razorpay test payment → enrolled
    Go to Dashboard → see enrolled course with 0% progress
    Open Learn page → watch video → Mark Complete
    Progress updates to correct %
    Complete all lessons → 100% progress

  Admin flow:
    Login as admin → Admin Dashboard
    Add new course → Add modules → Add lessons
    View Users list → View Enrollments
    Delete a test user → Verify removal

✅ Step 4.6 — Security Hardening
  - Add helmet.js → secure HTTP headers
  - Add express-rate-limit → 100 req/15min on /api/auth
  - CORS whitelist → only CLIENT_URL
  - Sanitize inputs with express-mongo-sanitize

✅ Step 4.7 — Seed Script Polish
  - utils/seed.js:
      Admin: admin@platform.com / Admin@1234
      User:  user@platform.com  / User@1234
      4 courses (Web Dev, React, Node.js, MongoDB) each with 3 modules × 3 lessons

✅ Step 4.8 — README.md
  - Project overview + feature list
  - Tech stack table
  - Prerequisites (Node 18+, MongoDB, Razorpay test keys, Gmail App Password)
  - Setup instructions (clone → npm install → .env setup → seed → run)
  - API documentation link
  - Test credentials (from seed)
  - Razorpay test card details

🎯 Day 4 Milestone: Fully functional, polished, production-ready application ✅
```

---

## Daily Milestone Summary

```
Day 1 │ ████████████████████ │ Complete Backend API (all endpoints, email, payments)
Day 2 │ ████████████████████ │ Frontend: Design System + Auth + Browse Courses
Day 3 │ ████████████████████ │ Razorpay + Learning System + Admin Panel
Day 4 │ ████████████████████ │ Responsive + Polish + Testing + README
```

---

## Key Environment Variables

```env
# Server .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/courseplatform
JWT_ACCESS_SECRET=your_access_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

RAZORPAY_KEY_ID=rzp_test_xxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password

CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## Open Questions

> [!IMPORTANT]
> **Q1 — Video Hosting**: Should video lessons use **Cloudinary upload** (requires Multer streaming, free tier 25GB) or **YouTube embed URLs** entered manually per lesson (simpler, no storage cost)? YouTube approach is recommended for 4-day timeline.

> [!IMPORTANT]
> **Q2 — Free Courses**: Should courses with `price = 0` skip Razorpay entirely and directly enroll the user on "Enroll Now" click?

> [!NOTE]
> **Q3 — Deployment**: Is deployment (Render + MongoDB Atlas + Vercel) needed in this 4-day window, or is a well-documented local setup with seed data sufficient?

> [!NOTE]
> **Q4 — Email Provider**: Gmail SMTP with an App Password is recommended for simplicity. Confirm you have a Gmail account ready, or prefer SendGrid (free tier 100 emails/day).

---

## Verification Plan

### API Testing (Postman — Day 1)
- Import all routes, test auth flow, CRUD, payment verify, admin endpoints.
- Validate HMAC signature rejection for tampered payments.

### Manual E2E Checklist (Day 4)
- [ ] Register → verify email → login
- [ ] Browse + search + filter courses
- [ ] Enroll via Razorpay Test Mode → confirmation email received
- [ ] Learn: video plays, mark complete, progress updates
- [ ] Admin: create course + modules + lessons → publish
- [ ] Admin: view users, view enrollments
- [ ] Forgot password → reset → login with new password
- [ ] Unauthenticated user redirected to /login
- [ ] Regular user blocked from /admin routes
- [ ] Mobile responsive on 375px viewport
