import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private baseUrl = 'http://localhost:8080/sms-backend/enrollments';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.baseUrl);
  }

  getById(id: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.baseUrl}/${id}`);
  }

  create(enrollment: Enrollment): Observable<any> {
    return this.http.post(this.baseUrl, enrollment, { responseType: 'text' });
  }
  
  update(id: number, enrollment: Enrollment): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, enrollment, { responseType: 'text' });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}