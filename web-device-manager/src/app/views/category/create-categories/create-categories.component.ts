import { ToastService } from 'src/app/services/toast.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent implements OnInit {

  formCategory!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.formCategory = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(128)
      ])]
    });
  }

  onSubmit() {
    if (this.formCategory.invalid) {
      this.formCategory.markAllAsTouched();
      return;
    }

    this.categoryService.criar(this.formCategory.value).subscribe({
      next: () => {
        this.toastService.show('Category added successfully!', 'success');
        this.router.navigate(['/device-manager/category']);
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show(err.error?.message || 'An unexpected error occurred.', 'danger');
      }
    });
  }

}
