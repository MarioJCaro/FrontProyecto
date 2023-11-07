import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';

export interface CajaResponse {
    id: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ItemInventario {
  id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  costo: number;
  cantxCasillero: number;
  createdAt: string;
  updatedAt: string;
  ventaPorUnidad: number;
  categoria: {
      id: number;
      nombre: string;
      createdAt: string;
      updatedAt: string;
  };
}

export interface ItemsInventarioResponse {
  total: number;
  items: ItemInventario[];
}

export interface AbrirBotellaRequest {
  empleadoId: number;
  itemInventarioId: number;
}

export interface CerrarBotellaRequest {
  empleadoId: number;
  itemInventarioId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getCajaTotal(id: number): Observable<CajaResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.get<CajaResponse>(`${this.apiUrl}/cajas/${id}`, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }

  getItemsInventarioTrago(porUnidad: boolean): Observable<ItemsInventarioResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Incluir parámetro de consulta en la URL
    const url = `${this.apiUrl}/itemsInventario?porUnidad=${porUnidad}`;

    return this.http.get<ItemsInventarioResponse>(url, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }  

  abrirBotella(data: AbrirBotellaRequest): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiUrl}/log/abrirBotella`, data, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  cerrarBotella(data: AbrirBotellaRequest): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.apiUrl}/log/cerrarBotella`, data, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }
}
