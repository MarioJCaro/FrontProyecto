import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';

export interface GetAllMesasResponse {
  items: MesasResponse[];  // Aquí es un array de ítems, no un solo ítem
}

export interface MesasResponse {
  id: number;
  nroMesa: number;
  libre: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MesasRequest {
    mesas: MesasResponse[];
}


export interface MesasOcupadasResponse {
    mesas: MesasResponse[];
    totalCount: number;
    libreCount: number;
    ocupadasCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class MesasService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getAll(): Observable<GetAllMesasResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/mesas`;

    return this.http.get<GetAllMesasResponse>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  getOcupadas(): Observable<MesasOcupadasResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/mesas/ocupadas`;

    return this.http.get<MesasOcupadasResponse>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }
}
