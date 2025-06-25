import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';

import { Catalog } from '../model/catalog.entity';
import { CatalogItem } from '../model/catalog-item.entity';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCatalogByAccount(accountId: string): Observable<Catalog[]> {
    const params = new HttpParams().set('accountId', accountId);
    return this.http.get<Catalog[]>(`${this.apiUrl}/catalogs`, { params });
  }

  getPublishedCatalogsByAccount(accountId: string): Observable<Catalog[]> {
    const params = new HttpParams()
      .set('accountId', accountId)
      .set('isPublished', true);
    return this.http.get<Catalog[]>(`${this.apiUrl}/catalogs`, { params });
  }

  getPublishedCatalogs(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${this.apiUrl}/catalogs?isPublished=true`);
  }

  getCatalogById(id: number): Observable<Catalog> {
    return this.http.get<Catalog>(`${this.apiUrl}/catalogs/${id}`);
  }

  createCatalog(catalog: Catalog): Observable<Catalog> {
    return this.http.post<Catalog>(`${this.apiUrl}/catalogs`, catalog);
  }

  updateCatalog(catalog: Catalog): Observable<Catalog> {
    return this.http.put<Catalog>(`${this.apiUrl}/catalogs/${catalog.id}`, catalog);
  }

  getCatalogItems(catalogId: number): Observable<CatalogItem[]> {
    return this.http
      .get<CatalogItem[]>(`${this.apiUrl}/catalogItems?catalogId=${catalogId}`)
      .pipe(
        map(items =>
          items.map(i => ({
            ...i,
            unitPrice:
              i.unitPrice
          }))
        )
      );
  }

  addCatalogItem(item: CatalogItem): Observable<CatalogItem> {
    return this.http.post<CatalogItem>(`${this.apiUrl}/catalogItems`, item);
  }

  deleteCatalogItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/catalogItems/${id}`);
  }
}
