CREATE TABLE Products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  quantity INTEGER NOT NULL,
  deleted BOOLEAN DEFAULT 0,
  restockedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  deleted BOOLEAN DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clientId INTEGER,
  paid BOOLEAN DEFAULT 0,
  totalAmount REAL NOT NULL,
  deleted BOOLEAN DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clientId) REFERENCES Clients(id)
);

CREATE TABLE InvoiceItems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoiceId INTEGER,
  productId INTEGER,
  quantity INTEGER NOT NULL,
  amount REAL NOT NULL,
  FOREIGN KEY (invoiceId) REFERENCES Invoices(id),
  FOREIGN KEY (productId) REFERENCES Products(id)
);

CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  image TEXT,
  password TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);