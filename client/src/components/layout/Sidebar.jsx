import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-64 glass border-r border-white/5 min-h-[calc(100vh-80px)] p-6">
      <div className="flex flex-col gap-4">
        <NavLink 
          to="/admin" 
          end 
          className={({isActive}) => `p-3 rounded-md transition ${isActive ? 'bg-[var(--color-primary)] text-white' : 'text-gray-400 hover:bg-white/5'}`}
        >
          Dashboard
        </NavLink>
        <NavLink 
          to="/admin/courses" 
          className={({isActive}) => `p-3 rounded-md transition ${isActive ? 'bg-[var(--color-primary)] text-white' : 'text-gray-400 hover:bg-white/5'}`}
        >
          Courses
        </NavLink>
      </div>
    </aside>
  );
}
