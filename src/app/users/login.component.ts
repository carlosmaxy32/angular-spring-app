import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  title:string = "Iniciar sesión"
  user:User;
  constructor(private authService: AuthService, private router: Router) {
    this.user = new User(); 
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      Swal.fire('Login', `${this.authService.user.username} ya estás autenticado`, 'info');
      this.router.navigate(['/students']);
    }
  }

  login(): void {
    console.log(this.user);
    if(this.user.username == null ||this.user.password == null) {
      Swal.fire('Error Login', '¡Username o password vacías!', 'error');
      return;
    }

    this.authService.login(this.user).subscribe (response => {
      console.log(response);

      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      let user = this.authService.user;
      this.router.navigate(['/students']);
      Swal.fire('Login', `Hola ${user.username}, has iniciado sesión con exito`, 'success');
    }, err => {
      if(err.status == 400) {
        Swal.fire('Error Login', '¡Username o password incorrectas!', 'error');
      }
    }
    );
  }

}
