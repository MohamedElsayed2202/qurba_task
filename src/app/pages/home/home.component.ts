import { Component, OnInit } from '@angular/core';
import { ProductItem, ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  category: string = '';
  allProducts: ProductItem[] = [];
  productsByCategory: ProductItem[] = [];
  productsBySearch: ProductItem[] = [];
  constructor(private products: ProductsService) { }

  ngOnInit(): void {
    this.products.getSelectedCategoty().subscribe(value => {
      this.category = value;
    });
    this.products.getAllProducts(0).subscribe(value => {
      this.allProducts = value;
    });
    this.products.getProductsByCategory().subscribe(value => {
      this.productsByCategory = value;
    })
    this.products.getProductsBySearch().subscribe(value => {
      this.productsBySearch = value;
    })
  }

}
