import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { SideNavbarComponent } from '../../../public/components/side-navbar/side-navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ToolBarComponent } from '../../../public/components/tool-bar/tool-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatSelect,
    MatOption,
    SideNavbarComponent,
    MatCardModule,
    MatIconModule,
    ToolBarComponent,
  ],
  templateUrl: './product-create-and-edit.component.html',
  styleUrl: './product-create-and-edit.component.css',
})
export class ProductCreateAndEditComponent {
  productForm: FormGroup;
  selectedFile: File | null = null;

  // Notification UI state
  showNotification: boolean = false;
  notificationTitle: string = '';
  notificationContent: string = '';
  notificationType: 'success' | 'alert' = 'success';
  imagePreviewUrl: string | null = null;
  isSubmitting: boolean = false;

  brands = ['Tabernero', 'SantiagoQueirolo', 'Porton', 'Cristal', 'JhonnieWalker', 'JackDaniels', 'Budweiser', 'Heineken', 'Corona', 'PilsenCallao', 'Cusquena', 'Cartavio'];
  liquorTypes = ['Rum', 'Whisky', 'Gin', 'Vodka', 'Tequila', 'Brandy', 'Wine', 'Beer', 'Creamy', 'Herbal', 'Fruity', 'Special'];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      brandName: ['', Validators.required],
      liquorType: ['', Validators.required],
      unitPriceAmount: ['', Validators.required],
      minimumStock: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.imagePreviewUrl = URL.createObjectURL(this.selectedFile);
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit(): void {
    this.showNotification = false;

    if (this.productForm.invalid) {
      this.setNotification('Validation Error', 'Please fill in all required fields.', 'alert');
      return;
    }

    const productData = this.productForm.value;
    this.isSubmitting = true;

    this.productService.createProduct(productData, this.selectedFile).subscribe({
      next: (response) => {
        console.log('Product created successfully:', response);
        this.setNotification('Success!', 'Product created successfully.', 'success');
        this.productForm.reset();
        this.selectedFile = null;
        setTimeout(() => this.router.navigate(['/storage']), 1000);
      },
      error: (error) => {
        console.error('Error creating product:', error);
        this.setNotification('Error', 'An error occurred while creating the product. Please try again.', 'alert');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/storage']);
  }

  private setNotification(title: string, content: string, type: 'success' | 'alert') {
    this.notificationTitle = title;
    this.notificationContent = content;
    this.notificationType = type;
    this.showNotification = true;
  }
}
