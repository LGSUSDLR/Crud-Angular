import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = '';

    this.http.post<any>('http://localhost:4444/login', this.loginForm.value)
      .subscribe({
        next: res => {
          this.loading = false;

          // --- GUARDAR TOKEN ---
          const accessToken = res?.data?.accessToken; // <- el nombre correcto según tu backend
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            this.router.navigate(['/dashboard']);
          } else {
            this.error = 'No se recibió el token de acceso';
          }
        },
        error: err => {
          console.error('Login error:', err);
          this.error = err.error?.message || 'Error al iniciar sesión';
          this.loading = false;
        }
      });
  }
}
