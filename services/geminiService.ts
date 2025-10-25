
import { GoogleGenAI } from "@google/genai";
import { StudentProfile, Course, Schedule, CareerAlignment, RiskAssessment, CourseRecommendation } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. Using a placeholder. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "placeholder" });

const cleanJsonString = (str: string): string => {
  return str.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
};

export const generateOptimalSchedule = async (student: StudentProfile, courses: Course[]): Promise<Schedule> => {
    const prompt = `
You are Project Navigator, an AI academic advisor. Your task is to generate an optimal 8-semester course schedule for a university student.

**Student Profile:**
- Major: ${student.major}
- Completed Courses: ${student.completedCourses.map(c => c.courseId).join(', ')}
- GPA: ${student.gpa}

**Course Catalog (remaining required/elective courses):**
${JSON.stringify(courses, null, 2)}

**Constraints & Preferences:**
- Each semester should have between 15 and 18 credits.
- All course prerequisites must be met. A prerequisite must be taken in a strictly earlier semester.
- A course can only be taken once (do not include completed courses in the schedule).
- Consider the typical semester availability of each course.
- Prioritize core courses and prerequisites early in the curriculum.
- Balance the workload each semester.

**Output Format:**
Respond ONLY with a valid JSON object. Do not include any text before or after the JSON. The JSON should be an array of objects, where each object represents a semester.

**JSON Schema:**
[
  {
    "semester": number, // e.g., 1
    "courses": [
      {
        "id": string, // e.g., "CS101"
        "title": string,
        "credits": number
      }
    ],
    "totalCredits": number
  }
]
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const jsonText = cleanJsonString(response.text);
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error generating schedule:", error);
        throw new Error("Failed to generate schedule from AI.");
    }
};

export const getCareerAlignment = async (student: StudentProfile, plannedCourses: Course[], careerTitle: string): Promise<CareerAlignment> => {
    const prompt = `
You are Project Navigator, an AI career advisor. Analyze the alignment of a student's academic profile with a specific career path.

**Student Profile:**
- Major: ${student.major}
- Completed Courses: ${JSON.stringify(student.completedCourses.map(c => c.courseId), null, 2)}
- Planned Courses: ${JSON.stringify(plannedCourses.map(c => c.id), null, 2)}
- Interests: ${student.interests.join(', ')}

**Target Career:**
- Title: ${careerTitle}

**Task:**
Provide a detailed career alignment analysis based on the student's completed and planned coursework.

**Output Format:**
Respond ONLY with a valid JSON object. The schema is as follows:
{
  "alignmentScore": number,
  "analysis": string,
  "missingSkills": string[],
  "suggestedCourses": string[]
}
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const jsonText = cleanJsonString(response.text);
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error analyzing career alignment:", error);
        throw new Error("Failed to analyze career alignment from AI.");
    }
};


export const getRiskAssessment = async (student: StudentProfile): Promise<RiskAssessment> => {
    const prompt = `
You are Project Navigator, an AI student success advisor. Assess a student's risk of falling behind or dropping out based on their profile.

**Student Profile:**
- Major: ${student.major}
- GPA: ${student.gpa}
- Completed Courses: ${JSON.stringify(student.completedCourses, null, 2)}

**Task:**
Assess the student's academic risk level. Identify key contributing factors and provide actionable recommendations.

**Output Format:**
Respond ONLY with a valid JSON object. The schema is as follows:
{
  "level": "Low" | "Medium" | "High",
  "factors": string[],
  "recommendations": string
}
`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const jsonText = cleanJsonString(response.text);
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error assessing student risk:", error);
        throw new Error("Failed to assess student risk from AI.");
    }
};

export const getCourseRecommendations = async (student: StudentProfile, availableCourses: Course[]): Promise<CourseRecommendation[]> => {
    const prompt = `
You are Project Navigator, an AI academic advisor. Recommend the top 5 most suitable courses for a student for the upcoming semester.

**Student Profile:**
- Major: ${student.major}
- GPA: ${student.gpa}
- Completed Courses: ${student.completedCourses.map(c => c.courseId).join(', ')}
- Interests: ${student.interests.join(', ')}

**Available Courses for Next Semester:**
${JSON.stringify(availableCourses.map(({ id, title, description, prerequisites }) => ({ id, title, description, prerequisites })), null, 2)}

**Task:**
Recommend 5 courses that are a good fit for the student. Consider their major, completed courses (to meet prerequisites), interests, and avoid recommending courses they've already taken.

**Output Format:**
Respond ONLY with a valid JSON array of objects. The schema is as follows:
[
  {
    "courseId": string,
    "reason": string
  }
]
`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const jsonText = cleanJsonString(response.text);
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error getting course recommendations:", error);
        throw new Error("Failed to get course recommendations from AI.");
    }
};
