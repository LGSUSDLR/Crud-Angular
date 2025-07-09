import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personas-crear',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './personas-crear.html',
  styleUrls: ['./personas-crear.css']
})
export class PersonasCrearComponent {
  personaForm: FormGroup;
  mensajeExito = '';
  mensajeError = '';
  creando = false;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private router: Router
  ) {
    this.personaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido_paterno: ['', [Validators.required, Validators.minLength(2)]],
      apellido_materno: ['', [Validators.required, Validators.minLength(2)]],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      genero: ['', Validators.required],
    });
  }

  guardarPersona() {
    if (this.personaForm.invalid) {
      this.personaForm.markAllAsTouched();
      return;
    }

    this.creando = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    this.personaService.crearPersona(this.personaForm.value).subscribe({
      next: (response) => {
        this.creando = false;
        if (response.success) {
          this.mensajeExito = '✅ Persona creada exitosamente';
          this.personaForm.reset();
          
          // Redirigir después de 2 segundos con mensaje de éxito
          setTimeout(() => {
            this.router.navigate(['/dashboard/personas'], { 
              state: { mensaje: 'Persona creada exitosamente' } 
            });
          }, 2000);
        } else {
          this.mensajeError = '❌ Error al crear la persona';
        }
      },
      error: (error) => {
        this.creando = false;
        console.error('Error al crear persona:', error);
        this.mensajeError = error.error?.message || '❌ Error al crear la persona';
      }
    });
  }

  cancelar() {
    this.router.navigate(['/dashboard/personas']);
  }
}