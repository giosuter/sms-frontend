import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add FormsModule
  templateUrl: './add-student.component.html',
})
export class AddStudentComponent {
  student: Student = { firstName: '', lastName: '', email: '' }; // ✅ Initialize model

  constructor(private studentService: StudentService, private router: Router) {}

  // ✅ Define onSubmit() method
  onSubmit() {
    this.studentService.addStudent(this.student).subscribe(() => {
      this.router.navigate(['/']); // Redirect to student list
    });
  }
}