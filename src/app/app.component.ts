import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Student } from '../app/models/student.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav>
      <a routerLink="/">Home</a> |
      <a routerLink="/add-student">Add Student</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}