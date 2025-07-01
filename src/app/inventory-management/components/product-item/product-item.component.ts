import {Component, Input} from '@angular/core';
import {Product} from '../../model/product.entity';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-product-item',
  imports: [
    TranslatePipe
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!: Product;
}
