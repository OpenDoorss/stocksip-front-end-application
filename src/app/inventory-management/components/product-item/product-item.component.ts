import {Component, Input} from '@angular/core';
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
}
