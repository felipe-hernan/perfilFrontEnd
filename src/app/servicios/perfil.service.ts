import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiServerUrl = 'https://baseperfilpersonal.herokuapp.com';
  constructor(private http: HttpClient) { }

  public traerUsuario():Observable<Usuario>{
   return this.http.get<Usuario>(`${this.apiServerUrl}/usuario/id/1`);
  }

  public actualizarUsuario(usuario:Usuario):Observable<ArrayBuffer>{
    return this.http.put<ArrayBuffer>(`${this.apiServerUrl}/usuario/actualizar/1?nombre=${usuario.nombre}&apellido=${usuario.apellido}&titulo=${usuario.titulo}&profecion=${usuario.profecion}&origen=${usuario.origen}&descripcion=${usuario.descripcion}&imagen=${usuario.imagen}`,usuario);
  }

}
