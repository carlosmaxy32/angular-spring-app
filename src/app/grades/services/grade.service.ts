import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grade } from '../models/grade';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private urlEndPoint: string = 'http://localhost:8080/api/grades';
  constructor(private http: HttpClient) { }

  public getGrade(id: number): Observable<Grade> {
    return this.http.get<Grade>(`${this.urlEndPoint}/${id}`);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEndPoint}/${id}`);
  }

  public filteredSubjects(term: string): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.urlEndPoint}/filtrar-asignatura/${term}`);
  }

  public create(grade: Grade): Observable<Grade>{
    return this.http.post<Grade>(this.urlEndPoint, grade)
  }
}
