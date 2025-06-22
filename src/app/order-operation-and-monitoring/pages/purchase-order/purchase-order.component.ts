import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {PurchaseOrder} from '../../model/purchase-order.entity';
import {PurchaseOrderService} from '../../services/purchase-order.service';
import {PurchaseOrderListComponent} from '../../components/purchase-order-list/purchase-order-list.component';
import {SideNavbarComponent} from '../../../public/components/side-navbar/side-navbar.component';
import {ToolBarComponent} from '../../../public/components/tool-bar/tool-bar.component';

@Component({
  selector: 'app-purchase-order',
  imports: [
    MatButton,
    RouterLink,
    PurchaseOrderListComponent,
    SideNavbarComponent,
    ToolBarComponent
  ],
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.css'
})
export class PurchaseOrderComponent {
  orders: PurchaseOrder[] = [];

  constructor(private orderService: PurchaseOrderService) {}


  ngOnInit(): void {
    this.orderService.getAll().subscribe({
      next: (data: PurchaseOrder[]) => this.orders = data,
      error: (err: any) => console.error('Error loading purchase orders', err)
    });
  }
}
