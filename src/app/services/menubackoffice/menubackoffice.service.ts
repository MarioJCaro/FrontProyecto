import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from '../errorHandling/error-handling.service';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Grupo } from 'src/app/models/grupo.model';

export interface CreateItemMenuRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: number;
  grupoId: number;
}

export interface CreateItemResponse {
  total: number,
  item: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: number;
    grupoId: number;
  };
}
  

export interface GetAllItemMenuResponse {
  total: number;
  items: ItemMenuResponse[];  // Aquí es un array de ítems, no un solo ítem
}

export interface ItemMenuResponse {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: number;
  grupo: Grupo;
}

@Injectable({
  providedIn: 'root'
})
export class MenubackofficeService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private errorHandler:ErrorHandlingService) { }

  getAll(currentPage: number, pageSize: number, campo?: string, valor?: any): Observable<GetAllItemMenuResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let url = `${this.apiUrl}/itemsMenu?page=${currentPage}&limit=${pageSize}`;

    if (campo && valor) {
        url += `&${campo}=${valor}`;
    }

    return this.http.get<GetAllItemMenuResponse>(url, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }

  //getItem por id
  getItem(id: number): Observable<ItemMenuResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<ItemMenuResponse>(`${this.apiUrl}/itemsMenu/${id}`, { headers }).pipe(
        catchError(this.errorHandler.handleError)
    );
  }
  
}
