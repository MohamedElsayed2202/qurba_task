import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private auth: AuthService) {
    // declareing the form controlles and its validation using reactive form
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
  }

  // to get all form controlles
  get formControlles() {
    return this.loginForm.controls;
  }

  // to return error message based on if user name controll has error or not
  getUserNameErrorMessage(){
    return this.loginForm.controls['userName'].hasError('required') ? 'required field': '';
  }

  // to return error message based on if password controll has error or not
  getPasswordErrorMessage(){
    return this.loginForm.controls['password'].hasError('required') ? 'required field': '';
  }

  // to submit the form data and calling login method to get user token 
  onSubmit():void{
    const cred = {
      username: this.loginForm.controls['userName'].value,
      password: this.loginForm.controls['password'].value,
      expiresInMins: 60
    }
    this.auth.login(cred);
  }
}
