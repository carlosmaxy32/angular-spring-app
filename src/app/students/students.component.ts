import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { StudentService } from './student.service';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
})
export class StudentsComponent implements OnInit {

  listStudents:Student[];
  constructor(private studentsService: StudentService) { }

  ngOnInit(): void {
    this.listStudents = this.studentsService.getStudents();
  }

}
