import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Button from '../../components/common/Button';

export default function Learn() {
  const { courseId } = useParams();
  const [activeLesson, setActiveLesson] = useState(0);
  
  // Mock course data
  const course = {
    title: 'Complete React 18 Course',
    modules: [
      { 
        title: 'Getting Started', 
        lessons: [
          { _id: 'l1', title: 'What is React?', videoUrl: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM', duration: '5:00', isCompleted: true }, 
          { _id: 'l2', title: 'Environment Setup', videoUrl: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM', duration: '10:00', isCompleted: false }
        ] 
      }
    ]
  };

  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentLesson = allLessons[activeLesson];

  return (
    <div className="flex h-[calc(100vh-80px)] animate-fade-in overflow-hidden">
      {/* Left Sidebar - Course Content */}
      <div className="w-80 bg-surface-2 border-r border-white/5 flex flex-col h-full overflow-y-auto">
        <div className="p-4 border-b border-white/5">
          <Link to={`/courses/${courseId}`} className="text-sm text-gray-400 hover:text-white mb-2 inline-block">← Back to Course</Link>
          <h2 className="font-bold text-lg leading-tight">{course.title}</h2>
          <div className="mt-4 w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '50%' }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">50% Complete</p>
        </div>
        
        <div className="flex-grow">
          {course.modules.map((module, i) => (
            <div key={i} className="border-b border-white/5">
              <div className="p-3 bg-white/5 font-semibold text-sm">{module.title}</div>
              <div>
                {module.lessons.map((lesson, j) => {
                  const globalIndex = course.modules.slice(0, i).reduce((acc, m) => acc + m.lessons.length, 0) + j;
                  const isActive = globalIndex === activeLesson;
                  
                  return (
                    <button 
                      key={lesson._id}
                      onClick={() => setActiveLesson(globalIndex)}
                      className={`w-full text-left p-3 flex gap-3 text-sm transition ${isActive ? 'bg-primary/20 border-l-2 border-primary' : 'hover:bg-white/5 border-l-2 border-transparent'}`}
                    >
                      <div className={`mt-0.5 ${lesson.isCompleted ? 'text-green-500' : 'text-gray-500'}`}>
                        {lesson.isCompleted ? '☑' : '☐'}
                      </div>
                      <div>
                        <div className={`${isActive ? 'text-white font-medium' : 'text-gray-300'}`}>{lesson.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{lesson.duration}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Video Player */}
      <div className="flex-grow bg-bg flex flex-col h-full overflow-y-auto">
        <div className="w-full bg-black aspect-video max-h-[70vh]">
          {currentLesson?.videoUrl ? (
            <ReactPlayer 
              url={currentLesson.videoUrl} 
              width="100%" 
              height="100%" 
              controls 
              playing 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Video not available
            </div>
          )}
        </div>
        
        <div className="p-8 max-w-4xl w-full mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold">{currentLesson?.title}</h1>
            <Button variant={currentLesson?.isCompleted ? 'secondary' : 'primary'}>
              {currentLesson?.isCompleted ? 'Completed ✅' : 'Mark as Complete'}
            </Button>
          </div>
          
          <div className="prose prose-invert max-w-none text-gray-300">
            <p>Lesson description and resources will appear here.</p>
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/5 flex justify-between">
            <Button 
              variant="ghost" 
              disabled={activeLesson === 0}
              onClick={() => setActiveLesson(prev => prev - 1)}
            >
              ← Previous Lesson
            </Button>
            <Button 
              variant="secondary" 
              disabled={activeLesson === allLessons.length - 1}
              onClick={() => setActiveLesson(prev => prev + 1)}
            >
              Next Lesson →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
