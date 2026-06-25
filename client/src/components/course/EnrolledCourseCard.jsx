import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

export default function EnrolledCourseCard({ enrollment }) {
  const { course, progress } = enrollment;
  
  return (
    <div className="card h-full flex flex-col">
      <div className="relative h-40 w-full overflow-hidden bg-surface-2">
        {course?.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-4 line-clamp-2">{course?.title}</h3>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress || 0)}%</span>
          </div>
          <div className="w-full h-2 bg-surface-2 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-primary transition-all duration-1000" 
              style={{ width: `${progress || 0}%`, backgroundColor: 'var(--color-primary)' }}
            ></div>
          </div>
          
          <Link to={`/learn/${course?._id}`} className="block w-full">
            <Button className="w-full">
              {progress === 0 ? 'Start Learning' : progress === 100 ? 'Review Course' : 'Continue Learning'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
