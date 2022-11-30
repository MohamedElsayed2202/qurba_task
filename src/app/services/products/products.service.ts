import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Products{
  limit: number,
  products: ProductItem[],
  skip: number,
  total: number
}
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
  private productsByCategory: BehaviorSubject<ProductItem[]>
    constructor(private httpClient: HttpClient) {
  this.categoreis = new BehaviorSubject<string[]>([]);
  this.headerOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  this.selectedCategory = new BehaviorSubject<string>('');
  this.products = new BehaviorSubject<ProductItem[]>([]);
  this.productsByCategory = new BehaviorSubject<ProductItem[]>([])
}

getAllCategories(): BehaviorSubject < string[] > {
  this.httpClient.get<string[]>(environment.AllCategories)
    .subscribe(value => {
      this.categoreis.next(value);
    });
  return this.categoreis;
}

getSelectedCategoty(): BehaviorSubject < string > {
  return this.selectedCategory;
}

setSelectedCategory(category: string): void {
  this.selectedCategory.next(category);
  if(category !== ''){
    this.setProductsByCategpry();
  }else{
    this.productsByCategory.next([]);
  }
}

getAllProducts(skip: number): BehaviorSubject<ProductItem[]>{
  this.httpClient.get<Products>(`${environment.ProductsApi}&skip=${skip}`)
  .subscribe(value => {
    this.products.next(value.products);
  });
  return this.products;
}

private setProductsByCategpry(): void{
  this.httpClient.get<Products>(`${environment.ProductsByCategoryApi}${this.selectedCategory.value}`)
  .subscribe(value => {
    this.productsByCategory.next(value.products);
  })
}
getProductsByCategory(): BehaviorSubject<ProductItem[]>{
  return this.productsByCategory;
}
}
