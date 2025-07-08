import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../model/product.entity';
import {ProductItemComponent} from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductItemComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input() products: Product[] = [];


  @Output() editProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<number>();

  onEdit(product: Product) {
    this.editProduct.emit(product);
  }

  onDelete(productId: number) {
    this.deleteProduct.emit(productId);
  }
}
