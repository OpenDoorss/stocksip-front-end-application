import {Component, OnInit} from '@angular/core';
import {WarehouseListComponent} from '../../components/warehouse-list/warehouse-list.component';
import {Warehouse} from '../../model/warehouse.entity';
import {ActivatedRoute} from '@angular/router';
import {WarehouseService} from '../../services/warehouse.service';

@Component({
  selector: 'app-warehouses',
  imports: [
    WarehouseListComponent
  ],
  templateUrl: './warehouses.component.html',
  styleUrl: './warehouses.component.css'
})
export class WarehousesComponent implements OnInit {
  profileId: number = 0;
  warehouses: Warehouse[] = [];

  constructor(private route: ActivatedRoute, private warehouseService: WarehouseService) {}
  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('profileId');
    this.profileId = idParam ? parseInt(idParam, 10) : 0;
    this.warehouseService.getWarehouses().subscribe((data) => {
      this.warehouses = data.filter(warehouse => warehouse.profileId === this.profileId);
      console.log(data);
    })
  }
}
