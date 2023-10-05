import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class MesaService {


  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  obtenerMesas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mesas`);
  }

  actualizarEstadoMesa(id: string, estaLibre: boolean, numeroDeMesa: string): Observable<any> {
    const url = `${this.apiUrl}/mesas/${id}`;
    const estado = { 
      estaLibre: estaLibre,  // En lugar de esta_libre
      numeroDeMesa: numeroDeMesa  // Añadido este campo
    };
    console.log(estado);
    return this.http.put(url, estado);
  }
  
  
}