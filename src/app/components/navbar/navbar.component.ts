import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged:boolean =  false;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getIsLoggedIn().subscribe(value => {
      this.isLogged = value;
    })
  }

}
