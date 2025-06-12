import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable, catchError, tap, map} from 'rxjs';
import { CatalogItem } from '../model/catalog-item.entity';
import { Product} from '../../inventory-management/model/product.entity';


@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl = environment.apiUrl;
  private catalogEndpoint = environment.catalogEndpointPath; // eg: '/catalog'

  constructor(private http: HttpClient) {}

  getCatalogByProfile(profileId: number): Observable<any[]> {
    console.log('Requesting catalog items for profileId:', profileId);
    return this.http.get<any[]>(`${this.apiUrl}/catalog?profileId=${profileId}`).pipe(
      tap(data => console.log('Received catalog items:', data)),
      catchError(error => {
        console.error('Error fetching catalog:', error);
        throw error;
      })
    );
  }


  createCatalogItem(item: CatalogItem): Observable<CatalogItem> {
    return this.http.post<CatalogItem>(`${this.apiUrl}${this.catalogEndpoint}`, item).pipe(
      tap(data => console.log('Created catalog item:', data)),
      catchError(error => {
        console.error('Error creating catalog item:', error);
        throw error;
      })
    );
  }
}
