import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  listCategory: Category[] = [];
  categorySelected?: Category;
  searchTerm: string = '';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories() {
    this.categoryService.list().subscribe(r => this.listCategory = r);
  }

  filteredCategories(): Category[] {
    return this.listCategory.filter(category =>
      category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectCategory(category: Category){
    this.categorySelected = category;
  }

  deleteCategory(){
    this.categoryService.delete(this.categorySelected!.id).subscribe(() => this.listCategories());
  }

}
