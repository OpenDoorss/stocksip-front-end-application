import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ToolbarContentComponent} from '../../../public/components/toolbar-content/toolbar-content.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WarehouseService} from '../../services/warehouse.service';

@Component({
  selector: 'app-warehouse-create-and-edit',
  imports: [
    MatFormFieldModule,
    MatInput,
    ToolbarContentComponent,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './warehouse-create-and-edit.component.html',
  styleUrl: './warehouse-create-and-edit.component.css'
})
export class WarehouseCreateAndEditComponent implements OnInit {

  pageTitle: string = 'Create Warehouse';
  isEditMode: boolean = false;
  warehouseId: string | null = null;

  nameFormControl = new FormControl('', Validators.required)
  locationFormControl = new FormControl('', Validators.required)
  cityFormControl=  new FormControl('', Validators.required)
  stateFormControl = new FormControl('', Validators.required)
  postalCodeFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)])
  capacityFormControl = new FormControl('', [Validators.required, Validators.min(1)])

  warehouseForm = new FormGroup({
    name: this.nameFormControl,
    location: this.locationFormControl,
    city: this.cityFormControl,
    state: this.stateFormControl,
    postalCode: this.postalCodeFormControl,
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

    if (this.isEditMode) {
      this.pageTitle = 'Edit Warehouse';
      this.loadWarehouseData();
    }
  }

  loadWarehouseData(): void {
    if (this.warehouseId) {
      this.warehouseService.getWarehouseById(this.warehouseId).subscribe({
        next: (warehouse) => {
          this.warehouseForm.patchValue({
            name: warehouse.name,
            location: warehouse.location,
            city: warehouse.city,
            state: warehouse.state,
            postalCode: warehouse.postalCode,
            capacity: warehouse.capacity.toString()
          });
        },
        error: (err) => console.error('Error loading warehouse', err)
      });
    }
  }

  onCancel(): void {
    const profileId = this.route.snapshot.paramMap.get('profileId');
    if (profileId) {
      void this.router.navigate(['/warehouse', profileId])
    }
  }

}
