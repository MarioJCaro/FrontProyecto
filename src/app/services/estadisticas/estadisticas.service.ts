import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';

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

export interface LogEntry {
  id: number;
  fechaHoraAbierta: string;
  fechaHoraCerrada: string;
  itemInventarioId: number;
  createdAt: string;
  updatedAt: string;
  cantTragos: number;
  fechaAbiertaUy: string;
  horaAbiertaUy: string;
  fechaCerradaUy: string;
  horaCerradaUy: string;
}

export interface LogsResponse {
  count: number;
  rows: LogEntry[];
}


@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getItemsInventarioTrago(porUnidad: boolean): Observable<ItemsInventarioResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Incluir parámetro de consulta en la URL
    const url = `${this.apiUrl}/itemsInventario?porUnidad=${porUnidad}`;

    return this.http.get<ItemsInventarioResponse>(url, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }  

  getLogsPorItem(itemId: number): Observable<LogsResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<LogsResponse>(`${this.apiUrl}/logs/${itemId}`, { headers })
      .pipe(catchError(this.errorHandler.handleError));
  }  

}
