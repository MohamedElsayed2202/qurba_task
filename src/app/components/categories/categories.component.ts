import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

export interface CategoryItem{
  id: number,
  title: string,
  selected: boolean
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: CategoryItem[] = [];
  constructor(private products: ProductsService) { }

  ngOnInit(): void {
    // calling the getAllCategoreis and assign the returned value to this local variable
    this.products.getAllCategories().subscribe(value => {
      this.categories = [];
      value.forEach((element, index) => {
        let item:CategoryItem = {
          id: index +1 ,
          title: element.charAt(0).toUpperCase() + element.slice(1),
          selected: false
        }
        this.categories.push(item);
      });
    })
  }

  selectCategory(item: CategoryItem):void{
    // listening to the change of value
    this.categories.forEach(element => {
      if(element.id === item.id){
        // if condition is trur just only mark the selected value
        element.selected = !element.selected;
        if(element.selected){
        // if the condition is trur call setSelectedCategory

          this.products.setSelectedCategory(item.title);
        }else{
          // if not trur call setSelectedCategory with empty string
          this.products.setSelectedCategory('');
        }
      }else{
        // if condition is not trur unmark all values
        element.selected = false;
      }
    });
    
  }

}
