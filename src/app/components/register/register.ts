import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 AGREGA ESTO
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true, // 👈
  imports: [
    CommonModule,        // 👈 AGREGA ESTO
    ReactiveFormsModule, // lo que ya tienes
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']  // <--- debe estar aquí

})
export class RegisterComponent {
  registerForm: FormGroup;
  error = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }
  this.error = '';
  this.loading = true;

  const { name, email, password } = this.registerForm.value;
  this.auth.register(name, email, password).subscribe({
    next: res => {
      this.loading = false;
      console.log('Registro exitoso:', res); // <---- aquí log de éxito
      this.router.navigate(['/login']);       // tu lógica de éxito
    },
    error: err => {
      this.loading = false;
      console.error('Error en registro:', err); // <---- aquí log de error
      this.error = err.error?.message || 'Error al registrar usuario';
    }
  });
}

}
