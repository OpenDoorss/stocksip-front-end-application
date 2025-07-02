import { CatalogItem } from './catalog-item.entity';
import { DateTime } from '../../shared/model/date-time';
import {Account} from '../../payment-and-subscriptions/model/account.entity';


export interface PurchaseOrder {
  id: number;
  date: DateTime;
  status: string;
  buyer: Account;
  supplier: Account;
  items: CatalogItem[];
  customQuantity: number;
  totalAmount: number;
  totalItems: number;
}
