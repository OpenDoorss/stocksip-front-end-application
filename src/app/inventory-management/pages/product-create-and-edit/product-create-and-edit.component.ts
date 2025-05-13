import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BaseFormComponent} from '../../../shared/components/base-form.component';
import {Product} from '../../model/product.entity';
import {Inventory} from '../../model/inventory.entity';
import {FormsModule, NgForm} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';

@Component({
  selector: 'app-product-create-and-edit',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatFormField
  ],
  templateUrl: './product-create-and-edit.component.html',
  styleUrl: './product-create-and-edit.component.css'
})
export class ProductCreateAndEditComponent extends BaseFormComponent {
  @Input() inventory!: Inventory;

  @Input() product!: Product;

  @Input() editMode: boolean = false;

  @Output() protected productAddRequested = new EventEmitter<Product>();

  @Output() protected productUpdateRequested = new EventEmitter<Product>();

  @Output() protected cancelRequested = new EventEmitter<void>();

  @ViewChild('productForm', {static: false}) protected productForm!: NgForm;

  constructor() {
    super();
    this.product = new Product({});
  }

  private resetEditState() {
    this.product = new Product({});
    this.editMode = false;
    this.productForm.reset();
  }

  private isValid = () => this.productForm.valid;

  protected isEditMode = (): boolean => this.editMode;

  protected onSubmit() {
    if (this.isValid()) {
      let emitter = this.isEditMode() ? this.productUpdateRequested : this.productAddRequested;
      emitter.emit(this.product);
      this.resetEditState();
    } else {
      console.error('Invalid form data.')
    }
  }

  protected onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }
}
