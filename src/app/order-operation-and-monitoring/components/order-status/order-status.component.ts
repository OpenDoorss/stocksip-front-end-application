import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-order-status',
  standalone: true,
  templateUrl: './order-status.component.html',
  imports: [
    FormsModule,
    NgForOf,
    MatListModule,
    MatButtonModule,
    MatDialogModule
  ],
})
export class OrderStatusComponent {
  statusOptions = ['Received', 'In Process', 'Arrived', 'Canceled'];
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

