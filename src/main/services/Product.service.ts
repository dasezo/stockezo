import Product from 'types/Product';
import DBConnect from './Database.service';

export function insertProduct(product: Product) {
  const db = DBConnect();

  const stm = db.prepare(
    'INSERT INTO Products (name, description, price,quantity) VALUES (@name, @description, @price,@quantity)',
  );

  stm.run(product);
}

export function updateProduct(product: Product) {
  const db = DBConnect();
  const { name, description, id, quantity, price } = product;

  const stm = db.prepare(
    'UPDATE Products SET name = @name, description = @description, quantity = @quantity, price= @price WHERE id = @id',
  );

  stm.run({ name, description, quantity, price, id });
}

export function deleteProduct(id: number) {
  const db = DBConnect();

  const stm = db.prepare('UPDATE Products SET deleted = 1 WHERE id = @id');

  stm.run({ id });
}

export function destroyProduct(id: number) {
  const db = DBConnect();

  const stm = db.prepare('DELETE FROM Products WHERE id = @id');

  stm.run({ id });
}

export function getAllProducts() {
  const db = DBConnect();

  const stm = db.prepare('SELECT * FROM Products WHERE deleted = 0');

  return stm.all() as Product[];
}

export function findProduct(id: number) {
  const db = DBConnect();

  const stm = db.prepare(
    'SELECT * FROM Products where id = @id AND deleted = 0',
  );

  return stm.get({ id }) as Product;
}
