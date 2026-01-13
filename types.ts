
export enum UserRole {
  STUDENT = 'Student',
  FACULTY = 'Faculty',
  ADMIN = 'Admin'
}

export interface JNTUHRegulation {
  code: 'R18' | 'R22' | 'R23';
  name: string;
  totalCredits: number;
  promotionRules: {
    toYear2: string;
    toYear3: string;
    toYear4: string;
  };
  attendanceRule: string;
  graceMarks: string;
}

export interface SyllabusUnit {
  unitNumber: number;
  title: string;
  topics: string[];
}

export interface JNTUHSubject {
  code: string;
  name: string;
  credits: number;
  units: SyllabusUnit[];
  textbooks: string[];
  references: string[];
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  postedBy: string;
  category: 'Academic' | 'Administrative' | 'Event' | 'General' | 'Results' | 'Exam-Fee';
  isJNTUHOfficial?: boolean;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  type: 'PDF' | 'PPT' | 'DOC';
  size: string;
  uploadedDate: string;
  regulation?: 'R18' | 'R22' | 'R23';
  semester?: string;
  branch?: string;
  category: 'Notes' | 'Syllabus' | 'Question Papers' | 'Textbooks';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string;
  video?: string;
  audio?: string;
  thinking?: string;
  groundingUrls?: { title: string; uri: string }[];
}

// Fix: Added missing TimetableEntry interface
export interface TimetableEntry {
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  room: string;
  instructor: string;
}

// Fix: Added missing AttendanceRecord interface
export interface AttendanceRecord {
  subject: string;
  attended: number;
  total: number;
  percentage: number;
}
