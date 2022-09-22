import { Injectable } from '@angular/core';
//import { STUDENTS } from './students.json';
import { Student } from './student';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { Region } from './region';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private urlEndPoint:string = "http://localhost:8080/api/students";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient, private router:Router) { }

  private isNoAutorizado(e): boolean {
    if(e.status==401 || e.status==403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones').pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
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
    return this.http.post<Student>(this.urlEndPoint, student, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.alumno as Student),
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if(e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  getStudent(id): Observable<Student> {
    return this.http.get<Student>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        this.router.navigate(['/students']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  update(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.urlEndPoint}/${student.id}`, student, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.alumno as Student),
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        if(e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.alumno as Student),
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
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

      return this.http.request(req).pipe(
        catchError(e => {
          this.isNoAutorizado(e);
          return throwError(e);
        })
      );
  }
}
