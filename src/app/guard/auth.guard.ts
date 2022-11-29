import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  helper = new JwtHelperService();
  token = localStorage.getItem('token');
  constructor(private router: Router, private auth: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.token) {
      this.router.navigateByUrl("/login")
      return false
    }
    else {
      let expired = this.helper.isTokenExpired(this.token);
      if (expired) {
        this.router.navigateByUrl("/login")
        return false
      } else {
        this.auth.setIsLoggedIn(true);
        return true;
      }
    }
  }

}
