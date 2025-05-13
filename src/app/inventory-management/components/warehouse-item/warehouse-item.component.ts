import {Component, Input} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {Warehouse} from '../../model/warehouse.entity';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-warehouse-item',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButtonModule,
    MatCardModule,
    MatIcon,
  ],
  templateUrl: './warehouse-item.component.html',
  styleUrl: './warehouse-item.component.css'
})
export class WarehouseItemComponent {
  @Input() warehouse!: Warehouse;
}
