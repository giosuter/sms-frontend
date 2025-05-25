export interface EnrollmentDTO {
  id: number;
  studentId: number;
  courseId: number;
  studentName: string;   // e.g. "John Doe"
  courseName: string;    // e.g. "Mathematics"
  enrollmentDate: string; // ISO format: "2025-05-25"
  status: string;         // e.g. "ACTIVE", "COMPLETED"
  grade: string;          // e.g. "A", "B", etc.
  notes: string;          // optional notes
}