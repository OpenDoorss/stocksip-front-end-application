import {Money} from '../../shared/model/money';

export interface CatalogItem {
  id: string;
  catalogId: string;
  product: {
    name: string;
    productType: string;
    content: number;
    brand: string;
    unitPrice: Money;
  };
}
