import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { UserService } from '../../../authentication/services/user.service';
import { Catalog } from '../../model/catalog.entity';
import { CatalogListComponent } from '../../components/catalog-list/catalog-list.component';
import { CommonModule } from '@angular/common';
import {Profile} from '../../../profile-management/models/profile.entity';
import {CatalogForOrdersComponent} from '../catalog-for-orders/catalog-for-orders.component';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-catalogs',
  standalone: true,
  imports: [CommonModule, CatalogListComponent, CatalogForOrdersComponent, MatButton, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  catalogs: Catalog[] = [];
  profile: Profile | null = null;

  constructor(
    private catalogService: CatalogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    console.log('Usuario actual:', currentUser);

    if (!currentUser?.profile || !currentUser.profile.role) {
      console.error('Perfil no encontrado o sin rol');
      return;
    }

    this.profile = currentUser.profile;
    console.log('Rol del perfil:', this.profile?.role);

    if (this.profile?.role === 'Supplier') {
      const profileId = this.profile.profileId;
      this.catalogService.getCatalogByProfile(profileId).subscribe({
        next: (catalogs: Catalog[]) => {
          this.catalogs = catalogs;
        },
        error: err => {
          console.error('Error al cargar catálogos:', err);
        }
      });
    } else if (this.profile?.role === 'Liquor Store Owner') {
      this.catalogService.getPublishedCatalogs().subscribe({
        next: (catalogs: Catalog[]) => {
          this.catalogs = catalogs;
        },
        error: err => {
          console.error('Error al cargar catálogos publicados:', err);
        }
      });
    } else {
      console.warn('Rol no reconocido');
    }
  }

  isSupplier(): boolean {
    return this.profile?.role === 'Supplier';
  }

  isLiquorStoreOwner(): boolean {
    return this.profile?.role === 'Liquor Store Owner';
  }
}
