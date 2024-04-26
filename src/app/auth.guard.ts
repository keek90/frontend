import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userToken = localStorage.getItem('users');
    if (userToken) {
      // User is logged in, allow access to route
      return true;
    } else {
      // User is not logged in, redirect to login page
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
