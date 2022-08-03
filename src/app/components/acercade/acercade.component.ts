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

  public abrirModal(modo: String, usuario?: Usuario): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (modo === "edit") {
      this.editarUsuario = usuario;
      button.setAttribute('data-bs-target', '#editarUsuarioModal');
    }
    container?.appendChild(button);
    button.click();

  }
  public actualizarUsuario(usuario:Usuario):void {
    this.editarUsuario = usuario;
    this.perfilServicio.actualizarUsuario(usuario).subscribe({
      next: (response: ArrayBuffer) => {
        console.log(response);
        this.traerUsuario();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })

  }

}
