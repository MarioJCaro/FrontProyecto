import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { environment } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getAll(): Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  getById(id : number): Observable<Categoria>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Categoria>(`${this.apiUrl}/categorias/${id}`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

}
