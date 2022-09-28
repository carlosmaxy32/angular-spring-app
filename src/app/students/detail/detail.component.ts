import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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

}
