declare type User = {
  id?: number;
  username: string;
  password?: string;
  createdAt?: Date;
};

declare type Auth = {
  username: string;
  password: string;
};
