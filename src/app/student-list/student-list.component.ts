import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-list.component.html',
})
export class StudentListComponent {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.studentService.getAllStudents().subscribe((data) => {
      this.students = data;
    });
  }

  goToAddStudent() {
    console.log("Button clicked! Navigating to add-student...");
    this.router.navigate(['/add-student']);
  }
}