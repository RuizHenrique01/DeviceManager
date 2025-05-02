import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  listCategory: Category[] = [];
  categorySelected?: Category;
  searchTerm: string = '';

  constructor(
    private categoryService: CategoryService,
    private toastService: ToastService
  ) { }

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
    this.categoryService.delete(this.categorySelected!.id).subscribe({
      next: () =>{
        this.toastService.show("Category removed successfully.", 'success');
        this.listCategories();
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show(err.error?.message || 'An unexpected error occurred.', 'danger');
      }
    });
  }

}
