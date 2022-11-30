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
  page: number = 1;
  total: number = 100;
  constructor(private products: ProductsService) { }

  ngOnInit(): void {
    this.products.getSelectedCategoty().subscribe(value => {
      this.category = value;
    });
    this.products.getAllProducts().subscribe(value => {
      this.allProducts = value;
    })
    this.products.setAllProducts(this.page);
    this.products.getProductsByCategory().subscribe(value => {
      this.productsByCategory = value;
    })
    this.products.getProductsBySearch().subscribe(value => {
      this.productsBySearch = value;
    })
  }

  getNextPage(page: number){
    this.page = page;
    this.products.setAllProducts(page);
    this.scrollBackToTop();
  }

  scrollBackToTop():void {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
