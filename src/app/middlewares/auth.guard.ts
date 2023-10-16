import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['roles'];
    const currentUser = localStorage.getItem('role');  

    if (currentUser && expectedRoles.includes(currentUser)) {
      return true;
    }

    this.router.navigate(['/access-denied']);
    return false;
  }
}
