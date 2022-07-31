import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Habilidad } from 'src/app/models/habilidad';
import { HabilidadService } from 'src/app/servicios/habilidad.service';

@Component({
  selector: 'app-hard-soft-skill',
  templateUrl: './hard-soft-skill.component.html',
  styleUrls: ['./hard-soft-skill.component.css']
})
export class HardSoftSkillComponent implements OnInit {

  public habilidad: Habilidad[]=[];
  public editarHabilidad: Habilidad | undefined;
  public borrarHabilidad: Habilidad | undefined;


  constructor(private habilidadServicio:HabilidadService) { }

  ngOnInit(): void {
    this.traerHabilidad();
  }

  public traerHabilidad():void{
    this.habilidadServicio.traerHabilidad().subscribe({
      next:(Response:Habilidad[])=>{
        this.habilidad = Response;
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })

  }

  public abrirModal(modo: String, habilidad?: Habilidad): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (modo === "add") {
      button.setAttribute('data-bs-target', '#guardarHabilidadModal');
    } else if (modo === "delete") {
      this.borrarHabilidad = habilidad;
      button.setAttribute('data-bs-target', '#borrarHabilidadModal');
    } else if (modo === "edit") {
      this.editarHabilidad = habilidad;
      button.setAttribute('data-bs-target', '#editarHabilidadModal');
    }
    container?.appendChild(button);
    button.click();

  }
  public guardarHabilidad(guardarForm: NgForm): void {
    document.getElementById('guardar-proyecto-form')?.click();
    this.habilidadServicio.guardarHabilidad(guardarForm.value).subscribe({
      next: (response: Habilidad) => {
        console.log(response);
        this.traerHabilidad();
        guardarForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        guardarForm.reset();
      }
    })
  }
  public actualizarHabilidad(habilidad: Habilidad) {
    this.editarHabilidad = habilidad;
    document.getElementById('editar-habilidad-form')?.click();
    this.habilidadServicio.actualizarHabilidad(habilidad).subscribe({
      next: (response: Habilidad) => {
        console.log(response);
        this.traerHabilidad();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })

  }
  public borrarUnaHabilidad(idProy: number): void {

    this.habilidadServicio.borrarHabilidad(idProy).subscribe({
      next: (response: void) => {
        console.log(response);
        this.traerHabilidad();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })

  }
}
