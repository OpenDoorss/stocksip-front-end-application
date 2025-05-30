import {Component, Input} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {Warehouse} from '../../model/warehouse.entity';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Router} from "@angular/router";

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

  constructor(private router: Router) {}

  navigateToCreate(): void {
    void this.router.navigate(['/warehouse', 'edit', this.warehouse.warehouseId]);
  }

  navigateToZones(): void {
    void this.router.navigate(['/warehouse', 'zones', this.warehouse.warehouseId]);
  }
}
