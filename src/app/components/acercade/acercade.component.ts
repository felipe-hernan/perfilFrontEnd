import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { PerfilService } from 'src/app/servicios/perfil.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {

  public usuario: Usuario | undefined;
  public editarUsuario: Usuario | undefined;

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
