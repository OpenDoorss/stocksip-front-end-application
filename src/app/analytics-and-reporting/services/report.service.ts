import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Report } from '../model/report.entity';
import { environment } from '../../../environments/environment';

const reportsResourceEndpointPath = environment.reportsEndpointPath;

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService<Report> {
  constructor() {
    super();
    this.resourceEndpoint = reportsResourceEndpointPath;
  }
}
