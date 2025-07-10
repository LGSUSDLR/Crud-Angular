import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  form: FormGroup
  loading = false
  error = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  campoInvalido(campo: string): boolean {
    const c = this.form.get(campo)
    return !!c && c.invalid && (c.dirty || c.touched)
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.loading = true
    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        console.error(err)
        this.error = 'Credenciales inválidas o error de servidor'
        this.loading = false
      },
    })
  }
}
