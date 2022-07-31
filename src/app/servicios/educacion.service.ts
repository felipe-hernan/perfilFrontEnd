import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public traerEducacion(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(`${this.apiServerUrl}/educacion/listar`);
  }

  public actualizarEducacion(educacion: Educacion): Observable<Educacion> {
    return this.http.put<Educacion>(`${this.apiServerUrl}/educacion/actualizar`, educacion);
  }

  public guardarEducacion(educacion: Educacion):Observable<Educacion>{
    return this.http.post<Educacion>(`${this.apiServerUrl}/educacion/guardar`, educacion);
  }

  public borrarEducacion(educacionId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/educacion/borrar/${educacionId}`);
  }
}
