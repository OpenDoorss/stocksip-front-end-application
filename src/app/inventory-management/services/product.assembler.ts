
import {ProductResource} from './product.response';
import {Product} from '../model/product.entity';

export class ProductAssembler {

  static toEntityFromResource(resource: ProductResource): Product {

    const product = new Product();
    product.productId = resource.productId;
    product.name = resource.name;
    product.unitPrice = resource.unitPrice;
    product.content = resource.content;
    product.expirationDate = resource.expirationDate;
    product.imageUrl = resource.imageUrl;
    product.productType = resource.productType;
    product.productBrand = resource.productBrand;
    product.currentStock = resource.currentStock;
    product.minimumStock = resource.minimumStock;
    product.state = resource.state;
    product.accountId = resource.accountId;




    return product;
  }

  static toEntitiesFromResources(resources: ProductResource[]): Product[] {
    return resources.map(resource => this.toEntityFromResource(resource));
  }
}
