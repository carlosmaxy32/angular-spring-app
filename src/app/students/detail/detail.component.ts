import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Grade } from 'src/app/grades/models/grade';
import { GradeService } from 'src/app/grades/services/grade.service';
import { AuthService } from 'src/app/users/auth.service';
import Swal from 'sweetalert2';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() student: Student;
  title:String = "Detalle del estudiante";
  pictureSelect: File;
  progress: number=0;
  constructor(private studentService: StudentService, 
    private gradeService: GradeService,
    public authService: AuthService,
    public modalService: ModalService) { }

  ngOnInit(): void {
   
  }

  selectPicture(event) {
    this.pictureSelect = event.target.files[0];
    this.progress = 0;
    console.log(this.pictureSelect);
    if(this.pictureSelect.type.indexOf('image')<0){
      Swal.fire('¡Error al seleccionar la imagen!','El archivo debe ser del tipo imagen', 'error');
    }
  }

  uploadPicture() {
    if (!this.pictureSelect) {
      Swal.fire('¡Error al cargar la imagen!','Debes seleccionar una imagen', 'error');
    } else {
      this.studentService.uploadPicture(this.pictureSelect, this.student.id)
      .subscribe( event => {
        if(event.type === HttpEventType.UploadProgress){
          this.progress = Math.round((event.loaded/event.total)*100);
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.student = response.student as Student;

          this.modalService.notificarUpload.emit(this.student);
          Swal.fire('¡Imagen subida!',response.mensaje, 'success');
        }
      })
    }    
  }

  closeModal() {
    this.modalService.closeModal();
    this.pictureSelect = null;
    this.progress = 0;
  }

  delete(grade: Grade): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estás Seguro?',
      text: `¡Se eliminará la calificación del calendario ${grade.calendar} y no podras revertir esta acción!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.gradeService.delete(grade.id).subscribe(
          response => {
            this.student.grades =this.student.grades.filter(gra => gra !== grade)
            swalWithBootstrapButtons.fire(
              '¡Calificación Eliminada!',
              `Calificación del calendario ${grade.calendar} eliminada con éxito. `,
              'success'
            )
          }
        )
        
      } 
    })
  }

}
