import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../model/product.entity';
import {NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-product-item',
  imports: [
    MatCardModule,
    MatIcon
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!: Product;

  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.product);
  }

  onDelete() {
    this.delete.emit(this.product.id);
  }
}
