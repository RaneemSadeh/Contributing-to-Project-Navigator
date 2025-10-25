
export interface Course {
  id: string;
  title: string;
  description: string;
  credits: number;
  prerequisites: string[];
  semesterAvailability: string[]; // e.g., ['Fall', 'Spring']
}

export interface StudentProfile {
  name: string;
  major: string;
  gpa: number;
  completedCourses: { courseId: string; grade: string; credits: number }[];
  interests: string[];
}

export interface SemesterSchedule {
  semester: number;
  courses: { id: string; title: string; credits: number }[];
  totalCredits: number;
}

export type Schedule = SemesterSchedule[];

export interface CareerAlignment {
    alignmentScore: number;
    analysis: string;
    missingSkills: string[];
    suggestedCourses: string[];
}

export enum RiskLevel {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export interface RiskAssessment {
    level: RiskLevel;
    factors: string[];
    recommendations: string;
}

export interface CourseRecommendation {
    courseId: string;
    reason: string;
}
