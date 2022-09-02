import { Injectable } from '@angular/core';
import { STUDENTS } from './students.json';
import { Student } from './student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }
  getStudents(): Student[] {
    return STUDENTS;
  }
}
