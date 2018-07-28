export class Product {
  constructor(id?: number, name?: string, price?: number, turnover?: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.turnover = turnover;
  }

  id: number;
  name: string;
  turnover: number;
  price: number;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  turnover: number;
}