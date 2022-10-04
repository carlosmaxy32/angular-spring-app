import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../students/student.service';
import { Grade } from './models/grade';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {flatMap, map, startWith} from 'rxjs/operators';
import { GradeService } from './services/grade.service';
import { Subject } from './models/subject';
import { __values } from 'tslib';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemGrade } from './models/item-grade';
import Swal from 'sweetalert2';
import { Student } from '../students/student';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html'
})
export class GradesComponent implements OnInit {

  title:string = "Nueva calificación";
  grade:Grade = new Grade();
  autoCompleteControl = new FormControl('');
  subjects: string[] = ['One', 'Two', 'Three'];
  filteredSubjects: Observable<Subject[]>;

  constructor(private studentService: StudentService,
    private gradeService: GradeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let studentId = +params.get('studentId');
      this.studentService.getStudent(studentId).subscribe(student => this.grade.student = student);
    });
    this.filteredSubjects = this.autoCompleteControl.valueChanges
    .pipe(
      map((value:any) => typeof value === 'string'? value: value.name),
      flatMap(value => value ? this._filter(value):[])
    );
  }

  private _filter(value: string): Observable<Subject[]> {
    const filterValue = value.toLowerCase();

    return this.gradeService.filteredSubjects(filterValue);
  }

  showName(subject?: Subject): string | undefined {
    return subject? subject.name : undefined;
  }

  selectedSubject(event: MatAutocompleteSelectedEvent): void {
    let subject = event.option.value as Subject;
    console.log(subject);
    if(!this.itemExists(subject.id)) {
      let newItem = new ItemGrade();
      newItem.subject = subject;
      newItem.score = 0;
      this.grade.item_grades.push(newItem);
    }  
    
    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  updateScore(id: number, event:any): void {
    let score: number = event.target.value as number;
    this.grade.item_grades = this.grade.item_grades.map((item:ItemGrade) => {
      if(id === item.subject.id) {
        item.score = score;
      }
      return item;
    });
  }

  itemExists(id: number): boolean {
    let exist = false;
    this.grade.item_grades.forEach((item: ItemGrade) => {
      if(id === item.subject.id) {
        exist = true;
      }
    });
    return exist;
  }

  deleteItemGrade(id: number): void {
    this.grade.item_grades = this.grade.item_grades.filter((item: ItemGrade) => id !== item.subject.id);
  }

  create(gradeForm):void {
    console.log(this.grade);
    if(this.grade.item_grades.length == 0){
      this.autoCompleteControl.setErrors({'invalid': true});
    }
    if(gradeForm.form.valid && this.grade.item_grades.length > 0) {
      this.grade.calendar = this.grade.calendar.toUpperCase();
      if (this.existCalendar(this.grade.student)) {
        return;
      }
      this.gradeService.create(this.grade).subscribe(grade => {
        Swal.fire(this.title, `Las nuevas calificaciones del calendario ${grade.calendar} creadas con éxito`, 'success');
        this.router.navigate(['/grades', grade.id]);
      });
    }
  }

  existCalendar(student: Student): boolean {
    for(let i = 0; i<student.grades.length; i++) {
      if(this.grade.calendar == student.grades[i].calendar) {
        Swal.fire('Error al crear calificaaión', `El estudiante ${student.name} ${student.lastname} ya cuenta con calificación para el calendario ${this.grade.calendar}, favor de añadir otro calendario o editar ya el existente`, 'error');
        return true;
      }
    }
    return false;
  }

}
