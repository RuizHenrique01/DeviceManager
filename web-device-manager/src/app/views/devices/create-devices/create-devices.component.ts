import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import { DeviceService } from 'src/app/services/device.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-devices',
  templateUrl: './create-devices.component.html',
  styleUrls: ['./create-devices.component.css']
})
export class CreateDevicesComponent implements OnInit {

  formDevice!: FormGroup;
  listCategory: Category[] = [];

   constructor(
     private formBuilder: FormBuilder,
     private router: Router,
     private categoryService: CategoryService,
     private toastService: ToastService,
     private deviceService: DeviceService
   ) { }

   ngOnInit(): void {
     this.formDevice = this.formBuilder.group({
      partNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[1-9]\\d*$')
        ]
      ],
      color: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.pattern('^[a-zA-ZÀ-ÿ\\s]*$')
        ]
      ],
      categoryId: ['', Validators.required],
     });
     this.listCategories();
   }

  listCategories() {
    this.categoryService.list().subscribe(r => this.listCategory = r);
  }

  onSubmit() {
    if (this.formDevice.invalid) {
      this.formDevice.markAllAsTouched();
      return;
    }
    const formData = {
      ...this.formDevice.value,
      partNumber: Number(this.formDevice.value.partNumber),
      categoryId: Number(this.formDevice.value.categoryId)
    };
    this.deviceService.criar(formData).subscribe({
      next: () => {
        this.toastService.show('Device added successfully!', 'success');
        this.router.navigate(['/device-manager/device']);
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.show(err.error?.message || 'An unexpected error occurred.', 'danger');
      }
    });
  }

}
