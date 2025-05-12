import {WarehouseResource} from './warehouse.response';
import {Warehouse} from '../model/warehouse.entity';

export class WarehouseAssembler {

  static toEntityFromResource(resource: WarehouseResource): Warehouse {
    return {
      id: resource.id,
      name: resource.name,
      image: resource.image,
      location: resource.location,
      capacity: resource.capacity
    }
  }

  static toEntitiesFromResources(resources: WarehouseResource[]): Warehouse[] {
    return resources.map(resource => this.toEntityFromResource(resource));
  }
}
