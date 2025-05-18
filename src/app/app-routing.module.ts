import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentFormComponent } from './student/student-form/student-form.component';
import { StudentSearchComponent } from './student/student-search/student-search.component';

const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'students/new', component: StudentFormComponent },
  { path: 'students/edit/:id', component: StudentFormComponent },
  { path: 'students/search', component: StudentSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}