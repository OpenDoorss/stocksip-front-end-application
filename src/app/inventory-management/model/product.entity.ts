export class Product {
  id: number;
  productInfo: {
    name: string;
    unitPrice: number;
    content: number;
    expirationDate: Date;
  };
  productType: string;
  currentStock: number;
  minimumStock: number;
  state: string;
  providerId: number;

  constructor(product: {
    id: number,
    productInfo: {
      name: string,
      unitPrice: number,
      content: number,
      expirationDate: Date,
    },
    productType: string,
    currentStock: number,
    minimumStock: number,
    state: string,
    providerId: number
  }) {
    this.id = product.id || 0;
    this.productInfo = product.productInfo || {};
    this.productType = product.productType || '';
    this.currentStock = product.currentStock || 0;
    this.minimumStock = product.minimumStock || 5;
    this.state = product.state || 'In-Inventory';
    this.providerId = product.providerId || 0;
  }


  //TO-DO: Add state indicator to product. ex.: In-Inventory, Bought, Donated, etc.
}
