import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidad } from '../models/habilidad';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {
  private apiServerUrl = 'https://baseperfilpersonal.herokuapp.com';
  constructor(private http: HttpClient) { }

  public traerHabilidad(): Observable<Habilidad[]> {
    return this.http.get<Habilidad[]>(`${this.apiServerUrl}/habilidad/listar`);
  }

  public actualizarHabilidad(habilidad: Habilidad): Observable<Habilidad> {
    return this.http.put<Habilidad>(`${this.apiServerUrl}/habilidad/actualizar`, habilidad);
  }

  public guardarHabilidad(habilidad: Habilidad):Observable<Habilidad>{
    return this.http.post<Habilidad>(`${this.apiServerUrl}/habilidad/guardar`, habilidad);
  }

  public borrarHabilidad(habilidadId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/habilidad/borrar/${habilidadId}`);
  }
}
