import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router , RouterLink} from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  form: FormGroup
  loading = false
  error = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.loading = false
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.error(err)
        this.error = 'No se pudo registrar usuario'
        this.loading = false
      },
    })
  }
}
