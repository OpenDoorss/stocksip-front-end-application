import { Component } from '@angular/core';
import { CatalogListComponent} from '../../components/catalog-list/catalog-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-catalog-component',
  standalone: true,
  imports: [
    CatalogListComponent,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {}
