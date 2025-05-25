import { Routes } from '@angular/router';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentFormComponent } from './student/student-form/student-form.component';
import { StudentSearchComponent } from './student/student-search/student-search.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseFormComponent } from './course/course-form/course-form.component';
import { EnrollmentListComponent } from './enrollment/enrollment-list/enrollment-list.component';
import { EnrollmentFormComponent } from './enrollment/enrollment-form/enrollment-form.component';


export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },

  // STUDENT ROUTES
  { path: 'students', component: StudentListComponent },
  { path: 'students/new', component: StudentFormComponent },
  { path: 'students/edit/:id', component: StudentFormComponent },
  { path: 'students/search', component: StudentSearchComponent },

  // COURSE ROUTES
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/new', component: CourseFormComponent },
  { path: 'courses/edit/:id', component: CourseFormComponent },

  // ENROLLMENT ROUTES
  { path: 'enrollments', component: EnrollmentListComponent },
  { path: 'enrollments/new', component: EnrollmentFormComponent }, 
  { path: 'enrollments/edit/:id', component: EnrollmentFormComponent }
];