import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
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
  currentLang = 'en';

  constructor(
    private studentService: StudentService,
    private router: Router,
    private translate: TranslateService
  ) {}

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
    if (confirm(this.translate.instant('STUDENT.DELETE_CONFIRM'))) {
      this.studentService.delete(id).subscribe({
        next: () => this.loadStudents(),
        error: (err) => console.error('Error deleting student:', err)
      });
    }
  }

  switchLang(lang: string): void {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  onLanguageChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const lang = selectElement.value;
  this.switchLang(lang);
}
}