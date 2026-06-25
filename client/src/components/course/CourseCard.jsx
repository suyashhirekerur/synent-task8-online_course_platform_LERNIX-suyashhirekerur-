import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';

export default function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course._id}`} className="block">
      <div className="card card-hover h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden bg-surface-2">
          {course.thumbnail ? (
            <img 
              src={course.thumbnail} 
              alt={course.title} 
              className="w-full h-full object-cover transition duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="primary">{course.level}</Badge>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.shortDescription}</p>
          
          <div className="mt-auto flex justify-between items-center border-t border-white/5 pt-4">
            <div className="text-sm text-gray-300">
              By <span className="font-semibold text-white">{course.instructor?.name || 'Instructor'}</span>
            </div>
            <div className="text-lg font-bold text-accent">
              {course.price > 0 ? `₹${course.price}` : 'Free'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
