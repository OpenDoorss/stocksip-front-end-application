import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable, catchError, tap, map} from 'rxjs';
import { CatalogItem } from '../model/catalog-item.entity';
import { Product} from '../../inventory-management/model/product.entity';
import {Catalog} from '../model/catalog.entity';


@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl = environment.apiUrl;
  private catalogEndpoint = environment.catalogEndpointPath; // eg: '/catalog'

  constructor(private http: HttpClient) {}

  getCatalogByProfile(profileId: number): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${this.apiUrl}/catalog?profileId=${profileId}`);
  }

  getCatalogItems(catalogId: number): Observable<CatalogItem[]> {
    return this.http.get<CatalogItem[]>(`${this.apiUrl}/catalogItems?catalogId=${catalogId}`);
  }

  addCatalogItem(item: CatalogItem): Observable<CatalogItem> {
    return this.http.post<CatalogItem>(`${this.apiUrl}/catalogItems`, item);
  }
}
