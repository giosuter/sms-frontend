import { Component, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentDTO } from './enrollment.model';

@Component({
  selector: 'app-enrollment-list',
  standalone: true,
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.scss'],
  imports: [CommonModule, NgFor, NgIf, FormsModule, TranslateModule]
})
export class EnrollmentListComponent {
  enrollmentService = inject(EnrollmentService);
  translate = inject(TranslateService);

  enrollments: EnrollmentDTO[] = [];
  filteredEnrollments: EnrollmentDTO[] = [];

  studentFilter = '';
  courseFilter = '';
  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.fetchEnrollments();
  }

  fetchEnrollments(): void {
    this.enrollmentService.getAll().subscribe({
      next: (data) => {
        this.enrollments = data;
        this.applyFilters();
      },
      error: (err) => console.error('Error loading enrollments:', err)
    });
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredEnrollments = this.enrollments.filter(enrollment => {
      const student = (enrollment.studentName || '').toLowerCase();
      const course = (enrollment.courseName || '').toLowerCase();
      return student.includes(this.studentFilter.toLowerCase()) &&
             course.includes(this.courseFilter.toLowerCase());
    });

    this.sortEnrollments();
  }

  setSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortEnrollments();
  }

  sortEnrollments(): void {
    this.filteredEnrollments.sort((a, b) => {
      const aVal = (a as any)[this.sortField];
      const bVal = (b as any)[this.sortField];
      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
}