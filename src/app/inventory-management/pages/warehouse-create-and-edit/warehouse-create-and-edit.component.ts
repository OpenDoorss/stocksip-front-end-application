import {Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WarehouseService} from '../../services/warehouse.service';
import {SideNavbarComponent} from '../../../public/components/side-navbar/side-navbar.component';
import {ToolBarComponent} from '../../../public/components/tool-bar/tool-bar.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-warehouse-create-and-edit',
  imports: [
    MatFormFieldModule,
    MatInput,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    SideNavbarComponent,
    ToolBarComponent,
    TranslatePipe,
  ],
  templateUrl: './warehouse-create-and-edit.component.html',
  styleUrl: './warehouse-create-and-edit.component.css'
})
export class WarehouseCreateAndEditComponent {

  isEditMode: boolean = false;
  warehouseId: string | null = null;
  pageTitle: string = '';

  nameFormControl = new FormControl('', Validators.required)
  streetFormControl = new FormControl('', Validators.required)
  cityFormControl=  new FormControl('', Validators.required)
  districtFormControl = new FormControl('', Validators.required)
  countryFormControl = new FormControl('', Validators.required)
  postalCodeFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)])
  maxTemperatureFormControl = new FormControl<number | null>(null, [Validators.required, Validators.min(-50), Validators.max(50)])
  minTemperatureFormControl = new FormControl<number | null>(null, [Validators.required, Validators.min(-50), Validators.max(50)])
  capacityFormControl = new FormControl('', [Validators.required, Validators.min(1)])

  warehouseForm = new FormGroup({
    name: this.nameFormControl,
    street: this.streetFormControl,
    city: this.cityFormControl,
    district: this.districtFormControl,
    country: this.countryFormControl,
    postalCode: this.postalCodeFormControl,
    maxTemperature: this.maxTemperatureFormControl,
    minTemperature: this.minTemperatureFormControl,
    capacity: this.capacityFormControl,
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private warehouseService: WarehouseService
  ) {}

  ngOnInit(): void {
    this.warehouseId = this.route.snapshot.paramMap.get('warehouseId');
    this.isEditMode = !!this.warehouseId;
    this.pageTitle = this.isEditMode ? 'warehouse.edit' : 'warehouse.create';

    if (this.isEditMode) {
      this.loadWarehouseData();
    }
  }

  loadWarehouseData(): void {
    if (this.warehouseId) {
      this.warehouseService.getWarehouseById(this.warehouseId).subscribe({
        next: (warehouse) => {
          this.warehouseForm.patchValue({
            name: warehouse.name,
            street: warehouse.street,
            city: warehouse.city,
            district: warehouse.district,
            postalCode: warehouse.postalCode,
            country: warehouse.country,
            maxTemperature: warehouse.maxTemperature,
            minTemperature: warehouse.minTemperature,
            capacity: warehouse.capacity.toString()
          });
        },
        error: (err) => console.error('Error loading warehouses', err)
      });
    }
  }

  onCancel(): void {
    void this.router.navigate(['/warehouses'])
  }

}
