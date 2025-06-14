import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { UserService } from '../../../authentication/services/user.service';
import { Catalog } from '../../model/catalog.entity';
import { CatalogListComponent } from '../../components/catalog-list/catalog-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogs',
  standalone: true,
  imports: [CommonModule, CatalogListComponent],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  catalogs: Catalog[] = [];

  constructor(
    private catalogService: CatalogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      console.error('Usuario no encontrado en localStorage');
      return;
    }

    const profileId = currentUser.profileId;

    this.catalogService.getCatalogByProfile(profileId).subscribe({
      next: (catalogs: Catalog[]) => {
        this.catalogs = catalogs;
      },
      error: err => {
        console.error('Error al cargar catálogos:', err);
      }
    });
  }
}
