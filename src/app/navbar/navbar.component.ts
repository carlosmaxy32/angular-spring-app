import { Component } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { AuthService } from "../users/auth.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
})
export class NavbarComponent {
    title:string = "App Angular";
    constructor(public authService: AuthService, private router: Router){

    }

    logout():void {
        this.authService.logout()
        Swal.fire('Logout', 'Has cerrado sesión con éxito', 'success');
        this.router.navigate(['/login']);
    }
}
