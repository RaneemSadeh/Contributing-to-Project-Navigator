
import React, { useState, useEffect } from 'react';
import { StudentProfile, RiskAssessment, RiskLevel, CourseRecommendation, Course } from '../types';
import { getRiskAssessment, getCourseRecommendations } from '../services/geminiService';
import { COURSE_CATALOG } from '../constants';
import { Card } from './common/Card';
import { LoadingSpinner } from './common/LoadingSpinner';
import { AlertTriangleIcon, GraduationCapIcon } from './icons';

interface DashboardProps {
  student: StudentProfile;
}

const RiskIndicator: React.FC<{ assessment: RiskAssessment }> = ({ assessment }) => {
    const riskColor = {
        [RiskLevel.Low]: 'text-green-600 bg-green-100',
        [RiskLevel.Medium]: 'text-yellow-600 bg-yellow-100',
        [RiskLevel.High]: 'text-red-600 bg-red-100',
    };
    
    return (
        <Card className="p-6">
            <h3 className="font-bold text-lg text-slate-700 mb-3">Academic Risk Assessment</h3>
            <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 rounded-full ${riskColor[assessment.level]}`}>
                    <AlertTriangleIcon className="w-8 h-8"/>
                </div>
                <div>
                    <p className="text-2xl font-bold text-slate-800">{assessment.level} Risk</p>
                    <p className="text-sm text-slate-500">Based on AI-powered analysis</p>
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-slate-600 mb-2">Contributing Factors:</h4>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                    {assessment.factors.map((factor, index) => <li key={index}>{factor}</li>)}
                </ul>
                <h4 className="font-semibold text-slate-600 mt-4 mb-2">Recommendations:</h4>
                <p className="text-sm text-slate-600">{assessment.recommendations}</p>
            </div>
        </Card>
    );
};

export const Dashboard: React.FC<DashboardProps> = ({ student }) => {
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(null);
  const [recommendations, setRecommendations] = useState<CourseRecommendation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [risk, recs] = await Promise.all([
          getRiskAssessment(student),
          getCourseRecommendations(student, COURSE_CATALOG.filter(c => !student.completedCourses.some(cc => cc.courseId === c.id)))
        ]);
        setRiskAssessment(risk);
        setRecommendations(recs);
      } catch (err) {
        setError("Failed to load AI-powered insights. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student]);

  const getCourseById = (id: string): Course | undefined => COURSE_CATALOG.find(c => c.id === id);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800">Welcome, {student.name}!</h1>
      <p className="mt-1 text-slate-500">Here is your academic and career pathway overview.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <GraduationCapIcon/>
            </div>
            <div>
                <p className="text-sm text-slate-500">Current GPA</p>
                <p className="text-2xl font-bold">{student.gpa.toFixed(2)}</p>
            </div>
        </Card>
        <Card className="p-6">
            <p className="text-sm text-slate-500">Major</p>
            <p className="text-2xl font-bold">{student.major}</p>
        </Card>
        <Card className="p-6">
             <p className="text-sm text-slate-500">Credits Completed</p>
            <p className="text-2xl font-bold">{student.completedCourses.reduce((sum, c) => sum + c.credits, 0)}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
            <Card className="p-6">
                <h3 className="font-bold text-lg text-slate-700 mb-4">AI-Suggested Courses for Next Semester</h3>
                {loading && <div className="h-40 flex items-center justify-center"><LoadingSpinner message="Finding courses..." /></div>}
                {error && <p className="text-red-500">{error}</p>}
                {recommendations && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recommendations.slice(0, 4).map(rec => {
                            const course = getCourseById(rec.courseId);
                            return course ? (
                                <div key={rec.courseId} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <h4 className="font-bold text-blue-700">{course.id} - {course.title}</h4>
                                    <p className="text-sm text-slate-600 mt-1">{rec.reason}</p>
                                </div>
                            ) : null;
                        })}
                    </div>
                )}
            </Card>
        </div>
        <div>
          {loading && <div className="h-40 flex items-center justify-center"><LoadingSpinner message="Assessing risk..." /></div>}
          {riskAssessment && <RiskIndicator assessment={riskAssessment} />}
        </div>
      </div>
    </div>
  );
};
