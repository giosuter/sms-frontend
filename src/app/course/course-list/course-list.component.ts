import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  private courseService = inject(CourseService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  courses: Course[] = [];
  displayedColumns: string[] = ['id', 'courseName', 'startDate', 'endDate', 'actions'];

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAll().subscribe({
      next: (data) => (this.courses = data),
      error: () => this.snackBar.open('Failed to load courses.', 'OK')
    });
  }

  addCourse(): void {
    this.router.navigate(['/courses/new']);
  }

  editCourse(id: number): void {
    this.router.navigate(['/courses/edit', id]);
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Course deleted successfully.', 'OK');
          this.loadCourses();
        },
        error: () => this.snackBar.open('Failed to delete course.', 'OK')
      });
    }
  }
}