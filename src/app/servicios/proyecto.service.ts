import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiServerUrl = 'https://baseperfilpersonal.herokuapp.com';

  constructor(private http: HttpClient) { }

  public traerProyecto(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.apiServerUrl}/proyecto/listar`);
  }

  public actualizarProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${this.apiServerUrl}/proyecto/actualizar`, proyecto);
  }

  public guardarProyecto(proyecto: Proyecto):Observable<Proyecto>{
    return this.http.post<Proyecto>(`${this.apiServerUrl}/proyecto/guardar`, proyecto);
  }

  public borrarProyecto(proyectoId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/proyecto/borrar/${proyectoId}`);
  }
}
