import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnrollmentDTO } from './enrollment.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private apiUrl = `${environment.apiUrl}/enrollments`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all enrollments from the back-end.
   */
  getAll(): Observable<EnrollmentDTO[]> {
    return this.http.get<EnrollmentDTO[]>(this.apiUrl);
  }

  /**
   * Deletes an enrollment by ID.
   * @param id the ID of the enrollment
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}