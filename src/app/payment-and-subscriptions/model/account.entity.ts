export interface Account {
  userOwnerId: number;
  accountId: number;
  id: number;
  email: string;
  businessName: string;
  role        : 'Supplier' | 'Liquor Store Owner';
}
