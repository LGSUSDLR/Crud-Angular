import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonasService } from '../../services/persona.service';
import { Persona } from '../../models/persona.model';

@Component({
  selector: 'app-personas-store',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personas-store.html',
  styleUrls: ['./personas-store.css'],
})
export class PersonasStoreComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  editMode = false;
  personaId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personaService: PersonasService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(0), Validators.max(130)]],
      genero: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.personaId = id;
        this.loadPersona(id);
      }
    });
  }

 loadPersona(id: string) {
  this.loading = true;
  this.personaService.getById(id).subscribe({
    next: (res) => {
      // Mapear camelCase a snake_case para el form
      const data = res.data;
      this.form.patchValue({
        nombre: data.nombre,
        apellido_paterno: data.apellidoPaterno ?? '',      // 👈
        apellido_materno: data.apellidoMaterno ?? '',      // 👈
        edad: data.edad,
        genero: data.genero,
      });
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      alert('Error al cargar persona');
      this.loading = false;
    },
  });
}
  

onSubmit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    console.log('[onSubmit] Formulario inválido');
    return;
  }

  const data = this.form.value;
  this.loading = true;
  console.log('[onSubmit] Enviando datos:', data);

  const action$ = this.editMode && this.personaId
    ? this.personaService.update(this.personaId, data)
    : this.personaService.create(data);

  action$.subscribe({
    next: () => {
      this.loading = false;
      console.log('[onSubmit] Persona guardada correctamente, redirigiendo...');
      this.router.navigate(['/dashboard/personas']);
    },
    error: (err) => {
      this.loading = false;
      console.log('[onSubmit] Error al guardar:', err);
  console.log('[onSubmit] Error status:', err?.status); // 👈 Agrega este log
      // Si el error es 401, el interceptor ya se encarga de todo
      if (err && err.status !== 401) {
        alert('Error al guardar');
      } else if (err && err.status === 401) {
        console.log('[onSubmit] Error 401 detectado, el interceptor debería redirigir al login.');
      }
    }
  });
}


  cancelar() {
    this.router.navigate(['/dashboard/personas']);
  }

  campoInvalido(campo: string): boolean {
    const ctrl = this.form.get(campo);
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }
}
