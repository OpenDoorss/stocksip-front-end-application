import { CatalogItem } from './catalog-item.entity';
import { Money } from '../../shared/model/money';
import { DateTime } from '../../shared/model/date-time';
import { Profile } from '../../profile-management/models/profile.entity';

export interface PurchaseOrder {
  id: number;
  date: DateTime;
  status: string;
  buyer: Profile;
  supplier: Profile;
  items: CatalogItem[];
  totalAmount: Money;
  totalItems: number;
}
