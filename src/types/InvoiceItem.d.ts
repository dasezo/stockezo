declare type InvoiceItem = {
  id: number;
  invoiceId: Invoice;
  productId: Product;
  quantity: number;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
};
