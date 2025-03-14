import { Routes } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { AddStudentComponent } from './components/add-student/add-student.component';

export const routes: Routes = [
  { path: '', component: StudentComponent },
  { path: 'add-student', component: AddStudentComponent }
];