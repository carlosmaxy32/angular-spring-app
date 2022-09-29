import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../students/student.service';
import { Grade } from './models/grade';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html'
})
export class GradesComponent implements OnInit {

  title:string = "Nueva calificación";
  grade:Grade = new Grade();
  autoCompleteControl = new FormControl('');
  subjects: string[] = ['One', 'Two', 'Three'];
  filteredSubjects: Observable<string[]>;

  constructor(private studentService: StudentService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let studentId = +params.get('studentId');
      this.studentService.getStudent(studentId).subscribe(student => this.grade.student = student);
    });
    this.filteredSubjects = this.autoCompleteControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.subjects.filter(option => option.toLowerCase().includes(filterValue));
  }
}
