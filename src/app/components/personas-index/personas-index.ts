import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona.model';

@Component({
  selector: 'app-personas-index',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personas-index.html',
  styleUrls: ['./personas-index.css'],
})
export class PersonasIndexComponent implements OnInit {
  personas: Persona[] = [];
  personaForm: FormGroup;
  mostrarFormulario = false;
  personaEditando: Persona | null = null;

  constructor(private personaService: PersonaService, private fb: FormBuilder) {
    this.personaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(2)]],
      apellidoMaterno: ['', [Validators.required, Validators.minLength(2)]],
      edad: [null, [Validators.required, Validators.min(1)]],
      genero: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarPersonas();
  }

  cargarPersonas() {
    this.personaService.getPersonas().subscribe(res => {
      this.personas = res.data.data;
    });
  }

  abrirFormulario() {
    this.personaForm.reset();
    this.mostrarFormulario = true;
    this.personaEditando = null;
  }

  cerrarFormulario() {
    this.mostrarFormulario = false;
    this.personaEditando = null;
    this.personaForm.reset();
  }

  guardarPersona() {
    if (this.personaForm.invalid) return;

    const formValue = this.personaForm.value;
    // Adaptar a snake_case
    const payload = {
      nombre: formValue.nombre,
      apellido_paterno: formValue.apellidoPaterno,
      apellido_materno: formValue.apellidoMaterno,
      edad: formValue.edad,
      genero: formValue.genero,
    };

    if (this.personaEditando) {
      this.personaService.actualizarPersona(this.personaEditando.id, payload)
        .subscribe({
          next: res => {
            // Actualizar persona en el array local
            const idx = this.personas.findIndex(p => p.id === this.personaEditando!.id);
            if (idx !== -1) this.personas[idx] = { ...res.data };
            this.cerrarFormulario();
          },
          error: err => {
            alert('Error al actualizar persona');
          }
        });
    } else {
      this.personaService.crearPersona(payload)
        .subscribe({
          next: res => {
            this.personas.unshift(res.data); // Agrega la nueva persona al inicio
            this.cerrarFormulario();
          },
          error: err => {
            alert('Error al crear persona');
          }
        });
    }
  }

  editarPersona(persona: Persona) {
    this.personaForm.setValue({
      nombre: persona.nombre,
      apellidoPaterno: persona.apellidoPaterno,
      apellidoMaterno: persona.apellidoMaterno,
      edad: persona.edad,
      genero: persona.genero,
    });
    this.personaEditando = persona;
    this.mostrarFormulario = true;
  }

  eliminarPersona(persona: Persona) {
    if (confirm('¿Eliminar persona?')) {
      this.personaService.eliminarPersona(persona.id).subscribe(() => {
        this.personas = this.personas.filter(p => p.id !== persona.id);
      });
    }
  }
}
