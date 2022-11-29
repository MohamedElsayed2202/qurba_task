import { Component, Input, OnInit } from '@angular/core';
import { ProductItem } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product: ProductItem = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: ['','']
  }
  constructor() { }

  ngOnInit(): void {
  }

  getPriceAfterDis(): string{
    const disAmount = this.product.price * (this.product.discountPercentage / 100);
    return (this.product.price - disAmount).toFixed(2)
  }
}
