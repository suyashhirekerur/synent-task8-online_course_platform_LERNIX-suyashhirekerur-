import React from 'react';
import Sidebar from '../../components/layout/Sidebar';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,245', trend: '+12%', icon: '👤' },
    { label: 'Total Courses', value: '45', trend: '+2', icon: '📚' },
    { label: 'Total Enrollments', value: '3,490', trend: '+150', icon: '🎓' },
    { label: 'Total Revenue', value: '₹1,24,500', trend: '+18%', icon: '💰' }
  ];

  return (
    <div className="flex animate-fade-in">
      <Sidebar />
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="card p-6 glass border-t-4 border-t-primary">
              <div className="flex justify-between items-start mb-4">
                <div className="text-3xl">{stat.icon}</div>
                <div className="text-green-500 bg-green-500/10 px-2 py-1 rounded text-sm font-semibold">
                  {stat.trend}
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
        
        {/* Placeholder for Recent Enrollments or Revenue Chart */}
        <div className="mt-12 card p-6 glass">
          <h2 className="text-xl font-bold mb-6">Recent Platform Activity</h2>
          <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-lg text-gray-500">
            [Activity Chart Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
}
