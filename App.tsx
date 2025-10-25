
import React, { useState } from 'react';
import { STUDENT_PROFILE } from './constants';
import { Dashboard } from './components/Dashboard';
import { SchedulePlanner } from './components/SchedulePlanner';
import { CareerExplorer } from './components/CareerExplorer';
import { CourseRecommender } from './components/CourseRecommender';
import { DashboardIcon, BookIcon, CalendarIcon, BriefcaseIcon, GraduationCapIcon } from './components/icons';

type View = 'dashboard' | 'recommendations' | 'schedule' | 'career';

const NavItem: React.FC<{
  viewName: View;
  currentView: View;
  setView: (view: View) => void;
  children: React.ReactNode;
}> = ({ viewName, currentView, setView, children }) => {
  const isActive = viewName === currentView;
  return (
    <button
      onClick={() => setView(viewName)}
      className={`flex items-center space-x-3 p-3 rounded-lg w-full text-left transition-colors ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-slate-600 hover:bg-blue-100 hover:text-blue-700'
      }`}
    >
      {children}
    </button>
  );
};

function App() {
  const [view, setView] = useState<View>('dashboard');

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard student={STUDENT_PROFILE} />;
      case 'recommendations':
        return <CourseRecommender student={STUDENT_PROFILE} />;
      case 'schedule':
        return <SchedulePlanner student={STUDENT_PROFILE} />;
      case 'career':
        return <CareerExplorer student={STUDENT_PROFILE} />;
      default:
        return <Dashboard student={STUDENT_PROFILE} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col p-4">
        <div className="flex items-center space-x-3 p-3 mb-6">
            <GraduationCapIcon />
            <h1 className="text-xl font-bold text-slate-800">Project Navigator</h1>
        </div>
        <nav className="flex flex-col space-y-2">
          <NavItem viewName="dashboard" currentView={view} setView={setView}>
            <DashboardIcon />
            <span>Dashboard</span>
          </NavItem>
          <NavItem viewName="recommendations" currentView={view} setView={setView}>
            <BookIcon />
            <span>Courses</span>
          </NavItem>
          <NavItem viewName="schedule" currentView={view} setView={setView}>
            <CalendarIcon />
            <span>Schedule</span>
          </NavItem>
          <NavItem viewName="career" currentView={view} setView={setView}>
            <BriefcaseIcon />
            <span>Career</span>
          </NavItem>
        </nav>
        <div className="mt-auto p-3 text-center text-xs text-slate-400">
            <p>&copy; 2024 Raneem Sadeh</p>
            <p>Al Hussein Technical University</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
