import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  private apiServerUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  public traerExperiencia(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(`${this.apiServerUrl}/experiencia/listar`);
  }

  public actualizarExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.put<Experiencia>(`${this.apiServerUrl}/experiencia/actualizar`, experiencia);
  }

  public guardarExperiencia(experiencia: Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(`${this.apiServerUrl}/experiencia/guardar`, experiencia);
  }

  public borrarExperiencia(experienciaId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/experiencia/borrar/${experienciaId}`);
  }
}
