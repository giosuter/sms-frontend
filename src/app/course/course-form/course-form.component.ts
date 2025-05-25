import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private courseService = inject(CourseService);

  form!: FormGroup;
  editMode = false;
  courseId!: number;

  ngOnInit(): void {
    this.form = this.fb.group({
      courseName: ['', Validators.required],
      description: [''],
      duration: [''],
      startDate: [null],
      endDate: [null],
      professorId: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.courseId = +id;
        this.courseService.getById(this.courseId).subscribe(course => {
          this.form.patchValue(course);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const course: Course = this.form.value;

    if (this.editMode) {
      this.courseService.update(this.courseId, course).subscribe({
        next: () => {
          this.snackBar.open('Course updated successfully.', 'OK');
          this.router.navigate(['/courses']);
        },
        error: () => this.snackBar.open('Update failed.', 'OK')
      });
    } else {
      this.courseService.create(course).subscribe({
        next: () => {
          this.snackBar.open('Course created successfully.', 'OK');
          this.router.navigate(['/courses']);
        },
        error: () => this.snackBar.open('Creation failed.', 'OK')
      });
    }
  }
}