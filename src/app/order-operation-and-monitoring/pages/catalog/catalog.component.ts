import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink }  from '@angular/router';
import { MatButton }   from '@angular/material/button';

import { CatalogService }        from '../../services/catalog.service';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

import { Catalog } from '../../model/catalog.entity';
import { CatalogListComponent }      from '../../components/catalog-list/catalog-list.component';
import { CatalogForOrdersComponent } from '../catalog-for-orders/catalog-for-orders.component';
import { SideNavbarComponent }       from '../../../public/components/side-navbar/side-navbar.component';
import { ToolBarComponent }          from '../../../public/components/tool-bar/tool-bar.component';
import {Account} from '../../../payment-and-subscriptions/model/account.entity';
import {AccountService} from '../../../payment-and-subscriptions/services/account.service';

@Component({
  selector   : 'app-catalogs',
  standalone : true,
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
  styleUrls  : ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  catalogs: Catalog[] = [];
  account : Account | null = null;

  constructor(
    private catalogService : CatalogService,
    private accountService : AccountService,
    private authService    : AuthenticationService
  ) {}

  ngOnInit(): void {
    const { accountId } = this.authService.getCurrentUser();

    if (!accountId) {
      console.error('No hay accountId en sesión');
      return;
    }

    this.accountService.getById(accountId).subscribe({
      next : (acc: any) => {
        this.account = acc;
        this.loadCatalogs();
      },
      error: (err: any) =>
        console.error('Error al obtener la cuenta:', err)
    });
  }

  private loadCatalogs(): void {
    if (!this.account) return;

    const role = this.account.role;

    if (role === 'Supplier') {
      this.catalogService.getCatalogByAccount(this.account.accountId).subscribe({
        next : cats => (this.catalogs = cats),
        error: err  => console.error(err)
      });
    }
    else if (role === 'Liquor Store Owner') {
      this.catalogService.getPublishedCatalogs().subscribe({
        next : cats => (this.catalogs = cats),
        error: err  => console.error(err)
      });
    }
    else {
      console.warn('Rol no reconocido:', role);
    }
  }

  /* helpers ------------------------- */
  isSupplier(): boolean {
    return this.account?.role === 'Supplier';
  }
  isLiquorStoreOwner(): boolean {
    return this.account?.role === 'Liquor Store Owner';
  }
}
