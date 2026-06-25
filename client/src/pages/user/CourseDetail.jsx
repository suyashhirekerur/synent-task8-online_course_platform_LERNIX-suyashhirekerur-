import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function CourseDetail() {
  const { id } = useParams();
  
  // Mock course data
  const course = {
    title: 'Complete React 18 Course',
    description: 'Master modern React from scratch including Hooks, Redux Toolkit, React Router v6, and more. Build real-world projects.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80',
    price: 4999,
    level: 'Beginner',
    instructor: { name: 'John Doe' },
    tags: ['React', 'JavaScript', 'Frontend'],
    modules: [
      { title: 'Getting Started', lessons: [{ title: 'What is React?', isFree: true }, { title: 'Environment Setup' }] },
      { title: 'React Hooks', lessons: [{ title: 'useState in depth' }, { title: 'useEffect mastery' }] }
    ]
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="bg-surface-2 border-b border-white/5 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-4">
              <Badge variant="primary">{course.level}</Badge>
              {course.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl text-gray-400 mb-6">{course.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span>Created by <span className="text-white font-semibold">{course.instructor.name}</span></span>
              <span>•</span>
              <span>Last updated: Oct 2023</span>
            </div>
          </div>
          
          {/* Sticky Pricing Card */}
          <div className="lg:col-span-1">
            <div className="card glass p-6 sticky top-24">
              <div className="rounded-lg overflow-hidden mb-6 h-48">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <div className="text-3xl font-bold mb-6">₹{course.price}</div>
              <Button size="lg" className="w-full mb-4">Enroll Now</Button>
              <p className="text-center text-sm text-gray-400">30-Day Money-Back Guarantee</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="lg:col-span-2 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">Course Content</h2>
          <div className="flex flex-col gap-4">
            {course.modules.map((module, i) => (
              <div key={i} className="card bg-surface-2 border border-white/5 overflow-hidden">
                <div className="p-4 bg-white/5 font-bold">{module.title}</div>
                <div className="p-0">
                  {module.lessons.map((lesson, j) => (
                    <div key={j} className="flex justify-between p-4 border-t border-white/5 hover:bg-white/5 transition">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>{lesson.title}</span>
                      </div>
                      {lesson.isFree && <Badge variant="success">Preview</Badge>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
