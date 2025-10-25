
import React, { useState } from 'react';
import { Schedule, StudentProfile, Course } from '../types';
import { generateOptimalSchedule } from '../services/geminiService';
import { COURSE_CATALOG } from '../constants';
import { LoadingSpinner } from './common/LoadingSpinner';
import { Card } from './common/Card';
import { CalendarIcon } from './icons';

interface SchedulePlannerProps {
  student: StudentProfile;
}

export const SchedulePlanner: React.FC<SchedulePlannerProps> = ({ student }) => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      setSchedule(null);
      const remainingCourses = COURSE_CATALOG.filter(c => !student.completedCourses.some(cc => cc.courseId === c.id));
      const generatedSchedule = await generateOptimalSchedule(student, remainingCourses);
      setSchedule(generatedSchedule);
    } catch (e) {
      setError('An error occurred while generating the schedule. The AI might be busy. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center space-x-3">
        <CalendarIcon />
        <h1 className="text-3xl font-bold text-slate-800">Academic Schedule Planner</h1>
      </div>
      <p className="mt-1 text-slate-500">Generate an AI-optimized, semester-by-semester plan to graduation.</p>

      <div className="mt-8 text-center">
        <button
          onClick={handleGenerateSchedule}
          disabled={loading}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Full Schedule'}
        </button>
      </div>

      <div className="mt-8">
        {loading && <LoadingSpinner message="Building your optimal schedule... This may take a moment." />}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
        {schedule && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {schedule.map((semester) => (
              <Card key={semester.semester} className="p-4 bg-slate-50">
                <h3 className="font-bold text-lg text-slate-700 border-b pb-2 mb-3">Semester {semester.semester}</h3>
                <div className="space-y-2">
                  {semester.courses.map((course) => (
                    <div key={course.id} className="bg-white p-2 rounded-md shadow-sm">
                      <p className="font-semibold text-sm text-slate-800">{course.id} - {course.title}</p>
                      <p className="text-xs text-slate-500">{course.credits} Credits</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm font-bold text-slate-600">Total Credits: {semester.totalCredits}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
