import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from './student';
import { StudentService } from './student.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public student: Student = new Student();
  public title: string = "Crear Alumno"
  public errors: string[];
  constructor(private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadStudent()
  }

  public create(): void {
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
    })
  }

  public update() : void {
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

}
