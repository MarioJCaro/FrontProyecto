import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';

export interface CreateClienteRequest {
  nombre: string;
  apellido: string;
  telefono: string;
}

export interface CreateClienteResponse {
  cliente: {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    cuenta: number,
    createdAt: Date;
    updatedAt: Date;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getAll(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }
}
