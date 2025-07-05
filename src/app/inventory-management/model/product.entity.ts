import {v4 as uuid} from 'uuid';
import {Money} from '../../shared/model/money';
import {DateTime} from '../../shared/model/date-time';

/**
 * Represents the State of the Product.
 */
const ProductState: string[] = ["IN-INVENTORY", "BOUGHT", "DONATED", "LOST", "CONSUMED"];

/**
 * Represents the Type of the Product.
 */
const ProductTypes: string[] = ["RUM", "WHISKY", "GIN", "VODKA", "TEQUILA", "COGNAC", "BRANDY", "CREAMY", "HERBAL", "FRUIT", "SPECIAL"]


/**
 * Represents the Brands of the Product.
 */

const ProductBrands: string[] = ["TABERNERO", "SANTIAGO_QUEIROLO", "PORTON", "CRISTAL", "JOHNNIE_WALKER", "JACK_DANIELS", "BUDWEISER", "HEINEKEN", "CORONA", "PILSEN_CALLAO", "CUSQUENA", "CARTAVIO"]

/**
 * Represents a Product in the system.
 */
export class Product {
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

  /**
   * Creates a new Product instance.
   * @param product {Product} - The Object that contains the data to create the Product instance.
   */
  constructor() {
    this.productId = 0;
    this.name = '';
    this.unitPrice = 0;
    this.content = 0;
    this.expirationDate = '';
    this.imageUrl = '';
    this.productType = '';
    this.productBrand = '';
    this.currentStock = 0;
    this.minimumStock = 0;
    this.state = '';
    this.accountId = 0;
  }
}
