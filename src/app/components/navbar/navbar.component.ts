import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged:boolean =  false;
  keyword: string = ''
  constructor(private auth: AuthService, private products: ProductsService) { }

  ngOnInit(): void {
    this.auth.getIsLoggedIn().subscribe(value => {
      this.isLogged = value;
    })
  }

  search():void{
    console.log(this.keyword);
    this.products.setProdctsBySearch(this.keyword);
  }
}
