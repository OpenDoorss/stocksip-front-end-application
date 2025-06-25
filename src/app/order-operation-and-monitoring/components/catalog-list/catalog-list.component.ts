import { Component, Input, OnInit } from '@angular/core';
import { Catalog } from '../../model/catalog.entity';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { CatalogItemComponent } from '../catalog-item/catalog-item.component';
import { CatalogService } from '../../services/catalog.service';
import { UserService } from '../../../authentication/services/user.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  standalone: true,
  imports: [
    CatalogItemComponent,
    MatGridListModule,
    MatGridTile,
    NgForOf
  ]
})
export class CatalogListComponent implements OnInit {
  @Input() catalogs: Catalog[] = [];

  constructor(
    private catalogService: CatalogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    const accountId = currentUser?.account?.id;   // 👈 aquí

    if (!accountId) {
      console.warn('El usuario aún no tiene cuenta');   // o muestra mensaje en la vista
      return;
    }

    this.catalogService.getCatalogByAccount(accountId).subscribe({
      next: cats => (this.catalogs = cats),
      error: err => console.error('Error fetching catalogs:', err)
    });
  }


  trackById(index: number, item: Catalog): number {
    return item.id;
  }
}
