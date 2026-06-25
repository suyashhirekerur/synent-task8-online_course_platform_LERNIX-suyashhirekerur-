import React, { useState } from 'react';
import CourseCard from '../../components/course/CourseCard';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

// Mock Data
const MOCK_COURSES = [
  { _id: '1', title: 'Complete React 18 Course', shortDescription: 'Master modern React from scratch.', price: 4999, level: 'Beginner', instructor: { name: 'John Doe' }, thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80' },
  { _id: '2', title: 'Advanced Node.js', shortDescription: 'Build scalable backend systems.', price: 5999, level: 'Advanced', instructor: { name: 'Jane Smith' }, thumbnail: 'https://images.unsplash.com/photo-1627398246411-b8f526c8cd11?w=800&q=80' },
  { _id: '3', title: 'Fullstack Next.js', shortDescription: 'The complete guide to Next.js 14.', price: 6999, level: 'Intermediate', instructor: { name: 'Alex Johnson' }, thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80' },
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtering logic will go here when API is connected
  
  return (
    <div className="container mx-auto py-12 px-4 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Explore Courses</h1>
          <p className="text-gray-400">Find the perfect course to level up your skills.</p>
        </div>
        
        <div className="w-full md:w-72">
          <Input 
            placeholder="Search courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-0"
          />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="card p-6 glass sticky top-24">
            <h3 className="font-bold text-lg mb-4">Filters</h3>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Level</h4>
              <div className="flex flex-col gap-2">
                {['All Levels', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <label key={level} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="level" className="accent-primary" defaultChecked={level === 'All Levels'} />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Price</h4>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-primary rounded" />
                  <span>Free Courses</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-primary rounded" />
                  <span>Paid Courses</span>
                </label>
              </div>
            </div>
            
            <Button className="w-full mt-8" variant="secondary">Clear Filters</Button>
          </div>
        </aside>
        
        {/* Course Grid */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_COURSES.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
