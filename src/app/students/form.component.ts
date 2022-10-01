import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from './student';
import { StudentService } from './student.service';
import Swal from 'sweetalert2';
import { Region } from './region';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public student: Student = new Student();
  public title: string = "Crear Alumno"
  public errors: string[];
  public regiones: Region[];

  constructor(private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadStudent()
  }

  public create(): void {
    console.log(this.student)
    this.studentService.create(this.student).subscribe(
      student=> {
        this.router.navigate(['/students']);
        Swal.fire('Estudiante nuevo', `Se añadió al estudiante ${student.name} ${student.lastname} con éxito`,'success');
      },
      err => {
        this.errors = err.error.errors as string[];
        console.error('Código del error desde el backend: '+ err.status);
        console.error(err.error.errors);
      }
    )
  }

  public loadStudent(): void {
    this.activatedRoute.params.subscribe(params => {
      let id =params['id']
      if(id){
        this.studentService.getStudent(id).subscribe((student)=>this.student=student)
      }
    });
    this.studentService.getRegiones().subscribe(regiones => this.regiones = regiones)
  }

  public update() : void {
    console.log(this.student)
    this.student.grades = null;
    this.studentService.update(this.student).subscribe(student => {
      this.router.navigate(['/students']);
      Swal.fire('Estudiante actualizado', `Se actualizó al estudiante ${student.name} ${student.lastname} con éxito`,'success');
    },
    err => {
      this.errors = err.error.errors as string[];
      console.error('Código del error desde el backend: '+ err.status);
      console.error(err.error.errors);
    }
    )
  }

  public compareRegion(o1: Region, o2:Region) : boolean {
    if (o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 === null || o2 == null || o1 === undefined || o2 == undefined ? false : o1.id == o2.id;
  }
}
