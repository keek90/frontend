// auth.guard.ts

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import map operator from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/compat/auth';
 // Import AngularFireAuth for authentication

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
 /* constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth// Inject AngularFireAuth
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedRole = next.data['expectedRole'];
    return this.afAuth.authState.pipe(
      map(user => {
        if (!user || !this.authService.isLoggedIn()) {
          this.router.navigate(['/login']);
          return false;
        }
        return this.authService.getUserRole(user.uid) === expectedRole;
      })
    );
  }*/
}
