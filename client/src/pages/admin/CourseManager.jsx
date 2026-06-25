import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function CourseManager() {
  const [courses, setCourses] = useState([
    { _id: '1', title: 'Complete React 18 Course', category: 'Development', price: 4999, isPublished: true },
    { _id: '2', title: 'Advanced Node.js', category: 'Backend', price: 5999, isPublished: false },
  ]);

  return (
    <div className="flex animate-fade-in">
      <Sidebar />
      <div className="flex-grow p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Course Management</h1>
          <Button>+ Add New Course</Button>
        </div>
        
        <div className="card glass overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 font-semibold text-gray-300">Course Title</th>
                <th className="p-4 font-semibold text-gray-300">Category</th>
                <th className="p-4 font-semibold text-gray-300">Price</th>
                <th className="p-4 font-semibold text-gray-300">Status</th>
                <th className="p-4 font-semibold text-gray-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="p-4 font-medium">{course.title}</td>
                  <td className="p-4 text-gray-400">{course.category}</td>
                  <td className="p-4">₹{course.price}</td>
                  <td className="p-4">
                    <Badge variant={course.isPublished ? 'success' : 'warning'}>
                      {course.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" className="px-2 py-1 text-sm mr-2">Edit</Button>
                    <Button variant="danger" className="px-2 py-1 text-sm">Delete</Button>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No courses found. Create one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
