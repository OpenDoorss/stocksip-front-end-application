import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable, map, catchError, of, throwError} from 'rxjs';

import { Catalog } from '../model/catalog.entity';
import { CatalogItem } from '../model/catalog-item.entity';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private apiUrl = environment.apiUrl;
  private baseUrl = environment.backendApi;

  constructor(private http: HttpClient) {}

  getCatalogByAccount(accountId: number): Observable<Catalog[]> {
    const params = new HttpParams().set('accountId', accountId);
    return this.http.get<Catalog[]>(`${this.baseUrl}/catalogs`, { params });
  }

  getPublishedCatalogsByAccount(accountId: number): Observable<Catalog[]> {
    const params = new HttpParams()
      .set('accountId', accountId)
      .set('isPublished', true);
    return this.http.get<Catalog[]>(`${this.baseUrl}/catalogs`, { params });
  }

  getPublishedCatalogs(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${this.baseUrl}/catalogs?isPublished=true`);
  }

  getCatalogById(id: number): Observable<Catalog> {
    return this.http.get<Catalog>(`${this.baseUrl}/catalogs/${id}`);
  }

  createCatalog(catalog: Catalog): Observable<Catalog> {
    return this.http.post<Catalog>(`${this.baseUrl}/catalogs`, catalog);
  }

  updateCatalogName(id: number, name: string, accountId: number): Observable<Catalog> {
    return this.http.put<Catalog>(`${this.baseUrl}/catalogs/${id}`, {
      id,
      accountId,
      name
    });
  }


  getCatalogItems(catalogId: number): Observable<CatalogItem[]> {
    return this.http
      .get<CatalogItem[]>(`${this.baseUrl}/catalogItems?catalogId=${catalogId}`)
      .pipe(
        map(items => items.map(i => ({ ...i, unitPrice: i.unitPrice }))),
        catchError((err: { status: number; }) =>
          err.status === 404 ? of([]) : throwError(() => err)
        )
      );
  }

  addCatalogItem(item: CatalogItem): Observable<CatalogItem> {
    return this.http.post<CatalogItem>(`${this.baseUrl}/catalogItems`, item);
  }

  deleteCatalogItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/catalogItems/${id}`);
  }

  publishCatalog(id: number): Observable<Catalog> {
    return this.http.post<Catalog>(`${this.baseUrl}/catalogs/${id}/publish`, {});
  }



}
