import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent implements OnInit {

  formCategory!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formCategory = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(128)
      ])],
      description: ['']
    });
  }

  onSubmit() {
    if (this.formCategory.invalid) {
      this.formCategory.markAllAsTouched();
      return;
    }

    this.categoryService.criar(this.formCategory.value).subscribe(() => {
      this.router.navigate(['/device-manager/category'])
    });
  }

}
