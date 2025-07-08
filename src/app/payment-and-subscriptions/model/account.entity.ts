export interface Account {
  userOwnerId: number;
  accountId: number;
  username: string;
  id: number;
  email: string;
  businessName: string;
  role        : 'Supplier' | 'Liquor Store Owner';
}
