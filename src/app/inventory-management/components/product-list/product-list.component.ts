import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../model/product.entity';
import {WarehouseItemComponent} from '../warehouse-item/warehouse-item.component';
import {ProductItemComponent} from '../product-item/product-item.component';

@Component({
  selector: 'app-product-list',
  imports: [
    WarehouseItemComponent,
    ProductItemComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input() products!: Product[];

  constructor(private router: Router) {}

}
