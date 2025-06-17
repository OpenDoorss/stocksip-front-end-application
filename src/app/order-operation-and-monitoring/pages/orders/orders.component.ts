import { Component } from '@angular/core';
import { UserService} from '../../../authentication/services/user.service';
import { Profile } from '../../../profile-management/models/profile.entity';
import {NgIf} from '@angular/common';
import {PurchaseOrderComponent} from '../purchase-order/purchase-order.component';
import {SalesOrderComponent} from '../sales-order/sales-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [
    NgIf,
    PurchaseOrderComponent,
    SalesOrderComponent
  ],
  standalone: true
})
export class OrdersComponent {
  profile: Profile | null;

  constructor(private userService: UserService) {
    this.profile = this.userService.getCurrentUserProfile();
  }

  isSupplier(): boolean {
    return this.profile?.role === 'Supplier';
  }

  isLiquorStoreOwner(): boolean {
    return this.profile?.role === 'Liquor Store Owner';
  }
}
