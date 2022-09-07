import { Component, OnInit } from '@angular/core';
import { Student } from './student';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public student: Student = new Student();
  public title: string = "Crear Alumno"
  constructor() { }

  ngOnInit(): void {
  }

  public create(): void {
    console.log("Clicked")
    console.log(this.student)
  }

}
