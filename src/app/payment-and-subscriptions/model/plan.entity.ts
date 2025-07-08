export class Plan {
  planId: number;
  planType: string;
  description: string;
  price: number;
  maxWarehouses: number;
  minWarehouses: number;

  constructor({
                planId = 0,
                planType = '',
                description = '',
                price = 0,
                maxWarehouses = 0,
                minWarehouses = 0,
              }: {
    planId?: number;
    planType?: string;
    description?: string;
    price?: number;
    maxWarehouses?: number;
    minWarehouses?: number;
  }) {
    this.planId = planId;
    this.planType = planType;
    this.description = description;
    this.price = price;
    this.maxWarehouses = maxWarehouses;
    this.minWarehouses = minWarehouses;
  }
}
