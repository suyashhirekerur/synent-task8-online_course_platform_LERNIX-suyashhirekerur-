import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import Button from '../common/Button';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="glass py-4 px-6 border-b border-white/5 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gradient">
          CourseApp
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/courses" className="text-gray-300 hover:text-white transition">
            Courses
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-accent hover:text-white transition">
                  Admin Panel
                </Link>
              )}
              <Link to="/dashboard" className="text-gray-300 hover:text-white transition">
                Dashboard
              </Link>
              <div className="flex items-center gap-3 ml-4 border-l border-white/10 pl-4">
                <span className="font-medium">{user?.name}</span>
                <Button variant="ghost" onClick={handleLogout} className="px-3 py-1 text-sm">
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
