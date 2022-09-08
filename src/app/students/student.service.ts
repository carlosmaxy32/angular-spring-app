import { Injectable } from '@angular/core';
import { STUDENTS } from './students.json';
import { Student } from './student';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private urlEndPoint:string = "http://localhost:8080/api/students";
 private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getStudents(): Observable<Student[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Student[])
    );
  }

  create(student: Student) : Observable<Student> {
    return this.http.post<Student>(this.urlEndPoint, student, {headers: this.httpHeaders})
  }

  getStudent(id): Observable<Student> {
    return this.http.get<Student>(`${this.urlEndPoint}/${id}`)
  }

  update(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.urlEndPoint}/${student.id}`, student, {headers: this.httpHeaders})
  }

  delete(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders})
  }
}
