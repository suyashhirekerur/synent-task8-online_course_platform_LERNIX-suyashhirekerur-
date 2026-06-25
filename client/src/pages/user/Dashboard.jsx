import React from 'react';
import EnrolledCourseCard from '../../components/course/EnrolledCourseCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function Dashboard() {
  const { user } = useSelector(state => state.auth);
  
  // Mock enrollments
  const enrollments = [
    {
      _id: '1',
      progress: 35,
      course: {
        _id: '1',
        title: 'Complete React 18 Course',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80'
      }
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Student'}!</h1>
        <p className="text-gray-400">Pick up where you left off and keep learning.</p>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">My Courses</h2>
      
      {enrollments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map(enrollment => (
            <EnrolledCourseCard key={enrollment._id} enrollment={enrollment} />
          ))}
        </div>
      ) : (
        <div className="card glass p-12 text-center">
          <div className="w-20 h-20 bg-surface-2 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            📚
          </div>
          <h3 className="text-2xl font-bold mb-2">You aren't enrolled in any courses</h3>
          <p className="text-gray-400 mb-8">Start exploring our catalog to find your next skill to master.</p>
          <Link to="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
