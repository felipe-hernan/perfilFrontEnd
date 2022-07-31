import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  public proyecto: Proyecto[] = [];
  public editarProyecto: Proyecto | undefined;
  public borrarProyecto: Proyecto | undefined;

  constructor(private proyectoServicio: ProyectoService) { }

  ngOnInit(): void {
    this.traerProyecto();
  }
  public traerProyecto(): void {
    this.proyectoServicio.traerProyecto().subscribe({
      next: (Response: Proyecto[]) => {
        this.proyecto = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public abrirModal(modo: String, proyecto?: Proyecto): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (modo === "add") {
      button.setAttribute('data-bs-target', '#guardarProyectoModal');
    } else if (modo === "delete") {
      this.borrarProyecto = proyecto;
      button.setAttribute('data-bs-target', '#borrarProyectoModal');
    } else if (modo === "edit") {
      this.editarProyecto = proyecto;
      button.setAttribute('data-bs-target', '#editarProyectoModal');
    }
    container?.appendChild(button);
    button.click();

  }
  public guardarProyecto(guardarForm: NgForm): void {
    document.getElementById('guardar-proyecto-form')?.click();
    this.proyectoServicio.guardarProyecto(guardarForm.value).subscribe({
      next: (response: Proyecto) => {
        console.log(response);
        this.traerProyecto();
        guardarForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        guardarForm.reset();
      }
    })
  }

  public actualizarProeycto(proyecto: Proyecto) {
    this.editarProyecto = proyecto;
    document.getElementById('editar-proyecto-form')?.click();
    this.proyectoServicio.actualizarProyecto(proyecto).subscribe({
      next: (response: Proyecto) => {
        console.log(response);
        this.traerProyecto();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })

  }
  public borrarUnProyecto(idProy: number): void {

    this.proyectoServicio.borrarProyecto(idProy).subscribe({
      next: (response: void) => {
        console.log(response);
        this.traerProyecto();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })

  }



}
