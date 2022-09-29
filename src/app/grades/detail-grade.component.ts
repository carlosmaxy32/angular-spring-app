import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Grade } from './models/grade';
import { GradeService } from './services/grade.service';

@Component({
  selector: 'app-detail-grade',
  templateUrl: './detail-grade.component.html'
})
export class DetailGradeComponent implements OnInit {

  grade: Grade;
  title: string = 'Calificación del ciclo escolar';
  constructor(private gradeService: GradeService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.gradeService.getGrade(id).subscribe(grade => this.grade = grade);
    });
  }

  getTotalApprovedSubject(): number {
    let total = 0;
    for(let i = 0; i<this.grade.item_grades.length; i++) {
      if(this.grade.item_grades[i].score>=60) {
        total = total + 1;
      }
    }
    return total;
  }

  getTotalFailedSubject(): number {
    let total = 0;
    for(let i = 0; i<this.grade.item_grades.length; i++) {
      if(this.grade.item_grades[i].score<60) {
        total = total + 1;
      }
    }
    return total;
  }
}
