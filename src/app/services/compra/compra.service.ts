import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';

export interface CreateCompraRequest {
  fecha: Date;
  hora: Date;
  cantidadxCasillero: number;
  cantidad: number;
  empleadoId: number;
  itemInventarioId: number;
}

/* 
"message": "Compra creada",
    "result": {
        "id": 1,
        "fecha": "2023-10-25",
        "hora": "14:30:00",
        "cantidadxCasillero": 6,
        "cantidad": 2,
        "empleadoId": 1,
        "itemInventarioId": 1,
        "total": 1080,
        "updatedAt": "2023-11-08T12:17:23.810Z",
        "createdAt": "2023-11-08T12:17:23.810Z" */

export interface CreateCompraResponse {
  message: string;
  result: {
    id: number;
    fecha: Date;
    hora: Date;
    cantidadxCasillero: number;
    cantidad: number;
    empleadoId: number;
    itemInventarioId: number;
    total: number;
    updatedAt: Date;
    createdAt: Date;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  create(compra:CreateCompraRequest): Observable<CreateCompraResponse>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<CreateCompraResponse>(`${this.apiUrl}/compras`, compra, { headers }).pipe(
      catchError(this.errorHandler.handleError)
    );
  }
}
