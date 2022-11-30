import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Cart, CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLogged:boolean =  false;
  keyword: string = ''
  cart: Cart = {products: []};
  constructor(private auth: AuthService, private products: ProductsService, private cartServ: CartService) { }

  ngOnInit(): void {
    // here we are listening to login status changes
    this.auth.getIsLoggedIn().subscribe(value => {
      this.isLogged = value;
    })
    // here we are listening to cart status changes to notify html doc with it
    this.cartServ.getCart().subscribe(value => {
      this.cart = value;
    })
  }

  search():void{
    // listening for input change to trigre setProdctsBySearch
    this.products.setProdctsBySearch(this.keyword);
  }
}
