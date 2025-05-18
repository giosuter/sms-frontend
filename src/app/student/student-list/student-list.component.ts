import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAll().subscribe({
      next: (data) => this.students = data,
      error: (err) => console.error('Error loading students:', err)
    });
  }

  editStudent(id: number): void {
    this.router.navigate(['/students/edit', id]);
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.delete(id).subscribe(() => {
        this.loadStudents(); // Refresh list after deletion
      });
    }
  }
}