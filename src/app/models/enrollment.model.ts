import { Student } from '../student/student.model';
import { Course } from './course.model';

export interface Enrollment {
  id?: number;
  student: Partial<Student>;
  course: Partial<Course>;
  enrollmentDate: string;
  status?: string;
  grade?: string;
  notes?: string;
}