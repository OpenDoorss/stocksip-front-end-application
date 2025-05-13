import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BaseService} from '../../shared/services/base.service';
import {Product} from '../model/product.entity';

const productsResourceEndpointPath = environment.productsEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {

  constructor() {
    super();
    this.resourceEndpoint = productsResourceEndpointPath;
  }
}
