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
}
