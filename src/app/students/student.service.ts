import { Injectable } from '@angular/core';
import { STUDENTS } from './students.json';
import { Student } from './student';
import { of, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }
  getStudents(): Observable<Student[]> {
    return of (STUDENTS);
  }
}
