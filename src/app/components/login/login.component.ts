import { Component } from '@angular/core';
import { AuthService, LoginRequest } from '../../services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  nick: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {}

  login() {
    const loginData: LoginRequest = {
      nick: this.nick,
      password: this.password
    };
  
    this.authService.login(loginData).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('role', response.empleado.rol);
        localStorage.setItem('empleadoId', response.empleado.id.toString());
        localStorage.setItem('empleadoNombre', response.empleado.nombre);
        this.toastService.showSuccess("Ha iniciado sesión con éxito");
        this.authService.redirectUserBasedOnRole(response.empleado.rol);
      },
      error: (error) => {
        console.error('Login Error:', error.error);
        
      }
    });
  }
  
}