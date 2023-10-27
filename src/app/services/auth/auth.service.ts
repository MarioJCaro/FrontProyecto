import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Router } from '@angular/router';


export interface LoginRequest {
  nick: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  empleado: {
    id: number;
    nick: string;
    nombre: string;
    apellido: string;
    telefono: string;
    rol: string;
    activo: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService, private router: Router) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  redirectUserBasedOnRole(role: string): void {
    switch (role) {
      case 'Admin':
        this.router.navigate(['/homeadmin']);
        break;
      case 'Mozo':
        this.router.navigate(['/homemozo']);
        break;
      case 'Cocina':
        this.router.navigate(['/homecocina']);
        break;
      default:
        this.router.navigate(['/default-home']);
        break;
    }
  }
}