import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  student: Student;
  title:String = "Detalle del cliente";
  private pictureSelect: File;
  constructor(private studentService: StudentService, private ativatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ativatedRoute.paramMap.subscribe(params =>{
      let id:number = +params.get('id');
      if(id){
        this.studentService.getStudent(id).subscribe(student=>{
          this.student=student;
        });
      }
    });
  }

  selectPicture(event) {
    this.pictureSelect = event.target.files[0];
    console.log(this.pictureSelect);
  }

  uploadPicture() {
    this.studentService.uploadPicture(this.pictureSelect, this.student.id)
    .subscribe( student => {
      this.student=student;
      Swal.fire('¡Imagen subida!',`La foto se ha subido con éxito: ${this.student.picture}`, 'success');
    })
  }

}
