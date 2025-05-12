import {Component, Input} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {Warehouse} from '../../model/warehouse.entity';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-warehouse-item',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './warehouse-item.component.html',
  styleUrl: './warehouse-item.component.css'
})
export class WarehouseItemComponent {
  @Input() warehouse!: Warehouse;
}
