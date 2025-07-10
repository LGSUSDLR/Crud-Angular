import { Injectable, inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { tap } from 'rxjs/operators'

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService)
  const router = inject(Router)

  return auth.isAuthenticated().pipe(
    tap(isAuth => {
      if (!isAuth) router.navigate(['/login'])
    })
  )
}
