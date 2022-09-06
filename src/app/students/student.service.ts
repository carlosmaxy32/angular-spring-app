import { Injectable } from '@angular/core';
import { STUDENTS } from './students.json';
import { Student } from './student';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private urlEndPoint:string = "http://localhost:8080/api/students";

  constructor(private http: HttpClient) { }
  getStudents(): Observable<Student[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as Student[])
    );
  }
}
