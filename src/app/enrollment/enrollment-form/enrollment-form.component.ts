import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Enrollment } from '../../models/enrollment.model';
import { Student } from '../../student/student.model';
import { Course } from '../../models/course.model';

import { EnrollmentService } from '../../services/enrollment.service';
import { StudentService } from '../../student/student.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss']
})
export class EnrollmentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private enrollmentService = inject(EnrollmentService);
  private studentService = inject(StudentService);
  private courseService = inject(CourseService);

  form!: FormGroup;
  editMode = false;
  enrollmentId!: number;

  students: Student[] = [];
  courses: Course[] = [];

  ngOnInit(): void {
    this.loadDropdowns();

    this.form = this.fb.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
      enrollmentDate: [null, Validators.required],
      status: [''],
      grade: [''],
      notes: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.enrollmentId = +id;
      this.enrollmentService.getById(this.enrollmentId).subscribe((enrollment) => {
        this.form.patchValue(enrollment);
      });
    }
  }

  loadDropdowns(): void {
    this.studentService.getAll().subscribe((data) => (this.students = data));
    this.courseService.getAll().subscribe((data) => (this.courses = data));
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Converts to "YYYY-MM-DD"
  }

onSubmit(): void {
  if (this.form.invalid) return;

  const formValue = this.form.value;

  const enrollment: Enrollment = {
    student: { id: formValue.studentId },
    course: { id: formValue.courseId },
    enrollmentDate: this.formatDate(formValue.enrollmentDate),
    status: formValue.status,
    grade: formValue.grade,
    notes: formValue.notes
  };

  if (this.editMode) {
    this.enrollmentService.update(this.enrollmentId, enrollment).subscribe({
      next: () => {
        this.snackBar.open('Enrollment updated successfully.', 'OK');
        this.router.navigate(['/enrollments']);
      },
      error: () => this.snackBar.open('Update failed.', 'OK')
    });
  } else {
    this.enrollmentService.create(enrollment).subscribe({
      next: () => {
        this.snackBar.open('Enrollment created successfully.', 'OK');
        this.router.navigate(['/enrollments']);
      },
      error: () => this.snackBar.open('Creation failed.', 'OK')
    });
  }
}
}