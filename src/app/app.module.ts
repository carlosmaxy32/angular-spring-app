import { NgModule, LOCALE_ID } from '@angular/core';
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
import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DetailComponent } from './students/detail/detail.component';

registerLocaleData(localeES, 'es-MX');

const routes: Routes = [
  {path: '', redirectTo: '/students', pathMatch: 'full'},
  {path: 'students', component: StudentsComponent},
  {path: 'students/page/:page', component: StudentsComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'students/form', component: FormComponent},
  {path: 'students/form/:id', component: FormComponent},
  {path: 'students/view/:id', component: DetailComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SubjectlistComponent,
    StudentsComponent,
    FormComponent,
    PaginatorComponent,
    DetailComponent
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [StudentService, {provide: LOCALE_ID, useValue: 'es-MX' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
