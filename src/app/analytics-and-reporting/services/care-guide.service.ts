import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import { CareGuide } from '../model/care-guide.entity';
import { environment } from '../../../environments/environment';

const productsResourceEndpointPath = environment.productsEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class CareGuideService  extends BaseService<CareGuide>{
  constructor() {
    super();
    this.resourceEndpoint = productsResourceEndpointPath;
  }
}
