declare type Invoice = {
  id: number;
  clientId: Client;
  paid?: boolean;
  totalAmount: number;
  deleted?: boolean;
  createdAt?: Date;
};
