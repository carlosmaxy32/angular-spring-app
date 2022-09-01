import { Component } from '@angular/core';

@Component({
  selector: 'app-subjectlist',
  templateUrl: './subjectlist.component.html',
  styleUrls: ['./subjectlist.component.css']
})
export class SubjectlistComponent {
    subjectList: string[] = ['Español', 'Matemáticas', 'Inglés', 'Geografía', 'Historia', 'Artes', 'Biología','Química'];
}
