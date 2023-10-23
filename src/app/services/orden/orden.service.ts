import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { environment } from 'src/environments/environments';
import { Observable, catchError } from 'rxjs';

export interface CreateOrdenRequest {
  fecha: Date;
  hora: Date;
  responsable: string;
  ocupacion: number;
  observaciones: string;
  clienteId: number;
  empleadoId: number;
  items: ItemsRequest[];
  mesas: number[];
}

export interface CreateOrdenResponse {
  message: string,
  newOrden: {
    id: number;
    fecha: Date;
    hora: Date;
    total: number;
    responsable: string;
    estado: string;
    ocupacion: number;
    observaciones: string;
    paga: boolean;
    clienteId: number;
    empleadoId: number;
    createdAt: Date,
    updatedAt: Date,
  };
}

export interface ItemsRequest{
  itemMenuId: number;
  cantidad: number;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  create(item: CreateOrdenRequest): Observable<CreateOrdenResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<CreateOrdenResponse>(`${this.apiUrl}/ordenes`, item, { headers }).pipe(
      catchError(this.errorHandler.handleError));
  }
}
