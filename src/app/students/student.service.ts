import { Injectable } from '@angular/core';
//import { STUDENTS } from './students.json';
import { Student } from './student';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Region } from './region';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private urlEndPoint:string = "http://localhost:8080/api/students";
  constructor(private http: HttpClient, private router:Router,) { }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

  getStudents(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      tap((response:any)=>{
        console.log('StudentService: tap 1');
        (response.content as Student[]).forEach(student => {
          console.log(student.name);
        });
      }),
      map((response:any) => {         
        (response.content as Student[]).map( student => {
          student.name = student.name.toUpperCase();
          //student.createAt = formatDate(student.createAt, 'dd-MMM-yyyy', 'es-MX');
          return student;
        });
        return response;
      })
    );
  }

  create(student: Student) : Observable<Student> {
    return this.http.post<Student>(this.urlEndPoint, student).pipe(
      map((response: any) => response.alumno as Student),
      catchError(e => {
        if(e.status == 400) {
          return throwError(e);
        }
        if(e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    )
  }

  getStudent(id): Observable<Student> {
    return this.http.get<Student>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/students']);
          console.error(e.error.mensaje);
        }        
        return throwError(e);
      })
    )
  }

  update(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.urlEndPoint}/${student.id}`, student).pipe(
      map((response: any) => response.alumno as Student),
      catchError(e => {
        if(e.status == 400) {
          return throwError(e);
        }
        if(e.error.mensaje) {
          console.error(e.error.mensaje);
        }        
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.urlEndPoint}/${id}`).pipe(
      map((response: any) => response.alumno as Student),
      catchError(e => {
        if(e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  uploadPicture(file: File, id): Observable<HttpEvent<{}>>{
      let formData = new FormData();
      formData.append("file",file);
      formData.append("id", id);

      const req = new HttpRequest('POST',`${this.urlEndPoint}/upload`,formData, {
        reportProgress: true
      } );

      return this.http.request(req);
  }
}
