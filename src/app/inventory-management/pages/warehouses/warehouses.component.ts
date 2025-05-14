import {Component, OnInit} from '@angular/core';
import {WarehouseListComponent} from '../../components/warehouse-list/warehouse-list.component';
import {Warehouse} from '../../model/warehouse.entity';
import {ActivatedRoute, Router} from '@angular/router';
import {WarehouseService} from '../../services/warehouse.service';
import {MatFabButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-warehouses',
  imports: [
    WarehouseListComponent,
    MatIconModule,
    MatFabButton,
  ],
  templateUrl: './warehouses.component.html',
  styleUrl: './warehouses.component.css'
})
export class WarehousesComponent implements OnInit {
  profileId: number = 0;
  warehouses: Warehouse[] = [];

  constructor(private route: ActivatedRoute, private warehouseService: WarehouseService, private router: Router) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('profileId');
    this.profileId = idParam ? parseInt(idParam, 10) : 0;
    this.loadWarehouses();
  }

  loadWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe((data) => {
      this.warehouses = data.filter(warehouse => warehouse.profileId === this.profileId);
      console.log(data);
    })
  }

  navigateToCreate(): void {
    void this.router.navigate(['/warehouse', this.profileId, 'create']);
  }
}
