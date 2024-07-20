import Database from 'better-sqlite3';
import path from 'path';

export type TODO = {
  id?: number;
  title: string;
  date: string;
  status: number;
};

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

export default function DBConnect() {
  const databasePath = isDevelopment
    ? path.join(__dirname, '../../../', 'release/app', 'database.db')
    : path
        .join(__dirname, '../../database.db')
        .replace('app.asar', 'app.asar.unpacked');

  return Database(path.resolve(databasePath), {
    verbose: console.log,
    fileMustExist: true,
  });
}
