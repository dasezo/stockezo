import DBConnect from './Database.service';

export function insertTODO(product: Product) {
  const db = DBConnect();

  const stm = db.prepare(
    'INSERT INTO Products (title, date, status) VALUES (@title, @date, @status)',
  );

  stm.run(product);
}

export function updateTODO(todo: TODO) {
  const db = DBConnect();
  const { title, status, id } = todo;

  const stm = db.prepare(
    'UPDATE todos SET title = @title, status = @status WHERE id = @id',
  );

  stm.run({ title, status, id });
}

export function deleteTODO(id: number) {
  const db = DBConnect();

  const stm = db.prepare('DELETE FROM todos WHERE id = @id');

  stm.run({ id });
}

export function getAllProducts() {
  const db = DBConnect();

  const stm = db.prepare('SELECT * FROM Products');

  return stm.all() as Product[];
}

export function getOneTODO(id: number) {
  const db = DBConnect();

  const stm = db.prepare('SELECT * FROM todos where id = @id');

  return stm.get({ id }) as TODO;
}
