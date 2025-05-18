import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  studentId?: number;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      plz: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      nationality: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: [''],
      studentId: ['', Validators.required],
      enrollmentDate: ['', Validators.required],
      status: ['', Validators.required],
      programLevel: ['', Validators.required]
    });

    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.studentId) {
      this.isEditMode = true;
      this.studentService.getById(this.studentId).subscribe((student) => {
        this.form.patchValue(student);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.warn('❌ Form is invalid:', this.form.value);
      return;
    }

    const student: Student = this.form.value;
    console.log(this.isEditMode ? '🛠 Updating student:' : '🆕 Creating student:', student);

    if (this.isEditMode && this.studentId) {
      this.studentService.update(this.studentId, student).subscribe({
        next: () => {
          console.log('✅ Student updated');
          this.router.navigate(['/students']);
        },
        error: (err) => {
          console.error('❌ Error updating student:', err);
        }
      });
    } else {
      this.studentService.create(student).subscribe({
        next: () => {
          console.log('✅ Student created');
          this.router.navigate(['/students']);
        },
        error: (err) => {
          console.error('❌ Error creating student:', err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}