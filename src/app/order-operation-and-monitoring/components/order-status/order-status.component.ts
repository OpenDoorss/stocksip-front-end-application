import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormField, MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-order-status',
  standalone: true,
  templateUrl: './order-status.component.html',
  imports: [
    FormsModule,
    NgForOf,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatSelect,
    MatFormField,
    MatOption
  ],
})
export class OrderStatusComponent {
  statusOptions = [
    { label: 'Received', value: 'RECEIVED' },
    { label: 'In Process', value: 'IN_PROCESS' },
    { label: 'Arrived', value: 'ARRIVED' },
    { label: 'Canceled', value: 'CANCELED' }
  ];

  selectedStatus: string;

  constructor(
    public dialogRef: MatDialogRef<OrderStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { status: string }
  ) {
    this.selectedStatus = data.status;
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.selectedStatus);
  }
}
