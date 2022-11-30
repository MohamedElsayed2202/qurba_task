import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private helper = new JwtHelperService();
  private isLoggedIn: BehaviorSubject<boolean>;

  private headerOptions;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.isLoggedIn = new BehaviorSubject<boolean>(false);
    this.headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }


  //  calling login api with user cred to authenticate the user and saving token to locale storage 
  login(cred: any): void {
    this.httpClient.post<any>(environment.AuthApi, JSON.stringify(cred), this.headerOptions)
      .subscribe(value => {
          localStorage.setItem('token', value.token);
          this.router.navigateByUrl("");
      })
  }

  //  to return the login state
  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  //  to change the login state
  setIsLoggedIn(value: boolean): void {
    this.isLoggedIn.next(value);
  }
}
