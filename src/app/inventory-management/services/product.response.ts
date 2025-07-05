import {Money} from '../../shared/model/money';
import {DateTime} from '../../shared/model/date-time';

export interface ProductResource {
  productId: number;
  name: string;
  unitPrice: number;
  content: number;
  expirationDate: string;
  imageUrl: string;
  productType: string;
  productBrand: string;
  currentStock: number;
  minimumStock: number;
  state: string;
  accountId: number;
}
