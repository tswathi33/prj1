
import { Notice, TimetableEntry, AttendanceRecord, StudyMaterial } from './types';

export const MOCK_NOTICES: Notice[] = [
  {
    id: 'j-1',
    title: 'JNTUH B.Tech R22/R18 Regular/Supply Results Out',
    content: 'The results for B.Tech I, II, III, IV Year I & II Semesters Regular and Supplementary Examinations held in March 2024 are now released. Students can check their results on the official portal.',
    date: '2024-05-15',
    postedBy: 'Director of Evaluation',
    category: 'Results'
  },
  {
    id: 'j-2',
    title: 'Exam Fee Notification for B.Tech II-II & III-II (R22/R18)',
    content: 'Notification for B.Tech II Year II Sem & III Year II Sem (R22, R18) Regular/Supplementary Examinations. Last date without late fee: June 5th, 2024.',
    date: '2024-05-12',
    postedBy: 'Examination Branch',
    category: 'Exam-Fee'
  },
  {
    id: 'j-3',
    title: 'R22 Academic Calendar for 2024-25',
    content: 'The revised academic calendar for B.Tech II, III, IV years for the academic year 2024-25 has been released by JNTUH.',
    date: '2024-05-10',
    postedBy: 'Registrar, JNTUH',
    category: 'Academic'
  }
];

export const MOCK_TIMETABLE: TimetableEntry[] = [
  { day: 'Monday', startTime: '09:00 AM', endTime: '10:00 AM', subject: 'Mathematics-II (M2)', room: 'CR-101', instructor: 'Dr. V. Rao' },
  { day: 'Monday', startTime: '10:00 AM', endTime: '11:00 AM', subject: 'Data Structures (DS)', room: 'CR-101', instructor: 'Prof. K. Laxmi' },
  { day: 'Tuesday', startTime: '11:00 AM', endTime: '12:00 PM', subject: 'Digital Electronics (DE)', room: 'Lab-1', instructor: 'Dr. Srinivas' },
  { day: 'Wednesday', startTime: '09:00 AM', endTime: '10:00 AM', subject: 'Object Oriented Programming (Java)', room: 'Lab-4', instructor: 'Prof. S. Kumar' },
  { day: 'Thursday', startTime: '02:00 PM', endTime: '04:00 PM', subject: 'Engineering Graphics (EG)', room: 'Drawing Hall', instructor: 'Dr. Mahesh' }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { subject: 'Mathematics-II', attended: 22, total: 25, percentage: 88 },
  { subject: 'Data Structures', attended: 18, total: 20, percentage: 90 },
  { subject: 'Digital Electronics', attended: 14, total: 22, percentage: 63 },
  { subject: 'OOP through Java', attended: 19, total: 20, percentage: 95 }
];

export const MOCK_MATERIALS: StudyMaterial[] = [
  { id: 'm-1', title: 'JNTUH R22 B.Tech CSE Syllabus Book', subject: 'CSE', type: 'PDF', size: '4.5 MB', uploadedDate: '2023-11-01', regulation: 'R22', semester: '1-1', category: 'Syllabus' },
  { id: 'm-2', title: 'JNTUH R18 Data Structures Complete Notes', subject: 'Data Structures', type: 'PDF', size: '12.2 MB', uploadedDate: '2024-01-15', regulation: 'R18', semester: '2-1', category: 'Notes' },
  { id: 'm-3', title: 'Programming for Problem Solving (PPS) - Unit 1 & 2', subject: 'PPS', type: 'PDF', size: '3.1 MB', uploadedDate: '2024-02-10', regulation: 'R22', semester: '1-1', category: 'Notes' },
  { id: 'm-4', title: 'M1 Important Questions - Previous Years', subject: 'Mathematics-I', type: 'DOC', size: '1.5 MB', uploadedDate: '2024-03-05', regulation: 'R22', semester: '1-1', category: 'Question Papers' },
  { id: 'm-5', title: 'R18 3-1 Operating Systems Lecture Slides', subject: 'Operating Systems', type: 'PPT', size: '8.4 MB', uploadedDate: '2024-04-20', regulation: 'R18', semester: '3-1', category: 'Notes' },
  { id: 'm-6', title: 'Computer Networks Textbook (Tanenbaum)', subject: 'Computer Networks', type: 'PDF', size: '25.0 MB', uploadedDate: '2024-04-25', regulation: 'R18', semester: '3-2', category: 'Textbooks' }
];
