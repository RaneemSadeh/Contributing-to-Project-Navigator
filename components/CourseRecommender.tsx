
import React, { useState, useEffect } from 'react';
import { StudentProfile, Course, CourseRecommendation } from '../types';
import { COURSE_CATALOG } from '../constants';
import { getCourseRecommendations } from '../services/geminiService';
import { Card } from './common/Card';
import { LoadingSpinner } from './common/LoadingSpinner';
import { BookIcon } from './icons';

interface CourseRecommenderProps {
  student: StudentProfile;
}

export const CourseRecommender: React.FC<CourseRecommenderProps> = ({ student }) => {
  const [recommendations, setRecommendations] = useState<CourseRecommendation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      const availableCourses = COURSE_CATALOG.filter(c => !student.completedCourses.some(cc => cc.courseId === c.id));
      const recs = await getCourseRecommendations(student, availableCourses);
      setRecommendations(recs);
    } catch (err) {
      setError("Failed to load course recommendations. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student]);

  const getCourseById = (id: string): Course | undefined => COURSE_CATALOG.find(c => c.id === id);

  return (
    <div className="p-8">
      <div className="flex items-center space-x-3">
        <BookIcon />
        <h1 className="text-3xl font-bold text-slate-800">Course Recommendations</h1>
      </div>
      <p className="mt-1 text-slate-500">Personalized course suggestions powered by AI to keep you on track.</p>
      
      <div className="mt-8">
        {loading && <LoadingSpinner message="Generating recommendations..." />}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
        
        {recommendations && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => {
              const course = getCourseById(rec.courseId);
              if (!course) return null;
              return (
                <Card key={course.id} className="p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">{course.id}</span>
                    <h3 className="text-lg font-bold mt-2">{course.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{course.credits} Credits</p>
                    <p className="text-sm text-slate-600 mt-4">{course.description}</p>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="text-xs font-semibold text-slate-400 mb-1">AI'S REASONING</p>
                        <p className="text-sm text-slate-700 italic">"{rec.reason}"</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
