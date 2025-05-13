import {Component, Input} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ToolbarContentComponent} from '../../../public/components/toolbar-content/toolbar-content.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

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
export class WarehouseCreateAndEditComponent {

  pageTitle: string = 'Create Warehouse';
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

  constructor(private router: Router) {}

}
