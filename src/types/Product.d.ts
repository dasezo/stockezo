declare interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  deleted?: boolean;
  restockedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
