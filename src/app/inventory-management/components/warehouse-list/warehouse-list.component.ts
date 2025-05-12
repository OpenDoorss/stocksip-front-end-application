import {Component, Input} from '@angular/core';
import {Warehouse} from '../../model/warehouse.entity';
import {WarehouseItemComponent} from '../warehouse-item/warehouse-item.component';

@Component({
  selector: 'app-warehouse-list',
  imports: [
    WarehouseItemComponent
  ],
  templateUrl: './warehouse-list.component.html',
  styleUrl: './warehouse-list.component.css'
})
export class WarehouseListComponent {

  @Input() warehouses!: Warehouse[];
}
