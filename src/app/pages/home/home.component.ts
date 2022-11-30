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
    // to listening to the changes in category (filter products by category) to notify html doc with new data
    this.products.getSelectedCategoty().subscribe(value => {
      this.category = value;
    });
    // to listening to all products and changes on it and bind it with local valiable
    this.products.getAllProducts().subscribe(value => {
      this.allProducts = value;
    })
    // to get the first 9 products usin first page that equals to 1
    this.products.setAllProducts(this.page);
    // to get the actual list of filterd category and bind it with local variable
    this.products.getProductsByCategory().subscribe(value => {
      this.productsByCategory = value;
    })
    // to listening and get list of product that user searched for using input field in navbar
    this.products.getProductsBySearch().subscribe(value => {
      this.productsBySearch = value;
    })
  }

  // to get the next or priv 9 products using pagination 
  changePage(page: number){
    this.page = page;
    this.products.setAllProducts(page);
    this.scrollBackToTop();
  }

  // to scroll back to top after updating the products with next or priv 9 products
  scrollBackToTop():void {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
