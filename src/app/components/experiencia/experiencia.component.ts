import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  public experiencia: Experiencia[] =[];
  public editarExperiencia: Experiencia | undefined;
  public borrarExperiencia: Experiencia | undefined;

  constructor(private experienciaServicio:ExperienciaService) { }

  ngOnInit(): void {
    this.traerExperiencia();
  }

  public traerExperiencia(): void {
    this.experienciaServicio.traerExperiencia().subscribe({
      next: (Response: Experiencia[]) => {
        this.experiencia = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public abrirModal(modo: String, experiencia?: Experiencia): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (modo === "add") {
      button.setAttribute('data-bs-target', '#guardarExperienciaModal');
    } else if (modo === "delete") {
      this.borrarExperiencia = experiencia;
      button.setAttribute('data-bs-target', '#borrarExperienciaModal');
    } else if (modo === "edit") {
      this.editarExperiencia = experiencia;
      button.setAttribute('data-bs-target', '#editarExperienciaModal');
    }
    container?.appendChild(button);
    button.click();

  }
  public guardarExperiencia(guardarForm: NgForm): void {
    document.getElementById('guardar-experiencia-form')?.click();
    this.experienciaServicio.guardarExperiencia(guardarForm.value).subscribe({
      next: (response: Experiencia) => {
        console.log(response);
        this.traerExperiencia();
        guardarForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        guardarForm.reset();
      }
    })
  }

  public actualizarExperiencia(experiencia: Experiencia) {
    this.editarExperiencia = experiencia;
    document.getElementById('editar-proyecto-form')?.click();
    this.experienciaServicio.actualizarExperiencia(experiencia).subscribe({
      next: (response: Experiencia) => {
        console.log(response);
        this.traerExperiencia();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })

  }
  public borrarUnaExperiencia(idExp: number): void {

    this.experienciaServicio.borrarExperiencia(idExp).subscribe({
      next: (response: void) => {
        console.log(response);
        this.traerExperiencia();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })

  }

}
