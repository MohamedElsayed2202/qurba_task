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
  constructor(private router: Router, private auth: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('token');
      // if the toke equals to null return to login page to relogin the use
    if (!token) {
      this.router.navigateByUrl("/login")
      return false
    }
    else {
      // here we check if token is expired
      let expired = this.helper.isTokenExpired(token);
      // if expired return to login page to log user again
      if (expired) {
        localStorage.clear();
        this.router.navigateByUrl("/login")
        return false
      } else {
        // if not continue to the path he was going to and change the state of login to true
        this.auth.setIsLoggedIn(true);
        return true;
      }
    }
  }

}
