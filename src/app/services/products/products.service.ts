import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

// an interface for returned data
export interface Products{
  limit: number,
  products: ProductItem[],
  skip: number,
  total: number
}
// an interface for products only
export interface ProductItem {
  id: number,
  title: string,
  description: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: string[]
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private categoreis: BehaviorSubject<string[]>;
  private headerOptions
  private selectedCategory: BehaviorSubject<string>;
  private products: BehaviorSubject<ProductItem[]>;
  private productsByCategory: BehaviorSubject<ProductItem[]>;
  private productsBySearch: BehaviorSubject<ProductItem[]>;
    constructor(private httpClient: HttpClient) {
  this.categoreis = new BehaviorSubject<string[]>([]);
  this.headerOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  this.selectedCategory = new BehaviorSubject<string>('');
  this.products = new BehaviorSubject<ProductItem[]>([]);
  this.productsByCategory = new BehaviorSubject<ProductItem[]>([]);
  this.productsBySearch = new BehaviorSubject<ProductItem[]>([]);
}

// to return categories list after calling the api that returns all available categories  as a behavior subject to listeng for any changes happens to the list
getAllCategories(): BehaviorSubject < string[] > {
  this.httpClient.get<string[]>(environment.AllCategories)
    .subscribe(value => {
      this.categoreis.next(value);
    });
  return this.categoreis;
}
// to return selectedCategory string as behavior subject to listeng for any changes happens to it
getSelectedCategoty(): BehaviorSubject < string > {
  return this.selectedCategory;
}
// to set the new value of selectedCategory
setSelectedCategory(category: string): void {
  this.selectedCategory.next(category);
  if(category !== ''){
    // if the value ! == '' call setProductsByCategpry to get products by category
    this.setProductsByCategpry();
  }else{
    // if not set the new value of productsByCategory list with empty array
    this.productsByCategory.next([]);
  }
}

// to return Product list as behavior subject to listeng for any changes happens to it (pagination)
getAllProducts(): BehaviorSubject<ProductItem[]>{
  return this.products;
}

// to set products with data after calling the api to get all products with pagination and notify the products list
setAllProducts(page: number): void{
  let skip = (page - 1) * 9 
  this.httpClient.get<Products>(`${environment.ProductsApi}&skip=${skip}`)
  .subscribe(value => {
    this.products.next(value.products);
  });
}
// to set productsByCategory with data after calling the api to get all products for selected category and notify the productsByCategory list
private setProductsByCategpry(): void{
  this.httpClient.get<Products>(`${environment.ProductsByCategoryApi}${this.selectedCategory.value}`)
  .subscribe(value => {
    this.productsByCategory.next(value.products);
  })
}
// to return productsByCategory list as behavior subject to listeng for any changes happens to
getProductsByCategory(): BehaviorSubject<ProductItem[]>{
  return this.productsByCategory;
}
// to return productsBySearch list as behavior subject to listeng for any changes happens to
getProductsBySearch(): BehaviorSubject<ProductItem[]>{
  return this.productsBySearch;
}

// to set productsBySearch with data after calling the api to get all products for selected category and notify the productsBySearch list
setProdctsBySearch(keyword: string): void{
  if(keyword !== ''){
    // call the api of the keyword !== ''
    this.httpClient.get<Products>(`${environment.ProductsBySearchApi}${keyword}`)
  .subscribe(value => {
    this.productsBySearch.next(value.products);
  })
  }else{
    // else set the productsBySearch list new value with empty list []
    this.productsBySearch.next([]);
  }
}
}
