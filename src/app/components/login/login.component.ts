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
        console.log('Token:', response.token);
        console.log('User:', response.empleado);
        localStorage.setItem('authToken', response.token);
        this.toastService.showSuccess("Ha iniciado sesión con éxito");
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login Error:', error.error);
        
      }
    });
  }
  
}