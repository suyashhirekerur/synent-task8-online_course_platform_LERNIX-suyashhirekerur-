import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[80px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Master New Skills <br />
            <span className="text-gradient">At Your Own Pace</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join our premium learning platform to access high-quality courses taught by industry experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="px-8 py-4 text-lg w-full sm:w-auto">Browse Courses</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" size="lg" className="px-8 py-4 text-lg w-full sm:w-auto">Start for Free</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-surface-2/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Active Students', value: '10K+' },
            { label: 'Premium Courses', value: '250+' },
            { label: 'Expert Instructors', value: '50+' },
            { label: 'Video Lessons', value: '2,000+' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Find a Course', desc: 'Browse our catalog of premium courses and select the one that fits your goals.' },
            { step: '2', title: 'Enroll & Learn', desc: 'Get lifetime access to video lessons, resources, and community discussions.' },
            { step: '3', title: 'Master the Skill', desc: 'Complete the modules, build real-world projects, and earn your certificate.' }
          ].map((item, i) => (
            <div key={i} className="card p-8 text-center glass hover:border-primary/50 transition">
              <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
