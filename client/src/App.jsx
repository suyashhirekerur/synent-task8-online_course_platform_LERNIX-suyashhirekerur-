import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Routes
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';

// User Pages
import Home from './pages/user/Home';
import Courses from './pages/user/Courses';
import CourseDetail from './pages/user/CourseDetail';
import Dashboard from './pages/user/Dashboard';
import Learn from './pages/user/Learn';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import CourseManager from './pages/admin/CourseManager';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />

          {/* Protected Routes (User) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn/:courseId" element={<Learn />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/courses" element={<CourseManager />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
