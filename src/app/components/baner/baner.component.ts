import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { PerfilService } from 'src/app/servicios/perfil.service';

@Component({
  selector: 'app-baner',
  templateUrl: './baner.component.html',
  styleUrls: ['./baner.component.css']
})
export class BanerComponent implements OnInit {
  public usuario: Usuario | undefined;
  public actualizarUsuario: Usuario | undefined;

  constructor(private perfilServicio: PerfilService) { }

  ngOnInit(): void {
    this.traerUsuario();
  }

  public traerUsuario():void{
    this.perfilServicio.traerUsuario().subscribe({
      next:(response: Usuario)=>{
        this.usuario=response;
      },error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

}
