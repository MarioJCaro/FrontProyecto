import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';

export interface GrupoResponse {
  id: number;
  nombre: string;
}

export interface GetAllGruposResponse {
  total: number;
  items: GrupoResponse[];  // Aquí es un array de ítems, no un solo ítem
}

@Injectable({
  providedIn: 'root'
})
export class GrupoComidaService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getAll(): Observable<GetAllGruposResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<GetAllGruposResponse>(`${this.apiUrl}/grupos?page=-1`, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  getGrupoByNombre(nombre: string): Observable<GetAllGruposResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<GetAllGruposResponse>(`${this.apiUrl}/grupos?page=1&limit=1&nombre=${nombre}`, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }
}
