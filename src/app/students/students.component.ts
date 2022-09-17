import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { ModalService } from './detail/modal.service';
import { Student } from './student';
import { StudentService } from './student.service';
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
})
export class StudentsComponent implements OnInit {

  listStudents: Student[];
  paginator: any;
  studentSelect: Student;
  constructor(private studentsService: StudentService, 
    private modalService: ModalService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page:number = +params.get('page');

      if(!page){
        page = 0;
      }

      this.studentsService.getStudents(page)
      .pipe(tap( response => {
        console.log('StudentsComponent: tap 2');
        (response.content as Student[]).forEach(student => {
          console.log(student.name);
        });
      }))
      .subscribe(
        students => {
          this.listStudents = students.content as Student[];
          this.paginator = students;
        }
      );
    }); 

    this.modalService.notificarUpload.subscribe(student=> {
      this.listStudents = this.listStudents.map( studentOriginal => {
        if(student.id == studentOriginal.id) {
          studentOriginal.picture = student.picture;
        }
        return studentOriginal;
      })
    })
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

  openModal(student: Student) {
    this.studentSelect = student;
    this.modalService.openModal();
  }

}
