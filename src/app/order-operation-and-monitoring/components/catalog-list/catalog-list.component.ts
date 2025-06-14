import {Component, Input, OnInit} from '@angular/core';
import { Catalog } from '../../model/catalog.entity';
import {MatGridListModule, MatGridTile} from '@angular/material/grid-list';
import { CatalogItemComponent } from '../catalog-item/catalog-item.component';
import {CatalogService} from '../../services/catalog.service';
import {UserService} from '../../../authentication/services/user.service';
import {NgForOf} from '@angular/common';

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
  @Input() catalogs!: Catalog[];

  constructor(private catalogService: CatalogService, private userService: UserService) {}

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) return;

    this.catalogService.getCatalogByProfile(currentUser.profileId).subscribe({
      next: (catalogs: Catalog[]) => {
        this.catalogs = catalogs;
      },
      error: (err: any) => console.error('Error fetching catalogs:', err)
    });
  }

  trackById(index: number, item: Catalog): number {
    return item.id;
  }

}
