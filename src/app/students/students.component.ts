import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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
    this.studentsService.getStudents().subscribe(
      students =>this.listStudents = students
    );
  }

  public delete(student:Student): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estás Seguro?',
      text: `¡Se eliminará a ${student.name} ${student.lastname} y no podras revertir esta acción!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentsService.delete(student.id).subscribe(
          response => {
            this.listStudents =this.listStudents.filter(std => std !== student)
            swalWithBootstrapButtons.fire(
              '¡Estudiante Eliminado!',
              `Estudiante ${student.name} ${student.lastname} eliminado con éxito. `,
              'success'
            )
          }
        )
        
      } 
    })
  }

}
