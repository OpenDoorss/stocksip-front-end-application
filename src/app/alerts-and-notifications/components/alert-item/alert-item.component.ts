import { Component, Input } from '@angular/core';
import { UrgentRestockAlert, ExpiringProduct } from '../../model/alert.entity';
import {MatDivider} from '@angular/material/divider';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-alert-item',
  templateUrl: './alert-item.component.html',
  imports: [
    MatDivider,
    NgIf
  ],
  styleUrls: ['./alert-item.component.css']
})
export class AlertItemComponent {
  @Input() alert?: UrgentRestockAlert;
  @Input() expiration?: ExpiringProduct;
}
