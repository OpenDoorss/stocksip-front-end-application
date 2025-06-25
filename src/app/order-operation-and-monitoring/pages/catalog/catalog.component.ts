import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

import { CatalogService } from '../../services/catalog.service';
import { UserService } from '../../../authentication/services/user.service';

import { Catalog } from '../../model/catalog.entity';
import { Account} from '../../../payment-and-subscriptions/model/account.entity';

import { CatalogListComponent } from '../../components/catalog-list/catalog-list.component';
import { CatalogForOrdersComponent } from '../catalog-for-orders/catalog-for-orders.component';
import { SideNavbarComponent } from '../../../public/components/side-navbar/side-navbar.component';
import { ToolBarComponent } from '../../../public/components/tool-bar/tool-bar.component';

@Component({
  selector: 'app-catalogs',
  standalone: true,
  imports: [
    CommonModule,
    CatalogListComponent,
    CatalogForOrdersComponent,
    MatButton,
    RouterLink,
    SideNavbarComponent,
    ToolBarComponent
  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalogs: Catalog[] = [];
  account: Account | null = null;

  constructor(
    private catalogService: CatalogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();
    console.log('Usuario actual:', user);

    const role = user?.role;
    if (!role) {
      console.error('Cuenta o perfil sin rol');
      return;
    }

    // solo asigna account si realmente existe
    this.account = user.account ?? null;

    if (role === 'Supplier') {
      const accountId = user.account?.id ?? user.id;
      this.catalogService.getCatalogByAccount(accountId).subscribe({
        next: cats => (this.catalogs = cats),
        error: err => console.error('Error al cargar catálogos:', err)
      });
    } else if (role === 'Liquor Store Owner') {
      this.catalogService.getPublishedCatalogs().subscribe({
        next: cats => (this.catalogs = cats),
        error: err => console.error('Error al cargar catálogos publicados:', err)
      });
    } else {
      console.warn('Rol no reconocido');
    }
  }


  isSupplier(): boolean {
    return this.account?.role === 'Supplier';
  }

  isLiquorStoreOwner(): boolean {
    return this.account?.role === 'Liquor Store Owner';
  }
}
