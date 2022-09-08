import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SubjectlistComponent } from './subjectlist/subjectlist.component';
import { StudentsComponent } from './students/students.component';
import { StudentService } from './students/student.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './students/form.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '', redirectTo: '/students', pathMatch: 'full'},
  {path: 'students', component: StudentsComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'students/form', component: FormComponent},
  {path: 'students/form/:id', component: FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SubjectlistComponent,
    StudentsComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
