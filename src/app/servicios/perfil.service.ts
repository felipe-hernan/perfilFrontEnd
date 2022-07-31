import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiServerUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  public traerUsuario():Observable<Usuario>{
   return this.http.get<Usuario>(`${this.apiServerUrl}/usuario/id/1`);
  }

  public actualizarUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.apiServerUrl}/usuario/actualizar`,usuario);
  }

}
