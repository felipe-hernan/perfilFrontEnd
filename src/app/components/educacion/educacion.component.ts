import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public educacion: Educacion[] = [];
  public editarEducacion: Educacion | undefined;
  public borrarEducacion: Educacion | undefined;

  constructor(private educacionServicio: EducacionService) { }

  ngOnInit(): void {
    this.traerEducacion();
  }

  public traerEducacion(): void {
    this.educacionServicio.traerEducacion().subscribe({
      next: (Response: Educacion[]) => {
        this.educacion = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  public abrirModal(modo: String, educacion?: Educacion): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (modo === "add") {
      button.setAttribute('data-bs-target', '#guardarEducacionModal');
    } else if (modo === "delete") {
      this.borrarEducacion = educacion;
      button.setAttribute('data-bs-target', '#borrarEducacionModal');
    } else if (modo === "edit") {
      this.editarEducacion = educacion;
      button.setAttribute('data-bs-target', '#editarEducacionModal');
    }
    container?.appendChild(button);
    button.click();

  }
  public guardarEducacion(guardarForm: NgForm): void {
    document.getElementById('guardar-educacion-form')?.click();
    this.educacionServicio.guardarEducacion(guardarForm.value).subscribe({
      next: (response: Educacion) => {
        console.log(response);
        this.traerEducacion();
        guardarForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        guardarForm.reset();
      }
    })
  }

  public actualizarEducacion(educacion: Educacion) {
    this.editarEducacion = educacion;
    document.getElementById('editar-proyecto-form')?.click();
    this.educacionServicio.actualizarEducacion(educacion).subscribe({
      next: (response: Educacion) => {
        console.log(response);
        this.traerEducacion();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })

  }
  public borrarUnaEducacion(idProy: number): void {

    this.educacionServicio.borrarEducacion(idProy).subscribe({
      next: (response: void) => {
        console.log(response);
        this.traerEducacion();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })

  }

}
