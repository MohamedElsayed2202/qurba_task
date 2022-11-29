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
    this.products.getAllCategories().subscribe(value => {
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
    this.categories.forEach(element => {
      if(element.id === item.id){
        element.selected = !element.selected;
        if(element.selected){
          this.products.setSelectedCategory(item.title);
        }else{
          this.products.setSelectedCategory('');
        }
      }else{
        element.selected = false;
      }
    });
    
  }

}
