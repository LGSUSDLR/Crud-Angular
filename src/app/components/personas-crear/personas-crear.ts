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
  creando = false;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private router: Router
  ) {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1)]],
      genero: ['', Validators.required],
    });
  }

  guardarPersona() {
    if (this.personaForm.valid) {
      this.creando = true;
      this.personaService.crearPersona(this.personaForm.value).subscribe({
        next: () => {
          this.mensajeExito = '✅ Persona creada exitosamente';
          this.creando = false;
          this.personaForm.reset();
          setTimeout(() => {
            this.mensajeExito = '';
            this.router.navigate(['/dashboard/personas'], { state: { mensaje: '¡Persona creada exitosamente!' } });
          }, 1200);
        },
        error: () => {
          this.mensajeExito = '❌ Ocurrió un error al crear la persona.';
          this.creando = false;
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/dashboard/personas']);
  }
}
