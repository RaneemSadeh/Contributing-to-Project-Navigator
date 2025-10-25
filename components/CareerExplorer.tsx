
import React, { useState } from 'react';
import { StudentProfile, Course, CareerAlignment } from '../types';
import { getCareerAlignment } from '../services/geminiService';
import { COURSE_CATALOG } from '../constants';
import { LoadingSpinner } from './common/LoadingSpinner';
import { Card } from './common/Card';
import { BriefcaseIcon } from './icons';

interface CareerExplorerProps {
  student: StudentProfile;
}

export const CareerExplorer: React.FC<CareerExplorerProps> = ({ student }) => {
  const [careerTitle, setCareerTitle] = useState('Machine Learning Engineer');
  const [analysis, setAnalysis] = useState<CareerAlignment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    if (!careerTitle) return;
    try {
      setLoading(true);
      setError(null);
      setAnalysis(null);
      const plannedCourses = COURSE_CATALOG.filter(c => !student.completedCourses.some(cc => cc.courseId === c.id));
      const result = await getCareerAlignment(student, plannedCourses, careerTitle);
      setAnalysis(result);
    } catch (e) {
      setError('An error occurred while analyzing career alignment. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center space-x-3">
        <BriefcaseIcon />
        <h1 className="text-3xl font-bold text-slate-800">Career Pathway Explorer</h1>
      </div>
      <p className="mt-1 text-slate-500">See how your academic plan aligns with your professional goals.</p>

      <Card className="mt-8 p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label htmlFor="career-title" className="font-semibold text-slate-700">Enter a Career Title:</label>
          <input
            id="career-title"
            type="text"
            value={careerTitle}
            onChange={(e) => setCareerTitle(e.target.value)}
            className="flex-grow border border-slate-300 rounded-lg px-4 py-2 w-full sm:w-auto"
            placeholder="e.g., Data Scientist"
          />
          <button
            onClick={handleAnalysis}
            disabled={loading || !careerTitle}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            {loading ? 'Analyzing...' : 'Analyze Alignment'}
          </button>
        </div>
      </Card>

      <div className="mt-8">
        {loading && <LoadingSpinner message={`Analyzing alignment for ${careerTitle}...`} />}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
        {analysis && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-slate-800">Analysis for: <span className="text-blue-600">{careerTitle}</span></h2>
            
            <div className="mt-6">
                <p className="text-sm text-slate-500">Alignment Score</p>
                <div className="w-full bg-slate-200 rounded-full h-4 mt-1">
                    <div className="bg-green-500 h-4 rounded-full" style={{ width: `${analysis.alignmentScore}%` }}></div>
                </div>
                <p className="text-xl font-bold text-green-600 mt-1">{analysis.alignmentScore}% Match</p>
            </div>

            <div className="mt-6">
                <h3 className="font-bold text-lg text-slate-700">AI-Powered Analysis</h3>
                <p className="text-slate-600 mt-2">{analysis.analysis}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <h3 className="font-bold text-lg text-slate-700">Skills to Develop</h3>
                    <p className="text-sm text-slate-500 mb-3">Key skills you may be missing for this role.</p>
                    <ul className="space-y-2">
                        {analysis.missingSkills.map((skill, i) => (
                           <li key={i} className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1.5 rounded-full text-center">{skill}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-700">Suggested Courses</h3>
                    <p className="text-sm text-slate-500 mb-3">Courses to help you bridge the skill gap.</p>
                     <ul className="space-y-2">
                        {analysis.suggestedCourses.map((courseId, i) => (
                           <li key={i} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full text-center">{courseId}</li>
                        ))}
                    </ul>
                </div>
            </div>

          </Card>
        )}
      </div>
    </div>
  );
};
