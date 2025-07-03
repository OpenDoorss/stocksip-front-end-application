import { CatalogItem } from './catalog-item.entity';
import { DateTime } from '../../shared/model/date-time';
import {Account} from '../../payment-and-subscriptions/model/account.entity';


export interface PurchaseOrder {
  id: number;
  date: Date;
  status: string;
  buyer: Account;
  supplier: Account;
  items: CatalogItem[];
  totalAmount: number;
  totalItems: number;
}
