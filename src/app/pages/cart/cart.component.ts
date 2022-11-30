import { Component, OnInit } from '@angular/core';
import { Cart, CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Cart = {products: []};
  constructor(private cartServ: CartService) { }

  ngOnInit(): void {
    this.cartServ.getCart().subscribe(value => {
      this.cart = value;
    })
  }

}
