import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  title:string = "Iniciar sesión"
  user:User;
  constructor() {this.user = new User(); }

  ngOnInit(): void {
    
  }

  login(): void {
    console.log(this.user);
    if(this.user.username == null ||this.user.password == null) {
      Swal.fire('Error Login', '¡Username o password vacías!', 'error');
      return;
    }
  }

}
