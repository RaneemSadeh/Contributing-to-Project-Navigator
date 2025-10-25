
import { StudentProfile, Course } from './types';

export const STUDENT_PROFILE: StudentProfile = {
  name: 'Raneem Yahya Sadeh',
  major: 'Artificial Intelligence',
  gpa: 3.85,
  completedCourses: [
    { courseId: 'CS101', grade: 'A', credits: 3 },
    { courseId: 'MA101', grade: 'A-', credits: 3 },
    { courseId: 'PH101', grade: 'B+', credits: 4 },
    { courseId: 'CS110', grade: 'A', credits: 3 },
    { courseId: 'MA102', grade: 'A', credits: 3 },
    { courseId: 'EN101', grade: 'A-', credits: 3 },
  ],
  interests: ['Machine Learning', 'Natural Language Processing', 'Sustainable Tech', 'Geospatial Analytics'],
};

export const COURSE_CATALOG: Course[] = [
  // Year 1
  { id: 'CS101', title: 'Introduction to Programming', description: 'Fundamentals of programming using Python.', credits: 3, prerequisites: [], semesterAvailability: ['Fall', 'Spring'] },
  { id: 'MA101', title: 'Calculus I', description: 'Differential calculus.', credits: 3, prerequisites: [], semesterAvailability: ['Fall', 'Spring'] },
  { id: 'PH101', title: 'Physics for Engineers', description: 'Mechanics and thermodynamics.', credits: 4, prerequisites: [], semesterAvailability: ['Fall'] },
  { id: 'CS110', title: 'Data Structures', description: 'Study of data structures and algorithms.', credits: 3, prerequisites: ['CS101'], semesterAvailability: ['Spring'] },
  { id: 'MA102', title: 'Calculus II', description: 'Integral calculus.', credits: 3, prerequisites: ['MA101'], semesterAvailability: ['Spring'] },
  { id: 'EN101', title: 'English Composition', description: 'College-level writing.', credits: 3, prerequisites: [], semesterAvailability: ['Fall', 'Spring'] },

  // Year 2
  { id: 'CS201', title: 'Computer Architecture', description: 'Organization and design of computer systems.', credits: 3, prerequisites: ['CS110'], semesterAvailability: ['Fall'] },
  { id: 'CS220', title: 'Algorithms', description: 'Design and analysis of algorithms.', credits: 3, prerequisites: ['CS110'], semesterAvailability: ['Fall', 'Spring'] },
  { id: 'MA201', title: 'Linear Algebra', description: 'Vectors, matrices, and linear transformations.', credits: 3, prerequisites: ['MA102'], semesterAvailability: ['Fall'] },
  { id: 'AI210', title: 'Introduction to AI', description: 'Fundamental concepts of Artificial Intelligence.', credits: 3, prerequisites: ['CS110'], semesterAvailability: ['Spring'] },
  { id: 'ST201', title: 'Probability and Statistics', description: 'Introduction to probability theory and statistical inference.', credits: 3, prerequisites: ['MA102'], semesterAvailability: ['Spring'] },

  // Year 3
  { id: 'AI310', title: 'Machine Learning', description: 'Core concepts of machine learning algorithms.', credits: 3, prerequisites: ['AI210', 'MA201', 'ST201'], semesterAvailability: ['Fall'] },
  { id: 'DB301', title: 'Database Systems', description: 'Design and implementation of database systems.', credits: 3, prerequisites: ['CS220'], semesterAvailability: ['Fall'] },
  { id: 'AI320', title: 'Natural Language Processing', description: 'Techniques for processing human language.', credits: 3, prerequisites: ['AI310'], semesterAvailability: ['Spring'] },
  { id: 'AI330', title: 'Computer Vision', description: 'Image processing and analysis.', credits: 3, prerequisites: ['AI310'], semesterAvailability: ['Spring'] },
  { id: 'SE301', title: 'Software Engineering', description: 'Principles of software development life cycle.', credits: 3, prerequisites: ['CS220'], semesterAvailability: ['Fall', 'Spring'] },

  // Year 4
  { id: 'AI410', title: 'Deep Learning', description: 'Advanced neural networks and deep learning architectures.', credits: 3, prerequisites: ['AI310'], semesterAvailability: ['Fall'] },
  { id: 'AI450', title: 'AI Ethics and Society', description: 'Ethical implications of AI technologies.', credits: 3, prerequisites: ['AI210'], semesterAvailability: ['Spring'] },
  { id: 'AI499', title: 'Senior Project', description: 'Capstone project in AI.', credits: 3, prerequisites: ['AI410'], semesterAvailability: ['Fall', 'Spring'] },
  { id: 'CS420', title: 'Data Mining', description: 'Extracting patterns from large datasets.', credits: 3, prerequisites: ['DB301', 'ST201'], semesterAvailability: ['Fall'] },
];
