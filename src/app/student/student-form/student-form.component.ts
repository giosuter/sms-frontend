import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    TranslateModule,
    MatSnackBarModule
  ],
  providers: [StudentService],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})

export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  isEditMode = false;
  studentId!: number;

  genderOptions = ['Male', 'Female', 'Other'];
  statusOptions = ['Active', 'Inactive', 'Graduated'];
  programLevels = ['Bachelor', 'Master', 'PhD'];

constructor(
  private fb: FormBuilder,
  private studentService: StudentService,
  private route: ActivatedRoute,
  private router: Router,
  private snackBar: MatSnackBar
) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      plz: [''],
      city: [''],
      country: [''],
      nationality: [''],
      phoneNumber: [''],
      dateOfBirth: [''],
      gender: [''],
      studentId: ['', Validators.required],
      enrollmentDate: [''],
      status: [''],
      programLevel: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.studentId = +id;
      this.studentService.getById(this.studentId).subscribe(student => {
        const patchedStudent = {
          ...student,
          dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth) : null,
          enrollmentDate: student.enrollmentDate ? new Date(student.enrollmentDate) : null
        };
        this.studentForm.patchValue(patchedStudent);
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.invalid) return;

    const formValue = this.studentForm.value;

    const student: Student = {
      ...formValue,
      dateOfBirth: formValue.dateOfBirth ? this.formatDate(formValue.dateOfBirth) : '',
      enrollmentDate: formValue.enrollmentDate ? this.formatDate(formValue.enrollmentDate) : ''
    };

    if (this.isEditMode) {
      this.studentService.update(this.studentId, student).subscribe({
        next: () => {
          this.snackBar.open('Student updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/students']);
        },
        error: () => {
          this.snackBar.open('Update failed!', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.studentService.create(student).subscribe({
        next: () => {
          this.snackBar.open('Student created successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/students']);
        },
        error: () => {
          this.snackBar.open('Creation failed!', 'Close', { duration: 3000 });
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/students']);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}